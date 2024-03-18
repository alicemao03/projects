#include "A_Game.h"
#include "Enums.h"
#include <iostream>

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description: 
 * Source file for Abstract Base Class Game
 * 
 */

/**
 * @brief Construct a new Game:: Game object, passed original argc and argv and iterates 2 positions
 * 
 * @param argc 
 * @param argv 
 */
Game::Game(int argc, const char* argv[]) {
    int it = GAME_IT_POS;
    while (it < argc) {
        playerNames.push_back(argv[it]);
        it++;
    }
}