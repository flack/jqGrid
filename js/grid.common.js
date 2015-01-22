/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/*
 * jqGrid common function
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
"use strict";
$.extend($.jgrid,{
    htmlDecode : function(value){
        if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
        return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");		
    },
    htmlEncode : function (value){
        return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    clearArray : function (ar) {
        // see http://jsperf.com/empty-javascript-array
        while (ar.length > 0) {ar.pop();}
    },
    format : function(format){ //jqgformat
        var args = $.makeArray(arguments).slice(1);
        if(format==null) { format = ""; }
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    },
    msie : navigator.appName === 'Microsoft Internet Explorer',
    msiever : function () {
        var rv = -1;
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat( RegExp.$1 );
        }  
        return rv;
    },
    stripHtml : function(v) {
        v = String(v);
        var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
        if (v) {
            v = v.replace(regexp,"");
            return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g,"'") : "";
        } 
        return v;
    },
    getAccessor : function(obj, expr) {
        var ret,p,prm = [], i;
        if( typeof expr === 'function') { return expr(obj); }
        ret = obj[expr];
        if(ret===undefined) {
            try {
                if ( typeof expr === 'string' ) {
                    prm = expr.split('.');
                }
                i = prm.length;
                if( i ) {
                    ret = obj;
                    while (ret && i--) {
                        p = prm.shift();
                        ret = ret[p];
                    }
                }
            } catch (ignore) {}
        }
        return ret;
    },
    from : function(source){
        // Original Author Hugo Bonacci
        // License MIT http://jlinq.codeplex.com/license
        var QueryObject=function(d,q){
            if(typeof d==="string"){
                d=$.data(d);
            }
            var self=this, _data=d, _usecase=true, _trim=false, _query=q, _stripNum = /[\$,%]/g, _lastCommand=null,
                _lastField=null, _orDepth=0, _negate=false, _queuedOperator="",	_sorting=[], _useProperties=true;

            if (typeof d === "object" && d.push) {
                if (d.length > 0) {
                    if (typeof d[0] !== "object") {
                        _useProperties = false;
                    } else {
                        _useProperties = true;
                    }
                }
            } else {
                throw "data provides is not an array";
            }
            this._hasData = function () {
                return _data === null ? false : _data.length === 0 ? false : true;
            };
            this._getStr = function (s) {
                var phrase = [];
                if (_trim) {
                    phrase.push("jQuery.trim(");
                }
                phrase.push("String(" + s + ")");
                if (_trim) {
                    phrase.push(")");
                }
                if (!_usecase) {
                    phrase.push(".toLowerCase()");
                }
                return phrase.join("");
                };
                this._strComp = function (val) {
                    if (typeof val === "string") {
                        return".toString()";
                    }
                    return"";
                };
                this._group = function (f, u) {
                    return({field: f.toString(), unique: u, items: []});
                };
                this._toStr = function (phrase) {
                    if (_trim) {
                        phrase = $.trim(phrase);
                    }
                    phrase = phrase.toString().replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
                    return _usecase ? phrase : phrase.toLowerCase();
                };
                this._funcLoop = function (func) {
                    var results = [];
                    $.each(_data, function (i, v) {
                        results.push(func(v));
                    });
                    return results;
                };
                this._append = function (s) {
                    var i;
                    if (_query === null) {
                        _query = "";
                    } else {
                        _query += _queuedOperator === "" ? " && " : _queuedOperator;
                    }
                    for (i = 0; i < _orDepth; i++) {
                        _query += "(";
                    }
                    if (_negate) {
                        _query += "!";
                    }
                    _query += "(" + s + ")";
                    _negate = false;
                    _queuedOperator = "";
                    _orDepth = 0;
                };
                this._setCommand = function (f, c) {
                    _lastCommand = f;
                    _lastField = c;
                };
                this._resetNegate = function () {
                    _negate = false;
                };
                this._repeatCommand = function (f, v) {
                    if (_lastCommand === null) {
                        return self;
                    }
                    if (f !== null && v !== null) {
                        return _lastCommand(f, v);
                    }
                    if (_lastField === null) {
                        return _lastCommand(f);
                    }
                    if (!_useProperties) {
                        return _lastCommand(f);
                    }
                    return _lastCommand(_lastField, f);
                };
                this._equals = function (a, b) {
                    return(self._compare(a, b, 1) === 0);
                };
                this._compare = function (a, b, d) {
                    var toString = Object.prototype.toString;
                    if (d === undefined) {
                        d = 1;
                    }
                    if (a === undefined) {
                        a = null;
                    }
                    if (b === undefined) {
                        b = null;
                    }
                    if (a === null && b === null) {
                        return 0;
                    }
                    if (a === null && b !== null) {
                        return 1;
                    }
                    if (a !== null && b === null) {
                        return -1;
                    }
                    if (toString.call(a) === '[object Date]' && toString.call(b) === '[object Date]') {
                        if (a < b) {
                            return -d;
                        }
                        if (a > b) {
                            return d;
                        }
                        return 0;
                    }
                    if (!_usecase && typeof a !== "number" && typeof b !== "number") {
                        a = String(a);
                        b = String(b);
                    }
                    if (a < b) {
                        return -d;
                    }
                    if (a > b) {
                        return d;
                    }
                    return 0;
                };
                this._performSort = function () {
                    if (_sorting.length === 0) {
                        return;
                    }
                    _data = self._doSort(_data, 0);
                };
                this._doSort = function (d, q) {
                    var by = _sorting[q].by,
                        dir = _sorting[q].dir,
                        type = _sorting[q].type,
                        dfmt = _sorting[q].datefmt,
                        sfunc = _sorting[q].sfunc;
                    if (q === _sorting.length - 1) {
                        return self._getOrder(d, by, dir, type, dfmt, sfunc);
                    }
                    q++;
                    var values = self._getGroup(d, by, dir, type, dfmt), results = [], i, j, sorted;
                    for (i = 0; i < values.length; i++) {
                        sorted = self._doSort(values[i].items, q);
                        for (j = 0; j < sorted.length; j++) {
                            results.push(sorted[j]);
                        }
                    }
                    return results;
                };
                this._getOrder = function (data, by, dir, type, dfmt, sfunc) {
                    var sortData = [], _sortData = [], newDir = dir === "a" ? 1 : -1, i, ab, j,
                        findSortKey;

                    if (type === undefined) {
                        type = "text";
                    }
                    if (type === 'float' || type === 'number' || type === 'currency' || type === 'numeric') {
                        findSortKey = function ($cell) {
                            var key = parseFloat(String($cell).replace(_stripNum, ''));
                            return isNaN(key) ? Number.NEGATIVE_INFINITY : key;
                        };
                    } else if (type === 'int' || type === 'integer') {
                        findSortKey = function ($cell) {
                            return $cell ? parseFloat(String($cell).replace(_stripNum, '')) : Number.NEGATIVE_INFINITY;
                        };
                    } else if (type === 'date' || type === 'datetime') {
                        findSortKey = function ($cell) {
                            return $.jgrid.parseDate(dfmt, $cell).getTime();
                        };
                    } else if ($.isFunction(type)) {
                        findSortKey = type;
                    } else {
                        findSortKey = function ($cell) {
                            $cell = $cell ? $.trim(String($cell)) : "";
                            return _usecase ? $cell : $cell.toLowerCase();
                        };
                    }
                    $.each(data, function (i, v) {
                        ab = by !== "" ? $.jgrid.getAccessor(v, by) : v;
                        if (ab === undefined) {
                            ab = "";
                        }
                        ab = findSortKey(ab, v);
                        _sortData.push({'vSort': ab, 'index': i});
                    });
                    if ($.isFunction(sfunc)) {
                        _sortData.sort(function (a, b) {
                            a = a.vSort;
                            b = b.vSort;
                            return sfunc.call(this, a, b, newDir);
                        });
                    } else {
                        _sortData.sort(function (a, b) {
                            a = a.vSort;
                            b = b.vSort;
                            return self._compare(a, b, newDir);
                        });
                    }
                    j = 0;
                    var nrec = data.length;
                    // overhead, but we do not change the original data.
                    while (j < nrec) {
                        i = _sortData[j].index;
                        sortData.push(data[i]);
                        j++;
                    }
                    return sortData;
                };
                this._getGroup = function (data, by, dir, type, dfmt) {
                    var results = [],
                        group = null,
                        last = null;
                    $.each(self._getOrder(data, by, dir, type, dfmt), function (i, v) {
                        var val = $.jgrid.getAccessor(v, by);
                        if (val == null) {
                            val = "";
                        }
                        if (!self._equals(last, val)) {
                            last = val;
                            if (group !== null) {
                                results.push(group);
                            }
                            group = self._group(by, val);
                        }
                        group.items.push(v);
                    });
                    if (group !== null) {
                        results.push(group);
                    }
                    return results;
                };
                this.ignoreCase = function () {
                    _usecase = false;
                    return self;
                };
                this.useCase = function () {
                    _usecase = true;
                    return self;
                };
                this.trim = function () {
                    _trim = true;
                    return self;
                };
                this.noTrim = function () {
                    _trim = false;
                    return self;
                };
                this.execute = function () {
                    var match = _query, results = [];
                    if (match === null) {
                        return self;
                    }
                    $.each(_data, function () {
                        if (eval(match)) {
                            results.push(this);
                        }
                    });
                    _data = results;
                    return self;
                };
                this.data = function () {
                    return _data;
                };
                this.select = function (f) {
                    self._performSort();
                    if (!self._hasData()) {
                        return[];
                    }
                    self.execute();
                    if ($.isFunction(f)) {
                        var results = [];
                        $.each(_data, function (i, v) {
                            results.push(f(v));
                        });
                        return results;
                    }
                    return _data;
                };
                this.hasMatch = function () {
                    if (!self._hasData()) {
                        return false;
                    }
                    self.execute();
                    return _data.length > 0;
                };
                this.andNot = function (f, v, x) {
                    _negate = !_negate;
                    return self.and(f, v, x);
                };
                this.orNot = function (f, v, x) {
                    _negate = !_negate;
                    return self.or(f, v, x);
                };
                this.not = function (f, v, x) {
                    return self.andNot(f, v, x);
                };
                this.and = function (f, v, x) {
                    _queuedOperator = " && ";
                    if (f === undefined) {
                        return self;
                    }
                    return self._repeatCommand(f, v, x);
                };
                this.or = function (f, v, x) {
                    _queuedOperator = " || ";
                    if (f === undefined) {
                        return self;
                    }
                    return self._repeatCommand(f, v, x);
                };
                this.orBegin = function () {
                    _orDepth++;
                    return self;
                };
                this.orEnd = function () {
                    if (_query !== null) {
                        _query += ")";
                    }
                    return self;
                };
                this.isNot = function (f) {
                    _negate = !_negate;
                    return self.is(f);
                };
                this.is = function (f) {
                    self._append('this.' + f);
                    self._resetNegate();
                    return self;
                };
                this._compareValues = function (func, f, v, how, t) {
                    var fld;
                    if (_useProperties) {
                        fld = 'jQuery.jgrid.getAccessor(this,\'' + f + '\')';
                    } else {
                        fld = 'this';
                    }
                    if (v === undefined) {
                        v = null;
                    }
                    //var val=v===null?f:v,
                    var val = v,
                        swst = t.stype === undefined ? "text" : t.stype;
                    if (v !== null) {
                        switch (swst) {
                            case 'int':
                            case 'integer':
                                val = (isNaN(Number(val)) || val === "") ? '0' : val; // To be fixed with more inteligent code
                                fld = 'parseInt(' + fld + ',10)';
                                val = 'parseInt(' + val + ',10)';
                                break;
                            case 'float':
                            case 'number':
                            case 'numeric':
                                val = String(val).replace(_stripNum, '');
                                val = (isNaN(Number(val)) || val === "") ? '0' : val; // To be fixed with more inteligent code
                                fld = 'parseFloat(' + fld + ')';
                                val = 'parseFloat(' + val + ')';
                                break;
                            case 'date':
                            case 'datetime':
                                val = String($.jgrid.parseDate(t.newfmt || 'Y-m-d', val).getTime());
                                fld = 'jQuery.jgrid.parseDate("' + t.srcfmt + '",' + fld + ').getTime()';
                                break;
                            default :
                                fld = self._getStr(fld);
                                val = self._getStr('"' + self._toStr(val) + '"');
                        }
                    }
                    self._append(fld + ' ' + how + ' ' + val);
                    self._setCommand(func, f);
                    self._resetNegate();
                    return self;
                };
                this.equals = function (f, v, t) {
                    return self._compareValues(self.equals, f, v, "==", t);
                };
                this.notEquals = function (f, v, t) {
                    return self._compareValues(self.equals, f, v, "!==", t);
                };
                this.isNull = function (f, v, t) {
                    return self._compareValues(self.equals, f, null, "===", t);
                };
                this.greater = function (f, v, t) {
                    return self._compareValues(self.greater, f, v, ">", t);
                };
                this.less = function (f, v, t) {
                    return self._compareValues(self.less, f, v, "<", t);
                };
                this.greaterOrEquals = function (f, v, t) {
                    return self._compareValues(self.greaterOrEquals, f, v, ">=", t);
                };
                this.lessOrEquals = function (f, v, t) {
                    return self._compareValues(self.lessOrEquals, f, v, "<=", t);
                };
                this.startsWith = function (f, v) {
                    var val = (v == null) ? f : v,
                        length = _trim ? $.trim(val.toString()).length : val.toString().length;
                    if (_useProperties) {
                        self._append(self._getStr('jQuery.jgrid.getAccessor(this,\'' + f + '\')') + '.substr(0,' + length + ') == ' + self._getStr('"' + self._toStr(v) + '"'));
                    } else {
                        if (v != null) {
                            length = _trim ? $.trim(v.toString()).length : v.toString().length;
                        }
                        self._append(self._getStr('this') + '.substr(0,' + length + ') == ' + self._getStr('"' + self._toStr(f) + '"'));
                    }
                    self._setCommand(self.startsWith, f);
                    self._resetNegate();
                    return self;
                };
                this.endsWith = function (f, v) {
                    var val = (v == null) ? f : v,
                        length = _trim ? $.trim(val.toString()).length : val.toString().length;
                    if (_useProperties) {
                        self._append(self._getStr('jQuery.jgrid.getAccessor(this,\'' + f + '\')') + '.substr(' + self._getStr('jQuery.jgrid.getAccessor(this,\'' + f + '\')') + '.length-' + length + ',' + length + ') == "' + self._toStr(v) + '"');
                    } else {
                        self._append(self._getStr('this') + '.substr(' + self._getStr('this') + '.length-"' + self._toStr(f) + '".length,"' + self._toStr(f) + '".length) == "' + self._toStr(f) + '"');
                    }
                    self._setCommand(self.endsWith, f);
                    self._resetNegate();
                    return self;
                };
                this.contains = function (f, v) {
                    if (_useProperties) {
                        self._append(self._getStr('jQuery.jgrid.getAccessor(this,\'' + f + '\')') + '.indexOf("' + self._toStr(v) + '",0) > -1');
                    } else {
                        self._append(self._getStr('this') + '.indexOf("' + self._toStr(f) + '",0) > -1');
                    }
                    self._setCommand(self.contains, f);
                    self._resetNegate();
                    return self;
                };
                this.groupBy = function (by, dir, type, datefmt) {
                    if (!self._hasData()) {
                        return null;
                    }
                    return self._getGroup(_data, by, dir, type, datefmt);
                };
                this.orderBy = function (by, dir, stype, dfmt, sfunc) {
                    dir = dir == null ? "a" : $.trim(dir.toString().toLowerCase());
                    if (stype == null) {
                        stype = "text";
                    }
                    if (dfmt == null) {
                        dfmt = "Y-m-d";
                    }
                    if (sfunc == null) {
                        sfunc = false;
                    }
                    if (dir === "desc" || dir === "descending") {
                        dir = "d";
                    }
                    if (dir === "asc" || dir === "ascending") {
                        dir = "a";
                    }
                    _sorting.push({by: by, dir: dir, type: stype, datefmt: dfmt, sfunc: sfunc});
                    return self;
                };
                return self;
            };
            return new QueryObject(source, null);
        },
        // Modal functions
	showModal : function(h) {
		h.w.show();
	},
	closeModal : function(h) {
		h.w.hide().attr("aria-hidden","true");
		if(h.o) {h.o.remove();}
	},
	hideModal : function (selector,o) {
		o = $.extend({jqm : true, gb :'', removemodal: false, formprop: false, form : ''}, o || {});
		var thisgrid = o.gb && typeof o.gb === "string" && o.gb.substr(0,6) === "#gbox_" ? $("#" + o.gb.substr(6))[0] : false;
		if(o.onClose) {
			var oncret = thisgrid ? o.onClose.call(thisgrid, selector) : o.onClose(selector);
			if (typeof oncret === 'boolean'  && !oncret ) { return; }
		}
		if( o.formprop && thisgrid  && o.form) {
			var fh = $(selector)[0].style.height;
			if(fh.indexOf("px") > -1 ) {
				fh = parseFloat(fh);
			}
			var frmgr, frmdata;
			if(o.form==='edit'){
				frmgr = '#' +$.jgrid.jqID("FrmGrid_"+ o.gb.substr(6));
				frmdata = "formProp";
			} else if( o.form === 'view') {
				frmgr = '#' +$.jgrid.jqID("ViewGrid_"+ o.gb.substr(6));
				frmdata = "viewProp";
			}
			$(thisgrid).data(frmdata, {
				top:parseFloat($(selector).css("top")),
				left : parseFloat($(selector).css("left")),
				width : $(selector).width(),
				height : fh,
				dataheight : $(frmgr).height(),
				datawidth: $(frmgr).width()
			});
		}
		if ($.fn.jqm && o.jqm === true) {
			$(selector).attr("aria-hidden","true").jqmHide();
		} else {
			if(o.gb !== '') {
				try {$(".jqgrid-overlay:first",o.gb).hide();} catch (ignore){}
			}
			$(selector).hide().attr("aria-hidden","true");
		}
		if( o.removemodal ) {
			$(selector).remove();
		}
	},
//Helper functions
	findPos : function(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			    obj = obj.offsetParent;
			} while (obj);
			//do not change obj == obj.offsetParent
		}
		return [curleft,curtop];
	},
	createModal : function(aIDs, content, p, insertSelector, posSelector, appendsel, css) {
		p = $.extend(true, {}, $.jgrid.jqModal || {}, p);
		var mw = document.createElement('div'), rtlsup, self = this, themodalSelector = "#"+$.jgrid.jqID(aIDs.themodal),
		scrollelmSelector = aIDs.scrollelm ? "#"+$.jgrid.jqID(aIDs.scrollelm) : false;
		css = $.extend({}, css || {});
		rtlsup = $(p.gbox).attr("dir") === "rtl" ? true : false;
		mw.className= "ui-widget ui-widget-content ui-corner-all ui-jqdialog";
		mw.id = aIDs.themodal;
		var mh = document.createElement('div');
		mh.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
		mh.id = aIDs.modalhead;
		$(mh).append("<span class='ui-jqdialog-title'>"+p.caption+"</span>");
		var ahr= $("<a class='ui-jqdialog-titlebar-close ui-corner-all'></a>")
		.hover(function(){ahr.addClass('ui-state-hover');},
			function(){ahr.removeClass('ui-state-hover');})
		.append("<span class='ui-icon ui-icon-closethick'></span>");
		$(mh).append(ahr);
		if(rtlsup) {
			mw.dir = "rtl";
			$(".ui-jqdialog-title",mh).css("float","right");
			$(".ui-jqdialog-titlebar-close",mh).css("left",0.3+"em");
		} else {
			mw.dir = "ltr";
			$(".ui-jqdialog-title",mh).css("float","left");
			$(".ui-jqdialog-titlebar-close",mh).css("right",0.3+"em");
		}
		var mc = document.createElement('div');
		$(mc).addClass("ui-jqdialog-content ui-widget-content").attr("id",aIDs.modalcontent);
		$(mc).append(content);
		mw.appendChild(mc);
		$(mw).prepend(mh);
		if(appendsel===true) { $('body').append(mw); } //append as first child in body -for alert dialog
		else if (typeof appendsel === "string") {
			$(appendsel).append(mw);
		} else {$(mw).insertBefore(insertSelector);}
		$(mw).css(css);
		if(p.jqModal === undefined) {p.jqModal = true;} // internal use
		var coord = {};
		if ( $.fn.jqm && p.jqModal === true) {
			if(p.left ===0 && p.top===0 && p.overlay) {
				var pos = [];
				pos = $.jgrid.findPos(posSelector);
				p.left = pos[0] + 4;
				p.top = pos[1] + 4;
			}
			coord.top = p.top+"px";
			coord.left = p.left;
		} else if(p.left !==0 || p.top!==0) {
			coord.left = p.left;
			coord.top = p.top+"px";
		}
		$("a.ui-jqdialog-titlebar-close",mh).click(function(){
			var oncm = $(themodalSelector).data("onClose") || p.onClose;
			var gboxclose = $(themodalSelector).data("gbox") || p.gbox;
			self.hideModal(themodalSelector,{gb:gboxclose,jqm:p.jqModal,onClose:oncm, removemodal: p.removemodal || false, formprop : !p.recreateForm || false, form: p.form || ''});
			return false;
		});
		if (p.width === 0 || !p.width) {p.width = 300;}
		if(p.height === 0 || !p.height) {p.height =200;}
		if(!p.zIndex) {
			var parentZ = $(insertSelector).parents("*[role=dialog]").filter(':first').css("z-index");
			if(parentZ) {
				p.zIndex = parseInt(parentZ,10)+2;
			} else {
				p.zIndex = 950;
			}
		}
		var rtlt = 0;
		if( rtlsup && coord.left && !appendsel) {
			rtlt = $(p.gbox).width()- (!isNaN(p.width) ? parseInt(p.width,10) :0) - 8; // to do
		// just in case
			coord.left = parseInt(coord.left,10) + parseInt(rtlt,10);
		}
		if(coord.left) { coord.left += "px"; }
		$(mw).css($.extend({
			width: isNaN(p.width) ? "auto": p.width+"px",
			height:isNaN(p.height) ? "auto" : p.height + "px",
			zIndex:p.zIndex,
			overflow: 'hidden'
		},coord))
		.attr({tabIndex: "-1","role":"dialog","aria-labelledby":aIDs.modalhead,"aria-hidden":"true"});
		if(p.drag === undefined) { p.drag=true;}
		if(p.resize === undefined) {p.resize=true;}
		if (p.drag) {
			$(mh).css('cursor','move');
			if($.fn.jqDrag) {
				$(mw).jqDrag(mh);
			} else {
				try {
					$(mw).draggable({handle: $("#"+$.jgrid.jqID(mh.id))});
				} catch (ignore) {}
			}
		}
		if(p.resize) {
			if($.fn.jqResize) {
				$(mw).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se'></div>");
				$(themodalSelector).jqResize(".jqResize",scrollelmSelector);
			} else {
				try {
					$(mw).resizable({handles: 'se, sw',alsoResize: scrollelmSelector});
				} catch (ignore) {}
			}
		}
		if(p.closeOnEscape === true){
			$(mw).keydown( function( e ) {
				if( e.which === 27 ) {
					var cone = $(themodalSelector).data("onClose") || p.onClose;
					self.hideModal(themodalSelector,{gb:p.gbox,jqm:p.jqModal,onClose: cone, removemodal: p.removemodal || false, formprop : !p.recreateForm || false, form: p.form || ''});
				}
			});
		}
	},
	viewModal : function (selector,o){
		o = $.extend({
			toTop: true,
			overlay: 10,
			modal: false,
			overlayClass : 'ui-widget-overlay',
			onShow: $.jgrid.showModal,
			onHide: $.jgrid.closeModal,
			gbox: '',
			jqm : true,
			jqM : true
		}, o || {});
		if ($.fn.jqm && o.jqm === true) {
			if(o.jqM) { $(selector).attr("aria-hidden","false").jqm(o).jqmShow(); }
			else {$(selector).attr("aria-hidden","false").jqmShow();}
		} else {
			if(o.gbox !== '') {
				$(".jqgrid-overlay:first",o.gbox).show();
				$(selector).data("gbox",o.gbox);
			}
			$(selector).show().attr("aria-hidden","false");
			try{$(':input:visible',selector)[0].focus();}catch(ignore){}
		}
	},
	info_dialog : function(caption, content,c_b, modalopt) {
		var mopt = {
			width:290,
			height:'auto',
			dataheight: 'auto',
			drag: true,
			resize: false,
			left:250,
			top:170,
			zIndex : 1000,
			jqModal : true,
			modal : false,
			closeOnEscape : true,
			align: 'center',
			buttonalign : 'center',
			buttons : []
		// {text:'textbutt', id:"buttid", onClick : function(){...}}
		// if the id is not provided we set it like info_button_+ the index in the array - i.e info_button_0,info_button_1...
		};
		$.extend(true, mopt, $.jgrid.jqModal || {}, {caption:"<b>"+caption+"</b>"}, modalopt || {});
		var jm = mopt.jqModal, self = this;
		if($.fn.jqm && !jm) { jm = false; }
		// in case there is no jqModal
		var buttstr ="", i;
		if(mopt.buttons.length > 0) {
			for(i=0;i<mopt.buttons.length;i++) {
				if(mopt.buttons[i].id === undefined) { mopt.buttons[i].id = "info_button_"+i; }
				buttstr += "<a id='"+mopt.buttons[i].id+"' class='fm-button ui-state-default ui-corner-all'>"+mopt.buttons[i].text+"</a>";
			}
		}
		var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight+"px",
		cn = "text-align:"+mopt.align+";";
		var cnt = "<div id='info_id'>";
		cnt += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:"+dh+";"+cn+"'>"+content+"</div>";
		cnt += c_b ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button ui-state-default ui-corner-all'>"+c_b+"</a>"+buttstr+"</div>" :
			buttstr !== ""  ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>"+buttstr+"</div>" : "";
		cnt += "</div>";

		try {
			if($("#info_dialog").attr("aria-hidden") === "false") {
				$.jgrid.hideModal("#info_dialog",{jqm:jm});
			}
			$("#info_dialog").remove();
		} catch (ignore){}
		$.jgrid.createModal({
			themodal:'info_dialog',
			modalhead:'info_head',
			modalcontent:'info_content',
			scrollelm: 'infocnt'},
			cnt,
			mopt,
			'','',true
		);
		// attach onclick after inserting into the dom
		if(buttstr) {
			$.each(mopt.buttons,function(i){
				$("#"+$.jgrid.jqID(this.id),"#info_id").bind('click',function(){mopt.buttons[i].onClick.call($("#info_dialog")); return false;});
			});
		}
		$("#closedialog", "#info_id").click(function(){
			self.hideModal("#info_dialog",{
				jqm:jm,
				onClose: $("#info_dialog").data("onClose") || mopt.onClose,
				gb: $("#info_dialog").data("gbox") || mopt.gbox
			});
			return false;
		});
		$(".fm-button","#info_dialog").hover(
			function(){$(this).addClass('ui-state-hover');},
			function(){$(this).removeClass('ui-state-hover');}
		);
		if($.isFunction(mopt.beforeOpen) ) { mopt.beforeOpen(); }
		$.jgrid.viewModal("#info_dialog",{
			onHide: function(h) {
				h.w.hide().remove();
				if(h.o) { h.o.remove(); }
			},
			modal :mopt.modal,
			jqm:jm
		});
		if($.isFunction(mopt.afterOpen) ) { mopt.afterOpen(); }
		try{ $("#info_dialog").focus();} catch (ignore){}
	},
	bindEv: function  (el, opt) {
		var $t = this;
		if($.isFunction(opt.dataInit)) {
			opt.dataInit.call($t,el,opt);
		}
		if(opt.dataEvents) {
			$.each(opt.dataEvents, function() {
				if (this.data !== undefined) {
					$(el).bind(this.type, this.data, this.fn);
				} else {
					$(el).bind(this.type, this.fn);
				}
			});
		}
	},
// Form Functions
	createEl : function(eltype,options,vl,autowidth, ajaxso) {
		var elem = "", $t = this;
		function setAttributes(elm, atr, exl ) {
			var exclude = ['dataInit','dataEvents','dataUrl', 'buildSelect','sopt', 'searchhidden', 'defaultValue', 'attr', 'custom_element', 'custom_value'];
			if(exl !== undefined && $.isArray(exl)) {
				$.merge(exclude, exl);
			}
			$.each(atr, function(key, value){
				if($.inArray(key, exclude) === -1) {
					$(elm).attr(key,value);
				}
			});
			if(!atr.hasOwnProperty('id')) {
				$(elm).attr('id', $.jgrid.randId());
			}
		}
		switch (eltype)
		{
			case "textarea" :
				elem = document.createElement("textarea");
				if(autowidth) {
					if(!options.cols) { $(elem).css({width:"98%"});}
				} else if (!options.cols) { options.cols = 20; }
				if(!options.rows) { options.rows = 2; }
				if(vl==='&nbsp;' || vl==='&#160;' || (vl.length===1 && vl.charCodeAt(0)===160)) {vl="";}
				elem.value = vl;
				setAttributes(elem, options);
				$(elem).attr({"role":"textbox","multiline":"true"});
			break;
			case "checkbox" : //what code for simple checkbox
				elem = document.createElement("input");
				elem.type = "checkbox";
				if( !options.value ) {
					var vl1 = String(vl).toLowerCase();
					if(vl1.search(/(false|f|0|no|n|off|undefined)/i)<0 && vl1!=="") {
						elem.checked=true;
						elem.defaultChecked=true;
						elem.value = vl;
					} else {
						elem.value = "on";
					}
					$(elem).attr("offval","off");
				} else {
					var cbval = options.value.split(":");
					if(vl === cbval[0]) {
						elem.checked=true;
						elem.defaultChecked=true;
					}
					elem.value = cbval[0];
					$(elem).attr("offval",cbval[1]);
				}
				setAttributes(elem, options, ['value']);
				$(elem).attr("role","checkbox");
			break;
			case "select" :
				elem = document.createElement("select");
				elem.setAttribute("role","select");
				var msl, ovm = [];
				if(options.multiple===true) {
					msl = true;
					elem.multiple="multiple";
					$(elem).attr("aria-multiselectable","true");
				} else { msl = false; }
				if(options.dataUrl !== undefined) {
					var rowid = null, postData = options.postData || ajaxso.postData;
					try {
						rowid = options.rowId;
					} catch(ignore) {}

					if ($t.p && $t.p.idPrefix) {
						rowid = $.jgrid.stripPref($t.p.idPrefix, rowid);
					}
					$.ajax($.extend({
						url: $.isFunction(options.dataUrl) ? options.dataUrl.call($t, rowid, vl, String(options.name)) : options.dataUrl,
						type : "GET",
						dataType: "html",
						data: $.isFunction(postData) ? postData.call($t, rowid, vl, String(options.name)) : postData,
						context: {elem:elem, options:options, vl:vl},
						success: function(data){
							var ovm1 = [], elem1 = this.elem, vl2 = this.vl,
							options1 = $.extend({},this.options),
							msl1 = options1.multiple===true,
							a = $.isFunction(options1.buildSelect) ? options1.buildSelect.call($t,data) : data;
							if(typeof a === 'string') {
								a = $( $.trim( a ) ).html();
							}
							if(a) {
								$(elem1).append(a);
								setAttributes(elem1, options1, postData ? ['postData'] : undefined );
								if(options1.size === undefined) { options1.size =  msl1 ? 3 : 1;}
								if(msl1) {
									ovm1 = vl2.split(",");
									ovm1 = $.map(ovm1,function(n){return $.trim(n);});
								} else {
									ovm1[0] = $.trim(vl2);
								}
								//$(elem).attr(options);
								setTimeout(function(){
									$("option",elem1).each(function(i){
										//if(i===0) { this.selected = ""; }
										// fix IE8/IE7 problem with selecting of the first item on multiple=true
										if (i === 0 && elem1.multiple) { this.selected = false; }
										$(this).attr("role","option");
										if($.inArray($.trim($(this).text()),ovm1) > -1 || $.inArray($.trim($(this).val()),ovm1) > -1 ) {
											this.selected= "selected";
										}
									});
								},0);
							}
						}
					},ajaxso || {}));
				} else if(options.value) {
					var i;
					if(options.size === undefined) {
						options.size = msl ? 3 : 1;
					}
					if(msl) {
						ovm = vl.split(",");
						ovm = $.map(ovm,function(n){return $.trim(n);});
					}
					if(typeof options.value === 'function') { options.value = options.value(); }
					var so,sv, ov, 
					sep = options.separator === undefined ? ":" : options.separator,
					delim = options.delimiter === undefined ? ";" : options.delimiter,
                    mapFunc = function(n,ii){if(ii>0) { return n;} };
					if(typeof options.value === 'string') {
						so = options.value.split(delim);
						for(i=0; i<so.length;i++){
							sv = so[i].split(sep);
							if(sv.length > 2 ) {
							    sv[1] = $.map(sv, mapFunc).join(sep);
							}
							ov = document.createElement("option");
							ov.setAttribute("role","option");
							ov.value = sv[0]; ov.innerHTML = sv[1];
							elem.appendChild(ov);
							if (!msl &&  ($.trim(sv[0]) === $.trim(vl) || $.trim(sv[1]) === $.trim(vl))) { ov.selected ="selected"; }
							if (msl && ($.inArray($.trim(sv[1]), ovm)>-1 || $.inArray($.trim(sv[0]), ovm)>-1)) {ov.selected ="selected";}
						}
					} else if (typeof options.value === 'object') {
						var oSv = options.value, key;
						for (key in oSv) {
							if (oSv.hasOwnProperty(key ) ){
								ov = document.createElement("option");
								ov.setAttribute("role","option");
								ov.value = key; ov.innerHTML = oSv[key];
								elem.appendChild(ov);
								if (!msl &&  ( $.trim(key) === $.trim(vl) || $.trim(oSv[key]) === $.trim(vl)) ) { ov.selected ="selected"; }
								if (msl && ($.inArray($.trim(oSv[key]),ovm)>-1 || $.inArray($.trim(key),ovm)>-1)) { ov.selected ="selected"; }
							}
						}
					}
					setAttributes(elem, options, ['value']);
				}
			break;
			case "text" :
			case "password" :
			case "button" :
				var role;
				if(eltype==="button") { role = "button"; }
				else { role = "textbox"; }
				elem = document.createElement("input");
				elem.type = eltype;
				elem.value = vl;
				setAttributes(elem, options);
				if(eltype !== "button"){
					if(autowidth) {
						if(!options.size) { $(elem).css({width:"98%"}); }
					} else if (!options.size) { options.size = 20; }
				}
				$(elem).attr("role",role);
			break;
			case "image" :
			case "file" :
				elem = document.createElement("input");
				elem.type = eltype;
				setAttributes(elem, options);
				break;
			case "custom" :
				elem = document.createElement("span");
				try {
					if($.isFunction(options.custom_element)) {
						var celm = options.custom_element.call($t,vl,options);
						if(celm) {
							celm = $(celm).addClass("customelement").attr({id:options.id,name:options.name});
							$(elem).empty().append(celm);
						} else {
							throw "e2";
						}
					} else {
						throw "e1";
					}
				} catch (e) {
					if (e==="e1") { $.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_element' "+$.jgrid.edit.msg.nodefined, $.jgrid.edit.bClose);}
					if (e==="e2") { $.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_element' "+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose);}
					else { $.jgrid.info_dialog($.jgrid.errors.errcap,typeof e==="string"?e:e.message,$.jgrid.edit.bClose); }
				}
			break;
		}
		return elem;
	},
// Date Validation Javascript
	checkDate : function (format, date) {
		var daysInFebruary = function(year){
		// February has 29 days in any year evenly divisible by four,
		// EXCEPT for centurial years which are not also divisible by 400.
			return (((year % 4 === 0) && ( year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28 );
		},
		tsp = {}, sep;
		format = format.toLowerCase();
		//we search for /,-,. for the date separator
		if(format.indexOf("/") !== -1) {
			sep = "/";
		} else if(format.indexOf("-") !== -1) {
			sep = "-";
		} else if(format.indexOf(".") !== -1) {
			sep = ".";
		} else {
			sep = "/";
		}
		format = format.split(sep);
		date = date.split(sep);
		if (date.length !== 3) { return false; }
		var j=-1,yln, dln=-1, mln=-1, i, dv;
		for(i=0;i<format.length;i++){
			dv = isNaN(date[i]) ? 0 : parseInt(date[i],10);
			tsp[format[i]] = dv;
			yln = format[i];
			if(yln.indexOf("y") !== -1) { j=i; }
			if(yln.indexOf("m") !== -1) { mln=i; }
			if(yln.indexOf("d") !== -1) { dln=i; }
		}
		if (format[j] === "y" || format[j] === "yyyy") {
			yln=4;
		} else if(format[j] ==="yy"){
			yln = 2;
		} else {
			yln = -1;
		}
		var daysInMonth = [0,31,29,31,30,31,30,31,31,30,31,30,31],
		strDate;
		if (j === -1) {
			return false;
		}
			strDate = tsp[format[j]].toString();
			if(yln === 2 && strDate.length === 1) {yln = 1;}
			if (strDate.length !== yln || (tsp[format[j]]===0 && date[j]!=="00")){
				return false;
			}
		if(mln === -1) {
			return false;
		}
			strDate = tsp[format[mln]].toString();
			if (strDate.length<1 || tsp[format[mln]]<1 || tsp[format[mln]]>12){
				return false;
			}
		if(dln === -1) {
			return false;
		}
			strDate = tsp[format[dln]].toString();
			if (strDate.length<1 || tsp[format[dln]]<1 || tsp[format[dln]]>31 || (tsp[format[mln]]===2 && tsp[format[dln]]>daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]){
				return false;
			}
		return true;
	},
	isEmpty : function(val)
	{
		if (val.match(/^\s+$/) || val === "")	{
			return true;
		}
			return false;
	},
	checkTime : function(time){
	// checks only hh:ss (and optional am/pm)
		var re = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/,regs;
		if(!$.jgrid.isEmpty(time))
		{
			regs = time.match(re);
			if(regs) {
				if(regs[3]) {
					if(regs[1] < 1 || regs[1] > 12) { return false; }
				} else {
					if(regs[1] > 23) { return false; }
				}
				if(regs[2] > 59) {
					return false;
				}
			} else {
				return false;
			}
		}
		return true;
	},
	checkValues : function(val, valref, customobject, nam) {
		var edtrul,i, nm, dft, len, g = this, cm = g.p.colModel;
		if(customobject === undefined) {
			if(typeof valref==='string'){
				for( i =0, len=cm.length;i<len; i++){
					if(cm[i].name===valref) {
						edtrul = cm[i].editrules;
						valref = i;
						if(cm[i].formoptions != null) { nm = cm[i].formoptions.label; }
						break;
					}
				}
			} else if(valref >=0) {
				edtrul = cm[valref].editrules;
			}
		} else {
			edtrul = customobject;
			nm = nam===undefined ? "_" : nam;
		}
		if(edtrul) {
			if(!nm) { nm = g.p.colNames != null ? g.p.colNames[valref] : cm[valref].label; }
			if(edtrul.required === true) {
				if( $.jgrid.isEmpty(val) )  { return [false,nm+": "+$.jgrid.edit.msg.required,""]; }
			}
			// force required
			var rqfield = edtrul.required === false ? false : true;
			if(edtrul.number === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
					if(isNaN(val)) { return [false,nm+": "+$.jgrid.edit.msg.number,""]; }
				}
			}
			if(edtrul.minValue !== undefined && !isNaN(edtrul.minValue)) {
				if (parseFloat(val) < parseFloat(edtrul.minValue) ) { return [false,nm+": "+$.jgrid.edit.msg.minValue+" "+edtrul.minValue,""];}
			}
			if(edtrul.maxValue !== undefined && !isNaN(edtrul.maxValue)) {
				if (parseFloat(val) > parseFloat(edtrul.maxValue) ) { return [false,nm+": "+$.jgrid.edit.msg.maxValue+" "+edtrul.maxValue,""];}
			}
			var filter;
			if(edtrul.email === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
				// taken from $ Validate plugin
					filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
					if(!filter.test(val)) {return [false,nm+": "+$.jgrid.edit.msg.email,""];}
				}
			}
			if(edtrul.integer === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
					if(isNaN(val)) { return [false,nm+": "+$.jgrid.edit.msg.integer,""]; }
					if ((val % 1 !== 0) || (val.indexOf('.') !== -1)) { return [false,nm+": "+$.jgrid.edit.msg.integer,""];}
				}
			}
			if(edtrul.date === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
					if(cm[valref].formatoptions && cm[valref].formatoptions.newformat) {
						dft = cm[valref].formatoptions.newformat;
						if( $.jgrid.formatter.date.masks.hasOwnProperty(dft) ) {
							dft = $.jgrid.formatter.date.masks[dft];
						}
					} else {
						dft = cm[valref].datefmt || "Y-m-d";
					}
					if(!$.jgrid.checkDate (dft, val)) { return [false,nm+": "+$.jgrid.edit.msg.date+" - "+dft,""]; }
				}
			}
			if(edtrul.time === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
					if(!$.jgrid.checkTime (val)) { return [false,nm+": "+$.jgrid.edit.msg.date+" - hh:mm (am/pm)",""]; }
				}
			}
			if(edtrul.url === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
					filter = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
					if(!filter.test(val)) {return [false,nm+": "+$.jgrid.edit.msg.url,""];}
				}
			}
			if(edtrul.custom === true) {
				if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
					if($.isFunction(edtrul.custom_func)) {
						var ret = edtrul.custom_func.call(g,val,nm,valref);
						return $.isArray(ret) ? ret : [false,$.jgrid.edit.msg.customarray,""];
					}
					return [false,$.jgrid.edit.msg.customfcheck,""];
				}
			}
		}
		return [true,"",""];
	}
});
}(jQuery));
