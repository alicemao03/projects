#pragma once
#include <iostream>

/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/7/23
 *
 * Description:
 * Header file for Suit
 *
 *  - Suit enum of all possible suits
 *  - Suit overload operators declarations
 */

enum class Suit
{
    clubs,
    diamonds,
    hearts,
    spades,
    undefined
};

// overload operators
std::ostream &operator<<(std::ostream &os, const Suit &card);
Suit &operator++(Suit &card);