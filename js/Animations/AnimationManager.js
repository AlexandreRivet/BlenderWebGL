/**
	Class AnimationManager
	
	@brief		AnimationManager Class
	@author		Maxime HELAINE
	@date		27/06/2015
*/

var ANIMATIONMGR = null;
var requestIdAnimation = 0;

var STATE = {
    PLAY: 2,
    PAUSE: 1,
    STOP: 0
};

var TYPE = {
    ONCE: 0,
    LOOP: 1,
    PONG: 2
};

Object.freeze(STATE);
Object.freeze(TYPE);

AnimationManager = function(name, start, end) 
{	
	this.mName = name || "Unknown";
	this.mAnimationList = new Array();
    this.mIsInit = false;
    this.mState = STATE.STOP;
    this.mStart = start || 0.0;
    this.mEnd = end || 20.0;
    this.mSpeed = 1.0;
    this.mType = TYPE.ONCE;
    
    this.mAnimationSelected = null;
    
	this.mStartTime = 0;
	this.mPauseTime = 0;
	
	this.mDurationPlay = 0;
    this.mLastTime = 0;
    this.mElapsedTime = 0;
};

/***********************************************************************************************\
* SETTER / GETTER
\***********************************************************************************************/
AnimationManager.prototype.setName = function(value)
{
    this.mName = value || "Unknown";
};
AnimationManager.prototype.getName = function()
{
    return this.mName;
};

AnimationManager.prototype.setIsInit = function(value)
{
    this.mIsInit = value || false;
};
AnimationManager.prototype.isInit = function()
{
    return this.mIsInit;
};

AnimationManager.prototype.setState = function(value)
{
    this.mState = value || STATE.STOP;
};
AnimationManager.prototype.getState = function()
{
    return this.mState;
};

AnimationManager.prototype.setStart = function(value)
{
    this.mStart = value || 0.0;
};
AnimationManager.prototype.getStart = function(value)
{
    return this.mStart;
};

AnimationManager.prototype.setEnd = function(value)
{
    this.mEnd = value || 20.0;
};
AnimationManager.prototype.getEnd = function(value)
{
    return this.mEnd;
};

AnimationManager.prototype.setSpeed = function(value)
{
    this.mSpeed = value || 1.0;
};
AnimationManager.prototype.getSpeed = function()
{
    return this.mSpeed;
};
AnimationManager.prototype.setType = function(value)
{
    this.mType = value || STATE.ONCE;
};
AnimationManager.prototype.getType = function()
{
    return this.mType;
};

AnimationManager.prototype.addAnimation = function(value)
{
    if(!check(value))
        return;
    this.mAnimationList.push(value);
};
AnimationManager.prototype.getAnimation = function(id)
{
    return mAnimationList[id];
};
    
/***********************************************************************************************\
* Edition d'animation
\***********************************************************************************************/
AnimationManager.prototype.getObjectSelected = function()
{
    return this.mObjectSelected;   
};
AnimationManager.prototype.setAnimationSelected = function(object)
{
    this.mAnimationSelected = object;
};
AnimationManager.prototype.setAnimationSelectedByObject = function(object)
{
    this.mAnimationSelected = null;
    for(var i = 0; i < this.mAnimationList.length; i++)
    {
        if(object === mAnimationList[i].mObject)
            this.mAnimationSelected = mAnimationList[i];
    }
};
AnimationManager.prototype.getAnimationSelectedByObject = function(object)
{
    for(var i = 0; i < this.mAnimationList.length; i++)
    {
        if(object === this.mAnimationList[i].mObject)
            return this.mAnimationList[i];
    }
    return null;
};
AnimationManager.prototype.getAnimationSelected = function()
{
    return this.mAnimationSelected;
};  
    
AnimationManager.prototype.getKeys = function(animation)
{
    var animationSelected = animation || this.mAnimationSelected;
    return animationSelected.mSceneNodeAnimMap;
};
    
AnimationManager.prototype.addKeyAnimation = function(key)
{
    if(!check(this.mAnimationSelected))
        return;
    
    if(check(this.mAnimationSelected.getKey(key)))
        this.mAnimationSelected.setKey(key);
    else
        this.mAnimationSelected.addKey(key);    
};
    
/***********************************************************************************************\
* Lecture Animation(s)
\***********************************************************************************************/
AnimationManager.prototype.play = function()
{
    if(this.mState == STATE.PLAY)
        return;
    
    this.mState = STATE.PLAY;
    
    //Last Way to calculate Current Time
    //this.mStartTime = (new Date()).getTime();
    
    this.mLastTime = (new Date()).getTime();
    if(!this.mIsInit)
    {
        var nodeAnimation = null;
        for(var i = 0; i < this.mAnimationList.length; i++)
        {
            this.mAnimationList[i].updateStartPosRotScale();
            
            nodeAnimation = (this.getKeys(this.mAnimationList[i]))[0];
            this.mAnimationList[i].mObject.position.copy(nodeAnimation.getPosition());
            
            //Old Version
            //this.mAnimationList[i].mObject.quaternion.copy(nodeAnimation.getRotation());
            
            this.mAnimationList[i].mObject.rotation.copy(nodeAnimation.getRotation());
            this.mAnimationList[i].mObject.scale.copy(nodeAnimation.getScale());
        }
        
        this.mIsInit = true; 
    }
    
};
AnimationManager.prototype.pause = function()
{
    if(this.mState == STATE.PAUSE || this.mState == STATE.STOP)
        return;
    
    this.mState = STATE.PAUSE;
    
    //Last Way to calculate Current Time
    //this.mLastDurationPlay = this.mDurationPlay;
    //this.mPauseTime = (new Date()).getTime();
    
};
AnimationManager.prototype.stop = function()
{
    if(this.mState == STATE.STOP)
        return;
    
    this.mState = STATE.STOP;
    for(var i = 0; i < this.mAnimationList.length; i++)
    {
        
        
        //Old Version
        //this.mAnimationList[i].mObject.position.copy(this.mAnimationList[i].mStartPos);
        //this.mAnimationList[i].mObject.quaternion.copy(this.mAnimationList[i].mStartRot);
        //this.mAnimationList[i].mObject.scale.copy(this.mAnimationList[i].mStartScale);
        
        this.mAnimationList[i].resetNodePosRotScale();
    }
    
    //Last Way to calculate Current Time
    //this.mStartTime = 0;
    //this.mPauseTime = 0;
    
    this.mDurationPlay = 0;
    this.mLastTime = 0;
    this.mIsInit = false;
};
AnimationManager.prototype.updateAnimation = function()
{
    if(this.mState == STATE.STOP || this.mState == STATE.PAUSE)
        return;
    
    //Last Way to calculate Current Time
    //this.mDurationPlay = ((new Date()).getTime() - this.mStartTime) + this.mLastDurationPlay + this.mStart;
    //var timeAtPlay = this.mDurationPlay/1000 * this.mSpeed;
    
    this.mElapsedTime = ((new Date()).getTime() - this.mLastTime)
    this.mDurationPlay += this.mElapsedTime * this.mSpeed + this.mStart;
    this.mLastTime = (new Date()).getTime();
    var timeAtPlay = this.mDurationPlay/1000;
    
    if(timeAtPlay > this.mEnd)
    {
        switch(this.mType)
        {
            case TYPE.ONCE:
                this.stop();
                return;
                
            case TYPE.LOOP:
                this.stop();
                this.play();
                break;
                
            case TYPE.PONG:
                break;
        }
    }
    for(var i = 0; i < this.mAnimationList.length; i++)
    {
        this.mAnimationList[i].playAnimation(timeAtPlay);
    }
    
};
AnimationManager.prototype.clear = function()
{
    this.stop();
    this.mAnimationList.splice(0,this.mAnimationList.length);
}
    
ANIMATIONMGR = new AnimationManager("AnimMgr",0.0,10.0);