/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cpp_lexer.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bbaelor- <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 16:06:23 by bbaelor-          #+#    #+#             */
/*   Updated: 2019/06/30 10:30:37 by bbaelor-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#pragma once

#include <vector>
#include <regex>
#include <string>
#include <map>
#include <math.h>
#include "PythonUtils.h"

class CodeParser
{
    std::map<std::string, int> GetTockens(const std::string aText, char aDelim);
    void PasteValidTocken(char *aTocken,
                            std::map<std::string, int> aPatterns, int *aResult);
    double GetMa(std::vector<int>::iterator aIter);

public:
    int *ParsePatterns(char *aCode, const char *aPatterns);
    int SheetMetric(char *aCode, const char *aPatterns);
    int *ParseRegexps(char *aCode, const char *aRegexps);
    int ParseOneRegexp(char *aCode, const char *aOneRegexp);
    PyObject* GetMoovingAverage(PyObject*aTimeSeries);
};
