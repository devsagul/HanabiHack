#
# creates grid.pol
#

tmp = """ 2
26
    -0.116842      5.75955
      6.47208      5.81744
      6.47208      3.84928
 -0.000222379      4.02294
   -0.0585322      2.05477
      3.20677     -1.65000
     0.932721     -1.76577
     -1.39964     0.549711
     -4.02355     -2.40253
     -6.35591     -2.40253
     -2.62413      1.59168
     -2.56582      4.31237
     -7.69702      4.02294
     -7.81363      5.58589
     -1.92442      5.81744
     -2.44920      6.28053
     -2.97398      7.26462
     -3.14891      8.30659
     -2.74075      9.34855
     -1.86611      10.2169
     -1.04979      10.8536
     0.641178      10.3326
      1.80736      9.58010
      1.92397      8.01715
      1.10765      6.74363
     0.116395      5.93321
23
     -7.73000      5.57960
     -7.38517      7.02888
     -6.49436      8.97091
     -4.88517      11.0868
     -2.75873      12.2173
    -0.201261      12.5651
      2.75851      11.8115
      4.05161      10.5361
      5.20104      8.94192
      5.91943      7.40569
      6.20679      5.78250
      4.99989      5.81149
      4.68380      7.57960
      3.70678      9.78250
      1.89644      11.1738
    -0.115054      11.6376
     -2.12655      11.6086
     -3.82195      10.4492
     -5.37367      8.88395
     -6.06333      7.34772
     -6.55184      5.98540
     -6.52310      5.43467
     -7.73000      5.57960 """

file_out = "indalo.pol"
f = open(file_out,'w') 
f.write(tmp)
f.close()
print('file %s written to disk.'%file_out)
