// Program to implement the sign function

#include <stdio.h>

int main(void)
{
	int number, sign;

	printf("Please type in a number: ");
	scanf("%i", &number);

	if (0 > number)
		sign = -1;
	else if ( 0 < number)
		sign = 1;
	else //Must be zero
		sign = 0;
	
	printf("Sign = %i\n", sign);

	return 0;
}
