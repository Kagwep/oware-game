class State:
    def __init__(self,inplay,player_one,player_two,player,board_state):
        self.inplay = inplay
        self.player_one = player_one
        self.player_two = player_two
        self.players_turn = player
        self.board_state = board_state
        self.winner = ''
        self.draw = False
        
        
    def get_player_one_info(self):
        return self.player_one
    
    def get_player_two_info(self):
        return self.player_two
    
    def is_inplay(self):
        return self.inplay
    
    def state_info(self):

        info = {
            "in_play":self.inplay,
            "player_one":self.player_one,
            "player_two":self.player_two
        }

        return info
    
    def get_player_turn(self):
        return self.player