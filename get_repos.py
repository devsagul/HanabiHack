from github import Github

g = Github()

def get_repos(name):
    for repo in g.get_organization(name).get_repos():
        yield repo.url

if __name__ == "__main__":
    for url in get_repos('grooves'):
        print(url)
