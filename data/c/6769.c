#include "../Utils/utils.h"

int main ( void )
{
  puts ("test string equality" );

  size_t N = 2 ;
  char str[N][50] ; 

  sprintf ( str[0], "%s", "tintin" );
  sprintf ( str[1], "!%s", str[0] );

  printf ( "str[0] : %s \n" , str[0] );
  printf ( "str[1] : %s \n", str[1]);

  puts ("recherche string avec !" );

  size_t i ;
  for ( i = 0 ; i < N ; i++ )
    {
      if ( strcmp ( str[i] , str[1] ) == 0 )
	printf ( "(%zu) : %s \n", i, str[i] );
    }


  return 0 ;
}
