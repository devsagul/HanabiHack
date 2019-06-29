
#include <iostream>

using namespace std;

int main(int argc, char** argv) {

    auto ac = alignof(char);
    auto ai = alignof(int);
    auto al = alignof(long);

    cout << "ac: " << ac << endl;
    cout << "ai: " << ai << endl;
    cout << "al: " << al << endl;

    return 0;
}

