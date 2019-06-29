# -*- coding: utf-8 -*-
# Given a collection of intervals, merge all overlapping intervals.
#
# For example,
# Given [1,3],[2,6],[8,10],[15,18],
# return [1,6],[8,10],[15,18].
class Interval:
    def __init__(self, s=0, e=0):
        self.start = s
        self.end = e

    def __repr__(self):
        return "[{}, {}]".format(self.start, self.end)

class Solution():
    def mergeIntervals(self, intervals):
        if not intervals:
            return intervals
        # 首先将所有的intervals按照开始数字的大小进行排序, 这样保证第一个数字是最低界限
        intervals.sort(key = lambda x: x.start)
        result = [intervals[0]]
        for i in range(1, len(intervals)):
            # 具体思路是每次都对result的最后一个元素进行比较, 因为不可能出现第三组元素的开始值在第一组范围中, 因为第三组必大于第二组开始值, 而第二组必大于第一组终止值
            # 提取出最后一个元素后, 如果其末尾值大于intervals[i]的起始值, 说明下界重合, 比较上界取最大值即可
            # 否则, 更新result, 添加新的一组元素
            # 事实上, 反过来写可能更好理解
            prev = result[-1]
            current = intervals[i]
            if prev.end < current.start:
                result.append(intervals[i])
            else:
                prev.end = max(prev.end, current.end)
        return result

print Solution().mergeIntervals([Interval(1, 3), Interval(8, 10), Interval(2, 6), Interval(15,18)])