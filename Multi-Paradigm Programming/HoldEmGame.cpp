#include "HoldEmGame.h"
#include "Enums.h"
#include "T_Card.h"
#include <map>
#include <vector>
//#include <algorithm>

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description:
 * Source file for HoldEm Game
 *
 */

/**
 * @brief Construct a new Hold Em Game:: Hold Em Game object
 *
 * @param argc
 * @param argv
 */
HoldEmGame::HoldEmGame(int argc, const char *argv[]) : Game(argc, argv), hState(HoldEmState::preflop)
{
    CardSet<HoldEmRank, Suit> handToPush;
    for (int it = GAME_IT_POS; it < argc; it++)
    {
        playerHands.push_back(handToPush);
    }
}

/**
 * @brief deals out cards based on the current HoldEmState
 *
 */
void HoldEmGame::deal()
{

    int dealRound = START_IT_ZERO;
    switch (hState)
    {
    case HoldEmState::preflop:

        while (!hDeck.is_empty() && dealRound < HOLDEM_PREFLOP_HAND)
        {
            // Iterate through playerHands vector to deal a card to each player
            for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerNames.size(); ++it)
            {
                try
                {
                    hDeck >> playerHands[it];
                }
                catch (const std::runtime_error &error)
                {
                    throw error;
                }
            }
            dealRound++;
        }

        hState = HoldEmState::flop;
        break;

    case HoldEmState::flop:
        try
        {
            hDeck >> board;
            hDeck >> board;
            hDeck >> board;
        }
        catch (const std::runtime_error &error)
        {
            throw error;
        }

        hState = HoldEmState::turn;
        break;

    case HoldEmState::turn:

        try
        {
            hDeck >> board;
        }
        catch (const std::runtime_error &error)
        {
            throw error;
        }
        hState = HoldEmState::river;
        break;

    case HoldEmState::river:
        try
        {
            hDeck >> board;
        }
        catch (const std::runtime_error &error)
        {
            throw error;
        }

        hState = HoldEmState::undefined;
        break;

    case HoldEmState::undefined:
        break;
    }
}

int HoldEmGame::play()
{
    std::string response = "";

    while (response != "yes")
    {
        hDeck.shuffle();
        hState = HoldEmState::preflop;

        // Try to deal cards, return error enum if error is returned
        try
        {
            deal();
        }
        catch (const std::runtime_error &error)
        {
            std::cout << "ERROR: " << error.what() << std::endl;
            return ERROR_DEALING_PLAYER_HAND;
        }

        // print each player's name AND hand
        for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerNames.size(); ++it)
        {
            std::cout << playerNames[it] << ": ";
            playerHands[it].print(std::cout, HELD_HOLDEM_CARDS);
        }

        std::cout << std::endl;

        // Try to deal 3 cards in flop state and print board. return error enum if error is caught
        try
        {
            deal();
            std::cout << "BOARD (flop): ";
            board.print(std::cout, FLOP_CARDS);
            std::vector<HoldEmGameStruct> playerStructVector;

            // pushback struct for each player
            for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerNames.size(); ++it)
            {
                HoldEmGameStruct playerStruct(playerHands[it], playerNames[it], HoldEmHandRank::undefined);
                playerStructVector.push_back(playerStruct);
            }

            std::cout << "154" << std::endl;

            // iterate through each player and evaluate their hand with new cards
            for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerStructVector.size(); ++it)
            {
                // create deep copy of board CardSet
                CardSet<HoldEmRank, Suit> boardCopy(board);
                boardCopy >> playerStructVector[it].cardSetHand;
                boardCopy >> playerStructVector[it].cardSetHand;
                boardCopy >> playerStructVector[it].cardSetHand;
                playerStructVector[it].structRank = holdem_hand_evaluation(playerStructVector[it].cardSetHand);
            }

            std::cout << "165" << std::endl;
            
            //std::sort(playerStructVector.begin(), playerStructVector.end(), [](const HoldEmGame::HoldEmGameStruct &lhs, const HoldEmGame::HoldEmGameStruct &rhs) {return rhs < lhs;});

            std::cout << "171" << std::endl;

            for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerStructVector.size(); ++it)
            {
                std::cout << playerStructVector[it].name << std::endl;
                std::cout <<  "Hand: ";
                playerStructVector[it].cardSetHand.print(std::cout, FULL_HOLDEM_HAND);
                std::cout << "Rank: " << playerStructVector[it].structRank << std::endl;
                std::cout << std::endl;
            }
        }
        catch (const std::runtime_error &error)
        {
            std::cout << "ERROR: " << error.what() << std::endl;
            return ERROR_DEALING_PLAYER_HAND;
        }

        // Try to deal 1 card in turn state and print board. return error enum if error is caught
        try
        {
            deal();
            std::cout << "BOARD (turn): ";
            board.print(std::cout, TURN_CARDS);
        }
        catch (const std::runtime_error &error)
        {
            std::cout << "ERROR: " << error.what() << std::endl;
            return ERROR_DEALING_PLAYER_HAND;
        }

        // Try to deal deal 1 card in river state and print board. return error enum if error is caught
        try
        {
            deal();
            std::cout << "BOARD (river): ";
            board.print(std::cout, RIVER_CARDS);
        }
        catch (const std::runtime_error &error)
        {
            std::cout << "ERROR: " << error.what() << std::endl;
            return ERROR_DEALING_PLAYER_HAND;
        }

        // Try to collect each of the hands of the players
        for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerNames.size(); ++it)
        {
            try
            {
                //std::cout << "here hold em" << std::endl;
                hDeck.collect(playerHands[it]);
                // hDeck.collect(playerHands[it]);
            }
            catch (const std::runtime_error &error)
            {
                std::cout << "ERROR: " << error.what() << std::endl;
                return ERROR_COLLECTING_PLAYER_HAND;
            }
        }

        // Try to collect the cards fromt he board
        try
        {
            hDeck.collect(board);
        }
        catch (const std::runtime_error &error)
        {
            std::cout << "ERROR: " << error.what() << std::endl;
            return ERROR_COLLECTING_COMMON_BOARD;
        }

        std::cout << "End game (yes/no)? ";
        std::cin >> response;
    }

    return SUCCESS;
}

//******************************************************************
// END Helper Functions for holdem_hand_evaluation
//******************************************************************

//******************************************************************
// Helpers that require vector of cards

/**
 * @brief Checks if hand has flush
 * 
 * Helper for holdem_hand_evaluation and hasStraightFlush
 * 
 * @tparam R : template parameter for rank
 * @tparam S : template parameter for suit
 * @param cards : input player hand
 * @return true : if hand has flush
 * @return false : if hand does not have flush
 */
template<typename R, typename S>
bool hasFlush(std::vector < Card <R, S> > cards) {
    S straightFlushSuit = cards[START_IT_ZERO].suit;
    for (size_t it = START_IT_ONE; it < cards.size(); ++it) {
        if (cards[it].suit != straightFlushSuit) {
            return false;
        }
    }
    return true;
}

/**
 * @brief Checks for a straight (5 consecutive cards of the same suit)
 * * will interpret ace as lowest or highest depending on the case
 * 
 * * Helper for holdem_hand_evaluation
 * 
 * @tparam R : template parameter for rank
 * @tparam S : template parameter for suit
 * @param cards : input player hand
 * @return true : if hand has straight
 * @return false : if hand does not have straight
 */
template<typename R, typename S>
bool hasStraight(std::vector < Card <R, S> > cards) {
    std::sort(cards.begin(), cards.end(), compareRankSuit<HoldEmRank, Suit>);
    R prevRank = cards[START_IT_ZERO].rank;          // init to first card
    int consecutiveCnt = START_IT_ONE;
    int cmpConsecutiveCnt = FULL_HOLDEM_HAND;


    //*******************************************************
    // check for ace case
    // - if last card is an ace and first card is a 2
    // - pop back ace
    // - check for 4 consecutive cards (starting at 2)
    //*******************************************************
    if ((cards[cards.size() - ADJUST_INDEX_BY_ONE].rank == HoldEmRank::ace) && (prevRank == HoldEmRank::two)) {
        cmpConsecutiveCnt = FLUSH_ACE_CASE;
        cards.pop_back();
    }

    // check for consecutive cards
    for (size_t it = START_IT_ONE; it < cards.size(); ++it) {
        if (static_cast<int>(cards[it].rank) == static_cast<int>(prevRank) + CHECK_NEIGHBOR) {
            consecutiveCnt++;
            prevRank = cards[it].rank;
            if (consecutiveCnt == cmpConsecutiveCnt) {      // changed depending on ace case or not
                return true;
            }
        } 
        else {
            return false;
        }
    }

    return false;       // uncaught case will always return false
}

/**
 * @brief Checks for a straight flush (5 consecutive cards of the same suit)
 * * will interpret ace as lowest or highest depending on the case
 * 
 * * Helper for holdem_hand_evaluation
 * 
 * @tparam R : template parameter for rank
 * @tparam S : template parameter for suit
 * @param cards 
 * @return true : if hand has straight flush
 * @return false : if hand does not have straight flush
 */
template<typename R, typename S>
bool hasStraightFlush(std::vector < Card <R, S> > cards) {
    if (hasFlush(cards) && hasStraight(cards)) {
        return true;
    }
    return false;
}

/**
 * @brief Checks for a four of a kind (4 cards of the same rank)
 * Doesn't check for 5 of a kind because that's not possible in HoldEm
 * 
 * * Helper for holdem_hand_evaluation
 * 
 * @tparam R : template parameter for rank
 * @tparam S : template parameter for suit
 * @param cards : input player hand
 * @return true : if exists
 * @return false : if does not exist 
 */
// template<typename R, typename S>
// bool hasFourOfAKind(std::vector < Card <R, S> > cards) {
//     R fourOfAKindRank = cards[START_IT_ZERO].rank;
//     for (size_t it = START_IT_ONE; it < cards.size(); ++it) {
//         if (cards[it].rank != fourOfAKindRank) {
//             return false;
//         }
//     }
//     return true;
// }
bool hasFourOfAKind(std::map<HoldEmRank, int> cntPerRank) {
    for (auto it = cntPerRank.begin(); it != cntPerRank.end(); ++it) {
        if (it->second == FOUR_OF_A_KIND) {
            return true;
        }
    }
    return false;
}


/**
 * @brief Takes vector of cards, sorts, and counts each rank, placing [rank, count] into map
 * * Sorts passed vector of cards by rank first
 * 
 * @tparam R : template parameter for rank
 * @tparam S : template parameter for suit
 * @param cards : input player hand
 * @return std::map<HoldEmRank, unsigned int> 
 */
template<typename R, typename S>
std::map<HoldEmRank, int> countEachRank(std::vector < Card <R, S> >& cards) {
    std::sort(cards.begin(), cards.end(), compareRankSuit<HoldEmRank, Suit>);
    std::map<HoldEmRank, int> cntPerRank;
    for (size_t it = START_IT_ZERO; it < cards.size(); ++it) {
        HoldEmRank cardRank = cards[it].rank;
        if (cntPerRank.find(cardRank) != cntPerRank.end()) {
            cntPerRank[cardRank]++;
        } else {
            cntPerRank[cardRank] = START_IT_ONE;
        }
    }
    return cntPerRank;
}


//***************************************************************
// Helpers that require a map of rank counts

/**
 * @brief Checks for a three of a kind (3 cards of the same rank)
 * 
 * @param cntPerRank : map of rank counts
 * @return true : if has three of a kind
 * @return false : if no three of a kind
 */
bool hasThreeOfAKind(std::map<HoldEmRank, int> cntPerRank) {
    for (auto it = cntPerRank.begin(); it != cntPerRank.end(); ++it) {
        if (it->second == THREE_OF_A_KIND) {
            return true;
        }
    }
    return false;
}

/**
 * @brief Checks for two pairs pair (2 cards of the same rank twice)
 * 
 * @param cntPerRank : map of rank counts
 * @return true : if has two pairs
 * @return false : if no two pairs
 */
bool hasTwoPairs(std::map<HoldEmRank, int> cntPerRank) {
    unsigned int pairCnt = START_IT_ZERO;
    for (auto it = cntPerRank.begin(); it != cntPerRank.end(); ++it) {
        if (it->second == PAIR_OF_CARDS) {
            pairCnt++;
        }
    }
    if (pairCnt == TWO_PAIRS) {
        return true;
    }
    return false;
}

/**
 * @brief Checks for a pair (2 cards of the same rank)
 * 
 * @param cntPerRank : map of rank counts
 * @return true : if has pair
 * @return false : if no pair
 */
bool hasPair(std::map<HoldEmRank, int> cntPerRank) {
    for (auto it = cntPerRank.begin(); it != cntPerRank.end(); ++it) {
        if (it->second == PAIR_OF_CARDS) {
            return true;
        }
    }
    return false;
}


/**
 * @brief Checks for a full house (3 cards of the same rank and 2 cards of the same rank)
 * uses hasPair and hasThreeOfAKind
 * 
 * @param cntPerRank : map of rank counts 
 * @return true : if has full house
 * @return false : if no full house
 */
bool hasFullHouse(std::map<HoldEmRank, int> cntPerRank) {
    if (hasThreeOfAKind(cntPerRank) && hasPair(cntPerRank)) {
        return true;
    }
    return false;
}


//******************************************************************
// END Helper Functions for holdem_hand_evaluation
//******************************************************************

/**
 * @brief Evaluates a hand and returns the hand rank
 * 
 * @param hand : input player hand
 * @return HoldEmHandRank : highest order hand rank found based on Lab2 Step 15
 */
HoldEmHandRank HoldEmGame::holdem_hand_evaluation(CardSet<HoldEmRank, Suit>& hand) {
    CardSet<HoldEmRank, Suit> localCopy(hand);
    //==================================================================================================
    // ! DEPRECATED getVector() IN LAB3 STEP 7
    //const std::vector < Card < HoldEmRank, Suit> > CardSet<HoldEmRank, Suit>::*ptrToCardset = CardSet<HoldEmRank, Suit>::getVector();
    //std::vector < Card <HoldEmRank, Suit> > localHandVector = localCopy.*(ptrToCardset);
    // ! DEPRECATED getVector() IN LAB3 STEP 7
    //==================================================================================================
    std::vector < Card <HoldEmRank, Suit> > localHandVector;
    for(typename std::vector<Card<HoldEmRank, Suit>>::const_iterator it = hand.getBegin(); it != hand.getEnd(); it++){
        localHandVector.push_back(*it);
    }

    // check for undefined hand
    if ((localHandVector.size() < FULL_HOLDEM_HAND) || (localHandVector.size() > FULL_HOLDEM_HAND)) {
        return HoldEmHandRank::undefined;
    }
    // sort hand if valid size
    std::map<HoldEmRank, int> mapOfRankCnts = countEachRank(localHandVector);

    // check for straight flush
    if (hasStraightFlush(localHandVector)) {
        return HoldEmHandRank::straightflush;
    }
    else if (hasFourOfAKind(mapOfRankCnts)) {
        return HoldEmHandRank::fourofakind;
    }
    else if (hasFullHouse(mapOfRankCnts)) {
        return HoldEmHandRank::fullhouse;
    }
    else if (hasFlush(localHandVector)) {
        return HoldEmHandRank::flush;
    }
    else if (hasStraight(localHandVector)) {
        return HoldEmHandRank::straight;
    }
    else if (hasThreeOfAKind(mapOfRankCnts)) {
        return HoldEmHandRank::threeofakind;
    }
    else if (hasTwoPairs(mapOfRankCnts)) {
        return HoldEmHandRank::twopair;
    }
    else if (hasPair(mapOfRankCnts)) {
        return HoldEmHandRank::pair;
    }
    return HoldEmHandRank::xhigh;
}

/**
 * @brief Construct a new Hold Em Game Struct object
 * 
 * @param cardSetHand_ 
 * @param name_ 
 * @param rank_ 
 */
HoldEmGame::HoldEmGameStruct::HoldEmGameStruct(const CardSet<HoldEmRank, Suit> &cardSetHand_, const std::string &name_, HoldEmHandRank structRank_) : cardSetHand(cardSetHand_), name(name_), structRank(structRank_) {}

/**
 * @brief Insert operator for HoldEmHandRank
 * 
 * @param os 
 * @param handRank 
 * @return std::ostream& output stream containing hand rank
 */
std::ostream& operator<<(std::ostream& os, const HoldEmHandRank& handRank) {
    switch(handRank) {
        case HoldEmHandRank::xhigh:
            os << "X High";
            break;
        case HoldEmHandRank::pair:
            os << "Pair";
            break;
        case HoldEmHandRank::twopair:
            os << "Two Pair";
            break;
        case HoldEmHandRank::threeofakind:
            os << "Three of a Kind";
            break;
        case HoldEmHandRank::straight:
            os << "Straight";
            break;
        case HoldEmHandRank::flush:
            os << "Flush";
            break;
        case HoldEmHandRank::fullhouse:
            os << "Full House";
            break;
        case HoldEmHandRank::fourofakind:
            os << "Four of a Kind";
            break;
        case HoldEmHandRank::straightflush:
            os << "Straight Flush";
            break;
        case HoldEmHandRank::undefined:
            os << "Undefined";
            break;
    }
    return os;
}

/**
 * @brief Comparison overload to compare HoldEmGameStructs
 * 
 * @param p1 
 * @param p2 
 * @return true 
 * @return false 
 */
bool operator<(HoldEmGame::HoldEmGameStruct & p1, HoldEmGame::HoldEmGameStruct & p2){
    if(p1.structRank != p2.structRank){//if they aren't equal then just return true if p1 is lower than p2 and false otherwise
        if(p1.structRank > p2.structRank){
            return false;
        }else{
            return true;
        }
    }

    //const std::vector < Card <HoldEmRank, Suit> > CardSet<HoldEmRank, Suit>::*cds = CardSet<HoldEmRank, Suit>::getVector();
    std::vector< Card<HoldEmRank,Suit> > p1_cards;
    std::copy(p1.cardSetHand.getBegin(), p1.cardSetHand.getEnd(), p1_cards.begin());
    for(typename std::vector<Card<HoldEmRank, Suit>>::const_iterator it = p1.cardSetHand.getBegin(); it != p1.cardSetHand.getEnd(); it++){
        p1_cards.push_back(*it);
    }

    std::vector< Card<HoldEmRank,Suit> > p2_cards;
    //std::copy(p2.cardSetHand.getBegin(), p2.cardSetHand.getEnd(), p2_cards.begin());
    for(typename std::vector<Card<HoldEmRank, Suit>>::const_iterator it = p2.cardSetHand.getBegin(); it != p2.cardSetHand.getEnd(); it++){
        p2_cards.push_back(*it);
    }

    // recalculate these values to break ties
    std::vector<unsigned int> c1_vals;//vector to track the values of the numbers in the cardset
    std::vector<unsigned int> c2_vals;
    std::vector<unsigned int> c1_freq(13,START_IT_ZERO);//frequency of each card that appears in the hand
    std::vector<unsigned int> c2_freq(13,START_IT_ZERO);

    for(size_t i= START_IT_ZERO; i<p1_cards.size(); i++){
        c1_vals.push_back((unsigned int) p1_cards.at(i).rank);
        c2_vals.push_back((unsigned int) p2_cards.at(i).rank);
        //c_suits.at((unsigned int)c_cards.at(i).s)++;
    }

    std::sort(c1_vals.begin(), c1_vals.end(), std::greater<>());
    std::sort(c2_vals.begin(), c2_vals.end(), std::greater<>());

    //create a frequency table for each of the hands 
    for(size_t i = START_IT_ZERO; i<c1_vals.size(); i++){
        c1_freq.at(c1_vals.at(i))++;
    }

    for(size_t i = START_IT_ZERO; i<c2_vals.size(); i++){
        c2_freq.at(c2_vals.at(i))++;
    }


    /*
    if both are pair and the rank of the paired card of the first object is less than the rank of the paired card of second object, 
    or if those are the same, if the highest-ranked non-paired card of the first object is less than that of the second object, 
    or if those are the same if the second-highest-ranked non-paired card of the first object is less than that of the second object, 
    or if those are the same if the third-highest-ranked non-paired card of the first object is less than that of the second object;
    */

  // std::cout << "here before change in eval, c1_vals size: " << c1_vals.size() << " c2_vals size: " << c1_vals.size() << std::endl;

    if(p1.structRank == HoldEmHandRank::pair){
        //find the value of the pair

        int p1_val = std::find(c1_freq.begin(), c1_freq.end(), PAIR_OF_CARDS) - c1_freq.begin();
        int p2_val = std::find(c2_freq.begin(), c2_freq.end(), PAIR_OF_CARDS) - c2_freq.begin();

        if(p1_val < p2_val){

            return true;
        }else if(p1_val > p2_val){

            return false;
        }
        else{
            std::remove(c1_vals.begin(), c1_vals.end(), p1_val);//remove the pair and check the rest (already sorted from highest to lowest)
            std::remove(c2_vals.begin(), c2_vals.end(), p2_val);

            for(size_t i= START_IT_ZERO; i<c1_vals.size(); i++){
                if(c1_vals.at(i)<c2_vals.at(i)){

                    return true;
                }else if(c1_vals.at(i)>c2_vals.at(i)){

                    return false;
                }

            }
            return false;
        }
        return false;
    }

    /*
    if both are twopair and the rank of the higher pair of the first object is less than the rank of the higher pair 
    of the second object, or if those are the same if the rank of the lower pair of the first object is less than the rank 
    of the lower pair of the second object, or if those are also the same, if the non-paired card of the first object is less 
    than that of the second object;
    */

    if(p1.structRank == HoldEmHandRank::twopair){

        int p1_val = std::find(c1_freq.begin(), c1_freq.end(), TWO_PAIRS) - c1_freq.begin();
        int p2_val = std::find(c2_freq.begin(), c2_freq.end(), TWO_PAIRS) - c2_freq.begin();

        if(p1_val < p2_val){
            return true;
        }else if(p1_val > p2_val){
            return false;
        }
        else{
            std::remove(c1_vals.begin(), c1_vals.end(), p1_val);
            std::remove(c2_vals.begin(), c2_vals.end(), p2_val);

            //now it's the same as the pair case
            int p1_val2 = std::find(c1_freq.begin(), c1_freq.end(), PAIR_OF_CARDS) - c1_freq.begin();
            int p2_val2 = std::find(c2_freq.begin(), c2_freq.end(), PAIR_OF_CARDS) - c2_freq.begin();

            if(p1_val2 < p2_val2){
                return true;
            }else if(p1_val2 > p2_val2){
                return false;
            }
            else{
                std::remove(c1_vals.begin(), c1_vals.end(), p1_val2);
                std::remove(c2_vals.begin(), c2_vals.end(), p2_val2);
                for(size_t i= START_IT_ZERO; i<c1_vals.size(); i++){
                    if(c1_vals.at(i)<c2_vals.at(i)){
                        return true;
                    }else if(c1_vals.at(i)>c2_vals.at(i)){
                        return false;
                    }
                }
                return false;
            }
            return false;

        }
        return false;

    }
    
    /*
    if both are threeofakind and the three cards that have the same rank in the first object are of lower rank than the three cards 
    that have the same rank in the second object;
    */

    if(p1.structRank == HoldEmHandRank::threeofakind){

        int p1_val = std::find(c1_freq.begin(), c1_freq.end(), THREE_OF_A_KIND) - c1_freq.begin();
        int p2_val = std::find(c2_freq.begin(), c2_freq.end(), THREE_OF_A_KIND) - c2_freq.begin();

        if(p1_val < p2_val){
            return true;
        }else if(p1_val > p2_val){
            return false;
        }
        else{
            std::remove(c1_vals.begin(), c1_vals.end(), p1_val);
            std::remove(c2_vals.begin(), c2_vals.end(), p2_val);
            for(size_t i= START_IT_ZERO; i<c1_vals.size(); i++){
                if(c1_vals.at(i)<c2_vals.at(i)){
                    return true;
                }else if(c1_vals.at(i)>c2_vals.at(i)){
                    return false;
                }
            }
            return false;
        }
        return false;


    }

    if(p1.structRank == HoldEmHandRank::straight || p1.structRank == HoldEmHandRank::straightflush){
        return c1_vals.at(START_IT_ZERO) < c2_vals.at(START_IT_ZERO);
    }

    if(p1.structRank == HoldEmHandRank::flush || p1.structRank == HoldEmHandRank::xhigh){
        for(size_t i= START_IT_ZERO;i<c1_vals.size(); i++){
            if(c1_vals.at(i)<c2_vals.at(i)){
                return true;
            }else if (c1_vals.at(i)>c2_vals.at(i)){
                return false;
            }
        }
        return false;
    }

    if(p1.structRank == HoldEmHandRank::fullhouse){

        int p1_val = std::find(c1_freq.begin(), c1_freq.end(), THREE_OF_A_KIND) - c1_freq.begin();
        int p2_val = std::find(c2_freq.begin(), c2_freq.end(), THREE_OF_A_KIND) - c2_freq.begin();

        if(p1_val < p2_val){
            return true;
        }else if(p1_val > p2_val){
            return false;
        }
        else{
            std::remove(c1_vals.begin(), c1_vals.end(), p1_val);
            std::remove(c2_vals.begin(), c2_vals.end(), p2_val);

            //now it's the same as the pair case
            int p1_val2 = std::find(c1_freq.begin(), c1_freq.end(), PAIR_OF_CARDS) - c1_freq.begin();
            int p2_val2 = std::find(c2_freq.begin(), c2_freq.end(), PAIR_OF_CARDS) - c2_freq.begin();

            if(p1_val2 < p2_val2){
                return true;
            }else{
                return false;
            }
        }
        return false;

    }

    if(p1.structRank == HoldEmHandRank::fourofakind){

        int p1_val = std::find(c1_freq.begin(), c1_freq.end(), FOUR_OF_A_KIND) - c1_freq.begin();
        int p2_val = std::find(c2_freq.begin(), c2_freq.end(), FOUR_OF_A_KIND) - c2_freq.begin();

        if(p1_val < p2_val){
            return true;
        }else if(p1_val > p2_val){
            return false;
        }
        else{
            std::remove(c1_vals.begin(), c1_vals.end(), p1_val);
            std::remove(c2_vals.begin(), c2_vals.end(), p2_val);

            //now it's the same as the pair case
            for(size_t i = START_IT_ZERO; i<c1_vals.size(); i++){
                if(c1_vals.at(i) < c2_vals.at(i)){
                    return true;
                }else if (c1_vals.at(i) > c2_vals.at(i)){
                    return false;
                }
            }
            return false;
        }
        return false;
    }

    std::cout << "got here somehow " << std::endl;
    return false;
}
