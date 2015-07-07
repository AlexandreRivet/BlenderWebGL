/**
	Class AnimationEditor
	
	@brief		AnimationEditor Class
	@author		Maxime HELAINE
	@date		27/06/2015
*/

var ANIMATIONEDITOR = null;

AnimationEditor = function() 
{	
    this.mCursorArea;
	this.mAllKeyFrameMarkers = new Array();
    this.mCurrentKeyFrameMarkers = new Array();
    this.mCursorPrincipal;
    this.mCursorSelected;
    this.mPlayButton;
    this.mCurrentTimeEditor;
};

/***********************************************************************************************\
* SETTER / GETTER
\***********************************************************************************************/
AnimationEditor.prototype.setCursorPrincipal = function(cursor)
{
    this.mCursorPrincipal = cursor || null;
};
AnimationEditor.prototype.getCursorPrincipal = function()
{
    return this.mCursorPrincipal;
};
AnimationEditor.prototype.setPlayButton = function(playButton)
{
    this.mPlayButton = playButton || null;
};
AnimationEditor.prototype.getPlayButton = function()
{
    return this.mPlayButton;
};
AnimationEditor.prototype.setCurrentTimeEditor = function(timeEditor)
{
    this.mCurrentTimeEditor = timeEditor || null;
};
AnimationEditor.prototype.getCurrentTimeEditor = function()
{
    return this.mCurrentTimeEditor;
};
AnimationEditor.prototype.addKeyFrameAll = function(keyFrame)
{
    this.mAllKeyFrameMarkers.push(keyFrame);
    this.mAllKeyFrameMarkers.sort(function(keyA, keyB) {
            return (keyA.mTime - keyB.mTime);
    });
};
AnimationEditor.prototype.addKeyFrameCurrent = function(keyFrame)
{
    this.mCurrentKeyFrameMarkers.push(keyFrame);
    this.mCurrentKeyFrameMarkers.sort(function(keyA, keyB) {
            return (keyA.mTime - keyB.mTime);
    });
};
AnimationEditor.prototype.setPosWithTime = function(currentTime, timeMax)
{
    var widthMax = $('.AnimationEditorAreaScroll')[0].offsetWidth;
    var pos = (currentTime / timeMax) * widthMax;
    this.mCursorPrincipal.setStyle({'left':pos+'px'});
}
AnimationEditor.prototype.updateTimeEditorAnimation = function(currentTime)
{
    this.mCurrentTimeEditor.setValue(currentTime);
}
AnimationEditor.prototype.removeKeyframeMarkerSelected = function()
{
    var currentMarker;
    var animation;
    for(var i = 0; i < this.mAllKeyFrameMarkers.length; i++)
    {
        currentMarker = this.mAllKeyFrameMarkers[i];
        if(currentMarker.mCursor ===  this.mCursorSelected)
        {
            animation = currentMarker.mAnimation;
            animation.removeKey(currentMarker.mTime);
            this.mAllKeyFrameMarkers.splice(i,1);
            this.updateDisplayCursors(animation);
            this.mCursorSelected = null;
            return;
        } 
    }
}   
/***********************************************************************************************\
* 
\***********************************************************************************************/
AnimationEditor.prototype.selectCursor = function(cursor)
{
    if(!check(cursor))
       return;  
       
    cursor.setClass('AnimationEditorCursorSelected');
}
AnimationEditor.prototype.unselectCursor = function(cursor)
{
    if(!check(cursor))
       return; 
    
    cursor.setClass('AnimationEditorCursor');
}
AnimationEditor.prototype.updateCurrentKeyFrames = function(animation)
{
    this.mCurrentKeyFrameMarkers.splice(0,this.mCurrentKeyFrameMarkers.length);
    if(!check(animation))
        return;
        
    this.mAllKeyFrameMarkers.sort(function(keyA, keyB) {
            return (keyA.mTime - keyB.mTime);
    });
    
    for(var i = 0; i < this.mAllKeyFrameMarkers.length; i++)
    {
        if(this.mAllKeyFrameMarkers[i].mAnimation ===  animation)
            this.mCurrentKeyFrameMarkers.push(this.mAllKeyFrameMarkers[i]);   
    }
};
AnimationEditor.prototype.updateDisplayAnimation = function(animation, editor)
{
    animation.playAnimation(parseFloat(this.mCurrentTimeEditor.getValue()), true);
    editor.mEvents.sceneGraphChanged.dispatch();
};
AnimationEditor.prototype.updateDisplayCursors = function(animation)
{
    this.updateCurrentKeyFrames(animation);
    this.mCursorArea.clean();
    this.mCursorArea.add(this.mCursorPrincipal);
    for(var i = 0; i < this.mCurrentKeyFrameMarkers.length; i++)
    {
       this.mCursorArea.add(this.mCurrentKeyFrameMarkers[i].getCursor());    
    }
};
AnimationEditor.prototype.clearByObject = function(object)
{
    var animation_tmp = ANIMATIONMGR.getAnimationSelectedByObject(object);
    var indexArray = new Array();
    for(var i = 0; i < this.mAllKeyFrameMarkers.length; i++)
    {
        if(animation_tmp === this.mAllKeyFrameMarkers[i].mAnimation)
        {
            this.mAllKeyFrameMarkers.splice(i,1);
            i--;
        }
            
    }
    for(var i = 0; i < ANIMATIONMGR.mAnimationList.length; i++)
    {
        if(animation_tmp === ANIMATIONMGR.mAnimationList[i])
        {
            ANIMATIONMGR.mAnimationList.splice(i,1);
            break;
        }      
    }
    
};
AnimationEditor.prototype.clear = function()
{
    this.mAllKeyFrameMarkers.splice(0,this.mAllKeyFrameMarkers.length);
    this.mCurrentKeyFrameMarkers.splice(0,this.mCurrentKeyFrameMarkers.length);
    this.mCursorArea.clean();
    this.mPlayButton.setTextContent('>');
};


ANIMATIONEDITOR = new AnimationEditor();