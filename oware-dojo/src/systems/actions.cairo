use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher,IWorldDispatcherTrait};
// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(self: @TContractState, opponent:ContractAddress);
    fn move(
    self: @TContractState,
    move:oware_dojo::models::board::Move,
    current_house:oware_dojo::models::board::HouseNumber,
    next_house:oware_dojo::models::board::HouseNumber,
    game_id:felt252
    );
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use oware_dojo::models::board::{Player,House,HouseNumber,Game,GameTurn,Move,GameMove,PlayerMove};

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Sowed: Sowed,
        Captured:Captured
    }



    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Sowed {
        player: ContractAddress,
        house: HouseNumber
    }


    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Captured {
        player: ContractAddress,
        house: HouseNumber
    }



    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        // ContractState is defined by system decorator expansion
        fn spawn(self: @ContractState,opponent:ContractAddress,house:HouseNumber,seeds:u32,x:u32,y:u32:z:u32) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let game_id = pedersen::pedersen(player.into(), opponent.into());

            set!(
                world,(
                    Game {
                        game_id: game_id,
                        winner:Player::None(()),
                        player_one:player,
                        player_two:opponent,
                    },
                    GameTurn{
                        game_id:game_id,
                        turn:Player::PlayerOne(())
                    },
                )
            );

            set!(world, (House { game_id: game_id, x, y, , house: House::house,seeds }));
            set!(world, (GameMove{ game_id: game_id,player,last_move:Move::None()}));
            set!(world, (PlayerMove{ game_id: game_id,player,last_move:Move::None(),captured:0}));
        }

        // Implementation of the move function for the ContractState struct.
        fn move(
            self: @ContractState, 
            move: Move,
            current_house: HouseNumber,
            next_house: HouseNumber,
            game_id:felt252,
            curr_position: (u32, u32, u32),
            prev_position: (u32, u32, u32),
            opponent:ContractAddress,
            seeds:u32,
            captured:u32
            ) {

            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            let (current_x, current_y,current_z) = curr_position;
            let (previous_x, previous_y,previous_z) = prev_position;

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let mut curr_house  = get!(world, (game_id, previous_x, previous_y, previous_y), (House));

            // Retrieve the player's current position and moves data from the world.
            let (mut game_move, mut player_move) = get!(world,(game_id,player), (GameMove, PlayerMove));

            curr_house.x = current_x;
            curr_house.y = current_y;
            curr_house.z = current_z;

            curr_house.house = current_house;

            curr_house.seeds = seeds;

            game_move.move = move;

            player_move.move =move;
            player_move.captured += captured;


            set!(world,(curr_house))
            // Update the world state with the new moves data and position.
            set!(world, (game_move, player_move));

            // Emit an event to the world to notify about the player's move.
            //emit!(world, Moved { player, direction });
        }
    }
}
