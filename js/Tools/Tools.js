function check(variable) {
    'use strict';
	return !(variable === undefined || variable === null);
}

String.prototype.replaceArrayWithContent = function(find, balise, className) {
    'use strict';
    var context = this, regex, replace;
    for (var i = 0; i < find.length; i++)
    {
        regex = new RegExp("\\b" + find[i] + "\\b", 'g');
        if (check(balise))
        {
            replace = '<' + balise + ' class="' + className + '">' + find[i] + '</' + balise + '>';
            context = context.replace(regex, replace);
        }
    }
    
    return context;
}

function ZeroBeforeString(str, max) {
    str = str.toString();
    return str.length < max ? ZeroBeforeString("0" + str, max) : str;    
}

function exportString(content, filename) {
    
    var blob = new Blob([content], {type: 'text/plain'});
    var objectURL = URL.createObjectURL(blob);
    
    var link = document.createElement('a');
    link.href = objectURL;
    link.download = filename || 'data.json';
    link.target = '_blank';
    link.click();
    
}