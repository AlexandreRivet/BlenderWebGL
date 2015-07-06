/**
	Class Animation
	
	@brief		Animation Class
	@author		Maxime HELAINE
	@date		27/06/2015
*/

Animation = function(object, startTimeAnimation, interpolationMode, rotationInterpolationMode) 
{	
	this.mSceneNodeAnimMap = new Array();
	this.mObject = object;
    
	this.mStartAnimation = startTimeAnimation || 0;
	
	this.mInterpolationMode = interpolationMode || "linear";
	this.mRotationInterpolationMode = rotationInterpolationMode || "linear";

	this.mCurrentFrame = 0;
	this.mCurrentPosition = new THREE.Vector3(0,0,0);
    
    //Old Version
	//this.mCurrentRotation = new THREE.Quaternion(1,0,0,0);
    
    this.mCurrentRotation = new THREE.Euler(0,0,0);
	this.mCurrentScale = new THREE.Vector3(1,1,1);
    
	this.mStartPos = object.position.clone();
    
    //Old Version
    //this.mStartRot = object.quaternion.clone();
    
	this.mStartRot = object.rotation.clone();
	this.mStartScale = object.scale.clone();

	
};

/***********************************************************************************************\
* SETTER / GETTER
\***********************************************************************************************/

Animation.prototype.addKey = function(key)
{
    if(key instanceof AnimationNode)
        this.mSceneNodeAnimMap.push(key);
    else
        this.mSceneNodeAnimMap.push(new AnimationNode(key, this.mObject.position.clone(), this.mObject.rotation.clone(), this.mObject.scale.clone()));
    
    this.mSceneNodeAnimMap.sort(function(keyA, keyB) {
            return (keyA.m_Keyframe - keyB.m_Keyframe);
        });
    //Old Version
    //else
        //this.mSceneNodeAnimMap.push(new AnimationNode(key, this.mObject.position.clone(), this.mObject.quaternion.clone(), this.mObject.scale.clone()));
}
Animation.prototype.setKey = function(key)
{
    for(var i = 0; i < this.mSceneNodeAnimMap.length; i++)
    {
        currentSceneNodeAnim = this.mSceneNodeAnimMap[i];
        if(key == currentSceneNodeAnim.getKeyframe())
            this.mSceneNodeAnimMap[i] = new AnimationNode(key, this.mObject.position.clone(), this.mObject.rotation.clone(), this.mObject.scale.clone());
    }
}
Animation.prototype.getKey = function(id)
{
    var currentSceneNodeAnim;
    for(var i = 0; i < this.mSceneNodeAnimMap.length; i++)
    {
        currentSceneNodeAnim = this.mSceneNodeAnimMap[i];
        if(id == currentSceneNodeAnim.getKeyframe())
            return currentSceneNodeAnim;
    }
    return null;
}
Animation.prototype.removeKey = function(key)
{
    for(var i = 0; i < this.mSceneNodeAnimMap.length; i++)
    {
        currentSceneNodeAnim = this.mSceneNodeAnimMap[i];
        if(key == currentSceneNodeAnim.getKeyframe())
            this.mSceneNodeAnimMap.splice(i,1);
    }
}
/***********************************************************************************************\
* playAnimation
\***********************************************************************************************/
Animation.prototype.playAnimation = function(currentTime)
{
    if(currentTime < this.mStartAnimation)
        return;
    
	for(var i = 0; i < this.mSceneNodeAnimMap.length ; i++)
	{
		if(currentTime <= this.mSceneNodeAnimMap[i].m_Keyframe)
			break;
	}
    
	var id = i - 1;
	if(id < 0)
		id = 0;
	var nodeAnimation = this.mSceneNodeAnimMap[id];
	var nodeAnimation_next = nodeAnimation.clone();
	var timeKey = nodeAnimation.m_Keyframe;
	var factor = 0;
	
	if(id  < this.mSceneNodeAnimMap.length - 1)
	{
		nodeAnimation_next = this.mSceneNodeAnimMap[id+1];
		var timeKey_next = nodeAnimation_next.m_Keyframe;
		var diffKey = (timeKey_next - timeKey) ;
		var diffTime = (currentTime - timeKey);
		factor = diffTime / diffKey;
	}
	
	
	this.mCurrentPosition = this.linearInterpolation(factor,nodeAnimation.m_Position,nodeAnimation_next.m_Position);
    
    //Old Version
    //this.mCurrentRotation = nodeAnimation.m_Orientation.slerp(nodeAnimation_next.m_Orientation,factor).clone();
    
    this.mCurrentRotation = this.linearInterpolation(factor,nodeAnimation.m_Orientation,nodeAnimation_next.m_Orientation);
	this.mCurrentScale= this.linearInterpolation(factor,nodeAnimation.m_Scale,nodeAnimation_next.m_Scale);
    
    this.refreshNodePosRotScale();
    
};

/***********************************************************************************************\
* Refresh la position du mesh
\***********************************************************************************************/
Animation.prototype.refreshNodePosRotScale = function()
{
	this.mObject.position.copy(this.mCurrentPosition);
    
    //Old Version
    //this.mObject.quaternion.copy(this.mCurrentRotation);
    
    this.mObject.rotation.copy(this.mCurrentRotation);
    this.mObject.scale.copy(this.mCurrentScale);
};

/***********************************************************************************************\
* Refresh la position du mesh
\***********************************************************************************************/
Animation.prototype.resetNodePosRotScale = function()
{
	this.mObject.position.copy(this.mStartPos);
    
    //Old Version
    //this.mObject.quaternion.copy(this.mCurrentRotation);
    
    this.mObject.rotation.copy(this.mStartRot);
    this.mObject.scale.copy(this.mStartScale);
};
Animation.prototype.updateStartPosRotScale = function()
{
	this.mStartPos.copy(this.mObject.position);
    
    //Old Version
    //this.mObject.quaternion.copy(this.mCurrentRotation);
    
    this.mStartRot.copy(this.mObject.rotation);
    this.mStartScale.copy(this.mObject.scale);
};
/***********************************************************************************************\
* Fonction(s) d'interpolation(s)
\***********************************************************************************************/
Animation.prototype.linearInterpolation = function(factor,vec1,vec2)
{
    if(vec1 instanceof THREE.Euler)
    {
        return new THREE.Euler
        (
            (vec2.x - vec1.x)*factor + vec1.x, //x
            (vec2.y - vec1.y)*factor + vec1.y, //y
            (vec2.z - vec1.z)*factor + vec1.z //z
        );
    }
    
	return new THREE.Vector3
	(
		(vec2.x - vec1.x)*factor + vec1.x, //x
		(vec2.y - vec1.y)*factor + vec1.y, //y
		(vec2.z - vec1.z)*factor + vec1.z //z
	);
};
