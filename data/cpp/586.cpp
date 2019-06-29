#include "ScrollableTable.h"

#include "GLHelper.h"

#include "OpenGLHolder.h"

#include <cmath>

ScrollableTable::ScrollableTable(Pos newPos, Size newSize, int newZHeight, unsigned char newAlpha, Compositor * newCompositor, InputMaster * newInputMaster, List<Menu> * newMenuList, int newElementPerLine, int newElementPerColumn,Size newElementSize, Size newElementMargin, Size newBorderMargin, unsigned char newBackgroundColor[4]) : Menu(newPos, newSize, newZHeight, newAlpha, InteractSwipe, newCompositor, newInputMaster, newMenuList)
{
	allowedInteractMode = InteractAll;
	scrollPos = 0;
	lastInteractPos = Pos(-1,-1);
	elementPerLine = newElementPerLine;
	elementPerColumn = newElementPerColumn;
	elementSize = newElementSize;
	elementPerLine = newElementPerLine;
	elementMargin = newElementMargin;
	borderMargin = newBorderMargin;
	
	memcpy(backgroundColor,newBackgroundColor,4);

	ZHeight = newZHeight;
	pos = newPos;
	size = newSize;
	
}

bool ScrollableTable::isDone()
{
	return false;
}

#include <unistd.h>//sleep


void ScrollableTable::render(Pos offset)
{
	unsigned char colorModified[4];
	memcpy(colorModified,backgroundColor,4);
	GLHelper::alphaOnRGBA(colorModified,alpha);

	
	GLHelper::drawColorSquare(pos+offset,size,colorModified,0,0,0);
	int cellX = 0;
	int cellY = 0;
	for(int i = 0 ; i < elementList.getCount() ; i++)
	{
		if(cellX == elementPerLine)
		{
			cellX = 0;
			cellY++;
		}
					
		elementList.get(i)->render(calculateElementPos(i)+pos);
			
		cellX++;
	}
}


void ScrollableTable::interact(Pos interactPos, InteractMode interactMode, bool isRepeated)
{
		
	if(isRepeated) //wait for the initial reference before moving
	{

		if(lastInteractPos.y - interactPos.y > 100)
		{
			sleep(100);
		}

		

		scrollPos +=  lastInteractPos.y - interactPos.y;



	}
	else
	{
		printf("NOT COUNTING\n");
	}	
	
	//printf("SCROLLPOS %d\n",scrollPos);
	
	if(scrollPos < 0)
	{
		scrollPos = 0;
	}
	
	int marginCount = (elementPerColumn-1);
	if(marginCount < 0)
	{
		marginCount = 0;
	}
	
	int maxScrollPos = (elementSize.y*elementPerColumn)+(elementMargin.y*marginCount)+(borderMargin.y*2)-(WINDOW_SIZE_Y-pos.y);
	//printf("MAXSCROLLPOS %d\n",maxScrollPos);
	if(maxScrollPos < 0)
	{
		maxScrollPos = 0;
	}
	
	if(scrollPos >= maxScrollPos)
	{
		scrollPos = maxScrollPos;
	}
	
	
	updateElementsPos();
	
	
	lastInteractPos = interactPos;
}

void ScrollableTable::add(Interactable * newInteractable)
{
	elementList.add(newInteractable);
	elementPerColumn = ceil(elementList.getCount()/(float) elementPerLine);
	updateBorderMargin();
	updateElementsPos();
}
void ScrollableTable::remove(Interactable * oldInteractable)
{
	elementList.remove(oldInteractable);	
	updateBorderMargin();
	elementPerColumn = ceil(elementList.getCount()/(float) elementPerLine);
}

void ScrollableTable::work()
{
	
}

void ScrollableTable::init()
{
	compositor->addRenderable(this);
	inputMaster->addInteractable(this);
}

void ScrollableTable::deinit()
{
	compositor->removeRenderable(this);	
	inputMaster->removeInteractable(this);
}

void ScrollableTable::updateBorderMargin()
{	
	int firstLineElementCount = min(elementList.getCount(), elementPerLine); //number of elements on the first line
	
	int firstLineMarginCount = firstLineElementCount-1;
	if(firstLineMarginCount < 0)
	{
		firstLineMarginCount = 0;
	}
		
	int occupiedSizeX = firstLineElementCount*elementSize.x+ firstLineMarginCount*elementMargin.x;

	borderMargin.x = (size.x-occupiedSizeX)/2;

}

Pos ScrollableTable::calculateElementPos(int id)
{
	int cellX = id%elementPerLine;
	int cellY = id/elementPerLine;

	return Pos(elementSize.x*cellX  + elementMargin.x*cellX + borderMargin.x,
					 elementSize.y*cellY  + elementMargin.y*cellY + borderMargin.y - scrollPos);
}

void ScrollableTable::updateElementsPos()
{
	for(int i = 0 ; i < elementList.getCount() ; i++)
	{
		elementList.get(i)->updatePos(calculateElementPos(i));
	}
}

Interactable * ScrollableTable::getElement(int id)
{
	return elementList.get(id);
}

int ScrollableTable::getElementCount()
{
	return elementList.getCount();
}
