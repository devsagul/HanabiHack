import re
import subprocess
import pyjslint

from pylint import epylint as lint

PYTHON_REGEX = re.compile(r"Your code has been rated at (.*?)/10.*")

def cpp_analyze(filename):
    result = subprocess.run(['cppcheck', '--enable=all', filename], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    string = str(result.stdout)
    lines_in_file = sum(1 for line in open(filename))
    lines_in_output = len(string.split("\n"))
    return max(0, 1 - lines_in_output / lines_in_file)

def python_analyze(filename):
    (pylint_stdout, pylint_stderr) = lint.py_run(filename, return_std=True)
    string = pylint_stdout.getvalue()
    result = re.search(PYTHON_REGEX, string)
    return 1 if result is None else float(result.group(1))/10

def c_analyze(filename):
    return cpp_analyze(filename)

def js_analyze(filename):
    result = subprocess.run(['jshint', filename], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    string = str(result.stdout)
    lines_in_file = sum(1 for line in open(filename))
    lines_in_output = len(string.split("\n"))
    return max(0, 1 - lines_in_output / lines_in_file)

ANALYSERS = {
    'cpp' : cpp_analyze,
    'py' : python_analyze,
    'c' : c_analyze,
    'js' : js_analyze,
    'unknown' : lambda filename: 1
}

def guess_language(filename):
    ext = filename.split('.')[-1]
    if ext in ['cpp', 'py', 'c', 'js']:
        return ext
    # later in future use more comples solution
    return 'unknown'

def analyse_file(filename, language=None):  
    if language is None:
        language = guess_language(filename)
    return ANALYSERS[language](filename)
