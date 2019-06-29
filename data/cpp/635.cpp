#include <bits/stdc++.h>
using namespace std;

#define sd(x) 		scanf("%d",&x)
#define su(x) 		scanf("%u",&x)
#define slld(x) 	scanf("%lld",&x)
#define sc(x) 		scanf("%c",&x)
#define ss(x) 		scanf("%s",x)
#define sf(x) 		scanf("%f",&x)
#define slf(x)		scanf("%lf",&x)
#define ll 			long long int
#define mod(x,n) 	(x+n)%n
#define pb          push_back
#define mp          make_pair
#define pii         pair<int,int>
#define vi          vector<int>
#define all(a)      (a).begin(),(a).end()
#define F           first
#define S           second
#define sz(x)       (int)x.size()
#define Mod         1000000007

double DP[2][207][207];	// toatal-selected-bagsum
pair<int, double> A[207];  // bagsum-prob

int main()
{
	// freopen("input_file_name.in","r",stdin);
	// freopen("output_file_name.out","w",stdout);

	int i,j,k,l,m,n,x,y,z,a,b,c,r;
	double ans = 0;
	// ll i,j,k,l,m,n,x,y,z,a,b,r;

	sd(n);	sd(l);	sd(x);

	for(i=1;i<=n;i++)
		slf(A[i].S);

	for(i=1;i<=n;i++)
		sd(A[i].F);

	sort(A+1, A+1+n);	
	reverse(A+1, A+1+n);	

	// for(i=1;i<=n;i++)
	// {
	// 	printf("%lf ", A[i].S );
	// }
	// printf("\n");

	// for(i=1;i<=n;i++)
	// {
	// 	printf("%d ", A[i].F );
	// }
	// printf("\n");	
	// return 0;

	c = 0;
	DP[c][0][x] = 1;

	for(i=0;i<n;i++)
	{	
		for(k=0;k<207;k++)	// selcted
		{
			for(j=0;j<207;j++)	// bagsum
			{
				DP[1-c][k][j] = 0;
			}
		}

		for(k=0;k<=i;k++)	// selcted
		{
			for(j=0;j<207;j++)	// bagsum
			{
				if(DP[c][k][j]>0)
				{
					if(j+A[i+1].F>=0)
						DP[1-c][k+1][min(j+A[i+1].F, 205)] += DP[c][k][j] * A[i+1].S / 100 ; 
					DP[1-c][k][j] += DP[c][k][j] * (100 - A[i+1].S) / 100 ;
				}
			}
		}

		c = 1-c;
	}

	for(k=l;k<=n;k++)
	{
		for(j=0;j<207;j++)	// bagsum
		{
			ans += DP[c][k][j];
		}
	}

	printf("%0.10lf\n", ans );
	
	return 0;
}

// 3 1 0
// 10 20 30
// -1 -1 2