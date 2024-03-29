/* --COPYRIGHT--,BSD
 * Copyright (c) 2014, Texas Instruments Incorporated
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * *  Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * *  Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * *  Neither the name of Texas Instruments Incorporated nor the names of
 *    its contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * --/COPYRIGHT--*/
//******************************************************************************
//!
//! RAM controller - Set sector0 to memory-retention mode.
//!
//! Setup the RAM controller to memory retention mode. Once watchdog expires
//! and wakes up from LPM3 mode, checking the value in the sector0 and toggle
//! P1.0 if the value is same as orignal value.
//!
//!  Tested On: MSP430FR6989
//!             -----------------
//!         /|\|                 |
//!          | |                 |
//!          --|RST              |
//!            |             P1.0|-->LED
//!            |                 |
//!
//! This example uses the following peripherals and I/O signals.  You must
//! review these and change as needed for your own board:
//! - RAM controller peripheral
//! - WDT peripheral
//! - GPIO Port peripheral
//!
//! This example uses the following interrupt handlers.  To use this example
//! in your own application you must add these interrupt handlers to your
//! vector table.
//! - WDT_A_VECTOR
//!
//******************************************************************************
#include "driverlib.h"

#define DEFAULT_VALUE 0xBEAD

static uint16_t sectorValue;

void main(void)
{
        sectorValue = DEFAULT_VALUE;

        //Initialize WDT module in timer interval mode,
        //with SMCLK as source at an interval of 32 ms.
        WDT_A_intervalTimerInit(WDT_A_BASE,
                                WDT_A_CLOCKSOURCE_ACLK,
                                WDT_A_CLOCKDIVIDER_32K);

        WDT_A_start(WDT_A_BASE);

        //Enable Watchdog Interupt
        SFR_clearInterrupt(SFR_WATCHDOG_INTERVAL_TIMER_INTERRUPT);
        SFR_enableInterrupt(SFR_WATCHDOG_INTERVAL_TIMER_INTERRUPT);

        //Set P1.0 to output direction
        GPIO_setAsOutputPin(
                GPIO_PORT_P1,
                GPIO_PIN0
                );

        /*
         * Disable the GPIO power-on default high-impedance mode to activate
         * previously configured port settings
         */
        PMM_unlockLPM5();

        //RAM controller setting
        RAM_setSectorOff(RAM_SECTOR0, RAM_RETENTION_MODE);

        while (1) {
                //Enter LPM0, enable interrupts
                __bis_SR_register(LPM3_bits + GIE);
                //For debugger
                __no_operation();

                if (sectorValue == DEFAULT_VALUE) {
                        //Toggle P1.0
                        GPIO_toggleOutputOnPin(
                                GPIO_PORT_P1,
                                GPIO_PIN0);
                }
        }

}

//Watchdog Timer interrupt service routine
#if defined(__TI_COMPILER_VERSION__) || defined(__IAR_SYSTEMS_ICC__)
#pragma vector=WDT_VECTOR
__interrupt
#elif defined(__GNUC__)
__attribute__((interrupt(WDT_VECTOR)))
#endif
void WDT_A_ISR(void)
{
        __bic_SR_register_on_exit(LPM3_bits);
}
