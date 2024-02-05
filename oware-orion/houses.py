from colorama import init as colorama_init
from colorama import Fore,Back
from colorama import Style

colorama_init()


class Houses:

    def __init__(self):
        self.houses_dictionary = {
            'House1': {'seeds': ['seed1', 'seed2', 'seed3', 'seed4'], 'seeds_number': 4},
            'House2': {'seeds': ['seed5', 'seed6', 'seed7', 'seed8'], 'seeds_number': 4},
            'House3': {'seeds': ['seed9', 'seed10', 'seed11', 'seed12'], 'seeds_number': 4},
            'House4': {'seeds': ['seed13', 'seed14', 'seed15', 'seed16'], 'seeds_number': 4},
            'House5': {'seeds': ['seed17', 'seed18', 'seed19', 'seed20'], 'seeds_number': 4},
            'House6': {'seeds': ['seed21', 'seed22', 'seed23', 'seed24'], 'seeds_number': 4},
            'House7': {'seeds': ['seed25', 'seed26', 'seed27', 'seed28'], 'seeds_number': 4},
            'House8': {'seeds': ['seed29', 'seed30', 'seed31', 'seed32'], 'seeds_number': 4},
            'House9': {'seeds': ['seed33', 'seed34', 'seed35', 'seed36'], 'seeds_number': 4},
            'House10': {'seeds': ['seed37', 'seed38', 'seed39', 'seed40'], 'seeds_number': 4},
            'House11': {'seeds': ['seed41', 'seed42', 'seed43', 'seed44'], 'seeds_number': 4},
            'House12': {'seeds': ['seed45', 'seed46', 'seed47', 'seed48'], 'seeds_number': 4}
        }
        self.houses_order = ['House12', 'House11', 'House10', 'House9', 'House8', 'House7', 'House6', 'House5', 'House4', 'House3', 'House2', 'House1']

    def get_houses(self):
        return self.houses_dictionary
 

    # Print the information in two rows
    def print_houses(self):
        houses_player_one = self.houses_order[6:12]
        houses_player_two = self.houses_order[0:6]

        all_houses = houses_player_two + houses_player_one[::-1]

        for i, house_name in enumerate(all_houses, start=1):
            seeds_info = f"{house_name}: {Back.MAGENTA} {self.houses_dictionary[house_name]['seeds_number']} {Style.RESET_ALL}"
            print(seeds_info, end='\n' if i % 6 == 0 else '\t')

        return ''


        




