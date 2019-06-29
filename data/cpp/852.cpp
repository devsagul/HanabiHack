//Language: GNU C++


#include <vector>
#include <map>
#include <set>
#include <queue>
#include <deque>
#include <stack>
#include <algorithm>
#include <utility>
#include <sstream>
#include <iostream>
#include <cstdio>
#include <cmath>
#include <cstdlib>
#include <ctime>
#include <cstring>
#include <fstream>
#include <cassert>

using namespace std;

int color[1000][1000];
pair <int, int> lst[100];

void dfs(int i, int j, int col, int n) {
	color[i][j] = col;
	for(int k=0; k<n; k++)
		if((lst[k].first == i || lst[k].second == j) && !color[lst[k].first][lst[k].second])
			dfs(lst[k].first, lst[k].second, col, n); 
}

int main() {
	int n; scanf("%d", &n);
	for(int i=0; i<n; i++) {
		int x, y; scanf("%d%d", &x, &y); x--, y--;
		lst[i].first = x, lst[i].second = y;
	}
	int col;
	for(col=1; col<=1000000; col++) {
		bool rem = 0;
		for(int i=0; i<n; i++)
			if(color[lst[i].first][lst[i].second] == 0) {
				rem = 1;
				dfs(lst[i].first, lst[i].second, col, n);
				break;
			}
		if(!rem) break;
	}
	printf("%d\n", col-2);
	return 0;
}