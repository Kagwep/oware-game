import numpy as np
import copy

class OwareMoves(object):

    def __init__(self):
        self.board_numpy_status = []
        self.player_turn = ''
        self.legal_moves_dict = {}

    def check_for_capture(self, seeds, in_player_houses):
        return (seeds == 3 or seeds == 2) and not in_player_houses

    def check_previous(self, original_path, next_house_to_sow):
        next_house_to_sow = next_house_to_sow - 1
        previous_house_seeds = original_path[next_house_to_sow]
        in_player_houses = next_house_to_sow > 5

        if self.check_for_capture(previous_house_seeds, in_player_houses):
            original_path[next_house_to_sow] = 0
            original_path = self.check_previous(original_path, next_house_to_sow)

        return original_path

    def is_there_a_capture(self, original_path, next_house_to_sow):
        seeds = original_path[next_house_to_sow]
        in_player_houses = next_house_to_sow > 5

        if self.check_for_capture(seeds, in_player_houses):
            original_path[next_house_to_sow] = 0
            original_path = self.check_previous(original_path, next_house_to_sow)
        else:
            original_path[next_house_to_sow] += 1 

        return original_path



    def possible_moves(self,player_turn, player,original_board):
        board_state = original_board.copy()
        # Check the condition to determine which row to select from the result_array
        selected_row = 1 if player_turn != '' and 'House1' in player.houses else 0
        opponent_row = 0 if selected_row == 1 else 1

        # Extract the selected row from the board_state
        selected_board_row = board_state[selected_row]
        opponent_board_row = board_state[opponent_row]

        # Initialize moves dictionary to store coordinates and updated board states
        moves = {}



        selected_board_row_state = selected_board_row.tolist()
        opponent_row_board_new_state = opponent_board_row.tolist()

        if selected_row == 1 :
            result_move_path = selected_board_row_state + opponent_row_board_new_state[::-1]
        else:
            selected_board_row = selected_board_row[::-1]
            result_move_path = selected_board_row_state[::-1] + opponent_row_board_new_state
            

        original_path = copy.deepcopy(result_move_path)



        for col in range(len(selected_board_row)):

            picked_seeds = selected_board_row[col]
            if picked_seeds > 0:
                original_path[col] = 0

                next_house_to_sow = col + 1

                
                move_to_house  = col + picked_seeds

                for i in range(col, move_to_house):

                    if i != move_to_house:
                        original_path[next_house_to_sow] += 1
                    else:
                        original_path = self.is_there_a_capture(original_path,next_house_to_sow)
                        
                    if next_house_to_sow == 11:
                        next_house_to_sow = 0
                    else:
                        next_house_to_sow += 1

                

                if selected_row == 1:
                    moves[(selected_row, col)] = np.array([original_path[6:12][::-1],original_path[0:6]]).flatten()
                else:
                    print(original_path)
                    moves[(selected_row, col)] = np.array([original_path[0:6][::-1],original_path[6:12]]).flatten()

                original_path = copy.deepcopy(result_move_path)



    
        return moves

    def legal_moves_generator(self,game_state,player):
        current_board_state,player_turn = game_state.board_state, game_state.players_turn
        self.player_turn = player_turn

        # Extract seed numbers from House12 to House7
        top_row_seed_numbers = [current_board_state[f'House{i}']['seeds_number'] for i in range(12, 6, -1)]

        # Extract seed numbers from House1 to House6
        bottom_row_seed_numbers = [current_board_state[f'House{i}']['seeds_number'] for i in range(1, 7)]

        # Create the resultant array
        result_array = np.array([top_row_seed_numbers, bottom_row_seed_numbers])
        
        self.board_numpy_status = result_array

        moves = self.possible_moves(player_turn, player,self.board_numpy_status)

        self.legal_moves_dict = moves

        print(moves)

    def move_selector(self,model):

        if self.legal_moves_dict:

            tracker={}
            for legal_move_coord in self.legal_moves_dict:
                score=model.predict(self.legal_moves_dict[legal_move_coord].reshape(1,12))
                tracker[legal_move_coord]=score
            selected_move=max(tracker, key=tracker.get)
            new_board_state=self.legal_moves_dict[selected_move]
            score=tracker[selected_move]

            return selected_move,new_board_state,score
        
        else:
            return (np.sum(self.board_numpy_status),)
    
    


