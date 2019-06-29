/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cpp_lexer.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ShnurD6 <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 16:06:23 by bbaelor-          #+#    #+#             */
/*   Updated: 2019/06/29 18:39:26 by ShnurD6          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#pragma once

#include <vector>
#include <string>
#include <map>

class CodeParser
{
    std::map<std::string, int> GetTockens(const std::string aText, char aDelim);
    void PasteValidTocken(char *aTocken,
                            std::map<std::string, int> aPatterns, int *aResult);

public:
    int *ParsePatterns(char *aCode, const char *aPatterns);
    int SheetMetric(char *aCode, const char *aPatterns);
};
