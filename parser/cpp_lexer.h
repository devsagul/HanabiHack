/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cpp_lexer.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ShnurD6 <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 16:06:23 by bbaelor-          #+#    #+#             */
/*   Updated: 2019/06/29 17:10:36 by ShnurD6          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#pragma once

#include <vector>
#include <string>

class CodeParser
{
public:
    std::vector<std::string> ParsePatterns(char *aCode, char *aPatterns);
    int SheetMetric(char *aCode, char *aPatterns);
};
