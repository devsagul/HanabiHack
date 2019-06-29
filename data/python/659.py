from bisect import bisect_left

def search(A, key, low = 0, high = None):
    if len(A) == 0:
        return -1
    elif len(A) == 1:
        return 0 if (A[0] == key) else -1
        
    if high is None:
        high = len(A) - 1
        
    pos = bisect_left(A, key, low, high)
    return pos if (A[pos] == key) else -1
