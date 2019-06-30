from github import Github


def get_user_beauty(name):
    g = Github()
    u = g.get_user(name)
    return (u.name, u.avatar_url, u.html_url)

if __name__ == '__main__':
    print(get_user_beauty('torvalds'))