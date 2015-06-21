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
                
            case 'dae':
                
                break;
                
        }
    };
    
    return this;
};