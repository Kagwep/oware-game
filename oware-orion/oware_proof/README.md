# Provable AI Oware Agent



**This document provides an overview of the Giza, Orion, and proving aspects of the project.**

### Project Overview

Our project focuses on implementing an AI agent for playing Oware, a traditional African board game. We aim to create an autonomous agent capable of making strategic decisions to compete against human players or other AI agents.

### Components

1. **Oware Agent:** Implemented in Python, the Oware agent uses algorithms to make intelligent moves during gameplay. It analyzes the current board state, evaluates potential moves, and selects the best based on predefined strategies.
2. **Giza:** This command-line interface (CLI) tool allows interaction with StarkNet contracts and proof systems. In our project, we use Giza to prove the correctness of our Oware agent's decision-making algorithms.
3. **Orion:** This library enables formal verification of smart contracts written in the Cairo language. We leverage Orion to verify the logic and behavior of our Oware agent's decision-making algorithms.
4. **Proving Aspect:** We use Giza and Orion together to formally prove the correctness and reliability of our Oware agent's decision-making algorithms. This verification ensures the agent behaves as expected and adheres to Oware gameplay rules.

