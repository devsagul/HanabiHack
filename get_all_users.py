import requests
import time

def get_users(lang):

    current_count = 0
    current_page = 1
    total_count = 100

    while current_count < total_count: 
        try:
            r = requests.get(f'https://api.github.com/search/users?q=language:{lang}&page={current_page}').json()
        
            total_count = r['total_count']
            current_count += 100
            current_page += 1

            for user in r['items']:
                print(user['login'])
        except: 
            #print(r)
            time.sleep(10)


get_users('c%2B%2B')