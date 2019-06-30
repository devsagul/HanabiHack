import os
import subprocess
import numpy

from glob import glob
from get_user_repos_api import get_user_stats
from static_analyser import analyse_file

def getcode(github_username):
    files, py, js, c, cpp = download_repos(github_username)
    langs = ((len(py), 'py', py),
             (len(js), 'js', js),
             (len(c), 'c', c),
             (len(cpp), 'cpp', cpp)
            )
    #langed = sorted(langs, key=lambda x: x[0])
    langed = ('py', py)
    statistics = [1, 1, analyse_static(files)]
    return langed[1], langed[2], statistics

def download_repos(username):
    repos = get_repos(username)
    for repo in repos:
        #download_repo(repo)
    py = glob(f'downloaded/{username}/**/.*py', recursive=True)
    javascript = glob(f'downloaded/{username}/**/.*js', recursive=True)
    c = glob(f'downloaded/{username}/**/.*c', recursive=True)
    cpp = glob(f'downloaded/{username}/**/.*cpp', recursive=True)
    files = py + javascript + c + cpp
    py_code = concatenate_files(py)
    javascript_code = concatenate_files(javascript)
    c_code = concatenate_files(c)
    cpp_code = concatenate_files(cpp)
    return files, py_code, javascript_code, c_code, cpp_code

def get_repos(username):
    repos = get_user_stats(username)[1]
    for repo in repos:
        download_repo(repo)

def download_repo(repo):
    items = repo.split('/')
    rep = items[-1]
    uname = items[-2]
    try:
        os.makedirs(f'downloaded/{uname}/{rep}')
    except:
        pass
    repourl = f'https://github.com/{uname}/{rep}.git'
    subprocess.Popen(['git', 'clone', repourl, f'downloaded/{uname}/{rep}'])

def concatenate_files(files):
    res = ""
    for file in files:
        with open(file, 'r') as f:
            res += f.read()
    return res

def code2vec(code, lang):
    hier = hARTM()
    hier.load("model_6_80")
    dictionary = artm.Dictionary('dictionary')
    dictionary.load("model_6_80/dict.dict")
    dictionary.filter(min_df=100, max_tf=12245)
    data_path = f'downloaded/{user}.wv'
    batches_path = 'tmp'
    output = open(data_path, 'w')
    data = code.replace('\n', ' ') # Заменяем всяческие отступы на пробелы
    data = data.replace('\t', ' ')
    data = data.replace('|', ' ')
    data = data.replace('.', ' ')
    data = data.replace('    ', ' ').lower()
    data = data.replace(':', ' dotdot')
    output.write('{} |text {} |class_id {}\n'.format(1, data, lang)) 
    output.close()
    batch_vectorizer = artm.BatchVectorizer(data_path=data_path, data_format='vowpal_wabbit',
                                        target_folder=batches_path)
    try:
        vector = hier.transform(batch_vectorizer)
        res = [item[0] for item in vector.values.tolist()]
        print (user)
        db[user] = res
    except:
        pass
    return vector, res

def analyse_static(files):
    res = [analyse_file(file) for file in files]
    return np.mean(res)