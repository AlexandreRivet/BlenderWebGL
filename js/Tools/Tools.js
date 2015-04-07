function check(variable)
{
	return ( !(variable == undefined) && !(variable == null) );
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