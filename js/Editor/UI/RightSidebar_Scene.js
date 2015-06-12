RightSidebar.Scene = function(editor) {
    'use strict';
    
    var context = this;
    
    this.mEditor = editor;
    
    var container = new UIHidingPanel('SCENE');
    
    var tree = new UITree(editor);
    tree.change(function() {
       
        console.log(parseInt(tree.getValue()));
        
        // alert('TODO: tree changed');
        
        // editor.selectObjectById(parseInt(tree.getValue()));
        
    }); 
    container.add(tree);
    this.mTree = tree;
    
    this.refreshUI();
    
    var events = editor.mEvents;
    
    events.addFunctionToEvent('sceneGraphChanged', function() { context.refreshUI(); });
    
    return container;    
};

RightSidebar.Scene.prototype.refreshUI = function() {
    'use strict';
    
    debugger;
    
    var scene = this.mEditor.mPrincipalScene;
    
    var options = [];
    
    options.push(
        {
            value: scene.id,
            html: scene.name
        }
    );
    
    (function addObjects(objects, pad){
        
        for (var i = 0; i < objects.length; i++) {
         
            var object = objects[i];
            
            var content = pad + object.name;
            
            options.push(
                {
                    value: object.id,
                    html: content
                }
            );
            
            addObjects(object.children, pad + pad);
        }
        
        
    })(scene.children, '&nbsp;&nbsp;&nbsp;')
    
    this.mTree.setOptions(options);   
};