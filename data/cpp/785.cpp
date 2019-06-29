//ES 6- Dato un numero naturale calcolare il suo fattoriale
#include<stdio.h>
int main(){
	int n;
	int i;
	int f;
	do{
		printf("\nInserire il numero di cui calcolare il fattoriale:");
		scanf("%d",&n);
	}while(n<0);
	for(i=n;i>0;i--){
		f=f*i;
	}
	printf("\nIl fattoriale del numero inserito e':%d",f);
	getchar();
	getchar();	
}
