import numpy as np
import copy

class MovesTest:
    def __init__(self):
        pass

    def possible_moves(self, player_turn, player, original_board):
        board_state = np.copy(original_board)
        selected_row = 1 if player_turn != '' and 'House1' in player else 0
        opponent_row = 0 if selected_row == 1 else 1

        selected_board_row = board_state[selected_row].copy()
        opponent_board_row = board_state[opponent_row].copy()

        moves = {}

        selected_board_row_state = selected_board_row.copy()
        opponent_row_board_new_state = opponent_board_row.copy()

        if selected_row == 1:
            result_move_path = np.concatenate((selected_board_row_state, opponent_row_board_new_state[::-1]))
        else:
            selected_board_row_state = selected_board_row_state[::-1]
            result_move_path = np.concatenate((selected_board_row_state, opponent_row_board_new_state))

        original_path = np.copy(result_move_path)

        for col in range(len(selected_board_row)):
            picked_seeds = selected_board_row[col]
            original_path[col] = 0

            next_house_to_sow = col + 1

            for _ in range(col, col + picked_seeds):
                original_path[next_house_to_sow] += 1

                if next_house_to_sow > 11:
                    next_house_to_sow = next_house_to_sow - 12
                else:
                    next_house_to_sow += 1

            if selected_row == 1:
                moves[(selected_row, col)] = np.concatenate((original_path[6:12][::-1], original_path[0:6]))
            else:
                moves[(selected_row, col)] = np.concatenate((original_path[0:6][::-1], original_path[6:12]))

            original_path = np.copy(result_move_path)

        return moves


# Example usage:
# Create an instance of YourClass
moves = MovesTest()

# Example board state (using NumPy arrays)
original_board = np.array([[5, 5, 0, 4, 4, 4],
                           [1, 6, 5, 5, 5, 4]])

# Example player turn and player houses
player_turn = 'SomePlayerTurn'
player_houses = ['House7', 'House8']

# Call possible_moves method
print(original_board)
moves = moves.possible_moves(player_turn, player_houses, original_board)
print(moves)
