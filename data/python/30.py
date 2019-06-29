# -*- coding:utf-8 -*-

__author__ = 'LiuXiaozeeee'

class Solution(object):
    result = []
    nx = 0
    def __init__(self):
        self.result = []
        self.nx = 0

    def generateParenthesis(self,n):
        """
        generate paraenthesi
        :param n: int
        :return: List[str]
        """
        self.nx = n
        left_parenthesis, right_parenthesis = n , n
        differ = 0
        self.add_parenthesis('',differ,left_parenthesis,right_parenthesis)
        return self.result

    def add_parenthesis(self,str,differ,left_parenthesis,right_parenthesis):
        if len(str) == self.nx * 2:
            self.result.append(str)
            return

        if left_parenthesis > 0:
            self.add_parenthesis(str+'(', differ+1, left_parenthesis-1, right_parenthesis)


        if differ > 0 and right_parenthesis > 0:
            self.add_parenthesis(str+')', differ-1, left_parenthesis, right_parenthesis-1)


if __name__ == '__main__':
    temp = Solution()
    xx = temp.generateParenthesis(2)
    print(xx)


