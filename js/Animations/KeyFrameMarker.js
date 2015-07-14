/**
	Class KeyFrameMarker
	
	@brief		KeyFrameMarker Class
	@author		Maxime HELAINE
	@date		27/06/2015
    @resum      Objet qui fait le lien entre l'animation, les clés d'animation, le temps et l'objet cursor HTML
*/

KeyFrameMarker = function(cursor, animationnode, time, animation) 
{	
	this.mCursor = cursor;
    this.mAnimation = animation;
    this.mAnimationNode = animationnode;
    this.mTime = time;
    
};

/***********************************************************************************************\
* SETTER / GETTER
\***********************************************************************************************/
KeyFrameMarker.prototype.setCursor = function(cursor)
{
    this.mCursor = cursor;
};
KeyFrameMarker.prototype.getCursor = function()
{
    return this.mCursor;
};
KeyFrameMarker.prototype.setAnimation = function(animation)
{
    this.mAnimation = animation;
};
KeyFrameMarker.prototype.getAnimation = function()
{
    return this.mAnimation;
};
KeyFrameMarker.prototype.setAnimationNode = function(animationnode)
{
    this.mAnimationNode = animationnode;
};
KeyFrameMarker.prototype.getAnimationNode = function()
{
    return this.mAnimationNode;
};
KeyFrameMarker.prototype.setTime = function(time)
{
    this.mTime = time;
};
KeyFrameMarker.prototype.getTime = function()
{
    return this.mTime;
};

