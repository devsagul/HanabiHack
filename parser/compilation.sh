g++ -fpic -c cpp_lexer.cpp PythonUtils.cpp wrapper_wrap.cxx -I/usr/include/python3.6m
gcc -shared cpp_lexer.o PythonUtils.o wrapper_wrap.o -o _parser.so -lstdc++
