var AntiTeX = function(opts){}

/**
 *  
 *  Given tag name possibly with attributes of XML tag,
 *  returns XML format tag.
 * 
 *  @param (string) tagname 
 *      A tagname used in XML format.
 *  @param (string|object) attr
 *      If second argument has a type of object,
 *      it is interpreted as attribute in XML.
 *      Else, second argument is a contents tagged by name.
 *  @param (string|null) contents
 *      If second argument is attribute, use this argument
 *      as contents inside XML tag.
 *  @return (string) XML string.
 *  @author antitex
 *  @todo
 *      Better to use arguments
 */
AntiTeX.prototype.tag = function(tagname,attr,contents){
    if(typeof attr === 'object'){
        var isnull = (contents === null || 
                      contents === undefined || 
                      contents === '');
        var keys = Object.keys(attr);
        var attrs = '';
        for(var i=0,l=keys.length;i<l;i++){
            attrs += ' '+keys[i]+'="'+attr[keys[i]]+'"';
        }
        return '<'+tagname + attrs+'>' + (isnull?'':contents) + '</'+tagname+'>';
    }else{
        contents = attr;
        var isnull = (contents === null || 
                      contents === undefined || 
                      contents === '');
        return '<'+tagname+'>' + (isnull?'':contents) + '</'+tagname+'>';
    }
}

/**
 *  Given arg of possibly multiple types,
 *  returns converted variable.
 *  
 *  @param (string|number|object|function) arg
 *      Given argument. Since this function is used everywhere
 *      in AntiTeX code, it should support multiple types.
 *  @return (string) tagged string
 *  @return (function) pass function
 *  
 *  @author antitex
 *  
 *  @todo
 */
AntiTeX.prototype.convert = function(arg){
    if(typeof arg === 'string'){
    // if(typeof arg === 'string' && arg.match(/^<[^>]*?>.*<\/[^>]*?>$/)){
        if(typeof document === 'undefined'){
            return arg;
        }else{
            var container,elements;
            container = document.createElement('div');
            container.innerHTML = arg;
            elements = container.childNodes;
            for(var i = 0, l = elements.length; i < l; i++){
                var n = elements[i];
                if( n.hasChildNodes() &&
                    n.childNodes.length === 1 &&
                    n.childNodes[0].nodeType === Node.TEXT_NODE){
                }else if(n.nodeType === Node.TEXT_NODE){
                    var replace = document.createElement('mrow');
                    replace.innerHTML = this.convertLiteral(n.textContent);
                    n.parentNode.insertBefore(replace, n);
                    n.parentNode.removeChild(n);
                }else{
                    n.innerHTML = this.convert(n.innerHTML);
                }
            }
            return container.innerHTML;
        }
    }else if(typeof arg === 'number'){
        return this.tag('mn', arg);
    }else if(typeof arg === 'string'){
        return this.convertLiteral(arg);
    }else if(typeof arg === 'object' && arg instanceof Array){
        return this.convertArray(arg);
    }else if(typeof arg === 'function'){
        return arg;
    }else if(!arg){
        return '';
    }else{
        throw new Error('invalid type in function convert');
    }
}


/**
 *  used only in (function) convert.
 *  replace * with invisible multiplication.
 *  @param (string) arg
 *  @return (string) XML
 *      replace literal atoms with xml tags
 *  @author antitex
 */
AntiTeX.prototype.convertLiteral = function(arg){
    return arg.replace(/[0-9]+|[a-zA-Z]|[+\-\/\*=]|[^0-9+\-\/\*=a-zA-Z]+/g,function(str){
        if(str.match(/^[0-9]+$/)){
            return this.tag("mn", str);
        }else if(str.match(/^[a-zA-Z]$/)){
            return this.tag("mi", str);
        }else if(str.match(/^[+\-\/\*=]+$/)){
            return this.tag("mo", str);
        }else{
            return this.tag("mi", str);
        }
    }.bind(this));
}


/**
 *  used only in (function) convert.
 *  @param (string) arg
 *  @return (string) XML
 *      put parenthesis to expression
 *  @author antitex
 */
AntiTeX.prototype.convertArray = function(arg){
    open       = arg[1] || '(';
    close      = arg[2] || this.fenceCouplePattern[open] || ')';
    separators = arg[3] || '';
    return this.tag('mfenced', 
                    {close:close,open:open,separators:separators}, 
                    this.convert(arg[0]));
}


/**
 *  one-liner function.
 *  eat all input and convert everything.
 */
AntiTeX.prototype._ = function(){
    return this.convertJoinArray(arguments);
}

/**
 *  one-liner function.
 *  eat array input and convert everything.
 */
AntiTeX.prototype.convertJoinArray = function(array){
    var s = '';
    for(var i=0,l=array.length;i<l;i++){
        s += this.convert(array[i]);
    }
    return s;
}

/**
 *  registered pattern for parenthesis.
 *  @todo
 *      gather more patterns.
 *      make it possible to get ']' by '['.
 */
AntiTeX.prototype.fenceCouplePattern = {
    '[':']',
    '(':')',
    '{':'}',
    '|':'|'
}


/**
 *  @param (exp) numer
 *  @param (exp) denom
 *  @return fraction expression
 *      numer
 *     -------
 *      denom
 */
AntiTeX.prototype.frac =
AntiTeX.prototype.f =
AntiTeX.prototype.fr = function(numer,denom){
    return this.tag('mfrac', 
                    this.tag('mrow', this.convert(numer))+
                    this.tag('mrow',this.convert(denom)));
}

/**
 *  @param (Array[Array]) table || (Array) table
 *  @param (string) open (nullable)
 *      opening parenthesis
 *  @param (string) close
 *      closing parenthesis
 *  @todo
 *      use (function) this.tag instead of string literal.
 */
AntiTeX.prototype.matrix = 
AntiTeX.prototype.mtrx = 
AntiTeX.prototype.mtx = 
AntiTeX.prototype.m = 
AntiTeX.prototype.mx = function(table,open,close){
    if(table instanceof Array && !(table[0] instanceof Array)){
        table = [table];
    }
    if(table instanceof Array && table[0] instanceof Array){
        var matrix = '<mtable>';
        for(var i=0,l=table.length;i<l;i++){
            matrix += '<mtr>';
            for(var j=0,l2=table[0].length;j<l2;j++){
                matrix += this.tag('mtd', this.convert(table[i][j]));
            }
            matrix += '</mtr>';
        }
        matrix += '</mtable>';
        var open = open || '(';
        var close = close || this.fenceCouplePattern[open];
        return this.tag('mfenced', {close:close,open:open}, this.convert(matrix));
    }else{
        throw new Error('argument type error');
    }
}

/**
 *  @param (Array[Array]) table || (Array) table
 *  @param (string) open (nullable)
 *      opening parenthesis
 *  @param (string) close
 *      closing parenthesis
 *  @todo
 *      use (function) this.tag instead of string literal.
 */
AntiTeX.prototype.transposedmatrix=
AntiTeX.prototype.tmatrix=
AntiTeX.prototype.tmtrx=
AntiTeX.prototype.tmrx=
AntiTeX.prototype.tmx= function(table,open,close){
    if(table instanceof Array && !(table[0] instanceof Array)){
        table = [table];
    }
    if(table instanceof Array && table[0] instanceof Array){
        table = this.transpose(table);
        return this.mx(table,open,close);
    }else{
        throw new Error('argument type error'); 
    }
}

/**
 *  user only in (function) convert.
 *  return transposed two-dimensional array.
 *  @param (Array[Array]) table
 */
AntiTeX.prototype.transpose=	function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
}

/**
 *  @param (XML string) table
 *  @todo
 *      parse XML to Array and transform, then make XML again.
 */
AntiTeX.prototype.transformmatrix = 
AntiTeX.prototype.trmtx = 
AntiTeX.prototype.trm = function(table){
    var parser = new DOMParser();
    var dom = parser.parseFromString(table, "text/xml");
}


/**
 *  assign sum-product style functions automatically.
 *  n is an array for names, s is a symbol corresponding.
 *  
 *  @warning 
 *      Attention!! Using new Function("code") is not a good practice. 
 *      Please commit better code. 
 *  @todo
 *      refactor eval'ing part of the code if possible.
 *  
 */
prototypeAssignmentForSumAndProductFormatFunction: {
    for(var funcs = [
            {n:['sum', 'sm', 's'], s:'&sum;'},
            {n:['prod', 'pro', 'pr', 'p'], s:'&prod;'},
            {n:['lim', 'Lim', 'l'], s:'Lim'},
        ],l=funcs.length;l--;){

        var func = funcs[l];

        for(var names = func.n, l2 = names.length;l2--;){
            var name                = names[l2];
            AntiTeX.prototype[name] = new Function('exp', 'under', 'over',
                'return this.tag("mrow",this.tag("munderover", '+
                'this.tag("mrow",this.tag("mo","'+func.s+'"))+'+
                'this.tag("mrow", (under?this.convert(under):this.tag("none")))+'+
                'this.tag("mrow", (over?this.convert(over):this.tag("none"))))+'+
                'this.tag("mrow", this.convert(exp)))');
        }
    }
}

/**
 *  assign over-variable style functions automatically.
 *  n is an array for names, s is a symbol corresponding.
 *  
 *  @warning 
 *      Attention!! Using new Function("code") is not a good practice. 
 *      Please commit better code. 
 *  @todo
 *      refactor eval'ing part of the code if possible.
 *  
 */
prototypeAssignmentForOverVariableFormatFunction: {
    for(var funcs = [
            {n:['tld', 'tl', 't'], s:'&tilde;'},
            {n:['bar','ba', 'b'], s:'&#95;'},
        ],l=funcs.length;l--;){

        var func = funcs[l];

        for(var names = func.n, l2 = names.length;l2--;){
            var name                = names[l2];
            // provided name as "funcname", symbol as "@", 
            // then it translates like the following;
            // funcname(v1, v2, v3, ..., vn) => v1 @ v2 @ v3 @ ... @ vn
            AntiTeX.prototype[name] = new Function('exp', 
                'return this.tag("mover",this.tag("mrow",this.convert(exp))+this.tag("mo","'+func.s+'"))');
        }
    }
}

/**
 *  integral format
 *  @param (expression) vari
 *  @param (expression|null) exp
 *  @param (expression|null) from
 *  @param (expression|null) to
 *  @todo
 *      shorten function name
 */
AntiTeX.prototype.in = 
AntiTeX.prototype.int = function( vari, exp, from, to){
    return this.tag('msubsup', 
         this.tag('mo','&int;')
         +this.tag('mrow', this.convert(from))
         +this.tag('mrow', this.convert(to))
    )+this.tag('mrow',
         this.tag('mrow', this.convert(exp))
         +this.tag('mi','d')
         +this.convert(vari)
    );
}

/**
 *  ul    ur
 *    base
 *  ll    lr
 * 
 *  @param (expression) base
 *      center expression
 *  @param (expression) lr
 *      lower right expression
 *  @param (expression) ur
 *      upper right expression
 *  @param (expression) ll
 *      lower left  expression
 *  @param (expression) ul
 *      upper left  expression
 *  @todo
 *      add syntax sugar methods
 */
AntiTeX.prototype.i = 
AntiTeX.prototype.idx = function(base, lr, ur, ll, ul){
    return this.tag('mmultiscripts',
        this.tag("mrow", this.convert(base))
        +(lr?this.tag("mrow", this.convert(lr)):this.tag('none'))
        +(ur?this.tag("mrow", this.convert(ur)):this.tag('none'))
        +this.tag('mprescripts')
        +(ll?this.tag("mrow", this.convert(ll)):this.tag('none'))
        +(ul?this.tag("mrow", this.convert(ul)):this.tag('none'))
    );
}

/**
 *  put expression on upper-right
 *  a syntax sugar for (function) idx
 *  @param (expression) base
 *  @param (expression) ur
 */
AntiTeX.prototype.po = 
AntiTeX.prototype.power = function(base, ur){
    return this.idx(base, null, ur, null, null);
}

/**
 *  put power on upper left side or exp.
 *  @param (expression) exp
 *  @param (expression) power
 */
AntiTeX.prototype.r =  
AntiTeX.prototype.root = function(exp, power){
    return this.tag('mroot', 
         this.tag("mrow",this.convert(exp))
         + this.tag("mrow", this.convert(power))
    );
}
