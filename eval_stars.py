import os
import artm
from artm import hARTM
from glob import iglob
from vedis import Vedis

hier = hARTM()
hier.load("model_6_80")
dictionary = artm.Dictionary('dictionary')
dictionary.load("model_6_80/dict.dict")
dictionary.filter(min_df=100, max_tf=12245)
db = Vedis('python_superstars')

for f in iglob('data/concat/python/*.py'):
    user = f.split('/')[-1].split('.')[0]
    data_path = f'data/wv/python/{user}.wv'
    batches_path = 'tmp'
    output = open(data_path, 'w')
    with open(f, 'r') as fl:
        data = fl.read().replace('\n', ' ') # Заменяем всяческие отступы на пробелы
        data = data.replace('\t', ' ')
        data = data.replace('|', ' ')
        data = data.replace('.', ' ')
        data = data.replace('    ', ' ').lower()
        data = data.replace(':', ' dotdot')
        output.write('{} |text {} |class_id {}\n'.format(1, data, 'py')) 
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
    #print(user)