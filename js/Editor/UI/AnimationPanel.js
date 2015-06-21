var editorCursor;
var editorTimeText;
var buttonPlay;
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
    editorCursor = new UIPanel();
    editorCursor.addClass('AnimationEditorCursorPrincipal');
    editorPanelAreaScroll.add(editorCursor);
    editorPanelAreaScroll.click(function(e) {
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        var x = e.offsetX;
        editorCursor.setStyle({'left':x+'px'});
        
        var currentTime = getTimeWithPos(x, editorPanelAreaScroll.mDOM.offsetWidth, ANIMATIONMGR.mEnd);
        editorTimeText.setValue(currentTime);
        
    });
    
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
    var timeValueAnimation = new UINumber(0.0, 1.0).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).keyup(setTimeEditorAnimation);
    editorTimeText = timeValueAnimation;
    toolPanelButtons.add(timeValueAnimation);
    
    toolPanelButtons.add(new UIText('Duration').setStyle({"width": "50px", "display": "inline-block", "font-size": "12px"}));
    var durationValueAnimation = new UINumber(10.0, 1.0).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).change(updateDurationEditorAnimation);
    toolPanelButtons.add(durationValueAnimation);
    
   
    buttonPlay = new UIButton(">");
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
    
    var buttonLoop = (new UIButton('L')).addClass('sideBar_btn_small');
    buttonLoop.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;

        ANIMATIONMGR.setType(TYPE.LOOP);
    });
    toolPanelButtons.add(buttonLoop);
    
    var buttonAddKey = (new UIButton('+')).addClass('sideBar_btn_small');
    buttonAddKey.click(function() {
        if(editor.mEditMode == EditMode.OBJECT)
            return;
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        
        var currentTime = getTimeWithPos(editorCursor.mDOM.offsetLeft, editorPanelAreaScroll.mDOM.offsetWidth, ANIMATIONMGR.mEnd);
        var currentObject = editor.mEditObject;
        debugger;
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
            ANIMATIONMGR.addKeyAnimation(currentTime);
            var cursorKey = new UIPanel();
            cursorKey.addClass('AnimationEditorCursor');
            editorPanelAreaScroll.add(cursorKey);
            var x = editorCursor.mDOM.offsetLeft;
            var height = editorCursor.mDOM.offsetHeight;
            cursorKey.setStyle({'left':x+'px', 'height':height+'px'});
        }
    });
    toolPanelButtons.add(buttonAddKey);
    
    function setTimeEditorAnimation(e)
    {
        if(ANIMATIONMGR.getState() == STATE.PLAY || ANIMATIONMGR.getState() == STATE.PAUSE)
            return;
        if(e.keyCode == 13)
        {
            var currentTime = parseFloat(timeValueAnimation.getValue());
            if(currentTime > ANIMATIONMGR.mEnd)
                return;
            setPosWithTime(currentTime, ANIMATIONMGR.mEnd);
        }
    }
    function updateDurationEditorAnimation()
    {
        ANIMATIONMGR.mEnd = parseFloat(durationValueAnimation.getValue());
    }
    
    return container;  
};

function getTimeWithPos(pos, widthMax, timeMax)
{
    return (pos/widthMax) * timeMax;
}
function setPosWithTime(currentTime, timeMax)
{
    var widthMax = $('.AnimationEditorAreaScroll')[0].offsetWidth;
    var pos = (currentTime / timeMax) * widthMax;
    editorCursor.setStyle({'left':pos+'px'});
}
function updateTimeEditorAnimation(currentTime)
{
    editorTimeText.setValue(currentTime);
}