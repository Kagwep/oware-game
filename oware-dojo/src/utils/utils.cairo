use oware_dojo::models::board::HouseNumber;
use starknet::ContractAddress;

fn is_house_is_mine(is_house:  HouseNumber) -> bool {
    false
}

fn is_correct_turn(is_house: HouseNumber, caller: ContractAddress, game_id: felt252) -> bool {
    true
}

fn is_out_of_board(next_position: (u32, u32)) -> bool {
    let (n_x, n_y) = next_position;
    if n_x > 7 || n_x < 0 {
        return false;
    }
    if n_y > 7 || n_y < 0 {
        return false;
    }
    true
}

fn is_right_piece_move(
    is_house: HouseNumber, curr_position: (u32, u32), next_position: (u32, u32)
) -> bool {
    let (c_x, c_y) = curr_position;
    let (n_x, n_y) = next_position;
    match is_house {
        HouseNumber::House1 => {
            true
        },
        HouseNumber::House2 => {
            true
        },
        HouseNumber::House3 => {
            true
        },
        HouseNumber::House4 => {
            true
        },
        HouseNumber::House5 => {
            true
        },
        HouseNumber::House6 => {
            true
        },
        HouseNumber::House7 => {
            true
        },
        HouseNumber::House8 => {
            true
        },
        HouseNumber::House9 => {
            true
        },
        HouseNumber::House10 => {
            true
        },
        HouseNumber::House11 => {
            true
        },
        HouseNumber::House12 => {
            true
        },
        HouseNumber::None(_) => panic(array!['Should not move empty House']),
    }
}

