# Project Euler Problem 67

def import_triangle():
    with open('problem67.txt') as f:
        # Split each line by spaces and convert to integers
        return [list(map(int, line.split(' '))) for line in f]

# The max of this row is the maximum sum up to its parent items plus the value
# in this row. But note that the first and last items in this row only have one
# parent each, so it can make the code a little funky to write.
def get_max(last_maxes, cur):
    current_maxes = [cur[0] + last_maxes[0]]
    for idx, lm in enumerate(last_maxes):
        # Our left child was the right child of a previous element; get max
        max_for_left_child = cur[idx] + lm
        current_maxes[idx] = max(current_maxes[idx], max_for_left_child)
        # Right child hasn't been seen yet, just append it
        current_maxes.append(lm + cur[idx + 1])
    return current_maxes

def solve():
    triangle = import_triangle()
    max_for_last_row = triangle[0]
    for current_row in triangle[1:]:
        max_for_last_row = get_max(max_for_last_row, current_row)
    print('Answer: {}'.format(max(max_for_last_row)))

if __name__ == '__main__':
    solve()
