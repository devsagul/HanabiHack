import pickle
import os
import subprocess

from glob import iglob

if __name__ == '__main__':
    for folder in iglob('data/repos/python/*'):
        for repo in iglob(f'{folder}/*'):
            with open('data/concat/python/' + folder.split('/')[-1] + '.py', 'w') as f:
                for file in iglob(f'{folder}/{repo}/*'):
                    with open(file, 'r') as f2:
                        f.write(f2.read())
