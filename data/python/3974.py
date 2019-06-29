#!/usr/bin/python
# -*- encoding: utf-8; py-indent-offset: 4 -*-
# +---------------------------------------------------------------------+
# |        _             _ _      ____       _                          |
# |       / \  _   _  __| (_) ___/ ___|  ___(_) ___ _ __   ___ ___      |
# |      / _ \| | | |/ _` | |/ _ \___ \ / __| |/ _ \ '_ \ / __/ _ \     |
# |     / ___ \ |_| | (_| | | (_) |__) | (__| |  __/ | | | (_|  __/     |
# |    /_/   \_\__,_|\__,_|_|\___/____/ \___|_|\___|_| |_|\___\___|     |
# |                                                                     |
# | Copyright Alejandro Olivan 2018                 alex@alexolivan.com |
# +---------------------------------------------------------------------+
# | A Check_mk agent to monitor AudioScience cards on Debian systems    |
# | This file contains plugin WATO parameters definition.               |
# +---------------------------------------------------------------------+
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
# MA  02110-1301, USA.


group = "checkparams"
subgroup_audio = _("Audio, Video and multimedia")


register_check_parameters(
    subgroup_audio,
    "audioscience_temp",
    _("AudioScience Adapter Temperature"),
    Dictionary(
        elements = [
            ("temp",
                Tuple(
                    title = _("Adapter temperature"),
                    help = _("On-board sensor temperature alarm values."),
                    elements = [
                        Integer(
                            title = _("Warning if over"),
                            unit = _("ºC"),
                            default_value = 65
                        ),
                        Integer(
                            title = _("Critical if over"),
                            unit = _("ºC"),
                            default_value = 75
                        ),
                    ]
                )
            ),
        ],
   ),
   TextAscii( title=_("Adapter temperature alarm values"),
   help=_("Leave blank to apply alarm values to all adapters, or specify an specicfic adapter to set values only to it.")),
   "dict"
)

register_check_parameters(
    subgroup_audio,
    "audioscience_dspload",
    _("AudioScience Adapter DSP load"),
    Dictionary(
        elements = [
            ("dspload",
                Tuple(
                    title = _("Adapter DSP load"),
                    help = _("On-board DSP load alarm values."),
                    elements = [
                        Integer(
                            title = _("Warning if over"),
                            unit = _("%"),
                            default_value = 75
                        ),
                        Integer(
                            title = _("Critical if over"),
                            unit = _("%"),
                            default_value = 85
                        ),
                    ]
                )
            ),
        ],
   ),
   TextAscii( title=_("Adapter DSP load alarm values"),
   help=_("Leave blank to apply alarm values to all adapters, or specify an specicfic adapter to set values only to it.")),
   "dict"
)
