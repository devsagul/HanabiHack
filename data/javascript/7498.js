function Box(g) //Parsing the game object
{
	var gameObj = g; //Game object reference
	var mainGroup;
	var baseFps = 4;
	var maxDistance = 290;
	var distance = maxDistance;
	var targetDistance = maxDistance;
	var distanceOffset = 0;
	var stepRate = Math.PI/100;
	var wobbleDistance = 10;
	var randoms = [Math.random(), Math.random(), Math.random(), Math.random()];
	this.init = function()
	{
		mainGroup = gameObj.add.group()
		this.sprites = []
		this.maskSprites = []
		for (var i = 0; i<4; i++)
		{
			this.sprites[i] = gameObj.add.sprite(0, 0, "boxFade");
			this.sprites[i].anchor.setTo(0.5,0);
			this.sprites[i].animations.add("border", [0,1,2], baseFps, true);
			this.sprites[i].animations.play("border");
			mainGroup.add(this.sprites[i]);
			this.maskSprites[i] = gameObj.add.graphics(0,0);
			this.maskSprites[i].boundsPadding = 0;
			this.maskSprites[i].beginFill(0x0000000, 1);
			this.maskSprites[i].drawRect(-1000,198,2000,1800);
			mainGroup.add(this.maskSprites[i]);
		}
		
		this.sprites[1].angle = 180;
		this.maskSprites[1].angle = 180;
		this.sprites[2].angle = 90;
		this.maskSprites[2].angle = 90;
		this.sprites[3].angle = -90;
		this.maskSprites[3].angle = -90;
		this.setRatio(1);
	}
	this.moveTo = function(x,y)
	{
		mainGroup.x = x;
		mainGroup.y = y;
	}
	this.setRatio = function(ratio)//Call this function when redrawing the sprites, ratio is the percentage of current badness, position is the central position
	{
		ratio = Math.max(0.001,ratio);
		targetDistance = maxDistance * ratio;
		stepRate = Math.PI/(ratio * 100);
		for (var i = 0; i<4; i++)
		{
			this.sprites[i].animations.getAnimation("border").speed = baseFps * (1+(1-ratio)*1.5);
		}
	}
	this.update = function()
	{
		distanceOffset = distanceOffset + stepRate;
		var mod = Math.round(Math.sin(distanceOffset) * wobbleDistance);
		distance = distance + (targetDistance - distance) * 0.1;
		this.sprites[0].y = distance - mod;
		this.maskSprites[0].y = distance - mod
		this.sprites[1].y = -1*distance + mod;
		this.maskSprites[1].y = -1*distance + mod;
		this.sprites[2].x = -1*distance + mod;
		this.maskSprites[2].x = -1*distance + mod;
		this.sprites[3].x = distance - mod;
		this.maskSprites[3].x = distance - mod;
	}
}
