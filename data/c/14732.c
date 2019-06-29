/*HEADER**********************************************************************
Copyright (c)
All rights reserved
This software embodies materials and concepts that are confidential to Redpine
Signals and is made available solely pursuant to the terms of a written license
agreement with Redpine Signals

Project name : Ganges
Module name  : LINUX SDIO driver
File Name    : ganges_linux_sdio.c

File Description:

List of functions:
    ganges_sdio_master_access_msword
    ganges_load_TA_instructions
    ganges_card_write
    ganges_send_mgmt_frame
    ganges_send_TA_mgmt_frame
    ganges_card_read
    ganges_rcv_pkt
    ganges_load_LMAC_instructions
    ganges_ack_interrupt
    ganges_interrupt_handler
    ganges_setupcard
    ganges_init_sdio_slave_regs
    ganges_handle_bufferfull
    ganges_write_configuration_values

Author :

Rev History:
Sl  By    date change details
---------------------------------------------------------
1   Fariya
---------------------------------------------------------
*END*************************************************************************/

#include "ganges_linux.h"
#include "ganges_mgmt.h"
#include "ganges_nic.h"

GANGES_EXTERN GANGES_EVENT Event;
struct ta_metadata
{
  UINT8  name[8];
  UINT32 address;
}metadata[] = {
#ifdef TA_EXT_SRAM_CODE_DOWNLOAD
               {"cache_taim",0x00000000},
               {"cache_tadm",0x20000000},
               {"cache_im",0x04000000}
#else
               {"taim",0x00000000},
               {"tadm",0x20000000}
#endif
             };

/*FUNCTION*********************************************************************
Function Name  : ganges_sdio_master_access_msword
Description    : This function sets the AHB master access MS word in the SDIO
                 slave registers.
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
Parameters     :

-----------------------+-----+-----+-----+------------------------------
Name                   | I/P | O/P | I/O | Purpose
-----------------------+-----+-----+-----+------------------------------
ms_word                |  X  |     |     |  ms word need to be initialized
*END**************************************************************************/

GANGES_STATUS
ganges_sdio_master_access_msword
  (
    PRSI_ADAPTER Adapter,
    UINT16       ms_word
  )
{
  UINT8 byte;
  GANGES_STATUS Status = GANGES_STATUS_SUCCESS;

  /* Initialize master address MS word register with given value */
  byte = (UINT8)(ms_word & 0x00FF);

  /* Writing the upper byte */
  Status = ganges_write_register(0,
		                 Adapter,
                                 SDIO_MASTER_ACCESS_MSBYTE,
                                 &byte);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR, "ganges_master_access_word: "
     			      "Failed to write MSBYTE into the register\n");
    return Status;
  }
  byte = (UINT8)(ms_word >> 8);
  /* Writing the lower byte now */

  Status = ganges_write_register(0,
		                 Adapter,
                                 SDIO_MASTER_ACCESS_LSBYTE,
                                 &byte);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR, "ganges_master_access_word: "
    		              "Failed to write LSBYTE into the register\n");
    return Status;
  }
  return Status;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_load_TA_instructions
Description    : This functions loads TA instructions and data memory
Returned Value : On success 0 will be returned else a negative number
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pAdapter         |     |  X  |     | pointer to our adapter
*END**************************************************************************/

#if KERNEL_VERSION_BTWN_2_6_(18, 22)
INT32 DEVINIT
ganges_load_TA_instructions
  (
    PRSI_ADAPTER Adapter
  )
{
  UINT32 data;
  UINT32 block_size = 256;
  UINT32 instructions_sz;
  UINT32 num_blocks;
  UINT32 cur_indx,ii,jj;
  UINT8  *ta_firmware;
  UINT8  fr4_enable = 0;

  do
  {
    if (ganges_sdio_master_access_msword (Adapter,
                                          0x2200
                                         )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_load_TA_inst: Unable to set ms word reg\n");
      return -1;
    }

    fr4_enable = Adapter->config_params.fr4_enable;
    Adapter->config_params.fr4_enable = 0; /* FIXME */

    data = RSI_CPU_TO_LE32(TA_SOFT_RST_SET);
    /* Putting TA onto reset state before loading the firmware */
    if (ganges_write_register_multiple(Adapter,
 	  		               SDIO_FUN1_FIRM_LD_CTRL_REG |
                                       SD_REQUEST_MASTER,
		       		       4,
				       (UINT8 *) &data
				      )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_load_TA_inst: Unable to put TA in reset state\n");
      return -1;
    }

    /* Writing Configuration Info at 0x20005F00 */
    if (ganges_write_configuration_values(Adapter,
				          0) != GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
		"ganges_load_TA_inst: Unable to load Config Params\n");
      return -1;
    }
    else
    {
      RSI_DEBUG(RSI_ZONE_INIT,
  	        "ganges_load_TA_inst: Loaded TA config params\n");
      ganges_dump(RSI_ZONE_INIT, &Adapter->config_params, sizeof(CONFIG_VALS));
    } /* End if <condition> */

    if (Adapter->DriverMode == RF_EVAL_MODE_ON)
    {
      ganges_memcpy(metadata[0].name, "taim_per", 8);
      ganges_memcpy(metadata[1].name, "tadm_per", 8);
    } /* End if <condition> */

    for (jj = 0; jj < sizeof(metadata) / sizeof(struct ta_metadata); jj++)
    {
      /* Loading DM ms word in the sdio slave */
      if (ganges_sdio_master_access_msword(Adapter,
                                           (metadata[jj].address >> 16)
                                          )!= GANGES_STATUS_SUCCESS)
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
                  "ganges_load_TA_inst: Unable to set ms word reg\n");
        return -1;
      }

      /* Loading in non-multi block mode */

      ta_firmware = (UINT8 *)ganges_load_file(metadata[jj].name,
                                              &instructions_sz,
   				              BIN_FILE);
      if (ta_firmware == NULL)
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
                  "ganges_load_TA_inst: Failed to open file %s\n",
                  metadata[jj].name);
        return -1;
      }

      /* TA version support. Reading version */
      Adapter->ta_ver.ver.info.fw_ver[0] = ta_firmware[TA_VER_OFFSET];
      Adapter->ta_ver.ver.info.fw_ver[1] = ta_firmware[TA_VER_OFFSET + 1];
      Adapter->ta_ver.major = ta_firmware[TA_VER_OFFSET + 2];
      Adapter->ta_ver.minor = ta_firmware[TA_VER_OFFSET + 3];

      if (instructions_sz % 4)
      {
        instructions_sz += (4 - (instructions_sz % 4));
      }

      num_blocks = instructions_sz / block_size;

      for (cur_indx = 0,ii = 0; ii < num_blocks; ii++,cur_indx += block_size)
      {
        /* ganges_dump(RSI_ZONE_INIT, ta_firmware+cur_indx, block_size); */
        if ( ganges_write_register_multiple(Adapter,
  	 	                            cur_indx | SD_REQUEST_MASTER,
  	 		                    block_size,
					    (UINT8 *)(ta_firmware + cur_indx)
                                           )!= GANGES_STATUS_SUCCESS)
        {
          RSI_DEBUG(RSI_ZONE_ERROR,
                    "ganges_load_TA_inst: Unable to load %d %s blk\n",
                    ii,
                    metadata[jj].name);
          return -1;
        }
      }
      if (instructions_sz % block_size)
      {
        /*
           ganges_dump(RSI_ZONE_INIT,
                       ta_firmware+cur_indx,
                       instructions_sz%block_size);
        */
        if (ganges_write_register_multiple(Adapter,
	  	                           cur_indx | SD_REQUEST_MASTER,
  			                   instructions_sz % block_size,
					   (UINT8 *)(ta_firmware + cur_indx)
                                          )!=GANGES_STATUS_SUCCESS)
        {
          RSI_DEBUG(RSI_ZONE_ERROR,
                    "ganges_load_TA_inst: Unable to load %s blk\n",
                    metadata[jj].name);
          return -1;
        }
      }
      RSI_DEBUG(RSI_ZONE_INIT,
	        "ganges_load_TA_inst: Succesfully loaded %s instructions\n",
                metadata[jj].name);
      ganges_vfree(ta_firmware);
    }

    if (ganges_sdio_master_access_msword(Adapter,
                                         0x2200
                                        )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_load_TA_inst: Unable to set ms word reg\n");
      return -1;
    }

    RSI_DEBUG(RSI_ZONE_INIT,"ganges_load_TA_inst: Bringing TA Out of Reset\n");
    data = TA_SOFT_RST_CLR;
    /* Bringing TA out of reset */
    if (ganges_write_register_multiple(Adapter,
	  		               SDIO_FUN1_FIRM_LD_CTRL_REG |
                                       SD_REQUEST_MASTER,
		       		       4,
				       (UINT8 *)&data) != GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_load_TA_inst: Unable to get TA out of reset state\n");
      return -1;
    }

  } while(FALSE);
  Adapter->config_params.fr4_enable = fr4_enable; /* FIXME */

  return 0;
}
#elif KERNEL_VERSION_GREATER_THAN_2_6_(26)
INT32
ganges_load_TA_instructions
  (
    PRSI_ADAPTER Adapter
  )
{
  UINT32 data;
  UINT32 block_size = 256;
  UINT32 instructions_sz;
  UINT32 num_blocks;
  UINT32 cur_indx,ii,jj;
  UINT8  *ta_firmware;
  UINT8  fr4_enable = 0;
  UINT8  temp_buf[256];


  do
  {
    if (ganges_sdio_master_access_msword (Adapter,
                                          0x2200
                                         )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_load_TA_inst: Unable to set ms word to common reg\n");
      return -1;
    }

    fr4_enable = Adapter->config_params.fr4_enable;
    Adapter->config_params.fr4_enable = 0; /* FIXME */

    data = TA_SOFT_RST_SET;
    /* Putting TA onto reset state before loading the firmware */
    if (ganges_write_register_multiple(Adapter,
	                      SDIO_FUN1_FIRM_LD_CTRL_REG |
                                       SD_REQUEST_MASTER,
			        4,
		           (UINT8 *) &data
		          )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_load_TA_inst: Unable to put TA in reset state\n");
      return -1;
    }

    for (jj=0; jj < sizeof(metadata) / sizeof(struct ta_metadata); jj++)
    {
      /* Loading DM ms word in the sdio slave */
      if (ganges_sdio_master_access_msword(Adapter,
                                           (metadata[jj].address >> 16)
                                          )!= GANGES_STATUS_SUCCESS)
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
                  "ganges_load_TA_inst: Unable to set ms word reg\n");
        return -1;
      }

      /* Writing Configuration Info at 0x20005F00 */
      if (ganges_write_register_multiple(Adapter,
                                         CONFIG_TA_ADDR | SD_REQUEST_MASTER,
	                           block_size,
	                        (UINT8 *)(&Adapter->config_params)
                                        )!= GANGES_STATUS_SUCCESS)
       {
         RSI_DEBUG(RSI_ZONE_ERROR,
                   "ganges_load_TA_inst: Unable to load Config Params\n");
         return -1;
       }
       RSI_DEBUG(RSI_ZONE_INIT,
                 "ganges_load_TA_inst: Loaded TA config params\n");
       ganges_dump(RSI_ZONE_INIT,&Adapter->config_params,sizeof(CONFIG_VALS));

      /* Loading in non-multi block mode */
      ta_firmware = (UINT8 *)ganges_load_file(metadata[jj].name,
                                              &instructions_sz,
		                  BIN_FILE);

      if (ta_firmware == NULL)
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
                  "ganges_load_TA_inst: Failed to open file %s\n",
                  metadata[jj].name);
        return -1;
      }
      if (instructions_sz % 4)
      {
        instructions_sz += (4 - (instructions_sz % 4));
      }

      num_blocks = instructions_sz / block_size;

      for (cur_indx = 0,ii = 0; ii < num_blocks; ii++,cur_indx += block_size)
      {
        memset(temp_buf, 0, block_size);
        memcpy(temp_buf, ta_firmware + cur_indx, block_size);
        if (ganges_write_register_multiple(Adapter,
	                             cur_indx | SD_REQUEST_MASTER,
	                          block_size,
	                          (UINT8 *)(temp_buf)
                                          )!=GANGES_STATUS_SUCCESS)
        {
          RSI_DEBUG(RSI_ZONE_ERROR,
                    "ganges_load_TA_inst: Unable to load %s blk\n",
                    metadata[jj].name);
          return -1;
        }
      }

      if (instructions_sz % block_size)
      {
        /*
           ganges_dump(RSI_ZONE_INIT,
                       ta_firmware+cur_indx,
                       instructions_sz%block_size);
        */
        memset(temp_buf, 0, block_size);
        memcpy(temp_buf, ta_firmware + cur_indx, instructions_sz % block_size);
        if (ganges_write_register_multiple(Adapter,
	                             cur_indx | SD_REQUEST_MASTER,
	                          instructions_sz % block_size,
			    (UINT8 *)(temp_buf)
                                          )!=GANGES_STATUS_SUCCESS)
        {
          RSI_DEBUG(RSI_ZONE_ERROR,
                    "ganges_load_TA_inst: Unable to load %s blk\n",
                    metadata[jj].name);
          return -1;
        }
      }
      RSI_DEBUG(RSI_ZONE_INIT,
             "ganges_load_TA_inst: Succesfully loaded %s instructions\n",
                metadata[jj].name);
      ganges_vfree(ta_firmware);
    }

    if (ganges_sdio_master_access_msword(Adapter,
                                         0x2200
                                        )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_load_TA_inst: Unable to set ms word to common reg\n");
      return -1;
    }

    RSI_DEBUG(RSI_ZONE_INIT,"ganges_load_TA_inst: Bringing TA Out of Reset\n");
    data = TA_SOFT_RST_CLR;
    /* Bringing TA out of reset */
    if (ganges_write_register_multiple(Adapter,
	                      SDIO_FUN1_FIRM_LD_CTRL_REG |
                                       SD_REQUEST_MASTER,
			        4,
		           (UINT8 *)&data) != GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_load_TA_inst: Unable to get TA out of reset state\n");
      return -1;
    }

  } while(FALSE);
  Adapter->config_params.fr4_enable = fr4_enable; /* FIXME */

  return 0;
}
#endif

/*FUNCTION*********************************************************************
Function Name  : ganges_card_write
Description    : This function writes frames to the SD card
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
                 else GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------------+-----+-----+-----+------------------------------
Name                   | I/P | O/P | I/O | Purpose
-----------------------+-----+-----+-----+------------------------------
Adapter                |     |     |     |
pkt                    |     |     |     |
Len                    |     |     |     |
queueno                |     |     |     |
*END**************************************************************************/

GANGES_STATUS
ganges_card_write
  (
    PRSI_ADAPTER Adapter,
    UINT8        *pkt,
    UINT32        Len,
    UINT32        queueno
  )
{

  UINT32 block_size    = Adapter->TransmitBlockSize;
  UINT32 num_blocks;
  GANGES_STATUS Status = GANGES_STATUS_SUCCESS;
  /*
     RSI_DEBUG(RSI_ZONE_DATA_SEND,
               "ganges_cardwrite:pkt oflength %d is to be written\n",Len);
  */

  num_blocks = Len/block_size;

  if (Len % block_size)
  {
    num_blocks++;
  }

#ifdef ENABLE_SDIO_CHANGE
  if (num_blocks < 2)
  {
    num_blocks = 2;
  }
#endif

  pkt[14] = queueno;

  if (RSI_CPU_TO_LE16(*(UINT16 *)pkt) < 14)
  {
    RSI_DEBUG(RSI_ZONE_ERROR, "ganges_card_write: Small pkt sending@@@@@\n");
    return GANGES_STATUS_FAILURE;
  }

  Status = ganges_write_register_multiple(Adapter,
                                          num_blocks * block_size |
                                          (queueno << 12),
                                          num_blocks * block_size,
                                          (UINT8 *)pkt);

  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_card_write: Unable to write onto the card: %d\n",
	      Status);
    return Status;
  } /* End if <condition> */

  RSI_DEBUG(RSI_ZONE_DATA_SEND,
            "ganges_card_write: Successfully written onto card\n");
  return Status;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_send_mgmt_frame
Description    : This is a wrapper function which will invoke
                 ganges_card_write to send the given mangement packet.
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
                 else GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
Adapter          |  X  |     |     | pointer to our adapter
frame            |  X  |     |     | management frame which is going to send
len              |  X  |     |     | length of the managemnet frame
*END**************************************************************************/

GANGES_STATUS
ganges_send_mgmt_frame
  (
    PRSI_ADAPTER Adapter,
    UINT8 frame[],
    UINT32 len
  )
{
  ganges_dump(RSI_ZONE_MGMT_DUMP, frame, len);
  return ganges_card_write(Adapter,
                           frame,
                           len,
                           SND_MGMT_Q
                           );

}

/*************************************************************************
Function Name  : ganges_send_TA_mgmt_frame
Description    : This is a wrapper function which will invoke
                 ganges_send_pkt to send the given mangement packet.
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
                 else GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
Adapter          |  X  |     |     | pointer to our adapter
frame            |  X  |     |     | management frame which is going to send
len              |  X  |     |     | length of the managemnet frame
*END**************************************************************************/

GANGES_STATUS
ganges_send_TA_mgmt_frame
  (
    PRSI_ADAPTER Adapter,
    UINT8 frame[],
    UINT32 len
  )
{
  ganges_dump(RSI_ZONE_MGMT_DUMP, frame, len);
  return ganges_card_write(Adapter,
                           frame,
                           len,
                           SND_TA_MGMT_Q
                           );

}

/*FUNCTION*********************************************************************
Function Name  : ganges_card_read
Description    : This function read frames from the SD card
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
                 else GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------------+-----+-----+-----+------------------------------
Name                   | I/P | O/P | I/O | Purpose
-----------------------+-----+-----+-----+------------------------------
Adapter                |     |     |     |
frame_desc             |     |     |     |
ptr                    |     |     |     |
pktlen                 |     |     |     |
queueno                |     |     |     |
*END**************************************************************************/

GANGES_STATUS
ganges_card_read
  (
    PRSI_ADAPTER Adapter,
    UINT8  *frame_desc,
    UINT8  *ptr,
    UINT32 *pktLen,
    UINT32 *queueno
  )
{
  UINT32 Blocksize = Adapter->ReceiveBlockSize;
  UINT32 length    = 0;
  UINT16 ii        = 0;
  GANGES_STATUS Status  = GANGES_STATUS_SUCCESS;
  UINT8  unaggregated_flag = 0;
  struct sk_buff *rxskb = NULL;

  RSI_DEBUG(RSI_ZONE_DATA_RCV, "+ganges_card_read\n");
  Status = ganges_read_register_multiple(Adapter,
		  		         FRAME_DESC_SZ,
				         FRAME_DESC_SZ,/*num_bytes*/
				         (UINT8 *)frame_desc);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_card_read: Failed to read frame desc from the card: %d\n",
	      Status);
    return Status;
  }

  RSI_DEBUG(RSI_ZONE_DATA_RCV, "ganges_card_read: Read desc successfully\n");
  *queueno = frame_desc[14] & RSI_DESC_QUEUE_NUM_MASK;

  if (*queueno == RCV_LMAC_MGMT_Q)
  {
    if (frame_desc[1] & 0x01)
    {
      length = RSI_CPU_TO_LE16(*(UINT16 *)&frame_desc[4]);
    }
    else
    {
      length = frame_desc[0];
    } /* End if <condition> */
    RSI_DEBUG(RSI_ZONE_MGMT_RCV,"ganges_card_read: MGMT Pkt of length %d rcvd\n",
              length);

  }
  else if (*queueno == RCV_TA_MGMT_Q)
  {
    length = frame_desc[0];
    RSI_DEBUG(RSI_ZONE_MGMT_RCV, "ganges_card_read: TA MGMT Pkt rcvd of "
				 "length: %d \n",
				 length);
  }
  else
  {
    /* Data pkt */
    if (frame_desc[15] & RSI_DESC_AGGR_ENAB_MASK)
    {
      UINT16 no_pkts, cur_length;
      UINT16 *dataptr = (UINT16*)frame_desc;
      RSI_DEBUG(RSI_ZONE_DATA_RCV,
                "ganges_card_read: Aggregated pkt recvd\n");

      no_pkts = (frame_desc[15]) & 0x7;

      for (ii = 0; ii < no_pkts; ii++)
      {
	cur_length = RSI_CPU_TO_LE16(*(UINT16 *)&frame_desc[ii * 2]) & 0xFFF;
        RSI_DEBUG(RSI_ZONE_DATA_RCV,
                  "ganges_card_read: TID of the frame is %x\n",
		  ((dataptr[4] >> (ii * 4)) & (0x0f)));

	if (cur_length % Blocksize)
        {
          cur_length += (Blocksize - cur_length % Blocksize);
        }
        length += cur_length;
      }
      if (length > (RSI_RCV_BUFFER_LEN * 4))
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_card_read: Toooo big packet %d\n", length);
        ganges_dump(RSI_ZONE_ERROR, frame_desc, RSI_DESC_LEN);
        length= RSI_RCV_BUFFER_LEN * 4 ;
      }
      if (length < RSI_HEADER_SIZE)
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
		  "ganges_card_read: Too small packet %d\n",length);
        ganges_dump(RSI_ZONE_ERROR, frame_desc, RSI_DESC_LEN);
      }
    }
    else
    {
      /* Unaggregated pkt recvd */
      UINT16 *dataptr = (UINT16*)frame_desc;
      RSI_DEBUG(RSI_ZONE_DATA_RCV,
                "ganges_card_read: TID of the frame is %x\n",
                (dataptr[4] & 0x0f));
      RSI_DEBUG(RSI_ZONE_DATA_RCV,
                "ganges_card_read: Unaggregated data pkt recvd\n");
      length = ((frame_desc[1] << 8) + frame_desc[0]) & 0xFFF;
      if (length > (RSI_RCV_BUFFER_LEN * 4 ))
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_card_read: Toooo big packet %d\n", length);
	ganges_dump(RSI_ZONE_ERROR, frame_desc, RSI_DESC_LEN);
        length = RSI_RCV_BUFFER_LEN * 4 ;
      }
      if (length < RSI_HEADER_SIZE)
      {
        RSI_DEBUG(RSI_ZONE_ERROR,
		  "ganges_card_read: Too small packet %d\n",length);
        ganges_dump(RSI_ZONE_ERROR, frame_desc, RSI_DESC_LEN);
      }

      if (!length)
      {
        RSI_DEBUG(RSI_ZONE_ERROR, "ganges_card_read: Pkt size is zero\n");
	return Status;
      }

      unaggregated_flag = 1;
      *pktLen = length;

      if (length % 4)
      {
        length += (4 - length % 4);
      }

      if (length % Blocksize)
      {
        length += (Blocksize - length % Blocksize);
      }

      rxskb  = ganges_alloc_skb(length);
      ptr    = ganges_skb_put(rxskb,length);


    } /* End if <condition> */
  } /* End if <condition> */

  if (!length)
  {
    RSI_DEBUG(RSI_ZONE_DATA_RCV, "ganges_card_read: Pkt size is zero\n");
    if (*queueno != RCV_DATA_Q)
    {
      return Status;
    }
  }

  if (!unaggregated_flag)
  {
    *pktLen = length;
    if (length % 4)
    {
      length += (4 - length % 4);
    }

    if (length % Blocksize)
    {
      length += (Blocksize - length % Blocksize);
    }
  }

  Status = ganges_read_register_multiple(Adapter,
               			         length, /*address*/
					 length, /*num of bytes*/
					 (UINT8 *)ptr);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
	      "ganges_card_read: Failed to read frame from the card: %d\n",
	      Status);
    return Status;
  }

  if (unaggregated_flag)
  {
    ganges_indicate_packet(Adapter, (UINT8 *)rxskb, *pktLen, 0);
  }

  /*
    RSI_DEBUG(RSI_ZONE_DATA_RCV,
              "ganges_card_read: Read %d bytes of frame frm the card\n",length);
  */
  return Status;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_rcv_pkt
Description    : Upon the occurence of a data pending interrupt, this
                 function will be called. Determine what type of packet it is
		 and handle it accordingly.
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
                 else GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pAdapter	 |     |     |     | Pointer to private data area of the device
*END**************************************************************************/

GANGES_STATUS
ganges_rcv_pkt
  (
    PRSI_ADAPTER Adapter
  )
{
  UINT32 pktLen;
  UINT32 q_no;
  UINT16 type;
  GANGES_STATUS Status = GANGES_STATUS_SUCCESS;
#if KERNEL_VERSION_GREATER_THAN_2_6_(26)
   struct sdio_func *pfunc=Adapter->pfunction;
#endif
  RSI_DEBUG(RSI_ZONE_DATA_RCV, "ganges_rcv_pkt:\n");
  do
  {
    Status = ganges_card_read(Adapter,
                              Adapter->DataRcvPacket,
     	  		      &Adapter->DataRcvPacket[FRAME_DESC_SZ],
			      &pktLen,
			      &q_no);
    if (Status != GANGES_STATUS_SUCCESS)
    {
      Adapter->stats.rx_dropped++;
      break;
    }

    switch(q_no)
    {

      case RCV_DATA_Q:
      {
        /* Check if aggregation enabled */
        if (Adapter->DataRcvPacket[15] & RSI_DESC_AGGR_ENAB_MASK)
        {
          UINT16 ii, no_pkts, cur_length, pkt_offset, pad_len = 0;
          /* 8to 10 bits in word7 indicates number of packets aggegated */
	  no_pkts = (Adapter->DataRcvPacket[15] & 0x7);
	  pkt_offset = 16; /* skip the descriptor */

	  for (ii = 0; ii < no_pkts; ii++)
	  {
	    cur_length = (*(UINT16 *)&Adapter->DataRcvPacket[ii * 2] & 0xFFF);
            if (cur_length % Adapter->ReceiveBlockSize)
            {
              /* Calculate how much padding is added */
              pad_len = (UINT16)(Adapter->ReceiveBlockSize -
                                (cur_length % Adapter->ReceiveBlockSize));

            }
            if (cur_length < 16)
            {
	      RSI_DEBUG(RSI_ZONE_ERROR, "Too small packet to indicate\n");
	      RSI_DEBUG(RSI_ZONE_ERROR, "ganges_rcv_packet: Indicating pktnum%d"
                                        " of length %d\n",
                                       ii,cur_length);
              ganges_dump(RSI_ZONE_ERROR, Adapter->DataRcvPacket, 16);
            }
            if (cur_length > 1536)
            {
	      RSI_DEBUG(RSI_ZONE_ERROR, "Too big packet to indicate\n");
	      RSI_DEBUG(RSI_ZONE_ERROR, "ganges_rcv_packet: Indicating pktnum %d"
                                        " of length %d\n",
                                        ii,cur_length);
              ganges_dump(RSI_ZONE_ERROR, Adapter->DataRcvPacket, 16);
            }
	    RSI_DEBUG(RSI_ZONE_DATA_RCV,
                      "ganges_rcv_packet: Indicating pktnum %d of length %d\n",
                      ii,cur_length);
            if (ganges_indicate_packet(Adapter,
                                       &Adapter->DataRcvPacket[pkt_offset],
                                       cur_length,
				       1) != 0)
	    {
	      RSI_DEBUG(RSI_ZONE_ERROR, "ganges_rcv_packet: Error! Unsuccessful "
                                        "attempt at indicating\n");
	      return GANGES_STATUS_FAILURE;
	    }
            pkt_offset = pkt_offset + cur_length + pad_len;
	  }/* End of for loop */
        }
	else
        {
	  /* No code here - Data pkt already indicated */
	} /* End if <condition> */
      }
      break;

      case RCV_LMAC_MGMT_Q:
      {
        if (Adapter->DataRcvPacket[1] & 0x01)
        {
          pktLen = RSI_CPU_TO_LE16(*(UINT16 *)&(Adapter->DataRcvPacket[4]));
        }
        else
        {
          pktLen = (UINT32)(Adapter->DataRcvPacket[0]);
        } /* End if <condition> */

        if (!pktLen)
        {
          pktLen = 4;
        }
        pktLen += 16;

        /* Type is upper 5 bits of descriptor's second byte */
        type = Adapter->DataRcvPacket[1]  & 0xFE;
        type = type << 8;

	if ((type != MGMT_DESC_TYP_STATS_RESP) &&
           (type != MGMT_DESC_TYP_BEACONS_RESP) &&
	   (type != MGMT_DESC_TYP_PD_VAL_READ))
	{
	  ganges_dump(RSI_ZONE_MGMT_DUMP,
	              Adapter->DataRcvPacket,
		      pktLen);
        }

	/* Before entering the FSM, acquire the lock */
#if KERNEL_VERSION_GREATER_THAN_2_6_(26)
	 Adapter->in_sdio_litefi_irq = NULL;
	 sdio_release_host(pfunc);
#endif
	ganges_down(&Adapter->lock_irq);    /* McHardy 2011-02-23: function call modified */
        ganges_mgmt_fsm(Adapter,
                        Adapter->DataRcvPacket,
                        type,
                        pktLen);
	ganges_up_sem(&Adapter->lock_irq);
#if KERNEL_VERSION_GREATER_THAN_2_6_(26)
	sdio_claim_host(pfunc);
        Adapter->in_sdio_litefi_irq = current;
#endif

      }
      break;

      case RCV_TA_MGMT_Q:
      {
        pktLen = (UINT32)(Adapter->DataRcvPacket[0]);
        if (!pktLen)
        {
          pktLen = 4;
        }
        pktLen += 16;

        /* Type is upper 5 bits of descriptor's second byte */
        type = Adapter->DataRcvPacket[1]  & 0xFF;
        type = type << 8;

        if (type != MGMT_DESC_TYP_BEACONS_RESP)
	{
	  ganges_dump(RSI_ZONE_MGMT_DUMP,
                      Adapter->DataRcvPacket,
	              pktLen);
        }

	/* Before entering the FSM, acquire the lock */
#if KERNEL_VERSION_GREATER_THAN_2_6_(26)
	 Adapter->in_sdio_litefi_irq = NULL;
	 sdio_release_host(pfunc);
#endif
	ganges_down(&Adapter->lock_irq);    /* McHardy 2011-02-23: function call modified */
        ganges_mgmt_fsm(Adapter,
                        Adapter->DataRcvPacket,
                        type,
                        pktLen);
	ganges_up_sem(&Adapter->lock_irq);
#if KERNEL_VERSION_GREATER_THAN_2_6_(26)
	sdio_claim_host(pfunc);
        Adapter->in_sdio_litefi_irq = current;
#endif
      }
      break;

      default:
      {
        RSI_DEBUG(RSI_ZONE_ERROR, "ganges_rcv_pkt: pkt from invalid queue\n");
      }
      break;
    } /* End switch */
  }while (FALSE);
  return Status;
}


/*FUNCTION*********************************************************************
Function Name  : ganges_load_LMAC_instructions
Description    : This function loads instructions or templates to the card
Returned Value : On success 0 is returned else a negative number
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pAdapter         |     |  X  |     | pointer to device's private data area
END**************************************************************************/

GANGES_STATUS  DEVINIT
ganges_load_LMAC_instructions
  (
    PRSI_ADAPTER Adapter
  )
{
  UINT16 cur_indx = 0;
  UINT32 inst_sz_words = LMAC_INSTRUCTIONS_SIZE / 2;
  UINT16 *ganges_inst_set;
  UINT32 block_size = Adapter->TransmitBlockSize;
  UINT16 temp_inst_block[RSI_SDIO_FRM_TRF_SIZE];
  UINT32 inst_size;
#ifdef ENABLE_BIGENDIAN
  UINT16 block_length_words;
#endif

#ifdef TA_EXT_SRAM_CODE_DOWNLOAD
  UINT8  *instructionSet = "cache_instructionSet";
#else
  UINT8  *instructionSet = NULL;

  if (Adapter->DriverMode == WIFI_MODE_ON)
  {
    instructionSet = "instructionSet";
  }
  else
  {
    instructionSet = "instructionSet_per";
  } /* Enf if <condition> */

#endif

  RSI_DEBUG(RSI_ZONE_INIT,"+ganges_load_LMAC_instructions\n");
  ganges_inst_set = (UINT16 *)ganges_load_file(instructionSet,
                                               &inst_size,
                                               HEX_FILE);
  if (ganges_inst_set == NULL)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_load_LMAC_instructions: Failed to open file\n");
    return GANGES_STATUS_FAILURE;
  }

  /* Lmac version support */
  Adapter->lmac_ver.major = ((ganges_inst_set[LMAC_VER_OFFSET] >> 3) & 0xFF);
  Adapter->lmac_ver.minor = ((ganges_inst_set[LMAC_VER_OFFSET+1] >> 3) & 0xFF);

  do
  {
    for (cur_indx = 0; cur_indx < inst_sz_words;
         cur_indx += (RSI_SDIO_FRM_TRF_SIZE / 2))
    {
      /* For each frame desc is to be added */
      ganges_memset(&temp_inst_block[0],0,RSI_DESC_LEN);

      /* Check if the last frame */
      if ((inst_sz_words - cur_indx) <= (RSI_SDIO_FRM_TRF_SIZE >> 1))
      {
        /* Indicate in the descriptor that it is the last frame */
        RSI_DEBUG(RSI_ZONE_INIT,
                  "ganges_load_LMAC_instructions: Last frame\n");
        temp_inst_block[0] = (inst_sz_words - cur_indx) * 2;
        temp_inst_block[2] = 0x0001;
      }

      else
      {
        temp_inst_block[0] = RSI_SDIO_FRM_TRF_SIZE;
      } /* End if <condition> */

      temp_inst_block[1] = cur_indx;

      ganges_memcpy(&temp_inst_block[8],
                    ganges_inst_set + cur_indx,
                    temp_inst_block[0]);

#ifdef ENABLE_BIGENDIAN
      {
        UINT32 ii;
        block_length_words = (temp_inst_block[0] / 2);

        for( ii = 0; ii < (block_length_words + 8); ii++)
        {
          temp_inst_block[ii] = RSI_CPU_TO_LE16(temp_inst_block[ii]);
        }
      }
#endif

      RSI_DEBUG(RSI_ZONE_INIT, "ganges_load_LMAC_inst: Load LMAC block at %d\n",
                cur_indx);
      /* ganges_dump(RSI_ZONE_INIT, temp_inst_block, block_size); */

      if (ganges_write_register_multiple(Adapter,
                                         (RSI_SDIO_FRM_TRF_SIZE + 16) |
                                         (0x1 << 13),
                                         block_size,
				         (UINT8 *)&temp_inst_block[0]
                                        )!=GANGES_STATUS_SUCCESS)
      {
 	RSI_DEBUG(RSI_ZONE_ERROR,
                  "ganges_load_LMAC_inst:Loading of inst at %d offset failed\n",
                  cur_indx);
	return GANGES_STATUS_FAILURE;
      }

    }
    ganges_vfree(ganges_inst_set);
  }while(FALSE);
  return GANGES_STATUS_SUCCESS;
}

/********************************************************************************
Function Name:  ganges_ack_interrupt
Description:    This function acks the interrupt recvd
Returned Value: None
Parameters    :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
Adapter          |     |     |     | Adaapter structure
INT_BIT          |     |     |     |
*******************************************************************************/

VOID
ganges_ack_interrupt
  (
    PRSI_ADAPTER Adapter,
    UINT8        INT_BIT
  )
{
  GANGES_STATUS Status;
  UINT8         byte;

  byte = (INT_BIT);
  Status = ganges_write_register(1,
		  	         Adapter,
                                 SDIO_FUN1_INTR_CLR_REG | SD_REQUEST_MASTER,
                                 &byte);
  if (Status!=GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,"ganges_ack_interrupt: unable to send ack\n");
  }
  return;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_interrupt_handler
Description    : Upon the occurence of an interrupt, the interrupt handler will be
                 called
Returned Value : None
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pContext         |     |     |     | Ptr to the private context
*END**************************************************************************/

#if KERNEL_VERSION_BTWN_2_6_(18, 22)
VOID
ganges_interrupt_handler
  (
    PVOID pContext
  )
{
  INT32          Status;
  INTERRUPT_TYPE InterruptType   = 0;
  UINT8          InterruptStatus = 0;
  UINT8		 FirmwareStatus  = 0;
#ifdef ARASAN_SDIO_STACK
  PSD_INTERFACE  pInterface = (PSD_INTERFACE )pContext;
  struct net_device *dev   = ganges_getcontext(pInterface);
#else
  struct net_device *dev = (struct net_device *)pContext;
#endif
  PRSI_ADAPTER Adapter = ganges_getpriv(dev);

  do
  {
    ganges_down(&Adapter->int_check_sem);    /* McHardy 2011-02-23: function call modified */
    /* Read Interrupt Status Register */
    Status = ganges_read_register(0,
		    	          Adapter,
		                  SDIO_FUN1_INT_REG,
		                  &InterruptStatus);
    if (Status != GANGES_STATUS_SUCCESS)
    {
      ganges_up_sem(&Adapter->int_check_sem);
      ganges_abort_handler(Adapter);
      ganges_schedule();
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_interrupt_handler: Unable to handle interrupt request: %d\n",
		Status);
      break;
    }
    /* Save the interrupt reasons */
    Adapter->InterruptStatus = InterruptStatus;
    if (Adapter->BufferFull)
    {
      /* Masking buffer full interrupt, because BufferFull is already set */
      Adapter->InterruptStatus &= 0xfe;
    }
    do
    {

      /* Get the most important interrupt type waiting on the card */

      InterruptType = ganges_get_interrupt_type(Adapter->InterruptStatus);

      switch (InterruptType)
      {
	case BUFFER_FULL:
	{
	  /* This i/p is recvd when the hardware buffer is full */
	  ganges_handle_bufferfull(Adapter);
  	  RSI_DEBUG(RSI_ZONE_ERROR, "F:%x", Adapter->InterruptStatus);
	  ganges_up_sem(&Adapter->int_check_sem);
	}
	break;

	case BUFFER_FREE:
	{
	  /* This i/p is recvd when the hardware buffer becomes empty */
	  Adapter->BufferFull = RSI_FALSE;
	  ganges_ack_interrupt(Adapter, SD_PKT_BUFF_EMPTY);
	  if (Adapter->DriverMode == WIFI_MODE_ON)
	  {
	    /* No need of issuing this event in RF Eval mode. This event is
	     * used to wakeup the tx thread in WiFi Mode.
             */
	    ganges_Wakeup_Event(&Event);
	  }
	  if (ganges_netif_queue_stopped(Adapter->dev))
	  {
	    ganges_netif_start_queue(Adapter->dev);
	  }
	  RSI_DEBUG(RSI_ZONE_ERROR, "E:%x", InterruptStatus);
	  ++Adapter->num_bfempty;
	  ganges_up_sem(&Adapter->int_check_sem);
	}
	break;

	case FIRMWARE_STATUS:
	{
	  /* Whenever firmware hits an assert condition, it shall raise this
	   * interrupt to the host
	   */
	  ganges_up_sem(&Adapter->int_check_sem);
	  Status = ganges_read_register(0,
					Adapter,
					SDIO_FW_STATUS_REG,
					&FirmwareStatus);
	  if (Status != GANGES_STATUS_SUCCESS)
	  {
	    RSI_DEBUG(RSI_ZONE_ERROR,
		      "ganges_interrupt_handler: Unable to read f/w status: %d\n",
		      Status);
	  }
	  else
	  {
	    RSI_DEBUG(RSI_ZONE_ERROR,
		      "ganges_interrupt_handler: Firmware status is: %08x\n",
		      FirmwareStatus);
	    ganges_ack_interrupt(Adapter, SD_FIRMWARE_STATUS);
	  } /* End if <condition> */
	  /* The driver should be stalled now */
	  Adapter->FSM_STATE = FSM_CARD_NOT_READY;
	}
	break;

	case DATA_PENDING:
	{
	  ganges_up_sem(&Adapter->int_check_sem);
	  RSI_DEBUG(RSI_ZONE_ISR,
		    "ganges_interrupt_handler: Pending pkt interrupt recvd\n");
	  if (ganges_rcv_pkt(Adapter) != 0)
	  {
	    RSI_DEBUG(RSI_ZONE_ERROR,
		      "ganges_interrupt_handler: Unable to recv pkt\n");
	  }
	  else
	  {
	    RSI_DEBUG(RSI_ZONE_ISR,
			"ganges_interrupt_handler: Pkt recvd succesfully\n");
	  } /* End if <condition> */
	}
	break;

	case SLEEP_INDCN:
	{
	  /* Sleep indication and wakeup indication interrupts will be
	   * raised by the firmware, only when we enable host based
	   * wakeup feature.
	   */
	  ganges_down(&Adapter->sleep_ack_sem);      /* McHardy 2011-02-23: function call modified */
	  RSI_DEBUG(RSI_ZONE_ERROR,"SI%x",InterruptStatus);
	  Adapter->sleep_indcn = TRUE;
	  if (Adapter->about_to_send == FALSE)
	  {
	    ganges_ack_interrupt(Adapter,
				 SD_SLEEP_NO_PKT_ACK | SD_SLEEP_INDCN);
	  }
	  else
	  {
	    ganges_ack_interrupt(Adapter, SD_SLEEP_INDCN);
	  } /* End if <condition> */
	  ganges_up_sem(&Adapter->sleep_ack_sem);
	  ganges_up_sem(&Adapter->int_check_sem);
	}
#ifndef ARASAN_SDIO_STACK
	ganges_ack_stack_irq(Adapter);
#endif
	return;

	case WAKEUP_INDCN:
	{
	  UINT32 q_num,que_end;
	  UINT32 que_start = 0,num_pkts;
	  que_end   = (Adapter->qos_enable) ? 4 : 1;

	  /* Sleep indication and wakeup indication interrupts will be
	   * raised by the firmware, only when we enable host based
	   * wakeup feature.
	   */
	  RSI_DEBUG(RSI_ZONE_ERROR,"WI%x",InterruptStatus);
	  Adapter->sleep_indcn = FALSE;
	  for (q_num = que_start; q_num < que_end; ++q_num)
	  {
	    ganges_lock_bh(&Adapter->list[q_num].lock);
	    num_pkts = ganges_queue_len(&Adapter->list[q_num]);
	    ganges_unlock_bh(&Adapter->list[q_num].lock);
	    if (num_pkts)
	    {
	      ganges_ack_interrupt(Adapter,SD_WAKEUP_INDCN);
	      goto BREAK;
	    }
	    if (q_num == que_end - 1)
	    {
	      ganges_ack_interrupt(Adapter,SD_DRIVER_PKT_STATUS|SD_WAKEUP_INDCN);
	    }
	  }
  BREAK:
	  ganges_up_sem(&Adapter->int_check_sem);
	  if (ganges_netif_queue_stopped(Adapter->dev))
	  {
	    ganges_netif_start_queue(Adapter->dev);
	  }
	  ganges_Wakeup_Event(&Event);
	}
	break;

	default:
	{
	  RSI_DEBUG(RSI_ZONE_ISR,
		    "ganges_interrupt_handler: No more pending interrupts\n");
#ifndef ARASAN_SDIO_STACK
	  ganges_ack_stack_irq(Adapter);
#endif
	  ganges_up_sem(&Adapter->int_check_sem);
	  return;
	}
	break;

      }
      Adapter->InterruptStatus &= ~(BIT((InterruptType - 1)));
      if (Adapter->InterruptStatus)
      {
	/* Acquire the semaphore again here. */
        ganges_down(&Adapter->int_check_sem);      /* McHardy 2011-02-23: function call modified */
      }
    } while (Adapter->InterruptStatus);
  } while(TRUE);
  return;
}
#elif KERNEL_VERSION_GREATER_THAN_2_6_(26)
VOID
ganges_interrupt_handler
  (
    struct sdio_func *pfunc
  )
{
  struct net_device *dev;
  PRSI_ADAPTER Adapter;

  INT32          Status;
  INTERRUPT_TYPE InterruptType   = 0;
  UINT8          InterruptStatus = 0;
  UINT8		 FirmwareStatus  = 0;

  dev = ganges_getcontext(pfunc);
  Adapter = ganges_getpriv(dev);

  RSI_DEBUG(RSI_ZONE_ISR,"ganges_interrupt_handler:\n");
  Adapter->in_sdio_litefi_irq = current;

  do
  {
    /* Read Interrupt Status Register */
    Status = ganges_read_register(0,
	                 Adapter,
	                    SDIO_FUN1_INT_REG,
	                    &InterruptStatus);
    if (Status != GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_interrupt_handler: Unable to handle interrupt request: %d\n",
	  Status);
      ganges_schedule();
      break;
    }
    /* Save the interrupt reasons */
    Adapter->InterruptStatus = InterruptStatus;
    /* Get the most important interrupt type waiting on the card */

    if (Adapter->BufferFull == RSI_TRUE)
    {
      Adapter->InterruptStatus &= 0xfe;
    }

    do
    {
      InterruptType = ganges_get_interrupt_type(Adapter->InterruptStatus);
      switch (InterruptType)
      {
	case BUFFER_FULL:
	{
	  /* This i/p is recvd when the hardware buffer is full */
	  ganges_handle_bufferfull(Adapter);
  	  RSI_DEBUG(RSI_ZONE_ERROR, "F:%x", Adapter->InterruptStatus);
	}
	break;

	case BUFFER_FREE:
	{
	  /* This i/p is recvd when the hardware buffer becomes empty */
	  Adapter->BufferFull = FALSE;
	  ganges_ack_interrupt(Adapter, SD_PKT_BUFF_EMPTY);
	  if (Adapter->DriverMode == WIFI_MODE_ON)
	  {
	    /* No need of issuing this event in RF Eval mode. This event is
	     * used to wakeup the tx thread in WiFi Mode.
             */
	    ganges_Wakeup_Event(&Event);
	  }
	  if (ganges_netif_queue_stopped(Adapter->dev))
	  {
	    ganges_netif_start_queue(Adapter->dev);
	  }
          RSI_DEBUG(RSI_ZONE_ERROR, "E:%x", InterruptStatus);
	  ++Adapter->num_bfempty;
	}
	break;

	case FIRMWARE_STATUS:
	{
	  /* Whenever firmware hits an assert condition, it shall raise this
	   * interrupt to the host
	   */
	  Status = ganges_read_register(0,
					Adapter,
					SDIO_FW_STATUS_REG,
					&FirmwareStatus);
	  if (Status != GANGES_STATUS_SUCCESS)
	  {
	    RSI_DEBUG(RSI_ZONE_ERROR,
		      "ganges_interrupt_handler: Unable to read f/w status: %d\n",
		      Status);
	  }
	  else
	  {
	    RSI_DEBUG(RSI_ZONE_ERROR,
		      "ganges_interrupt_handler: Firmware status is: %08x\n",
		      FirmwareStatus);
	    ganges_ack_interrupt(Adapter, SD_FIRMWARE_STATUS);
	  } /* End if <condition> */
	  /* The driver should be stalled now */
	  Adapter->FSM_STATE = FSM_CARD_NOT_READY;
	}
	break;

	case DATA_PENDING:
	{
	  RSI_DEBUG(RSI_ZONE_ISR,
		    "ganges_interrupt_handler: Pending pkt interrupt recvd\n");
	  if (ganges_rcv_pkt(Adapter) != 0)
	  {
	    RSI_DEBUG(RSI_ZONE_ERROR,
		      "ganges_interrupt_handler: Unable to recv pkt\n");
	  }
	  else
	  {
	    RSI_DEBUG(RSI_ZONE_ISR,
		      "ganges_interrupt_handler: Pkt recvd succesfully\n");
	  } /* End if <condition> */
	}
	break;

	case SLEEP_INDCN:
	{
	  ganges_down(&Adapter->sleep_ack_sem);      /* McHardy 2011-02-23: function call modified */
	  RSI_DEBUG(RSI_ZONE_ERROR,"SI%x",InterruptStatus);
	  Adapter->sleep_indcn = TRUE;
	  if (Adapter->about_to_send == FALSE)
	  {
	    ganges_ack_interrupt(Adapter,
			   SD_SLEEP_NO_PKT_ACK | SD_SLEEP_INDCN);
	  }
       else
       {
	 ganges_ack_interrupt(Adapter, SD_SLEEP_INDCN);
	  } /* End if <condition> */
	  ganges_up_sem(&Adapter->sleep_ack_sem);
	}
	return;

	case WAKEUP_INDCN:
	{
	  UINT32 q_num,que_end;
	  UINT32 que_start = 0,num_pkts;
	  que_end   = (Adapter->qos_enable) ? 4 : 1;

	  RSI_DEBUG(RSI_ZONE_ERROR,"WI%x",InterruptStatus);
	  Adapter->sleep_indcn = FALSE;
	  for (q_num = que_start; q_num < que_end; ++q_num)
	  {
	    ganges_lock_bh(&Adapter->list[q_num].lock);
	    num_pkts = ganges_queue_len(&Adapter->list[q_num]);
	    ganges_unlock_bh(&Adapter->list[q_num].lock);
	    if (num_pkts)
	    {
	   ganges_ack_interrupt(Adapter,SD_WAKEUP_INDCN);
	   goto BREAK;
	    }
	    if (q_num == que_end - 1)
	    {
	   ganges_ack_interrupt(Adapter,SD_DRIVER_PKT_STATUS|SD_WAKEUP_INDCN);
	    }
       }
  BREAK:
	  if (ganges_netif_queue_stopped(Adapter->dev))
	  {
	    ganges_netif_start_queue(Adapter->dev);
	  }
	  ganges_Wakeup_Event(&Event);
	}
	break;

	default:
	{
	  RSI_DEBUG(RSI_ZONE_ISR,
		    "ganges_interrupt_handler: No more pending interrupts\n");
	  Adapter->in_sdio_litefi_irq = NULL;
	  return;
	}
	break;

      }
      Adapter->InterruptStatus &= ~(BIT((InterruptType - 1)));
    } while (Adapter->InterruptStatus);
  } while(TRUE);
  Adapter->in_sdio_litefi_irq = NULL;
  return;
}
#endif

/*FUNCTION**********************************************************************
Function Name:  ganges_setupcard
Description:    This function queries and sets the card's features
Returned Value: On success GANGES_STATUS_SUCCESS will be returned
                else GANGES_STATUS_FAILURE is returned
Parameters    :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
Adapter	         |     |     |  X  | Adapter structure
*******************************************************************************/

GANGES_STATUS DEVINIT
ganges_setupcard
  (
    PRSI_ADAPTER Adapter
  )
{
  GANGES_STATUS Status = GANGES_STATUS_SUCCESS;

  /* Setting to 10MHz */
#ifdef ENABLE_SDIO_HIGH_SPEED
  Adapter->sdio_clock_speed = 50;
#endif
  if (Adapter->sdio_clock_speed)
  {
    RSI_DEBUG(RSI_ZONE_INIT, "ganges_setupcard: Forcing SDIO clock to %dMHz\n",
                             Adapter->sdio_clock_speed);
#if KERNEL_VERSION_BTWN_2_6_(18, 22)
    Status = ganges_setclock(Adapter,
                             Adapter->sdio_clock_speed * 1000);
#endif

  }

  if(Status!=GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_INFO,"ganges_setupcard: Unsuccessful at setting clk");
    return Status;
  }

#ifdef ARASAN_SDIO_STACK
  {
    UINT8 byte;
    Status = ganges_read_register(0,
				  Adapter,
				  SD_CARD_CAPABILITY,
				  &byte);
    if(Status!=GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR, "ganges_setupcard: Unable to read card cap\n");
      return Status;
    }
    Adapter->CardCapability = byte;
    if (Adapter->pInterface->interfaceID != 1)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,"ganges_setupcard: Incorrect function number\n");
      return SD_ERROR_INVALID;
    }

    Adapter->Function = Adapter->pInterface->interfaceID;
    Adapter->pInterface->WriteProtected = 0;

    RSI_DEBUG(RSI_ZONE_INIT,"ganges_setup card: Func num %d\n",Adapter->Function);
    RSI_DEBUG(RSI_ZONE_INIT,"ganges_setupcard: CIS Ptr %08x:\n",
			    Adapter->pInterface->CISPointer);
    RSI_DEBUG(RSI_ZONE_INIT,"ganges_setupcard: CSA Ptr %08x:\n",
			    Adapter->pInterface->CSAPointer);
    RSI_DEBUG(RSI_ZONE_INIT,"ganges_setupcard: Interface code %d:\n",
			    Adapter->pInterface->interfaceCode);
    RSI_DEBUG(RSI_ZONE_INIT,"ganges_setupcard: Card Cap %02x:\n",
			    Adapter->CardCapability);
  }
#else
#if KERNEL_VERSION_BTWN_2_6_(18, 22)
  Adapter->CardCapability = ganges_open_sdio_card_caps(Adapter);
  RSI_DEBUG(RSI_ZONE_INIT,"ganges_setup_card: Card Cap: %0x\n",
                           Adapter->CardCapability);
  RSI_DEBUG(RSI_ZONE_INIT,"ganges_setup_card: Common CIS Ptr:  %0x\n",
                           ganges_open_sdio_common_CISptr(Adapter));
  RSI_DEBUG(RSI_ZONE_INIT,"ganges_setup_card: Funcn CIS Ptr:  %0x\n",
                           ganges_open_sdio_func_CISptr(Adapter));
  RSI_DEBUG(RSI_ZONE_INIT,"ganges_setup_card: CSA Ptr:  %0x\n",
                           ganges_open_sdio_func_CSAptr(Adapter));
#endif
#endif

  Adapter->TransmitBlockSize = 256;
  Adapter->ReceiveBlockSize  = 256;
  Status = ganges_setblocklength(Adapter,
		  		 Adapter->TransmitBlockSize);

  if(Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,"ganges_setupcard: Unable to set block length\n");
    return Status;
  }

  return Status;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_init_sdio_slave_regs
Description    : This functions loads initializes SDIO slave registers
Returned Value : On success GANGES_STATUS_SUCCESS will be returned
                 else GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pAdapter         |  X  |     |     | pointer to our adapter
*END**************************************************************************/

GANGES_STATUS DEVINIT
ganges_init_sdio_slave_regs
  (
    PRSI_ADAPTER Adapter
  )
{
  UINT8 byte;
  GANGES_STATUS Status = GANGES_STATUS_SUCCESS;

 if (Adapter->next_read_delay)
  {
    byte = Adapter->next_read_delay;
    Status = ganges_write_register(0,
		                   Adapter,
		                   SDIO_NXT_RD_DELAY2,
		                   &byte);
    if (Status != GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,"ganges_init_sdio_slave_regs: "
		"Failed to write SDIO_NXT_RD_DELAY2\n");
      return Status;
    }
  }

  if (Adapter->sdio_high_speed_enable)
  {
    byte = 0x3;
    RSI_DEBUG(RSI_ZONE_INFO,
              "ganges_init_sdio_slave_regs: Enabling high speed mode\n");
    Status = ganges_write_register(0,
		                   Adapter,
   	                           SDIO_REG_HIGH_SPEED,
		                   &byte);
    if (Status!=GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_init_sdio_slave_regs: Failed to enable "
	        "SDIO high speed\n");
      return Status;
    }
  }

#ifdef TA_EXT_SRAM_CODE_DOWNLOAD
  byte = 0x64;
#else
  byte = 0x24;
#endif
  Status = ganges_write_register(0,
		                 Adapter,
		                 SDIO_READ_START_LVL,
		                 &byte);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_init_sdio_slave_regs: Failed to write "
	      "SDIO_READ_START_LVL reg\n");
    return Status;
  }

   /* This tells SDIO FIFO when to start read to host */
  byte = (128 - 32);
  Status = ganges_write_register(0,
		  	         Adapter,
		                 SDIO_READ_FIFO_CTL,
		                 &byte);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_init_sdio_slave_regs: Failed to write "
	      "SDIO_READ_FIFO_CTL reg\n");
    return Status;
  }

  /* This tells SDIO FIFO when to start writing to host */
  byte = 32;
  Status = ganges_write_register(0,
		  	         Adapter,
		                 SDIO_WRITE_FIFO_CTL,
		                 &byte);
  if (Status != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_init_sdio_slave_regs: Failed to write "
	      "SDIO_WRITE_FIFO_CTL reg\n");
    return Status;
  }
  return Status;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_handle_bufferfull
Description    : This function stops the tx queue and sets buffer full status
Returned Value : None
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pAdapter         |  X  |     |     | pointer to our adapter
*END**************************************************************************/

VOID
ganges_handle_bufferfull
  (
    PRSI_ADAPTER Adapter
  )
{
  Adapter->BufferFull = RSI_TRUE;
  /* ganges_ack_interrupt(Adapter, SD_PKT_BUFF_FULL); */
  if (!ganges_netif_queue_stopped(Adapter->dev))
  {
    if (ganges_check_wpaauthMode(Adapter))
    {
      if (Adapter->wpa_splcnt.group_keys_installed)
      {
        ganges_netif_stop_queue(Adapter->dev);
      }
    }
    else
    {
      ganges_netif_stop_queue(Adapter->dev);
    }
  }
  ++Adapter->num_bfull;
  return;
}

/*FUNCTION*********************************************************************
Function Name  : ganges_write_configuration_values
Description    : This function writes the TA Configuration values
Returned Value : On success GANGES_STATUS_SUCCESS is returned, else
		 GANGES_STATUS_FAILURE is returned
Parameters     :

-----------------+-----+-----+-----+------------------------------
Name             | I/P | O/P | I/O | Purpose
-----------------+-----+-----+-----+------------------------------
pAdapter         |  X  |     |     | pointer to our adapter
Context		 |  X  |     |     | Context from which this function is called
*END**************************************************************************/

GANGES_STATUS
ganges_write_configuration_values
  (
    PRSI_ADAPTER Adapter,
    UINT8	 Context
  )
{
  UINT32 block_size = 256;
  /* Loading ms word in the sdio slave */
  if (ganges_sdio_master_access_msword(Adapter,
				       0x2000
				      )!= GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
 	      "ganges_write_configuration_values: Unable to set ms word reg\n");
    return GANGES_STATUS_FAILURE;
  }

  if (ganges_write_register_multiple(Adapter,
 			             CONFIG_TA_ADDR | SD_REQUEST_MASTER,
				     block_size,
				     (UINT8 *)(&Adapter->config_params))
				     != GANGES_STATUS_SUCCESS)
  {
    RSI_DEBUG(RSI_ZONE_ERROR,
              "ganges_write_configuration_values: Unable to write config values\n");
    return GANGES_STATUS_FAILURE;
  }

  if (Context)
  {
    /* If we are calling this function from the IRQ, which means we entered here
     * to overwrite the config values, then we need to re-intialize the Master
     * acces word reg else, we were called at the initialization and so need to
     * skip this step
     */
    if (ganges_sdio_master_access_msword(Adapter,
                                         0x2200
                                         )!= GANGES_STATUS_SUCCESS)
    {
      RSI_DEBUG(RSI_ZONE_ERROR,
                "ganges_write_configuration_values: Unable to set ms word reg\n");
      return GANGES_STATUS_FAILURE;
    }
  }

  return GANGES_STATUS_SUCCESS;
}

/* $EOF */
/* Log */

