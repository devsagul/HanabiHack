from os import getcwd
from os.path import dirname, join
from parsers.ImportsFlagPathParser import ImportsFlagPathParser
from tempfile import NamedTemporaryFile
import unittest

class test_ImportsFlagPathParser(unittest.TestCase):

    def test_findDependencyPaths(self):
        f = NamedTemporaryFile(mode='w', delete=False)
        sourceFilePath = f.name
        f.write('''
            [[imports __top__/src/js/a.js]]
            [[imports /src/js/b.js]]
            [[imports js/c.js]]
        ''')
        f.close()

        paths = ImportsFlagPathParser.findDependencyPaths(sourceFilePath)
        self.assertEqual(len(paths), 3)

        self.assertEqual(paths[0].text, join(getcwd(), 'src/js/a.js'))
        self.assertEqual(paths[1].text, join(getcwd(), 'src/js/b.js'))
        self.assertEqual(paths[2].text, join(dirname(sourceFilePath), 'js/c.js'))

if __name__ == '__main__':
    unittest.main()