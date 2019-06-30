from github import Github
import time
import dill
import pickle
import requests
import pause
from datetime import datetime

TOKENS = [
        '3fbd0607dfd62d0b74faac2ae2f1acba5c8fa60e',
        '51132c10d3d7ad9e0ac3f572bc6122b7d4832c68'
]

CURENT_TOKEN = 0    


def get_user_stats(name):
    global CURENT_TOKEN
    print(f'Procesing user: {name}')
    g = Github(TOKENS[CURENT_TOKEN], per_page=100)
    loop = True
    while loop:
        try:
            repos = [repo for repo in g.get_user(name).get_repos() if not repo.fork]
            stars = sum(repo.stargazers_count for repo in repos)
            topics = set(sum([repo.get_topics() for repo in repos], []))
            langs = set(sum([list(repo.get_languages().keys()) for repo in repos], []))     
    
            loop = False
            return (name, list(map(lambda x: x.url, repos)), stars, topics, langs)

        except Exception as e:
            print(e)
            print(g.rate_limiting_resettime)
            loop = True
            if 'dmca' in str(e):
                loop = False
            if 'API rate limit exceeded for user ID' in str(e):
                CURENT_TOKEN = (CURENT_TOKEN + 1) % len(TOKENS)
                g = Github(TOKENS[CURENT_TOKEN], per_page=100)
                time.sleep(100)
            time.sleep(10)


if __name__ == '__main__':

    with open('./data/python_users.txt') as myfile:
        head = [next(myfile).strip() for x in range(100)]

    data = []
    for name in head:
        data.append(get_user_stats(name))

    with open('./data/top_100_python.pickle', 'wb') as f:
        pickle.dump(data, f)




    #stats = get_user_stats('llSourcell')
    #print('get repos')
    #for repo in stats[0]:
    #    print(repo)
    #print('get stars')
    #print(stats[1])
    #print('get topics')
    #print(stats[2])
    #print('get langs')
    #print(stats[3])
