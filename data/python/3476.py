#! /usr/bin/env python
# -*- coding:UTF-8 -*-

import os
import sys

strs = os.popen("nmap -sP 192.168.1.0/24").read();
print strs;
#print ("running at root privilege. your euid is", os.geteuid())
