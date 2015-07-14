RightSidebar.Scene = function(editor) {
    'use strict';
    
    var context = this;
    
    var events = editor.mEvents;
    
    var container = new UIHidingPanel('SCENE');
    var content = new UIPanel();
    content.addClass('graphPanel');
    container.add(content);
    
    var tree = new UITree(editor);
    tree.change(function() {
        
        editor.selectObjectById(parseInt(tree.getValue()));
        
    }); 
    content.add(tree);
    
    var refreshUI = function() {
           
        var scene = editor.mScene;
        
        var options = [];
    
        options.push(
            {
                value: scene.id,
                html: '<span style="font-size:12px;margin-left:5px;">' + scene.name + '</span>'
            }
        );
    
        (function addObjects(objects, pad){
            
            for (var i = 0; i < objects.length; i++) {
                
                var object = objects[i];
                if(object instanceof THREE.BoundingBoxHelper)
                    continue;
                
                var content = pad + '<span style="font-size:12px;">' + object.name + '</span>';
                
                options.push(
                    {
                        value: object.id,
                        html: content
                    }
                );
                
                addObjects(object.children, pad + '&nbsp;&nbsp;&nbsp;');
            }
        
        
        })(scene.children, '&nbsp;&nbsp;&nbsp;')
    
        tree.setOptions(options);
        
        if (check(editor.mEditObject)) {
         
            tree.setValue(editor.mEditObject.id);
            
        }
        
    };
    
    refreshUI();
    
    // Events
    events.sceneGraphChanged.add(refreshUI);
    
    events.objectSelected.add(function(object) {
      
        tree.setValue(check(object) ? object.id : null);
        
    });
    
    events.sceneModeChanged.add(function() {
       
        if (editor.mEditMode === EditMode.SCENE) {
         
            container.setVisible(true); 
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
         
            container.setVisible(false);
            
        }
        
    });
    
    return container;    
};