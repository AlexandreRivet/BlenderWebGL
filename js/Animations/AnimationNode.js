/*
 * 
 * CLASSE ANIMATIONNODE
 * 
 * AnimationNode.prototype.setKeyframe = function(time)
 * AnimationNode.prototype.setPosition = function(position)
 * AnimationNode.prototype.setOrientation = function(rotation)
 * AnimationNode.prototype.setScale = function(scale)
 * AnimationNode.prototype.setRotation = function(angle,axis)
 * AnimationNode.prototype.getKeyframe = function()
 * AnimationNode.prototype.getPosition = function()
 * AnimationNode.prototype.getRotation = function()
 * AnimationNode.prototype.getScale = function()
 * AnimationNode.prototype.changeState = function(nodeAnimation)
 * AnimationNode.prototype.clone = function()
 * 
 */

AnimationNode = function(keyframe, pos, rot, scale) 
{
	this.m_Keyframe = keyframe;

	this.m_Position = pos || new THREE.Vector3(0, 0, 0);
    
    //Old Version
    //this.m_Orientation = rot || new THREE.Quaternion(1, 0, 0, 0);
    
    this.m_Orientation = rot || new THREE.Euler(0, 0, 0);
	this.m_Scale =  scale || new THREE.Vector3(1, 1, 1);
	this.m_Angle = 0;
	this.m_Axis = new THREE.Vector3(0,0,0);	
};

/***********************************************************************************************\
* Setters
\***********************************************************************************************/	
AnimationNode.prototype.setKeyframe = function(time)
{
	if(check(time))
		this.m_Keyframe = time;
};
AnimationNode.prototype.setPosition = function(position)
{
	if(check(position))
		this.m_Position = position;
};
AnimationNode.prototype.setOrientation = function(rotation)
{
	if(check(rotation))
		this.m_Orientation = rotation;
};
AnimationNode.prototype.setScale = function(scale)
{
	if(check(scale))
		this.m_Scale = scale;
};
AnimationNode.prototype.setRotation = function(angle,axis)
{
	if(check(angle) && check(axis))
	{
		this.m_Angle = angle;
		this.m_Axis = axis;
	}
		
};

/***********************************************************************************************\
* Getters
\***********************************************************************************************/		
AnimationNode.prototype.getKeyframe = function() { return	this.m_Keyframe; };
AnimationNode.prototype.getPosition = function() { return	this.m_Position; };
AnimationNode.prototype.getRotation = function() { return	this.m_Orientation; };
AnimationNode.prototype.getScale = function() { return	this.m_Scale; };

/***********************************************************************************************\
* changeState
\***********************************************************************************************/	
AnimationNode.prototype.changeState = function(nodeAnimation)
{
	if(this.m_Position != nodeAnimation.m_Position)
		return true;
	if(this.m_Orientation != nodeAnimation.m_Orientation)
		return true;
	if(this.m_Scale != nodeAnimation.m_Scale)
		return true;
	return false;
};

/***********************************************************************************************\
* clone
\***********************************************************************************************/	
AnimationNode.prototype.clone = function()
{
	var clone = new AnimationNode(this.m_Keyframe);
	clone.setPosition(this.m_Position.clone());
	clone.setRotation(this.m_Orientation.clone());
	clone.setScale(this.m_Scale.clone());
	return clone;
};