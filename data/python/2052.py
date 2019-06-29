__author__ = 'yl'
import pymongo


def connect(ip='localhost', port=27017):
    con = pymongo.Connection(ip, port)
    db = con.tagdb      # db
    tagtb = db.tags     # collections
    return tagtb      

# update single tag info
def updateTag(name, path):
    try:
        tagtb = connect()
        # if exist: update
        results = tagtb.find({'name': name})
        if results.count():
            for res in results:
                res['paths'].append(path)
                tagtb.update({'name': res['name']}, {'_id':res['_id']}, {'paths':res['paths']}, upsert=False, multi=True)
        else:
            tagtb.insert({'name':name, 'paths': [path]})
    except Exception as err:
        print(err)
    return

# update multiple tags info
def updateTags(namelist, path):
    try:
        tagtb = connect()
        for name in namelist:
            results = tagtb.find({'name': name})
            if results.count():
                for res in results:
                    res['paths'].append(path)
                    tagtb.update({'_id':res['_id']},{'name': res['name'], '_id':res['_id'], 'paths':res['paths']})
            else:
                tagtb.insert({'name':name, 'paths': [path]})
    except Exception as err:
        print(err)
    return

# load all tags into memory
def load_tags():
    tagtb = connect()
    return tagtb.find()

# show all image in database
def show_tags():
    tags = load_tags()
    for tag in tags:
        print tag

# clear all tags in database
def clear_tags():
    print "clear all tag data..."
    tagtb = connect()
    tagtb.remove()
    return

# get imagepaths by tags
# get images imagepaths
