#!/usr/bin/env python3

def prime1(n):
    l = list()
    for i in range(2, n+1, 1):
        while n != i:
            if(n%i == 0):
                l.append(i)
                n = int(n / i)
            else:
                break;
    l.append(n)
    return l

def prime2(n):
    l = [ 0 for i in range(0,n+1)]
#    print(len(l))
    i = 2
    while i*i <= n:
        while n%i == 0:
            l[i] += 1
            n= int(n/i)
        i += 1
    if n > 1:
        l[n] += 1
    return l


def main():
    max = 20
    pl = [ 0 for j in range(0, max+1) ]

    for num in range(2, max+1):
        nl = prime2(num)
        for i in range(2, len(nl)):
            if nl[i] > pl[i]:
                pl[i] = nl[i]

    # debug
#    for i in range(0, max+1):
#        print(pl[i])

    sum = 1;
    for j in range(0, max+1):
        while pl[j] > 0:
           sum *= j
           pl[j] -= 1

    print(sum)



if __name__ == "__main__":
#    print(prime1(20))
#    print(prime2(20))
    main()
