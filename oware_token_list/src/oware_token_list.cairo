use starknet::ContractAddress;
use core::array::ArrayTrait;

    #[derive(Copy, Drop,Hash, Serde, starknet::Store)]
    struct TokenList {
        list_id: u128,
        user : ContractAddress,
        timestamp:u64
    }

    #[derive(Copy, Drop,Hash, Serde, starknet::Store)]
    struct UserToken {
        user_id: u128,
        user : ContractAddress,
        token_claim_balance:u256
    }


    #[derive(Copy, Drop,Hash, Serde, starknet::Store)]
    struct UserTokenClaim {
        claim_id: u128,
        user : ContractAddress,
        token_claim_amount:u256
    }

#[starknet::interface]
trait IStarkPayToken<TContractState> {

    fn name(self: @TContractState) -> felt252;
    fn owner(self: @TContractState) -> ContractAddress;
    fn symbol(self: @TContractState) -> felt252;
    fn totalSupply(self: @TContractState) -> u256;
    fn transfer(ref self: TContractState, to: ContractAddress, amount: u256);
    fn transferFrom(ref self: TContractState, sender: ContractAddress, to: ContractAddress, amount: u256);
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256);
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn mint(ref self: TContractState, to: ContractAddress, amount: u256);

    }

#[starknet::interface]
trait owareTokenListTrait<TContractState> {

    fn add_to_list(ref self:TContractState,  amount: u256);
    fn get_added_to_list(self:@TContractState, id:u128) -> TokenList;
    fn get_token_list(self: @TContractState) -> Array<TokenList>;
    fn approve_claim(ref self:TContractState,list_id:u128,to:ContractAddress,  amount: u256);
    fn tokens_transfer(ref self: TContractState, to: ContractAddress, amount: u256);
    fn tokens_mint(ref self: TContractState, to: ContractAddress, amount: u256);
    fn get_token_name(self: @TContractState) -> felt252;
    fn get_token_symbol(self: @TContractState) -> felt252;
    fn get_token_allocation(self: @TContractState) -> u256;
    fn claim(ref self:TContractState,  amount: u256);
    fn get_claims(self:@TContractState, id:u128, amount:u128) -> Array<UserTokenClaim>;

    }

#[starknet::contract]
mod OwareTokenList {

    use core::array::ArrayTrait;
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use core::hash::{HashStateTrait, HashStateExTrait};
    use core::{poseidon::PoseidonTrait};
    use super::{TokenList,UserToken,UserTokenClaim};
    use super::{IStarkPayTokenDispatcher, IStarkPayTokenDispatcherTrait};



    #[storage]
    struct Storage {

        token_list : LegacyMap::<u128, TokenList>,
        list_count: u128,
        user_count:u128,
        claim_count:u128,
        erc720ContractAdrress: ContractAddress,
        user_balances: LegacyMap::<ContractAddress, UserToken>,
        is_player:LegacyMap::<ContractAddress, bool>,
        claims: LegacyMap::<u128, UserTokenClaim>

    }

    #[constructor]
    fn constructor(ref self:ContractState,erc720_contract:ContractAddress) 
    {
 
        self.list_count.write(0);
        self.user_count.write(0);
        self.erc720ContractAdrress.write(erc720_contract);
        self.claim_count.write(0)

    }


    #[abi(embed_v0)]
    impl owareTokenListImpl of super::owareTokenListTrait<ContractState> {



        fn add_to_list(ref self:ContractState,  amount: u256){


            let user_address = get_caller_address();
            let timestamp  = get_block_timestamp();

            let token_list = TokenList { list_id: self.list_count.read() + 1 ,user: user_address,timestamp };

            let new_id =  self.list_count.read() + 1;
            

            self.list_count.write(new_id);

            self.token_list.write(new_id,token_list);

            let is_user_player = self.is_player.read(user_address);
            

            if(is_user_player){

                let token_claim = amount;
                let user_balances = self.user_balances.read(user_address);
                let new_balance = user_balances.token_claim_balance + token_claim;

                self.user_balances.write(user_address, UserToken {user_id:user_balances.user_id, user:user_address,token_claim_balance: new_balance })
            }else{

                let user_id = self.user_count.read()+1;
                self.user_balances.write(user_address, UserToken {user_id, user:user_address,token_claim_balance: amount });
                self.user_count.write(user_id);
                self.is_player.write(user_address,true);
                
            }



        }

        fn get_added_to_list(self:@ContractState, id:u128) -> TokenList{
            self.token_list.read(id)
        }


        fn get_token_list(self: @ContractState) -> Array<TokenList>{

            let mut lists = ArrayTrait::<TokenList>::new();
            let total_lists = self.list_count.read();

            let mut count = 1;

            if total_lists > 0{
                loop {
                  
                    let list = self.token_list.read(count);
                    lists.append(list);
                    count +=1;
                    if(count > total_lists){
                        break;
                    }
                }
            }

            lists
        }

        fn approve_claim(ref self:ContractState,list_id:u128,to:ContractAddress,  amount: u256){

            assert(self.is_player.read(to),'USER NOT PLAYER');

            assert(amount != 0, 'INVALID AMOUNT');

            let user_balance = self.user_balances.read(to);

            assert(user_balance.token_claim_balance > amount,'INSUFFICIENT FUNDS');

            let user_address = get_caller_address();


            IStarkPayTokenDispatcher { contract_address: self.erc720ContractAdrress.read() }.transfer(to,amount);
            
            let amount = user_balance.token_claim_balance - amount;

            self.user_balances.write(user_address, UserToken{ user_id:user_balance.user_id,user:to,token_claim_balance:amount});

        }


       fn tokens_transfer(ref self: ContractState, to: ContractAddress, amount: u256){

            IStarkPayTokenDispatcher { contract_address: self.erc720ContractAdrress.read() }.transfer(to,amount);

        }

        fn tokens_mint(ref self: ContractState, to: ContractAddress, amount: u256){

            IStarkPayTokenDispatcher { contract_address: self.erc720ContractAdrress.read() }.mint(to,amount);

        }

        fn get_token_name(self: @ContractState) -> felt252 {
            IStarkPayTokenDispatcher { contract_address: self.erc720ContractAdrress.read() }.name() 
        }

        fn get_token_symbol(self: @ContractState) -> felt252 {
            IStarkPayTokenDispatcher { contract_address: self.erc720ContractAdrress.read() }.symbol()
        }

        fn get_token_allocation(self: @ContractState) -> u256{

            let user = get_caller_address();

            let allocation =  self.user_balances.read(user);

            allocation.token_claim_balance

        }

        fn claim(ref self:ContractState,amount: u256){     

            let user = get_caller_address();

            let balance = self.user_balances.read(user);

            assert(balance.token_claim_balance > amount, 'Not Enough Allocation');

            let claim_id = self.claim_count.read() + 1;

            self.claims.write(claim_id,UserTokenClaim {claim_id, user,token_claim_amount: amount});

            self.claim_count.write(claim_id);

        }

        fn get_claims(self: @ContractState, id:u128, amount:u128) -> Array<UserTokenClaim>{

            let mut claims = ArrayTrait::<UserTokenClaim>::new();
            let total_claims = self.claim_count.read();

            let mut count = 1;

            if total_claims > 0{
                loop {
                  
                    let claim = self.claims.read(count);
                    claims.append(claim);
                    count +=1;
                    if(count > total_claims){
                        break;
                    }
                }
            }

            claims
        }


    }
}

#[cfg(test)]
mod tests {


}
