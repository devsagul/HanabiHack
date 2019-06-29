#include "testdelete.h"
#include<QGraphicsRectItem>
#include"module.h"
#include<QDebug>
#include<QGraphicsProxyWidget>
testdelete::testdelete()

{
	add = new QPushButton();
	del = new QPushButton();
	scene.setSceneRect(QRectF(0, 0, 100, 100));
	setScene(&scene);
	scene.addWidget(add);
	add->move(200,300);
	scene.addWidget(del);
	del->move(200, 200);
	connect(add, &QPushButton::clicked, this, &testdelete::adds);
	connect(del, &QPushButton::clicked, this, &testdelete::dele);

}

testdelete::~testdelete()
{

}

void testdelete::dele()
{
	delete items().at(0);
	//QPointF p;
//	p.setX(0);
//	p.setY(0);
//	QTransform transform;
	//scene.removeItem(scene.itemAt(p, transform));
//	QGraphicsProxyWidget *tempPw = static_cast<QGraphicsProxyWidget*>(itemAt(0, 0));
//	module *tempModule = (module*)tempPw->widget();
//	delete tempModule;
	qDebug() <<QString::number(scene.items().count());
}


void testdelete::adds()
{
	module * item = new module(1,1,1);
	item->resize(50, 50);
	item->setAutoFillBackground(true);
	QPalette palette;
	palette.setColor(QPalette::Background, QColor(qrand() % 256, qrand() % 256, qrand() % 256));
	item->setPalette(palette);
	scene.addWidget(item);
	qDebug() << QString::number(item->pos().x());
	qDebug() << QString::number(item->pos().y());

}
