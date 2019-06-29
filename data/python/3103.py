# boot.py -- run on boot-up
import os
from machine import UART
uart = UART(0, 115200)
os.dupterm(uart)

import machine
from network import WLAN
wlan = WLAN(mode=WLAN.STA)

nets = wlan.scan()
for net in nets:
    if net.ssid == 'YOURHOMENETWORKSSID':
        print('Network found!')
        wlan.connect(net.ssid, auth=(net.sec, 'YOURHOMEWIFIKEY'), timeout=5000)
        while not wlan.isconnected():
            machine.idle() # save power while waiting
        print('WLAN connection succeeded!')
        break

