#coding: utf-8
from keras.models import Sequential
from keras.layers import Dense
import numpy
seed = 7
numpy.random.seed(seed)

# 加载数据
dataset = numpy.loadtxt("pima-indians-diabetes.csv", delimiter=",")
print dataset[:,0:8]
# 分割输入数据 X变量， 和输出数据Y变量
X =  dataset[:,0:8]
Y = dataset[:,8]

# print X, Y