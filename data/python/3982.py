Hn=[1]
count=[0,0,0,0] #2357

while len(Hn)<5842:
	tem=[0,0,0,0]
	for i in xrange(4):
		if i ==0:
			tem[i]=2*Hn[count[i]]
		elif i ==1:
			tem[i]=3*Hn[count[i]]
		elif i ==2:
			tem[i]=5*Hn[count[i]]
		elif i ==3:
			tem[i]=7*Hn[count[i]]
	count[tem.index(min(tem))]+=1
	if min(tem) not in Hn:
		Hn.append(min(tem))

#print(Hn)
print(Hn[5841])