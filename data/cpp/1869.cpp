#include "player.h"
#include "FlowWords.h"

USING_NS_CC;

Player::Player():m_bIsJumping(false),m_iHP(1000),m_bIsHitting(false)
{
}

Player::~Player()
{
}

bool Player::init()
{
	return true;
}

void Player::jump()
{
	if (getSprite()==NULL)
	{
		return;
	}

	//Èç¹ûÒÑÔÚÌøÔ¾ÖÐ£¬Ôò²»ÖØ¸´Ö´ÐÐ
	if (m_bIsJumping)
	{
		return;
	}
	//±ê¼ÇÎªÌøÔ¾×´Ì¬
	m_bIsJumping = true;

	//´´½¨ÌøÔ¾¶¯×÷£ºÔ­µØÌøÔ¾£¬¸ß¶ÈÎª250£¬ÌøÔ¾Ò»´Î
	JumpBy * pJump = JumpBy::create(1.5f,Vec2(0,0),250,1);

	CallFunc * pCallFunc = CallFunc::create(CC_CALLBACK_0(Player::jumpEnd,this));

	ActionInterval * pJumpActions = Sequence::create(pJump,pCallFunc,NULL);

	this->getSprite()->runAction(pJumpActions);

}

void Player::jumpEnd()
{
	m_bIsJumping = false;
}

void Player::hit()
{
	if (this->getSprite()==NULL)
	{
		return;
	}


	FlowWords *pFlowWords = FlowWords::create();
	this->addChild(pFlowWords);

	pFlowWords->showWords("-15",this->getSprite()->getPosition(),this->getSprite()->getContentSize());


	m_iHP -=15;
	if (m_iHP<=0)
	{
		m_iHP = 0;
		MessageBox("GameOver!","Now try again!");
		resetData();
		m_iHP =1000;
	}

	 MoveBy * pBackMove =  MoveBy::create(0.1f,Vec2(-10,0));
	 MoveBy * pForwardMove = MoveBy::create(0.1f,Vec2(10,0));
	 RotateBy * pBackRotate = RotateBy::create(0.1f,-5,0);
	RotateBy * pForwardRotate = RotateBy::create(0.1f,5,0);

	Spawn * pBackActions = Spawn::create(pBackMove,pBackRotate,NULL);
	Spawn * pForwardActions = Spawn::create(pForwardMove,pForwardRotate,NULL);
	CallFunc *pCallFunc = CallFunc::create(CC_CALLBACK_0(Player::hitEnd,this));
	ActionInterval * actions = Sequence::create(pBackActions,pForwardActions,pCallFunc,NULL);

	

	if(m_bIsHitting==false)
	{
		m_bIsHitting = true;

		//this->getSprite()->stopAllActions();

		resetData();

		this->getSprite()->runAction(actions);
		
	}

	

}

 Rect Player::getBoundingBox()
{
	if (this->getSprite()==NULL)
	{
		return  Rect(0,0,0,0);
	}

	Size spriteSize = this->getSprite()->getContentSize();
	Vec2 entityPos = this->getSprite()->getPosition();

	return  Rect(
		entityPos.x-spriteSize.width/2,
		entityPos.y-spriteSize.height/2,
		spriteSize.width-10,
		spriteSize.height-10
		);
}


void Player::resetData()
{
	/*if (m_bIsJumping)
	{
		m_bIsJumping = false;
	}*/

	//this->getSprite()->setPosition(Vec2(200, Director::getInstance()->getVisibleSize().height/4));
	this->getSprite()->setScale(1.0f);
	this->getSprite()->setRotation(0);
}