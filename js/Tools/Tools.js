function check(variable) {
    'use strict';
	return !(variable === undefined || variable === null);
}

function getMousePositionInDOM(dom, x, y) {
    'use strict';
    var rect = dom.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
}

String.prototype.replaceArrayWithContent = function(find, balise, className)
{
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