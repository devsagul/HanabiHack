from github import Github

g = Github()

def get_repos(name):
    for repo in g.get_user(name).get_repos():
        if not repo.fork:
            yield repo.url

def get_stars(name):
    return sum(repo.stargazers_count for repo in g.get_user(name).get_repos() if not repo.fork)
        
def get_topics(name):
    return set(sum([repo.get_topics() for repo in g.get_user(name).get_repos() if not repo.fork], []))


if __name__ == "__main__":
    print('get repos')
    for url in get_repos('mr8bit'):
        print(url)
    print('get stars')
    print(get_stars('mr8bit'))
    print('get topics')
    print(get_topics('mr8bit'))
