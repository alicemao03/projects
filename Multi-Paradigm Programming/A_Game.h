#pragma once
#include <vector>
#include <string>

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description: 
 * Header file for Abstract Base Class Game
 * 
 */

class Game {
public:
    Game(int argc, const char* argv[]);
    virtual int play() = 0;

protected:
    std::vector<std::string> playerNames;
};