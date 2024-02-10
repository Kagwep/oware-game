from state import State
from player import Player
from houses import Houses
from play import Play
from oware_moves import OwareMoves

from colorama import init as colorama_init
from colorama import Fore,Back
from colorama import Style

import pprint,random
import numpy as np
import pandas as pd 

# from scipy.ndimage.interpolation import shift
from scipy.ndimage import shift
import matplotlib.pyplot as plt

from keras.models import Sequential
from keras.layers import Dense,Dropout
from keras.optimizers import SGD

from coordinate_house_map import coordinates_houses_map
from opponent_move_selector import capture_move_check


colorama_init()



def get_player_name():
        name = input(f"{Fore.GREEN}Please enter your username:{Style.RESET_ALL} ")
        return name


def is_valid(x):
      if(int(x) <= 12 and int(x) != 0 ):
            return True
      else:
            return False
      
def check_seeds_in_houses(houses,player_houses):
      first_house = houses[player_houses[0]]
      second_house = houses[player_houses[1]]
      third_house = houses[player_houses[2]]
      fourth_house = houses[player_houses[3]]
      fifth_house = houses[player_houses[4]]
      sixth_house = houses[player_houses[5]]
      
      total_seeds = len(first_house['seeds']) + len(second_house['seeds']) + len(third_house['seeds']) + len(fourth_house['seeds']) + len(fifth_house['seeds']) + len(sixth_house['seeds'])

      return total_seeds

def check_sow_move(index_of_first_house, house_index,number_of_seeds):
      '''
      This function will return True if the sow move is valid and False if it doesnt
      '''

      valid_sum = house_index + number_of_seeds

      if index_of_first_house > 5 and valid_sum >= 12:
            return True
      
      elif (index_of_first_house >= 0 and index_of_first_house <=5 ) and valid_sum >= 6:
            return True
      
      else:
            print(f"{Back.RED} Select House that gives opponent atleast one seed. {Style.RESET_ALL}")
            return False
            
def opponent_have_seed(house_name,house,houses_list,opponent_seeds,player):

      '''
      This functions finds out whether by selecting the house and seeds to sow. Opponent will recieve atleaset one
      seed if opponent  has no seeds as per the ruoles.
      '''

      if opponent_seeds > 0:
            return True 
      else:
            house_index = houses_list.index(house_name)
            player_houses = player.houses
            
            first_house = 'House1' if player_houses[0] == 'House1' else 'House7'

            first_house_index = houses_list.index(first_house)

            house_seeds = len(house['seeds'])

            check_sow_move(first_house_index ,house_index,house_seeds)
   

def select_house(player,houses,opponent,houses_list):
      houses_list = houses_list[::-1]
      print("Your houses: ",Fore.BLUE,player.houses,Style.RESET_ALL)
      
      try:
            number_of_house = int(input(f"{Fore.LIGHTGREEN_EX}Enter number of house to pick seeds:{Style.RESET_ALL} "))
      except ValueError:
            print(f"{Back.RED}Please enter a valid number.{Style.RESET_ALL}")
            select_house(player,houses,opponent,houses_list)


      number =is_valid(number_of_house)
      

      if number:
            house_name= 'House'+ str(number_of_house)
            house = houses[house_name]
            opponent_houses = opponent.houses

            num_of_seeds = check_seeds_in_houses(houses,opponent_houses)

            check_opponenet = opponent_have_seed(house_name,house,houses_list,num_of_seeds,player)

            if house_name in player.houses and len(house['seeds']) > 0 and check_opponenet:
                  return house_name
            else:
                  print(f"{Fore.RED}Please select house in your houses with seed(s){Style.RESET_ALL}")
                  return select_house(player,houses,opponent,houses_list)
      
      else:
            return select_house(player,houses,opponent,houses_list)



def oware(player_1,player_2):
    
    model = Sequential()
    model.add(Dense(18, input_dim=12,kernel_initializer='normal', activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(9, kernel_initializer='normal',activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(1,kernel_initializer='normal'))

    learning_rate = 0.001
    momentum = 0.8

    sgd = SGD(lr=learning_rate, momentum=momentum,nesterov=False)
    model.compile(loss='mean_squared_error', optimizer=sgd)
    model.summary()

    game_houses =  Houses()
    oware_moves = OwareMoves()
    game_houses.print_houses()


    name = get_player_name() if player_1 == '' else player_1
    player_houses = game_houses.houses_order[::-1][0:6]
    captured = 0

    player_one = Player(name,player_houses,captured)

    name = get_player_name() if player_2 == '' else player_2
    player_houses = game_houses.houses_order[::-1][6:12]
    captured = 0

    player_two = Player(name,player_houses,captured)


    game_state = State(True,player_one,player_two,player_one.name,game_houses.houses_dictionary)


    player = player_one
    opponent = player_two

    print("Its your turn ",Fore.YELLOW,game_state.players_turn,Style.RESET_ALL)

    play = Play(player.name,game_houses,game_state)

    train_mode = False


    scores_list=[]
    corrected_scores_list=[]
    new_board_states_list=[]
    
    while game_state.inplay:

      oware_moves.legal_moves_generator(game_state,player)

      move_selected = oware_moves.move_selector(model)

      if len(move_selected) == 3:
            selected_move,new_board_state,score = move_selected
      else:
            opponent_seeds = move_selected[0]
            opponent.captured += opponent_seeds
            print(Back.YELLOW,opponent.name + "  has won!",Style.RESET_ALL)
            print(Back.MAGENTA,"Captured: ",Back.LIGHTGREEN_EX,opponent.captured,Style.RESET_ALL)
            print(game_houses.print_houses())
            game_state.inplay = False
            game_state.winner = opponent
            break

      scores_list.append(score[0][0])
      new_board_states_list.append(new_board_state)
      
      if player.name == 'Agent':
            train_mode = True
            selected_house = coordinates_houses_map.get(selected_move)
      elif player.name == 'Bob':
            selected_house = capture_move_check(game_state,oware_moves.legal_moves_dict,player,game_houses.houses_order)
      else:
            selected_house = select_house(player,game_houses.houses_dictionary,opponent,game_houses.houses_order)

      print('selected house ',Fore.LIGHTBLUE_EX,selected_house,Style.RESET_ALL)

      result = play.make_move(selected_house,True,True,player,opponent,game_state)

      if result == 'game_on':
            player, opponent = (player_two, player_one) if player == player_one else (player_one, player_two)            
            print(game_houses.print_houses())
            print("Its your turn ",Fore.YELLOW,game_state.players_turn,Style.RESET_ALL)
            print("Captured: ",Fore.LIGHTCYAN_EX,player.captured,Style.RESET_ALL)

      elif result == 'draw':
            print(Back.YELLOW,"Its a draw!, " + " you both captured 24 seeds.",Style.RESET_ALL)
            print(Back.MAGENTA,"Captured: ",Back.LIGHTGREEN_EX,player.captured,Style.RESET_ALL)
            print(game_houses.print_houses())
            game_state.inplay = False
            game_state.draw = True

      else:
            print(Back.YELLOW,player.name + "  has won!",Style.RESET_ALL)
            print(Back.MAGENTA,"Captured: ",Back.LIGHTGREEN_EX,player.captured,Style.RESET_ALL)
            print(game_houses.print_houses())
            game_state.inplay = False
            game_state.winner = player

      opponent = opponent

    if train_mode:
      # Correct the scores, assigning 1/0/-1 to the winning/drawn/losing final board state, 
      # and assigning the other previous board states the score of their next board state
      new_board_states_list=tuple(new_board_states_list)
      new_board_states_list=np.vstack(new_board_states_list)
      if game_state.winner != '' and game_state.winner.name=="Agent": 
            corrected_scores_list=shift(scores_list,-1,cval=1.0)
            result="Won"
      if game_state.winner != '' and game_state.winner.name=="Bob":
            corrected_scores_list=shift(scores_list,-1,cval=-1.0)
            result="Lost"
      if game_state.draw:
            corrected_scores_list=shift(scores_list,-1,cval=0.0)
            result="Drawn"
            
      x=new_board_states_list
      y=corrected_scores_list
      
      def unison_shuffled_copies(a, b):
            assert len(a) == len(b)
            p = np.random.permutation(len(a))
            return a[p], b[p]
      
      # shuffle x and y in unison
      x,y=unison_shuffled_copies(x,y)
      x=x.reshape(-1,12) 
      
      # update the weights of the model, one record at a time
      model.fit(x,y,epochs=1,batch_size=1,verbose=0)
      return model,y,result
                

game_counter=1
data_for_graph=pd.DataFrame()


while(game_counter<=500):
    oware_results =  oware('Agent','Bob')
    if oware_results is not None:
      model,y,result=oware_results
    print("Game#: ",game_counter)
    game_counter+=1

 
model.save('model/oware-500.h5')

    

