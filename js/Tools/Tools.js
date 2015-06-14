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