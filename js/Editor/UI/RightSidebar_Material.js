var RightSidebar_Material = function(editor) {
    'use strict';
    
    var events = editor.mEvents;
    
    var materialClasses = {

		// 'LineBasicMaterial': THREE.LineBasicMaterial,
		// 'LineDashedMaterial': THREE.LineDashedMaterial,
		'MeshBasicMaterial': THREE.MeshBasicMaterial,
		'MeshDepthMaterial': THREE.MeshDepthMaterial,
		// 'MeshFaceMaterial': THREE.MeshFaceMaterial,
		// 'MeshLambertMaterial': THREE.MeshLambertMaterial,
		'MeshNormalMaterial': THREE.MeshNormalMaterial,
		'MeshPhongMaterial': THREE.MeshPhongMaterial,
		// 'PointCloudMaterial': THREE.PointCloudMaterial,
		// 'ShaderMaterial': THREE.ShaderMaterial,
		// 'SpriteMaterial': THREE.SpriteMaterial,
        // 'SpriteCanvasMaterial': THREE.SpriteCanvasMaterial,
		// 'Material': THREE.Material

	};
    
    var options = {};
    for (var i in materialClasses)
        options[i] = i;    
    
    var container = new UIHidingPanel('MATERIAL');
    container.setVisible(false);
    
    // MATERIAL TYPE
    var materialClassPanel = new UIPanel();
    var materialClass = new UISelect().setOptions(options).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    materialClassPanel.add(new UIText('Material type').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialClassPanel.add(materialClass);
    
    container.add(materialClassPanel);
    
    // COLOR
    var materialColorPanel = new UIPanel();
    var materialColor = new UIColor().setStyle({"width": "200px", "margin": "0px 5px", "border": "none", "padding": "2px"}).change(update);
    
    materialColorPanel.add(new UIText('Color').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialColorPanel.add(materialColor);
    
    container.add(materialColorPanel);
    
    // EMISSIVE
    var materialEmissivePanel = new UIPanel();
    var materialEmissive = new UIColor().setHexaValue(0x000000).setStyle({"width": "200px", "margin": "0px 5px", "border": "none", "padding": "2px"}).change(update);
    
    materialEmissivePanel.add(new UIText('Emissive').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialEmissivePanel.add(materialEmissive);
    
    container.add(materialEmissivePanel);
    
    // SPECULAR
    var materialSpecularPanel = new UIPanel();
    var materialSpecular = new UIColor().setHexaValue(0x111111).setStyle({"width": "200px", "margin": "0px 5px", "border": "none", "padding": "2px"}).change(update);
    
    materialSpecularPanel.add(new UIText('Specular').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialSpecularPanel.add(materialSpecular);
    
    container.add(materialSpecularPanel);
    
    // SHININESS
    var materialShininessPanel = new UIPanel();
    var materialShininess = new UINumber(30, 0.5).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    materialShininessPanel.add(new UIText('Shininess').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialShininessPanel.add(materialShininess);   
    
    container.add(materialShininessPanel);
    
    // VERTEX SHADER
    var materialVertexShaderPanel = new UIPanel();
    var materialVertexShader = new UIButton('Edit');
    
    materialVertexShaderPanel.add(new UIText('Vertex Shader').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialVertexShaderPanel.add(materialVertexShader);
    
    container.add(materialVertexShaderPanel);
    
    // SIDE
    var materialSidePanel = new UIPanel();
    var materialSide = new UISelect().setOptions({
        0: 'Front',
        1: 'Back',
        2: 'Double'
        
    }).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    materialSidePanel.add(new UIText('Side').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialSidePanel.add(materialSide);
    
    container.add(materialSidePanel);
    
    // SHADING
    var materialShadingPanel = new UIPanel();
    var materialShading = new UISelect().setOptions({
        0: 'No',
        1: 'Flat',
        2: 'Smooth'
        
    }).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    materialShadingPanel.add(new UIText('Shading').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialShadingPanel.add(materialShading);
    
    container.add(materialShadingPanel);
    
    // BLENDING
    var materialBlendingPanel = new UIPanel();
    var materialBlending = new UISelect().setOptions({
        0: 'No',
        1: 'Normal',
        2: 'Additive',
        3: 'Substractive',
        4: 'Multiply'
        
    }).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    materialBlendingPanel.add(new UIText('Blending').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialBlendingPanel.add(materialBlending);
    
    container.add(materialBlendingPanel);
    
    // WIREFRAME
    var materialWireframePanel = new UIPanel();
    var materialWireframe = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_wireframeLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    
    materialWireframePanel.add(new UIText('Wireframe').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialWireframePanel.add(materialWireframe);
    
    container.add(materialWireframePanel);
    
    function update()
    {        
        var object = editor.mEditObject;
        
        var geometry = object.geometry;
        var material = object.material;
        
        if (check(material)) {
            
            // Change material
            if (material instanceof materialClasses[materialClass.getValue()] === false) {
                
                material = new materialClasses[materialClass.getValue()]();
                object.material = material;
                
            }
            
            if (check(material.color)) {                
                
                material.color.setHex(materialColor.getHexaValue());
                
            }
            
            if (check(material.emissive)) {
                
                material.emissive.setHex(materialEmissive.getHexaValue());   
                
            }
            
            if (check(material.specular)) {
                
                material.specular.setHex(materialSpecular.getHexaValue());
                
            }
            
            if (check(material.shininess)) {
                
                material.shininess = materialShininess.getValue();
                
            }
            
            if (check(material.side)) {
                
                material.side = parseInt(materialSide.getValue());                
                
            }
            
            if (check(material.shading)) {
                
                material.shading = parseInt(materialShading.getValue());
                
            }
            
            if (check(material.blending)) {
             
                material.blending = parseInt(materialBlending.getValue());
                
            }
            
            if (check(material.wireframe)) {
                
                material.wireframe = materialWireframe.getValue();
                
            }
            
            updateParameters();
            
            events.materialChanged.dispatch(material);            
            
        }
        
    }
    
     function updateParameters() {
         
        var properties = {
			'color': materialColorPanel,
			'emissive': materialEmissivePanel,
			'specular': materialSpecularPanel,
			'shininess': materialShininessPanel,
			'side': materialSidePanel,
			'shading': materialShadingPanel,
            'blending': materialBlendingPanel,
            'wireframe': materialWireframePanel
		};
         
        var material = editor.mEditObject.material;

		for ( var property in properties ) {

			properties[ property ].setVisible(check(material[ property ]));

		}
        
    }
    
    
    function build() {
        
        var object = editor.mEditObject;

		if ( check(object) && object.material && editor.mEditMode == EditMode.OBJECT ) {
            
            container.setVisible(true);
            
            var material = object.material;
            
            materialClass.setValue(material.type);
            
            if (check(material.color)) {
             
                materialColor.setHexaValue(material.color.getHexString());
                
            }
            
            if (check(material.emissive)) {
                
                materialEmissive.setHexaValue(material.emissive.getHexString());   
                
            }
            
            if (check(material.specular)) {
                
                materialSpecular.setHexaValue(material.specular.getHexString());
                
            }
            
            if (check(material.shininess)) {
                
                materialShininess.setValue(material.shininess);
                
            }
            
            if (check(material.side)) {
                
                materialSide.setValue( material.side );
                
            }
            
            if (check(material.shading)) {
                
                materialShading.setValue( material.shading );
                
            }
            
            if (check(material.blending)) {
             
                materialBlending.setValue( material.blending );
                
            }
            
            if (check(material.wireframe)) {
                
                materialWireframe.setValue( material.wireframe );
                
            }
            
            updateParameters();
        
        } else {
         
            container.setVisible(false);
            
        }
        
    };
    
    events.sceneModeChanged.add(build);
    
    return container;    
};