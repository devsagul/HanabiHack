/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main_to_test.cpp                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ShnurD6 <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 16:07:50 by ShnurD6           #+#    #+#             */
/*   Updated: 2019/06/29 18:39:59 by ShnurD6          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cpp_lexer.h"
#include <iostream>
#include <fstream>

std::string readFile(const std::string& fileName)
{
    std::ifstream f(fileName);
    f.seekg(0, std::ios::end);
    size_t size = f.tellg();
    std::string s(size, ' ');
    f.seekg(0);
    f.read(&s[0], size);
    return s;
}

int main(int argc, char **argv)
{
    if (argc != 3)
        return (1);
    std::string Code;
    std::string Buff;

    Code = readFile(argv[1]);
    CodeParser Parser;
    auto res = Parser.SheetMetric(const_cast<char *>(Code.c_str()), "std\n");
    std::cout << "RES: ------------------------------" << std::endl;
    std::cout << res << std::endl;
    return 0;
}