/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cpp_lexer.cpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ShnurD6 <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 13:32:08 by bbaelor-          #+#    #+#             */
/*   Updated: 2019/06/29 16:10:29 by ShnurD6          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string>
#include <vector>
#include <cstring>

std::vector<std::string> GetTockens(std::string aText, char aDelim)
{
    std::vector<std::string> Result;
    std::string tmp;

    for (char c:aText)
    {
        if (c == aDelim)
        {
            Result.push_back(tmp);
            // std::cout << "Записал слово " << tmp;
            tmp.erase();
        }
        tmp += c;
    }
    return (Result);
}

bool IsTockenValid(char *aTocken, std::vector<std::string> aPatterns)
{
    // std::cout << "Я считаю, что " << aTocken << " это слово." << std::endl;
    for (auto &Pattern: aPatterns)
    {
        // std::cout << "пытаюсь сравнить его с " << Pattern << std::endl;
        if (aTocken == Pattern)
            return (true);
    }
    return (false);
}

std::vector<std::string> parser(char *aCode, char *aPatterns)
{
    std::vector<std::string> Result;
    std::vector<std::string> Patterns = GetTockens(aPatterns, '\n');
    const char *delimetrs = " ;,(){}[]=+-*/:.><\n\t";

    char *buff = std::strtok(aCode, delimetrs);
    while (buff)
    {
        if (IsTockenValid(buff, Patterns))
            Result.push_back(buff);
        buff = std::strtok(NULL, delimetrs);
    }
    return (Result);
}