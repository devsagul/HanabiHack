#!usr/bin/env python
#-*- coding: utf-8 -*-
import logging
import numpy as np
import sklearn
from sklearn import metrics 
from sklearn import neighbors
from sklearn import cross_validation
from sklearn.datasets import load_svmlight_file
from sklearn.cross_validation import cross_val_score
import math
import sys
import os
from subprocess import *
from sklearn.feature_selection import SelectPercentile, f_classif, SelectKBest
from sklearn.pipeline import Pipeline
from sklearn import metrics
from sklearn.neighbors import DistanceMetric
from sklearn.neighbors import KNeighborsClassifier

def calculate_result(actual,pred):  
    m_precision = metrics.precision_score(actual,pred);  
    m_recall = metrics.recall_score(actual,pred);  
    print 'predict info:'  
    print 'accuracy:{0:.3f}'.format(metrics.accuracy_score(actual,pred))  
    print 'precision:{0:.3f}'.format(m_precision)  
    print 'recall:{0:0.3f}'.format(m_recall);  
    print 'f1-score:{0:.3f}'.format(metrics.f1_score(actual,pred));   

def calculate_k(x,y):
    clf = KNeighborsClassifier(n_neighbors=3)
    max_metric=cross_val_score(clf,x,y,cv=10,scoring='f1').mean()
    k=3
    for i in range(4,100):
      clf = KNeighborsClassifier(n_neighbors=i)#default with k=5
      metric = cross_val_score(clf,x,y,cv=10,scoring='f1').mean()   
      if max_metric < metric :
        max_metric=metric
        k=i
    return k

def knn_result(train_x,train_y,test_x,test_y,out_file):  
    print '*************************\nKNN\n*************************' 
    #c= calculate_k(train_x,train_y)
    clf = KNeighborsClassifier(n_neighbors=10)
    #clf = KNeighborsClassifier(n_neighbors=c)
    clf.fit(train_x,train_y)  
    pred = clf.predict(test_x);
    calculate_result(test_y,pred);
    np.savetxt(out_file,pred,fmt='%d')
    #print(c)
    
def knn_select(train_x,train_y,test_x,test_y):  
    #c= calculate_k(train_x,train_y)
    clf = KNeighborsClassifier(n_neighbors=10)
    #clf = KNeighborsClassifier(n_neighbors=c)
    clf.fit(train_x,train_y)  
    pred = clf.predict(test_x);
    return metrics.precision_score(test_y,pred)
    #print(c)




 
