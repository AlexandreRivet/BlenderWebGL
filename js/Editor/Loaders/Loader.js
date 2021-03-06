var Loader = function(editor)
{
    var events = editor.mEvents;
    
    this.loadFile = function(file)
    {
        var filename = file.name;
        var elements = filename.split('.');
        var extension = elements.pop().toLowerCase();
        var objectName = elements.join('');
        
        switch(extension)
        {
            case 'obj':
                
                var reader = new FileReader();
                reader.addEventListener('load', function(e) {
                    
                    var result = e.target.result;
                    var object = new OBJ().parse(result);
                    object.name = objectName;
                    
                    editor.addObject(object);
                    editor.selectObject(object);
                    
                });
                reader.readAsText(file);
                
                break;
                
            case 'json':
                
                var reader = new FileReader();
                reader.addEventListener('load', function(e) {
                    
                    var result = e.target.result;
                    var data;
                    
                    try {
                     
                        data = JSON.parse(result);
                        
                    } catch(error) {
                     
                        alert("Can't parse your file.");
                        return;
                        
                    }
                    
                    var scene = new THREE.ObjectLoader().parse(data);
                    editor.setScene(scene);
                    
                    var animations = data.animations;
                    if (check(animations))
                        ANIMATIONMGR.fromJSON(animations);
                    
                });
                reader.readAsText(file);
                
                break;
                
        }
    };
    
    return this;
};