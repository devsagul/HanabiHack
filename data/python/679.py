import time
import os
import random
import spotilib
from lyrics import getLyrics

def generateMessage():
    file = open('C:\\Users\\hussamh10\\Desktop\\Lyrics\\funnies', 'r')
    messages = file.readlines()
    message = "Please wait, " + random.choice(messages)
    return message

def update():
    os.system('cls')
    print generateMessage()

    artist = spotilib.artist()
    song = spotilib.song()

    lyrics = getLyrics(artist, song)
    os.system('cls')
    print(lyrics)

def main():
    old_song = 'None'

    while True:
        time.sleep(5)
        song = spotilib.song()
        if song != old_song:
            update()
            old_song = song

main()
