/**************************************************

**************************************************/
var UITexture = function ()
{
	UIElement.call(this);
    
    var context = this;
    
    var dom = document.createElement('span');
    
    var input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', function(e) {
    
        loadFile(e.target.files[0]);
        
    });
    
    var canvas = document.createElement( 'canvas' );
	canvas.width = 32;
	canvas.height = 16;
	canvas.style.cursor = 'pointer';
	canvas.style.marginRight = '5px';
	canvas.style.border = '1px solid #888';
	canvas.addEventListener( 'click', function ( event ) {

		input.click();

	}, false );
	canvas.addEventListener( 'drop', function ( event ) {

		event.preventDefault();
		event.stopPropagation();
		loadFile( event.dataTransfer.files[ 0 ] );

	}, false );
	dom.appendChild( canvas );
    
    var name = document.createElement('input');
    name.disabled = true;
    name.style.width = '133px';
	name.style.border = '1px solid #ccc';
    dom.appendChild(name);
    
    var loadFile = function(file) {
        
        if (file.type.match('image.*') ) {
         
            var reader = new FileReader();
            reader.addEventListener('load', function(e) {
                
                var image = document.createElement('img');
                image.addEventListener('load', function(e) {
                    
                    var texture = new THREE.Texture(this);
                    texture.sourceFile = file.name;
                    texture.needsUpdate = true;
                    
                    context.setValue(texture);
                    
                    if (check(context.mOnChange))
                        context.mOnChange();
                    
                    
                }, false);
                
                image.src = e.target.result;
                
                
            }, false);
            
            reader.readAsDataURL(file);
            
            
            
        }
        
        
    }   
    
    this.mDOM = dom;
    this.mTexture = null;
    this.mOnChange = null;
    
    return this;    
}
UITexture.prototype = Object.create(UIElement.prototype);

UITexture.prototype.getValue = function() {
    
    return this.mTexture;
    
};

UITexture.prototype.setValue = function(texture) {
  
    var name = this.mDOM.children[1];
    
    if (check(texture)) {
        
        var image = texture.image;
        
        if (check(image) && image.width > 0) {
            
            name.value = texture.sourceFile;   
            
        } else {
        
            name.value = 'Error with ' + texture.sourceFile;
            
        }
        
    } else {
     
        name.value = '';
        
    }
    
    this.mTexture = texture;
    
};


UITexture.prototype.onChange = function(callback) {
  
    this.mOnChange = callback;
    
    return this;
    
};