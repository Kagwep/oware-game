use starknet::ContractAddress;
use array::ArrayTrait;
use debug::PrintTrait;


#[derive(Model, Drop, Serde)]
struct House {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    #[key]
    z: u32,
    house: HouseNumber,
    seeds: u32
}


#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum HouseNumber {
    House1: (),
    House2: (),
    House3: (),
    House4: (),
    House5: (),
    House6: (),
    House7: (),
    House8: (),
    House9: (),
    House10: (),
    House11: (),
    House12: (),
    None: (),
}



#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum Player {
    PlayerOne: (),
    PlayerTwo: (),
    None: (),
}


#[derive(Model, Drop, Serde)]
struct GameMove {
    #[key]
    game_id: felt252,
    player: ContractAddress,
    last_move: Move
}

#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum Move {
    Sow: (),
    Capture: (),
    None: (),
}




#[derive(Model, Drop, Serde)]
struct Game {
    /// game id, computed as follows pedersen_hash(player1_address, player2_address)
    #[key]
    game_id: felt252,
    winner: Player,
    player_one: ContractAddress,
    player_two: ContractAddress
}

#[derive(Model, Drop, Serde)]
struct GameTurn {  
    #[key]
    game_id: felt252,
    turn: Player
}


#[derive(Model, Drop, Serde)]
struct PlayerMove {
    #[key]
    game_id: felt252,
    player: ContractAddress,
    last_move: Move, 
    captured: u32
}
