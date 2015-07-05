var RightSidebar_Material = function(editor) {
    'use strict';
    
    var events = editor.mEvents;
    
    var materialClasses = {

		'LineBasicMaterial': THREE.LineBasicMaterial,
		'LineDashedMaterial': THREE.LineDashedMaterial,
		'MeshBasicMaterial': THREE.MeshBasicMaterial,
		'MeshDepthMaterial': THREE.MeshDepthMaterial,
		// 'MeshFaceMaterial': THREE.MeshFaceMaterial,
		// 'MeshLambertMaterial': THREE.MeshLambertMaterial,
		'MeshNormalMaterial': THREE.MeshNormalMaterial,
		'MeshPhongMaterial': THREE.MeshPhongMaterial,
		// 'PointCloudMaterial': THREE.PointCloudMaterial,
		'ShaderMaterial': THREE.ShaderMaterial,
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
    var materialVertexShader = new UIButton('Edit').setStyle({"width": "200px", "margin": "0px 5px", "border": "none", "padding": "2px"});
	materialVertexShader.click(function() {
	
		events.shaderEdited.dispatch(editor.mEditObject, "vs");
	
	});
    
    materialVertexShaderPanel.add(new UIText('Vertex Shader').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialVertexShaderPanel.add(materialVertexShader);
    
    container.add(materialVertexShaderPanel);
    
    // FRAGMENT SHADER
    var materialFragmentShaderPanel = new UIPanel();
    var materialFragmentShader = new UIButton('Edit').setStyle({"width": "200px", "margin": "0px 5px", "border": "none", "padding": "2px"});
	materialFragmentShader.click(function() {
	
		events.shaderEdited.dispatch(editor.mEditObject, "fs");
	
	});
    
    materialFragmentShaderPanel.add(new UIText('Fragment Shader').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialFragmentShaderPanel.add(materialFragmentShader);
    
    container.add(materialFragmentShaderPanel);
    
    // MAP
    var materialMapPanel = new UIPanel();
    var materialMapEnabled = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_MapEnabledLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    var materialMap = new UITexture().setStyle({"margin": "0px 5px"}).onChange(update);
    
    materialMapPanel.add(new UIText('Map').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialMapPanel.add(materialMapEnabled);
    materialMapPanel.add(materialMap);
    
    container.add(materialMapPanel);

    // BUMPMAP
    var materialBumpMapPanel = new UIPanel();
    var materialBumpMapEnabled = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_BumpMapEnabledLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    var materialBumpMap = new UITexture().setStyle({"margin": "0px 5px"}).onChange(update);
    
    materialBumpMapPanel.add(new UIText('Bump Map').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialBumpMapPanel.add(materialBumpMapEnabled);
    materialBumpMapPanel.add(materialBumpMap);
    
    container.add(materialBumpMapPanel);
    
    // NORMALMAP
    var materialNormalMapPanel = new UIPanel();
    var materialNormalMapEnabled = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_NormalMapEnabledLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    var materialNormalMap = new UITexture().setStyle({"margin": "0px 5px"}).onChange(update);
    
    materialNormalMapPanel.add(new UIText('Normal Map').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialNormalMapPanel.add(materialNormalMapEnabled);
    materialNormalMapPanel.add(materialNormalMap);
    
    container.add(materialNormalMapPanel);
    
    // SPECULARMAP
    var materialSpecularMapPanel = new UIPanel();
    var materialSpecularMapEnabled = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_SpecularMapEnabledLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    var materialSpecularMap = new UITexture().setStyle({"margin": "0px 5px"}).onChange(update);
    
    materialSpecularMapPanel.add(new UIText('Specular Map').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialSpecularMapPanel.add(materialSpecularMapEnabled);
    materialSpecularMapPanel.add(materialSpecularMap);
    
    container.add(materialSpecularMapPanel);
    
    // ENVMAP
    var materialEnvMapPanel = new UIPanel();
    var materialEnvMapEnabled = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_EnvMapEnabledLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    var materialEnvMap = new UITexture().setStyle({"margin": "0px 5px"}).onChange(update);
    
    materialEnvMapPanel.add(new UIText('Env Map').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialEnvMapPanel.add(materialEnvMapEnabled);
    materialEnvMapPanel.add(materialEnvMap);
    
    container.add(materialEnvMapPanel);
    
    
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
    
    // TRANSPARENT
    var materialTransparentPanel = new UIPanel();
    var materialTransparent = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_transparentLink').setStyle({"border": "none", "vertical-align": "middle", "margin-left": "5px"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    
    materialTransparentPanel.add(new UIText('Transparent').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialTransparentPanel.add(materialTransparent);
    
    container.add(materialTransparentPanel);
    
    // OPACITY
    var materialOpacityPanel = new UIPanel();
    var materialOpacity = new UINumber(1, 0.05).setRange(0, 1).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    materialOpacityPanel.add(new UIText('Opacity').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    materialOpacityPanel.add(materialOpacity);   
    
    container.add(materialOpacityPanel);
    
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
        
		var textureWarning = false;
		var objectHasUvs = false;

		if ( object instanceof THREE.Sprite ) objectHasUvs = true;
		if ( geometry instanceof THREE.Geometry && geometry.faceVertexUvs[ 0 ].length > 0 ) objectHasUvs = true;
		if ( geometry instanceof THREE.BufferGeometry && geometry.attributes.uv !== undefined ) objectHasUvs = true;        
        
        if (check(material)) {
            
            // Change material
            if (material instanceof materialClasses[materialClass.getValue()] === false) {
                
                material = new materialClasses[materialClass.getValue()]();
                if (check(material.vertexColors))
                    material.vertexColors = THREE.FaceColors;
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
            
            if (material.map !== undefined) {
             
                var mapEnabled = materialMapEnabled.getValue();
                
                if ( objectHasUvs ) {
                 
                    material.map = mapEnabled ? materialMap.getValue() : null;
                    material.needsUpdate = true;
                    
                } else {
                 
                    if (mapEnabled) textureWarning = true;
                
                }
                
            }
            
            if (material.bumpMap !== undefined) {
             
                var bumpMapEnabled = materialBumpMapEnabled.getValue();
                
                if ( objectHasUvs ) {
                 
                    material.bumpMap = bumpMapEnabled ? materialBumpMap.getValue() : null;
                    material.needsUpdate = true;
                    
                } else {
                 
                    if (bumpMapEnabled) textureWarning = true;
                
                }
                
            }
            
            if (material.normalMap !== undefined) {
             
                var normalMapEnabled = materialMapEnabled.getValue();
                
                if ( objectHasUvs ) {
                 
                    material.normalMap = normalMapEnabled ? materialNormalMap.getValue() : null;
                    material.needsUpdate = true;
                    
                } else {
                 
                    if (normalMapEnabled) textureWarning = true;
                
                }
                
            }
            
            if (material.specularMap !== undefined) {
             
                var specularMapEnabled = materialSpecularMapEnabled.getValue();
                
                if ( objectHasUvs ) {
                 
                    material.specularMap = specularMapEnabled ? materialSpecularMap.getValue() : null;
                    material.needsUpdate = true;
                    
                } else {
                 
                    if (specularMapEnabled) textureWarning = true;
                
                }
                
            }
            
            if (material.envMap !== undefined) {
             
                var specularEnvMapEnabled = materialEnvMapEnabled.getValue();
                
                if ( objectHasUvs ) {
                 
                    material.envMap = specularEnvMapEnabled ? materialEnvMap.getValue() : null;
                    material.needsUpdate = true;
                    
                } else {
                 
                    if (specularEnvMapEnabled) textureWarning = true;
                
                }
                
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
            
            if (check(material.transparent)) {
                
                material.transparent = materialTransparent.getValue();
                
            }
            
            if (check(material.opacity)) {
                
                material.opacity = materialOpacity.getValue();
                
                
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
            'vertexShader': materialVertexShaderPanel,
            'fragmentShader': materialFragmentShaderPanel,
            'map': materialMapPanel,
			'bumpMap': materialBumpMapPanel,
			'normalMap': materialNormalMapPanel,
			'specularMap': materialSpecularMapPanel,
			'envMap': materialEnvMapPanel,
			'side': materialSidePanel,
			'shading': materialShadingPanel,
            'blending': materialBlendingPanel,
            'transparent': materialTransparentPanel,
            'opacity': materialOpacityPanel,
            'wireframe': materialWireframePanel
		};
         
        var material = editor.mEditObject.material;

		for ( var property in properties ) {

			properties[ property ].setVisible(material[ property ] !== undefined);

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
            
            if (material.map !== undefined) {
             
                materialMapEnabled.setValue(material.map !== null);
                materialMap.setValue(material.map);
                
            }
            
            if (material.bumpMap !== undefined) {
             
                materialBumpMapEnabled.setValue(material.bumpMap !== null);
                materialBumpMap.setValue(material.bumpMap);
                
            }
            
            if (material.normalMap !== undefined) {
             
                materialNormalMapEnabled.setValue(material.normalMap !== null);
                materialNormalMap.setValue(material.normalMap);
                
            }
            
            if (material.specularMap !== undefined) {
             
                materialSpecularMapEnabled.setValue(material.specularMap !== null);
                materialSpecularMap.setValue(material.specularMap);
                
            }
            
            if (material.envMap !== undefined) {
             
                materialEnvMapEnabled.setValue(material.envMap !== null);
                materialEnvMap.setValue(material.envMap);
                
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
            
            if (check(material.transparent)) {
                
                materialTransparent.setValue( material.transparent );
                
            }
            
            if (check(material.opacity)) {
                
                materialOpacity.setValue( material.opacity );
                
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