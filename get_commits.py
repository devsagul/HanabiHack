import requests
import datetime
from dateutil import parser

def get_user_commits(name):
    now = datetime.datetime.now().date()

    commits = requests.get(f'https://github-contributions-api.now.sh/v1/{name}').json()['contributions']

    return ([commit['date'] for commit in commits if parser.parse(commit['date']).date()<=now ][::-1],
            [commit['count'] for commit in commits if parser.parse(commit['date']).date()<=now ][::-1]) 

if __name__ == '__main__':
    print(get_user_commits('torvalds'))