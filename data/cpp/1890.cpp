#include "headers/blur.h"
#include "headers/zeros.h"
using namespace std;

// OPTIMIZATION: Pass large variable by reference
vector < vector <float> > blur(vector < vector < float> > &grid) {

	// initialize variables
	// OPTIMIZATION: window, DX and  DY variables have the 
    // same value each time the function is run.
  	// It's very inefficient to recalculate the vectors
    // every time the function runs. 
    // 
    // The const and/or static operator could be useful.
  	// Define and declare window, DX, and DY using the
    // bracket syntax: vector<int> foo = {1, 2, 3, 4} 
    // instead of calculating these vectors with for loops 
    // and push back

	// calculate blur factors
	static const float blurring = 0.12;
	static const float center = 1.0 - blurring;
	static const float corner = blurring / 12.0;
	static const float adjacent = blurring / 6.0;
  	static const vector < vector <float> > window = {
  		{corner, adjacent, corner},
  		{adjacent, center, adjacent},
  		{corner, adjacent, corner }};

  		// variables for blur calculations
	static const vector <int> DX = {-1, 0, 1};
	static const vector <int> DY = {-1, 0, 1};

	int height = grid.size();
	int width = grid[0].size();

	int i, j;
	int ii;
	int jj;
	int new_i;
	int new_j;
	// initialize new grid to zeros
	// OPTIMIZATION: Use your improved zeros function
	vector < vector < float> > newGrid = zeros(height,width);

	// blur the grid and store in a new 2D vector
	for (i=0; i< height; i++ ) {
		for (j=0; j<width; j++ ) {
			for (ii=0; ii<3; ii++) {
				for (jj=0; jj<3; jj++) {
					new_i = (i + DY[ii] + height) % height;
					new_j = (j + DX[jj] + width) % width;
					newGrid[new_i][new_j] += grid[i][j] * window[ii][jj];
				}
			}
		}
	}

	return newGrid;
}
