from fabric.api import local, run, cd, sudo, env
from fabric.contrib.console import confirm

env.hosts = ['almarinho.com.br']
env.user = 'almarinho'

def prepare_deploy():
    local("git add --all && git commit")
    local("git push")

def deploy():
    code_dir = '/home/almarinho/almarinho'
    with cd(code_dir):
        run("git pull")
        sudo("supervisorctl restart almarinho")