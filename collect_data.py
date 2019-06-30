import pickle
import os
import subprocess

if __name__ == '__main__':
    python_users = None
    with open('data/top_100_python.pickle', 'rb') as f:
        python_users = pickle.load(f)
    for user in python_users[::-1]:
        name, repos, star_sum, topics, langs = user
        try:
            os.mkdir('data/repos/python/' + name)
        except FileExistsError:
            pass
        for url in repos:
            reponame = url.split('/')[-1]
            repourl = f"https://github.com/{name}/{reponame}.git"
            if not os.path.exists('data/repos/python/' + name + '/' + reponame):
                subprocess.Popen(['git', 'clone', repourl, 'data/repos/python/' + name + '/' + reponame])


    # collect python users
    # collect c users
    # collect cpp users
    # collect java users
