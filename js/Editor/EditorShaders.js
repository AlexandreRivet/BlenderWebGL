/*global UIPanel */


// Filters arrays
var TYPES = ["void", "bool", "int", "float", "vec2", "vec3", "vec4", "bvec2", "bvec3", "bvec4", "ivec2", "ivec3", "ivec4", "mat2", "mat3", "sampler2D", "samplerCube"];
var KEYWORDS = ["const", "attribute", "uniform", "varying", "highp", "mediump", "lowp", "in", "out", "inout", "return"];
// var OPERATORS = ["\*", "\+", "\-", "\/", "\%", "\+\+", "\-\-", "\=", "\=\=", "\!\=", "\<", "\>", "\<\=", "\>\="];
var FUNCTIONS_BASICS = ["radians", "degrees", "sin", "cos", "tan", "asin", "acos", "atan", "pow", "exp", "log", "exp2", "log2", "sqrt", "inversesqrt", "abs", "sign", "floor", "ceil", "fract",
                "mod", "min", "max", "clamp", "mix", "step", "smoothstep"];
var FUNCTIONS_ADVANCED = ["length", "distance", "dot", "cross", "normalize", "faceforward", "reflect", "refract", "matrixCompMult",
                "lassThan", "lessThanEqual", "greaterThan", "greaterThanEqual", "equal", "notEqual", "any", "all", "not", "texture2DLod", "texture2DProjLod", "textureCubeLod",
                "texture2D", "texture2DProj", "textureCube"];

var ShaderEditor = function (name) {
    'use strict';
    
    this.mName = name;
    
    this.mMainBlock = new UIPanel();
    this.mMainBlock.setClass('global_ShaderEditor');
    
    this.mTextArea = new UITextArea();
    this.mTextArea.setID(name + '_principal_ShaderEditor');
    this.mTextArea.setClass('code_ShaderEditor');
    
    this.mMirrorBlock = new UIPanel();
    this.mMirrorBlock.setID(name + '_mirror_ShaderEditor');
    this.mMirrorBlock.setClass('code_ShaderEditor');
    
    this.mMainBlock.add(this.mTextArea);
    this.mMainBlock.add(this.mMirrorBlock);
    
    this.mDOM = this.mMainBlock.mDOM;
};

ShaderEditor.prototype.init = function () {
    'use strict';
    var context = this;
    this.mTextArea.mDOM.addEventListener('keyup', function () { context.updateCode(); });
    this.mTextArea.mDOM.addEventListener('keydown', function () { context.updateCode(); });
};

ShaderEditor.prototype.updateScroll = function () {
    'use strict';
    this.mMirrorBlock.mDOM.scrollTop = this.mTextArea.mDOM.scrollTop;
    this.mMirrorBlock.mDOM.scrollLeft = this.mTextArea.mDOM.scrollLeft;
};

ShaderEditor.prototype.updateSize = function () {
    'use strict';
};

ShaderEditor.prototype.updateCode = function () {
    'use strict';
    var content, out;

    content = this.mTextArea.mDOM.value;
    content = content.replace(/(\")/g, '&quot;');                                                           // Change quote html
    content = content.replace(/(\/\*[\w\'\s\r\n\*]*\*\/)/g, '<span class="comments">$1</span>');            // Comments multilines
    content = content.replace(/(\/\/[\w\s\']*)/g, '<span class="comments">$1</span>');                      // Comments monoline
    content = content.replaceArrayWithContent(TYPES, 'span', 'types');                                      // Types
    content = content.replaceArrayWithContent(KEYWORDS, 'span', 'keywords');                                // Keywords 
    // content = content.replaceArrayWithContent(OPERATORS, 'span', 'operators');                           // Operators => TODO: correct this
    content = content.replaceArrayWithContent(FUNCTIONS_BASICS, 'span', 'f_advanced');                      // Basics functions
    content = content.replaceArrayWithContent(FUNCTIONS_ADVANCED, 'span', 'f_advanced');                    // Advanced functions
    content = content.replace(/(\d+(.\d+)?)/g, '<span class="numerics">$1</span>');                         // Numerics expressions (int or float)
    content = content.replace(/(\&quot;(.+?)\&quot;)/g, '<span class="quotes">$1</span>');                  // Quotes
    
    out = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.mMirrorBlock.mDOM.innerHTML = out + '<br />';
};





/*
function setMirrorScroll() {
    'use strict';
    document.getElementById('mirror').scrollTop  = document.getElementById('code').scrollTop;
    document.getElementById('mirror').scrollLeft = document.getElementById('code').scrollLeft;
}

function setMirrorSize() {
    'use strict';
    var textarea_elem   = document.getElementById('code');
    var textarea_width  = textarea_elem.clientWidth;
    var textarea_height = textarea_elem.clientHeight;
    var background_elem = document.getElementById('mirror');
    background_elem.style.width  = textarea_width + "px";
    background_elem.style.height = textarea_height + "px";
}
*/