#pragma once

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description:
 * Enum of all possible return values
 */

enum important_vals
{
    PINOCHLEROW = 8,
    HOLDEMROW = 4,
    CMP_ZERO = 0,
    GAME_IT_POS = 2,
    PINOCHLE_PACKET = 3,
    START_IT_ZERO = 0,
    START_IT_ONE = 1,
    TOTAL_PINOCHLE_CARDS = 48,
    HELD_HOLDEM_CARDS = 2,
    FLOP_CARDS = 3,
    TURN_CARDS = 4,
    RIVER_CARDS = 5,
    GAME_NAME_STRING = 1,
    DECK_TYPE_STRING = 2,
    PINOCHLE_PLAYERS = 4,
    PLAYER_LIST_START_INDEX = 2,
    HOLDEM_MIN_PLAYERS = 2,
    HOLDEM_MAX_PLAYERS = 9,
    HOLDEM_PREFLOP_HAND = 2,
    PINOCHLE_MELDS = 15,
    ADJUST_FROM_ZERO = 1,
    ADJUST_INDEX_BY_ONE = 1,
    GOFISH_MIN_PLAYERS = 2,
    GOFISH_MAX_PLAYERS = 5,
    GOFISH_PLAYER_LIST_START_INDEX = 3
};

enum return_vals
{
    SUCCESS,
    ERROR_DEALING_PLAYER_HAND,
    ERROR_COLLECTING_PLAYER_HAND,
    FAILED_TO_CREATE_SHARED_POINTER,
    NOT_ENOGUH_PLAYERS,
    WRONG_NAME,
    ERROR_COLLECTING_COMMON_BOARD,
    INVALID_ARGS,
};

enum pinochle_game_vals
{
    TWO_CARDS = 2,
    THOUSAND_ACES_CARDS = 8,
    HUNDRED_ACES_CARDS = 4,
    EIGHT_HUNDRED_KINGS_CARDS = 8,
    EIGHTY_KINGS_CARDS = 4,
    SIX_HUNDRED_QUEENS_CARDS = 8,
    SIXTY_QUEENS_CARDS = 4,
    FOUR_HUNDRED_JACKS_CARDS = 8,
    FORTY_JACKS_CARDS = 4,
    DOUBLE_PINOCHLE_CARDS = 4,
    DOUBLE_PINOCHLE_MELD = 2,
    JACK_OF_DIAMONDS_CARDS = 2,
    QUEEN_OF_SPADES_CARDS = 2,
    PINOCHLE_MELD = 1
};

enum holdem_game_vals
{
    FULL_HOLDEM_HAND = 5,
    CHECK_NEIGHBOR = 1,
    FLUSH_ACE_CASE = 4,
    FOUR_OF_A_KIND = 4,
    THREE_OF_A_KIND = 3,
    TWO_PAIRS = 2,
    PAIR_OF_CARDS = 2,
    SINGLE_CARD = 1,
    CHECK_THREE = 3,
    CHECK_ONE = 1,
    CHECK_FIVE = 5,
    LAST_CARD = 4,
};

enum gofish_game_vals
{
    DEAL_SEVEN = 7,
    DEAL_FIVE = 5,
    DEFAULT_MAPPED_VALUE = -1,
    INVALID_FISH_PLAY = -2,
    CARDS_PER_BOOK = 4
};
