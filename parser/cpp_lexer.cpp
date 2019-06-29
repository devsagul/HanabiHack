/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cpp_lexer.cpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ShnurD6 <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 13:32:08 by bbaelor-          #+#    #+#             */
/*   Updated: 2019/06/29 18:41:09 by ShnurD6          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include "cpp_lexer.h"

std::map<std::string, int> CodeParser::GetTockens(const std::string aText, char aDelim)
{
    std::string tmp;
    std::map<std::string, int> Patterns;
    size_t i = 0;
    for (char c:aText)
    {
        if (c == aDelim)
        {
            Patterns[tmp] = i++;
            tmp.erase();
        }
        tmp += c;
    }
    return (Patterns);
}

void CodeParser::PasteValidTocken(char *aTocken, std::map<std::string, int> aPatterns, int *aResult)
{
    std::cout << "Я считаю, что " << aTocken << " это слово." << std::endl;
    if (aPatterns.find(aTocken) != aPatterns.end())
        aResult[aPatterns.at(aTocken)]++;
}

int *CodeParser::ParsePatterns(char *aCode, const char *aPatterns)
{
    std::map<std::string, int> PatternsMap = GetTockens(aPatterns, '\n');
    int *Result = new int[PatternsMap.size() + 1];
    const char *delimetrs = " ;,(){}[]=+-*/:.><\n\t";

    char *buff = std::strtok(aCode, delimetrs);
    while (buff)
    {
        PasteValidTocken(buff, PatternsMap, Result);
        buff = std::strtok(NULL, delimetrs);
    }
    return (Result);
}

int CodeParser::SheetMetric(char *aCode, const char *aPatterns)
{
    int PatternsLen = 0, Result = 0;
    int *ResParse = ParsePatterns(aCode, aPatterns);
    for (int i = 0; aPatterns[i] != '\0'; i++)
        if (aPatterns[i] == '\n')
            PatternsLen++;
    for (int i = 0; i < PatternsLen; i++)
        Result += ResParse[i];
    return (Result);
}