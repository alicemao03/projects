#pragma once
#include <vector>
#include <string>
#include <type_traits>
#include "HoldEm.h"
#include "Suit.h"
#include "T_CardSet.h"
#include "A_Game.h"

/**
 * @brief Class declaration for GoFishGame
 * 
 * @tparam R 
 * @tparam S 
 * @tparam D 
 */
template <typename R=HoldEmRank, typename S=Suit, typename D=HoldEmDeck>
class GoFishGame : public Game {
    protected:
        D fDeck;
        static_assert(std::is_base_of<CardSet<R, S>, D>::value);
        std::vector<CardSet<R,S>> p_hands;
        std::vector<CardSet<R,S>> p_books;
    
    private:
        std::vector<int> eliminated_players;
        std::vector<std::string> player_names;

    public:
        GoFishGame(int argc, const char *argv[], D deck);
        virtual ~GoFishGame() = default;
        virtual int play();
    
    protected:
        virtual void deal();
        bool collect_books(int player);
        bool turn(int playerNumber);

};

#ifdef TEMPLATE_HEADERS_INCLUDE_SOURCE
#include "T_GoFishGame.cpp"
#endif