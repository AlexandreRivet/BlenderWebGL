var AnimationPanel = function(editor) {
    'use strict';
    
    //Emplacement Principal
    var container = new UIPanel();
    container.addClass('bottomPanel');
    
    //Panel d'Edition
    var editorPanel = new UIPanel();
    editorPanel.addClass('AnimationEditor');
    container.add(editorPanel);
    
    //Panel des outils
    var toolPanel = new UIPanel();
    toolPanel.addClass('AnimationEditorTool');
    editorPanel.add(toolPanel);
    
    
    //Panel grille KeyFrame
    var editorPanelArea = new UIPanel();
    editorPanelArea.addClass('AnimationEditorArea');
    editorPanel.add(editorPanelArea);
    var editorPanelAreaScroll = new UIPanel();
    editorPanelAreaScroll.addClass('AnimationEditorAreaScroll');
    editorPanelAreaScroll.mousewheel(function(e) {
        return;
        var delta = e.wheelDelta;
        var width = editorPanelAreaScroll.mDOM.offsetWidth + delta;
        editorPanelAreaScroll.setStyle({"width":width});
    });
    editorPanelArea.add(editorPanelAreaScroll);
    
    //Cursor Animation
    var editorCursor = new UIPanel();
    editorCursor.addClass('AnimationEditorCursorPrincipal');
    editorPanelAreaScroll.add(editorCursor);
    editorPanelAreaScroll.click(function(e) {
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        var x = e.offsetX;
        editorCursor.setStyle({'left':x+'px'});
        
        ANIMATIONEDITOR.unselectCursor(ANIMATIONEDITOR.mCursorSelected);
        ANIMATIONEDITOR.mCursorSelected = null;
        
        var currentTime = getTimeWithPos(x, editorPanelAreaScroll.mDOM.offsetWidth, ANIMATIONMGR.mEnd);
        ANIMATIONEDITOR.getCurrentTimeEditor().setValue(currentTime);
        if(check(ANIMATIONMGR.mAnimationSelected))
        {
            ANIMATIONEDITOR.updateDisplayAnimation(ANIMATIONMGR.mAnimationSelected, editor);
            editor.mEvents.objectChanged.dispatch(ANIMATIONMGR.mAnimationSelected.mObject);
        }
        
    });
    ANIMATIONEDITOR.setCursorPrincipal(editorCursor);
    //Panel du Titre
    var toolPanelTitle = new UIPanel();
    toolPanelTitle.addClass('AnimationEditorToolTitle');
    toolPanel.add(toolPanelTitle);
    var toolTitle = new UIText("ANIMATION");
    toolTitle.addClass('AnimationEditorToolTitleText');
    toolPanelTitle.add(toolTitle);
    
    //Panel des bouttons
    var toolPanelButtons = new UIPanel();
    toolPanelButtons.addClass('AnimationEditorToolButtons');
    toolPanel.add(toolPanelButtons);
    
    
    toolPanelButtons.add(new UIText('Time').setStyle({"width": "40px", "display": "inline-block", "font-size": "12px"}));
    var timeValueAnimation = new UINumber(0.0, 0.1).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).keyup(setTimeEditorAnimation);
    ANIMATIONEDITOR.setCurrentTimeEditor(timeValueAnimation);
    toolPanelButtons.add(timeValueAnimation);
    
    toolPanelButtons.add(new UIText('Duration').setStyle({"width": "50px", "display": "inline-block", "font-size": "12px"}));
    var durationValueAnimation = new UINumber(10.0, 0.1).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).change(updateDurationEditorAnimation);
    toolPanelButtons.add(durationValueAnimation);
    
   
    var buttonPlay = new UIButton(">");
    buttonPlay.addClass('sideBar_btn_small');
    buttonPlay.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;
        
        if(buttonPlay.getTextContent() == '>')
        {
            editor.deselectObject();
            buttonPlay.setTextContent('||');
            var lastState = ANIMATIONMGR.mState;
            ANIMATIONMGR.play();
            if( lastState == STATE.STOP)
                editor.mEvents.animatorLaunched.dispatch();

        }
        else
        {
            buttonPlay.setTextContent('>');
            ANIMATIONMGR.pause();
        }
           
    });
    toolPanelButtons.add(buttonPlay);
    ANIMATIONEDITOR.setPlayButton(buttonPlay);
    
    var buttonStop = (new UIButton('[]')).addClass('sideBar_btn_small');
    buttonStop.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;
        
        ANIMATIONMGR.stop();
        buttonPlay.setTextContent('>');
    });
    toolPanelButtons.add(buttonStop);
    
    var buttonLowSpeed = (new UIButton('<<')).addClass('sideBar_btn_small');
    buttonLowSpeed.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;

        var speed_tmp = ANIMATIONMGR.getSpeed();
        if(speed_tmp == 0.125)
            return;
        ANIMATIONMGR.setSpeed(speed_tmp/2);
    });
    toolPanelButtons.add(buttonLowSpeed);
    
    var buttonHighSpeed = (new UIButton('>>')).addClass('sideBar_btn_small');
    buttonHighSpeed.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;

        var speed_tmp = ANIMATIONMGR.getSpeed();
        if(speed_tmp == 8)
            return;
        ANIMATIONMGR.setSpeed(ANIMATIONMGR.getSpeed()*2);
    });
    toolPanelButtons.add(buttonHighSpeed);
    
    /*var buttonLoop = (new UIButton('L')).addClass('sideBar_btn_small');
    buttonLoop.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;

        ANIMATIONMGR.setType(TYPE.LOOP);
    });
    toolPanelButtons.add(buttonLoop);*/
    
    var buttonAddKey = (new UIButton('+')).addClass('sideBar_btn_small');
    buttonAddKey.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        
        var currentTime = getTimeWithPos(editorCursor.mDOM.offsetLeft, editorPanelAreaScroll.mDOM.offsetWidth, ANIMATIONMGR.mEnd);
        var currentObject = editor.mEditObject;
        
        if(check(currentObject))
        {
            var currentAnimationSelected = ANIMATIONMGR.getAnimationSelected();
            var currentAnimation = ANIMATIONMGR.getAnimationSelectedByObject(currentObject);
            if(!check(currentAnimationSelected) || currentAnimationSelected != currentAnimation)
            {
                if(!check(currentAnimation))
                {
                    currentAnimation = new Animation(currentObject,currentTime);
                    ANIMATIONMGR.addAnimation(currentAnimation);
                }
               ANIMATIONMGR.setAnimationSelected(currentAnimation);     
            }
            var state = ANIMATIONMGR.addKeyAnimationByTime(currentTime);
            if(!state)
                return;
            var cursorKey = new UIPanel();
            cursorKey.addClass('AnimationEditorCursor');
            editorPanelAreaScroll.add(cursorKey);
            var x = editorCursor.mDOM.offsetLeft;
            var height = editorCursor.mDOM.offsetHeight;
            cursorKey.setStyle({'left':x+'px', 'height':height+'px'});
            cursorKey.click(function(e) {
                if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
                    return;
                
                e.stopPropagation();
                ANIMATIONEDITOR.mCursorSelected = cursorKey;
                ANIMATIONEDITOR.selectCursor(cursorKey);
                
                //Place le cursor principal sur le curseur secondaire
                
                var x = ANIMATIONEDITOR.mCursorSelected.mDOM.offsetLeft;
                ANIMATIONEDITOR.getCursorPrincipal().setStyle({'left': x + 'px'});
        
                var currentTime = getTimeWithPos(x, ANIMATIONEDITOR.mCursorArea.mDOM.offsetWidth, ANIMATIONMGR.mEnd);
                ANIMATIONEDITOR.getCurrentTimeEditor().setValue(currentTime);
                if(check(ANIMATIONMGR.mAnimationSelected))
                {
                    ANIMATIONEDITOR.updateDisplayAnimation(ANIMATIONMGR.mAnimationSelected, editor);
                }
                
            });
            ANIMATIONEDITOR.addKeyFrameAll(new KeyFrameMarker(cursorKey, currentAnimation.getKey(currentTime) ,currentTime, currentAnimation));
            ANIMATIONEDITOR.updateCurrentKeyFrames(currentAnimation);
        }
    });
    toolPanelButtons.add(buttonAddKey);
    
    var buttonRemoveKey = (new UIButton('-')).addClass('sideBar_btn_small');
    buttonRemoveKey.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        ANIMATIONEDITOR.removeKeyframeMarkerSelected();
        if(check(ANIMATIONMGR.mAnimationSelected))
        {
            ANIMATIONEDITOR.updateDisplayAnimation(ANIMATIONMGR.mAnimationSelected, editor);
        }
    });
    toolPanelButtons.add(buttonRemoveKey);
    
    function setTimeEditorAnimation(e)
    {
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        if(e.keyCode == 13)
        {
            var currentTime = parseFloat(timeValueAnimation.getValue());
            if(currentTime > ANIMATIONMGR.mEnd)
                return;
            ANIMATIONEDITOR.setPosWithTime(ANIMATIONEDITOR.mCursorPrincipal, currentTime, ANIMATIONMGR.mEnd);
        }
    }
    function updateDurationEditorAnimation()
    {
        ANIMATIONMGR.mEnd = parseFloat(durationValueAnimation.getValue());
        ANIMATIONEDITOR.updatePositionCursors();
    }
    
    ANIMATIONEDITOR.mCursorArea = editorPanelAreaScroll;
    return container;  
};

function getTimeWithPos(pos, widthMax, timeMax)
{
    return (pos/widthMax) * timeMax;
}