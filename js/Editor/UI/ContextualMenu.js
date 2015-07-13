var ContextualMenu = function(editor) {

    var events = editor.mEvents;
    
    var container = new UIContextualMenu();    
    container.addClass('ContextualMenu');
    container.setVisible(false);
    
    // DETACH
    var optionD = new UIPanel();
    optionD.setTextContent('Detach');
    
    optionD.click(function() {
        
        alert('DETACH');
        
    });
    
    container.addMenuItem(optionD);
    
    var optionR = new UIPanel();
    optionR.setTextContent('Detach children');
    
    optionR.click(function() {
        
        alert('DETACH CHILDREN');
        
    });
    
    container.addMenuItem(optionR);
    
    
    events.rightClick.add(function(visible, x, y) {
       
        // Afficher le container
        container.setVisible(visible);
        
        // Le placer correctement
        container.setStyle({
            'top': y - 31 + 'px',
            'left': x - 61 + 'px'            
        });
        
        // Update les paramètres à afficher
        build();
        
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