class Solution {
public:
    int firstMissingPositive(int A[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if (n==0) return 1;
        
        int pos=0;
        int temp;
        
        while (pos<n)
        {
            if (A[pos]==(pos+1) || A[pos]<=0 || A[pos]==A[A[pos]-1] || A[pos]>n)
                pos++;
            else
            {
                //swap A[pos] with A[A[pos]}
                //temp = A[pos];
                if ( (A[pos]-1) <n)
                {
                    temp = A[A[pos]-1];
                    A[A[pos]-1] = A[pos];
                    if (temp <n)
                    {
                        A[pos] = temp;
                    }
                    
                }
            }
            
        }
        
        for (pos=0;pos<n;pos++)
        {
            if (A[pos]!=(pos+1))
                break;
        }
        
        return pos+1;
    }
};
