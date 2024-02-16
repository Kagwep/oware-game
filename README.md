# oware-dojo

![Oware](https://res.cloudinary.com/duybctvku/image/upload/v1706537308/oware1_bqkmyd.png)

## About Oware
LIVE LINK: https://oware-game.vercel.app/

Oware is a strategic board game where each player is assigned six houses arranged in a circular pattern. Additionally, there is a score house at the the end for each player. The game employs a total of 48 beads, initially distributing four beads in each of the twelve houses.

The main goal of the game is for players to strategically navigate their beads across the board arrangement, with the aim of capturing more beads than their opponent. The outer edge of the board consists of twelve play spaces or houses, forming the primary arena for gameplay. Each player's six houses create a distinct territory where the strategic maneuvers take place.

The  score houses acts as the destination for accumulated beads, while the six houses on each player's side serve as the playing field. A player wins after successfuly capturing 25 beads or more. It ends in a draw if both players capture 24. The win traces which can be verified that such movews can lead to a win are stored on Areon network and the players recieve redeamable nft tokens.

# Features

## Blockchain integration:

- **Smart Contracts with Dojo:** The core game logic resides on secure, transparent smart contracts powered by the Dojo provable game engine. This ensures fair and verifiable gameplay on the blockchain.

- **Giza - Orion:** This dedicated framework for Provable Machine Learning provides crucial components and an ONNX runtime for building an AI Oware agent, enabling a challenging and evolving opponent.

## Immersive Experience:

- **3D Visualization with Babylon.js and Blender:** Immerse yourself in the world of Oware with stunning 3D visuals powered by Babylon.js. Models crafted in Blender bring the game to life, enhancing your gaming experience.

- **Multi-wallet compatibility:** Access the game using your preferred wallet:
  - Argen: A user-friendly, non-custodial wallet for seamless tokens management.

  - Braavos: A powerful and versatile platform for diverse blockchain interactions.

## OWR Token:

- **Earn and trade:** Oware introduces the OWR token, a digital asset earned through in-game achievements and tradable. This adds a layer of strategic gameplay and potential rewards.


## Development Setup


## How to Set-Up
1. Oware is played on a board with 12 large play spaces (houses) around the outside of the board and one large score house for each player in the center.
2. Oware requires 48 beads of any color. 4 beads are placed into each of the houses to start the game.
3. Players decide who begins the game by rolling a die.

## How to Play

Starting the Game:

Start a new game by creating a new room.
Follow the prompts to initiate the game setup.
Click Copy Room ID to Clipboard:


Open the messaging app or communication platform you want to use to share the Room ID with your opponent.
Paste the copied Room ID into a message or chat window.
Send the message to your opponent, along with any additional instructions they might need.

Joining the Game:

The opponent receives the message containing the Room ID.
They navigate to the same game platform.
Look for the option to join an existing game or enter a room using a specific code.

Entering the Room:

In the game's interface, they should find the option to join an existing game or enter a room.
Select the appropriate option and are prompted to enter the Room ID.

Starting the Game:

The game should begin once both players are successfully in the room.

Understanding Player Positions:

Player one  has houses numbered 1 to 6 clockwise.
Player two has houses numbered 7 to 12 (top row).

Commence Gameplay:

1. In turns, players pick up all the beads from any 1 of the houses on their side of the board and redistribute them 1 bead per house counter-clockwise, including houses on their opponent’s side of the board.
2. If a player has 12 or more beads to redistribute, they must skip the original house, leaving it empty at the end of the turn.
3. If a player’s final bead is deposited in a house on their side of the board, they take another turn *The bulb on the left side turns to GREEN that means it's your turn to play, but if it turns to RED it means it's the next player's move*.
5. At the end of the turn, if the last bead is deposited into a house on the opponent’s side of the board with exactly 2 or 3 beads, the player captures all these beads.
6. A player may also capture all the beads in houses prior to the final bead played if they also have 2 or 3 beads in them. If a house has 1, or 4 or more seeds in it, the string of captures is broken.
7. If a move would capture all beads on the opponent’s side of the board, the capture is forfeited as this would prevent their opponent from continuing the game.
8. All captured beads are placed into the player’s score house.

## How to Win
1. To win the game, a player must capture >=25 beads than their opponent.
2. The game ends in a draw if both players have 24 seeds.

## Technologies Used
- Dojo
- Giza Orion
- Argent
- Braavos
- Babylon.js
- Blender
- OWR

## Bounties 
- Dojo
- Giza Tech
- Argent
- Braavos

## Contributing
Contributions to Oware smart contract are welcome! Here are some ways you can help:

    Report bugs and issues on GitHub. Please include steps to reproduce, expected vs actual behavior, and any relevant code.
    Suggest new features and enhancements using the GitHub issues.
    Improve documentation by submitting pull requests with additions, clarifications or fixes.
    Find and submit security vulnerabilities through responsible disclosure.
    Optimize gas usage and improve code efficiency.
    Add test cases to increase code coverage.
    Help translate project content for internationalization.
    Promote the project by publishing articles, tutorials, videos etc.

Pull Requests

Pull requests should target the develop branch. Follow these steps:

    Fork the repo and create your branch from develop.
    Make your code changes following existing styles.
    Ensure CI builds pass and has no conflicts.
    Update documentation as needed.
    Describe PR intent clearly with details.

## License
- MIT Licenses

## Contact Information
- Peter: kagwepeter07@gmail.com [github](https://github.com/Kagwep)
