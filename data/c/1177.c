
#include "msp430x54x.h"
#include "GSM.h"

unsigned long int Heart_Beat_Send_Cnt                          ;//ÐÄÌø·¢ËÍ´ÎÊý¼ÆÊý
unsigned long int HeartBeat_TimeOut=MSP_A0_Min_1               ;//ÅäÖÃÐÄÌø°ü·¢ËÍÊ±¼ä  61425
unsigned long int Heart_Beat_Count=0                           ;//·¢ËÍÐÄÌø1msÊ±¼ä¼ÆÊý
unsigned long int Heart_Beat_Num=0                             ;//ÐÄÌø°ü¼ÆÊý  
char Heart_Beat_SendERROR                                      ;//·¢ËÍÊ§°Ü±êÖ¾
char Heart_Beat[10]                                            ;//ÐÄÌøÊý¾Ý°ü

/*******************************************************************\
*	      º¯ÊýÃû£ºGSM_Heart_Beat             
*	      ×÷ÓÃÓò£ºÍâ²¿ÎÄ¼þµ÷ÓÃ
*	      ¹¦ÄÜ£º   PINGÃüÁî£º
*	      ²ÎÊý£º  ¸ÃÃüÁîµÄËµÃ÷£º GPSÖÕ¶ËµÇÂ¼ÍøÂçºó£¬ÒÆ¶¯ÍøÂç·ÖÅä¸ø
          GPSÖÕ¶ËµÄIPµØÖ·ºÍ¶Ë¿ÚºÅÊÇ¶¯Ì¬µÄ£¬GPSÖÕ¶ËÓë·þÎñÆ÷Ö®¼ä²ÉÓÃ
          UDP´«Êä·½Ê½£¬Èç¹ûGPS³¬¹ýÒ»·ÖÖÓ²»Ïò·þÎñÆ÷·¢ËÍÊý¾Ý£¬ÒÆ¶¯Íø
          Âç½«»áÊÕ»ØGPSÖÕ¶Ëµ±Ç°µÄIPºÍ¶Ë¿ÚºÅ£¬µÈGPSÖÕ¶ËÏÂÒ»´ÎÔÙ·¢ËÍ
          Êý¾ÝÊ±£¬»á»ñÈ¡ÐÂµÄIPºÍ¶Ë¿ÚºÅ¡£ËùÒÔÎªÁËÎ¬³ÖÍøÂçÁ´Â·£¬GPSÖÕ
          ¶ËµÇÂ¼ÍøÂçºó£¬Ã¿Ò»·ÖÖÓ·¢ËÍÒ»´ÎPINGÃüÁîÖÁ·þÎñÆ÷¡£
          ¸ñÊ½£º 
*	      ·µ»ØÖµ£º  ¸ÃÃüÁî²»ÐèÒª·þÎñÆ÷»Ø¸´
*
*	      ÐÞ¸ÄÀúÊ·£º£¨Ã¿ÌõÏêÊö£©
\*******************************************************************/

char GSM_Heart_Beat()
{
    unsigned long int Heart_Beat_Cnt                           ;//1msÊ±¼ä¼ÆÊý    
    if((Heart_Beat_Count>HeartBeat_TimeOut)&&(UDP_Built_flag==0x11))
    {
        Heart_Beat_Count=0                                     ;//·¢ËÍÐÄÌø1msÊ±¼ä¼ÆÊýÇåÁã
        Heart_Beat_Num++                                       ;//ÐÄÌøÀÛ¼Ó¼ÆÊý
        Heart_Beat_Send_Cnt++;
        Heart_Beat_SendERROR=1                                 ;//ÖÃÎ»·¢ËÍÊ§°Ü±êÖ¾
       
        //UP_SPI_Num_Flag=0x11;
        Heart_Beat_Cnt=Heart_Beat_Num                          ;//ÐÄÌø¼ÆÊý¸³Öµ
        Heart_Beat[9]=Heart_Beat_Cnt                           ;
        Heart_Beat_Cnt= Heart_Beat_Cnt >>8                     ;
        Heart_Beat[8]=Heart_Beat_Cnt                           ;
        Heart_Beat_Cnt= Heart_Beat_Cnt >>8                     ;
        Heart_Beat[7]=Heart_Beat_Cnt                           ;
        Heart_Beat_Cnt= Heart_Beat_Cnt >>8                     ;
        Heart_Beat[6]=Heart_Beat_Cnt                           ;
            
        if(GSM_SendData(Heart_Beat,sizeof(Heart_Beat)))         //·¢ËÍÐÄÌøÊý¾Ý
        {
           THR_Mint_Time_Cnt    =0                             ;//3.5·ÖÖÓÊ±¼ä¼ÆÊý£¬ÓÃÓÚ²»ÉÏ´«Êý¾Ý¼ì²â
           Heart_Beat_SendERROR=0                              ;
           return 1                                            ;
        }  
    }
    
    if((Heart_Beat_SendERROR)&&(UDP_Built_flag==0x11)
       &&(Heart_Beat_Count<5119)&&(Heart_Beat_Count>1023))     //1-5SÊ§°ÜÖØ·¢
    {
        Delayms(200);//XX*1MsÑÓÊ±
        if(GSM_SendData(Heart_Beat,sizeof(Heart_Beat)))
        {
            THR_Mint_Time_Cnt   =0                             ;//3.5·ÖÖÓÊ±¼ä¼ÆÊý£¬ÓÃÓÚ²»ÉÏ´«Êý¾Ý¼ì²â
            Heart_Beat_SendERROR=0                             ;
            return 1                                           ;
        }
        Heart_Beat_SendERROR=0                                 ;
    }
    
  return 0                                                     ;
}

