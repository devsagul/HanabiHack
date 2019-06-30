import pickle
import os
import subprocess

from glob import iglob

if __name__ == '__main__':
    for folder in iglob('data/repos/python/*'):
        for repo in iglob(f'{folder}/*'):
            with open('data/concat/python/' + folder.split('/')[-1] + '.py', 'wb') as f:
                for file in iglob(f'{repo}/**/*.py', recursive=True):
                    try:
                        with open(file, 'rb') as f2:
                            f.write(f2.read())
                    except:
                        pass