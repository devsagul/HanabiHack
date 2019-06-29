# Copyright (c) 2011 Bartosz Szczesny
# LICENSE: The MIT License (MIT)

import pygame as pg
from pygame.locals import *

black = 0, 0, 0
white = 255,255,255
blue  = 0,0,255
green = 0,255,0
red   = 255,0,0

pg.init()

win_h = 500
win_w = 500
win = pg.display.set_mode((win_w,win_h))
pg.display.set_caption("Run away Spidy")

sm = pg.image.load("img/sm.gif")
smR = sm.get_rect()

web = pg.image.load("img/web.gif")
webR = web.get_rect()

v = pg.image.load("img/v.gif")
vR = v.get_rect()
vR.move_ip(250,250)

win.fill(blue)
win.blit(sm,smR)
win.blit(v,vR)
pg.display.flip()

while True:
  for event in pg.event.get():
    if event.type == KEYDOWN and event.key == K_ESCAPE:
      pg.quit()
    if event.type == KEYDOWN and event.key == K_DOWN:
      smR = smR.move([0,10])
    if event.type == KEYDOWN and event.key == K_UP:
      smR = smR.move([0,-10])
    if event.type == KEYDOWN and event.key == K_RIGHT:
      smR = smR.move([10,0])
    if event.type == KEYDOWN and event.key == K_LEFT:
      smR = smR.move([-10,0])
    if event.type == KEYDOWN and event.key == K_SPACE:
      webR.move_ip(10,smR.top)
    print( vR.collidelist([smR]) )

    print( smR.top )

    win.fill(blue)
    win.blit(sm,smR)
    win.blit(v,vR)
    win.blit(web,webR)
    pg.display.flip()

pg.display.flip()

pg.time.delay(2000)

pg.quit()
