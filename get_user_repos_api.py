from github import Github
import time


g = Github('70cf6b7f128508493dcdf31b929820875be8ed42')

def get_user_stats(name):
    try:
        repos = [repo for repo in g.get_user(name).get_repos() if not repo.fork]
        stars = sum(repo.stargazers_count for repo in repos)
        topics = set(sum([repo.get_topics() for repo in repos], []))
        langs = set(sum([list(repo.get_languages().keys()) for repo in repos], []))     
    except:
        time.sleep(10)

    return (map(lambda x: x.url, repos), stars, topics, langs)


if __name__ == "__main__":
    
    stats = get_user_stats('mr8bit')
    print('get repos')
    for repo in stats[0]:
        print(repo)
    print('get stars')
    print(stats[1])
    print('get topics')
    print(stats[2])
    print('get langs')
    print(stats[3])