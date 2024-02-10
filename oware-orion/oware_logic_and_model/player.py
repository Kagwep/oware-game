class Player:
    def __init__(self,name,houses,captured):
        self.name = name
        self.houses = houses
        self.captured = captured

    def player_info(self):
        player = {
            "name":self.name,
            "houses":self.houses,
            "captured":self.captured
        }
        return player
    
    def get_captured(self):
        return self.captured
    
    