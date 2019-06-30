from github import Github
import time
import pickle

#g = Github('b50a226b8adb95c2b2f1793ca8c73cab5958adf7', per_page=100)
g = Github(per_page=100)

def get_user_stats(name):
    print(f'Procesing user: {name}')
    loop = True
    while loop:
        try:
            repos = [repo for repo in g.get_user(name).get_repos() if not repo.fork]
            stars = sum(repo.stargazers_count for repo in repos)
            topics = set(sum([repo.get_topics() for repo in repos], []))
            langs = set(sum([list(repo.get_languages().keys()) for repo in repos], []))     
    
            loop = False
            return (map(lambda x: x.url, repos), stars, topics, langs)

        except Exception as e:
            print(e)
            loop = True
            time.sleep(10)

if __name__ == '__main__':
    
    with open('./data/python_users.txt') as myfile:
        head = [next(myfile) for x in range(100)]

    data = list(map(get_user_stats, head))

    with open('./data/top_100_python.pickle', 'wb') as f:
        pickle.dump(data, f)


    #stats = get_user_stats('mr8bit')
    #print('get repos')
    #for repo in stats[0]:
    #    print(repo)
    #print('get stars')
    #print(stats[1])
    #print('get topics')
    #print(stats[2])
    #print('get langs')
    #print(stats[3])
