// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license jqGrid  4.7.0-post - jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2014-12-28
 */
//jsHint options
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */

(function ($) {
"use strict";
var englishLanguageDefaults = {
	defaults : {
		recordtext: "View {0} - {1} of {2}",
		emptyrecords: "No records to view",
		loadtext: "Loading...",
		pgtext : "Page {0} of {1}",
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid"
	},
	search : {
		caption: "Search...",
		Find: "Find",
		Reset: "Reset",
		odata: [{ oper:'eq', text:'equal'},{ oper:'ne', text:'not equal'},{ oper:'lt', text:'less'},{ oper:'le', text:'less or equal'},{ oper:'gt', text:'greater'},{ oper:'ge', text:'greater or equal'},{ oper:'bw', text:'begins with'},{ oper:'bn', text:'does not begin with'},{ oper:'in', text:'is in'},{ oper:'ni', text:'is not in'},{ oper:'ew', text:'ends with'},{ oper:'en', text:'does not end with'},{ oper:'cn', text:'contains'},{ oper:'nc', text:'does not contain'},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
		groupOps: [{ op: "AND", text: "all" },{ op: "OR",  text: "any" }],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
		addCaption: "Add Record",
		editCaption: "Edit Record",
		bSubmit: "Submit",
		bCancel: "Cancel",
		bClose: "Close",
		saveData: "Data has been changed! Save changes?",
		bYes : "Yes",
		bNo : "No",
		bExit : "Cancel",
		msg: {
			required:"Field is required",
			number:"Please, enter valid number",
			minValue:"value must be greater than or equal to ",
			maxValue:"value must be less than or equal to",
			email: "is not a valid e-mail",
			integer: "Please, enter valid integer value",
			date: "Please, enter valid date value",
			url: "is not a valid URL. Prefix required ('http://' or 'https://')",
			nodefined : " is not defined!",
			novalue : " return value is required!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "View Record",
		bClose: "Close"
	},
	del : {
		caption: "Delete",
		msg: "Delete selected record(s)?",
		bSubmit: "Delete",
		bCancel: "Cancel"
	},
	nav : {
		edittext: "",
		edittitle: "Edit selected row",
		addtext:"",
		addtitle: "Add new row",
		deltext: "",
		deltitle: "Delete selected row",
		searchtext: "",
		searchtitle: "Find records",
		refreshtext: "",
		refreshtitle: "Reload Grid",
		alertcap: "Warning",
		alerttext: "Please, select row",
		viewtext: "",
		viewtitle: "View selected row"
	},
	col : {
		caption: "Select columns",
		bSubmit: "Ok",
		bCancel: "Cancel"
	},
	errors : {
		errcap : "Error",
		nourl : "No url is set",
		norecords: "No records to process",
		model : "Length of colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			}
		}
	}
};

$.jgrid = $.jgrid || {};
$.extend(true,$.jgrid,{
	version : "4.7.0-post",
	cmTemplate : {
        integer: {
            formatter: "integer", align: "right", sorttype: "integer",
			searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
        },
        number: {
            formatter: "number", align: "right", sorttype: "number",
			searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
        },
		actions: {
			formatter: "actions", width: 53, align: "center", autoResizable: false,
			fixed: true, resizable: false, sortable: false, search: false, editable: false, viewable: false
		}
    },
	formatter : { // set common formatter settings independent from the language and locale
		date: {
			parseRe: /[#%\\\/:_;.,\t\s-]/,
			masks: {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO"
			},
			reformatAfterEdit : false,
			userLocalTime : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox: {disabled:true},
		idName: 'id',
		unused: '' // used only to detect whether the changes are overwritten because of wrong usage
	},
	htmlDecode : function(value){
		if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
		return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");		
	},
	htmlEncode : function (value){
		return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	clearArray : function (ar) {
		// see http://jsperf.com/empty-javascript-array
		while (ar.length > 0) {
			ar.pop();
		}
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
	getCellIndex : function (cell) {
		var c = $(cell);
		if (c.is('tr')) { return -1; }
		c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
		if ($.jgrid.msie) { return $.inArray(c, c.parentNode.cells); }
		return c.cellIndex;
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
	stripPref : function (pref, id) {
		var obj = $.type( pref );
		if( obj === "string" || obj === "number") {
			pref =  String(pref);
			id = pref !== "" ? String(id).replace(String(pref), "") : id;
		}
		return id;
	},
	parse : function(jsonString) {
		var js = jsonString;
		if (js.substr(0,9) === "while(1);") { js = js.substr(9); }
		if (js.substr(0,2) === "/*") { js = js.substr(2,js.length-4); }
		if(!js) { js = "{}"; }
		return ($.jgrid.useJSON===true && typeof JSON === 'object' && typeof JSON.parse === 'function') ?
			JSON.parse(js) :
			eval('(' + js + ')');
	},
	parseDate : function(format, date, newformat, opts) {
		var	token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		msDateRegExp = new RegExp("^\/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)\/$"),
		msMatch = ((typeof date === 'string') ? date.match(msDateRegExp): null),
		pad = function (value, length) {
			value = String(value);
			length = parseInt(length,10) || 2;
			while (value.length < length)  { value = '0' + value; }
			return value;
		},
		ts = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},
		timestamp=0, dM, k,hl,
		h12to24 = function(ampm, h){
			if (ampm === 0){ if (h === 12) { h = 0;} }
			else { if (h !== 12) { h += 12; } }
			return h;
		},
		offset =0;
		if(opts === undefined) {
			opts = $.jgrid.formatter.date;
		}
		// old lang files
		if(opts.parseRe === undefined ) {
			opts.parseRe = /[#%\\\/:_;.,\t\s-]/;
		}
		if( opts.masks.hasOwnProperty(format) ) { format = opts.masks[format]; }
		if(date && date != null) {
			if( !isNaN( date - 0 ) && String(format).toLowerCase() === "u") {
				//Unix timestamp
				timestamp = new Date( parseFloat(date)*1000 );
			} else if(date.constructor === Date) {
				timestamp = date;
				// Microsoft date format support
			} else if( msMatch !== null ) {
				timestamp = new Date(parseInt(msMatch[1], 10));
				if (msMatch[3]) {
					offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
					offset *= ((msMatch[4] === '-') ? 1 : -1);
					offset -= timestamp.getTimezoneOffset();
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			} else {
				//Support ISO8601Long that have Z at the end to indicate UTC timezone
				if(opts.srcformat === 'ISO8601Long' && date.charAt(date.length - 1) === 'Z') {
					offset -= (new Date()).getTimezoneOffset();
				}
				date = String(date).replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				format = format.replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				// parsing for month names
				for(k=0,hl=format.length;k<hl;k++){
					if(format[k] === 'M') {
						dM = $.inArray(date[k],opts.monthNames);
						if(dM !== -1 && dM < 12){date[k] = dM+1; ts.m = date[k];}
					}
					if(format[k] === 'F') {
						dM = $.inArray(date[k],opts.monthNames,12);
						if(dM !== -1 && dM > 11){date[k] = dM+1-12; ts.m = date[k];}
					}
					if(format[k] === 'a') {
						dM = $.inArray(date[k],opts.AmPm);
						if(dM !== -1 && dM < 2 && date[k] === opts.AmPm[dM]){
							date[k] = dM;
							ts.h = h12to24(date[k], ts.h);
						}
					}
					if(format[k] === 'A') {
						dM = $.inArray(date[k],opts.AmPm);
						if(dM !== -1 && dM > 1 && date[k] === opts.AmPm[dM]){
							date[k] = dM-2;
							ts.h = h12to24(date[k], ts.h);
						}
					}
					if (format[k] === 'g') {
						ts.h = parseInt(date[k], 10);
					}
					if(date[k] !== undefined) {
						ts[format[k].toLowerCase()] = parseInt(date[k],10);
					}
				}
				if(ts.f) {ts.m = ts.f;}
				if( ts.m === 0 && ts.y === 0 && ts.d === 0) {
					return "&#160;" ;
				}
				ts.m = parseInt(ts.m,10)-1;
				var ty = ts.y;
				if (ty >= 70 && ty <= 99) {ts.y = 1900+ts.y;}
				else if (ty >=0 && ty <=69) {ts.y= 2000+ts.y;}
				timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
				//Apply offset to show date as local time.
				if(offset > 0) {
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			}
		} else {
			timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
		}
		if(opts.userLocalTime && offset === 0) {
			offset -= (new Date()).getTimezoneOffset();
			if( offset > 0 ) {
				timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
			}
		}
		if( newformat === undefined ) {
			return timestamp;
		}
		if( opts.masks.hasOwnProperty(newformat) )  {
			newformat = opts.masks[newformat];
		} else if ( !newformat ) {
			newformat = 'Y-m-d';
		}
		var 
			G = timestamp.getHours(),
			i = timestamp.getMinutes(),
			j = timestamp.getDate(),
			n = timestamp.getMonth() + 1,
			o = timestamp.getTimezoneOffset(),
			s = timestamp.getSeconds(),
			u = timestamp.getMilliseconds(),
			w = timestamp.getDay(),
			Y = timestamp.getFullYear(),
			N = (w + 6) % 7 + 1,
			z = (new Date(Y, n - 1, j) - new Date(Y, 0, 1)) / 86400000,
			flags = {
				// Day
				d: pad(j),
				D: opts.dayNames[w],
				j: j,
				l: opts.dayNames[w + 7],
				N: N,
				S: opts.S(j),
				//j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th',
				w: w,
				z: z,
				// Week
				W: N < 5 ? Math.floor((z + N - 1) / 7) + 1 : Math.floor((z + N - 1) / 7) || ((new Date(Y - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
				// Month
				F: opts.monthNames[n - 1 + 12],
				m: pad(n),
				M: opts.monthNames[n - 1],
				n: n,
				t: '?',
				// Year
				L: '?',
				o: '?',
				Y: Y,
				y: String(Y).substring(2),
				// Time
				a: G < 12 ? opts.AmPm[0] : opts.AmPm[1],
				A: G < 12 ? opts.AmPm[2] : opts.AmPm[3],
				B: '?',
				g: G % 12 || 12,
				G: G,
				h: pad(G % 12 || 12),
				H: pad(G),
				i: pad(i),
				s: pad(s),
				u: u,
				// Timezone
				e: '?',
				I: '?',
				O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				P: '?',
				T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				Z: '?',
				// Full Date/Time
				c: '?',
				r: '?',
				U: Math.floor(timestamp / 1000)
			};
		return newformat.replace(token, function ($0) {
			return flags.hasOwnProperty($0) ? flags[$0] : $0.substring(1);
		});
	},
	jqID : function(sid){
		return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g,"\\$&");
	},
	getGridComponentId: function (componentName) {
		var self = this, id;
		if (self == null || self.p == null || !self.p.id) {
			return ""; // return empty string
		}
		id = self.p.id;
		switch (componentName) {
			case "grid":
				return id;
			case "gBox":
				return "gbox_" + id;
			case "gView":
				return "gview_" + id;
			case "alertMod": // footer/summary table
				return "alertmod_" + id;
			case "columnResizer":
				return "rs_m" + id;
			case "selectAlCheckbox":
				return "cb_" + id;
			case "searchOperationMenu":
				return "sopt_menu";
			default:
				return ""; // return empty string
		}
	},
	getGridComponentIdSelector: function (componentName) {
		var jgrid = $.jgrid, id = jgrid.getGridComponentId.call(this, componentName);
		return id ? "#" + jgrid.jqID(id) : "";
	},
	getGridComponent: function (componentName, $p, p1) {
		if (!($p instanceof jQuery) || $p.length == 0) {
			return $(); // return empty jQuery object
		}
		var p = $p[0];
		switch (componentName) {
			case "bTable": // get body table from bDiv
				return $p.hasClass("ui-jqgrid-bdiv") ? $p.find(">div>.ui-jqgrid-btable") : $();
			case "hTable": // header table from bHiv
				return $p.hasClass("ui-jqgrid-hdiv") ? $p.find(">div>.ui-jqgrid-htable") : $();
			case "fTable": // footer/summary table from sDiv
				return $p.hasClass("ui-jqgrid-sdiv") ? $p.find(">div>.ui-jqgrid-ftable") : $();
			case "bDiv":
				return $p.hasClass("ui-jqgrid-bdiv") && p.grid != null ? $(p.grid.bDiv) : $();
			case "hDiv":
				return $p.hasClass("ui-jqgrid-bdiv") && p.grid != null ? $(p.grid.hDiv) : $();
			case "sDiv":
				return $p.hasClass("ui-jqgrid-bdiv") && p.grid != null ? $(p.grid.sDiv) : $();
			case "colHeader": // p should be iCol
				return !isNaN(p1) && p.grid != null && p.grid.headers != null && p.grid.headers[p1] != null ? $(p.grid.headers[p1].el) : $();
			default:
				return $(); // return empty jQuery object
		}
	},
	guid : 1,
	uidPref: 'jqg',
	randId : function( prefix )	{
		return (prefix || $.jgrid.uidPref) + ($.jgrid.guid++);
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
	getXmlData: function (obj, expr, returnObj) {
		var ret, m = typeof expr === 'string' ? expr.match(/^(.*)\[(\w+)\]$/) : null;
		if (typeof expr === 'function') { return expr(obj); }
		if (m && m[2]) {
			// m[2] is the attribute selector
			// m[1] is an optional element selector
			// examples: "[id]", "rows[page]"
			return m[1] ? $(m[1], obj).attr(m[2]) : $(obj).attr(m[2]);
		}
			ret = $(expr, obj);
			if (returnObj) { return ret; }
			//$(expr, obj).filter(':last'); // we use ':last' to be more compatible with old version of jqGrid
			return ret.length > 0 ? $(ret).text() : undefined;
	},
	cellWidth : function () {
		var $testDiv = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
		testCell = $testDiv.appendTo("body")
			.find("td")
			.width();
		$testDiv.remove();
		return Math.abs(testCell-5) > 0.1;
	},
	cell_width : true,
	ajaxOptions: {},
	from : function(source){
		// Original Author Hugo Bonacci
		// License MIT http://jlinq.codeplex.com/license
		var QueryObject=function(d,q){
		if(typeof d==="string"){
			d=$.data(d);
		}
		var self=this,
		_data=d,
		_usecase=true,
		_trim=false,
		_query=q,
		_stripNum = /[\$,%]/g,
		_lastCommand=null,
		_lastField=null,
		_orDepth=0,
		_negate=false,
		_queuedOperator="",
		_sorting=[],
		_useProperties=true;
		if(typeof d==="object"&&d.push) {
			if(d.length>0){
				if(typeof d[0]!=="object"){
					_useProperties=false;
				}else{
					_useProperties=true;
				}
			}
		}else{
			throw "data provides is not an array";
		}
		this._hasData=function(){
			return _data===null?false:_data.length===0?false:true;
		};
		this._getStr=function(s){
			var phrase=[];
			if(_trim){
				phrase.push("jQuery.trim(");
			}
			phrase.push("String("+s+")");
			if(_trim){
				phrase.push(")");
			}
			if(!_usecase){
				phrase.push(".toLowerCase()");
			}
			return phrase.join("");
		};
		this._strComp=function(val){
			if(typeof val==="string"){
				return".toString()";
			}
			return"";
		};
		this._group=function(f,u){
			return({field:f.toString(),unique:u,items:[]});
		};
		this._toStr=function(phrase){
			if(_trim){
				phrase=$.trim(phrase);
			}
			phrase=phrase.toString().replace(/\\/g,'\\\\').replace(/\"/g,'\\"');
			return _usecase ? phrase : phrase.toLowerCase();
		};
		this._funcLoop=function(func){
			var results=[];
			$.each(_data,function(i,v){
				results.push(func(v));
			});
			return results;
		};
		this._append=function(s){
			var i;
			if(_query===null){
				_query="";
			} else {
				_query+=_queuedOperator === "" ? " && " :_queuedOperator;
			}
			for (i=0;i<_orDepth;i++){
				_query+="(";
			}
			if(_negate){
				_query+="!";
			}
			_query+="("+s+")";
			_negate=false;
			_queuedOperator="";
			_orDepth=0;
		};
		this._setCommand=function(f,c){
			_lastCommand=f;
			_lastField=c;
		};
		this._resetNegate=function(){
			_negate=false;
		};
		this._repeatCommand=function(f,v){
			if(_lastCommand===null){
				return self;
			}
			if(f!==null&&v!==null){
				return _lastCommand(f,v);
			}
			if(_lastField===null){
				return _lastCommand(f);
			}
			if(!_useProperties){
				return _lastCommand(f);
			}
			return _lastCommand(_lastField,f);
		};
		this._equals=function(a,b){
			return(self._compare(a,b,1)===0);
		};
		this._compare=function(a,b,d){
			var toString = Object.prototype.toString;
			if( d === undefined) { d = 1; }
			if(a===undefined) { a = null; }
			if(b===undefined) { b = null; }
			if(a===null && b===null){
				return 0;
			}
			if(a===null&&b!==null){
				return 1;
			}
			if(a!==null&&b===null){
				return -1;
			}
			if (toString.call(a) === '[object Date]' && toString.call(b) === '[object Date]') {
				if (a < b) { return -d; }
				if (a > b) { return d; }
				return 0;
			}
			if(!_usecase && typeof a !== "number" && typeof b !== "number" ) {
				a=String(a);
				b=String(b);
			}
			if(a<b){return -d;}
			if(a>b){return d;}
			return 0;
		};
		this._performSort=function(){
			if(_sorting.length===0){return;}
			_data=self._doSort(_data,0);
		};
		this._doSort=function(d,q){
			var by=_sorting[q].by,
			dir=_sorting[q].dir,
			type = _sorting[q].type,
			dfmt = _sorting[q].datefmt,
			sfunc = _sorting[q].sfunc;
			if(q===_sorting.length-1){
				return self._getOrder(d, by, dir, type, dfmt, sfunc);
			}
			q++;
			var values=self._getGroup(d,by,dir,type,dfmt), results=[], i, j, sorted;
			for(i=0;i<values.length;i++){
				sorted=self._doSort(values[i].items,q);
				for(j=0;j<sorted.length;j++){
					results.push(sorted[j]);
				}
			}
			return results;
		};
		this._getOrder=function(data,by,dir,type, dfmt, sfunc){
			var sortData=[],_sortData=[], newDir = dir==="a" ? 1 : -1, i,ab,j,
			findSortKey;

			if(type === undefined ) { type = "text"; }
			if (type === 'float' || type=== 'number' || type=== 'currency' || type=== 'numeric') {
				findSortKey = function($cell) {
					var key = parseFloat( String($cell).replace(_stripNum, ''));
					return isNaN(key) ? Number.NEGATIVE_INFINITY : key;
				};
			} else if (type==='int' || type==='integer') {
				findSortKey = function($cell) {
					return $cell ? parseFloat(String($cell).replace(_stripNum, '')) : Number.NEGATIVE_INFINITY;
				};
			} else if(type === 'date' || type === 'datetime') {
				findSortKey = function($cell) {
					return $.jgrid.parseDate(dfmt,$cell).getTime();
				};
			} else if($.isFunction(type)) {
				findSortKey = type;
			} else {
				findSortKey = function($cell) {
					$cell = $cell ? $.trim(String($cell)) : "";
					return _usecase ? $cell : $cell.toLowerCase();
				};
			}
			$.each(data,function(i,v){
				ab = by!=="" ? $.jgrid.getAccessor(v,by) : v;
				if(ab === undefined) { ab = ""; }
				ab = findSortKey(ab, v);
				_sortData.push({ 'vSort': ab,'index':i});
			});
			if($.isFunction(sfunc)) {
				_sortData.sort(function(a,b){
					a = a.vSort;
					b = b.vSort;
					return sfunc.call(this,a,b,newDir);
				});
			} else {
				_sortData.sort(function(a,b){
					a = a.vSort;
					b = b.vSort;
					return self._compare(a,b,newDir);
				});
			}
			j=0;
			var nrec= data.length;
			// overhead, but we do not change the original data.
			while(j<nrec) {
				i = _sortData[j].index;
				sortData.push(data[i]);
				j++;
			}
			return sortData;
		};
		this._getGroup=function(data,by,dir,type, dfmt){
			var results=[],
			group=null,
			last=null;
			$.each(self._getOrder(data,by,dir,type, dfmt),function(i,v){
				var val = $.jgrid.getAccessor(v, by);
				if(val == null) { val = ""; }
				if(!self._equals(last,val)){
					last=val;
					if(group !== null){
						results.push(group);
					}
					group=self._group(by,val);
				}
				group.items.push(v);
			});
			if(group !== null){
				results.push(group);
			}
			return results;
		};
		this.ignoreCase=function(){
			_usecase=false;
			return self;
		};
		this.useCase=function(){
			_usecase=true;
			return self;
		};
		this.trim=function(){
			_trim=true;
			return self;
		};
		this.noTrim=function(){
			_trim=false;
			return self;
		};
		this.execute=function(){
			var match=_query, results=[];
			if(match === null){
				return self;
			}
			$.each(_data,function(){
				if(eval(match)){results.push(this);}
			});
			_data=results;
			return self;
		};
		this.data=function(){
			return _data;
		};
		this.select=function(f){
			self._performSort();
			if(!self._hasData()){ return[]; }
			self.execute();
			if($.isFunction(f)){
				var results=[];
				$.each(_data,function(i,v){
					results.push(f(v));
				});
				return results;
			}
			return _data;
		};
		this.hasMatch=function(){
			if(!self._hasData()) { return false; }
			self.execute();
			return _data.length>0;
		};
		this.andNot=function(f,v,x){
			_negate=!_negate;
			return self.and(f,v,x);
		};
		this.orNot=function(f,v,x){
			_negate=!_negate;
			return self.or(f,v,x);
		};
		this.not=function(f,v,x){
			return self.andNot(f,v,x);
		};
		this.and=function(f,v,x){
			_queuedOperator=" && ";
			if(f===undefined){
				return self;
			}
			return self._repeatCommand(f,v,x);
		};
		this.or=function(f,v,x){
			_queuedOperator=" || ";
			if(f===undefined) { return self; }
			return self._repeatCommand(f,v,x);
		};
		this.orBegin=function(){
			_orDepth++;
			return self;
		};
		this.orEnd=function(){
			if (_query !== null){
				_query+=")";
			}
			return self;
		};
		this.isNot=function(f){
			_negate=!_negate;
			return self.is(f);
		};
		this.is=function(f){
			self._append('this.'+f);
			self._resetNegate();
			return self;
		};
		this._compareValues=function(func,f,v,how,t){
			var fld;
			if(_useProperties){
				fld='jQuery.jgrid.getAccessor(this,\''+f+'\')';
			}else{
				fld='this';
			}
			if(v===undefined) { v = null; }
			//var val=v===null?f:v,
			var val =v,
			swst = t.stype === undefined ? "text" : t.stype;
			if(v !== null) {
			switch(swst) {
				case 'int':
				case 'integer':
					val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
					fld = 'parseInt('+fld+',10)';
					val = 'parseInt('+val+',10)';
					break;
				case 'float':
				case 'number':
				case 'numeric':
					val = String(val).replace(_stripNum, '');
					val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
					fld = 'parseFloat('+fld+')';
					val = 'parseFloat('+val+')';
					break;
				case 'date':
				case 'datetime':
					val = String($.jgrid.parseDate(t.newfmt || 'Y-m-d',val).getTime());
					fld = 'jQuery.jgrid.parseDate("'+t.srcfmt+'",'+fld+').getTime()';
					break;
				default :
					fld=self._getStr(fld);
					val=self._getStr('"'+self._toStr(val)+'"');
			}
			}
			self._append(fld+' '+how+' '+val);
			self._setCommand(func,f);
			self._resetNegate();
			return self;
		};
		this.equals=function(f,v,t){
			return self._compareValues(self.equals,f,v,"==",t);
		};
		this.notEquals=function(f,v,t){
			return self._compareValues(self.equals,f,v,"!==",t);
		};
		this.isNull = function(f,v,t){
			return self._compareValues(self.equals,f,null,"===",t);
		};
		this.greater=function(f,v,t){
			return self._compareValues(self.greater,f,v,">",t);
		};
		this.less=function(f,v,t){
			return self._compareValues(self.less,f,v,"<",t);
		};
		this.greaterOrEquals=function(f,v,t){
			return self._compareValues(self.greaterOrEquals,f,v,">=",t);
		};
		this.lessOrEquals=function(f,v,t){
			return self._compareValues(self.lessOrEquals,f,v,"<=",t);
		};
		this.startsWith=function(f,v){
			var val = (v==null) ? f: v,
			length=_trim ? $.trim(val.toString()).length : val.toString().length;
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(v)+'"'));
			}else{
				if (v!=null) { length=_trim?$.trim(v.toString()).length:v.toString().length; }
				self._append(self._getStr('this')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(f)+'"'));
			}
			self._setCommand(self.startsWith,f);
			self._resetNegate();
			return self;
		};
		this.endsWith=function(f,v){
			var val = (v==null) ? f: v,
			length=_trim ? $.trim(val.toString()).length:val.toString().length;
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr('+self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.length-'+length+','+length+') == "'+self._toStr(v)+'"');
			} else {
				self._append(self._getStr('this')+'.substr('+self._getStr('this')+'.length-"'+self._toStr(f)+'".length,"'+self._toStr(f)+'".length) == "'+self._toStr(f)+'"');
			}
			self._setCommand(self.endsWith,f);self._resetNegate();
			return self;
		};
		this.contains=function(f,v){
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.indexOf("'+self._toStr(v)+'",0) > -1');
			}else{
				self._append(self._getStr('this')+'.indexOf("'+self._toStr(f)+'",0) > -1');
			}
			self._setCommand(self.contains,f);
			self._resetNegate();
			return self;
		};
		this.groupBy=function(by,dir,type, datefmt){
			if(!self._hasData()){
				return null;
			}
			return self._getGroup(_data,by,dir,type, datefmt);
		};
		this.orderBy=function(by,dir,stype, dfmt, sfunc){
			dir = dir == null ? "a" :$.trim(dir.toString().toLowerCase());
			if(stype == null) { stype = "text"; }
			if(dfmt == null) { dfmt = "Y-m-d"; }
			if(sfunc == null) { sfunc = false; }
			if(dir==="desc"||dir==="descending"){dir="d";}
			if(dir==="asc"||dir==="ascending"){dir="a";}
			_sorting.push({by:by,dir:dir,type:stype, datefmt: dfmt, sfunc: sfunc});
			return self;
		};
		return self;
		};
	return new QueryObject(source,null);
	},
	feedback: function (callbackName) {
		var self = this;
		if (self instanceof jQuery && self.length > 0) {
			self = self[0];
		}
		if (self.p == null || typeof callbackName !== "string" || callbackName.length < 2) {
			return null; // incorrect call
		}
		// onSortCol -> jqGridSortCol, onSelectAll -> jqGridSelectAll, ondblClickRow -> jqGridDblClickRow
		// resizeStop -> jqGridResizeStop
		var eventName = callbackName.substring(0, 1) === "on"?
				"jqGrid" + callbackName.charAt(2).toUpperCase() + callbackName.substring(3):
				"jqGrid" + callbackName.charAt(0).toUpperCase() + callbackName.substring(1),
			args = $.makeArray(arguments).slice(1),
			callback = self.p[callbackName];

		var result = $(self).triggerHandler(eventName, args);
		result = (result === false || result === "stop") ? false : true;

		if ($.isFunction(callback)) {
			var callbackResult = callback.apply(self, args);
			if (callbackResult === false || callbackResult === 'stop') {
				result = false;
			 }
		}
		return result;
	},
	getMethod: function (name) {
        return this.getAccessor($.fn.jqGrid, name);
	},
	extend : function(methods) {
		$.extend($.fn.jqGrid,methods);
		if (!this.no_legacy_api) {
			$.fn.extend(methods);
		}
	}
});

$.fn.jqGrid = function( pin ) {
	if (typeof pin === 'string') {
		var fn = $.jgrid.getMethod(pin);
		if (!fn) {
			throw ("jqGrid - No such method: " + pin);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}
	return this.each( function() {
		if(this.grid) {return;}
		var ts = this, localData, jgrid = $.jgrid, clearArray = jgrid.clearArray, feedback = jgrid.feedback,
		getGridComponentIdSelector = jgrid.getGridComponentIdSelector, getGridComponentId = jgrid.getGridComponentId,
		getGridComponent = jgrid.getGridComponent,
		jqID = jgrid.jqID, getAccessor = jgrid.getAccessor,	stripPref = jgrid.stripPref, getCellIndex = jgrid.getCellIndex,
		fatalErrorFunction = jgrid.defaults != null && $.isFunction(jgrid.defaults.fatalError) ? jgrid.defaults.fatalError : alert;
		if (pin != null && pin.data !== undefined) {
			localData = pin.data;
			pin.data = []; // don't clear the array, just change the value of data property
		}
		if (jgrid.defaults == null) {
			//fatalErrorFunction("FATAL ERROR!!!\n\nthe locale file \"grid.locale-en.js\" or other are not included. It should be included before jquery.jqGrid.min.js\n");
			//return;
			
			// set English options only if no grid.locale-XX.js file are included.
			$.extend(true, $.jgrid, englishLanguageDefaults);
		}
		if (jgrid.formatter == null || jgrid.formatter.unused == null) {
			// detect old locale file grid.locale-XX.js are included (without DEEP extend).
			fatalErrorFunction("CRITICAL ERROR!!!\n\n\nOne uses probably\n\n	$.extend($.jgrid.defaults, {...});\n\nto set default settings of jqGrid instead of the usage the DEEP version of jQuery.extend (with true as the first parameter):\n\n	$.extend(true, $.jgrid.defaults, {...});\n\nOne other possible reason:\n\nyou included some OLD version of language file (grid.locale-en.js for example) AFTER jquery.jqGrid.min.js. For example all language files of jqGrid 4.7.0 uses non-deep call of jQuery.extend.\n\n\nSome options of jqGrid could still work, but another one will be broken.");
		}
		if (pin != null) {
			if (pin.datatype === undefined && pin.dataType !== undefined) {
				// fix the bug in the usage of dataType instead of datatype
				pin.datatype = pin.dataType;
				delete pin.dataType;
			}
			if (pin.mtype === undefined && pin.type !== undefined) {
				// fix the bug in the usage of type instead of mtype
				pin.mtype = pin.type;
				delete pin.type;
			}
		}

		var p = $.extend(true,{
			url: "",
			height: "auto",
			page: 1,
			rowNum: 20,
			maxRowNum: 10000,
			autoresizeOnLoad: false,
			autoResizing: {
				wrapperClassName: "ui-jqgrid-cell-wrapper",
				widthOfVisiblePartOfSortIcon: 12,
				minColWidth: 33,
				maxColWidth: 300,
				adjustGridWidth: true, // shrinkToFit and widthOrg (no width option or width:"auto" during jqGrid creation will be detected) will be used additionally with adjustGridWidth
				compact: false,
				fixWidthOnShrink: false
			},
			doubleClickSensitivity: 250,
			rowTotal : null,
			records: 0,
			pager: "",
			pgbuttons: true,
			pginput: true,
			colModel: [],
			rowList: [],
			colNames: [],
			sortorder: "asc",
			sortname: "",
			//datatype: "xml",
			mtype: "GET",
			altRows: false,
			selarrrow: [],
			savedRow: [],
			shrinkToFit: true,
			xmlReader: {},
			jsonReader: {},
			subGrid: false,
			subGridModel :[],
			reccount: 0,
			lastpage: 0,
			lastsort: 0,
			selrow: null,
			beforeSelectRow: null,
			onSelectRow: null,
			onSortCol: null,
			ondblClickRow: null,
			onRightClickRow: null,
			onPaging: null,
			onSelectAll: null,
			onInitGrid : null,
			loadComplete: null,
			gridComplete: null,
			loadError: null,
			loadBeforeSend: null,
			afterInsertRow: null,
			beforeRequest: null,
			beforeProcessing : null,
			onHeaderClick: null,
			viewrecords: false,
			loadonce: false,
			multiselect: false,
			multikey: false,
			editurl: "clientArray",
			search: false,
			caption: "",
			hidegrid: true,
			hiddengrid: false,
			postData: {},
			userData: {},
			treeGrid : false,
			treeGridModel : 'nested',
			treeReader : {},
			treeANode : -1,
			ExpandColumn: null,
			tree_root_level : 0,
			prmNames: {page:"page",rows:"rows", sort: "sidx",order: "sord", search:"_search", nd:"nd", id:"id",oper:"oper",editoper:"edit",addoper:"add",deloper:"del", subgridid:"id", npage: null, totalrows:"totalrows"},
			forceFit : false,
			gridstate : "visible",
			cellEdit: false,
			cellsubmit: "clientArray",
			nv:0,
			loadui: "enable",
			toolbar: [false,""],
			scroll: false,
			multiboxonly : false,
			deselectAfterSort : true,
			scrollrows : false,
			autowidth: false,
			scrollOffset :18,
			cellLayout: 5,
			subGridWidth: 20,
			multiselectWidth: 20,
			gridview: true,
			rownumWidth: 25,
			rownumbers : false,
			pagerpos: 'center',
			recordpos: 'right',
			footerrow : false,
			userDataOnFooter : false,
			hoverrows : true,
			altclass : 'ui-priority-secondary',
			viewsortcols : [false,'vertical',true],
			resizeclass : '',
			autoencode : true,
			remapColumns : [],
			ajaxGridOptions :{},
			direction : "ltr",
			toppager: false,
			headertitles: false,
			scrollTimeout: 40,
			data : [],
			lastSelectedData : [],
			_index : {},
			grouping : false,
			groupingView : {groupField:[],groupOrder:[], groupText:[],groupColumnShow:[],groupSummary:[], showSummaryOnHide: false, sortitems:[], sortnames:[], summary:[],summaryval:[], plusicon: 'ui-icon-circlesmall-plus', minusicon: 'ui-icon-circlesmall-minus', displayField: [], groupSummaryPos:[], formatDisplayField : [], _locgr : false},
			ignoreCase : false,
			cmTemplate : {},
			idPrefix : "",
			multiSort :  false
		},
		// if no datatype is specified, but data option exist then use datatype: "local" else "xml"
		pin == null || pin.datatype !== undefined ? {} : // if datatype is specified explicitly
			localData !== undefined || pin.url == null ? { datatype: "local" } : // no url is specified or data is explicitly specified
			pin.jsonReader != null && typeof pin.jsonReader === "object" ? { datatype: "json" } : { datatype: "xml" },
		jgrid.defaults, pin || {});
		if (localData !== undefined) {
			p.data = localData;
			pin.data = localData;
		}
		if(ts.tagName.toUpperCase() !== 'TABLE') {
			fatalErrorFunction("Element is not a table!");
			return;
		}
		if (ts.id == "") {
			$(ts).attr("id", jgrid.randId());
		}
		if(document.documentMode !== undefined ) { // IE only
			if(document.documentMode <= 5) {
				fatalErrorFunction("Grid can not be used in this ('quirks') mode!");
				return;
			}
		}
		$(ts).empty().attr("tabindex","0");
		ts.p = p;
		p.id = ts.id;
		p.idSel = "#" + jgrid.jqID(ts.id);
		p.gBoxId = getGridComponentId.call(ts, "gBox");   // gbox id like "gbox_list" or "gbox_my.list"
		p.gBox = getGridComponentIdSelector.call(ts, "gBox");   // gbox selector like "#gbox_list" or "#gbox_my\\.list"
		p.gViewId = getGridComponentId.call(ts, "gView"); // gview id like "gview_list" or "gview_my.list"
		p.gView = getGridComponentIdSelector.call(ts, "gView"); // gview selector like "#gview_list" or "#gview_my\\.list"
		p.rsId = getGridComponentId.call(ts, "columnResizer"); // vertical div inside of gbox which will be seen on resizing of columns
		p.rs = getGridComponentIdSelector.call(ts, "columnResizer"); // vertical div inside of gbox which will be seen on resizing of columns
		p.cbId = getGridComponentId.call(ts, "selectAlCheckbox"); // "cb_" +id
		p.cb = getGridComponentIdSelector.call(ts, "selectAlCheckbox"); // "cb_" +id
		p.useProp = !!$.fn.prop;
		p.propOrAttr = p.useProp ? 'prop' : 'attr';

		var propOrAttr = p.propOrAttr,
		myResizerClickHandler = function (e) {
			var pageX = $(this).data("pageX");
			if (pageX) {
				pageX = String(pageX).split(";");
				pageX = pageX[pageX.length - 1];
				$(this).data("pageX", pageX + ";" + e.pageX);
			} else {
				$(this).data("pageX", e.pageX);
			}
		},
		grid = {
			headers:[],
			cols:[],
			footers: [],
			dragStart: function(i,x,y) {
				var self = this, $bDiv = $(self.bDiv), gridLeftPos = $bDiv.offset().left;
				self.resizing = { idx: i, startX: x.pageX, sOL : x.pageX - gridLeftPos, moved: false };
				self.hDiv.style.cursor = "col-resize";
				self.curGbox = $(p.rs,p.gBox);
				self.curGbox.css({display:"block",left:x.pageX-gridLeftPos,top:y[1],height:y[2]});
				self.curGbox.data("idx",i);
				myResizerClickHandler.call(this.curGbox, x);
				feedback.call(getGridComponent("bTable", $bDiv), "resizeStart", x, i);
				document.onselectstart=function(){return false;};
			},
			dragMove: function(x) {
				var self = this, resizing = self.resizing;
				if(resizing) {
					var diff = x.pageX-resizing.startX, headers = self.headers,
					h = headers[resizing.idx],
					newWidth = p.direction === "ltr" ? h.width + diff : h.width - diff, hn, nWn;
					resizing.moved = true;
					if(newWidth > 33) {
						if (self.curGbox == null) {
							self.curGbox = $(p.rs,p.gBox);
						}
						self.curGbox.css({left:resizing.sOL+diff});
						if(p.forceFit===true ){
							hn = headers[resizing.idx+p.nv];
							nWn = p.direction === "ltr" ? hn.width - diff : hn.width + diff;
							if(nWn > p.autoResizing.minColWidth ) {
								h.newWidth = newWidth;
								hn.newWidth = nWn;
							}
						} else {
							self.newWidth = p.direction === "ltr" ? p.tblwidth+diff : p.tblwidth-diff;
							h.newWidth = newWidth;
						}
					}
				}
			},
			resizeColumn: function (idx, ts, skipCallbacks) {
				var self = this, headers = self.headers, footers = self.footers, h = headers[idx], hn, nw = h.newWidth || h.width;
				nw = parseInt(nw,10);
				p.colModel[idx].width = nw;
				h.width = nw;
				h.el.style.width = nw + "px";
				self.cols[idx].style.width = nw+"px";
				if(footers.length>0) {footers[idx].style.width = nw+"px";}
				if(p.forceFit===true){
					hn = headers[idx+p.nv]; // next visible th
					nw = hn.newWidth || hn.width;
					hn.width = nw;
					hn.el.style.width = nw + "px";
					self.cols[idx+p.nv].style.width = nw+"px";
					if(footers.length>0) {footers[idx+p.nv].style.width = nw+"px";}
					p.colModel[idx+p.nv].width = nw;
				} else {
					p.tblwidth = self.newWidth || p.tblwidth;
					getGridComponent("bTable", $(self.bDiv)).css("width",p.tblwidth+"px");
					getGridComponent("hTable", $(self.hDiv)).css("width",p.tblwidth+"px");
					self.hDiv.scrollLeft = self.bDiv.scrollLeft;
					if(p.footerrow) {
						getGridComponent("fTable", $(self.sDiv)).css("width",p.tblwidth+"px");
						self.sDiv.scrollLeft = self.bDiv.scrollLeft;
					}
				}
				if (!skipCallbacks) {
					feedback.call(ts, "resizeStop", nw, idx);
				}
			},
			dragEnd: function() {
				var self = this;
				self.hDiv.style.cursor = "default";
				if(self.resizing) {
					if (self.resizing !== null && self.resizing.moved === true) {
						self.resizeColumn(self.resizing.idx, getGridComponent("bTable", $(self.bDiv)));
					}
					$(p.rs).removeData("pageX");
					self.resizing = false;
					setTimeout(function () {
						$(p.rs).css("display","none");
					}, p.doubleClickSensitivity);
				}
				self.curGbox = null;
				document.onselectstart=function(){return true;};
			},
			populateVisible: function() {
				var self = this, $self = $(self), gridSelf = self.grid, bDiv = gridSelf.bDiv, $bDiv = $(bDiv);
				if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
				gridSelf.timer = null;
				var dh = $bDiv.height();
				if (!dh) { return; }
				var firstDataRow, rh;
				if(self.rows.length) {
					try {
						firstDataRow = self.rows[1]; // self.rows[0] is cols row (the first row (.jqgfirstrow)) used only to set column width
						rh = firstDataRow ? $(firstDataRow).outerHeight() || gridSelf.prevRowHeight : gridSelf.prevRowHeight;
					} catch (pv) {
						rh = gridSelf.prevRowHeight;
					}
				}
				if (!rh) { return; }
				gridSelf.prevRowHeight = rh;
				var rn = p.rowNum;
				gridSelf.scrollTop = bDiv.scrollTop;
				var scrollTop = gridSelf.scrollTop;
				var ttop = Math.round($self.position().top) - scrollTop;
				var tbot = ttop + $self.height();
				var div = rh * rn;
				var page, npage, empty;
				if ( tbot < dh && ttop <= 0 &&
					(p.lastpage===undefined||(parseInt((tbot + scrollTop + div - 1) / div,10) || 0) <= p.lastpage))
				{
					npage = parseInt((dh - tbot + div - 1) / div,10) || 1;
					if (tbot >= 0 || npage < 2 || p.scroll === true) {
						page = ( Math.round((tbot + scrollTop) / div) || 0) + 1;
						ttop = -1;
					} else {
						ttop = 1;
					}
				}
				if (ttop > 0) {
					page = ( parseInt(scrollTop / div,10) || 0 ) + 1;
					npage = (parseInt((scrollTop + dh) / div,10) || 0) + 2 - page;
					empty = true;
				}
				if (npage) {
					if (p.lastpage && (page > p.lastpage || p.lastpage===1 || (page === p.page && page===p.lastpage)) ) {
						return;
					}
					if (gridSelf.hDiv.loading) {
						gridSelf.timer = setTimeout(function () {gridSelf.populateVisible.call(self);}, p.scrollTimeout);
					} else {
						p.page = page;
						if (empty) {
							gridSelf.selectionPreserver.call(self);
							gridSelf.emptyRows.call(self, false, false);
						}
						gridSelf.populate.call(self,npage);
					}
				}
			},
			scrollGrid: function(e) { // this maus be bDiv
				// TODO get ts from this bDiv
				var bDiv = this, $bTable = getGridComponent("bTable", $(this)), gridSelf;
				if (e) { e.stopPropagation(); }
				if ($bTable.length == 0) { return true; }
				gridSelf = $bTable[0].grid;
				if (p.scroll) {
					var scrollTop = bDiv.scrollTop;
					// save last scrollTop of bDiv as property of grid object
					if (gridSelf.scrollTop === undefined) { gridSelf.scrollTop = 0; }
					if (scrollTop !== gridSelf.scrollTop) {
						gridSelf.scrollTop = scrollTop;
						if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
						gridSelf.timer = setTimeout(function () {gridSelf.populateVisible.call($bTable[0]);}, p.scrollTimeout);
					}
				}
				gridSelf.hDiv.scrollLeft = bDiv.scrollLeft;
				if(p.footerrow) {
					gridSelf.sDiv.scrollLeft = bDiv.scrollLeft;
				}
			},
			selectionPreserver : function() {
				var self = this, $self = $(self), sr = p.selrow, sra = p.selarrrow ? $.makeArray(p.selarrrow) : null,
				bDiv = self.grid.bDiv, left = bDiv.scrollLeft,
				restoreSelection = function() {
					var i;
					p.selrow = null;
					clearArray(p.selarrrow); // p.selarrrow = [];
					if(p.multiselect && sra && sra.length>0) {
						for(i=0;i<sra.length;i++){
							if (sra[i] !== sr) {
								$self.jqGrid("setSelection",sra[i],false, null);
							}
						}
					}
					if (sr) {
						$self.jqGrid("setSelection",sr,false,null);
					}
					bDiv.scrollLeft = left;
					$self.unbind('.selectionPreserver', restoreSelection);
				};
				$self.bind('jqGridGridComplete.selectionPreserver', restoreSelection);				
			}
		};
		ts.grid = grid;

		var iCol, dir;
		if(p.colNames.length === 0) {
			for (iCol=0;iCol<p.colModel.length;iCol++){
				p.colNames[iCol] = p.colModel[iCol].label || p.colModel[iCol].name;
			}
		}
		if( p.colNames.length !== p.colModel.length ) {
			fatalErrorFunction(jgrid.errors.model);
			return;
		}
		var gv = $("<div class='ui-jqgrid-view' role='grid' aria-multiselectable='" + !!p.multiselect +"'></div>"),
		isMSIE = jgrid.msie,
		isMSIE8 = isMSIE && jgrid.msiever() < 8;
		p.direction = $.trim(p.direction.toLowerCase());
		if($.inArray(p.direction,["ltr","rtl"]) === -1) { p.direction = "ltr"; }
		dir = p.direction;

		$(gv).insertBefore(this);
		$(this).removeClass("scroll").appendTo(gv);
		var eg = $("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
		$(eg).attr({"id": p.gBoxId,"dir": dir}).insertBefore(gv);
		$(gv).attr("id", p.gViewId).appendTo(eg);
		$("<div class='ui-widget-overlay jqgrid-overlay' id='lui_"+this.id+"'></div>").insertBefore(gv);
		$("<div class='loading ui-state-default ui-state-active' id='load_"+this.id+"'>"+p.loadtext+"</div>").insertBefore(gv);
		$(this).attr({cellspacing:"0",cellpadding:"0",border:"0","role":"presentation","aria-labelledby":"gbox_"+this.id});
		var sortkeys = ["shiftKey","altKey","ctrlKey"],
		intNum = function(val,defval) {
			val = parseInt(val,10);
			if (isNaN(val)) { return defval || 0;}
			return val;
		},
		formatCol = function (pos, rowInd, tv, rawObject, rowId, rdata){
			var cm = p.colModel[pos], cellAttrFunc,
			ral = cm.align, result="style=\"", clas = cm.classes, nm = cm.name, celp, acp=[];
			if(ral) { result += "text-align:"+ral+";"; }
			if(cm.hidden===true) { result += "display:none;"; }
			if(rowInd===0) {
				result += "width: "+grid.headers[pos].width+"px;";
			} else if ($.isFunction(cm.cellattr) || (typeof cm.cellattr === "string" && jgrid.cellattr != null && $.isFunction(jgrid.cellattr[cm.cellattr]))) {
				cellAttrFunc = $.isFunction(cm.cellattr) ? cm.cellattr : jgrid.cellattr[cm.cellattr];
				celp = cellAttrFunc.call(ts, rowId, tv, rawObject, cm, rdata);
				if(celp && typeof celp === "string") {
					celp = celp.replace(/style/i,'style').replace(/title/i,'title');
					if(celp.indexOf('title') > -1) { cm.title=false;}
					if(celp.indexOf('class') > -1) { clas = undefined;}
					acp = celp.replace(/\-style/g,'-sti').split(/style/);
					if(acp.length === 2 ) {
						acp[1] =  $.trim(acp[1].replace(/\-sti/g,'-style').replace("=",""));
						if(acp[1].indexOf("'") === 0 || acp[1].indexOf('"') === 0) {
							acp[1] = acp[1].substring(1);
						}
						result += acp[1].replace(/'/gi,'"');
					} else {
						result += "\"";
					}
				}
			}
			if(!acp.length) { acp[0] = ""; result += "\"";}
			result += (clas !== undefined ? (" class=\""+clas+"\"") :"") + ((cm.title && tv) ? (" title=\""+jgrid.stripHtml(tv)+"\"") :"");
			result += " aria-describedby=\""+p.id+"_"+nm+"\"";
			return result + acp[0];
		},
		cellVal =  function (val) {
			return val == null || val === "" ? "&#160;" : (p.autoencode ? jgrid.htmlEncode(val) : String(val));
		},
		formatter = function (rowId, cellval, colpos, rwdat, _act){
			var cm = p.colModel[colpos];
			if(cm.formatter !== undefined) {
                            rowId = String(p.idPrefix) !== "" ? stripPref(p.idPrefix, rowId) : rowId;
                            var opts= {rowId: rowId, colModel:cm, gid:p.id, pos:colpos };
                            if($.isFunction( cm.formatter ) ) {
                                return cm.formatter.call(ts,cellval,opts,rwdat,_act);
                            } else if($.fmatter){
                                return $.fn.fmatter.call(ts,cm.formatter,cellval,opts,rwdat,_act);
                            }
			} else if(cm.name === p.jsonReader.id){
                            return String(p.idPrefix) !== "" ? $.jgrid.stripPref(p.idPrefix, rowId) : rowId;
			}
			return cm.autoResizable && cm.formatter !== "actions" ? "<span class='" + p.autoResizing.wrapperClassName + "'>" + cellVal(cellval) + "</span>" : cellVal(cellval);
		},
		addCell = function(rowId,cell,pos,irow, srvr, rdata) {
			var v = formatter(rowId,cell,pos,srvr,'add');
			return "<td role=\"gridcell\" "+formatCol( pos,irow, v, srvr, rowId, rdata)+">"+v+"</td>";
		},
		addMulti = function(rowid,pos,irow,checked){
			var	v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+p.id+"_"+rowid+"\" class=\"cbox\" name=\"jqg_"+p.id+"_"+rowid+"\"" + (checked ? " checked=\"checked\" aria-checked=\"true\"" : " aria-checked=\"false\"")+"/>";
			return "<td role=\"gridcell\" "+
				formatCol(pos,irow,'',null, rowid, true)+">"+v+"</td>";
		},
		addRowNum = function (pos,irow,pG,rN) {
			var v = (parseInt(pG,10)-1)*parseInt(rN,10)+1+irow;
			return "<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+
				formatCol(pos,irow,v, null, irow, true)+">"+v+"</td>";
		},
		reader = function (datatype) {
			var field, f=[], j=0, i, colModel = p.colModel, nCol = colModel.length;
			for(i=0; i<nCol; i++){
				field = colModel[i];
				if (field.name !== 'cb' && field.name !=='subgrid' && field.name !=='rn') {
					f[j] = (datatype === "xml" || datatype === "xmlstring") ?
							field.xmlmap || field.name :
							(datatype === "local" && !p.dataTypeOrg ? field.jsonmap || field.name : field.name);
					if(p.keyName !== false && field.key===true ) {
						p.keyName = f[j];
					}
					j++;
				}
			}
			return f;
		},
		orderedCols = function (offset) {
			var order = p.remapColumns;
			if (!order || !order.length) {
				order = $.map(p.colModel, function(v,i) { return i; });
			}
			if (offset) {
				order = $.map(order, function(v) { return v<offset?null:v-offset; });
			}
			return order;
		},
		emptyRows = function (scroll, locdata) {
			var firstrow, self = this, rows = this.rows, bDiv = self.grid.bDiv;
			if (p.deepempty) {
				$(rows).slice(1).remove();
			} else {
				firstrow = rows.length > 0 ? rows[0] : null;
				$(self.firstChild).empty().append(firstrow);
			}
			if (scroll && p.scroll) {
				$(bDiv.firstChild).css({height: "auto"});
				$(bDiv.firstChild.firstChild).css({height: 0, display: "none"});
				if (bDiv.scrollTop !== 0) {
					bDiv.scrollTop = 0;
				}
			}
			if(locdata === true && p.treeGrid) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
			}
		},
		normalizeData = function() {
			var data = p.data, dataLength = data.length, i, j, cur, cells, idn, idi, idr, v, rd,
			localReader = p.localReader,
			colModel = p.colModel,
			cellName = localReader.cell,
			iOffset = (p.multiselect === true ? 1 : 0) + (p.subGrid === true ? 1 : 0) + (p.rownumbers === true ? 1 : 0),
			br = p.scroll ? jgrid.randId() : 1,
			arrayReader, objectReader, rowReader;

			if (p.datatype !== "local" || localReader.repeatitems !== true) {
				return; // nothing to do
			}

			arrayReader = orderedCols(iOffset);
			objectReader = reader("local");
			// read ALL input items and convert items to be read by
			// $.jgrid.getAccessor with column name as the second parameter
			idn = p.keyName === false ?
				($.isFunction(localReader.id) ? localReader.id.call(this, data) : localReader.id) :
				p.keyName;
			if (!isNaN(idn)) {
				idi = Number(idn);
			}
			for (i = 0; i < colModel.length; i++) {
				if (colModel[i].name === idn) {
					idi = i;
					break;
				}
			}
			for (i = 0; i < dataLength; i++) {
				cur = data[i];
				cells = cellName ? getAccessor(cur, cellName) || cur : cur;
				rowReader = $.isArray(cells) ? arrayReader : objectReader;
				idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
				if (idr === undefined) {
					// it could be that one uses the index of column in localReader.id
					if (!isNaN(idn) && colModel[Number(idn) + iOffset] != null) {
						idr = getAccessor(cells, rowReader[Number(idn)]);
					}
					if (idr === undefined) {
						idr = br + i;
					}
				}
				rd = { };
				rd[localReader.id] = idr;
				for (j = 0; j < rowReader.length; j++) {
					v = getAccessor(cells, rowReader[j]);
					rd[colModel[j + iOffset].name] = v;
				}
				$.extend(true, data[i], rd);
			}
		},
		refreshIndex = function() {
			var datalen = p.data.length, idname, i, val;

			if(p.keyName === false || p.loadonce) {
				idname = p.localReader.id;
			} else {
				idname = p.keyName;
			}
			p._index = {};
			for(i =0;i < datalen; i++) {
				val = getAccessor(p.data[i],idname);
				if (val === undefined) { val=String(i+1); }
				p._index[val] = i;
			}
		},
		constructTr = function(id, hide, altClass, rd, cur, selected) {
			var tabindex = '-1', restAttr = '', attrName, style = hide ? 'display:none;' : '', self = this,
				classes = 'ui-widget-content jqgrow ui-row-' + p.direction + (altClass ? ' ' + altClass : '') + (selected ? ' ui-state-highlight' : ''),
				rowAttrObj = $(self).triggerHandler("jqGridRowAttr", [rd, cur, id]);
			if( typeof rowAttrObj !== "object" ) {
				rowAttrObj = $.isFunction(p.rowattr) ? p.rowattr.call(self, rd, cur, id) :
					(typeof p.rowattr === "string" && jgrid.rowattr != null && $.isFunction(jgrid.rowattr[p.rowattr]) ?
					 jgrid.rowattr[p.rowattr].call(self, rd, cur, id) : {});
			}
			if(rowAttrObj != null && !$.isEmptyObject( rowAttrObj )) {
				if (rowAttrObj.hasOwnProperty("id")) {
					id = rowAttrObj.id;
					delete rowAttrObj.id;
				}
				if (rowAttrObj.hasOwnProperty("tabindex")) {
					tabindex = rowAttrObj.tabindex;
					delete rowAttrObj.tabindex;
				}
				if (rowAttrObj.hasOwnProperty("style")) {
					style += rowAttrObj.style;
					delete rowAttrObj.style;
				}
				if (rowAttrObj.hasOwnProperty("class")) {
					classes += ' ' + rowAttrObj['class'];
					delete rowAttrObj['class'];
				}
				// dot't allow to change role attribute
				try { delete rowAttrObj.role; } catch(ignore){}
				for (attrName in rowAttrObj) {
					if (rowAttrObj.hasOwnProperty(attrName)) {
						restAttr += ' ' + attrName + '=' + rowAttrObj[attrName];
					}
				}
			}
			return '<tr role="row" id="' + id + '" tabindex="' + tabindex + '" class="' + classes + '"' +
				(style === '' ? '' : ' style="' + style + '"') + restAttr + '>';
		},
		addXmlData = function (xml, rcnt, more, adjust) {
			var self = this, $self = $(this), startReq = new Date(), getXmlData = jgrid.getXmlData,
			locdata = (p.datatype !== "local" && p.loadonce) || p.datatype === "xmlstring",
			xmlid = "_id_", xmlRd = p.xmlReader, colModel = p.colModel,
			frd = p.datatype === "local" ? "local" : "xml";
			if(locdata) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.localReader.id = xmlid;
			}
			p.reccount = 0;
			if($.isXMLDoc(xml)) {
				if(p.treeANode===-1 && !p.scroll) {
					emptyRows.call(self, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }
			var i,fpos,ir=0,v,gi=p.multiselect===true?1:0,si=0,addSubGridCell,ni=p.rownumbers===true?1:0,idn, getId,f=[],F,rd ={},
			xmlr,rid, rowData=[], cn=(p.altRows === true) ? p.altclass:"",cn1;
			if(p.subGrid===true) {
				si = 1;
				addSubGridCell = jgrid.getMethod("addSubGridCell");
			}
			if(!xmlRd.repeatitems) {f = reader(frd);}
			if( p.keyName===false) {
				idn = $.isFunction( xmlRd.id ) ?  xmlRd.id.call(self, xml) : xmlRd.id;
			} else {
				idn = p.keyName;
			}
			if( String(idn).indexOf("[") === -1 ) {
				if (f.length) {
					getId = function( trow, k) {return $(idn,trow).text() || k;};
				} else {
					getId = function( trow, k) {return $(xmlRd.cell,trow).eq(idn).text() || k;};
				}
			}
			else {
				getId = function( trow, k) {return trow.getAttribute(idn.replace(/[\[\]]/g,"")) || k;};
			}
			p.userData = {};
			p.page = intNum(getXmlData(xml, xmlRd.page), p.page);
			p.lastpage = intNum(getXmlData(xml, xmlRd.total), 1);
			p.records = intNum(getXmlData(xml, xmlRd.records));
			if($.isFunction(xmlRd.userdata)) {
				p.userData = xmlRd.userdata.call(self, xml) || {};
			} else {
				getXmlData(xml, xmlRd.userdata, true).each(function() {p.userData[this.getAttribute("name")]= $(this).text();});
			}
			var hiderow=false, groupingPrepare, gxml = getXmlData( xml, xmlRd.root, true);
			gxml = getXmlData(gxml, xmlRd.row, true) || [];
			var gl = gxml.length, j=0, grpdata=[], rn = parseInt(p.rowNum,10), br=p.scroll?jgrid.randId():1, altr, iStartTrTag, cells;
			if (gl > 0 &&  p.page <= 0) { p.page = 1; }
			if(p.grouping) {
				hiderow = p.groupingView.groupCollapse === true;
				groupingPrepare = jgrid.getMethod("groupingPrepare");
			}
			var $tbody = $(self.tBodies[0]); //$self.children("tbody").filter(":first");
			if(gxml && gl){
				if (adjust) { rn *= adjust+1; }
				while (j<gl) {
					xmlr = gxml[j];
					rid = getId(xmlr,br+j);
					rid  = p.idPrefix + rid;
					altr = rcnt === 0 ? 0 : rcnt+1;
					cn1 = (altr+j)%2 === 1 ? cn : '';
					iStartTrTag = rowData.length;
					rowData.push("");
					if( ni ) {
						rowData.push( addRowNum(0,j,p.page,p.rowNum) );
					}
					if( gi ) {
						rowData.push( addMulti(rid,ni,j, false) );
					}
					if( si ) {
						rowData.push( addSubGridCell.call($self,gi+ni,j+rcnt) );
					}
					if(xmlRd.repeatitems){
						if (!F) { F=orderedCols(gi+si+ni); }
						cells = getXmlData( xmlr, xmlRd.cell, true);
						$.each(F, function (k) {
							var cell = cells[this];
							if (!cell) { return false; }
							v = cell.textContent || cell.text;
							rd[colModel[k+gi+si+ni].name] = v;
							rowData.push( addCell(rid,v,k+gi+si+ni,j+rcnt,xmlr, rd) );
						});
					} else {
						for(i = 0; i < f.length;i++) {
							v = getXmlData( xmlr, f[i]);
							rd[colModel[i+gi+si+ni].name] = v;
							rowData.push( addCell(rid, v, i+gi+si+ni, j+rcnt, xmlr, rd) );
						}
					}
					rowData[iStartTrTag] = constructTr.call(self, rid, hiderow, cn1, rd, xmlr, false);
					rowData.push("</tr>");
					if(p.grouping) {
						grpdata.push( rowData );
						if(!p.groupingView._locgr) {
							groupingPrepare.call($self, rd, j );
						}
						rowData = [];
					}
					if(locdata || p.treeGrid === true) {
						rd[xmlid] = stripPref(p.idPrefix, rid);
						p.data.push(rd);
						p._index[rd[xmlid]] = p.data.length-1;
					}
					if(p.gridview === false ) {
						$tbody.append(rowData.join(''));
						feedback.call(self, "afterInsertRow", rid, rd, xmlr);
						clearArray(rowData);//rowData=[];
					}
					rd={};
					ir++;
					j++;
					if(ir===rn) {break;}
				}
			}
			if(p.gridview === true) {
				fpos = p.treeANode > -1 ? p.treeANode: 0;
				if(p.grouping) {
					if(!locdata) {
						$self.jqGrid('groupingRender',grpdata,colModel.length, p.page, rn);
						grpdata = null;
					}
				} else if(p.treeGrid === true && fpos > 0) {
					$(self.rows[fpos]).after(rowData.join(''));
				} else if (self.firstElementChild) {
					//$("tbody:first",self.grid.bDiv).append(rowData.join(''));
					self.firstElementChild.innerHTML += rowData.join(''); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				} else {
					// for IE8 for example
					$tbody($tbody.html() + rowData.join('')); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				}
			}
			if(p.subGrid === true ) {
				try {$self.jqGrid("addSubGrid",gi+ni);} catch (ignore){}
			}
			p.totaltime = new Date() - startReq;
			if(ir>0) { if(p.records===0) { p.records=gl;} }
			clearArray(rowData);
			if(p.treeGrid === true) {
				try {$self.jqGrid("setTreeNode", fpos+1, ir+fpos+1);} catch (ignore) {}
			}
			//if(!p.treeGrid && !p.scroll) {grid.bDiv.scrollTop = 0;}
			p.reccount=ir;
			p.treeANode = -1;
			if(p.userDataOnFooter) { $self.jqGrid("footerData","set",p.userData,true); }
			if(locdata) {
				p.records = gl;
				p.lastpage = Math.ceil(gl/ rn);
			}
			if (!more) { self.updatepager(false,true); }
			if(locdata) {
				while (ir<gl) {
					xmlr = gxml[ir];
					rid = getId(xmlr,ir+br);
					rid  = p.idPrefix + rid;
					if(xmlRd.repeatitems){
						if (!F) { F=orderedCols(gi+si+ni); }
						var cells2 = getXmlData( xmlr, xmlRd.cell, true);
						$.each(F, function (k) {
							var cell = cells2[this];
							if (!cell) { return false; }
							v = cell.textContent || cell.text;
							rd[colModel[k+gi+si+ni].name] = v;
						});
					} else {
						for(i = 0; i < f.length;i++) {
							v = getXmlData( xmlr, f[i]);
							rd[colModel[i+gi+si+ni].name] = v;
						}
					}
					rd[xmlid] = stripPref(p.idPrefix, rid);
					if(p.grouping) {
						groupingPrepare.call($self, rd, ir );
					}
					p.data.push(rd);
					p._index[rd[xmlid]] = p.data.length-1;
					rd = {};
					ir++;
				}
				if(p.grouping) {
					p.groupingView._locgr = true;
					$self.jqGrid('groupingRender', grpdata, colModel.length, p.page, rn);
					grpdata = null;
				}
			}
		},
		addJSONData = function(data, rcnt, more, adjust) {
			var self = this, $self = $(self), startReq = new Date();
			if(data) {
				if(p.treeANode === -1 && !p.scroll) {
					emptyRows.call(self, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }

			var dReader, locid = "_id_", frd,
			locdata = (p.datatype !== "local" && p.loadonce) || p.datatype === "jsonstring";
			if(locdata) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.localReader.id = locid;
			}
			p.reccount = 0;
			if(p.datatype === "local") {
				dReader =  p.localReader;
				frd= 'local';
			} else {
				dReader =  p.jsonReader;
				frd='json';
			}
			var ir,v,i,j,cur,cells,gi=p.multiselect?1:0,si=p.subGrid===true?1:0,addSubGridCell,ni=p.rownumbers===true?1:0,
			arrayReader=orderedCols(gi+si+ni),objectReader=reader(frd),rowReader,len,drows,idn,idi,rd={}, fpos, idr,rowData=[],
			cn=(p.altRows === true) ? p.altclass:"",cn1;
			p.page = intNum(getAccessor(data,dReader.page), p.page);
			p.lastpage = intNum(getAccessor(data,dReader.total), 1);
			p.records = intNum(getAccessor(data,dReader.records));
			p.userData = getAccessor(data,dReader.userdata) || {};
			if(si) {
				addSubGridCell = jgrid.getMethod("addSubGridCell");
			}
			if( p.keyName===false ) {
				idn = $.isFunction(dReader.id) ? dReader.id.call(self, data) : dReader.id; 
			} else {
				idn = p.keyName;
			}
			if (!isNaN(idn)) {
				idi = Number(idn);
			}
			for (i=0; i<p.colModel.length; i++) {
				if (p.colModel[i].name === idn) {
					idi = i;
					break;
				}
			}
			drows = getAccessor(data,dReader.root);
			if (drows == null && $.isArray(data)) { drows = data; }
			if (!drows) { drows = []; }
			len = drows.length;
			if (len > 0 && p.page <= 0) { p.page = 1; }
			var rn = parseInt(p.rowNum,10),br=p.scroll?jgrid.randId():1, altr, selected=false, selr;
			if (adjust) { rn *= adjust+1; }
			if(p.datatype === "local" && !p.deselectAfterSort) {
				selected = true;
			}
			var grpdata=[],hiderow=false, groupingPrepare, iStartTrTag;
			if(p.grouping)  {
				hiderow = p.groupingView.groupCollapse === true;
				groupingPrepare = jgrid.getMethod("groupingPrepare");
			}
			var $tbody = $(self.tBodies[0]); //$self.children("tbody").filter(":first");
			for (i=0; i<len && i<rn; i++) {
				cur = drows[i];
				cells = dReader.repeatitems && dReader.cell ? getAccessor(cur, dReader.cell) || cur : cur;
				rowReader = dReader.repeatitems && $.isArray(cells) ? arrayReader : objectReader;
				idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
				if(idr === undefined) {
					// it could be that one uses the index of column in dReader.id
					if (!isNaN(idn) && p.colModel[Number(idn)+gi+si+ni] != null) {
						idr = getAccessor(cells, rowReader[Number(idn)]);
					}
					if(idr === undefined) {
						idr = br+i;
					}
				}
				idr  = p.idPrefix + idr;
				altr = rcnt === 1 ? 0 : rcnt;
				cn1 = (altr+i)%2 === 1 ? cn : '';
				if( selected) {
					if( p.multiselect) {
						selr = ($.inArray(idr, p.selarrrow) !== -1);
					} else {
						selr = (idr === p.selrow);
					}
				}
				iStartTrTag = rowData.length;
				rowData.push("");
				if( ni ) {
					rowData.push( addRowNum(0,i,p.page,p.rowNum) );
				}
				if( gi ){
					rowData.push( addMulti(idr,ni,i,selr) );
				}
				if( si ) {
					rowData.push( addSubGridCell.call($self,gi+ni,i+rcnt) );
				}
				for (j=0;j<rowReader.length;j++) {
					v = getAccessor(cells, rowReader[j]);
					rd[p.colModel[j+gi+si+ni].name] = v;
					rowData.push( addCell(idr,v,j+gi+si+ni,i+rcnt,cells, rd) );
				}
				rowData[iStartTrTag] = constructTr.call(self, idr, hiderow, cn1, rd, cells, selr);
				rowData.push( "</tr>" );
				if(p.grouping) {
					grpdata.push( rowData );
					if(!p.groupingView._locgr) {
						groupingPrepare.call($self, rd, i);
					}
					rowData = [];
				}
				if(locdata || p.treeGrid===true) {
					rd[locid] = stripPref(p.idPrefix, idr);
					p.data.push(rd);
					p._index[rd[locid]] = p.data.length-1;
				}
				if(p.gridview === false ) {
					$tbody.append(rowData.join('')); // ??? $self.append(rowData.join(''));
					feedback.call(self, "afterInsertRow", idr, rd, cells);
					clearArray(rowData); // rowData=[];
				}
				rd={};
			}
			if(p.gridview === true ) {
				fpos = p.treeANode > -1 ? p.treeANode: 0;
				if(p.grouping) {
					if(!locdata) {
						$self.jqGrid('groupingRender', grpdata, p.colModel.length, p.page, rn);
						grpdata = null;
					}
				} else if(p.treeGrid === true && fpos > 0) {
					$(self.rows[fpos]).after(rowData.join(''));
				} else if (self.firstElementChild) {
					self.firstElementChild.innerHTML += rowData.join(''); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				} else {
					// for IE8 for example
					$tbody.html($tbody.html() + rowData.join('')); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				}
			}
			if(p.subGrid === true ) {
				try { $self.jqGrid("addSubGrid",gi+ni);} catch (ignore){}
			}
			p.totaltime = new Date() - startReq;
			if(i>0) {
				if(p.records===0) { p.records=len; }
			}
			clearArray(rowData);
			if( p.treeGrid === true) {
				try {$self.jqGrid("setTreeNode", fpos+1, i+fpos+1);} catch (ignore) {}
			}
			//if(!p.treeGrid && !p.scroll) {grid.bDiv.scrollTop = 0;}
			p.reccount=i;
			p.treeANode = -1;
			if(p.userDataOnFooter) { $self.jqGrid("footerData","set",p.userData,true); }
			if(locdata) {
				p.records = len;
				p.lastpage = Math.ceil(len/ rn);
			}
			if (!more) { self.updatepager(false,true); }
			if(locdata) {
				for (ir=i; ir<len && drows[ir]; ir++) {
					cur = drows[ir];
					cells = dReader.repeatitems && dReader.cell ? getAccessor(cur, dReader.cell) || cur : cur;
					rowReader = dReader.repeatitems && $.isArray(cells) ? arrayReader : objectReader;
					idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
					if(idr === undefined) {
						// it could be that one uses the index of column in dReader.id
						if (!isNaN(idn) && p.colModel[Number(idn)+gi+si+ni] != null) {
							idr = getAccessor(cells, rowReader[Number(idn)]);
						}
						if(idr === undefined) {
							idr = br+ir;
						}
					}
					if(cells) {
						for (j=0;j<rowReader.length;j++) {
							rd[p.colModel[j+gi+si+ni].name] = getAccessor(cells,rowReader[j]);
						}
						rd[locid] = stripPref(p.idPrefix, idr);
						if(p.grouping) {
							groupingPrepare.call($self, rd, ir );
						}
						p.data.push(rd);
						p._index[rd[locid]] = p.data.length-1;
						rd = {};
					}
				}
				if(p.grouping) {
					p.groupingView._locgr = true;
					$self.jqGrid('groupingRender', grpdata, p.colModel.length, p.page, rn);
					grpdata = null;
				}
			}
		},
		addLocalData = function() {
			var $self = $(this), st = p.multiSort ? [] : "", sto=[], fndsort=false, cmtypes={}, grtypes=[], grindexes=[], srcformat, sorttype, newformat;
			if(!$.isArray(p.data)) {
				return {};
			}
			var grpview = p.grouping ? p.groupingView : false, lengrp, gin;
			$.each(p.colModel,function(){
				var grindex = this.index || this.name;
				sorttype = this.sorttype || "text";
				if(sorttype === "date" || sorttype === "datetime") {
					if(this.formatter && typeof this.formatter === 'string' && this.formatter === 'date') {
						if(this.formatoptions && this.formatoptions.srcformat) {
							srcformat = this.formatoptions.srcformat;
						} else {
							srcformat = jgrid.formatter.date.srcformat;
						}
						if(this.formatoptions && this.formatoptions.newformat) {
							newformat = this.formatoptions.newformat;
						} else {
							newformat = jgrid.formatter.date.newformat;
						}
					} else {
						srcformat = newformat = this.datefmt || "Y-m-d";
					}
					cmtypes[this.name] = {"stype": sorttype, "srcfmt": srcformat,"newfmt":newformat, "sfunc": this.sortfunc || null};
				} else {
					cmtypes[this.name] = {"stype": sorttype, "srcfmt":'',"newfmt":'', "sfunc": this.sortfunc || null};
				}
				if(p.grouping) {
					for(gin =0, lengrp = grpview.groupField.length; gin< lengrp; gin++) {
						if( this.name === grpview.groupField[gin]) {
							grtypes[gin] = cmtypes[grindex];
							grindexes[gin]= grindex;
						}
					}
				}
				if(p.multiSort) {
					if(this.lso) {
						st.push(this.name);
						var tmplso= this.lso.split("-");
						sto.push( tmplso[tmplso.length-1] );
					}
				} else {
					if(!fndsort && (this.index === p.sortname || this.name === p.sortname)){
						st = this.name; // ???
						fndsort = true;
					}
				}
			});
			if(p.treeGrid) {
				$self.jqGrid("SortTree", st, p.sortorder,
					cmtypes[st] != null && cmtypes[st].stype ? cmtypes[st].stype : 'text',
					cmtypes[st] != null && cmtypes[st].srcfmt ? cmtypes[st].srcfmt : '');
				return {};
			}
			var compareFnMap = {
				'eq':function(queryObj) {return queryObj.equals;},
				'ne':function(queryObj) {return queryObj.notEquals;},
				'lt':function(queryObj) {return queryObj.less;},
				'le':function(queryObj) {return queryObj.lessOrEquals;},
				'gt':function(queryObj) {return queryObj.greater;},
				'ge':function(queryObj) {return queryObj.greaterOrEquals;},
				'cn':function(queryObj) {return queryObj.contains;},
				'nc':function(queryObj,op) {return op === "OR" ? queryObj.orNot().contains : queryObj.andNot().contains;},
				'bw':function(queryObj) {return queryObj.startsWith;},
				'bn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().startsWith : queryObj.andNot().startsWith;},
				'en':function(queryObj,op) {return op === "OR" ? queryObj.orNot().endsWith : queryObj.andNot().endsWith;},
				'ew':function(queryObj) {return queryObj.endsWith;},
				'ni':function(queryObj,op) {return op === "OR" ? queryObj.orNot().equals : queryObj.andNot().equals;},
				'in':function(queryObj) {return queryObj.equals;},
				'nu':function(queryObj) {return queryObj.isNull;},
				'nn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().isNull : queryObj.andNot().isNull;}
			},
			query = jgrid.from(p.data);
			if (p.ignoreCase) { query = query.ignoreCase(); }
			function tojLinq ( group ) {
				var s = 0, index, gor, ror, opr, rule;
				if (group.groups != null) {
					gor = group.groups.length && group.groupOp.toString().toUpperCase() === "OR";
					if (gor) {
						query.orBegin();
					}
					for (index = 0; index < group.groups.length; index++) {
						if (s > 0 && gor) {
							query.or();
						}
						try {
							tojLinq(group.groups[index]);
						} catch (e) {fatalErrorFunction(e);}
						s++;
					}
					if (gor) {
						query.orEnd();
					}
				}
				if (group.rules != null) {
					//if(s>0) {
					//	var result = query.select();
					//	query = $.jgrid.from( result);
					//	if (p.ignoreCase) { query = query.ignoreCase(); } 
					//}
					try{
						ror = group.rules.length && group.groupOp.toString().toUpperCase() === "OR";
						if (ror) {
							query.orBegin();
						}
						for (index = 0; index < group.rules.length; index++) {
							rule = group.rules[index];
							opr = group.groupOp.toString().toUpperCase();
							if (compareFnMap[rule.op] && rule.field ) {
								if(s > 0 && opr && opr === "OR") {
									query = query.or();
								}
								query = compareFnMap[rule.op](query, opr)(rule.field, rule.data, cmtypes[rule.field]);
							}
							s++;
						}
						if (ror) {
							query.orEnd();
						}
					} catch (g) {fatalErrorFunction(g);}
				}
			}
			if (p.search === true) {
				var srules = p.postData.filters;
				if(srules) {
					if(typeof srules === "string") { srules = jgrid.parse(srules);}
					tojLinq( srules );
				} else {
					try {
						query = compareFnMap[p.postData.searchOper](query)(p.postData.searchField, p.postData.searchString,cmtypes[p.postData.searchField]);
					} catch (ignore){}
				}
			}
			if(p.grouping) {
				for(gin=0; gin<lengrp;gin++) {
					query.orderBy(grindexes[gin],grpview.groupOrder[gin],grtypes[gin].stype, grtypes[gin].srcfmt);
				}
			}
			if(p.multiSort) {
				$.each(st,function(i){
					query.orderBy(this, sto[i], cmtypes[this].stype, cmtypes[this].srcfmt, cmtypes[this].sfunc);
				});
			} else {
				if (st && p.sortorder && fndsort) {
					if(p.sortorder.toUpperCase() === "DESC") {
						query.orderBy(p.sortname, "d", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					} else {
						query.orderBy(p.sortname, "a", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					}
				}
			}
			p.lastSelectedData = query.select();
			var recordsperpage = parseInt(p.rowNum,10),
			total = p.lastSelectedData.length,
			page = parseInt(p.page,10),
			totalpages = Math.ceil(total / recordsperpage),
			retresult = {};
			if((p.search || p.resetsearch) && p.grouping && p.groupingView._locgr) {
				p.groupingView.groups =[];
				var j, grPrepare = jgrid.getMethod("groupingPrepare"), key, udc;
				if(p.footerrow && p.userDataOnFooter) {
					for (key in p.userData) {
						if(p.userData.hasOwnProperty(key)) {
							p.userData[key] = 0;
						}
					}
					udc = true;
				}
				for(j=0; j<total; j++) {
					if(udc) {
						for(key in p.userData){
							if(p.userData.hasOwnProperty(key)) {
								p.userData[key] += parseFloat(p.lastSelectedData[j][key] || 0);
							}
						}
					}
					grPrepare.call($self,p.lastSelectedData[j],j, recordsperpage );
				}
			}
			query = null;
			cmtypes = null;
			var localReader = p.localReader;
			retresult[localReader.total] = totalpages;
			retresult[localReader.page] = page;
			retresult[localReader.records] = total;
			retresult[localReader.root] = p.lastSelectedData.slice((page-1)*recordsperpage, page*recordsperpage);
			retresult[localReader.userdata] = p.userData;
			return retresult;
		},
		updatepager = function(rn, dnd) {
			var self = this, $self = $(self), gridSelf = self.grid, cp, last, base, from, to, tot, fmt, pgboxes = p.pager || "", sppg,
			tspg = p.pager ? "_"+p.pager.substr(1) : "", bDiv = gridSelf.bDiv,
			tspg_t = p.toppager ? "_"+p.toppager.substr(1) : "";
			base = parseInt(p.page,10)-1;
			if(base < 0) { base = 0; }
			base = base*parseInt(p.rowNum,10);
			to = base + p.reccount;
			if (p.scroll) {
				var rows = $(getGridComponent("bTable", $(bDiv))[0].rows).slice(1);//$("tbody:first > tr:gt(0)", bDiv);
				base = to - rows.length;
				p.reccount = rows.length;
				var rh = rows.outerHeight() || gridSelf.prevRowHeight;
				if (rh) {
					var top = base * rh;
					var height = parseInt(p.records,10) * rh;
					$(">div",bDiv).filter(":first").css({height : height}).children("div").filter(":first").css({height:top,display:top?"":"none"});
					if (bDiv.scrollTop === 0 && p.page > 1) {
						bDiv.scrollTop = p.rowNum * (p.page - 1) * rh;
					}
				}
				bDiv.scrollLeft = gridSelf.hDiv.scrollLeft;
			}
			pgboxes += p.toppager ? (pgboxes ? ",": "") + p.toppager : "";
			if(pgboxes) {
				fmt = jgrid.formatter.integer || {};
				cp = intNum(p.page);
				last = intNum(p.lastpage);
				$(".selbox", pgboxes)[propOrAttr]("disabled", false);
				if(p.pginput===true) {
					$('.ui-pg-input',pgboxes).val(p.page);
					sppg = p.toppager ? '#sp_1'+tspg+",#sp_1"+tspg_t : '#sp_1'+tspg;
					$(sppg).html($.fmatter ? $.fmatter.util.NumberFormat(p.lastpage,fmt):p.lastpage);

				}
				if (p.viewrecords){
					if(p.reccount === 0) {
						$(".ui-paging-info",pgboxes).html(p.emptyrecords);
					} else {
						from = base+1;
						tot=p.records;
						if($.fmatter) {
							from = $.fmatter.util.NumberFormat(from,fmt);
							to = $.fmatter.util.NumberFormat(to,fmt);
							tot = $.fmatter.util.NumberFormat(tot,fmt);
						}
						$(".ui-paging-info",pgboxes).html(jgrid.format(p.recordtext,from,to,tot));
					}
				}
				if(p.pgbuttons===true) {
					if(cp<=0) {cp = last = 0;}
					if(cp===1 || cp === 0) {
						$("#first"+tspg+", #prev"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
						if(p.toppager) { $("#first_t"+tspg_t+", #prev_t"+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
					} else {
						$("#first"+tspg+", #prev"+tspg).removeClass('ui-state-disabled');
						if(p.toppager) { $("#first_t"+tspg_t+", #prev_t"+tspg_t).removeClass('ui-state-disabled'); }
					}
					if(cp===last || cp === 0) {
						$("#next"+tspg+", #last"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
						if(p.toppager) { $("#next_t"+tspg_t+", #last_t"+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
					} else {
						$("#next"+tspg+", #last"+tspg).removeClass('ui-state-disabled');
						if(p.toppager) { $("#next_t"+tspg_t+", #last_t"+tspg_t).removeClass('ui-state-disabled'); }
					}
				}
			}
			if(rn===true && p.rownumbers === true) {
				$(">td.jqgrid-rownum",self.rows).each(function(i){
					$(this).html(base+1+i);
				});
			}
			if(dnd && p.jqgdnd) { $self.jqGrid('gridDnD','updateDnD');}
			feedback.call(self, "gridComplete");
			$self.triggerHandler("jqGridAfterGridComplete");
		},
		beginReq = function() {
			var self = this;
			self.grid.hDiv.loading = true;
			if(p.hiddengrid) { return;}
			$(self).jqGrid("progressBar", {method:"show", loadtype : p.loadui, htmlcontent: p.loadtext });
		},
		endReq = function() {
			var self = this;
			self.grid.hDiv.loading = false;
			$(self).jqGrid("progressBar", {method:"hide", loadtype : p.loadui });
		},
		populate = function (npage) {
			var self = this, $self = $(self), gridSelf = self.grid;
			if(!gridSelf.hDiv.loading) {
				var pvis = p.scroll && npage === false,
				prm = {}, dt, dstr, pN=p.prmNames;
				if(p.page <=0) { p.page = Math.min(1,p.lastpage); }
				if(pN.search !== null) {prm[pN.search] = p.search;} if(pN.nd !== null) {prm[pN.nd] = new Date().getTime();}
				if (isNaN(parseInt(p.rowNum,10)) || parseInt(p.rowNum,10) <= 0) { p.rowNum = p.maxRowNum; }
				if(pN.rows !== null) {prm[pN.rows]= p.rowNum;} if(pN.page !== null) {prm[pN.page]= p.page;}
				if(pN.sort !== null) {prm[pN.sort]= p.sortname;} if(pN.order !== null) {prm[pN.order]= p.sortorder;}
				if(p.rowTotal !== null && pN.totalrows !== null) { prm[pN.totalrows]= p.rowTotal; }
				var lcf = $.isFunction(p.loadComplete), lc = lcf ? p.loadComplete : null;
				var adjust = 0;
				npage = npage || 1;
				if (npage > 1) {
					if(pN.npage !== null) {
						prm[pN.npage] = npage;
						adjust = npage - 1;
						npage = 1;
					} else {
						lc = function(req) {
							p.page++;
							gridSelf.hDiv.loading = false;
							if (lcf) {
								p.loadComplete.call(self,req);
							}
							populate.call(self,npage-1);
						};
					}
				} else if (pN.npage !== null) {
					delete p.postData[pN.npage];
				}
				if(p.grouping) {
					$self.jqGrid('groupingSetup');
					var grp = p.groupingView, gi, gs="", index;
					for(gi=0;gi<grp.groupField.length;gi++) {
						index = grp.groupField[gi];
						$.each(p.colModel, function(cmIndex, cmValue) {
							if (cmValue.name === index && cmValue.index){
								index = cmValue.index;
							}
						} );
						gs += index +" "+grp.groupOrder[gi]+", ";
					}
					prm[pN.sort] = gs + prm[pN.sort];
				}
				$.extend(p.postData,prm);
				var rcnt = !p.scroll ? 1 : self.rows.length-1;
				if (!feedback.call(self, "beforeRequest")) { return; }
				if ($.isFunction(p.datatype)) { p.datatype.call(self,p.postData,"load_"+p.id, rcnt, npage, adjust); return;}
				if(p.url != null && p.datatype != 'local'){
                                    $.ajax($.extend({
                                        url:p.url,
                                        type:p.mtype,
                                        data: $.isFunction(p.serializeGridData)? p.serializeGridData.call(self,p.postData) : p.postData,
                                        success:function(data,st, xhr) {
                                            if ($.isFunction(p.beforeProcessing)) {
                                                if (p.beforeProcessing.call(self, data, st, xhr) === false) {
                                                    endReq.call(self);
                                                    return;
                                                }
                                            }
                                    
                                            if(xhr.responseJSON !== undefined){
                                                p.datatype = 'json';
                                                addJSONData.call(self, data, gridSelf.bDiv, rcnt, npage > 1, adjust);
                                            } else if(xhr.responseXML !== undefined){
                                                p.datatype = 'xml';
                                                addXmlData.call(self, data, gridSelf.bDiv, rcnt, npage > 1, adjust);
                                            } else {
                                                try{
                                                    data = $.parseJSON(data);
                                                    p.datatype = 'json';
                                                    addJSONData.call(self, data, gridSelf.bDiv, rcnt, npage > 1, adjust);
                                                }catch(e){
                                                    try{
                                                        data = $.parseXML(data);
                                                        p.datatype = 'xml';
                                                        addXmlData.call(self, data, gridSelf.bDiv, rcnt, npage > 1, adjust);
                                                    } catch(er){
                                                        //TODO: alert user
                                                    }
                                                }
                                            }
                                    
                                            $self.triggerHandler("jqGridLoadComplete", [data]);
                                            if(lc) { lc.call(self,data); }
											if (p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
                                            $self.triggerHandler("jqGridAfterLoadComplete", [data]);
                                            if (pvis) { gridSelf.populateVisible(); }
											if (p.loadonce || p.treeGrid) {
												p.dataTypeOrg = p.datatype;
												p.datatype = "local";
											}
                                            data=null;
                                            if (npage === 1) { endReq.call(self); }
                                        },
                                        error:function(xhr,st,err){
                                            if($.isFunction(p.loadError)) { p.loadError.call(self,xhr,st,err); }
                                            if (npage === 1) { endReq.call(self); }
                                            xhr=null;
                                        },
                                        beforeSend: function(xhr, settings ){
                                            var gotoreq = true;
                                            if($.isFunction(p.loadBeforeSend)) {
                                                gotoreq = p.loadBeforeSend.call(self,xhr, settings);
                                            }
                                            if(gotoreq === undefined) { gotoreq = true; }
                                            if(gotoreq === false) {
                                                return false;
                                            }
                                            beginReq.call(self);
                                        }
                                    },jgrid.ajaxOptions, p.ajaxGridOptions));
                                } else {
                                    dt = p.datatype.toLowerCase();
                                    switch(dt) {
                                        case "xmlstring":
                                            beginReq.call(self);
                                            dstr = typeof p.datastr !== 'string' ? p.datastr : $.parseXML(p.datastr);
                                            addXmlData.call(self, dstr);
                                           	feedback.call(self, "loadComplete", dstr);
											if (ts.p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
                                            $self.triggerHandler("jqGridAfterLoadComplete", [dstr]);
                                            p.datatype = "local";
                                            p.datastr = null;
                                            endReq.call(self);
                                            break;
                                        case "jsonstring":
                                            beginReq.call(self);
                                            if(typeof p.datastr === 'string') { dstr = $.jgrid.parse(pdatastr); }
                                            else { dstr = p.datastr; }
                                            addJSONData.call(self, dstr);
                                            feedback.call(self, "loadComplete", dstr);
											if (ts.p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
                                            $self.triggerHandler("jqGridAfterLoadComplete", [dstr]);
                                            p.datatype = "local";
                                            p.datastr = null;
                                            endReq.call(self);
                                            break;
                                        case "local":
                                        case "clientside":
                                            beginReq.call(self);
                                            p.datatype = "local";
                                            var req = addLocalData.call(self);
                                            addJSONData.call(self, req,ts.grid.bDiv,rcnt,npage>1,adjust);
                                            $self.triggerHandler("jqGridLoadComplete", [req]);
                                            if(lc) { lc.call(self,req); }
											if (p.autoresizeOnLoad) {$self.jqGrid("autoResizeAllColumns");}
                                            $self.triggerHandler("jqGridAfterLoadComplete", [req]);
                                            if (pvis) { gridSelf.populateVisible.call(self); }
                                            endReq.call(self);
                                            break;
                                    } 
                                }
                            }
		},
		setHeadCheckBox = function (checked) {
		    var self = this, gridSelf = self.grid;
			$(p.cb,gridSelf.hDiv)[p.propOrAttr]("checked", checked);
			var fid = p.frozenColumns ? p.id+"_frozen" : "";
			if(fid) {
				$(p.cb,gridSelf.fhDiv)[p.propOrAttr]("checked", checked);
			}
		},
		setPager = function (pgid, tp){
			var sep = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>",
			pginp = "",
			blockAlign = p.pagerpos === "left" ? "margin-right:auto;" : (p.pagerpos === "right" ? "margin-left:auto;" : "margin-left:auto;margin-right:auto;"),
			pgl="<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;"+blockAlign+"' class='ui-pg-table'><tbody><tr>",
			str="", pgcnt, lft, cent, rgt, twd, tdw, i,
			clearVals = function(onpaging){
				var ret;
				if ($.isFunction(p.onPaging) ) { ret = p.onPaging.call(ts,onpaging); }
				if(ret==='stop') {return false;}
				p.selrow = null;
				if(p.multiselect) {
					clearArray(p.selarrrow); // p.selarrrow = [];
					setHeadCheckBox.call(ts, false);
				}
				clearArray(p.savedRow); // p.savedRow = [];
				return true;
			};
			tp += "_" + pgid;
			pgcnt = "pg_"+pgid;
			lft = pgid+"_left"; cent = pgid+"_center"; rgt = pgid+"_right";
			$("#"+jqID(pgid) )
			.append("<div id='"+pgcnt+"' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;'><tbody><tr><td id='"+lft+"' style='text-align:left;'></td><td id='"+cent+"' style='text-align:center;white-space:pre;'></td><td id='"+rgt+"' style='text-align:right;'></td></tr></tbody></table></div>")
			.attr("dir","ltr"); //explicit setting
			pgcnt = "#" + jqID(pgcnt); // modify to id selector
			if(p.rowList.length >0){
				str = "<td dir='"+dir+"'>";
				str +="<select class='ui-pg-selbox' role='listbox' " + (p.pgrecs ? "title='"+p.pgrecs +"'" : "")+ ">";
				var strnm;
				for(i=0;i<p.rowList.length;i++){
					strnm = p.rowList[i].toString().split(":");
					if(strnm.length === 1) {
						strnm[1] = strnm[0];
					}
					str +="<option role=\"option\" value=\""+strnm[0]+"\""+(( intNum(p.rowNum,0) === intNum(strnm[0],0))?" selected=\"selected\"":"")+">"+strnm[1]+"</option>";
				}
				str +="</select></td>";
			}
			if(dir==="rtl") { pgl += str; }
			if(p.pginput===true) { pginp= "<td dir='"+dir+"'>"+jgrid.format(p.pgtext || "","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+pgid+"'></span>")+"</td>";}
			pgid = "#"+jqID(pgid); // modify to id selector
			if(p.pgbuttons===true) {
				var po=["first"+tp,"prev"+tp, "next"+tp,"last"+tp]; if(dir==="rtl") { po.reverse(); }
				pgl += "<td id='"+po[0]+"' class='ui-pg-button ui-corner-all' " + (p.pgfirst ? "title='"+p.pgfirst +"'" : "")+"><span class='ui-icon ui-icon-seek-first'></span></td>";
				pgl += "<td id='"+po[1]+"' class='ui-pg-button ui-corner-all' " + (p.pgprev ? "title='"+p.pgprev +"'" : "")+"><span class='ui-icon ui-icon-seek-prev'></span></td>";
				pgl += pginp !== "" ? sep+pginp+sep:"";
				pgl += "<td id='"+po[2]+"' class='ui-pg-button ui-corner-all' " + (p.pgnext ? "title='"+p.pgnext +"'" : "")+"><span class='ui-icon ui-icon-seek-next'></span></td>";
				pgl += "<td id='"+po[3]+"' class='ui-pg-button ui-corner-all' " + (p.pglast ? "title='"+p.pglast +"'" : "")+"><span class='ui-icon ui-icon-seek-end'></span></td>";
			} else if (pginp !== "") { pgl += pginp; }
			if(dir==="ltr") { pgl += str; }
			pgl += "</tr></tbody></table>";
			if(p.viewrecords===true) {$("td"+pgid+"_"+p.recordpos,pgcnt).append("<div dir='"+dir+"' style='text-align:"+p.recordpos+"' class='ui-paging-info'></div>");}
			$("td"+pgid+"_"+p.pagerpos,pgcnt).append(pgl);
			tdw = $(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
			$(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+tdw+";visibility:hidden;' ></div>");
			twd = $(pgl).clone().appendTo("#testpg").width();
			$("#testpg").remove();
			if(twd > 0) {
				if(pginp !== "") { twd += 50; } //should be param
				$("td"+pgid+"_"+p.pagerpos,pgcnt).width(twd);
			}
			p._nvtd = [];
			p._nvtd[0] = twd ? Math.floor((p.width - twd)/2) : Math.floor(p.width/3);
			p._nvtd[1] = 0;
			pgl=null;
			$('.ui-pg-selbox',pgcnt).bind('change',function() {
				if(!clearVals('records')) { return false; }
				p.page = Math.round(p.rowNum*(p.page-1)/this.value-0.5)+1;
				p.rowNum = this.value;
				if(p.pager) { $('.ui-pg-selbox',p.pager).val(this.value); }
				if(p.toppager) { $('.ui-pg-selbox',p.toppager).val(this.value); }
				populate.call(ts);
				return false;
			});
			if(p.pgbuttons===true) {
			$(".ui-pg-button",pgcnt).hover(function(){
				if($(this).hasClass('ui-state-disabled')) {
					this.style.cursor='default';
				} else {
					$(this).addClass('ui-state-hover');
					this.style.cursor='pointer';
				}
			},function() {
				if(!$(this).hasClass('ui-state-disabled')) {
					$(this).removeClass('ui-state-hover');
					this.style.cursor= "default";
				}
			});
			$("#first"+jqID(tp)+", #prev"+jqID(tp)+", #next"+jqID(tp)+", #last"+jqID(tp)).click( function() {
				if ($(this).hasClass("ui-state-disabled")) {
					return false;
				}
				var cp = intNum(p.page,1),
				last = intNum(p.lastpage,1), selclick = false,
				fp=true, pp=true, np=true,lp=true;
				if(last ===0 || last===1) {fp=false;pp=false;np=false;lp=false; }
				else if( last>1 && cp >=1) {
					if( cp === 1) { fp=false; pp=false; }
					//else if( cp>1 && cp <last){ }
					else if( cp===last){ np=false;lp=false; }
				} else if( last>1 && cp===0 ) { np=false;lp=false; cp=last-1;}
				if(!clearVals(this.id)) { return false; }
				if( this.id === 'first'+tp && fp ) { p.page=1; selclick=true;}
				if( this.id === 'prev'+tp && pp) { p.page=(cp-1); selclick=true;}
				if( this.id === 'next'+tp && np) { p.page=(cp+1); selclick=true;}
				if( this.id === 'last'+tp && lp) { p.page=last; selclick=true;}
				if(selclick) {
					populate.call(ts);
				}
				return false;
			});
			}
			if(p.pginput===true) {
			$('input.ui-pg-input',pgcnt).keypress( function(e) {
				var key = e.charCode || e.keyCode || 0;
				if(key === 13) {
					if(!clearVals('user')) { return false; }
					$(this).val( intNum( $(this).val(), 1));
					p.page = ($(this).val()>0) ? $(this).val():p.page;
					populate.call(ts);
					return false;
				}
				return this;
			});
			}
		},
		multiSort = function(iCol, obj ) {
			var splas, sort="", cm = p.colModel, fs=false, ls, 
					selTh = p.frozenColumns ?  obj : ts.grid.headers[iCol].el, so="";
			$("span.ui-grid-ico-sort",selTh).addClass('ui-state-disabled');
			$(selTh).attr("aria-selected","false");

			if(cm[iCol].lso) {
				if(cm[iCol].lso==="asc") {
					cm[iCol].lso += "-desc";
					so = "desc";
				} else if(cm[iCol].lso==="desc") {
					cm[iCol].lso += "-asc";
					so = "asc";
				} else if(cm[iCol].lso==="asc-desc" || cm[iCol].lso==="desc-asc") {
					cm[iCol].lso="";
				}
			} else {
				cm[iCol].lso = so = cm[iCol].firstsortorder || 'asc';
			}
			if( so ) {
				$("span.s-ico",selTh).show();
				$("span.ui-icon-"+so,selTh).removeClass('ui-state-disabled');
				$(selTh).attr("aria-selected","true");
			} else {
				if(!p.viewsortcols[0]) {
					$("span.s-ico",selTh).hide();
				}
			}
			p.sortorder = "";
			$.each(cm, function(i){
				if(this.lso) {
					if(i>0 && fs) {
						sort += ", ";
					}
					splas = this.lso.split("-");
					sort += cm[i].index || cm[i].name;
					sort += " "+splas[splas.length-1];
					fs = true;
					p.sortorder = splas[splas.length-1];
				}
			});
			ls = sort.lastIndexOf(p.sortorder);
			sort = sort.substring(0, ls);
			p.sortname = sort;
		},
		sortData = function (index, idxcol,reload,sor, obj){
			var self = this;
			if(!p.colModel[idxcol].sortable) { return; }
			if(p.savedRow.length > 0) {return;}
			if(!reload) {
				if( p.lastsort === idxcol && p.sortname !== "" ) {
					if( p.sortorder === 'asc') {
						p.sortorder = 'desc';
					} else if(p.sortorder === 'desc') { p.sortorder = 'asc';}
				} else { p.sortorder = p.colModel[idxcol].firstsortorder || 'asc'; }
				p.page = 1;
			}
			if(p.multiSort) {
				multiSort( idxcol, obj);
			} else {
				if(sor) {
					if(p.lastsort === idxcol && p.sortorder === sor && !reload) { return; }
					p.sortorder = sor;
				}
				var previousSelectedTh = self.grid.headers[p.lastsort] ? self.grid.headers[p.lastsort].el : null, newSelectedTh = p.frozenColumns ?  obj : self.grid.headers[idxcol].el;

				$("span.ui-grid-ico-sort",previousSelectedTh).addClass('ui-state-disabled');
				$(previousSelectedTh).attr("aria-selected","false");
				if(p.frozenColumns) {
					self.grid.fhDiv.find("span.ui-grid-ico-sort").addClass('ui-state-disabled');
					self.grid.fhDiv.find("th").attr("aria-selected","false");
				}
				$("span.ui-icon-"+p.sortorder,newSelectedTh).removeClass('ui-state-disabled');
				$(newSelectedTh).attr("aria-selected","true");
				if(!p.viewsortcols[0]) {
					if(p.lastsort !== idxcol) {
						if(p.frozenColumns){
							self.grid.fhDiv.find("span.s-ico").hide();
						}
						$("span.s-ico",previousSelectedTh).hide();
						$("span.s-ico",newSelectedTh).show();
					} else if (p.sortname === "") { // if p.lastsort === idxcol but p.sortname === ""
						$("span.s-ico",newSelectedTh).show();
					}
				}
				index = index.substring(5 + p.id.length + 1); // bad to be changed!?!
				p.sortname = p.colModel[idxcol].index || index;
			}
			if (!feedback.call(self, "onSortCol", p.sortname, idxcol, p.sortorder)) {
				p.lastsort = idxcol;
				return;
			}
			if(p.datatype === "local") {
				if(p.deselectAfterSort) {$(self).jqGrid("resetSelection");}
			} else {
				p.selrow = null;
				if(p.multiselect){setHeadCheckBox.call(self, false);}
				clearArray(p.selarrrow); //p.selarrrow =[];
				clearArray(p.savedRow); //p.savedRow =[];
			}
			if(p.scroll) {
				var sscroll = self.grid.bDiv.scrollLeft;
				emptyRows.call(self, true, false);
				self.grid.hDiv.scrollLeft = sscroll;
			}
			if(p.subGrid && p.datatype === 'local') {
				$("td.sgexpanded","#"+jqID(p.id)).each(function(){
					$(this).trigger("click");
				});
			}
			populate.call(self);
			p.lastsort = idxcol;
			if(p.sortname !== index && idxcol) {p.lastsort = idxcol;}
		},
		setColWidth = function () {
			var initwidth = 0, brd=jgrid.cell_width? 0: intNum(p.cellLayout,0), vc=0, lvc, scw=intNum(p.scrollOffset,0),cw,hs=false,aw,gw=0,cr;
			$.each(p.colModel, function() {
				if(this.hidden === undefined) {this.hidden=false;}
				if(p.grouping && p.autowidth) {
					var ind = $.inArray(this.name, p.groupingView.groupField);
					if(ind >= 0 && p.groupingView.groupColumnShow.length > ind) {
						this.hidden = !p.groupingView.groupColumnShow[ind];
					}
				}
				this.widthOrg = cw = intNum(this.width,0);
				if(this.hidden===false){
					initwidth += cw+brd;
					if(this.fixed) {
						gw += cw+brd;
					} else {
						vc++;
					}
				}
			});
			if(isNaN(p.width)) {
				p.width  = initwidth + ((p.shrinkToFit ===false && !isNaN(p.height)) ? scw : 0);
			}
			grid.width = p.width;
			p.tblwidth = initwidth;
			if(p.shrinkToFit ===false && p.forceFit === true) {p.forceFit=false;}
			if(p.shrinkToFit===true && vc > 0) {
				aw = grid.width-brd*vc-gw;
				if(!isNaN(p.height)) {
					aw -= scw;
					hs = true;
				}
				initwidth =0;
				$.each(p.colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = Math.round(aw*this.width/(p.tblwidth-brd*vc-gw));
						this.width =cw;
						initwidth += cw;
						lvc = i;
					}
				});
				cr =0;
				if (hs) {
					if(grid.width-gw-(initwidth+brd*vc) !== scw){
						cr = grid.width-gw-(initwidth+brd*vc)-scw;
					}
				} else if(!hs && Math.abs(grid.width-gw-(initwidth+brd*vc)) !== 1) {
					cr = grid.width-gw-(initwidth+brd*vc);
				}
				p.colModel[lvc].width += cr;
				p.tblwidth = initwidth+cr+brd*vc+gw;
				if(p.tblwidth > p.width) {
					p.colModel[lvc].width -= (p.tblwidth - parseInt(p.width,10));
					p.tblwidth = p.width;
				}
			}
		},
		nextVisible= function(iCol) {
			var ret = iCol, j=iCol, i;
			for (i = iCol+1;i<p.colModel.length;i++){
				if(p.colModel[i].hidden !== true ) {
					j=i; break;
				}
			}
			return j-ret;
		},
		getOffset = function (iCol) {
			var $th = $(ts.grid.headers[iCol].el), ret = [$th.position().left + $th.outerWidth()];
			if(p.direction==="rtl") { ret[0] = p.width - ret[0]; }
			ret[0] -= ts.grid.bDiv.scrollLeft;
			ret.push($(ts.grid.hDiv).position().top);
			ret.push($(ts.grid.bDiv).offset().top - $(ts.grid.hDiv).offset().top + $(ts.grid.bDiv).height());
			return ret;
		},
		getColumnHeaderIndex = function (th) {
			var i, headers = ts.grid.headers, ci = getCellIndex(th);
			for (i = 0; i < headers.length; i++) {
				if (th === headers[i].el) {
					ci = i;
					break;
				}
			}
			return ci;
		},
		colTemplate;
		if ($.inArray(p.multikey,sortkeys) === -1 ) {p.multikey = false;}
		p.keyName=false;
		for (iCol=0; iCol<p.colModel.length;iCol++) {
			colTemplate = typeof p.colModel[iCol].template === "string" ?
				(jgrid.cmTemplate != null && typeof jgrid.cmTemplate[p.colModel[iCol].template] === "object" ? jgrid.cmTemplate[p.colModel[iCol].template]: {}) :
				p.colModel[iCol].template;
			p.colModel[iCol] = $.extend(true, {}, p.cmTemplate, colTemplate || {}, p.colModel[iCol]);
			if (p.keyName === false && p.colModel[iCol].key===true) {
				p.keyName = p.colModel[iCol].name;
			}
		}
		p.sortorder = p.sortorder.toLowerCase();
		jgrid.cell_width = jgrid.cellWidth();
		if(p.grouping===true) {
			p.scroll = false;
			p.rownumbers = false;
			//p.subGrid = false; expiremental
			p.treeGrid = false;
			p.gridview = true;
		}
		if(p.treeGrid === true) {
			try { $(this).jqGrid("setTreeGrid");} catch (ignore) {}
			if(p.datatype !== "local") { p.localReader = {id: "_id_"};	}
		}
		if(p.subGrid) {
			try { $(ts).jqGrid("setSubGrid");} catch (ignore){}
		}
		if(p.multiselect) {
			p.colNames.unshift("<input role='checkbox' id='"+p.cbId+"' class='cbox' type='checkbox' aria-checked='false'/>");
			p.colModel.unshift({name:'cb',width:jgrid.cell_width ? p.multiselectWidth+p.cellLayout : p.multiselectWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
		}
		if(p.rownumbers) {
			p.colNames.unshift("");
			p.colModel.unshift({name:'rn',width:p.rownumWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
		}
		p.xmlReader = $.extend(true,{
			root: "rows",
			row: "row",
			page: "rows>page",
			total: "rows>total",
			records : "rows>records",
			repeatitems: true,
			cell: "cell",
			id: "[id]",
			userdata: "userdata",
			subgrid: {root:"rows", row: "row", repeatitems: true, cell:"cell"}
		}, p.xmlReader);
		p.jsonReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},p.jsonReader);
		p.localReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: false,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},p.localReader);
		if(p.scroll){
			p.pgbuttons = false; p.pginput=false; p.rowList=[];
		}
		if(p.data.length) { normalizeData.call(ts); refreshIndex(); }
		var thead = "<thead><tr class='ui-jqgrid-labels' role='row'>",
		tdc, idn, w, res, sort, cmi, tooltip, labelStyle,
		td, ptr, tbody, imgs,iac="",idc="",sortarr=[], sortord=[], sotmp=[];
		if(p.shrinkToFit===true && p.forceFit===true) {
			for (iCol=p.colModel.length-1;iCol>=0;iCol--){
				if(p.colModel[iCol].hidden !== true) {
					p.colModel[iCol].resizable=false;
					break;
				}
			}
		}
		if(p.viewsortcols[1] === 'horizontal') {iac=" ui-i-asc";idc=" ui-i-desc";}
		tdc = isMSIE ?  "ui-th-div-ie" :"";
		imgs = "<span class='s-ico' style='display:none'><span class='ui-grid-ico-sort ui-icon-asc"+iac+" ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-"+dir+"'></span>";
		imgs += "<span class='ui-grid-ico-sort ui-icon-desc"+idc+" ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-"+dir+"'></span></span>";
		if(p.multiSort) {
			sortarr = p.sortname.split(",");
			var iSort;
			for (iSort=0; iSort<sortarr.length; iSort++) {
				sotmp = $.trim(sortarr[iSort]).split(" ");
				sortarr[iSort] = $.trim(sotmp[0]);
				sortord[iSort] = sotmp[1] ? $.trim(sotmp[1]) : p.sortorder || "asc";
			}
		}
		for(iCol=0;iCol<p.colNames.length;iCol++){
			cmi = p.colModel[iCol];
			tooltip = p.headertitles ? (" title=\""+jgrid.stripHtml(p.colNames[iCol])+"\"") :"";
			thead += "<th id='"+p.id+"_"+cmi.name+"' role='columnheader' class='ui-state-default ui-th-column ui-th-"+dir+"'"+ tooltip+">";
			idn = cmi.index || cmi.name;
			switch (cmi.labelAlign) {
				case "left":
					labelStyle = "text-align:left;";
					break;
				case "right":
					labelStyle = "text-align:right;" + (cmi.sortable === false ? "" : "padding-right:" + p.autoResizing.widthOfVisiblePartOfSortIcon  + "px;");
					break;
				case "likeData":
					labelStyle = cmi.align === undefined || cmi.align === "left" ? 
							"text-align:left;" :
							(cmi.align === "right" ? "text-align:right;" + (cmi.sortable === false ? "" : "padding-right:" + p.autoResizing.widthOfVisiblePartOfSortIcon  + "px;") : "");
					break;
				default:
					labelStyle = "";
			}
			thead += "<div id='jqgh_"+p.id+"_"+cmi.name+"'" +
				(tdc === "" && !cmi.labelClasses ? "" : " class='" + (tdc !== "" ? tdc + " " : "") + cmi.labelClasses + "'") +
				(labelStyle === "" ? "" : " style='" + labelStyle + "'") +
				">"+
				(cmi.autoResizable && cmi.formatter !== "actions" ?
					"<span class='" + p.autoResizing.wrapperClassName + "'>" + p.colNames[iCol] + "</span>":
					p.colNames[iCol]);
			if(!cmi.width)  { cmi.width = 150; }
			else { cmi.width = parseInt(cmi.width,10); }
			if(typeof cmi.title !== "boolean") { cmi.title = true; }
			cmi.lso = "";
			if (idn === p.sortname) {
				p.lastsort = iCol;
			}
			if(p.multiSort) {
				sotmp = $.inArray(idn,sortarr);
				if( sotmp !== -1 ) {
					cmi.lso = sortord[sotmp];
				}
			}
			thead += imgs+"</div></th>";
		}
		thead += "</tr></thead>";
		imgs = null;
		$(this).append(thead);
		$("thead tr:first th",this).hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');});
		if(p.multiselect) {
			var emp=[], chk;
			$(p.cb,this).bind('click',function(){
				clearArray(p.selarrrow); // p.selarrrow = [];
				var froz = p.frozenColumns === true ? p.id + "_frozen" : "";
				if (this.checked) {
					$(ts.rows).each(function(i) {
						if (i>0) {
							if(!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass('ui-state-disabled') && !$(this).hasClass("jqfoot")){
								$("#jqg_"+jqID(p.id)+"_"+jqID(this.id) )[p.propOrAttr]("checked",true);
								$(this).addClass("ui-state-highlight").attr("aria-selected","true");  
								p.selarrrow.push(this.id);
								p.selrow = this.id;
								if(froz) {
									$("#jqg_"+jqID(p.id)+"_"+jqID(this.id), ts.grid.fbDiv )[p.propOrAttr]("checked",true);
									$("#"+jqID(this.id), ts.grid.fbDiv).addClass("ui-state-highlight");
								}
							}
						}
					});
					chk=true;
					emp=[];
				}
				else {
					$(ts.rows).each(function(i) {
						if(i>0) {
							if(!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass('ui-state-disabled') && !$(this).hasClass("jqfoot")){
								$("#jqg_"+jqID(p.id)+"_"+jqID(this.id) )[p.propOrAttr]("checked", false);
								$(this).removeClass("ui-state-highlight").attr("aria-selected","false");
								emp.push(this.id);
								if(froz) {
									$("#jqg_"+jqID(p.id)+"_"+jqID(this.id), ts.grid.fbDiv )[p.propOrAttr]("checked",false);
									$("#"+jqID(this.id), ts.grid.fbDiv).removeClass("ui-state-highlight");
								}
							}
						}
					});
					p.selrow = null;
					chk=false;
				}
				feedback.call(ts, "onSelectAll", chk ? p.selarrrow : emp, chk);
			});
		}

		if(p.autowidth===true) {
			var pw = $(eg).innerWidth();
			p.width = pw > 0?  pw: 'nw';
		}
		p.widthOrg = p.width;
		setColWidth();
		$(eg).css("width",grid.width+"px").append("<div class='ui-jqgrid-resize-mark' id='"+p.rsId+"'>&#160;</div>");
		$(p.rs).click(myResizerClickHandler).dblclick(function (e) {
			var iColIndex = $(this).data("idx"), pageX = $(this).data("pageX"), arPageX, pageX1, pageX2, cm = p.colModel[iColIndex];

			if (pageX == null) {
				return false;
			}
			arPageX = String(pageX).split(";");
			pageX1 = parseFloat(arPageX[0]);
			pageX2 = parseFloat(arPageX[1]);
			if (arPageX.length === 2 && (Math.abs(pageX1-pageX2) > 5 || Math.abs(e.pageX-pageX1) > 5 || Math.abs(e.pageX-pageX2) > 5)) {
				return false;
			}
			if (feedback.call(ts, "resizeDblClick", iColIndex, cm, e) && cm != null && cm.autoResizable) {
				$(ts).jqGrid("autoResizeColumn", iColIndex);
			}

			return false; // stop propagate
		});
		$(gv).css("width",grid.width+"px");
		thead = $("thead:first",ts).get(0);
		var	tfoot = "";
		if(p.footerrow) { tfoot += "<table role='presentation' style='width:"+p.tblwidth+"px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-"+dir+"'>"; }
		var thr = $("tr:first",thead),
		firstr = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
		p.disableClick=false;
		$("th",thr).each(function ( j ) {
			w = p.colModel[j].width;
			if(p.colModel[j].resizable === undefined) {p.colModel[j].resizable = true;}
			if(p.colModel[j].resizable){
				res = document.createElement("span");
				$(res).html("&#160;").addClass('ui-jqgrid-resize ui-jqgrid-resize-'+dir)
				.css("cursor","col-resize");
				$(this).addClass(p.resizeclass);
			} else {
				res = "";
			}
			$(this).css("width",w+"px").prepend(res);
			res = null;
			var hdcol = "";
			if(p.colModel[j].hidden === true) {
				$(this).css("display","none");
				hdcol = "display:none;";
			}
			firstr += "<td role='gridcell' style='height:0;width:"+w+"px;"+hdcol+"'></td>";
			grid.headers[j] = { width: w, el: this };
			sort = p.colModel[j].sortable;
			if( typeof sort !== 'boolean') {p.colModel[j].sortable =  true; sort=true;}
			var nm = p.colModel[j].name;
			if( !(nm === 'cb' || nm==='subgrid' || nm==='rn') ) {
				if(p.viewsortcols[2] && sort){
					$(">div",this).addClass('ui-jqgrid-sortable');
				}
			}
			if(sort) {
				if(p.multiSort) {
					if(p.viewsortcols[0]) {
						$("div span.s-ico",this).show(); 
						if(p.colModel[j].lso){ 
							$("div span.ui-icon-"+p.colModel[j].lso,this).removeClass("ui-state-disabled");
						}
					} else if( p.colModel[j].lso) {
						$("div span.s-ico",this).show();
						$("div span.ui-icon-"+p.colModel[j].lso,this).removeClass("ui-state-disabled");
					}
				} else {
					if(p.viewsortcols[0]) {$("div span.s-ico",this).show(); if(j===p.lastsort){ $("div span.ui-icon-"+p.sortorder,this).removeClass("ui-state-disabled");}}
					else if(j === p.lastsort && p.sortname !== "") {$("div span.s-ico",this).show();$("div span.ui-icon-"+p.sortorder,this).removeClass("ui-state-disabled");}
				}
			}
			if(p.footerrow) { tfoot += "<td role='gridcell' "+formatCol(j,0,'', null, '', false)+">&#160;</td>"; }
		}).mousedown(function(e) {
			if ($(e.target).closest("th>span.ui-jqgrid-resize").length !== 1) { return; }
			var ci = getColumnHeaderIndex(this);
			if(p.forceFit===true) {p.nv= nextVisible(ci);}
			grid.dragStart(ci, e, getOffset(ci));
			return false;
		}).click(function(e) {
			if (p.disableClick) {
				p.disableClick = false;
				return false;
			}
			var s = "th>div.ui-jqgrid-sortable",r,d;
			if (!p.viewsortcols[2]) { s = "th>div>span>span.ui-grid-ico-sort"; }
			var t = $(e.target).closest(s);
			if (t.length !== 1) { return; }
			var ci;
			if(p.frozenColumns) {
				var tid =  $(this)[0].id.substring( p.id.length + 1 );
				$(p.colModel).each(function(i){
					if (this.name === tid) {
						ci = i;return false;
					}
				});
			} else {
				ci = getColumnHeaderIndex(this);
			}
			if (!p.viewsortcols[2]) {
				r = true;
				d = t.hasClass("ui-icon-desc") ? "desc" : "asc";
			}
			if(ci != null){
				sortData.call(ts, $('div',this)[0].id, ci, r, d, this);
			}
			return false;
		});
		if (p.sortable && $.fn.sortable) {
			try {
				$(ts).jqGrid("sortableColumns", thr);
			} catch (ignore){}
		}
		if(p.footerrow) { tfoot += "</tr></tbody></table>"; }
		firstr += "</tr>";
		tbody = document.createElement("tbody");
		this.appendChild(tbody);
		$(this).addClass('ui-jqgrid-btable').append(firstr);
		firstr = null;
		var hTable = $("<table class='ui-jqgrid-htable' style='width:"+p.tblwidth+"px' role='presentation' aria-labelledby='gbox_"+this.id+"' cellspacing='0' cellpadding='0' border='0'></table>").append(thead),
		hg = (p.caption && p.hiddengrid===true) ? true : false,
		hb = $("<div class='ui-jqgrid-hbox" + (dir==="rtl" ? "-rtl" : "" )+"'></div>");
		thead = null;
		grid.hDiv = document.createElement("div");
		$(grid.hDiv)
			.css({ width: grid.width+"px"})
			.addClass("ui-state-default ui-jqgrid-hdiv")
			.append(hb);
		$(hb).append(hTable);
		hTable = null;
		if(hg) { $(grid.hDiv).hide(); }
		if(p.pager){
			// see http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
			// or http://api.jquery.com/id-selector/ or http://api.jquery.com/category/selectors/
			// about the requirement to escape characters like '.', ':' or some other in case.
			var $pager, pagerId;
			if (typeof p.pager === "string" && p.pager.substr(0,1) !== "#") {
				pagerId = p.pager; // UNESCAPED id of the pager
				$pager = $("#" + jqID(p.pager));
			} else {
				$pager = $(p.pager); // jQuery wrapper or ESCAPED id selector
				pagerId = $pager.attr("id");
			}
			if ($pager.length > 0) {
				$pager.css({width: grid.width+"px"}).addClass('ui-state-default ui-jqgrid-pager ui-corner-bottom').appendTo(eg);
				if(hg) {$pager.hide();}
				setPager(pagerId,'');
				p.pager = "#" + jqID(pagerId); // hold ESCAPED id selector in the pager
			} else {
				p.pager = ""; // clear wrong value of the pager option
			}
		}
		if( p.cellEdit === false && p.hoverrows === true) {
		$(ts).bind('mouseover',function(e) {
			ptr = $(e.target).closest("tr.jqgrow");
			if($(ptr).attr("class") !== "ui-subgrid") {
				$(ptr).addClass("ui-state-hover");
			}
		}).bind('mouseout',function(e) {
			ptr = $(e.target).closest("tr.jqgrow");
			$(ptr).removeClass("ui-state-hover");
		});
		}
		var ri,ci, tdHtml;
		$(ts).before(grid.hDiv).click(function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 || ptr[0].className.indexOf( 'ui-state-disabled' ) > -1 || ($(td,ts).closest("table.ui-jqgrid-btable").attr('id') || '').replace("_frozen","") !== ts.id ) {
				return this;
			}
			var scb = $(td).hasClass("cbox"), cSel = feedback.call(ts, "beforeSelectRow", ptr[0].id, e);
			if (td.tagName === 'A' || ((td.tagName === 'INPUT' || td.tagName === 'TEXTAREA' || td.tagName === 'OPTION' || td.tagName === 'SELECT' ) && !scb) ) { return; }
			ri = ptr[0].id;
			td = $(td).closest("tr.jqgrow>td");
			if (td.length > 0) {
				ci = getCellIndex(td);
				tdHtml = $(td).closest("td,th").html();
				feedback.call(ts, "onCellSelect", ri, ci, tdHtml, e);
			}
			if(p.cellEdit === true) {
				if(p.multiselect && scb && cSel){
					$(ts).jqGrid("setSelection", ri ,true,e);
				} else if (td.length > 0) {
					ri = ptr[0].rowIndex;
					try {$(ts).jqGrid("editCell",ri,ci,true);} catch (ignore) {}
				}
				return;
			}
			if (!cSel) {
				return;
			}
			if ( !p.multikey ) {
				if(p.multiselect && p.multiboxonly) {
					if(scb){$(ts).jqGrid("setSelection",ri,true,e);}
					else {
						var frz = p.frozenColumns ? p.id+"_frozen" : "";
						$(p.selarrrow).each(function(i,n){
							var trid = $(ts).jqGrid('getGridRowById',n);
							if(trid) { $( trid ).removeClass("ui-state-highlight"); }
							$("#jqg_"+jqID(p.id)+"_"+jqID(n))[p.propOrAttr]("checked", false);
							if(frz) {
								$("#"+jqID(n), "#"+jqID(frz)).removeClass("ui-state-highlight");
								$("#jqg_"+jqID(p.id)+"_"+jqID(n), "#"+jqID(frz))[p.propOrAttr]("checked", false);
							}
						});
						clearArray(p.selarrrow); // p.selarrrow = [];
						$(ts).jqGrid("setSelection",ri,true,e);
					}
				} else {
					$(ts).jqGrid("setSelection",ri,true,e);
				}
			} else {
				if(e[p.multikey]) {
					$(ts).jqGrid("setSelection",ri,true,e);
				} else if(p.multiselect && scb) {
					scb = $("#jqg_"+jqID(p.id)+"_"+ri).is(":checked");
					$("#jqg_"+jqID(p.id)+"_"+ri)[propOrAttr]("checked", scb);
				}
			}
		}).bind('reloadGrid', function(e,opts) {
		    var self = this, gridSelf = self.grid, $self = $(this);
			if (p.treeGrid === true) {
				p.datatype = p.treedatatype;
			}
			if (p.datatype === "local" && p.dataTypeOrg && p.loadonce) {
				p.datatype = String(p.dataTypeOrg);
				delete p.dataTypeOrg;
			}
			if (opts && opts.current) {
				gridSelf.selectionPreserver.call(self);
			}
			if(p.datatype==="local"){ $self.jqGrid("resetSelection");  if(p.data.length) { normalizeData.call(self); refreshIndex();} }
			else if(!p.treeGrid) {
				p.selrow=null;
				if(p.multiselect) {
					clearArray(p.selarrrow); // p.selarrrow = [];
					setHeadCheckBox.call(self, false);
				}
				clearArray(p.savedRow); // p.savedRow = [];
			}
			if(p.scroll) {emptyRows.call(self, true, false);}
			if (opts && opts.page) {
				var page = parseInt(opts.page, 10);
				if (page > p.lastpage) { page = p.lastpage; }
				if (page < 1) { page = 1; }
				p.page = page;
				if (gridSelf.prevRowHeight) {
					gridSelf.bDiv.scrollTop = (page - 1) * gridSelf.prevRowHeight * p.rowNum;
				} else {
					gridSelf.bDiv.scrollTop = 0;
				}
			}
			if (gridSelf.prevRowHeight && p.scroll) {
				delete p.lastpage;
				gridSelf.populateVisible.call(self);
			} else {
				gridSelf.populate.call(self);
			}
			if(p._inlinenav===true) {$self.jqGrid('showAddEditButtons');}
			return false;
		})
		.dblclick(function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 ){return;}
			ri = ptr[0].rowIndex;
			ci = getCellIndex(td);
			if (!feedback.call(ts, "ondblClickRow", $(ptr).attr("id"), ri, ci, e)) {
				return false; // e.preventDefault() and e.stopPropagation() together
			}
		})
		.bind('contextmenu', function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 ){return;}
			if(!p.multiselect) {	$(ts).jqGrid("setSelection",ptr[0].id,true,e);	}
			ri = ptr[0].rowIndex;
			ci = getCellIndex(td);
			if (!feedback.call(ts, "onRightClickRow", $(ptr).attr("id"), ri, ci, e)) {
				return false; // e.preventDefault() and e.stopPropagation() together
			}
		});
		grid.bDiv = document.createElement("div");
		if(isMSIE) { if(String(p.height).toLowerCase() === "auto") { p.height = "100%"; } }
		$(grid.bDiv)
			.append($('<div style="position:relative;"></div>').append('<div></div>').append(ts))
			.addClass("ui-jqgrid-bdiv")
			.css({ height: p.height+(isNaN(p.height)?"":"px"), width: (grid.width)+"px"})
			.scroll(grid.scrollGrid);
		$(ts).css({width:p.tblwidth+"px"});
		if( !$.support.tbody ) { //IE
			if( $(">tbody",this).length === 2 ) { $(">tbody:gt(0)",this).remove();}
		}
		if(p.multikey){
			if( jgrid.msie) {
				$(grid.bDiv).bind("selectstart",function(){return false;});
			} else {
				$(grid.bDiv).bind("mousedown",function(){return false;});
			}
		}
		if(hg) {$(grid.bDiv).hide();}
		grid.cDiv = document.createElement("div");
		var arf = p.hidegrid===true ? $("<a role='link' class='ui-jqgrid-titlebar-close ui-corner-all HeaderButton' " + (p.showhide ? "title='"+p.showhide+"'" : "")+" />").hover(
			function(){ arf.addClass('ui-state-hover');},
			function() {arf.removeClass('ui-state-hover');})
		.append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css((dir==="rtl"?"left":"right"),"0") : "";
		$(grid.cDiv).append(arf).append("<span class='ui-jqgrid-title'>"+p.caption+"</span>")
		.addClass("ui-jqgrid-titlebar ui-jqgrid-caption"+(dir==="rtl" ? "-rtl" :"" )+" ui-widget-header ui-corner-top ui-helper-clearfix");
		$(grid.cDiv).insertBefore(grid.hDiv);
		if( p.toolbar[0] ) {
			grid.uDiv = document.createElement("div");
			if(p.toolbar[1] === "top") {$(grid.uDiv).insertBefore(grid.hDiv);}
			else if (p.toolbar[1]==="bottom" ) {$(grid.uDiv).insertAfter(grid.hDiv);}
			if(p.toolbar[1]==="both") {
				grid.ubDiv = document.createElement("div");
				$(grid.uDiv).addClass("ui-userdata ui-state-default").attr("id","t_"+this.id).insertBefore(grid.hDiv);
				$(grid.ubDiv).addClass("ui-userdata ui-state-default").attr("id","tb_"+this.id).insertAfter(grid.hDiv);
				if(hg)  {$(grid.ubDiv).hide();}
			} else {
				$(grid.uDiv).width(grid.width).addClass("ui-userdata ui-state-default").attr("id","t_"+this.id);
			}
			if(hg) {$(grid.uDiv).hide();}
		}
		p.datatype = p.datatype.toLowerCase();
		if(p.toppager) {
			p.toppager = p.id+"_toppager";
			grid.topDiv = $("<div id='"+p.toppager+"'></div>")[0];
			$(grid.topDiv).addClass('ui-state-default ui-jqgrid-toppager').css({width: grid.width+"px"}).insertBefore(grid.hDiv);
			setPager(p.toppager,'_t');
			p.toppager = "#"+jqID(p.toppager); // hold ESCAPED id selector in the toppager option
		} else if (p.pager === "" && !p.scroll) {
			p.rowNum = p.maxRowNum;
		}
		if(p.footerrow) {
			grid.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0];
			hb = $("<div class='ui-jqgrid-hbox"+(dir==="rtl"?"-rtl":"")+"'></div>");
			$(grid.sDiv).append(hb).width(grid.width).insertAfter(grid.hDiv);
			$(hb).append(tfoot);
			grid.footers = $(".ui-jqgrid-ftable",grid.sDiv)[0].rows[0].cells;
			if(p.rownumbers) { grid.footers[0].className = 'ui-state-default jqgrid-rownum'; }
			if(hg) {$(grid.sDiv).hide();}
		}
		hb = null;
		if(p.caption) {
			var tdt = p.datatype;
			if(p.hidegrid===true) {
				$(".ui-jqgrid-titlebar-close",grid.cDiv).click( function(e){
					var elems = ".ui-jqgrid-bdiv,.ui-jqgrid-hdiv,.ui-jqgrid-pager,.ui-jqgrid-sdiv",
					counter, self = this;
					if(p.toolbar[0]===true) {
						if( p.toolbar[1]==='both') {
							elems += ',#' + jqID($(grid.ubDiv).attr('id'));
						}
						elems += ',#' + jqID($(grid.uDiv).attr('id'));
					}
					counter = $(elems, p.gView).length;
					if(p.toppager) {
						elems += ',' + p.toppager;
					}

					if(p.gridstate === 'visible') {
						$(elems, p.gBox).slideUp("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
								p.gridstate = 'hidden';
								if($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle",p.gBox).hide(); }
								$(grid.cDiv).addClass("ui-corner-bottom");
								if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
							}
						});
					} else if(p.gridstate === 'hidden'){
						$(grid.cDiv).removeClass("ui-corner-bottom");
						$(elems,p.gBox).slideDown("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
								if(hg) {p.datatype = tdt;populate.call(ts);hg=false;}
								p.gridstate = 'visible';
								if($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle",p.gBox).show(); }
								if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
							}
						});
					}
					return false;
				});
				if(hg) {p.datatype="local"; $(".ui-jqgrid-titlebar-close",grid.cDiv).trigger("click");}
			}
		} else {
			$(grid.cDiv).hide();
			$(grid.cDiv).nextAll("div:visible").filter(":first").addClass('ui-corner-top'); // set on top toolbar or toppager or on hDiv
		}
		$(grid.hDiv).after(grid.bDiv)
		.mousemove(function (e) {
			if(grid.resizing){grid.dragMove(e);return false;}
		});
		$(eg).click(myResizerClickHandler).dblclick(function (e) { // it's still needed for Firefox
			var arPageX, pageX1, pageX2,
				$resizer = $(p.rs),
				resizerOffset = $resizer.offset(),
				iColIndex = $resizer.data("idx"),
				cm = p.colModel[iColIndex],
				pageX = $(this).data("pageX") || $resizer.data("pageX");

			if (pageX == null) {
				return false;
			}
			arPageX = String(pageX).split(";");
			pageX1 = parseFloat(arPageX[0]);
			pageX2 = parseFloat(arPageX[1]);
			if (arPageX.length === 2 && (Math.abs(pageX1-pageX2) > 5 || Math.abs(e.pageX-pageX1) > 5 || Math.abs(e.pageX-pageX2) > 5)) {
				return false;
			}
				
			if (feedback.call(ts, "resizeDblClick", iColIndex, cm) &&
					(resizerOffset.left - 1 <= e.pageX && e.pageX <= resizerOffset.left + $resizer.outerWidth() + 1) && cm != null && cm.autoResizable) {
				$(ts).jqGrid("autoResizeColumn", iColIndex);
			}
			return false;
		});
		if (!p.pager) {
			$(grid.cDiv).nextAll("div:visible").filter(":last").addClass('ui-corner-bottom'); // set on bottom toolbar or footer (sDiv) or on bDiv
		}
		$(".ui-jqgrid-labels",grid.hDiv).bind("selectstart", function () { return false; });
		$(document).bind( "mouseup.jqGrid" + p.id, function () {
			if (grid.resizing !== false) {
				grid.dragEnd();
				return false;
			}
			return true;
		});
		ts.formatCol = formatCol;
		ts.sortData = sortData;
		ts.updatepager = updatepager;
		ts.refreshIndex = refreshIndex;
		ts.setHeadCheckBox = setHeadCheckBox;
		ts.constructTr = constructTr;
		ts.formatter = function ( rowId, cellval , colpos, rwdat, act){return formatter(rowId, cellval , colpos, rwdat, act);};
		$.extend(grid,{populate : populate, emptyRows: emptyRows, beginReq: beginReq, endReq: endReq});
		this.grid = grid;
		ts.addXmlData = function(d) {addXmlData.call(ts,d);};
		ts.addJSONData = function(d) {addJSONData.call(ts,d);};
		this.grid.cols = this.rows[0].cells;
		feedback.call(ts, "onInitGrid");

		populate.call(ts);p.hiddengrid=false;
	});
};
$.jgrid.extend({
	getGridParam : function(pName) {
		var $t = this[0];
		if (!$t || !$t.grid) {return null;}
		if (!pName) { return $t.p; }
		return $t.p[pName] !== undefined ? $t.p[pName] : null;
	},
	setGridParam : function (newParams, overwrite){
		return this.each(function(){
			var self = this;
			if(overwrite == null) {
				overwrite = false;
			}
			if (self.grid && typeof newParams === 'object') {
				if(overwrite === true) {
					var params = $.extend({}, self.p, newParams);
					self.p = params;
				} else {
					$.extend(true,self.p,newParams);
				}
			}
		});
	},
	getGridRowById: function ( rowid ) {
		if (rowid == null) {
			return null;
		}
		var row, rowId = rowid.toString();
		this.each( function(){
			var i, rows = this.rows, tr;
			try {
				//row = this.rows.namedItem( rowid );
				i = rows.length;
				while(i--) {
					tr = rows[i];
					if( rowId === tr.id) {
						row = tr;
						break;
					}
				}
			} catch ( e ) {
				row = $(this.grid.bDiv).find( "#" + $.jgrid.jqID( rowid ));
				row = row.length > 0 ? row[0] : null;
			}
		});
		return row;
	},
	getDataIDs : function () {
		var ids=[];
		this.each(function(){
			var rows = this.rows, len = rows.length, i, tr;
			if(len && len>0){
				for (i=0; i<len; i++) {
					tr = rows[i];
					if($(tr).hasClass('jqgrow')) {
						ids.push(tr.id);
					}
				}
			}
		});
		return ids;
	},
	setSelection : function(selection,onsr, e) {
		return this.each(function(){
			var $t = this, p = $t.p, stat,pt, ner, ia, tpsr, fid, csr, jgrid = $.jgrid, jqID = jgrid.jqID, feedback = jgrid.feedback;
			if(selection === undefined) { return; }
			onsr = onsr === false ? false : true;
			pt=$($t).jqGrid('getGridRowById', selection);
			if(!pt || !pt.className || pt.className.indexOf( 'ui-state-disabled' ) > -1 ) { return; }
			function scrGrid(tr, bDiv){
				var ch = bDiv.clientHeight,
				st = bDiv.scrollTop,
				rpos = $(tr).position().top,
				rh = tr.clientHeight;
				if(rpos+rh >= ch+st) {bDiv.scrollTop = rpos-(ch+st)+rh+st; }
				else if(rpos < ch+st) {
					if(rpos < st) {
						bDiv.scrollTop = rpos;
					}
				}
			}
			if(p.scrollrows===true) {
				ner = $($t).jqGrid('getGridRowById',selection).rowIndex;
				if(ner >=0 ){
					scrGrid($t.rows[ner], $t.grid.bDiv);
				}
			}
			if(p.frozenColumns === true ) {
				fid = p.id+"_frozen";
			}
			if(!p.multiselect) {	
				if(pt.className !== "ui-subgrid") {
					if( p.selrow !== pt.id ) {
						if (p.selrow !== null) {
							csr = $($t).jqGrid('getGridRowById', p.selrow);
							if( csr ) {
								$(  csr ).removeClass("ui-state-highlight").attr({"aria-selected":"false", "tabindex" : "-1"});
							}
						}
						$(pt).addClass("ui-state-highlight").attr({"aria-selected":"true", "tabindex" : "0"});//.focus();
						if(fid) {
							$("#"+jqID(p.selrow), "#"+jqID(fid)).removeClass("ui-state-highlight");
							$("#"+jqID(selection), "#"+jqID(fid)).addClass("ui-state-highlight");
						}
						stat = true;
					} else {
						stat = false;
					}
					p.selrow = pt.id;
					if( onsr ) {
						feedback.call($t, "onSelectRow", pt.id, stat, e);
					}
				}
			} else {
				//unselect selectall checkbox when deselecting a specific row
				$t.setHeadCheckBox(false);
				p.selrow = pt.id;
				ia = $.inArray(p.selrow,p.selarrrow);
				if (  ia === -1 ){
					if(pt.className !== "ui-subgrid") { $(pt).addClass("ui-state-highlight").attr("aria-selected","true");}
					stat = true;
					p.selarrrow.push(p.selrow);
				} else {
					if(pt.className !== "ui-subgrid") { $(pt).removeClass("ui-state-highlight").attr("aria-selected","false");}
					stat = false;
					p.selarrrow.splice(ia,1);
					tpsr = p.selarrrow[0];
					p.selrow = (tpsr === undefined) ? null : tpsr;
				}
				$("#jqg_"+jqID(p.id)+"_"+jqID(pt.id))[p.propOrAttr]("checked",stat);
				if(fid) {
					if(ia === -1) {
						$("#"+jqID(selection), "#"+jqID(fid)).addClass("ui-state-highlight");
					} else {
						$("#"+jqID(selection), "#"+jqID(fid)).removeClass("ui-state-highlight");
					}
					$("#jqg_"+jqID(p.id)+"_"+jqID(selection), "#"+jqID(fid))[p.propOrAttr]("checked",stat);
				}
				if( onsr ) {
					feedback.call($t, "onSelectRow", pt.id, stat, e);
				}
			}
		});
	},
	resetSelection : function( rowid ){
		return this.each(function(){
			var t = this, p = t.p, sr, frozenColumns = p.frozenColumns === true, jgrid = $.jgrid, clearArray = jgrid.clearArray,
			jqID = jgrid.jqID, gridIdEscaped = jqID(p.id), gridIdSelector = p.idSel,
			fid = p.id+"_frozen", gridIdFrozenSelector = "#"+jqID(fid);
			if( p.frozenColumns === true ) {
				fid = p.id+"_frozen";
			}
			if(rowid !== undefined ) {
				sr = rowid === p.selrow ? p.selrow : rowid;
				$(gridIdSelector+">tbody>tr#"+jqID(sr)).removeClass("ui-state-highlight").attr("aria-selected","false");
				if (frozenColumns) { $("#"+jqID(sr), gridIdFrozenSelector).removeClass("ui-state-highlight"); }
				if(p.multiselect) {
					$("#jqg_"+jqID(p.id)+"_"+jqID(sr), gridIdSelector)[p.propOrAttr]("checked",false);
					if(frozenColumns) { $("#jqg_"+gridIdEscaped+"_"+jqID(sr), gridIdFrozenSelector)[p.propOrAttr]("checked",false); }
					t.setHeadCheckBox(false);
					var ia = $.inArray(jqID(sr), p.selarrrow);
					if (ia !== -1) {
						p.selarrrow.splice(ia,1);
					}
				}
				sr = null;
			} else if(!p.multiselect) {
				if(p.selrow) {
					$(gridIdSelector+">tbody>tr#"+jqID(p.selrow)).removeClass("ui-state-highlight").attr("aria-selected","false");
					if(frozenColumns) { $("#"+jqID(p.selrow), gridIdFrozenSelector).removeClass("ui-state-highlight"); }
					p.selrow = null;
				}
			} else {
				$(p.selarrrow).each(function(i,n){
					var selRowIdEscaped = jqID(n);
					$( $(t).jqGrid('getGridRowById',n) ).removeClass("ui-state-highlight").attr("aria-selected","false");
					$("#jqg_"+gridIdEscaped+"_"+selRowIdEscaped)[p.propOrAttr]("checked",false);
					if(frozenColumns) { 
						$("#"+selRowIdEscaped, gridIdFrozenSelector).removeClass("ui-state-highlight"); 
						$("#jqg_"+gridIdEscaped+"_"+selRowIdEscaped, gridIdFrozenSelector)[p.propOrAttr]("checked",false);
					}
				});
				t.setHeadCheckBox(false);
				clearArray(p.selarrrow); // p.selarrrow = [];
				p.selrow = null;
			}
			if(p.cellEdit === true) {
				if(parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",t.rows[p.iRow]).removeClass("edit-cell ui-state-highlight");
					$(t.rows[p.iRow]).removeClass("selected-row ui-state-hover");
				}
			}
			clearArray(p.savedRow); // p.savedRow = [];
		});
	},
	getRowData : function( rowid ) {
		var res = {}, resall;
		this.each(function(){
			var $t = this, p = $t.p, getall=false, ind, len = 2, j=0, rows = $t.rows;
			if(rowid === undefined) {
				getall = true;
				resall = [];
				len = rows.length;
			} else {
				ind = $($t).jqGrid('getGridRowById', rowid);
				if(!ind) { return res; }
			}
			while(j<len){
				if(getall) { ind = rows[j]; }
				if( $(ind).hasClass('jqgrow') ) {
					$('td[role="gridcell"]',ind).each( function(i) {
						var cm = p.colModel[i], nm = cm.name;
						if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
							if(p.treeGrid===true && nm === p.ExpandColumn) {
								res[nm] = $.jgrid.htmlDecode($("span",this).filter(":first").html());
							} else {
								try {
									res[nm] = $.unformat.call($t,this,{rowId:ind.id, colModel:cm},i);
								} catch (exception){
									res[nm] = $.jgrid.htmlDecode($(this).html());
								}
							}
						}
					});
					if(getall) { resall.push(res); res={}; }
				}
				j++;
			}
		});
		return resall || res;
	},
	delRowData : function(rowid) {
		var success = false, rowInd, ia, nextRow;
		this.each(function() {
			var $t = this, p = $t.p;
			rowInd = $($t).jqGrid('getGridRowById', rowid);
			if(!rowInd) {return false;}
				if(p.subGrid) {
					nextRow = $(rowInd).next();
					if(nextRow.hasClass('ui-subgrid')) {
						nextRow.remove();
					}
				}
				$(rowInd).remove();
				p.records--;
				p.reccount--;
				$t.updatepager(true,false);
				success=true;
				if(p.multiselect) {
					ia = $.inArray(rowid,p.selarrrow);
					if(ia !== -1) { p.selarrrow.splice(ia,1);}
				}
				if (p.multiselect && p.selarrrow.length > 0) {
					p.selrow = p.selarrrow[p.selarrrow.length-1];
				} else {
					p.selrow = null;
				}
			if(p.datatype === 'local') {
				var id = $.jgrid.stripPref(p.idPrefix, rowid),
				pos = p._index[id];
				if(pos !== undefined) {
					p.data.splice(pos,1);
					$t.refreshIndex();
				}
			}
			if( p.altRows === true && success ) {
				var cn = p.altclass;
				$($t.rows).each(function(i){
					if(i % 2 === 1) { $(this).addClass(cn); }
					else { $(this).removeClass(cn); }
				});
			}
		});
		return success;
	},
	setRowData : function(rowid, data, cssp) {
		var success=true;
		this.each(function(){
			var t = this, p = t.p, vl, ind, cp = typeof cssp, lcdata={};
			if(!t.grid) {return false;}
			ind = $(t).jqGrid('getGridRowById', rowid);
			if(!ind) { return false; }
			if( data ) {
				try {
					$(p.colModel).each(function(i){
						var cm = this, nm = cm.name, title;
						var dval =$.jgrid.getAccessor(data,nm);
						if( dval !== undefined) {
							lcdata[nm] = cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date' ? $.unformat.date.call(t,dval,cm) : dval;
							vl = t.formatter( rowid, lcdata[nm], i, data, 'edit');
							title = cm.title ? {"title":$.jgrid.stripHtml(vl)} : {};
							if(p.treeGrid===true && nm === p.ExpandColumn) {
								$("td[role='gridcell']:eq("+i+") > span:first",ind).html(vl).attr(title);
							} else {
								$("td[role='gridcell']:eq("+i+")",ind).html(vl).attr(title);
							}
						}
					});
					if(p.datatype === 'local') {
						var id = $.jgrid.stripPref(p.idPrefix, rowid),
						pos = p._index[id], key;
						if(p.treeGrid) {
							for(key in p.treeReader){
								if(p.treeReader.hasOwnProperty(key)) {
									delete lcdata[p.treeReader[key]];
								}
							}
						}
						if(pos !== undefined) {
							p.data[pos] = $.extend(true, p.data[pos], lcdata);
						}
						lcdata = null;
					}
				} catch (exception) {
					success = false;
				}
			}
			if(success) {
				if(cp === 'string') {$(ind).addClass(cssp);} else if(cssp !== null && cp === 'object') {$(ind).css(cssp);}
				$(t).triggerHandler("jqGridAfterGridComplete");
			}
		});
		return success;
	},
	addRowData : function(rowid,rdata,pos,src) {
		if(["first", "last", "before", "after"].indexOf(pos) === -1) {pos = "last";}
		var success = false, nm, row, gi, si, ni,sind, i, v, prp="", aradd, cnm, cn, data, cm, id;
		if(rdata) {
			if($.isArray(rdata)) {
				aradd=true;
				//pos = "last";
				cnm = rowid;
			} else {
				rdata = [rdata];
				aradd = false;
			}
			this.each(function() {
				var t = this, p = t.p, datalen = rdata.length, jgrid = $.jgrid, feedback = jgrid.feedback, randId = jgrid.randId;
				ni = p.rownumbers===true ? 1 :0;
				gi = p.multiselect ===true ? 1 :0;
				si = p.subGrid===true ? 1 :0;
				if(!aradd) {
					if(rowid !== undefined) { rowid = String(rowid);}
					else {
						rowid = randId();
						if(p.keyName !== false) {
							cnm = p.keyName;
							if(rdata[0][cnm] !== undefined) { rowid = rdata[0][cnm]; }
						}
					}
				}
				cn = p.altclass;
				var k = 0, cna ="", lcdata = {};
				while(k < datalen) {
					data = rdata[k];
					row=[];
					if(aradd) {
						try {
							rowid = data[cnm];
							if(rowid===undefined) {
								rowid = randId();
							}
						}
						catch (exception) {rowid = randId();}
						cna = p.altRows === true ?  (t.rows.length-1)%2 === 0 ? cn : "" : "";
					}
					id = rowid;
					rowid  = p.idPrefix + rowid;
					if(ni){
						prp = t.formatCol(0,1,'',null,rowid, true);
						row.push("<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+prp+">0</td>");
					}
					if(gi) {
						v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+p.id+"_"+rowid+"\" class=\"cbox\" aria-checked=\"false\"/>";
						prp = t.formatCol(ni,1,'', null, rowid, true);
						row.push("<td role=\"gridcell\" "+prp+">"+v+"</td>");
					}
					if(si) {
						row.push($(t).jqGrid("addSubGridCell",gi+ni,1));
					}
					for(i = gi+si+ni; i < p.colModel.length;i++){
						cm = p.colModel[i];
						nm = cm.name;
						lcdata[nm] = data[nm];
						v = t.formatter( rowid, $.jgrid.getAccessor(data,nm), i, data );
						prp = t.formatCol(i,1,v, data, rowid, lcdata);
						row.push("<td role=\"gridcell\" "+prp+">"+v+"</td>");
					}
					row.unshift(t.constructTr(rowid, false, cna, lcdata, data, false));
					row.push("</tr>");
					row = row.join('');
					if(t.rows.length === 0){
						$("table:first",t.grid.bDiv).append(row);
					} else {
						switch (pos) {
							case 'last':
								$(t.rows[t.rows.length-1]).after(row);
								sind = t.rows.length-1;
								break;
							case 'first':
								$(t.rows[0]).after(row);
								sind = 1;
								break;
							case 'after':
								sind = $(t).jqGrid('getGridRowById', src);
								if (sind) {
									if ($(t.rows[sind.rowIndex+1]).hasClass("ui-subgrid")) {
										$(t.rows[sind.rowIndex+1]).after(row);
										sind=sind.rowIndex + 2;
									} else {
										$(sind).after(row);
										sind=sind.rowIndex + 1;
									}
								}	
								break;
							case 'before':
								sind = $(t).jqGrid('getGridRowById', src);
								if(sind) {
									$(sind).before(row);
									sind=sind.rowIndex - 1;
								}
								break;
						}
					}
					if(p.subGrid===true) {
						$(t).jqGrid("addSubGrid",gi+ni, sind);
					}
					p.records++;
					p.reccount++;
					feedback.call(t, "afterInsertRow", rowid, data, data);
					k++;
					if(p.datatype === 'local') {
						lcdata[p.localReader.id] = id;
						p._index[id] = p.data.length;
						p.data.push(lcdata);
						lcdata = {};
					}
				}
				if( p.altRows === true && !aradd) {
					if (pos === "last") {
						if ((t.rows.length-1)%2 === 1)  {$(t.rows[t.rows.length-1]).addClass(cn);}
					} else {
						$(t.rows).each(function(i){
							if(i % 2 ===1) { $(this).addClass(cn); }
							else { $(this).removeClass(cn); }
						});
					}
				}
				t.updatepager(true,true);
				success = true;
			});
		}
		return success;
	},
	footerData : function(action,data, format) {
		var nm, success=false, res={}, title;
		function isEmpty(obj) {
			var i;
			for(i in obj) {
				if (obj.hasOwnProperty(i)) { return false; }
			}
			return true;
		}
		if(action === undefined) { action = "get"; }
		if(typeof format !== "boolean") { format  = true; }
		action = action.toLowerCase();
		this.each(function(){
			var t = this, p = t.p, vl;
			if(!t.grid || !p.footerrow) {return false;}
			if(action === "set") { if(isEmpty(data)) { return false; } }
			success=true;
			$(p.colModel).each(function(i){
				nm = this.name;
				if(action === "set") {
					if( data[nm] !== undefined) {
						vl = format ? t.formatter( "", data[nm], i, data, 'edit') : data[nm];
						title = this.title ? {"title":$.jgrid.stripHtml(vl)} : {};
						$("tr.footrow td:eq("+i+")",t.grid.sDiv).html(vl).attr(title);
						success = true;
					}
				} else if(action === "get") {
					res[nm] = $("tr.footrow td:eq("+i+")",t.grid.sDiv).html();
				}
			});
		});
		return action === "get" ? res : success;
	},
	showHideCol : function(colname,show) {
		return this.each(function() {
			var $t = this, fndh=false, p = $t.p, jgrid = $.jgrid, feedback = jgrid.feedback,
			brd=jgrid.cell_width ? 0: p.cellLayout, cw;
			if (!$t.grid ) {return;}
			if( typeof colname === 'string') {colname=[colname];}
			show = show !== "none" ? "" : "none";
			var sw = show === "" ? true :false,
			gh = p.groupHeader && (typeof p.groupHeader === 'object' || $.isFunction(p.groupHeader) );
			if(gh) { $($t).jqGrid('destroyGroupHeader', false); }
			$(p.colModel).each(function(i) {
				if ($.inArray(this.name,colname) !== -1 && this.hidden === sw) {
					if(p.frozenColumns === true && this.frozen === true) {
						return true;
					}
					$("tr[role=row]",$t.grid.hDiv).each(function(){
						$(this.cells[i]).css("display", show);
					});
					$($t.rows).each(function(){
						if (!$(this).hasClass("jqgroup")) {
							$(this.cells[i]).css("display", show);
						}
					});
					if(p.footerrow) { $("tr.footrow td:eq("+i+")", $t.grid.sDiv).css("display", show); }
					cw =  parseInt(this.width,10);
					if(show === "none") {
						p.tblwidth -= cw+brd;
					} else {
						p.tblwidth += cw+brd;
					}
					this.hidden = !sw;
					fndh=true;
					feedback.call($t, "onShowHideCol", sw, this.name, i);
				}
			});
			if(fndh===true) {
				if(p.shrinkToFit === true && !isNaN(p.height)) { p.tblwidth += parseInt(p.scrollOffset,10);}
				$($t).jqGrid("setGridWidth",p.shrinkToFit === true ? p.tblwidth : p.width );
			}
			if( gh )  {
				$($t).jqGrid('setGroupHeaders',p.groupHeader);
			}
		});
	},
	hideCol : function (colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"none");});
	},
	showCol : function(colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"");});
	},
	remapColumns : function(permutation, updateCells, keepHeader)
	{
		function resortArray(a) {
			var ac;
			if (a.length) {
				ac = $.makeArray(a);
			} else {
				ac = $.extend({}, a);
			}
			$.each(permutation, function(i) {
				a[i] = ac[this];
			});
		}
		var ts = this.get(0), p = ts.p, grid = ts.grid;
		function resortRows(parent, clobj) {
			$(">tr"+(clobj||""), parent).each(function() {
				var row = this;
				var elems = $.makeArray(row.cells);
				$.each(permutation, function() {
					var e = elems[this];
					if (e) {
						row.appendChild(e);
					}
				});
			});
		}
		resortArray(p.colModel);
		resortArray(p.colNames);
		resortArray(grid.headers);
		resortRows($("thead:first", grid.hDiv), keepHeader && ":not(.ui-jqgrid-labels)");
		if (updateCells) {
			resortRows($(ts.tBodies[0]), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
		}
		if (p.footerrow) {
			resortRows($("tbody:first", grid.sDiv));
		}
		if (p.remapColumns) {
			if (!p.remapColumns.length){
				p.remapColumns = $.makeArray(permutation);
			} else {
				resortArray(p.remapColumns);
			}
		}
		p.lastsort = $.inArray(p.lastsort, permutation);
		if(p.treeGrid) { p.expColInd = $.inArray(p.expColInd, permutation); }
		$.jgrid.feedback.call(ts, "onRemapColumns", permutation, updateCells, keepHeader);
	},
	setGridWidth : function(nwidth, shrink) {
		return this.each(function(){
			var $t = this, p = $t.p, jgrid = $.jgrid, cw, grid = $t.grid, initwidth = 0, lvc, vc=0, hs=false, aw, gw=0, cr;
			if (!grid || p == null) {return;}
			var colModel = p.colModel, cm, scw = p.scrollOffset, brd = jgrid.cell_width ? 0 : p.cellLayout, thInfo,
				headers = grid.headers, footers = grid.footers, bDiv = grid.bDiv, hDiv = grid.hDiv, sDiv = grid.sDiv, cols = grid.cols;
			if(typeof shrink !== 'boolean') {
				shrink=p.shrinkToFit;
			}
			if(isNaN(nwidth)) {return;}
			nwidth = parseInt(nwidth,10); 
			grid.width = p.width = nwidth;
			$(p.gBox).css("width",nwidth+"px");
			$(p.gView).css("width",nwidth+"px");
			$(bDiv).css("width",nwidth+"px");
			$(hDiv).css("width",nwidth+"px");
			if(p.pager) {$(p.pager).css("width",nwidth+"px");}
			if(p.toppager) {$(p.toppager).css("width",nwidth+"px");}
			if(p.toolbar[0] === true){
				$(grid.uDiv).css("width",nwidth+"px");
				if(p.toolbar[1]==="both") {$(grid.ubDiv).css("width",nwidth+"px");}
			}
			if(p.footerrow) { $(sDiv).css("width",nwidth+"px"); }
			if(shrink ===false && p.forceFit === true) {p.forceFit=false;}
			if(shrink===true) {
				$.each(colModel, function() {
					if(this.hidden===false){
						cw = this.widthOrg;
						initwidth += cw+brd;
						if(this.fixed) {
							gw += cw+brd;
						} else {
							vc++;
						}
					}
				});
				if(vc  === 0) { return; }
				p.tblwidth = initwidth;
				aw = nwidth-brd*vc-gw;
				if(!isNaN(p.height)) {
					if(bDiv.clientHeight < bDiv.scrollHeight || $t.rows.length === 1){
						hs = true;
						aw -= scw;
					}
				}
				initwidth =0;
				var cle = cols.length >0;
				$.each(colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = this.widthOrg;
						cw = Math.round(aw*cw/(p.tblwidth-brd*vc-gw));
						if (cw < 0) { return; }
						this.width =cw;
						initwidth += cw;
						headers[i].width=cw;
						headers[i].el.style.width=cw+"px";
						if(p.footerrow) { footers[i].style.width = cw+"px"; }
						if(cle) { cols[i].style.width = cw+"px"; }
						lvc = i;
					}
				});

				if (!lvc) { return; }

				cr = 0;
				if (hs) {
					if(nwidth-gw-(initwidth+brd*vc) !== scw){
						cr = nwidth-gw-(initwidth+brd*vc)-scw;
					}
				} else if( Math.abs(nwidth-gw-(initwidth+brd*vc)) !== 1) {
					cr = nwidth-gw-(initwidth+brd*vc);
				}
				cm = colModel[lvc];
				cm.width += cr;
				p.tblwidth = initwidth+cr+brd*vc+gw;
				if(p.tblwidth > nwidth) {
					var delta = p.tblwidth - parseInt(nwidth,10);
					p.tblwidth = nwidth;
					cm.width = cm.width-delta;
				}
				cw = cm.width;
				thInfo = headers[lvc];
				thInfo.width = cw;
				thInfo.el.style.width=cw+"px";
				if(cle) { cols[lvc].style.width = cw+"px"; }
				if(p.footerrow) {
					footers[lvc].style.width = cw+"px";
				}
			}
			if(p.tblwidth) {
				$('table:first',bDiv).css("width",p.tblwidth+"px");
				$('table:first',hDiv).css("width",p.tblwidth+"px");
				hDiv.scrollLeft = bDiv.scrollLeft;
				if(p.footerrow) {
					$('table:first',sDiv).css("width",p.tblwidth+"px");
				}
			}
		});
	},
	setGridHeight : function (nh) {
		return this.each(function (){
			var $t = this, grid = $t.grid, p = $t.p;
			if(!$t.grid) {return;}
			var bDiv = $(grid.bDiv);
			bDiv.css({height: nh+(isNaN(nh)?"":"px")});
			if(p.frozenColumns === true){
				//follow the original set height to use 16, better scrollbar width detection
				$(p.idSel+"_frozen").parent().height(bDiv.height() - 16);
			}
			p.height = nh;
			if (p.scroll) { grid.populateVisible.call($t); }
		});
	},
	setCaption : function (newcap){
		return this.each(function(){
			var self = this, cDiv = self.grid.cDiv;
			self.p.caption=newcap;
			$("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl",cDiv).html(newcap);
			$(cDiv).show();
			$(cDiv).nextAll("div").removeClass('ui-corner-top');
		});
	},
	setLabel : function(colname, nData, prop, attrp ){
		return this.each(function(){
			var $t = this, pos=-1;
			if(!$t.grid) {return;}
			if(colname !== undefined) {
				$($t.p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else { return; }
			if(pos>=0) {
				var thecol = $("tr.ui-jqgrid-labels th:eq("+pos+")",$t.grid.hDiv);
				if (nData){
					var ico = $(".s-ico",thecol);
					$("[id^=jqgh_]",thecol).empty().html(nData).append(ico);
					$t.p.colNames[pos] = nData;
				}
				if (prop) {
					if(typeof prop === 'string') {$(thecol).addClass(prop);} else {$(thecol).css(prop);}
				}
				if(typeof attrp === 'object') {$(thecol).attr(attrp);}
			}
		});
	},
	setCell : function(rowid,colname,nData,cssp,attrp, forceupd) {
		return this.each(function(){
			var $t = this, pos =-1,v, title;
			if(!$t.grid) {return;}
			if(isNaN(colname)) {
				$($t.p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(colname,10);}
			if(pos>=0) {
				var ind = $($t).jqGrid('getGridRowById', rowid); 
				if (ind){
					var tcell = $("td:eq("+pos+")",ind), cl=0, rawdat=[];
					if(nData !== "" || forceupd === true) {
						while(cl<ind.cells.length) {
							// slow down speed
							rawdat.push(ind.cells[cl].innerHTML);
							cl++;
						}
						v = $t.formatter(rowid, nData, pos, rawdat, 'edit');
						title = $t.p.colModel[pos].title ? {"title":$.jgrid.stripHtml(v)} : {};
						if($t.p.treeGrid && $(".tree-wrap",$(tcell)).length>0) {
							$("span",$(tcell)).html(v).attr(title);
						} else {
							$(tcell).html(v).attr(title);
						}
						if($t.p.datatype === "local") {
							var cm = $t.p.colModel[pos], index;
							nData = cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date' ? $.unformat.date.call($t,nData,cm) : nData;
							index = $t.p._index[$.jgrid.stripPref($t.p.idPrefix, rowid)];
							if(index !== undefined) {
								$t.p.data[index][cm.name] = nData;
							}
						}
					}
					if(typeof cssp === 'string'){
						$(tcell).addClass(cssp);
					} else if(cssp) {
						$(tcell).css(cssp);
					}
					if(typeof attrp === 'object') {$(tcell).attr(attrp);}
				}
			}
		});
	},
	getCell : function(rowid,col) {
		var ret = false;
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ind = $($t).jqGrid('getGridRowById', rowid);
				if(ind) {
					try {
						ret = $.unformat.call($t,$("td:eq("+pos+")",ind),{rowId:ind.id, colModel:$t.p.colModel[pos]},pos);
					} catch (exception){
						ret = $.jgrid.htmlDecode($("td:eq("+pos+")",ind).html());
					}
				}
			}
		});
		return ret;
	},
	getCol : function (col, obj, mathopr) {
		var ret = [], val, sum=0, min, max, v;
		obj = typeof obj !== 'boolean' ? false : obj;
		if(mathopr === undefined) { mathopr = false; }
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ln = $t.rows.length, i =0, dlen=0;
				if (ln && ln>0){
					while(i<ln){
						if($($t.rows[i]).hasClass('jqgrow')) {
							try {
								val = $.unformat.call($t,$($t.rows[i].cells[pos]),{rowId:$t.rows[i].id, colModel:$t.p.colModel[pos]},pos);
							} catch (exception) {
								val = $.jgrid.htmlDecode($t.rows[i].cells[pos].innerHTML);
							}
							if(mathopr) {
								v = parseFloat(val);
								if(!isNaN(v)) {
									sum += v;
									if (max === undefined) {max = min = v;}
									min = Math.min(min, v);
									max = Math.max(max, v);
									dlen++;
								}
							}
							else if(obj) { ret.push( {id:$t.rows[i].id,value:val} ); }
							else { ret.push( val ); }
						}
						i++;
					}
					if(mathopr) {
						switch(mathopr.toLowerCase()){
							case 'sum': ret =sum; break;
							case 'avg': ret = sum/dlen; break;
							case 'count': ret = (ln-1); break;
							case 'min': ret = min; break;
							case 'max': ret = max; break;
						}
					}
				}
			}
		});
		return ret;
	},
	clearGridData : function(clearfooter) {
		return this.each(function(){
			var $t = this, p = $t.p, jgrid = $.jgrid, clearArray = jgrid.clearArray, gridIdEscaped = jgrid.jqID(p.id);
			if(!$t.grid) {return;}
			if(typeof clearfooter !== 'boolean') { clearfooter = false; }
			if(p.deepempty) {$("#"+gridIdEscaped+" tbody:first tr:gt(0)").remove();}
			else {
				var trf = $("#"+gridIdEscaped+" tbody:first tr:first")[0];
				$("#"+gridIdEscaped+" tbody:first").empty().append(trf);
			}
			if(p.footerrow && clearfooter) { $(".ui-jqgrid-ftable td",$t.grid.sDiv).html("&#160;"); }
			p.selrow = null;
			clearArray(p.selarrrow); // p.selarrrow= [];
			clearArray(p.savedRow); // p.savedRow = [];
			p.records = 0;
			p.page=1;
			p.lastpage=0;
			p.reccount=0;
			clearArray(p.data); // $t.p.data = [];
			clearArray(p.lastSelectedData); // p.lastSelectedData = [];
			p._index = {};
			$t.updatepager(true,false);
		});
	},
	getInd : function(rowid,rc){
		var ret =false,rw;
		this.each(function(){
			rw = $(this).jqGrid('getGridRowById', rowid);
			if(rw) {
				ret = rc===true ? rw: rw.rowIndex;
			}
		});
		return ret;
	},
	bindKeys : function( settings ){
		var o = $.extend({
			onEnter: null,
			onSpace: null,
			onLeftKey: null,
			onRightKey: null,
			scrollingRows : true
		},settings || {});
		return this.each(function(){
			var $t = this;
			if( !$('body').is('[role]') ){$('body').attr('role','application');}
			$t.p.scrollrows = o.scrollingRows;
			$($t).keydown(function(event){
				var target = $($t).find('tr[tabindex=0]')[0], id, r, mind,
				expanded = $t.p.treeReader.expanded_field;
				//check for arrow keys
				if(target) {
					mind = $t.p._index[$.jgrid.stripPref($t.p.idPrefix, target.id)];
					if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
						// up key
						if(event.keyCode === 38 ){
							r = target.previousSibling;
							id = "";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.previousSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow')) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						//if key is down arrow
						if(event.keyCode === 40){
							r = target.nextSibling;
							id ="";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.nextSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow') ) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						// left
						if(event.keyCode === 37 ){
							if($t.p.treeGrid && $t.p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyLeft", [$t.p.selrow]);
							if($.isFunction(o.onLeftKey)) {
								o.onLeftKey.call($t, $t.p.selrow);
							}
						}
						// right
						if(event.keyCode === 39 ){
							if($t.p.treeGrid && !$t.p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyRight", [$t.p.selrow]);
							if($.isFunction(o.onRightKey)) {
								o.onRightKey.call($t, $t.p.selrow);
							}
						}
					}
					//check if enter was pressed on a grid or treegrid node
					else if( event.keyCode === 13 ){
						$($t).triggerHandler("jqGridKeyEnter", [$t.p.selrow]);
						if($.isFunction(o.onEnter)) {
							o.onEnter.call($t, $t.p.selrow);
						}
					} else if(event.keyCode === 32) {
						$($t).triggerHandler("jqGridKeySpace", [$t.p.selrow]);
						if($.isFunction(o.onSpace)) {
							o.onSpace.call($t, $t.p.selrow);
						}
					}
				}
			});
		});
	},
	unbindKeys : function(){
		return this.each(function(){
			$(this).unbind('keydown');
		});
	},
	getLocalRow : function (rowid) {
		var ret = false, ind;
		this.each(function(){
			if(rowid !== undefined) {
				ind = this.p._index[$.jgrid.stripPref(this.p.idPrefix, rowid)];
				if(ind >= 0 ) {
					ret = this.p.data[ind];
				}
			}
		});
		return ret;
	},
	progressBar : function ( p ) {
		p = $.extend({
			htmlcontent : "",
			method : "hide",
			loadtype : "disable" 
		}, p || {});
		return this.each(function(){
			var sh = p.method==="show" ? true : false, gridIdEscaped = $.jgrid.jqID(this.p.id);
			if(p.htmlcontent !== "") {
				$("#load_"+gridIdEscaped).html( p.htmlcontent );
			}
			switch(p.loadtype) {
				case "disable":
					break;
				case "enable":
					$("#load_"+gridIdEscaped).toggle( sh );
					break;
				case "block":
					$("#lui_"+gridIdEscaped).toggle( sh );
					$("#load_"+gridIdEscaped).toggle( sh );
					break;
			}
		});
	},
	setColWidth: function (iCol, newWidth, adjustGridWidth) {
		return this.each(function () {
			var $self = $(this), grid = this.grid, colName, colModel, i, nCol;
			if (typeof iCol === "string") {
				// the first parametrer is column name instead of index
				colName = iCol;
				colModel = $self.jqGrid("getGridParam", "colModel");
				for (i = 0, nCol = colModel.length; i < nCol; i++) {
					if (colModel[i].name === colName) {
						iCol = i;
						break;
					}
				}
				if (i >= nCol) {
					return; // error: non-existing column name specified as the first parameter
				}
			} else if (typeof iCol !== "number") {
				return; // error: wrong parameters
			}
			grid.headers[iCol].newWidth = newWidth;
			if (adjustGridWidth !== false) {
				grid.newWidth = grid.width + newWidth - grid.headers[iCol].width;
			}
			grid.resizeColumn(iCol, this, true);
			if (adjustGridWidth !== false) {
				$self.jqGrid("setGridWidth", grid.newWidth, false); // adjust grid width too
			}
		});
	},
	autoResizeColumn: function (iCol) {
		return this.each(function () {
			var rows = this.rows, row, cell, iRow, $cell, $cellFirstChild, widthOrg,
				p = this.p,
				cm = p.colModel[iCol],
				$th = $($(this.grid.hDiv).find(".ui-jqgrid-labels>.ui-th-column")[iCol]),
				$thDiv = $th.find(">div"),
				thPaddingLeft = parseFloat($th.css("padding-left")),
				thPaddingRight = parseFloat($th.css("padding-right")),
				$incosDiv = $thDiv.find("span.s-ico"),
				$wrapper = $thDiv.find(">." + p.autoResizing.wrapperClassName),
				wrapperOuterWidth = $wrapper.outerWidth(),
				wrapperCssWidth = parseFloat($wrapper.css("width")),
				colWidth = 0,
				wrapperClassName = p.autoResizing.wrapperClassName;

			if (cm == null || !cm.autoResizable || $wrapper.length === 0 || cm.hidden || cm.fixed) {
				return; // do nothing
			}
			if (!((cm.autoResizing != null && cm.autoResizingOption.compact !== undefined) ? cm.autoResizingOption.compact: p.autoResizing.compact) || $incosDiv.is(":visible") || ($incosDiv.css("display") !== "none")) {  //|| p.viewsortcols[0]
				colWidth = p.autoResizing.widthOfVisiblePartOfSortIcon; // $incosDiv.width() can be grater as the visible part of icon
				if ($thDiv.css("text-align") === "center") {
					colWidth += colWidth; // *2
				}
				if (p.viewsortcols[1] === "horizontal") {
					colWidth += colWidth; // *2
				}
			}
			colWidth += wrapperOuterWidth + thPaddingLeft +
					(wrapperCssWidth === wrapperOuterWidth ? thPaddingLeft + thPaddingRight : 0) +
					parseFloat($thDiv.css("margin-left")) + parseFloat($thDiv.css("margin-right"));
			for (iRow = 0, rows = this.rows; iRow < rows.length; iRow++) {
				row = rows[iRow];
				if ($(row).hasClass("jqgrow")) {
					cell = row.cells[iCol];
					if (cell != null) {
						$cell = $(cell);
						$cellFirstChild = $(cell.firstChild);
						if ($cellFirstChild.hasClass(wrapperClassName)) {
							colWidth = Math.max(colWidth, $cellFirstChild.outerWidth() +
									($.jgrid.cell_width ? parseFloat($cell.css("padding-left")) + parseFloat($cell.css("padding-right")) : 0) +
									parseFloat($cellFirstChild.css("margin-left")) +
									parseFloat($cellFirstChild.css("margin-right")));
						}
					}
				}
			}
			colWidth = Math.max(colWidth, cm.autoResizing != null && cm.autoResizingOption.minColWidth !== undefined ? cm.autoResizingOption.minColWidth : p.autoResizing.minColWidth);
			$(this).jqGrid("setColWidth", iCol, Math.min(colWidth, cm.autoResizing != null && cm.autoResizingOption.maxColWidth !== undefined ? cm.autoResizingOption.maxColWidth : p.autoResizing.maxColWidth), p.autoResizing.adjustGridWidth && !p.autoResizing.fixWidthOnShrink);
			if (p.autoResizing.fixWidthOnShrink && p.shrinkToFit) {
				cm.fixed = true;
				widthOrg = cm.widthOrg; // save the value in temporary variable
				cm.widthOrg = cm.width; // to force not changing of the column width
				$(this).jqGrid("setGridWidth", p.width, true);
				cm.widthOrg = widthOrg;
				cm.fixed = false;
			}
		});
	},
	autoResizeAllColumns: function () {
		return this.each(function () {
			var $self = $(this), colModel = this.p.colModel, nCol = colModel.length, iCol, cm,
			autoResizeColumn = $.jgrid.getMethod("autoResizeColumn"); // cache autoResizeColumn reference
			for (iCol = 0; iCol < nCol; iCol++) {
				cm = colModel[iCol];
				if (cm.autoResizable && cm.formatter !== "actions") {
					autoResizeColumn.call($self, iCol);
				}
			}
		});
	}
});
}(jQuery));
