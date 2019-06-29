#include <iostream>
using namespace std;
struct Node
{
    int id;
    int age;
};
typedef Node ElemType;
struct SqList
{
    ElemType* list;
    int size;
    int maxSize;
};
bool initList(SqList& L,int ms);
void clearList(SqList& L);
int getSize(SqList L);
bool isEmpty(SqList L);
bool isFull(SqList L);
void traverList(SqList L,void (*visit)(ElemType&));
ElemType& getElem(SqList L,int pos);
int locateElem(SqList& L,ElemType e,int (*compare)(ElemType,ElemType));
int findList(SqList L,ElemType e);
bool insertElem(SqList& L,ElemType e,int pos);
bool deleteElem(SqList& L,int pos);
bool createList(SqList& L,int n,void (*visit)(ElemType&));

bool initList(SqList& L,int ms)//¿ª±Ùms¸ö¿Õ¼ä
{
    L.list=new ElemType[ms];
    if (!L.list)
    {
        cerr<<"Memory allocation failure!"<<endl;
        exit(1);
    }
    L.size=0;
    L.maxSize=ms;
    return true;
}
void clearList(SqList& L) //Çå³ýlist
{
    L.size=0;
}
int getSize(SqList L)//·µ»ØL´óÐ¡
{
    return L.size;
}
bool isEmpty(SqList L)//·µ»ØLÎª¿Õ
{
    return L.size==0;
}
bool isFull(SqList L)//·µ»ØL´óÐ¡ÒÑÂú
{
    return L.size==L.maxSize;
}
void traverList(SqList L,void (*visit)(ElemType&))
{
    for (int i=0;i<L.size;++i)
        visit(L.list[i]);
    cout<<endl;
}
bool createList(SqList& L,int n,void (*visit)(ElemType&))
{
    if (n>L.maxSize)
        return false;
    for (int i=0;i<n;++i)
    {
        visit(L.list[i]);
        ++L.size;
    }
    return true;
}
ElemType& getElem(SqList L,int pos)
{
    if (pos<1||pos>L.size)
    {
        cerr<<"pos is out range!"<<endl;
        exit(1);
    }
    return L.list[pos-1];
}
int locateElem(SqList& L,ElemType e,int (*compare)(ElemType,ElemType))//²éÕÒÏßÐÔ±íÖÐÂú×ã¸ø¶¨Ìõ¼þµÄÔªËØ
{
    for (int i=0;i<L.size;++i)
        if (compare(L.list[i],e)==1)
            return i+1;
    return 0;
}
bool insertElem(SqList& L,ElemType e,int pos)//ÏòÏßÐÔ±íÖÐµÄÖ¸¶¨Î»ÖÃ²åÈëÒ»¸öÔªËØ
{
    if (pos<1||pos>L.size+1)
    {
        cerr<<"pos is out range!"<<endl;
        return false;
    }
    for (int i=L.size-1;i>=pos-1;--i)
        L.list[i+1]=L.list[i];
    L.list[pos-1]=e;
    ++L.size;
    return true;
}
bool deleteElem(SqList& L,int pos)//´ÓÏßÐÔ±íÖÐÉ¾³ýÖ¸¶¨Î»ÖÃµÄÔªËØ
{
    if (pos<1||pos>L.size)
    {
        cerr<<"pos is out range!"<<endl;
        return false;
    }
    for (int i=pos-1;i<L.size-2;++i)
        L.list[i]=L.list[i+1];
    --L.size;
    return true;
}
int equal(ElemType e1,ElemType e2)//ÅÐ¶ÏÊÇ·ñÓëeÏàµÈ
{
    if (e1.id==e2.id)
        return 1;
    return 0;
}
 
int compare(ElemType e1,ElemType e2)//±È½Ï´óÐ¡ e2´ó·µ»Ø1
{
    if (e1.id<=e2.id)
        return 1;
    else
        return 0;
}
SqList mergeList(SqList La,SqList Lb)//ºÏ²¢Á½¸öÏßÐÔ±í
{
    SqList Lc;
    initList(Lc,20);
    int i,j,k,laSize,lbSize;
    ElemType ai,bj;
    i=j=1,k=0;
    laSize=getSize(La);
    lbSize=getSize(Lb);
    while ((i<=laSize)&&(j<=lbSize))
    {
        ai=getElem(La,i);
        bj=getElem(Lb,j);
        if (compare(ai,bj)==1)
        {
            insertElem(Lc,ai,++k);
            ++i;
        }
        else
        {
            insertElem(Lc,bj,++k);
            ++j;
        }
    }
    while (i<=laSize)
    {
        ai=getElem(La,i++);
        insertElem(Lc,ai,++k);
    }
    while (j<=lbSize)
    {
        bj=getElem(Lb,j++);
        insertElem(Lc,bj,++k);
    }
    return Lc;
}
void unionList(SqList &la,SqList lb);
void print(ElemType& e)//Êä³ö
{
    cout<<"id:"<<e.id<<"  age:"<<e.age<<endl;
}
void inputElem(ElemType& e)//²åÈë
{
    //cout<<"input id:";
    cin>>e.id;
    //cout<<"input age:";
    cin>>e.age;
    cout<<endl;
}
int main()
{   
    SqList la,lb;
    ElemType a1,a2,a3,b1,b2,b3,b4;
    a1.id=1;
    a1.age=57;
    a2.id=3;
    a3.id=6;
    b1.id=2;
    b2.id=4;
    b3.id=5;
    b4.id=7;
    initList(la,10);
    initList(lb,10);
    insertElem(la,a1,1);
    insertElem(la,a2,2);
    insertElem(la,a3,3);
    insertElem(lb,b1,1);
    insertElem(lb,b2,2);
    insertElem(lb,b3,3);
    insertElem(lb,b4,4);
    traverList(la,print);
    traverList(lb,print);
    //unionList(la,lb);
    //traverList(la,print);
    SqList lc=mergeList(la,lb);
    traverList(lc,print);
}

void unionList(SqList &la,SqList lb)//¼¯ºÏA=A¡ÈB
{
    int lbSize=getSize(lb);
    ElemType e;
    for (int i=1;i<=lbSize;++i)
    {
        e=getElem(lb,i);
        if (!locateElem(la,e,equal))
            insertElem(la,e,la.size+1);
    }
}