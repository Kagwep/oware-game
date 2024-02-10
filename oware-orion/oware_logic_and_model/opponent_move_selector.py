from coordinate_house_map import coordinates_houses_map
import numpy as np
import random


def check_next_best_move(legal_moves_dict,player_turn,top_row_seed_numbers,bottom_row_seed_numbers):
     player_row = 1 if 'House1' in player_turn.houses else 0
     opponents_row = top_row_seed_numbers if player_row == 1 else bottom_row_seed_numbers

     opponents_row = np.array(opponents_row)

     original_count = np.sum(opponents_row <= 2)

     max_count = 0
     selected_move = None

     for key, value in legal_moves_dict.items():
         
        if player_row == 1 :
             next_opponent_row_state = value[:6]
        else:
            next_opponent_row_state = value[6:]

        count = np.sum(next_opponent_row_state <= 2)
        if count > max_count:
            max_count = count
            selected_move = coordinates_houses_map.get(key)

     if max_count > original_count:
         return selected_move
     else:
         random_house_pick = random.choice(list(legal_moves_dict.keys()))
         selected_move = coordinates_houses_map.get(random_house_pick)
         return selected_move

        
    

def capture_move_check(game_state,legal_moves_dict,player_turn,houses_list):
    current_board_state = game_state.board_state
    player = player_turn
    possible_moves = legal_moves_dict
    houses_list = houses_list[::-1]
    # Extract seed numbers from House12 to House7
    top_row_seed_numbers = [current_board_state[f'House{i}']['seeds_number'] for i in range(12, 6, -1)]

    # Extract seed numbers from House1 to House6
    bottom_row_seed_numbers = [current_board_state[f'House{i}']['seeds_number'] for i in range(1, 7)]

    game_board_state = np.array([top_row_seed_numbers, bottom_row_seed_numbers])

    total_seeds = np.sum(game_board_state)
    current_seeds = total_seeds
    current_pick = current_seeds
    house = " "

    
    for key, value in possible_moves.items():
       
        next_total_seeds  = np.sum(value)

        if next_total_seeds < current_pick:
            house_name = coordinates_houses_map.get(key)
            current_pick = next_total_seeds
            house = house_name
        else:
            current_pick = current_pick
        
    if current_pick == total_seeds:
        select_move = check_next_best_move(legal_moves_dict,player_turn,top_row_seed_numbers,bottom_row_seed_numbers)
        return select_move
    else:
        return house












