g++ -fpic -c cpp_lexer.cpp wrapper_wrap.cxx -I/usr/include/python3.6
gcc -shared cpp_lexer.o wrapper_wrap.o -o _parser.so -lstdc++
