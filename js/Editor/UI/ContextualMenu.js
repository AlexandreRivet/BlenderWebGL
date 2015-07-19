var ContextualMenu = function(editor) {

    var events = editor.mEvents;
    
    var container = new UIContextualMenu();    
    container.addClass('ContextualMenu');
    container.setVisible(false);
    
    // DETACH
    var optionD = new UIPanel();
    optionD.setTextContent('Detach');
    
    optionD.click(function() {
        
        var object = editor.mEditObject;
        
        if (check(object)) {
            
            if (check(object.parent)) {
                
                var newParentId = editor.mScene.id;
        
                if ( object.parent.id !== newParentId && object.id !== newParentId) {
                    
                    editor.moveObject(object, editor.mScene.getObjectById(newParentId)); 
                    
                }
                
            }
            
        }
        
        container.setVisible(false);
        
    });
    
    container.addMenuItem(optionD);
    
    var optionR = new UIPanel();
    optionR.setTextContent('Detach children');
    
    optionR.click(function() {
        
        var object = editor.mEditObject;
        
        if (check(object)) {
            
            var children = object.children;
            
            if (check(children) && children.length > 0) {
             
                var newParentId = editor.mScene.id;
                
                while (children.length > 0) {
                 
                    var child = children[0];
                    
                    if (child.parent.id !== newParentId && child.id !== newParentId) {
                        
                        editor.moveObject(child, editor.mScene.getObjectById(newParentId));
                            
                    }                    
                    
                }
                
            }
            
        }
        
        container.setVisible(false);
        
    });
    
    container.addMenuItem(optionR);
    
    
    events.rightClick.add(function(content, x, y) {
       
        // Afficher le container
        container.setVisible(true);
        
        var cmWidth = container.mMenuItems.mDOM.offsetWidth;
        var cmHeight = container.mMenuItems.mDOM.offsetHeight;

        var maxX = 61 + content.mDOM.offsetWidth - cmWidth;
        var maxY = 31 + content.mDOM.offsetHeight - cmHeight;
        
        if (x > maxX)
            x = maxX;
        
        if (y > maxY)
            y = maxY;
            
        // Le placer correctement
        container.setStyle({
            'top': y - 31 + 'px',
            'left': x - 61 + 'px'            
        });
        
        // Update les paramètres à afficher
        build();
        
    });
    
    events.leftClick.add(function(x, y) {
        
        // Pour prendre en compte la leftbar et la menubar
        x -= 61;
        y -= 31;
        
        var xmin = container.mDOM.offsetLeft; 
        var xmax = xmin + container.mMenuItems.mDOM.offsetWidth;
        var ymin = container.mDOM.offsetTop;
        var ymax = ymin + container.mMenuItems.mDOM.offsetHeight + 10; // lol c'est le padding

        if (!(x > xmin && x < xmax && y > ymin && y < ymax))  {
         
            container.setVisible(false);
            
        }
        
    });
    
    var build = function() {
      
        var object = editor.mEditObject;
        
        if (!check(object) || (check(object) && (object instanceof THREE.Scene) ) ) {
         
            container.setVisible(false);
            return;
            
        }
        
        var nbOptionsActive = 0;
        
        // Check if edit object has parent and it's not a scene
        if (check(object.parent) && !(object.parent instanceof THREE.Scene) ) {
        
            optionD.setVisible(true);
            nbOptionsActive++;
            
        } else {
         
            optionD.setVisible(false);
            
        }
        
        // Check if edit object has children
        if (check(object.children) && object.children.length > 0) {
        
            optionR.setVisible(true);
            nbOptionsActive++;
            
        } else {
         
            optionR.setVisible(false);
            
        }
        
        if (nbOptionsActive === 0)
            container.setVisible(false);
    };
    
    
    return container;
    
};