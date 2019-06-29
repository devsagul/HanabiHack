# coding=utf-8

import sys
import os
import struct

def lf_to_crlf(filename):
    print('Input:  '+filename)
    fp = open(filename, "rb")
    inData = fp.readlines()
    fp.close()

    #print('Output: '+filename)
    fp = open(filename, "wb")
    for d in inData:
        l = len(d)
        if d[l-1] == 0x0a:
            if l == 1 or d[l-2] != 0x0d:
                b = bytearray(d)
                b[l-1] = 0x0d
                b.append(0x0a)
                fp.write(b)
                continue
        fp.write(d)
    fp.close()    

def main():
    param = sys.argv[1]

    for parent,dirnames,filenames in os.walk(param):    #三个参数：分别返回1.父目录 2.所有文件夹名字（不含路径） 3.所有文件名字
        for filename in filenames:
            sa = str.split(filename,'.')
            if len(sa) > 1 and (sa[1] == 'c' or sa[1] == 'h'):
                f = os.path.join(parent,filename)
                #print("File path: " + f) #输出文件路径信息
                lf_to_crlf(f)
    print('OK')
    # os.system("pause")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        pass
