/*!	
* breadcrumbWidget v1.0
*
* Date: 2/19/16
*/
(function($){
     $.fn.extend({ 

         breadcrumbWidget: function(options) {
            var defaults = {
							speed: 500
            };
            
            var options = $.extend(defaults, options);
        
            return this.each(function() {
						
							// Variables
							var o = options;
							var bcWidg = $(this);
							var bcWidgHomeLink = $(bcWidg).find('li:first-of-type');
							var bcWidgChildren = $(bcWidg).find('li').not(bcWidgHomeLink);
														
							$(window).on('resize', function () {
								if ($(window).width() < 960) {
									 
									 // if expand trigger doesn't exist, create it.
									 if (!$(bcWidg).find('span.bc-widget-expander').length){
										
										$(bcWidgHomeLink).find('a').css({
											'display':'inline-block',
											'vertical-align':'middle'
										});
										
										
										$(bcWidgHomeLink).prepend('<span class="bc-widget-expander"><a href="#a" class="bc-widget-expander-trigger"><i class="fa fa-angle-down"></i></a></span>');

									 }
									 
									 
									 var bcExpandTrig = $(bcWidg).find('.bc-widget-expander');
									 
									 $(bcExpandTrig).click(function(){
										 
										 $(bcWidgChildren).stop(true).slideToggle(function(){
											 
											 if ($(this).is(':visible')){
												 $(bcExpandTrig).find('i.fa').addClass('fa-caret-down').removeClass('fa-angle-down');
											 } else {
												 $(bcExpandTrig).find('i.fa').removeClass('fa-caret-down').addClass('fa-angle-down');											 
											 }
											 
										 });
										 
										 
									 });
									 
				
									}	else {
										
										// big screen, we don't need the expander trigger anymore...
										$(bcWidg).find('.bc-widget-expander').remove();
										$(bcWidgChildren).removeAttr('style');
										
									}
									
									
									
									
							}).resize();
							
							
							
							

            });
        }
    });
})(jQuery);




/*!	
* evpMenu v1.0
*
* Wild Apple Design Group
* Released under the WTFPL license 
* http://www.wildappledesigngroup.com
*
* Date: 2/2/16
*/
(function($){
     $.fn.extend({ 

         evpMenu: function(options) {
            var defaults = {
							trigger: '#mobile-menu-trigger',
							speed: 250,
							breakpoint: 880,
            };
            
            var options = $.extend(defaults, options);
        
            return this.each(function() {
						
							// Variables
							var o = options;
							var menu = $(this);
							var menuParent = $(this).parent();
							
							$(menuParent).each(function(){
							
							var menuParentSelected = $(this);
							var headerMenu = $(menuParentSelected).find(menu);
							var mobileMenuTrigger = $(menuParentSelected).find(o.trigger);
							var headerItemsWithChildren = $(menuParentSelected).find('.header-menu-item-has-children');
							
							function cssTransitionSpeed(){
								$(menuParentSelected).find('.header-menu-dropdown').css({
									'transition':'all '+o.speed+'ms linear',
									'-moz-transition':'all '+o.speed+'ms linear',
									'-webkit-transition':'all '+o.speed+'ms linear',
									'-o-transition':'all '+o.speed+'ms linear',
								});
							}
							
							function cssTransitionSpeedReset(){
								$(menuParentSelected).find('.header-menu-dropdown').removeAttr('style');
							}
							
							
							function addMobileMenuUIelements(){
								
								$(window).on('resize', function () {
								
									// if less than breakpoint, add all the extra stuff for functionality on small screens.
									if ($(window).width() < o.breakpoint-16) {
										
										if (!$(headerMenu).find('.header-menu-close-trigger').length > 0){ 
											$(headerMenu).prepend('<a href="#" class="header-menu-close-trigger button button-small button-inverse"><i class="fa fa-times"></i>  Close</a>');
										}
									
										$(headerItemsWithChildren).each(function(){
											if (!$(this).find('.header-menu-item-has-children-trigger').length > 0){ 
												$(this).prepend('<a href="#a" class="header-menu-item-has-children-trigger"><i class="fa fa-angle-down"></i></a>');
											}
										});
										
										cssTransitionSpeed();
									
									} else {
										
										$(headerItemsWithChildren).each(function(){
											$(this).find('.header-menu-item-has-children-trigger').remove();
										});
										
										$(headerMenu).find('.header-menu-close-trigger').remove();
											
										cssTransitionSpeedReset();
										
									}
								
								}).resize();
								
								var mobileMenuChildrenTrigger = $(menuParentSelected).find('.header-menu-item-has-children-trigger');
										
								$(mobileMenuChildrenTrigger).each(function(){
									var mobileMenuChildrenTriggerActv = $(this);
									$(mobileMenuChildrenTriggerActv).click(function(){
										$(this).parent().find('.header-menu-dropdown').slideToggle(o.speed,function(){
											
											if ($(this).is(':visible')){
												$(mobileMenuChildrenTriggerActv).parent().find('.header-menu-item-has-children-trigger i.fa').removeClass('fa-angle-down').addClass('fa-caret-down');												
											} else {
												$(mobileMenuChildrenTriggerActv).parent().find('.header-menu-item-has-children-trigger i.fa').removeClass('fa-caret-down').addClass('fa-angle-down');													
											}
			
										});											
									});
								});
								
								var mobileMenuCloseTrigger = $(menuParentSelected).find('.header-menu-close-trigger');
								
								$(mobileMenuCloseTrigger).click(function(){
									$(headerMenu).slideUp(o.speed);	
									$(headerItemsWithChildren).find('.header-menu-dropdown').hide();
								});
								
								$(mobileMenuTrigger).click(function(){
									$(headerMenu).slideDown(o.speed);
								});
									
							}
							
							addMobileMenuUIelements();
							
							
							
							
							});

            });
        }
    });
})(jQuery);


/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 1.3.3
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 * @see http://php.net/manual/en/function.date.php
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
var DateFormatter;
(function () {
    "use strict";

    var _compare, _lpad, _extend, defaultSettings, DAY, HOUR;
    DAY = 1000 * 60 * 60 * 24;
    HOUR = 3600;

    _compare = function (str1, str2) {
        return typeof(str1) === 'string' && typeof(str2) === 'string' && str1.toLowerCase() === str2.toLowerCase();
    };
    _lpad = function (value, length, char) {
        var chr = char || '0', val = value.toString();
        return val.length < length ? _lpad(chr + val, length) : val;
    };
    _extend = function (out) {
        var i, obj;
        out = out || {};
        for (i = 1; i < arguments.length; i++) {
            obj = arguments[i];
            if (!obj) {
                continue;
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        _extend(out[key], obj[key]);
                    } else {
                        out[key] = obj[key];
                    }
                }
            }
        }
        return out;
    };
    defaultSettings = {
        dateSettings: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            meridiem: ['AM', 'PM'],
            ordinal: function (number) {
                var n = number % 10, suffixes = {1: 'st', 2: 'nd', 3: 'rd'};
                return Math.floor(number % 100 / 10) === 1 || !suffixes[n] ? 'th' : suffixes[n];
            }
        },
        separators: /[ \-+\/\.T:@]/g,
        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
        intParts: /[djwNzmnyYhHgGis]/g,
        tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        tzClip: /[^-+\dA-Z]/g
    };

    DateFormatter = function (options) {
        var self = this, config = _extend(defaultSettings, options);
        self.dateSettings = config.dateSettings;
        self.separators = config.separators;
        self.validParts = config.validParts;
        self.intParts = config.intParts;
        self.tzParts = config.tzParts;
        self.tzClip = config.tzClip;
    };

    DateFormatter.prototype = {
        constructor: DateFormatter,
        parseDate: function (vDate, vFormat) {
            var self = this, vFormatParts, vDateParts, i, vDateFlag = false, vTimeFlag = false, vDatePart, iDatePart,
                vSettings = self.dateSettings, vMonth, vMeriIndex, vMeriOffset, len, mer,
                out = {date: null, year: null, month: null, day: null, hour: 0, min: 0, sec: 0};
            if (!vDate) {
                return undefined;
            }
            if (vDate instanceof Date) {
                return vDate;
            }
            if (typeof vDate === 'number') {
                return new Date(vDate);
            }
            if (vFormat === 'U') {
                i = parseInt(vDate);
                return i ? new Date(i * 1000) : vDate;
            }
            if (typeof vDate !== 'string') {
                return '';
            }
            vFormatParts = vFormat.match(self.validParts);
            if (!vFormatParts || vFormatParts.length === 0) {
                throw new Error("Invalid date format definition.");
            }
            vDateParts = vDate.replace(self.separators, '\0').split('\0');
            for (i = 0; i < vDateParts.length; i++) {
                vDatePart = vDateParts[i];
                iDatePart = parseInt(vDatePart);
                switch (vFormatParts[i]) {
                    case 'y':
                    case 'Y':
                        len = vDatePart.length;
                        if (len === 2) {
                            out.year = parseInt((iDatePart < 70 ? '20' : '19') + vDatePart);
                        } else if (len === 4) {
                            out.year = iDatePart;
                        }
                        vDateFlag = true;
                        break;
                    case 'm':
                    case 'n':
                    case 'M':
                    case 'F':
                        if (isNaN(vDatePart)) {
                            vMonth = vSettings.monthsShort.indexOf(vDatePart);
                            if (vMonth > -1) {
                                out.month = vMonth + 1;
                            }
                            vMonth = vSettings.months.indexOf(vDatePart);
                            if (vMonth > -1) {
                                out.month = vMonth + 1;
                            }
                        } else {
                            if (iDatePart >= 1 && iDatePart <= 12) {
                                out.month = iDatePart;
                            }
                        }
                        vDateFlag = true;
                        break;
                    case 'd':
                    case 'j':
                        if (iDatePart >= 1 && iDatePart <= 31) {
                            out.day = iDatePart;
                        }
                        vDateFlag = true;
                        break;
                    case 'g':
                    case 'h':
                        vMeriIndex = (vFormatParts.indexOf('a') > -1) ? vFormatParts.indexOf('a') :
                            (vFormatParts.indexOf('A') > -1) ? vFormatParts.indexOf('A') : -1;
                        mer = vDateParts[vMeriIndex];
                        if (vMeriIndex > -1) {
                            vMeriOffset = _compare(mer, vSettings.meridiem[0]) ? 0 :
                                (_compare(mer, vSettings.meridiem[1]) ? 12 : -1);
                            if (iDatePart >= 1 && iDatePart <= 12 && vMeriOffset > -1) {
                                out.hour = iDatePart + vMeriOffset - 1;
                            } else if (iDatePart >= 0 && iDatePart <= 23) {
                                out.hour = iDatePart;
                            }
                        } else if (iDatePart >= 0 && iDatePart <= 23) {
                            out.hour = iDatePart;
                        }
                        vTimeFlag = true;
                        break;
                    case 'G':
                    case 'H':
                        if (iDatePart >= 0 && iDatePart <= 23) {
                            out.hour = iDatePart;
                        }
                        vTimeFlag = true;
                        break;
                    case 'i':
                        if (iDatePart >= 0 && iDatePart <= 59) {
                            out.min = iDatePart;
                        }
                        vTimeFlag = true;
                        break;
                    case 's':
                        if (iDatePart >= 0 && iDatePart <= 59) {
                            out.sec = iDatePart;
                        }
                        vTimeFlag = true;
                        break;
                }
            }
            if (vDateFlag === true && out.year && out.month && out.day) {
                out.date = new Date(out.year, out.month - 1, out.day, out.hour, out.min, out.sec, 0);
            } else {
                if (vTimeFlag !== true) {
                    return false;
                }
                out.date = new Date(0, 0, 0, out.hour, out.min, out.sec, 0);
            }
            return out.date;
        },
        guessDate: function (vDateStr, vFormat) {
            if (typeof vDateStr !== 'string') {
                return vDateStr;
            }
            var self = this, vParts = vDateStr.replace(self.separators, '\0').split('\0'), vPattern = /^[djmn]/g,
                vFormatParts = vFormat.match(self.validParts), vDate = new Date(), vDigit = 0, vYear, i, iPart, iSec;

            if (!vPattern.test(vFormatParts[0])) {
                return vDateStr;
            }

            for (i = 0; i < vParts.length; i++) {
                vDigit = 2;
                iPart = vParts[i];
                iSec = parseInt(iPart.substr(0, 2));
                switch (i) {
                    case 0:
                        if (vFormatParts[0] === 'm' || vFormatParts[0] === 'n') {
                            vDate.setMonth(iSec - 1);
                        } else {
                            vDate.setDate(iSec);
                        }
                        break;
                    case 1:
                        if (vFormatParts[0] === 'm' || vFormatParts[0] === 'n') {
                            vDate.setDate(iSec);
                        } else {
                            vDate.setMonth(iSec - 1);
                        }
                        break;
                    case 2:
                        vYear = vDate.getFullYear();
                        if (iPart.length < 4) {
                            vDate.setFullYear(parseInt(vYear.toString().substr(0, 4 - iPart.length) + iPart));
                            vDigit = iPart.length;
                        } else {
                            vDate.setFullYear = parseInt(iPart.substr(0, 4));
                            vDigit = 4;
                        }
                        break;
                    case 3:
                        vDate.setHours(iSec);
                        break;
                    case 4:
                        vDate.setMinutes(iSec);
                        break;
                    case 5:
                        vDate.setSeconds(iSec);
                        break;
                }
                if (iPart.substr(vDigit).length > 0) {
                    vParts.splice(i + 1, 0, iPart.substr(vDigit));
                }
            }
            return vDate;
        },
        parseFormat: function (vChar, vDate) {
            var self = this, vSettings = self.dateSettings, fmt, backspace = /\\?(.?)/gi, doFormat = function (t, s) {
                return fmt[t] ? fmt[t]() : s;
            };
            fmt = {
                /////////
                // DAY //
                /////////
                /**
                 * Day of month with leading 0: `01..31`
                 * @return {string}
                 */
                d: function () {
                    return _lpad(fmt.j(), 2);
                },
                /**
                 * Shorthand day name: `Mon...Sun`
                 * @return {string}
                 */
                D: function () {
                    return vSettings.daysShort[fmt.w()];
                },
                /**
                 * Day of month: `1..31`
                 * @return {number}
                 */
                j: function () {
                    return vDate.getDate();
                },
                /**
                 * Full day name: `Monday...Sunday`
                 * @return {number}
                 */
                l: function () {
                    return vSettings.days[fmt.w()];
                },
                /**
                 * ISO-8601 day of week: `1[Mon]..7[Sun]`
                 * @return {number}
                 */
                N: function () {
                    return fmt.w() || 7;
                },
                /**
                 * Day of week: `0[Sun]..6[Sat]`
                 * @return {number}
                 */
                w: function () {
                    return vDate.getDay();
                },
                /**
                 * Day of year: `0..365`
                 * @return {number}
                 */
                z: function () {
                    var a = new Date(fmt.Y(), fmt.n() - 1, fmt.j()), b = new Date(fmt.Y(), 0, 1);
                    return Math.round((a - b) / DAY);
                },

                //////////
                // WEEK //
                //////////
                /**
                 * ISO-8601 week number
                 * @return {number}
                 */
                W: function () {
                    var a = new Date(fmt.Y(), fmt.n() - 1, fmt.j() - fmt.N() + 3), b = new Date(a.getFullYear(), 0, 4);
                    return _lpad(1 + Math.round((a - b) / DAY / 7), 2);
                },

                ///////////
                // MONTH //
                ///////////
                /**
                 * Full month name: `January...December`
                 * @return {string}
                 */
                F: function () {
                    return vSettings.months[vDate.getMonth()];
                },
                /**
                 * Month w/leading 0: `01..12`
                 * @return {string}
                 */
                m: function () {
                    return _lpad(fmt.n(), 2);
                },
                /**
                 * Shorthand month name; `Jan...Dec`
                 * @return {string}
                 */
                M: function () {
                    return vSettings.monthsShort[vDate.getMonth()];
                },
                /**
                 * Month: `1...12`
                 * @return {number}
                 */
                n: function () {
                    return vDate.getMonth() + 1;
                },
                /**
                 * Days in month: `28...31`
                 * @return {number}
                 */
                t: function () {
                    return (new Date(fmt.Y(), fmt.n(), 0)).getDate();
                },

                //////////
                // YEAR //
                //////////
                /**
                 * Is leap year? `0 or 1`
                 * @return {number}
                 */
                L: function () {
                    var Y = fmt.Y();
                    return (Y % 4 === 0 && Y % 100 !== 0 || Y % 400 === 0) ? 1 : 0;
                },
                /**
                 * ISO-8601 year
                 * @return {number}
                 */
                o: function () {
                    var n = fmt.n(), W = fmt.W(), Y = fmt.Y();
                    return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
                },
                /**
                 * Full year: `e.g. 1980...2010`
                 * @return {number}
                 */
                Y: function () {
                    return vDate.getFullYear();
                },
                /**
                 * Last two digits of year: `00...99`
                 * @return {string}
                 */
                y: function () {
                    return fmt.Y().toString().slice(-2);
                },

                //////////
                // TIME //
                //////////
                /**
                 * Meridian lower: `am or pm`
                 * @return {string}
                 */
                a: function () {
                    return fmt.A().toLowerCase();
                },
                /**
                 * Meridian upper: `AM or PM`
                 * @return {string}
                 */
                A: function () {
                    var n = fmt.G() < 12 ? 0 : 1;
                    return vSettings.meridiem[n];
                },
                /**
                 * Swatch Internet time: `000..999`
                 * @return {string}
                 */
                B: function () {
                    var H = vDate.getUTCHours() * HOUR, i = vDate.getUTCMinutes() * 60, s = vDate.getUTCSeconds();
                    return _lpad(Math.floor((H + i + s + HOUR) / 86.4) % 1000, 3);
                },
                /**
                 * 12-Hours: `1..12`
                 * @return {number}
                 */
                g: function () {
                    return fmt.G() % 12 || 12;
                },
                /**
                 * 24-Hours: `0..23`
                 * @return {number}
                 */
                G: function () {
                    return vDate.getHours();
                },
                /**
                 * 12-Hours with leading 0: `01..12`
                 * @return {string}
                 */
                h: function () {
                    return _lpad(fmt.g(), 2);
                },
                /**
                 * 24-Hours w/leading 0: `00..23`
                 * @return {string}
                 */
                H: function () {
                    return _lpad(fmt.G(), 2);
                },
                /**
                 * Minutes w/leading 0: `00..59`
                 * @return {string}
                 */
                i: function () {
                    return _lpad(vDate.getMinutes(), 2);
                },
                /**
                 * Seconds w/leading 0: `00..59`
                 * @return {string}
                 */
                s: function () {
                    return _lpad(vDate.getSeconds(), 2);
                },
                /**
                 * Microseconds: `000000-999000`
                 * @return {string}
                 */
                u: function () {
                    return _lpad(vDate.getMilliseconds() * 1000, 6);
                },

                //////////////
                // TIMEZONE //
                //////////////
                /**
                 * Timezone identifier: `e.g. Atlantic/Azores, ...`
                 * @return {string}
                 */
                e: function () {
                    var str = /\((.*)\)/.exec(String(vDate))[1];
                    return str || 'Coordinated Universal Time';
                },
                /**
                 * Timezone abbreviation: `e.g. EST, MDT, ...`
                 * @return {string}
                 */
                T: function () {
                    var str = (String(vDate).match(self.tzParts) || [""]).pop().replace(self.tzClip, "");
                    return str || 'UTC';
                },
                /**
                 * DST observed? `0 or 1`
                 * @return {number}
                 */
                I: function () {
                    var a = new Date(fmt.Y(), 0), c = Date.UTC(fmt.Y(), 0),
                        b = new Date(fmt.Y(), 6), d = Date.UTC(fmt.Y(), 6);
                    return ((a - c) !== (b - d)) ? 1 : 0;
                },
                /**
                 * Difference to GMT in hour format: `e.g. +0200`
                 * @return {string}
                 */
                O: function () {
                    var tzo = vDate.getTimezoneOffset(), a = Math.abs(tzo);
                    return (tzo > 0 ? '-' : '+') + _lpad(Math.floor(a / 60) * 100 + a % 60, 4);
                },
                /**
                 * Difference to GMT with colon: `e.g. +02:00`
                 * @return {string}
                 */
                P: function () {
                    var O = fmt.O();
                    return (O.substr(0, 3) + ':' + O.substr(3, 2));
                },
                /**
                 * Timezone offset in seconds: `-43200...50400`
                 * @return {number}
                 */
                Z: function () {
                    return -vDate.getTimezoneOffset() * 60;
                },

                ////////////////////
                // FULL DATE TIME //
                ////////////////////
                /**
                 * ISO-8601 date
                 * @return {string}
                 */
                c: function () {
                    return 'Y-m-d\\TH:i:sP'.replace(backspace, doFormat);
                },
                /**
                 * RFC 2822 date
                 * @return {string}
                 */
                r: function () {
                    return 'D, d M Y H:i:s O'.replace(backspace, doFormat);
                },
                /**
                 * Seconds since UNIX epoch
                 * @return {number}
                 */
                U: function () {
                    return vDate.getTime() / 1000 || 0;
                }
            };
            return doFormat(vChar, vChar);
        },
        formatDate: function (vDate, vFormat) {
            var self = this, i, n, len, str, vChar, vDateStr = '';
            if (typeof vDate === 'string') {
                vDate = self.parseDate(vDate, vFormat);
                if (vDate === false) {
                    return false;
                }
            }
            if (vDate instanceof Date) {
                len = vFormat.length;
                for (i = 0; i < len; i++) {
                    vChar = vFormat.charAt(i);
                    if (vChar === 'S') {
                        continue;
                    }
                    str = self.parseFormat(vChar, vDate);
                    if (i !== (len - 1) && self.intParts.test(vChar) && vFormat.charAt(i + 1) === 'S') {
                        n = parseInt(str);
                        str += self.dateSettings.ordinal(n);
                    }
                    vDateStr += str;
                }
                return vDateStr;
            }
            return '';
        }
    };
})();/* global DateFormatter */
/**
 * @preserve jQuery DateTimePicker plugin v2.4.5
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2014, Chupurnov Valeriy.
 */
/*global document,window,jQuery,setTimeout,clearTimeout,HighlightedDate,getCurrentValue*/
;(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'jquery-mousewheel', 'date-functions'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	'use strict';
	var default_options  = {
		i18n: {
			ar: { // Arabic
				months: [
					"????? ??????", "????", "????", "?????", "????", "??????", "????", "??", "?????", "????? ?????", "????? ??????", "????? ?????"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				],
				dayOfWeek: ["?????", "???????", "????????", "????????", "??????", "??????", "?????", "?????"]
			},
			ro: { // Romanian
				months: [
					"Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
				],
				dayOfWeekShort: [
					"Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"
				],
				dayOfWeek: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sâmbata"]
			},
			id: { // Indonesian
				months: [
					"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"
				],
				dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
			},
			is: { // Icelandic
				months: [
					"Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
				],
				dayOfWeekShort: [
					"Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"
				],
				dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
			},
			bg: { // Bulgarian
				months: [
					"??????", "????????", "????", "?????", "???", "???", "???", "??????", "?????????", "????????", "???????", "????????"
				],
				dayOfWeekShort: [
					"??", "??", "??", "??", "??", "??", "??"
				],
				dayOfWeek: ["??????", "??????????", "???????", "?????", "?????????", "?????", "??????"]
			},
			fa: { // Persian/Farsi
				months: [
					'???????', '????????', '?????', '???', '?????', '??????', '???', '????', '???', '??', '????', '?????'
				],
				dayOfWeekShort: [
					'??????', '??????', '?? ????', '????????', '???????', '????', '????'
				],
				dayOfWeek: ["???????", "??????", "???????", "????????", "????????", "????", "????", "???????"]
			},
			ru: { // Russian
				months: [
					'??????', '???????', '????', '??????', '???', '????', '????', '??????', '????????', '???????', '??????', '???????'
				],
				dayOfWeekShort: [
					"??", "??", "??", "??", "??", "??", "??"
				],
				dayOfWeek: ["???????????", "???????????", "???????", "?????", "???????", "???????", "???????"]
			},
			uk: { // Ukrainian
				months: [
					'??????', '?????', '????????', '???????', '???????', '???????', '??????', '???????', '????????', '???????', '????????', '???????'
				],
				dayOfWeekShort: [
					"???", "???", "???", "???", "???", "???", "???"
				],
				dayOfWeek: ["??????", "?????????", "????????", "??????", "??????", "?'??????", "??????"]
			},
			en: { // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			el: { // ????????
				months: [
					"?a????????", "Feß????????", "???t???", "?p??????", "?????", "???????", "???????", "?????st??", "Sept?µß????", "??t?ß????", "???µß????", "?e??µß????"
				],
				dayOfWeekShort: [
					"???", "?e?", "???", "?et", "?eµ", "?a?", "Saß"
				],
				dayOfWeek: ["????a??", "?e?t??a", "???t?", "?et??t?", "??µpt?", "?a?as?e??", "S?ßßat?"]
			},
			de: { // German
				months: [
					'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
				],
				dayOfWeekShort: [
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				],
				dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
			},
			nl: { // Dutch
				months: [
					"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
				],
				dayOfWeekShort: [
					"zo", "ma", "di", "wo", "do", "vr", "za"
				],
				dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
			},
			tr: { // Turkish
				months: [
					"Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran", "Temmuz", "Agustos", "Eylül", "Ekim", "Kasim", "Aralik"
				],
				dayOfWeekShort: [
					"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
				],
				dayOfWeek: ["Pazar", "Pazartesi", "Sali", "Çarsamba", "Persembe", "Cuma", "Cumartesi"]
			},
			fr: { //French
				months: [
					"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeekShort: [
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				],
				dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
			},
			es: { // Spanish
				months: [
					"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
				],
				dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
			},
			th: { // Thai
				months: [
					'??????', '??????????', '??????', '??????', '???????', '????????', '???????', '???????', '???????', '??????', '?????????', '???????'
				],
				dayOfWeekShort: [
					'??.', '?.', '?.', '?.', '??.', '?.', '?.'
				],
				dayOfWeek: ["???????", "??????", "??????", "???", "?????", "?????", "?????", "???????"]
			},
			pl: { // Polish
				months: [
					"styczen", "luty", "marzec", "kwiecien", "maj", "czerwiec", "lipiec", "sierpien", "wrzesien", "pazdziernik", "listopad", "grudzien"
				],
				dayOfWeekShort: [
					"nd", "pn", "wt", "sr", "cz", "pt", "sb"
				],
				dayOfWeek: ["niedziela", "poniedzialek", "wtorek", "sroda", "czwartek", "piatek", "sobota"]
			},
			pt: { // Portuguese
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			ch: { // Simplified Chinese
				months: [
					"??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "???", "???"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				]
			},
			se: { // Swedish
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			kr: { // Korean
				months: [
					"1?", "2?", "3?", "4?", "5?", "6?", "7?", "8?", "9?", "10?", "11?", "12?"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				],
				dayOfWeek: ["???", "???", "???", "???", "???", "???", "???"]
			},
			it: { // Italian
				months: [
					"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
				],
				dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
			},
			da: { // Dansk
				months: [
					"January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
			},
			no: { // Norwegian
				months: [
					"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
			},
			ja: { // Japanese
				months: [
					"1?", "2?", "3?", "4?", "5?", "6?", "7?", "8?", "9?", "10?", "11?", "12?"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				],
				dayOfWeek: ["??", "??", "??", "??", "??", "??", "??"]
			},
			vi: { // Vietnamese
				months: [
					"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
				],
				dayOfWeekShort: [
					"CN", "T2", "T3", "T4", "T5", "T6", "T7"
				],
				dayOfWeek: ["Ch? nh?t", "Th? hai", "Th? ba", "Th? tu", "Th? nam", "Th? sáu", "Th? b?y"]
			},
			sl: { // Slovenšcina
				months: [
					"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Tor", "Sre", "Cet", "Pet", "Sob"
				],
				dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Cetrtek", "Petek", "Sobota"]
			},
			cs: { // Ceština
				months: [
					"Leden", "Únor", "Brezen", "Duben", "Kveten", "Cerven", "Cervenec", "Srpen", "Zárí", "Ríjen", "Listopad", "Prosinec"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Út", "St", "Ct", "Pá", "So"
				]
			},
			hu: { // Hungarian
				months: [
					"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
				],
				dayOfWeek: ["vasárnap", "hétfo", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
			},
			az: { //Azerbaijanian (Azeri)
				months: [
					"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
				],
				dayOfWeekShort: [
					"B", "Be", "Ça", "Ç", "Ca", "C", "S"
				],
				dayOfWeek: ["Bazar", "Bazar ert?si", "Ç?rs?nb? axsami", "Ç?rs?nb?", "Cüm? axsami", "Cüm?", "S?nb?"]
			},
			bs: { //Bosanski
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Cet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Cetvrtak", "Petak", "Subota"]
			},
			ca: { //Català
				months: [
					"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
				],
				dayOfWeekShort: [
					"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
				],
				dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
			},
			'en-GB': { //English (British)
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			et: { //"Eesti"
				months: [
					"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
				],
				dayOfWeekShort: [
					"P", "E", "T", "K", "N", "R", "L"
				],
				dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
			},
			eu: { //Euskara
				months: [
					"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
				],
				dayOfWeekShort: [
					"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
				],
				dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
			},
			fi: { //Finnish (Suomi)
				months: [
					"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
				],
				dayOfWeekShort: [
					"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
				],
				dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
			},
			gl: { //Galego
				months: [
					"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
				],
				dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
			},
			hr: { //Hrvatski
				months: [
					"Sijecanj", "Veljaca", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Cet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Cetvrtak", "Petak", "Subota"]
			},
			ko: { //Korean (???)
				months: [
					"1?", "2?", "3?", "4?", "5?", "6?", "7?", "8?", "9?", "10?", "11?", "12?"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				],
				dayOfWeek: ["???", "???", "???", "???", "???", "???", "???"]
			},
			lt: { //Lithuanian (lietuviu)
				months: [
					"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužes", "Birželio", "Liepos", "Rugpjucio", "Rugsejo", "Spalio", "Lapkricio", "Gruodžio"
				],
				dayOfWeekShort: [
					"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
				],
				dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Treciadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
			},
			lv: { //Latvian (Latviešu)
				months: [
					"Janvaris", "Februaris", "Marts", "Aprilis ", "Maijs", "Junijs", "Julijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
				],
				dayOfWeekShort: [
					"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
				],
				dayOfWeek: ["Svetdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
			},
			mk: { //Macedonian (??????????)
				months: [
					"???????", "????????", "????", "?????", "???", "????", "????", "??????", "?????????", "????????", "???????", "????????"
				],
				dayOfWeekShort: [
					"???", "???", "???", "???", "???", "???", "???"
				],
				dayOfWeek: ["??????", "??????????", "???????", "?????", "????????", "?????", "??????"]
			},
			mn: { //Mongolian (??????)
				months: [
					"1-? ???", "2-? ???", "3-? ???", "4-? ???", "5-? ???", "6-? ???", "7-? ???", "8-? ???", "9-? ???", "10-? ???", "11-? ???", "12-? ???"
				],
				dayOfWeekShort: [
					"???", "???", "???", "???", "???", "???", "???"
				],
				dayOfWeek: ["?????", "??????", "??????", "?????", "??????", "?????", "???"]
			},
			'pt-BR': { //Português(Brasil)
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			sk: { //Slovencina
				months: [
					"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
				],
				dayOfWeek: ["Nedela", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
			},
			sq: { //Albanian (Shqip)
				months: [
					"Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
				],
				dayOfWeekShort: [
					"Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"
				],
				dayOfWeek: ["E Diel", "E Hënë", "E Marte", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
			},
			'sr-YU': { //Serbian (Srpski)
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sre", "cet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota"]
			},
			sr: { //Serbian Cyrillic (??????)
				months: [
					"??????", "???????", "????", "?????", "???", "???", "???", "??????", "?????????", "???????", "????????", "????????"
				],
				dayOfWeekShort: [
					"???", "???", "???", "???", "???", "???", "???"
				],
				dayOfWeek: ["??????","?????????", "??????", "?????", "????????", "?????", "??????"]
			},
			sv: { //Svenska
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				],
				dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
			},
			'zh-TW': { //Traditional Chinese (????)
				months: [
					"??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "???", "???"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				],
				dayOfWeek: ["???", "???", "???", "???", "???", "???", "???"]
			},
			zh: { //Simplified Chinese (????)
				months: [
					"??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "???", "???"
				],
				dayOfWeekShort: [
					"?", "?", "?", "?", "?", "?", "?"
				],
				dayOfWeek: ["???", "???", "???", "???", "???", "???", "???"]
			},
			he: { //Hebrew (?????)
				months: [
					'?????', '??????', '???', '?????', '???', '????', '????', '??????', '??????', '???????', '??????', '?????'
				],
				dayOfWeekShort: [
					'?\'', '?\'', '?\'', '?\'', '?\'', '?\'', '???'
				],
				dayOfWeek: ["?????", "???", "?????", "?????", "?????", "????", "???", "?????"]
			},
			hy: { // Armenian
				months: [
					"???????", "???????", "????", "?????", "?????", "??????", "??????", "???????", "?????????", "?????????", "????????", "?????????"
				],
				dayOfWeekShort: [
					"??", "???", "???", "???", "???", "????", "???"
				],
				dayOfWeek: ["??????", "??????????", "?????????", "??????????", "?????????", "??????", "?????"]
			},
			kg: { // Kyrgyz
				months: [
					'????? ???', '?????? ???', '?????? ?????', '??? ?????', '????', '?????', '????', '??? ????', '??? ????', '???????? ???', '??????? ???', '?????? ???'
				],
				dayOfWeekShort: [
					"???", "???", "???", "???", "???", "???", "???"
				],
				dayOfWeek: [
					"???????", "???????", "???????", "???????", "????????", "????", "?????"
				]
			},
			rm: { // Romansh
				months: [
					"Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"
				],
				dayOfWeek: [
					"Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"
				]
			},
		},
		value: '',
		rtl: false,

		format:	'Y/m/d H:i',
		formatTime:	'H:i',
		formatDate:	'Y/m/d',

		startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
		step: 60,
		monthChangeSpinner: true,

		closeOnDateSelect: false,
		closeOnTimeSelect: true,
		closeOnWithoutClick: true,
		closeOnInputClick: true,

		timepicker: true,
		datepicker: true,
		weeks: false,

		defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

		minDate: false,
		maxDate: false,
		minTime: false,
		maxTime: false,
		disabledMinTime: false,
		disabledMaxTime: false,

		allowTimes: [],
		opened: false,
		initTime: true,
		inline: false,
		theme: '',

		onSelectDate: function () {},
		onSelectTime: function () {},
		onChangeMonth: function () {},
		onChangeYear: function () {},
		onChangeDateTime: function () {},
		onShow: function () {},
		onClose: function () {},
		onGenerate: function () {},

		withoutCopyright: true,
		inverseButton: false,
		hours12: false,
		next: 'xdsoft_next',
		prev : 'xdsoft_prev',
		dayOfWeekStart: 0,
		parentID: 'body',
		timeHeightInTimePicker: 25,
		timepickerScrollbar: true,
		todayButton: true,
		prevButton: true,
		nextButton: true,
		defaultSelect: true,

		scrollMonth: true,
		scrollTime: true,
		scrollInput: true,

		lazyInit: false,
		mask: false,
		validateOnBlur: true,
		allowBlank: true,
		yearStart: 1950,
		yearEnd: 2050,
		monthStart: 0,
		monthEnd: 11,
		style: '',
		id: '',
		fixed: false,
		roundTime: 'round', // ceil, floor
		className: '',
		weekends: [],
		highlightedDates: [],
		highlightedPeriods: [],
		disabledDates : [],
		disabledWeekDays: [],
		yearOffset: 0,
		beforeShowDay: null,

		enterLikeTab: true,
        showApplyButton: false
	};

	var dateHelper = null,
		globalLocaleDefault = 'en',
		globalLocale = 'en';
	
	var dateFormatterOptionsDefault = {
		meridiem: ['AM', 'PM']
	};
	
	var initDateFormatter = function(){
		var locale = default_options.i18n[globalLocale],
			opts = {
				days: locale.dayOfWeek,
				daysShort: locale.dayOfWeekShort,
				months: locale.months,
				monthsShort: $.map(locale.months, function(n){ return n.substring(0, 3) }),			
			};
		
	 	dateHelper = new DateFormatter({
			dateSettings: $.extend({}, dateFormatterOptionsDefault, opts)
		});
	};
		
	// for locale settings
	$.datetimepicker = {
		setLocale: function(locale){
			var newLocale = default_options.i18n[locale]?locale:globalLocaleDefault;
			if(globalLocale != newLocale){
				globalLocale = newLocale;
				// reinit date formatter
				initDateFormatter();
			}
		},
		RFC_2822: 'D, d M Y H:i:s O',
		ATOM: 'Y-m-d\TH:i:sP',
		ISO_8601: 'Y-m-d\TH:i:sO',
		RFC_822: 'D, d M y H:i:s O',
		RFC_850: 'l, d-M-y H:i:s T',
		RFC_1036: 'D, d M y H:i:s O',
		RFC_1123: 'D, d M Y H:i:s O',
		RSS: 'D, d M Y H:i:s O',
		W3C: 'Y-m-d\TH:i:sP'
	};
	
	// first init date formatter
	initDateFormatter();

	// fix for ie8
	if (!window.getComputedStyle) {
		window.getComputedStyle = function (el, pseudo) {
			this.el = el;
			this.getPropertyValue = function (prop) {
				var re = /(\-([a-z]){1})/g;
				if (prop === 'float') {
					prop = 'styleFloat';
				}
				if (re.test(prop)) {
					prop = prop.replace(re, function (a, b, c) {
						return c.toUpperCase();
					});
				}
				return el.currentStyle[prop] || null;
			};
			return this;
		};
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			var i, j;
			for (i = (start || 0), j = this.length; i < j; i += 1) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		};
	}
	Date.prototype.countDaysInMonth = function () {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	};
	$.fn.xdsoftScroller = function (percent) {
		return this.each(function () {
			var timeboxparent = $(this),
				pointerEventToXY = function (e) {
					var out = {x: 0, y: 0},
						touch;
					if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
						touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						out.x = touch.clientX;
						out.y = touch.clientY;
					} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
						out.x = e.clientX;
						out.y = e.clientY;
					}
					return out;
				},
				move = 0,
				timebox,
				parentHeight,
				height,
				scrollbar,
				scroller,
				maximumOffset = 100,
				start = false,
				startY = 0,
				startTop = 0,
				h1 = 0,
				touchStart = false,
				startTopScroll = 0,
				calcOffset = function () {};
			if (percent === 'hide') {
				timeboxparent.find('.xdsoft_scrollbar').hide();
				return;
			}
			if (!$(this).hasClass('xdsoft_scroller_box')) {
				timebox = timeboxparent.children().eq(0);
				parentHeight = timeboxparent[0].clientHeight;
				height = timebox[0].offsetHeight;
				scrollbar = $('<div class="xdsoft_scrollbar"></div>');
				scroller = $('<div class="xdsoft_scroller"></div>');
				scrollbar.append(scroller);

				timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
				calcOffset = function calcOffset(event) {
					var offset = pointerEventToXY(event).y - startY + startTopScroll;
					if (offset < 0) {
						offset = 0;
					}
					if (offset + scroller[0].offsetHeight > h1) {
						offset = h1 - scroller[0].offsetHeight;
					}
					timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
				};

				scroller
					.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
						}

						startY = pointerEventToXY(event).y;
						startTopScroll = parseInt(scroller.css('margin-top'), 10);
						h1 = scrollbar[0].offsetHeight;

						if (event.type === 'mousedown' || event.type === 'touchstart') {
							if (document) {
								$(document.body).addClass('xdsoft_noselect');
							}
							$([document.body, window]).on('touchend mouseup.xdsoft_scroller', function arguments_callee() {
								$([document.body, window]).off('touchend mouseup.xdsoft_scroller', arguments_callee)
									.off('mousemove.xdsoft_scroller', calcOffset)
									.removeClass('xdsoft_noselect');
							});
							$(document.body).on('mousemove.xdsoft_scroller', calcOffset);
						} else {
							touchStart = true;
							event.stopPropagation();
							event.preventDefault();
						}
					})
					.on('touchmove', function (event) {
						if (touchStart) {
							event.preventDefault();
							calcOffset(event);
						}
					})
					.on('touchend touchcancel', function (event) {
						touchStart =  false;
						startTopScroll = 0;
					});

				timeboxparent
					.on('scroll_element.xdsoft_scroller', function (event, percentage) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
						}
						percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

						scroller.css('margin-top', maximumOffset * percentage);

						setTimeout(function () {
							timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
						}, 10);
					})
					.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
						var percent, sh;
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						percent = parentHeight / height;
						sh = percent * scrollbar[0].offsetHeight;
						if (percent > 1) {
							scroller.hide();
						} else {
							scroller.show();
							scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
							maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
							if (noTriggerScroll !== true) {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
							}
						}
					});

				timeboxparent.on('mousewheel', function (event) {
					var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

					top = top - (event.deltaY * 20);
					if (top < 0) {
						top = 0;
					}

					timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
					event.stopPropagation();
					return false;
				});

				timeboxparent.on('touchstart', function (event) {
					start = pointerEventToXY(event);
					startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
				});

				timeboxparent.on('touchmove', function (event) {
					if (start) {
						event.preventDefault();
						var coord = pointerEventToXY(event);
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
					}
				});

				timeboxparent.on('touchend touchcancel', function (event) {
					start = false;
					startTop = 0;
				});
			}
			timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
		});
	};

	$.fn.datetimepicker = function (opt) {
		var KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
			ctrlDown	=	false,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

			lazyInitTimer = 0,
			createDateTimePicker,
			destroyDateTimePicker,

			lazyInit = function (input) {
				input
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function initOnActionCallback(event) {
						if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
							return;
						}
						clearTimeout(lazyInitTimer);
						lazyInitTimer = setTimeout(function () {

							if (!input.data('xdsoft_datetimepicker')) {
								createDateTimePicker(input);
							}
							input
								.off('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', initOnActionCallback)
								.trigger('open.xdsoft');
						}, 100);
					});
			};

		createDateTimePicker = function (input) {
			var datetimepicker = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
				xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
				datepicker = $('<div class="xdsoft_datepicker active"></div>'),
				mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
					'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
					'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
					'<button type="button" class="xdsoft_next"></button></div>'),
				calendar = $('<div class="xdsoft_calendar"></div>'),
				timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
				timebox = $('<div class="xdsoft_time_variant"></div>'),
                applyButton = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),
				/*scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
				scroller = $('<div class="xdsoft_scroller"></div>'),*/
				monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
				yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
				triggerAfterOpen = false,
				XDSoft_datetime,
				//scroll_element,
				xchangeTimer,
				timerclick,
				current_time_index,
				setPos,
				timer = 0,
				timer1 = 0,
				_xdsoft_datetime;

			if (options.id) {
				datetimepicker.attr('id', options.id);
			}
			if (options.style) {
				datetimepicker.attr('style', options.style);
			}
			if (options.weeks) {
				datetimepicker.addClass('xdsoft_showweeks');
			}
			if (options.rtl) {
				datetimepicker.addClass('xdsoft_rtl');
			}

			datetimepicker.addClass('xdsoft_' + options.theme);
			datetimepicker.addClass(options.className);

			mounth_picker
				.find('.xdsoft_month span')
					.after(monthselect);
			mounth_picker
				.find('.xdsoft_year span')
					.after(yearselect);

			mounth_picker
				.find('.xdsoft_month,.xdsoft_year')
					.on('touchstart mousedown.xdsoft', function (event) {
					var select = $(this).find('.xdsoft_select').eq(0),
						val = 0,
						top = 0,
						visible = select.is(':visible'),
						items,
						i;

					mounth_picker
						.find('.xdsoft_select')
							.hide();
					if (_xdsoft_datetime.currentTime) {
						val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
					}

					select[visible ? 'hide' : 'show']();
					for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
						if (items.eq(i).data('value') === val) {
							break;
						} else {
							top += items[0].offsetHeight;
						}
					}

					select.xdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
					event.stopPropagation();
					return false;
				});

			mounth_picker
				.find('.xdsoft_select')
					.xdsoftScroller()
				.on('touchstart mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
				})
				.on('touchstart mousedown.xdsoft', '.xdsoft_option', function (event) {
					if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
					}

					var year = _xdsoft_datetime.currentTime.getFullYear();
					if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
						_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
					}

					$(this).parent().parent().hide();

					datetimepicker.trigger('xchange.xdsoft');
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
				});

			datetimepicker.setOptions = function (_options) {
				var highlightedDates = {},
					getCaretPos = function (input) {
						try {
							if (document.selection && document.selection.createRange) {
								var range = document.selection.createRange();
								return range.getBookmark().charCodeAt(2) - 2;
							}
							if (input.setSelectionRange) {
								return input.selectionStart;
							}
						} catch (e) {
							return 0;
						}
					},
					setCaretPos = function (node, pos) {
						node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
						if (!node) {
							return false;
						}
						if (node.createTextRange) {
							var textRange = node.createTextRange();
							textRange.collapse(true);
							textRange.moveEnd('character', pos);
							textRange.moveStart('character', pos);
							textRange.select();
							return true;
						}
						if (node.setSelectionRange) {
							node.setSelectionRange(pos, pos);
							return true;
						}
						return false;
					},
					isValidValue = function (mask, value) {
						var reg = mask
							.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
							.replace(/_/g, '{digit+}')
							.replace(/([0-9]{1})/g, '{digit$1}')
							.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
							.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
						return (new RegExp(reg)).test(value);
					};
				options = $.extend(true, {}, options, _options);

				if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
					options.allowTimes = $.extend(true, [], _options.allowTimes);
				}

				if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
					options.weekends = $.extend(true, [], _options.weekends);
				}

				if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
					$.each(_options.highlightedDates, function (index, value) {
						var splitData = $.map(value.split(','), $.trim),
							exDesc,
							hDate = new HighlightedDate(dateHelper.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
							keyDate = dateHelper.formatDate(hDate.date, options.formatDate);
						if (highlightedDates[keyDate] !== undefined) {
							exDesc = highlightedDates[keyDate].desc;
							if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
								highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
							}
						} else {
							highlightedDates[keyDate] = hDate;
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
					highlightedDates = $.extend(true, [], options.highlightedDates);
					$.each(_options.highlightedPeriods, function (index, value) {
						var dateTest, // start date
							dateEnd,
							desc,
							hDate,
							keyDate,
							exDesc,
							style;
						if ($.isArray(value)) {
							dateTest = value[0];
							dateEnd = value[1];
							desc = value[2];
							style = value[3];
						}
						else {
							var splitData = $.map(value.split(','), $.trim);
							dateTest = dateHelper.parseDate(splitData[0], options.formatDate);
							dateEnd = dateHelper.parseDate(splitData[1], options.formatDate);
							desc = splitData[2];
							style = splitData[3];
						}

						while (dateTest <= dateEnd) {
							hDate = new HighlightedDate(dateTest, desc, style);
							keyDate = dateHelper.formatDate(dateTest, options.formatDate);
							dateTest.setDate(dateTest.getDate() + 1);
							if (highlightedDates[keyDate] !== undefined) {
								exDesc = highlightedDates[keyDate].desc;
								if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
									highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
								}
							} else {
								highlightedDates[keyDate] = hDate;
							}
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
					options.disabledDates = $.extend(true, [], _options.disabledDates);
				}

				if (_options.disabledWeekDays && $.isArray(_options.disabledWeekDays) && _options.disabledWeekDays.length) {
				    options.disabledWeekDays = $.extend(true, [], _options.disabledWeekDays);
				}

				if ((options.open || options.opened) && (!options.inline)) {
					input.trigger('open.xdsoft');
				}

				if (options.inline) {
					triggerAfterOpen = true;
					datetimepicker.addClass('xdsoft_inline');
					input.after(datetimepicker).hide();
				}

				if (options.inverseButton) {
					options.next = 'xdsoft_prev';
					options.prev = 'xdsoft_next';
				}

				if (options.datepicker) {
					datepicker.addClass('active');
				} else {
					datepicker.removeClass('active');
				}

				if (options.timepicker) {
					timepicker.addClass('active');
				} else {
					timepicker.removeClass('active');
				}

				if (options.value) {
					_xdsoft_datetime.setCurrentTime(options.value);
					if (input && input.val) {
						input.val(_xdsoft_datetime.str);
					}
				}

				if (isNaN(options.dayOfWeekStart)) {
					options.dayOfWeekStart = 0;
				} else {
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
				}

				if (!options.timepickerScrollbar) {
					timeboxparent.xdsoftScroller('hide');
				}

				if (options.minDate && /^[\+\-](.*)$/.test(options.minDate)) {
					options.minDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.minDate), options.formatDate);
				}

				if (options.maxDate &&  /^[\+\-](.*)$/.test(options.maxDate)) {
					options.maxDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.maxDate), options.formatDate);
				}

				applyButton.toggle(options.showApplyButton);

				mounth_picker
					.find('.xdsoft_today_button')
						.css('visibility', !options.todayButton ? 'hidden' : 'visible');

				mounth_picker
					.find('.' + options.prev)
						.css('visibility', !options.prevButton ? 'hidden' : 'visible');

				mounth_picker
					.find('.' + options.next)
						.css('visibility', !options.nextButton ? 'hidden' : 'visible');

				if (options.mask) {
					input.off('keydown.xdsoft');

					if (options.mask === true) {
						options.mask = options.format
							.replace(/Y/g, '9999')
							.replace(/F/g, '9999')
							.replace(/m/g, '19')
							.replace(/d/g, '39')
							.replace(/H/g, '29')
							.replace(/i/g, '59')
							.replace(/s/g, '59');
					}

					if ($.type(options.mask) === 'string') {
						if (!isValidValue(options.mask, input.val())) {
							input.val(options.mask.replace(/[0-9]/g, '_'));
							setCaretPos(input[0], 0);
						}

						input.on('keydown.xdsoft', function (event) {
							var val = this.value,
								key = event.which,
								pos,
								digit;

							if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
								pos = getCaretPos(this);
								digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

								if ((key === BACKSPACE || key === DEL) && pos) {
									pos -= 1;
									digit = '_';
								}

								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								val = val.substr(0, pos) + digit + val.substr(pos + 1);
								if ($.trim(val) === '') {
									val = options.mask.replace(/[0-9]/g, '_');
								} else {
									if (pos === options.mask.length) {
										event.preventDefault();
										return false;
									}
								}

								pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								if (isValidValue(options.mask, val)) {
									this.value = val;
									setCaretPos(this, pos);
								} else if ($.trim(val) === '') {
									this.value = options.mask.replace(/[0-9]/g, '_');
								} else {
									input.trigger('error_input.xdsoft');
								}
							} else {
								if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
									return true;
								}
							}

							event.preventDefault();
							return false;
						});
					}
				}
				if (options.validateOnBlur) {
					input
						.off('blur.xdsoft')
						.on('blur.xdsoft', function () {
							if (options.allowBlank && !$.trim($(this).val()).length) {
								$(this).val(null);
								datetimepicker.data('xdsoft_datetime').empty();
							} else if (!dateHelper.parseDate($(this).val(), options.format)) {
								var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
									splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

								// parse the numbers as 0312 => 03:12
								if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
									$(this).val([splittedHours, splittedMinutes].map(function (item) {
										return item > 9 ? item : '0' + item;
									}).join(':'));
								} else {
									$(this).val(dateHelper.formatDate(_xdsoft_datetime.now(), options.format));
								}

								datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
							} else {
								datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
							}

							datetimepicker.trigger('changedatetime.xdsoft');
						});
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

				datetimepicker
					.trigger('xchange.xdsoft')
					.trigger('afterOpen.xdsoft');
			};

			datetimepicker
				.data('options', options)
				.on('touchstart mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
					yearselect.hide();
					monthselect.hide();
					return false;
				});

			//scroll_element = timepicker.find('.xdsoft_time_box');
			timeboxparent.append(timebox);
			timeboxparent.xdsoftScroller();

			datetimepicker.on('afterOpen.xdsoft', function () {
				timeboxparent.xdsoftScroller();
			});

			datetimepicker
				.append(datepicker)
				.append(timepicker);

			if (options.withoutCopyright !== true) {
				datetimepicker
					.append(xdsoft_copyright);
			}

			datepicker
				.append(mounth_picker)
				.append(calendar)
				.append(applyButton);

			$(options.parentID)
				.append(datetimepicker);

			XDSoft_datetime = function () {
				var _this = this;
				_this.now = function (norecursion) {
					var d = new Date(),
						date,
						time;

					if (!norecursion && options.defaultDate) {
						date = _this.strToDateTime(options.defaultDate);
						d.setFullYear(date.getFullYear());
						d.setMonth(date.getMonth());
						d.setDate(date.getDate());
					}

					if (options.yearOffset) {
						d.setFullYear(d.getFullYear() + options.yearOffset);
					}

					if (!norecursion && options.defaultTime) {
						time = _this.strtotime(options.defaultTime);
						d.setHours(time.getHours());
						d.setMinutes(time.getMinutes());
					}
					return d;
				};

				_this.isValidDate = function (d) {
					if (Object.prototype.toString.call(d) !== "[object Date]") {
						return false;
					}
					return !isNaN(d.getTime());
				};

				_this.setCurrentTime = function (dTime) {
					_this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
					datetimepicker.trigger('xchange.xdsoft');
				};

				_this.empty = function () {
					_this.currentTime = null;
				};

				_this.getCurrentTime = function (dTime) {
					return _this.currentTime;
				};

				_this.nextMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() + 1,
						year;
					if (month === 12) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
						month = 0;
					}

					year = _this.currentTime.getFullYear();

					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);

					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.prevMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() - 1;
					if (month === -1) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
						month = 11;
					}
					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.getWeekOfYear = function (datetime) {
					var onejan = new Date(datetime.getFullYear(), 0, 1);
					return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};

				_this.strToDateTime = function (sDateTime) {
					var tmpDate = [], timeOffset, currentTime;

					if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
						return sDateTime;
					}

					tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
					if (tmpDate) {
						tmpDate[2] = dateHelper.parseDate(tmpDate[2], options.formatDate);
					}
					if (tmpDate  && tmpDate[2]) {
						timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
						currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
					} else {
						currentTime = sDateTime ? dateHelper.parseDate(sDateTime, options.format) : _this.now();
					}

					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now();
					}

					return currentTime;
				};

				_this.strToDate = function (sDate) {
					if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
						return sDate;
					}

					var currentTime = sDate ? dateHelper.parseDate(sDate, options.formatDate) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.strtotime = function (sTime) {
					if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
						return sTime;
					}
					var currentTime = sTime ? dateHelper.parseDate(sTime, options.formatTime) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.str = function () {
					return dateHelper.formatDate(_this.currentTime, options.format);
				};
				_this.currentTime = this.now();
			};

			_xdsoft_datetime = new XDSoft_datetime();

			applyButton.on('touchend click', function (e) {//pathbrite
                e.preventDefault();
                datetimepicker.data('changed', true);
                _xdsoft_datetime.setCurrentTime(getCurrentValue());
                input.val(_xdsoft_datetime.str());
                datetimepicker.trigger('close.xdsoft');
            });
			mounth_picker
				.find('.xdsoft_today_button')
				.on('touchend mousedown.xdsoft', function () {
					datetimepicker.data('changed', true);
					_xdsoft_datetime.setCurrentTime(0);
					datetimepicker.trigger('afterOpen.xdsoft');
				}).on('dblclick.xdsoft', function () {
					var currentDate = _xdsoft_datetime.getCurrentTime(), minDate, maxDate;
					currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
					minDate = _xdsoft_datetime.strToDate(options.minDate);
					minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
					if (currentDate < minDate) {
						return;
					}
					maxDate = _xdsoft_datetime.strToDate(options.maxDate);
					maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
					if (currentDate > maxDate) {
						return;
					}
					input.val(_xdsoft_datetime.str());
					input.trigger('change');
					datetimepicker.trigger('close.xdsoft');
				});
			mounth_picker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('touchend mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false;

					(function arguments_callee1(v) {
						if ($this.hasClass(options.next)) {
							_xdsoft_datetime.nextMonth();
						} else if ($this.hasClass(options.prev)) {
							_xdsoft_datetime.prevMonth();
						}
						if (options.monthChangeSpinner) {
							if (!stop) {
								timer = setTimeout(arguments_callee1, v || 100);
							}
						}
					}(500));

					$([document.body, window]).on('touchend mouseup.xdsoft', function arguments_callee2() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window]).off('touchend mouseup.xdsoft', arguments_callee2);
					});
				});

			timepicker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('touchend mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false,
						period = 110;
					(function arguments_callee4(v) {
						var pheight = timeboxparent[0].clientHeight,
							height = timebox[0].offsetHeight,
							top = Math.abs(parseInt(timebox.css('marginTop'), 10));
						if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
							timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
						} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
							timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
						}
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
						period = (period > 10) ? 10 : period - 10;
						if (!stop) {
							timer = setTimeout(arguments_callee4, v || period);
						}
					}(500));
					$([document.body, window]).on('touchend mouseup.xdsoft', function arguments_callee5() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window])
							.off('touchend mouseup.xdsoft', arguments_callee5);
					});
				});

			xchangeTimer = 0;
			// base handler - generating a calendar and timepicker
			datetimepicker
				.on('xchange.xdsoft', function (event) {
					clearTimeout(xchangeTimer);
					xchangeTimer = setTimeout(function () {

						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var table =	'',
							start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
							i = 0,
							j,
							today = _xdsoft_datetime.now(),
							maxDate = false,
							minDate = false,
							hDate,
							day,
							d,
							y,
							m,
							w,
							classes = [],
							customDateSettings,
							newRow = true,
							time = '',
							h = '',
							line_time,
							description;

						while (start.getDay() !== options.dayOfWeekStart) {
							start.setDate(start.getDate() - 1);
						}

						table += '<table><thead><tr>';

						if (options.weeks) {
							table += '<th></th>';
						}

						for (j = 0; j < 7; j += 1) {
							table += '<th>' + options.i18n[globalLocale].dayOfWeekShort[(j + options.dayOfWeekStart) % 7] + '</th>';
						}

						table += '</tr></thead>';
						table += '<tbody>';

						if (options.maxDate !== false) {
							maxDate = _xdsoft_datetime.strToDate(options.maxDate);
							maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
						}

						if (options.minDate !== false) {
							minDate = _xdsoft_datetime.strToDate(options.minDate);
							minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
						}

						while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
							classes = [];
							i += 1;

							day = start.getDay();
							d = start.getDate();
							y = start.getFullYear();
							m = start.getMonth();
							w = _xdsoft_datetime.getWeekOfYear(start);
							description = '';

							classes.push('xdsoft_date');

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
								customDateSettings = options.beforeShowDay.call(datetimepicker, start);
							} else {
								customDateSettings = null;
							}

							if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
								classes.push('xdsoft_disabled');
							} else if (options.disabledDates.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
								classes.push('xdsoft_disabled');
							} else if (options.disabledWeekDays.indexOf(day) !== -1) {
							    classes.push('xdsoft_disabled');
							}

							if (customDateSettings && customDateSettings[1] !== "") {
								classes.push(customDateSettings[1]);
							}

							if (_xdsoft_datetime.currentTime.getMonth() !== m) {
								classes.push('xdsoft_other_month');
							}

							if ((options.defaultSelect || datetimepicker.data('changed')) && dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
								classes.push('xdsoft_current');
							}

							if (dateHelper.formatDate(today, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
								classes.push('xdsoft_today');
							}

							if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
								classes.push('xdsoft_weekend');
							}

							if (options.highlightedDates[dateHelper.formatDate(start, options.formatDate)] !== undefined) {
								hDate = options.highlightedDates[dateHelper.formatDate(start, options.formatDate)];
								classes.push(hDate.style === undefined ? 'xdsoft_highlighted_default' : hDate.style);
								description = hDate.desc === undefined ? '' : hDate.desc;
							}

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
								classes.push(options.beforeShowDay(start));
							}

							if (newRow) {
								table += '<tr>';
								newRow = false;
								if (options.weeks) {
									table += '<th>' + w + '</th>';
								}
							}

							table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
										'<div>' + d + '</div>' +
									'</td>';

							if (start.getDay() === options.dayOfWeekStartPrev) {
								table += '</tr>';
								newRow = true;
							}

							start.setDate(d + 1);
						}
						table += '</tbody></table>';

						calendar.html(table);

						mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[globalLocale].months[_xdsoft_datetime.currentTime.getMonth()]);
						mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

						// generate timebox
						time = '';
						h = '';
						m = '';

						line_time = function line_time(h, m) {
							var now = _xdsoft_datetime.now(), optionDateTime, current_time,
								isALlowTimesInit = options.allowTimes && $.isArray(options.allowTimes) && options.allowTimes.length;
							now.setHours(h);
							h = parseInt(now.getHours(), 10);
							now.setMinutes(m);
							m = parseInt(now.getMinutes(), 10);
							optionDateTime = new Date(_xdsoft_datetime.currentTime);
							optionDateTime.setHours(h);
							optionDateTime.setMinutes(m);
							classes = [];
							if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
								classes.push('xdsoft_disabled');
							}
							if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || ((options.disabledMinTime !== false && now.getTime() > _xdsoft_datetime.strtotime(options.disabledMinTime).getTime()) && (options.disabledMaxTime !== false && now.getTime() < _xdsoft_datetime.strtotime(options.disabledMaxTime).getTime()))) {
								classes.push('xdsoft_disabled');
							}

							current_time = new Date(_xdsoft_datetime.currentTime);
							current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));

							if (!isALlowTimesInit) {
								current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
							}

							if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && ((!isALlowTimesInit && options.step > 59) || current_time.getMinutes() === parseInt(m, 10))) {
								if (options.defaultSelect || datetimepicker.data('changed')) {
									classes.push('xdsoft_current');
								} else if (options.initTime) {
									classes.push('xdsoft_init_time');
								}
							}
							if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
								classes.push('xdsoft_today');
							}
							time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + dateHelper.formatDate(now, options.formatTime) + '</div>';
						};

						if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
							for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
								for (j = 0; j < 60; j += options.step) {
									h = (i < 10 ? '0' : '') + i;
									m = (j < 10 ? '0' : '') + j;
									line_time(h, m);
								}
							}
						} else {
							for (i = 0; i < options.allowTimes.length; i += 1) {
								h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
								m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
								line_time(h, m);
							}
						}

						timebox.html(time);

						opt = '';
						i = 0;

						for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
						}
						yearselect.children().eq(0)
												.html(opt);

						for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[globalLocale].months[i] + '</div>';
						}
						monthselect.children().eq(0).html(opt);
						$(datetimepicker)
							.trigger('generate.xdsoft');
					}, 10);
					event.stopPropagation();
				})
				.on('afterOpen.xdsoft', function () {
					if (options.timepicker) {
						var classType, pheight, height, top;
						if (timebox.find('.xdsoft_current').length) {
							classType = '.xdsoft_current';
						} else if (timebox.find('.xdsoft_init_time').length) {
							classType = '.xdsoft_init_time';
						}
						if (classType) {
							pheight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
							if ((height - pheight) < top) {
								top = height - pheight;
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
						} else {
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
						}
					}
				});

			timerclick = 0;
			calendar
				.on('touchend click.xdsoft', 'td', function (xdevent) {
					xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}

					currentTime.setDate(1);
					currentTime.setFullYear($this.data('year'));
					currentTime.setMonth($this.data('month'));
					currentTime.setDate($this.data('date'));

					datetimepicker.trigger('select.xdsoft', [currentTime]);

					input.val(_xdsoft_datetime.str());

					if (options.onSelectDate &&	$.isFunction(options.onSelectDate)) {
						options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}

					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === false && !options.timepicker))) && !options.inline) {
						datetimepicker.trigger('close.xdsoft');
					}
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});

			timebox
				.on('touchend click.xdsoft', 'div', function (xdevent) {
					xdevent.stopPropagation();
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}
					currentTime.setHours($this.data('hour'));
					currentTime.setMinutes($this.data('minute'));
					datetimepicker.trigger('select.xdsoft', [currentTime]);

					datetimepicker.data('input').val(_xdsoft_datetime.str());

					if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
						options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}
					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					if (options.inline !== true && options.closeOnTimeSelect === true) {
						datetimepicker.trigger('close.xdsoft');
					}
				});


			datepicker
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollMonth) {
						return true;
					}
					if (event.deltaY < 0) {
						_xdsoft_datetime.nextMonth();
					} else {
						_xdsoft_datetime.prevMonth();
					}
					return false;
				});

			input
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollInput) {
						return true;
					}
					if (!options.datepicker && options.timepicker) {
						current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
						if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
							current_time_index += event.deltaY;
						}
						if (timebox.children().eq(current_time_index).length) {
							timebox.children().eq(current_time_index).trigger('mousedown');
						}
						return false;
					}
					if (options.datepicker && !options.timepicker) {
						datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
						if (input.val) {
							input.val(_xdsoft_datetime.str());
						}
						datetimepicker.trigger('changedatetime.xdsoft');
						return false;
					}
				});

			datetimepicker
				.on('changedatetime.xdsoft', function (event) {
					if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
						var $input = datetimepicker.data('input');
						options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
						delete options.value;
						$input.trigger('change');
					}
				})
				.on('generate.xdsoft', function () {
					if (options.onGenerate && $.isFunction(options.onGenerate)) {
						options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					if (triggerAfterOpen) {
						datetimepicker.trigger('afterOpen.xdsoft');
						triggerAfterOpen = false;
					}
				})
				.on('click.xdsoft', function (xdevent) {
					xdevent.stopPropagation();
				});

			current_time_index = 0;

			setPos = function () {
				var offset = datetimepicker.data('input').offset(), datetimepickerelement = datetimepicker.data('input')[0], top = offset.top + datetimepickerelement.offsetHeight - 1, left = offset.left, position = "absolute", node;
				if (datetimepicker.data('input').parent().css('direction') == 'rtl')
					left -= (datetimepicker.outerWidth() - datetimepicker.data('input').outerWidth());
				if (options.fixed) {
					top -= $(window).scrollTop();
					left -= $(window).scrollLeft();
					position = "fixed";
				} else {
					if (top + datetimepickerelement.offsetHeight > $(window).height() + $(window).scrollTop()) {
						top = offset.top - datetimepickerelement.offsetHeight + 1;
					}
					if (top < 0) {
						top = 0;
					}
					if (left + datetimepickerelement.offsetWidth > $(window).width()) {
						left = $(window).width() - datetimepickerelement.offsetWidth;
					}
				}

				node = datetimepicker[0];
				do {
					node = node.parentNode;
					if (window.getComputedStyle(node).getPropertyValue('position') === 'relative' && $(window).width() >= node.offsetWidth) {
						left = left - (($(window).width() - node.offsetWidth) / 2);
						break;
					}
				} while (node.nodeName !== 'HTML');
				datetimepicker.css({
					left: left,
					top: top,
					position: position
				});
			};
			datetimepicker
				.on('open.xdsoft', function (event) {
					var onShow = true;
					if (options.onShow && $.isFunction(options.onShow)) {
						onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onShow !== false) {
						datetimepicker.show();
						setPos();
						$(window)
							.off('resize.xdsoft', setPos)
							.on('resize.xdsoft', setPos);

						if (options.closeOnWithoutClick) {
							$([document.body, window]).on('touchstart mousedown.xdsoft', function arguments_callee6() {
								datetimepicker.trigger('close.xdsoft');
								$([document.body, window]).off('touchstart mousedown.xdsoft', arguments_callee6);
							});
						}
					}
				})
				.on('close.xdsoft', function (event) {
					var onClose = true;
					mounth_picker
						.find('.xdsoft_month,.xdsoft_year')
							.find('.xdsoft_select')
								.hide();
					if (options.onClose && $.isFunction(options.onClose)) {
						onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onClose !== false && !options.opened && !options.inline) {
						datetimepicker.hide();
					}
					event.stopPropagation();
				})
				.on('toggle.xdsoft', function (event) {
					if (datetimepicker.is(':visible')) {
						datetimepicker.trigger('close.xdsoft');
					} else {
						datetimepicker.trigger('open.xdsoft');
					}
				})
				.data('input', input);

			timer = 0;
			timer1 = 0;

			datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
			datetimepicker.setOptions(options);

			function getCurrentValue() {
				var ct = false, time;

				if (options.startDate) {
					ct = _xdsoft_datetime.strToDate(options.startDate);
				} else {
					ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
					if (ct) {
						ct = _xdsoft_datetime.strToDateTime(ct);
					} else if (options.defaultDate) {
						ct = _xdsoft_datetime.strToDateTime(options.defaultDate);
						if (options.defaultTime) {
							time = _xdsoft_datetime.strtotime(options.defaultTime);
							ct.setHours(time.getHours());
							ct.setMinutes(time.getMinutes());
						}
					}
				}

				if (ct && _xdsoft_datetime.isValidDate(ct)) {
					datetimepicker.data('changed', true);
				} else {
					ct = '';
				}

				return ct || 0;
			}

			_xdsoft_datetime.setCurrentTime(getCurrentValue());

			input
				.data('xdsoft_datetimepicker', datetimepicker)
				.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function (event) {
					if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
						return;
					}
					clearTimeout(timer);
					timer = setTimeout(function () {
						if (input.is(':disabled')) {
							return;
						}

						triggerAfterOpen = true;
						_xdsoft_datetime.setCurrentTime(getCurrentValue());

						datetimepicker.trigger('open.xdsoft');
					}, 100);
				})
				.on('keydown.xdsoft', function (event) {
					var val = this.value, elementSelector,
						key = event.which;
					if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
						elementSelector = $("input:visible,textarea:visible,button:visible,a:visible");
						datetimepicker.trigger('close.xdsoft');
						elementSelector.eq(elementSelector.index(this) + 1).focus();
						return false;
					}
					if ([TAB].indexOf(key) !== -1) {
						datetimepicker.trigger('close.xdsoft');
						return true;
					}
				});
		};
		destroyDateTimePicker = function (input) {
			var datetimepicker = input.data('xdsoft_datetimepicker');
			if (datetimepicker) {
				datetimepicker.data('xdsoft_datetime', null);
				datetimepicker.remove();
				input
					.data('xdsoft_datetimepicker', null)
					.off('.xdsoft');
				$(window).off('resize.xdsoft');
				$([window, document.body]).off('mousedown.xdsoft touchstart');
				if (input.unmousewheel) {
					input.unmousewheel();
				}
			}
		};
		$(document)
			.off('keydown.xdsoftctrl keyup.xdsoftctrl')
			.on('keydown.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = true;
				}
			})
			.on('keyup.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = false;
				}
			});
		return this.each(function () {
			var datetimepicker = $(this).data('xdsoft_datetimepicker'), $input;
			if (datetimepicker) {
				if ($.type(opt) === 'string') {
					switch (opt) {
					case 'show':
						$(this).select().focus();
						datetimepicker.trigger('open.xdsoft');
						break;
					case 'hide':
						datetimepicker.trigger('close.xdsoft');
						break;
					case 'toggle':
						datetimepicker.trigger('toggle.xdsoft');
						break;
					case 'destroy':
						destroyDateTimePicker($(this));
						break;
					case 'reset':
						this.value = this.defaultValue;
						if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(dateHelper.parseDate(this.value, options.format))) {
							datetimepicker.data('changed', false);
						}
						datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
						break;
					case 'validate':
						$input = datetimepicker.data('input');
						$input.trigger('blur.xdsoft');
						break;
					}
				} else {
					datetimepicker
						.setOptions(opt);
				}
				return 0;
			}
			if ($.type(opt) !== 'string') {
				if (!options.lazyInit || options.open || options.inline) {
					createDateTimePicker($(this));
				} else {
					lazyInit($(this));
				}
			}
		});
	};
	$.fn.datetimepicker.defaults = default_options;

	function HighlightedDate(date, desc, style) {
		"use strict";
		this.date = date;
		this.desc = desc;
		this.style = style;
	}

}));
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


/*!	
* StickyHeader v1.0
*
* Copyright 2015, Rory Hurlburt @ Wild Apple Design Group
* Released under the WTFPL license 
* http://www.wildappledesigngroup.com
*
* Date: 10-20-15
*/
(function($){
     $.fn.extend({ 

         stickyHeader: function(options) {
            var defaults = {
							speed: 250,
            };
            
            var options = $.extend(defaults, options);
        
            return this.each(function() {
						
							// Variables
							var o = options;
							var lastScrollTop = 0;
							var stickyHeading = $(this);
							var stickyHeadingHeight = $(this).height();
														
							$(window).scroll(function(event){
																							
							var st = $(this).scrollTop();
							
							if (st > lastScrollTop){
									
								$(stickyHeading).removeAttr('style').css({
									'top':-stickyHeadingHeight+'px'
								});
								
							} else if (st < 250){
								
								$(stickyHeading).removeAttr('style').css({
									'top':-stickyHeadingHeight+'px'
								});
								
							} else {
								
								$(stickyHeading).css({
									'visibility':'visible',
									'top':'0px',
									'-ms-filter':'"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"',
									'filter':'alpha(opacity=100)',
									'opacity':'1'
								});
								
										
							}
								
							lastScrollTop = st;
							
							});
						
            });
        }
    });
})(jQuery);


/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS
    module.exports = factory(require('jquery'));
  } else {
      // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var inviewObjects = {}, viewportSize, viewportOffset,
      d = document, w = window, documentElement = d.documentElement, expando = $.expando, timer;

  $.event.special.inview = {
    add: function(data) {
      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };

      // Use setInterval in order to also make sure this captures elements within
      // "overflow:scroll" elements or elements that appeared in the dom tree due to
      // dom manipulation and reflow
      // old: $(window).scroll(checkInView);
      //
      // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
      // intervals while the user scrolls. Therefore the inview event might fire a bit late there
      //
      // Don't waste cycles with an interval until we get at least one element that
      // has bound to the inview event.
      if (!timer && !$.isEmptyObject(inviewObjects)) {
         timer = setInterval(checkInView, 250);
      }
    },

    remove: function(data) {
      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}

      // Clear interval when we no longer have any elements listening
      if ($.isEmptyObject(inviewObjects)) {
         clearInterval(timer);
         timer = null;
      }
    }
  };

  function getViewportSize() {
    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) { // IE, Gecko
        domObject = mode === 'CSS1Compat' ?
          documentElement : // Standards
          d.body; // Quirks
        size = {
          height: domObject.clientHeight,
          width:  domObject.clientWidth
        };
      }
    }

    return size;
  }

  function getViewportOffset() {
    return {
      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
    };
  }

  function checkInView() {
    var $elements = [], elementsLength, i = 0;

    $.each(inviewObjects, function(i, inviewObject) {
      var selector  = inviewObject.data.selector,
          $element  = inviewObject.$element;
      $elements.push(selector ? $element.find(selector) : $element);
    });

    elementsLength = $elements.length;
    if (elementsLength) {
      viewportSize   = viewportSize   || getViewportSize();
      viewportOffset = viewportOffset || getViewportOffset();

      for (; i<elementsLength; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i][0])) {
          continue;
        }

        var $element      = $($elements[i]),
            elementSize   = { height: $element.height(), width: $element.width() },
            elementOffset = $element.offset(),
            inView        = $element.data('inview'),
            visiblePartX,
            visiblePartY,
            visiblePartsMerged;

        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }

        if (elementOffset.top + elementSize.height > viewportOffset.top &&
            elementOffset.top < viewportOffset.top + viewportSize.height &&
            elementOffset.left + elementSize.width > viewportOffset.left &&
            elementOffset.left < viewportOffset.left + viewportSize.width) {
          visiblePartX = (viewportOffset.left > elementOffset.left ?
            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
            'left' : 'both');
          visiblePartY = (viewportOffset.top > elementOffset.top ?
            'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
            'top' : 'both');
          visiblePartsMerged = visiblePartX + "-" + visiblePartY;
          if (!inView || inView !== visiblePartsMerged) {
            $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
          }
        } else if (inView) {
          $element.data('inview', false).trigger('inview', [false]);
        }
      }
    }
  }

  $(w).bind("scroll resize scrollstop", function() {
    viewportSize = viewportOffset = null;
  });

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function() {
      viewportOffset = null;
    });
  }
}));

/*!
* Global class for inView slide up
*/
$(document).ready(function() {
	
	$('.inview-slide-up-item').each(function(){
		
		$(this).bind('inview', function(event, isInView) {
			if (isInView) {
				
				$(this).addClass('inview-slide-up-item-active');
				
			} else {
				
				//$(this).removeClass('inview-slide-up-item-active');
				
			}
		});

	});

});

/*!	* FitText.js 1.0** Copyright 2011, Dave Rupert http://daverupert.com* Released under the WTFPL license * http://sam.zoy.org/wtfpl/** Date: Thu May 05 14:23:00 2011 -0600*/(function( $ ){  $.fn.fitText = function( kompressor, options ) {    // Setup options    var compressor = kompressor || 1,        settings = $.extend({          'minFontSize' : Number.NEGATIVE_INFINITY,          'maxFontSize' : Number.POSITIVE_INFINITY        }, options);    return this.each(function(){      // Store the object      var $this = $(this);               // Resizer() resizes items based on the object width divided by the compressor * 10      var resizer = function () {        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));      };      // Call once to set.      resizer();      // Call on resize. Opera debounces their resize by default.       $(window).on('resize', resizer);      	    });  };})( jQuery );/*global jQuery *//*jshint multistr:true browser:true *//*!* FitVids 1.0.3** Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/* Released under the WTFPL license - http://sam.zoy.org/wtfpl/** Date: Thu Sept 01 18:00:00 2011 -0500*/(function( $ ){  "use strict";  $.fn.fitVids = function( options ) {    var settings = {      customSelector: null    };    if(!document.getElementById('fit-vids-style')) {      var div = document.createElement('div'),          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';      div.className = 'fit-vids-style';      div.id = 'fit-vids-style';      div.style.display = 'none';      div.innerHTML = cssStyles;      ref.parentNode.insertBefore(div,ref);    }    if ( options ) {      $.extend( settings, options );    }    return this.each(function(){      var selectors = [        "iframe[src*='player.vimeo.com']",        "iframe[src*='youtube.com']",        "iframe[src*='youtube-nocookie.com']",        "iframe[src*='kickstarter.com'][src*='video.html']",        "object",        "embed"      ];      if (settings.customSelector) {        selectors.push(settings.customSelector);      }      var $allVideos = $(this).find(selectors.join(','));      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch      $allVideos.each(function(){        var $this = $(this);        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),            aspectRatio = height / width;        if(!$this.attr('id')){          var videoID = 'fitvid' + Math.floor(Math.random()*999999);          $this.attr('id', videoID);        }        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");        $this.removeAttr('height').removeAttr('width');      });    });  };// Works with either jQuery or Zepto})( window.jQuery || window.Zepto );
/*! * Smooth Scroll - v1.4.13 - 2013-11-02 * https://github.com/kswedberg/jquery-smooth-scroll * Copyright (c) 2013 Karl Swedberg * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT) */(function($) {var version = '1.4.13',    optionOverrides = {},    defaults = {      exclude: [],      excludeWithin:[],      offset: 0,      // one of 'top' or 'left'      direction: 'top',      // jQuery set of elements you wish to scroll (for $.smoothScroll).      //  if null (default), $('html, body').firstScrollable() is used.      scrollElement: null,      // only use if you want to override default behavior      scrollTarget: null,      // fn(opts) function to be called before scrolling occurs.      // `this` is the element(s) being scrolled      beforeScroll: function() {},      // fn(opts) function to be called after scrolling occurs.      // `this` is the triggering element      afterScroll: function() {},      easing: 'swing',      speed: 400,      // coefficient for "auto" speed      autoCoefficent: 2,      // $.fn.smoothScroll only: whether to prevent the default click action      preventDefault: true    },    getScrollable = function(opts) {      var scrollable = [],          scrolled = false,          dir = opts.dir && opts.dir == 'left' ? 'scrollLeft' : 'scrollTop';      this.each(function() {        if (this == document || this == window) { return; }        var el = $(this);        if ( el[dir]() > 0 ) {          scrollable.push(this);        } else {          // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves          el[dir](1);          scrolled = el[dir]() > 0;          if ( scrolled ) {            scrollable.push(this);          }          // then put it back, of course          el[dir](0);        }      });      // If no scrollable elements, fall back to <body>,      // if it's in the jQuery collection      // (doing this because Safari sets scrollTop async,      // so can't set it to 1 and immediately get the value.)      if (!scrollable.length) {        this.each(function(index) {          if (this.nodeName === 'BODY') {            scrollable = [this];          }        });      }      // Use the first scrollable element if we're calling firstScrollable()      if ( opts.el === 'first' && scrollable.length > 1 ) {        scrollable = [ scrollable[0] ];      }      return scrollable;    },    isTouch = 'ontouchend' in document;$.fn.extend({  scrollable: function(dir) {    var scrl = getScrollable.call(this, {dir: dir});    return this.pushStack(scrl);  },  firstScrollable: function(dir) {    var scrl = getScrollable.call(this, {el: 'first', dir: dir});    return this.pushStack(scrl);  },  smoothScroll: function(options, extra) {    options = options || {};    if ( options === 'options' ) {      if ( !extra ) {        return this.first().data('ssOpts');      }      return this.each(function() {        var $this = $(this),            opts = $.extend($this.data('ssOpts') || {}, extra);        $(this).data('ssOpts', opts);      });    }    var opts = $.extend({}, $.fn.smoothScroll.defaults, options),        locationPath = $.smoothScroll.filterPath(location.pathname);    this    .unbind('click.smoothscroll')    .bind('click.smoothscroll', function(event) {      var link = this,          $link = $(this),          thisOpts = $.extend({}, opts, $link.data('ssOpts') || {}),          exclude = opts.exclude,          excludeWithin = thisOpts.excludeWithin,          elCounter = 0, ewlCounter = 0,          include = true,          clickOpts = {},          hostMatch = ((location.hostname === link.hostname) || !link.hostname),          pathMatch = thisOpts.scrollTarget || ( $.smoothScroll.filterPath(link.pathname) || locationPath ) === locationPath,          thisHash = escapeSelector(link.hash);      if ( !thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash) ) {        include = false;      } else {        while (include && elCounter < exclude.length) {          if ($link.is(escapeSelector(exclude[elCounter++]))) {            include = false;          }        }        while ( include && ewlCounter < excludeWithin.length ) {          if ($link.closest(excludeWithin[ewlCounter++]).length) {            include = false;          }        }      }      if ( include ) {        if ( thisOpts.preventDefault ) {          event.preventDefault();        }        $.extend( clickOpts, thisOpts, {          scrollTarget: thisOpts.scrollTarget || thisHash,          link: link        });        $.smoothScroll( clickOpts );      }    });    return this;  }});$.smoothScroll = function(options, px) {  if ( options === 'options' && typeof px === 'object' ) {    return $.extend(optionOverrides, px);  }  var opts, $scroller, scrollTargetOffset, speed,      scrollerOffset = 0,      offPos = 'offset',      scrollDir = 'scrollTop',      aniProps = {},      aniOpts = {},      scrollprops = [];  if (typeof options === 'number') {    opts = $.extend({link: null}, $.fn.smoothScroll.defaults, optionOverrides);    scrollTargetOffset = options;  } else {    opts = $.extend({link: null}, $.fn.smoothScroll.defaults, options || {}, optionOverrides);    if (opts.scrollElement) {      offPos = 'position';      if (opts.scrollElement.css('position') == 'static') {        opts.scrollElement.css('position', 'relative');      }    }  }  scrollDir = opts.direction == 'left' ? 'scrollLeft' : scrollDir;  if ( opts.scrollElement ) {    $scroller = opts.scrollElement;    if ( !(/^(?:HTML|BODY)$/).test($scroller[0].nodeName) ) {      scrollerOffset = $scroller[scrollDir]();    }  } else {    $scroller = $('html, body').firstScrollable(opts.direction);  }  // beforeScroll callback function must fire before calculating offset  opts.beforeScroll.call($scroller, opts);  scrollTargetOffset = (typeof options === 'number') ? options :                        px ||                        ( $(opts.scrollTarget)[offPos]() &&                        $(opts.scrollTarget)[offPos]()[opts.direction] ) ||                        0;  aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;  speed = opts.speed;  // automatically calculate the speed of the scroll based on distance / coefficient  if (speed === 'auto') {    // if aniProps[scrollDir] == 0 then we'll use scrollTop() value instead    speed = aniProps[scrollDir] || $scroller.scrollTop();    // divide the speed by the coefficient    speed = speed / opts.autoCoefficent;  }  aniOpts = {    duration: speed,    easing: opts.easing,    complete: function() {      opts.afterScroll.call(opts.link, opts);    }  };  if (opts.step) {    aniOpts.step = opts.step;  }  if ($scroller.length) {    $scroller.stop().animate(aniProps, aniOpts);  } else {    opts.afterScroll.call(opts.link, opts);  }};$.smoothScroll.version = version;$.smoothScroll.filterPath = function(string) {  return string    .replace(/^\//,'')    .replace(/(?:index|default).[a-zA-Z]{3,4}$/,'')    .replace(/\/$/,'');};// default options$.fn.smoothScroll.defaults = defaults;function escapeSelector (str) {  return str.replace(/(:|\.)/g,'\\$1');}})(jQuery);
/*! * skrollr core * * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr * * Free to use under terms of MIT license */(function(window, document, undefined) {	'use strict';	/*	 * Global api.	 */	var skrollr = window.skrollr = {		get: function() {			return _instance;		},		//Main entry point.		init: function(options) {			return _instance || new Skrollr(options);		},		VERSION: '0.6.21'	};	//Minify optimization.	var hasProp = Object.prototype.hasOwnProperty;	var Math = window.Math;	var getStyle = window.getComputedStyle;	//They will be filled when skrollr gets initialized.	var documentElement;	var body;	var EVENT_TOUCHSTART = 'touchstart';	var EVENT_TOUCHMOVE = 'touchmove';	var EVENT_TOUCHCANCEL = 'touchcancel';	var EVENT_TOUCHEND = 'touchend';	var SKROLLABLE_CLASS = 'skrollable';	var SKROLLABLE_BEFORE_CLASS = SKROLLABLE_CLASS + '-before';	var SKROLLABLE_BETWEEN_CLASS = SKROLLABLE_CLASS + '-between';	var SKROLLABLE_AFTER_CLASS = SKROLLABLE_CLASS + '-after';	var SKROLLR_CLASS = 'skrollr';	var NO_SKROLLR_CLASS = 'no-' + SKROLLR_CLASS;	var SKROLLR_DESKTOP_CLASS = SKROLLR_CLASS + '-desktop';	var SKROLLR_MOBILE_CLASS = SKROLLR_CLASS + '-mobile';	var DEFAULT_EASING = 'linear';	var DEFAULT_DURATION = 1000;//ms	var DEFAULT_MOBILE_DECELERATION = 0.004;//pixel/ms²	var DEFAULT_SMOOTH_SCROLLING_DURATION = 200;//ms	var ANCHOR_START = 'start';	var ANCHOR_END = 'end';	var ANCHOR_CENTER = 'center';	var ANCHOR_BOTTOM = 'bottom';	//The property which will be added to the DOM element to hold the ID of the skrollable.	var SKROLLABLE_ID_DOM_PROPERTY = '___skrollable_id';	var rxTouchIgnoreTags = /^(?:input|textarea|button|select)$/i;	var rxTrim = /^\s+|\s+$/g;	//Find all data-attributes. data-[_constant]-[offset]-[anchor]-[anchor].	var rxKeyframeAttribute = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;	var rxPropValue = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;	//Easing function names follow the property in square brackets.	var rxPropEasing = /^([a-z\-]+)\[(\w+)\]$/;	var rxCamelCase = /-([a-z])/g;	var rxCamelCaseFn = function(str, letter) {		return letter.toUpperCase();	};	//Numeric values with optional sign.	var rxNumericValue = /[\-+]?[\d]*\.?[\d]+/g;	//Used to replace occurences of {?} with a number.	var rxInterpolateString = /\{\?\}/g;	//Finds rgb(a) colors, which don't use the percentage notation.	var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;	//Finds all gradients.	var rxGradient = /[a-z\-]+-gradient/g;	//Vendor prefix. Will be set once skrollr gets initialized.	var theCSSPrefix = '';	var theDashedCSSPrefix = '';	//Will be called once (when skrollr gets initialized).	var detectCSSPrefix = function() {		//Only relevant prefixes. May be extended.		//Could be dangerous if there will ever be a CSS property which actually starts with "ms". Don't hope so.		var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;		//Detect prefix for current browser by finding the first property using a prefix.		if(!getStyle) {			return;		}		var style = getStyle(body, null);		for(var k in style) {			//We check the key and if the key is a number, we check the value as well, because safari's getComputedStyle returns some weird array-like thingy.			theCSSPrefix = (k.match(rxPrefixes) || (+k == k && style[k].match(rxPrefixes)));			if(theCSSPrefix) {				break;			}		}		//Did we even detect a prefix?		if(!theCSSPrefix) {			theCSSPrefix = theDashedCSSPrefix = '';			return;		}		theCSSPrefix = theCSSPrefix[0];		//We could have detected either a dashed prefix or this camelCaseish-inconsistent stuff.		if(theCSSPrefix.slice(0,1) === '-') {			theDashedCSSPrefix = theCSSPrefix;			//There's no logic behind these. Need a look up.			theCSSPrefix = ({				'-webkit-': 'webkit',				'-moz-': 'Moz',				'-ms-': 'ms',				'-o-': 'O'			})[theCSSPrefix];		} else {			theDashedCSSPrefix = '-' + theCSSPrefix.toLowerCase() + '-';		}	};	var polyfillRAF = function() {		var requestAnimFrame = window.requestAnimationFrame || window[theCSSPrefix.toLowerCase() + 'RequestAnimationFrame'];		var lastTime = _now();		if(_isMobile || !requestAnimFrame) {			requestAnimFrame = function(callback) {				//How long did it take to render?				var deltaTime = _now() - lastTime;				var delay = Math.max(0, 1000 / 60 - deltaTime);				return window.setTimeout(function() {					lastTime = _now();					callback();				}, delay);			};		}		return requestAnimFrame;	};	var polyfillCAF = function() {		var cancelAnimFrame = window.cancelAnimationFrame || window[theCSSPrefix.toLowerCase() + 'CancelAnimationFrame'];		if(_isMobile || !cancelAnimFrame) {			cancelAnimFrame = function(timeout) {				return window.clearTimeout(timeout);			};		}		return cancelAnimFrame;	};	//Built-in easing functions.	var easings = {		begin: function() {			return 0;		},		end: function() {			return 1;		},		linear: function(p) {			return p;		},		quadratic: function(p) {			return p * p;		},		cubic: function(p) {			return p * p * p;		},		swing: function(p) {			return (-Math.cos(p * Math.PI) / 2) + 0.5;		},		sqrt: function(p) {			return Math.sqrt(p);		},		outCubic: function(p) {			return (Math.pow((p - 1), 3) + 1);		},		//see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this		bounce: function(p) {			var a;			if(p <= 0.5083) {				a = 3;			} else if(p <= 0.8489) {				a = 9;			} else if(p <= 0.96208) {				a = 27;			} else if(p <= 0.99981) {				a = 91;			} else {				return 1;			}			return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a);		}	};	/**	 * Constructor.	 */	function Skrollr(options) {		documentElement = document.documentElement;		body = document.body;		detectCSSPrefix();		_instance = this;		options = options || {};		_constants = options.constants || {};		//We allow defining custom easings or overwrite existing.		if(options.easing) {			for(var e in options.easing) {				easings[e] = options.easing[e];			}		}		_edgeStrategy = options.edgeStrategy || 'set';		_listeners = {			//Function to be called right before rendering.			beforerender: options.beforerender,			//Function to be called right after finishing rendering.			render: options.render		};		//forceHeight is true by default		_forceHeight = options.forceHeight !== false;		if(_forceHeight) {			_scale = options.scale || 1;		}		_mobileDeceleration = options.mobileDeceleration || DEFAULT_MOBILE_DECELERATION;		_smoothScrollingEnabled = options.smoothScrolling !== false;		_smoothScrollingDuration = options.smoothScrollingDuration || DEFAULT_SMOOTH_SCROLLING_DURATION;		//Dummy object. Will be overwritten in the _render method when smooth scrolling is calculated.		_smoothScrolling = {			targetTop: _instance.getScrollTop()		};		//A custom check function may be passed.		_isMobile = ((options.mobileCheck || function() {			return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);		})());		if(_isMobile) {			_skrollrBody = document.getElementById('skrollr-body');			//Detect 3d transform if there's a skrollr-body (only needed for #skrollr-body).			if(_skrollrBody) {				_detect3DTransforms();			}			_initMobile();			_updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_MOBILE_CLASS], [NO_SKROLLR_CLASS]);		} else {			_updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS], [NO_SKROLLR_CLASS]);		}		//Triggers parsing of elements and a first reflow.		_instance.refresh();		_addEvent(window, 'resize orientationchange', function() {			var width = documentElement.clientWidth;			var height = documentElement.clientHeight;			//Only reflow if the size actually changed (#271).			if(height !== _lastViewportHeight || width !== _lastViewportWidth) {				_lastViewportHeight = height;				_lastViewportWidth = width;				_requestReflow = true;			}		});		var requestAnimFrame = polyfillRAF();		//Let's go.		(function animloop(){			_render();			_animFrame = requestAnimFrame(animloop);		}());		return _instance;	}	/**	 * (Re)parses some or all elements.	 */	Skrollr.prototype.refresh = function(elements) {		var elementIndex;		var elementsLength;		var ignoreID = false;		//Completely reparse anything without argument.		if(elements === undefined) {			//Ignore that some elements may already have a skrollable ID.			ignoreID = true;			_skrollables = [];			_skrollableIdCounter = 0;			elements = document.getElementsByTagName('*');		} else {			//We accept a single element or an array of elements.			elements = [].concat(elements);		}		elementIndex = 0;		elementsLength = elements.length;		for(; elementIndex < elementsLength; elementIndex++) {			var el = elements[elementIndex];			var anchorTarget = el;			var keyFrames = [];			//If this particular element should be smooth scrolled.			var smoothScrollThis = _smoothScrollingEnabled;			//The edge strategy for this particular element.			var edgeStrategy = _edgeStrategy;			if(!el.attributes) {				continue;			}			//Iterate over all attributes and search for key frame attributes.			var attributeIndex = 0;			var attributesLength = el.attributes.length;			for (; attributeIndex < attributesLength; attributeIndex++) {				var attr = el.attributes[attributeIndex];				if(attr.name === 'data-anchor-target') {					anchorTarget = document.querySelector(attr.value);					if(anchorTarget === null) {						throw 'Unable to find anchor target "' + attr.value + '"';					}					continue;				}				//Global smooth scrolling can be overridden by the element attribute.				if(attr.name === 'data-smooth-scrolling') {					smoothScrollThis = attr.value !== 'off';					continue;				}				//Global edge strategy can be overridden by the element attribute.				if(attr.name === 'data-edge-strategy') {					edgeStrategy = attr.value;					continue;				}				var match = attr.name.match(rxKeyframeAttribute);				if(match === null) {					continue;				}				var kf = {					props: attr.value,					//Point back to the element as well.					element: el				};				keyFrames.push(kf);				var constant = match[1];				if(constant) {					//Strip the underscore prefix.					kf.constant = constant.substr(1);				}				//Get the key frame offset.				var offset = match[2];				//Is it a percentage offset?				if(/p$/.test(offset)) {					kf.isPercentage = true;					kf.offset = (offset.slice(0, -1) | 0) / 100;				} else {					kf.offset = (offset | 0);				}				var anchor1 = match[3];				//If second anchor is not set, the first will be taken for both.				var anchor2 = match[4] || anchor1;				//"absolute" (or "classic") mode, where numbers mean absolute scroll offset.				if(!anchor1 || anchor1 === ANCHOR_START || anchor1 === ANCHOR_END) {					kf.mode = 'absolute';					//data-end needs to be calculated after all key frames are known.					if(anchor1 === ANCHOR_END) {						kf.isEnd = true;					} else if(!kf.isPercentage) {						//For data-start we can already set the key frame w/o calculations.						//#59: "scale" options should only affect absolute mode.						kf.offset = kf.offset * _scale;					}				}				//"relative" mode, where numbers are relative to anchors.				else {					kf.mode = 'relative';					kf.anchors = [anchor1, anchor2];				}			}			//Does this element have key frames?			if(!keyFrames.length) {				continue;			}			//Will hold the original style and class attributes before we controlled the element (see #80).			var styleAttr, classAttr;			var id;			if(!ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {				//We already have this element under control. Grab the corresponding skrollable id.				id = el[SKROLLABLE_ID_DOM_PROPERTY];				styleAttr = _skrollables[id].styleAttr;				classAttr = _skrollables[id].classAttr;			} else {				//It's an unknown element. Asign it a new skrollable id.				id = (el[SKROLLABLE_ID_DOM_PROPERTY] = _skrollableIdCounter++);				styleAttr = el.style.cssText;				classAttr = _getClass(el);			}			_skrollables[id] = {				element: el,				styleAttr: styleAttr,				classAttr: classAttr,				anchorTarget: anchorTarget,				keyFrames: keyFrames,				smoothScrolling: smoothScrollThis,				edgeStrategy: edgeStrategy			};			_updateClass(el, [SKROLLABLE_CLASS], []);		}		//Reflow for the first time.		_reflow();		//Now that we got all key frame numbers right, actually parse the properties.		elementIndex = 0;		elementsLength = elements.length;		for(; elementIndex < elementsLength; elementIndex++) {			var sk = _skrollables[elements[elementIndex][SKROLLABLE_ID_DOM_PROPERTY]];			if(sk === undefined) {				continue;			}			//Parse the property string to objects			_parseProps(sk);			//Fill key frames with missing properties from left and right			_fillProps(sk);		}		return _instance;	};	/**	 * Transform "relative" mode to "absolute" mode.	 * That is, calculate anchor position and offset of element.	 */	Skrollr.prototype.relativeToAbsolute = function(element, viewportAnchor, elementAnchor) {		var viewportHeight = documentElement.clientHeight;		var box = element.getBoundingClientRect();		var absolute = box.top;		//#100: IE doesn't supply "height" with getBoundingClientRect.		var boxHeight = box.bottom - box.top;		if(viewportAnchor === ANCHOR_BOTTOM) {			absolute -= viewportHeight;		} else if(viewportAnchor === ANCHOR_CENTER) {			absolute -= viewportHeight / 2;		}		if(elementAnchor === ANCHOR_BOTTOM) {			absolute += boxHeight;		} else if(elementAnchor === ANCHOR_CENTER) {			absolute += boxHeight / 2;		}		//Compensate scrolling since getBoundingClientRect is relative to viewport.		absolute += _instance.getScrollTop();		return (absolute + 0.5) | 0;	};	/**	 * Animates scroll top to new position.	 */	Skrollr.prototype.animateTo = function(top, options) {		options = options || {};		var now = _now();		var scrollTop = _instance.getScrollTop();		//Setting this to a new value will automatically cause the current animation to stop, if any.		_scrollAnimation = {			startTop: scrollTop,			topDiff: top - scrollTop,			targetTop: top,			duration: options.duration || DEFAULT_DURATION,			startTime: now,			endTime: now + (options.duration || DEFAULT_DURATION),			easing: easings[options.easing || DEFAULT_EASING],			done: options.done		};		//Don't queue the animation if there's nothing to animate.		if(!_scrollAnimation.topDiff) {			if(_scrollAnimation.done) {				_scrollAnimation.done.call(_instance, false);			}			_scrollAnimation = undefined;		}		return _instance;	};	/**	 * Stops animateTo animation.	 */	Skrollr.prototype.stopAnimateTo = function() {		if(_scrollAnimation && _scrollAnimation.done) {			_scrollAnimation.done.call(_instance, true);		}		_scrollAnimation = undefined;	};	/**	 * Returns if an animation caused by animateTo is currently running.	 */	Skrollr.prototype.isAnimatingTo = function() {		return !!_scrollAnimation;	};	Skrollr.prototype.setScrollTop = function(top, force) {		_forceRender = (force === true);		if(_isMobile) {			_mobileOffset = Math.min(Math.max(top, 0), _maxKeyFrame);		} else {			window.scrollTo(0, top);		}		return _instance;	};	Skrollr.prototype.getScrollTop = function() {		if(_isMobile) {			return _mobileOffset;		} else {			return window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0;		}	};	Skrollr.prototype.getMaxScrollTop = function() {		return _maxKeyFrame;	};	Skrollr.prototype.on = function(name, fn) {		_listeners[name] = fn;		return _instance;	};	Skrollr.prototype.off = function(name) {		delete _listeners[name];		return _instance;	};	Skrollr.prototype.destroy = function() {		var cancelAnimFrame = polyfillCAF();		cancelAnimFrame(_animFrame);		_removeAllEvents();		_updateClass(documentElement, [NO_SKROLLR_CLASS], [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS, SKROLLR_MOBILE_CLASS]);		var skrollableIndex = 0;		var skrollablesLength = _skrollables.length;		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {			_reset(_skrollables[skrollableIndex].element);		}		documentElement.style.overflow = body.style.overflow = 'auto';		documentElement.style.height = body.style.height = 'auto';		if(_skrollrBody) {			skrollr.setStyle(_skrollrBody, 'transform', 'none');		}		_instance = undefined;		_skrollrBody = undefined;		_listeners = undefined;		_forceHeight = undefined;		_maxKeyFrame = 0;		_scale = 1;		_constants = undefined;		_mobileDeceleration = undefined;		_direction = 'down';		_lastTop = -1;		_lastViewportWidth = 0;		_lastViewportHeight = 0;		_requestReflow = false;		_scrollAnimation = undefined;		_smoothScrollingEnabled = undefined;		_smoothScrollingDuration = undefined;		_smoothScrolling = undefined;		_forceRender = undefined;		_skrollableIdCounter = 0;		_edgeStrategy = undefined;		_isMobile = false;		_mobileOffset = 0;		_translateZ = undefined;	};	/*		Private methods.	*/	var _initMobile = function() {		var initialElement;		var initialTouchY;		var initialTouchX;		var currentElement;		var currentTouchY;		var currentTouchX;		var lastTouchY;		var deltaY;		var initialTouchTime;		var currentTouchTime;		var lastTouchTime;		var deltaTime;		_addEvent(documentElement, [EVENT_TOUCHSTART, EVENT_TOUCHMOVE, EVENT_TOUCHCANCEL, EVENT_TOUCHEND].join(' '), function(e) {			var touch = e.changedTouches[0];			currentElement = e.target;			//We don't want text nodes.			while(currentElement.nodeType === 3) {				currentElement = currentElement.parentNode;			}			currentTouchY = touch.clientY;			currentTouchX = touch.clientX;			currentTouchTime = e.timeStamp;			if(!rxTouchIgnoreTags.test(currentElement.tagName)) {				e.preventDefault();			}			switch(e.type) {				case EVENT_TOUCHSTART:					//The last element we tapped on.					if(initialElement) {						initialElement.blur();					}					_instance.stopAnimateTo();					initialElement = currentElement;					initialTouchY = lastTouchY = currentTouchY;					initialTouchX = currentTouchX;					initialTouchTime = currentTouchTime;					break;				case EVENT_TOUCHMOVE:					//Prevent default event on touchIgnore elements in case they don't have focus yet.					if(rxTouchIgnoreTags.test(currentElement.tagName) && document.activeElement !== currentElement) {						e.preventDefault();					}					deltaY = currentTouchY - lastTouchY;					deltaTime = currentTouchTime - lastTouchTime;					_instance.setScrollTop(_mobileOffset - deltaY, true);					lastTouchY = currentTouchY;					lastTouchTime = currentTouchTime;					break;				default:				case EVENT_TOUCHCANCEL:				case EVENT_TOUCHEND:					var distanceY = initialTouchY - currentTouchY;					var distanceX = initialTouchX - currentTouchX;					var distance2 = distanceX * distanceX + distanceY * distanceY;					//Check if it was more like a tap (moved less than 7px).					if(distance2 < 49) {						if(!rxTouchIgnoreTags.test(initialElement.tagName)) {							initialElement.focus();							//It was a tap, click the element.							var clickEvent = document.createEvent('MouseEvents');							clickEvent.initMouseEvent('click', true, true, e.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);							initialElement.dispatchEvent(clickEvent);						}						return;					}					initialElement = undefined;					var speed = deltaY / deltaTime;					//Cap speed at 3 pixel/ms.					speed = Math.max(Math.min(speed, 3), -3);					var duration = Math.abs(speed / _mobileDeceleration);					var targetOffset = speed * duration + 0.5 * _mobileDeceleration * duration * duration;					var targetTop = _instance.getScrollTop() - targetOffset;					//Relative duration change for when scrolling above bounds.					var targetRatio = 0;					//Change duration proportionally when scrolling would leave bounds.					if(targetTop > _maxKeyFrame) {						targetRatio = (_maxKeyFrame - targetTop) / targetOffset;						targetTop = _maxKeyFrame;					} else if(targetTop < 0) {						targetRatio = -targetTop / targetOffset;						targetTop = 0;					}					duration = duration * (1 - targetRatio);					_instance.animateTo((targetTop + 0.5) | 0, {easing: 'outCubic', duration: duration});					break;			}		});		//Just in case there has already been some native scrolling, reset it.		window.scrollTo(0, 0);		documentElement.style.overflow = body.style.overflow = 'hidden';	};	/**	 * Updates key frames which depend on others / need to be updated on resize.	 * That is "end" in "absolute" mode and all key frames in "relative" mode.	 * Also handles constants, because they may change on resize.	 */	var _updateDependentKeyFrames = function() {		var viewportHeight = documentElement.clientHeight;		var processedConstants = _processConstants();		var skrollable;		var element;		var anchorTarget;		var keyFrames;		var keyFrameIndex;		var keyFramesLength;		var kf;		var skrollableIndex;		var skrollablesLength;		var offset;		var constantValue;		//First process all relative-mode elements and find the max key frame.		skrollableIndex = 0;		skrollablesLength = _skrollables.length;		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {			skrollable = _skrollables[skrollableIndex];			element = skrollable.element;			anchorTarget = skrollable.anchorTarget;			keyFrames = skrollable.keyFrames;			keyFrameIndex = 0;			keyFramesLength = keyFrames.length;			for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {				kf = keyFrames[keyFrameIndex];				offset = kf.offset;				constantValue = processedConstants[kf.constant] || 0;				kf.frame = offset;				if(kf.isPercentage) {					//Convert the offset to percentage of the viewport height.					offset = offset * viewportHeight;					//Absolute + percentage mode.					kf.frame = offset;				}				if(kf.mode === 'relative') {					_reset(element);					kf.frame = _instance.relativeToAbsolute(anchorTarget, kf.anchors[0], kf.anchors[1]) - offset;					_reset(element, true);				}				kf.frame += constantValue;				//Only search for max key frame when forceHeight is enabled.				if(_forceHeight) {					//Find the max key frame, but don't use one of the data-end ones for comparison.					if(!kf.isEnd && kf.frame > _maxKeyFrame) {						_maxKeyFrame = kf.frame;					}				}			}		}		//#133: The document can be larger than the maxKeyFrame we found.		_maxKeyFrame = Math.max(_maxKeyFrame, _getDocumentHeight());		//Now process all data-end keyframes.		skrollableIndex = 0;		skrollablesLength = _skrollables.length;		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {			skrollable = _skrollables[skrollableIndex];			keyFrames = skrollable.keyFrames;			keyFrameIndex = 0;			keyFramesLength = keyFrames.length;			for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {				kf = keyFrames[keyFrameIndex];				constantValue = processedConstants[kf.constant] || 0;				if(kf.isEnd) {					kf.frame = _maxKeyFrame - kf.offset + constantValue;				}			}			skrollable.keyFrames.sort(_keyFrameComparator);		}	};	/**	 * Calculates and sets the style properties for the element at the given frame.	 * @param fakeFrame The frame to render at when smooth scrolling is enabled.	 * @param actualFrame The actual frame we are at.	 */	var _calcSteps = function(fakeFrame, actualFrame) {		//Iterate over all skrollables.		var skrollableIndex = 0;		var skrollablesLength = _skrollables.length;		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {			var skrollable = _skrollables[skrollableIndex];			var element = skrollable.element;			var frame = skrollable.smoothScrolling ? fakeFrame : actualFrame;			var frames = skrollable.keyFrames;			var firstFrame = frames[0].frame;			var lastFrame = frames[frames.length - 1].frame;			var beforeFirst = frame < firstFrame;			var afterLast = frame > lastFrame;			var firstOrLastFrame = frames[beforeFirst ? 0 : frames.length - 1];			var key;			var value;			//If we are before/after the first/last frame, set the styles according to the given edge strategy.			if(beforeFirst || afterLast) {				//Check if we already handled this edge case last time.				//Note: using setScrollTop it's possible that we jumped from one edge to the other.				if(beforeFirst && skrollable.edge === -1 || afterLast && skrollable.edge === 1) {					continue;				}				//Add the skrollr-before or -after class.				_updateClass(element, [beforeFirst ? SKROLLABLE_BEFORE_CLASS : SKROLLABLE_AFTER_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_BETWEEN_CLASS, SKROLLABLE_AFTER_CLASS]);				//Remember that we handled the edge case (before/after the first/last keyframe).				skrollable.edge = beforeFirst ? -1 : 1;				switch(skrollable.edgeStrategy) {					case 'reset':						_reset(element);						continue;					case 'ease':						//Handle this case like it would be exactly at first/last keyframe and just pass it on.						frame = firstOrLastFrame.frame;						break;					default:					case 'set':						var props = firstOrLastFrame.props;						for(key in props) {							if(hasProp.call(props, key)) {								value = _interpolateString(props[key].value);								skrollr.setStyle(element, key, value);							}						}						continue;				}			} else {				//Did we handle an edge last time?				if(skrollable.edge !== 0) {					_updateClass(element, [SKROLLABLE_CLASS, SKROLLABLE_BETWEEN_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_AFTER_CLASS]);					skrollable.edge = 0;				}			}			//Find out between which two key frames we are right now.			var keyFrameIndex = 0;			var framesLength = frames.length - 1;			for(; keyFrameIndex < framesLength; keyFrameIndex++) {				if(frame >= frames[keyFrameIndex].frame && frame <= frames[keyFrameIndex + 1].frame) {					var left = frames[keyFrameIndex];					var right = frames[keyFrameIndex + 1];					for(key in left.props) {						if(hasProp.call(left.props, key)) {							var progress = (frame - left.frame) / (right.frame - left.frame);							//Transform the current progress using the given easing function.							progress = left.props[key].easing(progress);							//Interpolate between the two values							value = _calcInterpolation(left.props[key].value, right.props[key].value, progress);							value = _interpolateString(value);							skrollr.setStyle(element, key, value);						}					}					break;				}			}		}	};	/**	 * Renders all elements.	 */	var _render = function() {		if(_requestReflow) {			_requestReflow = false;			_reflow();		}		//We may render something else than the actual scrollbar position.		var renderTop = _instance.getScrollTop();		//If there's an animation, which ends in current render call, call the callback after rendering.		var afterAnimationCallback;		var now = _now();		var progress;		//Before actually rendering handle the scroll animation, if any.		if(_scrollAnimation) {			//It's over			if(now >= _scrollAnimation.endTime) {				renderTop = _scrollAnimation.targetTop;				afterAnimationCallback = _scrollAnimation.done;				_scrollAnimation = undefined;			} else {				//Map the current progress to the new progress using given easing function.				progress = _scrollAnimation.easing((now - _scrollAnimation.startTime) / _scrollAnimation.duration);				renderTop = (_scrollAnimation.startTop + progress * _scrollAnimation.topDiff) | 0;			}			_instance.setScrollTop(renderTop, true);		}		//Smooth scrolling only if there's no animation running and if we're not forcing the rendering.		else if(!_forceRender) {			var smoothScrollingDiff = _smoothScrolling.targetTop - renderTop;			//The user scrolled, start new smooth scrolling.			if(smoothScrollingDiff) {				_smoothScrolling = {					startTop: _lastTop,					topDiff: renderTop - _lastTop,					targetTop: renderTop,					startTime: _lastRenderCall,					endTime: _lastRenderCall + _smoothScrollingDuration				};			}			//Interpolate the internal scroll position (not the actual scrollbar).			if(now <= _smoothScrolling.endTime) {				//Map the current progress to the new progress using easing function.				progress = easings.sqrt((now - _smoothScrolling.startTime) / _smoothScrollingDuration);				renderTop = (_smoothScrolling.startTop + progress * _smoothScrolling.topDiff) | 0;			}		}		//That's were we actually "scroll" on mobile.		if(_isMobile && _skrollrBody) {			//Set the transform ("scroll it").			skrollr.setStyle(_skrollrBody, 'transform', 'translate(0, ' + -(_mobileOffset) + 'px) ' + _translateZ);		}		//Did the scroll position even change?		if(_forceRender || _lastTop !== renderTop) {			//Remember in which direction are we scrolling?			_direction = (renderTop > _lastTop) ? 'down' : (renderTop < _lastTop ? 'up' : _direction);			_forceRender = false;			var listenerParams = {				curTop: renderTop,				lastTop: _lastTop,				maxTop: _maxKeyFrame,				direction: _direction			};			//Tell the listener we are about to render.			var continueRendering = _listeners.beforerender && _listeners.beforerender.call(_instance, listenerParams);			//The beforerender listener function is able the cancel rendering.			if(continueRendering !== false) {				//Now actually interpolate all the styles.				_calcSteps(renderTop, _instance.getScrollTop());				//Remember when we last rendered.				_lastTop = renderTop;				if(_listeners.render) {					_listeners.render.call(_instance, listenerParams);				}			}			if(afterAnimationCallback) {				afterAnimationCallback.call(_instance, false);			}		}		_lastRenderCall = now;	};	/**	 * Parses the properties for each key frame of the given skrollable.	 */	var _parseProps = function(skrollable) {		//Iterate over all key frames		var keyFrameIndex = 0;		var keyFramesLength = skrollable.keyFrames.length;		for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {			var frame = skrollable.keyFrames[keyFrameIndex];			var easing;			var value;			var prop;			var props = {};			var match;			while((match = rxPropValue.exec(frame.props)) !== null) {				prop = match[1];				value = match[2];				easing = prop.match(rxPropEasing);				//Is there an easing specified for this prop?				if(easing !== null) {					prop = easing[1];					easing = easing[2];				} else {					easing = DEFAULT_EASING;				}				//Exclamation point at first position forces the value to be taken literal.				value = value.indexOf('!') ? _parseProp(value) : [value.slice(1)];				//Save the prop for this key frame with his value and easing function				props[prop] = {					value: value,					easing: easings[easing]				};			}			frame.props = props;		}	};	/**	 * Parses a value extracting numeric values and generating a format string	 * for later interpolation of the new values in old string.	 *	 * @param val The CSS value to be parsed.	 * @return Something like ["rgba(?%,?%, ?%,?)", 100, 50, 0, .7]	 * where the first element is the format string later used	 * and all following elements are the numeric value.	 */	var _parseProp = function(val) {		var numbers = [];		//One special case, where floats don't work.		//We replace all occurences of rgba colors		//which don't use percentage notation with the percentage notation.		rxRGBAIntegerColor.lastIndex = 0;		val = val.replace(rxRGBAIntegerColor, function(rgba) {			return rgba.replace(rxNumericValue, function(n) {				return n / 255 * 100 + '%';			});		});		//Handle prefixing of "gradient" values.		//For now only the prefixed value will be set. Unprefixed isn't supported anyway.		if(theDashedCSSPrefix) {			rxGradient.lastIndex = 0;			val = val.replace(rxGradient, function(s) {				return theDashedCSSPrefix + s;			});		}		//Now parse ANY number inside this string and create a format string.		val = val.replace(rxNumericValue, function(n) {			numbers.push(+n);			return '{?}';		});		//Add the formatstring as first value.		numbers.unshift(val);		return numbers;	};	/**	 * Fills the key frames with missing left and right hand properties.	 * If key frame 1 has property X and key frame 2 is missing X,	 * but key frame 3 has X again, then we need to assign X to key frame 2 too.	 *	 * @param sk A skrollable.	 */	var _fillProps = function(sk) {		//Will collect the properties key frame by key frame		var propList = {};		var keyFrameIndex;		var keyFramesLength;		//Iterate over all key frames from left to right		keyFrameIndex = 0;		keyFramesLength = sk.keyFrames.length;		for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {			_fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);		}		//Now do the same from right to fill the last gaps		propList = {};		//Iterate over all key frames from right to left		keyFrameIndex = sk.keyFrames.length - 1;		for(; keyFrameIndex >= 0; keyFrameIndex--) {			_fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);		}	};	var _fillPropForFrame = function(frame, propList) {		var key;		//For each key frame iterate over all right hand properties and assign them,		//but only if the current key frame doesn't have the property by itself		for(key in propList) {			//The current frame misses this property, so assign it.			if(!hasProp.call(frame.props, key)) {				frame.props[key] = propList[key];			}		}		//Iterate over all props of the current frame and collect them		for(key in frame.props) {			propList[key] = frame.props[key];		}	};	/**	 * Calculates the new values for two given values array.	 */	var _calcInterpolation = function(val1, val2, progress) {		var valueIndex;		var val1Length = val1.length;		//They both need to have the same length		if(val1Length !== val2.length) {			throw 'Can\'t interpolate between "' + val1[0] + '" and "' + val2[0] + '"';		}		//Add the format string as first element.		var interpolated = [val1[0]];		valueIndex = 1;		for(; valueIndex < val1Length; valueIndex++) {			//That's the line where the two numbers are actually interpolated.			interpolated[valueIndex] = val1[valueIndex] + ((val2[valueIndex] - val1[valueIndex]) * progress);		}		return interpolated;	};	/**	 * Interpolates the numeric values into the format string.	 */	var _interpolateString = function(val) {		var valueIndex = 1;		rxInterpolateString.lastIndex = 0;		return val[0].replace(rxInterpolateString, function() {			return val[valueIndex++];		});	};	/**	 * Resets the class and style attribute to what it was before skrollr manipulated the element.	 * Also remembers the values it had before reseting, in order to undo the reset.	 */	var _reset = function(elements, undo) {		//We accept a single element or an array of elements.		elements = [].concat(elements);		var skrollable;		var element;		var elementsIndex = 0;		var elementsLength = elements.length;		for(; elementsIndex < elementsLength; elementsIndex++) {			element = elements[elementsIndex];			skrollable = _skrollables[element[SKROLLABLE_ID_DOM_PROPERTY]];			//Couldn't find the skrollable for this DOM element.			if(!skrollable) {				continue;			}			if(undo) {				//Reset class and style to the "dirty" (set by skrollr) values.				element.style.cssText = skrollable.dirtyStyleAttr;				_updateClass(element, skrollable.dirtyClassAttr);			} else {				//Remember the "dirty" (set by skrollr) class and style.				skrollable.dirtyStyleAttr = element.style.cssText;				skrollable.dirtyClassAttr = _getClass(element);				//Reset class and style to what it originally was.				element.style.cssText = skrollable.styleAttr;				_updateClass(element, skrollable.classAttr);			}		}	};	/**	 * Detects support for 3d transforms by applying it to the skrollr-body.	 */	var _detect3DTransforms = function() {		_translateZ = 'translateZ(0)';		skrollr.setStyle(_skrollrBody, 'transform', _translateZ);		var computedStyle = getStyle(_skrollrBody);		var computedTransform = computedStyle.getPropertyValue('transform');		var computedTransformWithPrefix = computedStyle.getPropertyValue(theDashedCSSPrefix + 'transform');		var has3D = (computedTransform && computedTransform !== 'none') || (computedTransformWithPrefix && computedTransformWithPrefix !== 'none');		if(!has3D) {			_translateZ = '';		}	};	/**	 * Set the CSS property on the given element. Sets prefixed properties as well.	 */	skrollr.setStyle = function(el, prop, val) {		var style = el.style;		//Camel case.		prop = prop.replace(rxCamelCase, rxCamelCaseFn).replace('-', '');		//Make sure z-index gets a <integer>.		//This is the only <integer> case we need to handle.		if(prop === 'zIndex') {			if(isNaN(val)) {				//If it's not a number, don't touch it.				//It could for example be "auto" (#351).				style[prop] = val;			} else {				//Floor the number.				style[prop] = '' + (val | 0);			}		}		//#64: "float" can't be set across browsers. Needs to use "cssFloat" for all except IE.		else if(prop === 'float') {			style.styleFloat = style.cssFloat = val;		}		else {			//Need try-catch for old IE.			try {				//Set prefixed property if there's a prefix.				if(theCSSPrefix) {					style[theCSSPrefix + prop.slice(0,1).toUpperCase() + prop.slice(1)] = val;				}				//Set unprefixed.				style[prop] = val;			} catch(ignore) {}		}	};	/**	 * Cross browser event handling.	 */	var _addEvent = skrollr.addEvent = function(element, names, callback) {		var intermediate = function(e) {			//Normalize IE event stuff.			e = e || window.event;			if(!e.target) {				e.target = e.srcElement;			}			if(!e.preventDefault) {				e.preventDefault = function() {					e.returnValue = false;				};			}			return callback.call(this, e);		};		names = names.split(' ');		var name;		var nameCounter = 0;		var namesLength = names.length;		for(; nameCounter < namesLength; nameCounter++) {			name = names[nameCounter];			if(element.addEventListener) {				element.addEventListener(name, callback, false);			} else {				element.attachEvent('on' + name, intermediate);			}			//Remember the events to be able to flush them later.			_registeredEvents.push({				element: element,				name: name,				listener: callback			});		}	};	var _removeEvent = skrollr.removeEvent = function(element, names, callback) {		names = names.split(' ');		var nameCounter = 0;		var namesLength = names.length;		for(; nameCounter < namesLength; nameCounter++) {			if(element.removeEventListener) {				element.removeEventListener(names[nameCounter], callback, false);			} else {				element.detachEvent('on' + names[nameCounter], callback);			}		}	};	var _removeAllEvents = function() {		var eventData;		var eventCounter = 0;		var eventsLength = _registeredEvents.length;		for(; eventCounter < eventsLength; eventCounter++) {			eventData = _registeredEvents[eventCounter];			_removeEvent(eventData.element, eventData.name, eventData.listener);		}		_registeredEvents = [];	};	var _reflow = function() {		var pos = _instance.getScrollTop();		//Will be recalculated by _updateDependentKeyFrames.		_maxKeyFrame = 0;		if(_forceHeight && !_isMobile) {			//un-"force" the height to not mess with the calculations in _updateDependentKeyFrames (#216).			body.style.height = 'auto';		}		_updateDependentKeyFrames();		if(_forceHeight && !_isMobile) {			//"force" the height.			body.style.height = (_maxKeyFrame + documentElement.clientHeight) + 'px';		}		//The scroll offset may now be larger than needed (on desktop the browser/os prevents scrolling farther than the bottom).		if(_isMobile) {			_instance.setScrollTop(Math.min(_instance.getScrollTop(), _maxKeyFrame));		} else {			//Remember and reset the scroll pos (#217).			_instance.setScrollTop(pos, true);		}		_forceRender = true;	};	/*	 * Returns a copy of the constants object where all functions and strings have been evaluated.	 */	var _processConstants = function() {		var viewportHeight = documentElement.clientHeight;		var copy = {};		var prop;		var value;		for(prop in _constants) {			value = _constants[prop];			if(typeof value === 'function') {				value = value.call(_instance);			}			//Percentage offset.			else if((/p$/).test(value)) {				value = (value.slice(0, -1) / 100) * viewportHeight;			}			copy[prop] = value;		}		return copy;	};	/*	 * Returns the height of the document.	 */	var _getDocumentHeight = function() {		var skrollrBodyHeight = (_skrollrBody && _skrollrBody.offsetHeight || 0);		var bodyHeight = Math.max(skrollrBodyHeight, body.scrollHeight, body.offsetHeight, documentElement.scrollHeight, documentElement.offsetHeight, documentElement.clientHeight);		return bodyHeight - documentElement.clientHeight;	};	/**	 * Returns a string of space separated classnames for the current element.	 * Works with SVG as well.	 */	var _getClass = function(element) {		var prop = 'className';		//SVG support by using className.baseVal instead of just className.		if(window.SVGElement && element instanceof window.SVGElement) {			element = element[prop];			prop = 'baseVal';		}		return element[prop];	};	/**	 * Adds and removes a CSS classes.	 * Works with SVG as well.	 * add and remove are arrays of strings,	 * or if remove is ommited add is a string and overwrites all classes.	 */	var _updateClass = function(element, add, remove) {		var prop = 'className';		//SVG support by using className.baseVal instead of just className.		if(window.SVGElement && element instanceof window.SVGElement) {			element = element[prop];			prop = 'baseVal';		}		//When remove is ommited, we want to overwrite/set the classes.		if(remove === undefined) {			element[prop] = add;			return;		}		//Cache current classes. We will work on a string before passing back to DOM.		var val = element[prop];		//All classes to be removed.		var classRemoveIndex = 0;		var removeLength = remove.length;		for(; classRemoveIndex < removeLength; classRemoveIndex++) {			val = _untrim(val).replace(_untrim(remove[classRemoveIndex]), ' ');		}		val = _trim(val);		//All classes to be added.		var classAddIndex = 0;		var addLength = add.length;		for(; classAddIndex < addLength; classAddIndex++) {			//Only add if el not already has class.			if(_untrim(val).indexOf(_untrim(add[classAddIndex])) === -1) {				val += ' ' + add[classAddIndex];			}		}		element[prop] = _trim(val);	};	var _trim = function(a) {		return a.replace(rxTrim, '');	};	/**	 * Adds a space before and after the string.	 */	var _untrim = function(a) {		return ' ' + a + ' ';	};	var _now = Date.now || function() {		return +new Date();	};	var _keyFrameComparator = function(a, b) {		return a.frame - b.frame;	};	/*	 * Private variables.	 */	//Singleton	var _instance;	/*		A list of all elements which should be animated associated with their the metadata.		Exmaple skrollable with two key frames animating from 100px width to 20px:		skrollable = {			element: <the DOM element>,			styleAttr: <style attribute of the element before skrollr>,			classAttr: <class attribute of the element before skrollr>,			keyFrames: [				{					frame: 100,					props: {						width: {							value: ['{?}px', 100],							easing: <reference to easing function>						}					},					mode: "absolute"				},				{					frame: 200,					props: {						width: {							value: ['{?}px', 20],							easing: <reference to easing function>						}					},					mode: "absolute"				}			]		};	*/	var _skrollables;	var _skrollrBody;	var _listeners;	var _forceHeight;	var _maxKeyFrame = 0;	var _scale = 1;	var _constants;	var _mobileDeceleration;	//Current direction (up/down).	var _direction = 'down';	//The last top offset value. Needed to determine direction.	var _lastTop = -1;	//The last time we called the render method (doesn't mean we rendered!).	var _lastRenderCall = _now();	//For detecting if it actually resized (#271).	var _lastViewportWidth = 0;	var _lastViewportHeight = 0;	var _requestReflow = false;	//Will contain data about a running scrollbar animation, if any.	var _scrollAnimation;	var _smoothScrollingEnabled;	var _smoothScrollingDuration;	//Will contain settins for smooth scrolling if enabled.	var _smoothScrolling;	//Can be set by any operation/event to force rendering even if the scrollbar didn't move.	var _forceRender;	//Each skrollable gets an unique ID incremented for each skrollable.	//The ID is the index in the _skrollables array.	var _skrollableIdCounter = 0;	var _edgeStrategy;	//Mobile specific vars. Will be stripped by UglifyJS when not in use.	var _isMobile = false;	//The virtual scroll offset when using mobile scrolling.	var _mobileOffset = 0;	//If the browser supports 3d transforms, this will be filled with 'translateZ(0)' (empty string otherwise).	var _translateZ;	//Will contain data about registered events by skrollr.	var _registeredEvents = [];	//Animation frame id returned by RequestAnimationFrame (or timeout when RAF is not supported).	var _animFrame;}(window, document));
/** * BxSlider v4.1.2 - Fully loaded, responsive content slider * http://bxslider.com * * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com * Written while drinking Belgian ales and listening to jazz * * Released under the MIT license - http://opensource.org/licenses/MIT */;(function($){	var plugin = {};	var defaults = {		// GENERAL		mode: 'horizontal',		slideSelector: '',		infiniteLoop: true,		hideControlOnEnd: false,		speed: 500,		easing: null,		slideMargin: 0,		startSlide: 0,		randomStart: false,		captions: false,		ticker: false,		tickerHover: false,		adaptiveHeight: false,		adaptiveHeightSpeed: 500,		video: false,		useCSS: true,		preloadImages: 'visible',		responsive: true,		slideZIndex: 50,		wrapperClass: 'bx-wrapper',		// TOUCH		touchEnabled: true,		swipeThreshold: 50,		oneToOneTouch: true,		preventDefaultSwipeX: true,		preventDefaultSwipeY: false,		// PAGER		pager: true,		pagerType: 'full',		pagerShortSeparator: ' / ',		pagerSelector: null,		buildPager: null,		pagerCustom: null,		// CONTROLS		controls: true,		nextText: 'Next',		prevText: 'Prev',		nextSelector: null,		prevSelector: null,		autoControls: false,		startText: 'Start',		stopText: 'Stop',		autoControlsCombine: false,		autoControlsSelector: null,		// AUTO		auto: false,		pause: 4000,		autoStart: true,		autoDirection: 'next',		autoHover: false,		autoDelay: 0,		autoSlideForOnePage: false,		// CAROUSEL		minSlides: 1,		maxSlides: 1,		moveSlides: 0,		slideWidth: 0,		// CALLBACKS		onSliderLoad: function() {},		onSlideBefore: function() {},		onSlideAfter: function() {},		onSlideNext: function() {},		onSlidePrev: function() {},		onSliderResize: function() {}	}	$.fn.bxSlider = function(options){		if(this.length == 0) return this;		// support mutltiple elements		if(this.length > 1){			this.each(function(){$(this).bxSlider(options)});			return this;		}		// create a namespace to be used throughout the plugin		var slider = {};		// set a reference to our slider element		var el = this;		plugin.el = this;		/**		 * Makes slideshow responsive		 */		// first get the original window dimens (thanks alot IE)		var windowWidth = $(window).width();		var windowHeight = $(window).height();		/**		 * ===================================================================================		 * = PRIVATE FUNCTIONS		 * ===================================================================================		 */		/**		 * Initializes namespace settings to be used throughout plugin		 */		var init = function(){			// merge user-supplied options with the defaults			slider.settings = $.extend({}, defaults, options);			// parse slideWidth setting			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);			// store the original children			slider.children = el.children(slider.settings.slideSelector);			// check if actual number of slides is less than minSlides / maxSlides			if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;			if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;			// if random start, set the startSlide setting to random number			if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);			// store active slide information			slider.active = { index: slider.settings.startSlide }			// store if the slider is in carousel mode (displaying / moving multiple slides)			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;			// if carousel, force preloadImages = 'all'			if(slider.carousel) slider.settings.preloadImages = 'all';			// calculate the min / max width thresholds based on min / max number of slides			// used to setup and update carousel slides dimensions			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);			// store the current state of the slider (if currently animating, working is true)			slider.working = false;			// initialize the controls object			slider.controls = {};			// initialize an auto interval			slider.interval = null;			// determine which property to use for transitions			slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';			// determine if hardware acceleration can be used			slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){				// create our test div element				var div = document.createElement('div');				// css transition properties				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];				// test for each property				for(var i in props){					if(div.style[props[i]] !== undefined){						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();						slider.animProp = '-' + slider.cssPrefix + '-transform';						return true;					}				}				return false;			}());			// if vertical mode always make maxSlides and minSlides equal			if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;			// save original style data			el.data("origStyle", el.attr("style"));			el.children(slider.settings.slideSelector).each(function() {			  $(this).data("origStyle", $(this).attr("style"));			});			// perform all DOM / CSS modifications			setup();		}		/**		 * Performs all DOM and CSS modifications		 */		var setup = function(){			// wrap el in a wrapper			el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');			// store a namspace reference to .bx-viewport			slider.viewport = el.parent();			// add a loading div to display while images are loading			slider.loader = $('<div class="bx-loading" />');			slider.viewport.prepend(slider.loader);			// set el to a massive width, to hold any needed slides			// also strip any margin and padding from el			el.css({				width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',				position: 'relative'			});			// if using CSS, add the easing property			if(slider.usingCSS && slider.settings.easing){				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)			}else if(!slider.settings.easing){				slider.settings.easing = 'swing';			}			var slidesShowing = getNumberSlidesShowing();			// make modifications to the viewport (.bx-viewport)			slider.viewport.css({				width: '100%',				overflow: 'hidden',				position: 'relative'			});			slider.viewport.parent().css({				maxWidth: getViewportMaxWidth()			});			// make modification to the wrapper (.bx-wrapper)			if(!slider.settings.pager) {				slider.viewport.parent().css({				margin: '0 auto 0px'				});			}			// apply css to all slider children			slider.children.css({				'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',				listStyle: 'none',				position: 'relative'			});			// apply the calculated width after the float is applied to prevent scrollbar interference			slider.children.css('width', getSlideWidth());			// if slideMargin is supplied, add the css			if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);			if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);			// if "fade" mode, add positioning and z-index CSS			if(slider.settings.mode == 'fade'){				slider.children.css({					position: 'absolute',					zIndex: 0,					display: 'none'				});				// prepare the z-index on the showing element				slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});			}			// create an element to contain all slider controls (pager, start / stop, etc)			slider.controls.el = $('<div class="bx-controls" />');			// if captions are requested, add them			if(slider.settings.captions) appendCaptions();			// check if startSlide is last slide			slider.active.last = slider.settings.startSlide == getPagerQty() - 1;			// if video is true, set up the fitVids plugin			if(slider.settings.video) el.fitVids();			// set the default preload selector (visible)			var preloadSelector = slider.children.eq(slider.settings.startSlide);			if (slider.settings.preloadImages == "all") preloadSelector = slider.children;			// only check for control addition if not in "ticker" mode			if(!slider.settings.ticker){				// if pager is requested, add it				if(slider.settings.pager) appendPager();				// if controls are requested, add them				if(slider.settings.controls) appendControls();				// if auto is true, and auto controls are requested, add them				if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();				// if any control option is requested, add the controls wrapper				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);			// if ticker mode, do not allow a pager			}else{				slider.settings.pager = false;			}			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded			loadElements(preloadSelector, start);		}		var loadElements = function(selector, callback){			var total = selector.find('img, iframe').length;			if (total == 0){				callback();				return;			}			var count = 0;			selector.find('img, iframe').each(function(){				$(this).one('load', function() {				  if(++count == total) callback();				}).each(function() {				  if(this.complete) $(this).load();				});			});		}		/**		 * Start the slider		 */		var start = function(){			// if infinite loop, prepare additional slides			if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){				var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;				var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');				var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');				el.append(sliceAppend).prepend(slicePrepend);			}			// remove the loading DOM element			slider.loader.remove();			// set the left / top position of "el"			setSlidePosition();			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior			if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;			// set the viewport height			slider.viewport.height(getViewportHeight());			// make sure everything is positioned just right (same as a window resize)			el.redrawSlider();			// onSliderLoad callback			slider.settings.onSliderLoad(slider.active.index);			// slider has been fully initialized			slider.initialized = true;			// bind the resize call to the window			if (slider.settings.responsive) $(window).bind('resize', resizeWindow);			// if auto is true and has more than 1 page, start the show			if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();			// if ticker is true, start the ticker			if (slider.settings.ticker) initTicker();			// if pager is requested, make the appropriate pager link active			if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);			// check for any updates to the controls (like hideControlOnEnd updates)			if (slider.settings.controls) updateDirectionControls();			// if touchEnabled is true, setup the touch events			if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();		}		/**		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value		 */		var getViewportHeight = function(){			var height = 0;			// first determine which children (slides) should be used in our height calculation			var children = $();			// if mode is not "vertical" and adaptiveHeight is false, include all children			if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){				children = slider.children;			}else{				// if not carousel, return the single active child				if(!slider.carousel){					children = slider.children.eq(slider.active.index);				// if carousel, return a slice of children				}else{					// get the individual slide index					var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();					// add the current slide to the children					children = slider.children.eq(currentIndex);					// cycle through the remaining "showing" slides					for (i = 1; i <= slider.settings.maxSlides - 1; i++){						// if looped back to the start						if(currentIndex + i >= slider.children.length){							children = children.add(slider.children.eq(i - 1));						}else{							children = children.add(slider.children.eq(currentIndex + i));						}					}				}			}			// if "vertical" mode, calculate the sum of the heights of the children			if(slider.settings.mode == 'vertical'){				children.each(function(index) {				  height += $(this).outerHeight();				});				// add user-supplied margins				if(slider.settings.slideMargin > 0){					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);				}			// if not "vertical" mode, calculate the max height of the children			}else{				height = Math.max.apply(Math, children.map(function(){					return $(this).outerHeight(false);				}).get());			}			if(slider.viewport.css('box-sizing') == 'border-box'){				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +							parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));			}else if(slider.viewport.css('box-sizing') == 'padding-box'){				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));			}			return height;		}		/**		 * Returns the calculated width to be used for the outer wrapper / viewport		 */		var getViewportMaxWidth = function(){			var width = '100%';			if(slider.settings.slideWidth > 0){				if(slider.settings.mode == 'horizontal'){					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);				}else{					width = slider.settings.slideWidth;				}			}			return width;		}		/**		 * Returns the calculated width to be applied to each slide		 */		var getSlideWidth = function(){			// start with any user-supplied slide width			var newElWidth = slider.settings.slideWidth;			// get the current viewport width			var wrapWidth = slider.viewport.width();			// if slide width was not supplied, or is larger than the viewport use the viewport width			if(slider.settings.slideWidth == 0 ||				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||				slider.settings.mode == 'vertical'){				newElWidth = wrapWidth;			// if carousel, use the thresholds to determine the width			}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){				if(wrapWidth > slider.maxThreshold){					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;				}else if(wrapWidth < slider.minThreshold){					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;				}			}			return newElWidth;		}		/**		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)		 */		var getNumberSlidesShowing = function(){			var slidesShowing = 1;			if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){				// if viewport is smaller than minThreshold, return minSlides				if(slider.viewport.width() < slider.minThreshold){					slidesShowing = slider.settings.minSlides;				// if viewport is larger than minThreshold, return maxSlides				}else if(slider.viewport.width() > slider.maxThreshold){					slidesShowing = slider.settings.maxSlides;				// if viewport is between min / max thresholds, divide viewport width by first child width				}else{					var childWidth = slider.children.first().width() + slider.settings.slideMargin;					slidesShowing = Math.floor((slider.viewport.width() +						slider.settings.slideMargin) / childWidth);				}			// if "vertical" mode, slides showing will always be minSlides			}else if(slider.settings.mode == 'vertical'){				slidesShowing = slider.settings.minSlides;			}			return slidesShowing;		}		/**		 * Returns the number of pages (one full viewport of slides is one "page")		 */		var getPagerQty = function(){			var pagerQty = 0;			// if moveSlides is specified by the user			if(slider.settings.moveSlides > 0){				if(slider.settings.infiniteLoop){					pagerQty = Math.ceil(slider.children.length / getMoveBy());				}else{					// use a while loop to determine pages					var breakPoint = 0;					var counter = 0					// when breakpoint goes above children length, counter is the number of pages					while (breakPoint < slider.children.length){						++pagerQty;						breakPoint = counter + getNumberSlidesShowing();						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();					}				}			// if moveSlides is 0 (auto) divide children length by sides showing, then round up			}else{				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());			}			return pagerQty;		}		/**		 * Returns the number of indivual slides by which to shift the slider		 */		var getMoveBy = function(){			// if moveSlides was set by the user and moveSlides is less than number of slides showing			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){				return slider.settings.moveSlides;			}			// if moveSlides is 0 (auto)			return getNumberSlidesShowing();		}		/**		 * Sets the slider's (el) left or top position		 */		var setSlidePosition = function(){			// if last slide, not infinite loop, and number of children is larger than specified maxSlides			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){				if (slider.settings.mode == 'horizontal'){					// get the last child's position					var lastChild = slider.children.last();					var position = lastChild.position();					// set the left position					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);				}else if(slider.settings.mode == 'vertical'){					// get the last showing index's position					var lastShowingIndex = slider.children.length - slider.settings.minSlides;					var position = slider.children.eq(lastShowingIndex).position();					// set the top position					setPositionProperty(-position.top, 'reset', 0);				}			// if not last slide			}else{				// get the position of the first showing slide				var position = slider.children.eq(slider.active.index * getMoveBy()).position();				// check for last slide				if (slider.active.index == getPagerQty() - 1) slider.active.last = true;				// set the repective position				if (position != undefined){					if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);					else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);				}			}		}		/**		 * Sets the el's animating property position (which in turn will sometimes animate el).		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.		 *		 * @param value (int)		 *  - the animating property's value		 *		 * @param type (string) 'slider', 'reset', 'ticker'		 *  - the type of instance for which the function is being		 *		 * @param duration (int)		 *  - the amount of time (in ms) the transition should occupy		 *		 * @param params (array) optional		 *  - an optional parameter containing any variables that need to be passed in		 */		var setPositionProperty = function(value, type, duration, params){			// use CSS transform			if(slider.usingCSS){				// determine the translate3d value				var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';				// add the CSS transition-duration				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');				if(type == 'slide'){					// set the property value					el.css(slider.animProp, propValue);					// bind a callback method - executes when CSS transition completes					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){						// unbind the callback						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');						updateAfterSlideTransition();					});				}else if(type == 'reset'){					el.css(slider.animProp, propValue);				}else if(type == 'ticker'){					// make the transition use 'linear'					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');					el.css(slider.animProp, propValue);					// bind a callback method - executes when CSS transition completes					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){						// unbind the callback						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');						// reset the position						setPositionProperty(params['resetValue'], 'reset', 0);						// start the loop again						tickerLoop();					});				}			// use JS animate			}else{				var animateObj = {};				animateObj[slider.animProp] = value;				if(type == 'slide'){					el.animate(animateObj, duration, slider.settings.easing, function(){						updateAfterSlideTransition();					});				}else if(type == 'reset'){					el.css(slider.animProp, value)				}else if(type == 'ticker'){					el.animate(animateObj, speed, 'linear', function(){						setPositionProperty(params['resetValue'], 'reset', 0);						// run the recursive loop after animation						tickerLoop();					});				}			}		}		/**		 * Populates the pager with proper amount of pages		 */		var populatePager = function(){			var pagerHtml = '';			var pagerQty = getPagerQty();			// loop through each pager item			for(var i=0; i < pagerQty; i++){				var linkContent = '';				// if a buildPager function is supplied, use it to get pager link value, else use index + 1				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){					linkContent = slider.settings.buildPager(i);					slider.pagerEl.addClass('bx-custom-pager');				}else{					linkContent = i + 1;					slider.pagerEl.addClass('bx-default-pager');				}				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;				// add the markup to the string				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';			};			// populate the pager element with pager links			slider.pagerEl.html(pagerHtml);		}		/**		 * Appends the pager to the controls element		 */		var appendPager = function(){			if(!slider.settings.pagerCustom){				// create the pager DOM element				slider.pagerEl = $('<div class="bx-pager" />');				// if a pager selector was supplied, populate it with the pager				if(slider.settings.pagerSelector){					$(slider.settings.pagerSelector).html(slider.pagerEl);				// if no pager selector was supplied, add it after the wrapper				}else{					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);				}				// populate the pager				populatePager();			}else{				slider.pagerEl = $(slider.settings.pagerCustom);			}			// assign the pager click binding			slider.pagerEl.on('click', 'a', clickPagerBind);		}		/**		 * Appends prev / next controls to the controls element		 */		var appendControls = function(){			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');			// bind click actions to the controls			slider.controls.next.bind('click', clickNextBind);			slider.controls.prev.bind('click', clickPrevBind);			// if nextSlector was supplied, populate it			if(slider.settings.nextSelector){				$(slider.settings.nextSelector).append(slider.controls.next);			}			// if prevSlector was supplied, populate it			if(slider.settings.prevSelector){				$(slider.settings.prevSelector).append(slider.controls.prev);			}			// if no custom selectors were supplied			if(!slider.settings.nextSelector && !slider.settings.prevSelector){				// add the controls to the DOM				slider.controls.directionEl = $('<div class="bx-controls-direction" />');				// add the control elements to the directionEl				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);				// slider.viewport.append(slider.controls.directionEl);				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);			}		}		/**		 * Appends start / stop auto controls to the controls element		 */		var appendControlsAuto = function(){			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');			// add the controls to the DOM			slider.controls.autoEl = $('<div class="bx-controls-auto" />');			// bind click actions to the controls			slider.controls.autoEl.on('click', '.bx-start', clickStartBind);			slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);			// if autoControlsCombine, insert only the "start" control			if(slider.settings.autoControlsCombine){				slider.controls.autoEl.append(slider.controls.start);			// if autoControlsCombine is false, insert both controls			}else{				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);			}			// if auto controls selector was supplied, populate it with the controls			if(slider.settings.autoControlsSelector){				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);			// if auto controls selector was not supplied, add it after the wrapper			}else{				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);			}			// update the auto controls			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');		}		/**		 * Appends image captions to the DOM		 */		var appendCaptions = function(){			// cycle through each child			slider.children.each(function(index){				// get the image title attribute				var title = $(this).find('img:first').attr('title');				// append the caption				if (title != undefined && ('' + title).length) {                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');                }			});		}		/**		 * Click next binding		 *		 * @param e (event)		 *  - DOM event object		 */		var clickNextBind = function(e){			// if auto show is running, stop it			if (slider.settings.auto) el.stopAuto();			el.goToNextSlide();			e.preventDefault();		}		/**		 * Click prev binding		 *		 * @param e (event)		 *  - DOM event object		 */		var clickPrevBind = function(e){			// if auto show is running, stop it			if (slider.settings.auto) el.stopAuto();			el.goToPrevSlide();			e.preventDefault();		}		/**		 * Click start binding		 *		 * @param e (event)		 *  - DOM event object		 */		var clickStartBind = function(e){			el.startAuto();			e.preventDefault();		}		/**		 * Click stop binding		 *		 * @param e (event)		 *  - DOM event object		 */		var clickStopBind = function(e){			el.stopAuto();			e.preventDefault();		}		/**		 * Click pager binding		 *		 * @param e (event)		 *  - DOM event object		 */		var clickPagerBind = function(e){			// if auto show is running, stop it			if (slider.settings.auto) el.stopAuto();			var pagerLink = $(e.currentTarget);			if(pagerLink.attr('data-slide-index') !== undefined){				var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));				// if clicked pager link is not active, continue with the goToSlide call				if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);				e.preventDefault();			}		}		/**		 * Updates the pager links with an active class		 *		 * @param slideIndex (int)		 *  - index of slide to make active		 */		var updatePagerActive = function(slideIndex){			// if "short" pager type			var len = slider.children.length; // nb of children			if(slider.settings.pagerType == 'short'){				if(slider.settings.maxSlides > 1) {					len = Math.ceil(slider.children.length/slider.settings.maxSlides);				}				slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);				return;			}			// remove all pager active classes			slider.pagerEl.find('a').removeClass('active');			// apply the active class for all pagers			slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });		}		/**		 * Performs needed actions after a slide transition		 */		var updateAfterSlideTransition = function(){			// if infinte loop is true			if(slider.settings.infiniteLoop){				var position = '';				// first slide				if(slider.active.index == 0){					// set the new position					position = slider.children.eq(0).position();				// carousel, last slide				}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();				// last slide				}else if(slider.active.index == slider.children.length - 1){					position = slider.children.eq(slider.children.length - 1).position();				}				if(position){					if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }					else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }				}			}			// declare that the transition is complete			slider.working = false;			// onSlideAfter callback			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);		}		/**		 * Updates the auto controls state (either active, or combined switch)		 *		 * @param state (string) "start", "stop"		 *  - the new state of the auto show		 */		var updateAutoControls = function(state){			// if autoControlsCombine is true, replace the current control with the new state			if(slider.settings.autoControlsCombine){				slider.controls.autoEl.html(slider.controls[state]);			// if autoControlsCombine is false, apply the "active" class to the appropriate control			}else{				slider.controls.autoEl.find('a').removeClass('active');				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');			}		}		/**		 * Updates the direction controls (checks if either should be hidden)		 */		var updateDirectionControls = function(){			if(getPagerQty() == 1){				slider.controls.prev.addClass('disabled');				slider.controls.next.addClass('disabled');			}else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){				// if first slide				if (slider.active.index == 0){					slider.controls.prev.addClass('disabled');					slider.controls.next.removeClass('disabled');				// if last slide				}else if(slider.active.index == getPagerQty() - 1){					slider.controls.next.addClass('disabled');					slider.controls.prev.removeClass('disabled');				// if any slide in the middle				}else{					slider.controls.prev.removeClass('disabled');					slider.controls.next.removeClass('disabled');				}			}		}		/**		 * Initialzes the auto process		 */		var initAuto = function(){			// if autoDelay was supplied, launch the auto show using a setTimeout() call			if(slider.settings.autoDelay > 0){				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);			// if autoDelay was not supplied, start the auto show normally			}else{				el.startAuto();			}			// if autoHover is requested			if(slider.settings.autoHover){				// on el hover				el.hover(function(){					// if the auto show is currently playing (has an active interval)					if(slider.interval){						// stop the auto show and pass true agument which will prevent control update						el.stopAuto(true);						// create a new autoPaused value which will be used by the relative "mouseout" event						slider.autoPaused = true;					}				}, function(){					// if the autoPaused value was created be the prior "mouseover" event					if(slider.autoPaused){						// start the auto show and pass true agument which will prevent control update						el.startAuto(true);						// reset the autoPaused value						slider.autoPaused = null;					}				});			}		}		/**		 * Initialzes the ticker process		 */		var initTicker = function(){			var startPosition = 0;			// if autoDirection is "next", append a clone of the entire slider			if(slider.settings.autoDirection == 'next'){				el.append(slider.children.clone().addClass('bx-clone'));			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position			}else{				el.prepend(slider.children.clone().addClass('bx-clone'));				var position = slider.children.first().position();				startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;			}			setPositionProperty(startPosition, 'reset', 0);			// do not allow controls in ticker mode			slider.settings.pager = false;			slider.settings.controls = false;			slider.settings.autoControls = false;			// if autoHover is requested			if(slider.settings.tickerHover && !slider.usingCSS){				// on el hover				slider.viewport.hover(function(){					el.stop();				}, function(){					// calculate the total width of children (used to calculate the speed ratio)					var totalDimens = 0;					slider.children.each(function(index){					  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);					});					// calculate the speed ratio (used to determine the new speed to finish the paused animation)					var ratio = slider.settings.speed / totalDimens;					// determine which property to use					var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';					// calculate the new speed					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));					tickerLoop(newSpeed);				});			}			// start the ticker loop			tickerLoop();		}		/**		 * Runs a continuous loop, news ticker-style		 */		var tickerLoop = function(resumeSpeed){			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;			var position = {left: 0, top: 0};			var reset = {left: 0, top: 0};			// if "next" animate left position to last child, then reset left to 0			if(slider.settings.autoDirection == 'next'){				position = el.find('.bx-clone').first().position();			// if "prev" animate left position to 0, then reset left to first non-clone child			}else{				reset = slider.children.first().position();			}			var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;			var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;			var params = {resetValue: resetValue};			setPositionProperty(animateProperty, 'ticker', speed, params);		}		/**		 * Initializes touch events		 */		var initTouch = function(){			// initialize object to contain all touch values			slider.touch = {				start: {x: 0, y: 0},				end: {x: 0, y: 0}			}			slider.viewport.bind('touchstart', onTouchStart);		}		/**		 * Event handler for "touchstart"		 *		 * @param e (event)		 *  - DOM event object		 */		var onTouchStart = function(e){			if(slider.working){				e.preventDefault();			}else{				// record the original position when touch starts				slider.touch.originalPos = el.position();				var orig = e.originalEvent;				// record the starting touch x, y coordinates				slider.touch.start.x = orig.changedTouches[0].pageX;				slider.touch.start.y = orig.changedTouches[0].pageY;				// bind a "touchmove" event to the viewport				slider.viewport.bind('touchmove', onTouchMove);				// bind a "touchend" event to the viewport				slider.viewport.bind('touchend', onTouchEnd);			}		}		/**		 * Event handler for "touchmove"		 *		 * @param e (event)		 *  - DOM event object		 */		var onTouchMove = function(e){			var orig = e.originalEvent;			// if scrolling on y axis, do not prevent default			var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);			var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);			// x axis swipe			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){				e.preventDefault();			// y axis swipe			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){				e.preventDefault();			}			if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){				var value = 0;				// if horizontal, drag along x axis				if(slider.settings.mode == 'horizontal'){					var change = orig.changedTouches[0].pageX - slider.touch.start.x;					value = slider.touch.originalPos.left + change;				// if vertical, drag along y axis				}else{					var change = orig.changedTouches[0].pageY - slider.touch.start.y;					value = slider.touch.originalPos.top + change;				}				setPositionProperty(value, 'reset', 0);			}		}		/**		 * Event handler for "touchend"		 *		 * @param e (event)		 *  - DOM event object		 */		var onTouchEnd = function(e){			slider.viewport.unbind('touchmove', onTouchMove);			var orig = e.originalEvent;			var value = 0;			// record end x, y positions			slider.touch.end.x = orig.changedTouches[0].pageX;			slider.touch.end.y = orig.changedTouches[0].pageY;			// if fade mode, check if absolute x distance clears the threshold			if(slider.settings.mode == 'fade'){				var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);				if(distance >= slider.settings.swipeThreshold){					slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();					el.stopAuto();				}			// not fade mode			}else{				var distance = 0;				// calculate distance and el's animate property				if(slider.settings.mode == 'horizontal'){					distance = slider.touch.end.x - slider.touch.start.x;					value = slider.touch.originalPos.left;				}else{					distance = slider.touch.end.y - slider.touch.start.y;					value = slider.touch.originalPos.top;				}				// if not infinite loop and first / last slide, do not attempt a slide transition				if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){					setPositionProperty(value, 'reset', 200);				}else{					// check if distance clears threshold					if(Math.abs(distance) >= slider.settings.swipeThreshold){						distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();						el.stopAuto();					}else{						// el.animate(property, 200);						setPositionProperty(value, 'reset', 200);					}				}			}			slider.viewport.unbind('touchend', onTouchEnd);		}		/**		 * Window resize event callback		 */		var resizeWindow = function(e){			// don't do anything if slider isn't initialized.			if(!slider.initialized) return;			// get the new window dimens (again, thank you IE)			var windowWidthNew = $(window).width();			var windowHeightNew = $(window).height();			// make sure that it is a true window resize			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements			// are resized. Can you just die already?*			if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){				// set the new window dimens				windowWidth = windowWidthNew;				windowHeight = windowHeightNew;				// update all dynamic elements				el.redrawSlider();				// Call user resize handler				slider.settings.onSliderResize.call(el, slider.active.index);			}		}		/**		 * ===================================================================================		 * = PUBLIC FUNCTIONS		 * ===================================================================================		 */		/**		 * Performs slide transition to the specified slide		 *		 * @param slideIndex (int)		 *  - the destination slide's index (zero-based)		 *		 * @param direction (string)		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")		 */		el.goToSlide = function(slideIndex, direction){			// if plugin is currently in motion, ignore request			if(slider.working || slider.active.index == slideIndex) return;			// declare that plugin is in motion			slider.working = true;			// store the old index			slider.oldIndex = slider.active.index;			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)			if(slideIndex < 0){				slider.active.index = getPagerQty() - 1;			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)			}else if(slideIndex >= getPagerQty()){				slider.active.index = 0;			// set active index to requested slide			}else{				slider.active.index = slideIndex;			}			// onSlideBefore, onSlideNext, onSlidePrev callbacks			slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);			if(direction == 'next'){				slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);			}else if(direction == 'prev'){				slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);			}			// check if last slide			slider.active.last = slider.active.index >= getPagerQty() - 1;			// update the pager with active class			if(slider.settings.pager) updatePagerActive(slider.active.index);			// // check for direction control update			if(slider.settings.controls) updateDirectionControls();			// if slider is set to mode: "fade"			if(slider.settings.mode == 'fade'){				// if adaptiveHeight is true and next height is different from current height, animate to the new height				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);				}				// fade out the visible child and reset its z-index value				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});				// fade in the newly requested slide				slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){					$(this).css('zIndex', slider.settings.slideZIndex);					updateAfterSlideTransition();				});			// slider mode is not "fade"			}else{				// if adaptiveHeight is true and next height is different from current height, animate to the new height				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);				}				var moveBy = 0;				var position = {left: 0, top: 0};				// if carousel and not infinite loop				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){					if(slider.settings.mode == 'horizontal'){						// get the last child position						var lastChild = slider.children.eq(slider.children.length - 1);						position = lastChild.position();						// calculate the position of the last slide						moveBy = slider.viewport.width() - lastChild.outerWidth();					}else{						// get last showing index position						var lastShowingIndex = slider.children.length - slider.settings.minSlides;						position = slider.children.eq(lastShowingIndex).position();					}					// horizontal carousel, going previous while on first slide (infiniteLoop mode)				}else if(slider.carousel && slider.active.last && direction == 'prev'){					// get the last child position					var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);					var lastChild = el.children('.bx-clone').eq(eq);					position = lastChild.position();				// if infinite loop and "Next" is clicked on the last slide				}else if(direction == 'next' && slider.active.index == 0){					// get the last clone position					position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();					slider.active.last = false;				// normal non-zero requests				}else if(slideIndex >= 0){					var requestEl = slideIndex * getMoveBy();					position = slider.children.eq(requestEl).position();				}				/* If the position doesn't exist				 * (e.g. if you destroy the slider on a next click),				 * it doesn't throw an error.				 */				if ("undefined" !== typeof(position)) {					var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;					// plugin values to be animated					setPositionProperty(value, 'slide', slider.settings.speed);				}			}		}		/**		 * Transitions to the next slide in the show		 */		el.goToNextSlide = function(){			// if infiniteLoop is false and last page is showing, disregard call			if (!slider.settings.infiniteLoop && slider.active.last) return;			var pagerIndex = parseInt(slider.active.index) + 1;			el.goToSlide(pagerIndex, 'next');		}		/**		 * Transitions to the prev slide in the show		 */		el.goToPrevSlide = function(){			// if infiniteLoop is false and last page is showing, disregard call			if (!slider.settings.infiniteLoop && slider.active.index == 0) return;			var pagerIndex = parseInt(slider.active.index) - 1;			el.goToSlide(pagerIndex, 'prev');		}		/**		 * Starts the auto show		 *		 * @param preventControlUpdate (boolean)		 *  - if true, auto controls state will not be updated		 */		el.startAuto = function(preventControlUpdate){			// if an interval already exists, disregard call			if(slider.interval) return;			// create an interval			slider.interval = setInterval(function(){				slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();			}, slider.settings.pause);			// if auto controls are displayed and preventControlUpdate is not true			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');		}		/**		 * Stops the auto show		 *		 * @param preventControlUpdate (boolean)		 *  - if true, auto controls state will not be updated		 */		el.stopAuto = function(preventControlUpdate){			// if no interval exists, disregard call			if(!slider.interval) return;			// clear the interval			clearInterval(slider.interval);			slider.interval = null;			// if auto controls are displayed and preventControlUpdate is not true			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');		}		/**		 * Returns current slide index (zero-based)		 */		el.getCurrentSlide = function(){			return slider.active.index;		}		/**		 * Returns current slide element		 */		el.getCurrentSlideElement = function(){			return slider.children.eq(slider.active.index);		}		/**		 * Returns number of slides in show		 */		el.getSlideCount = function(){			return slider.children.length;		}		/**		 * Update all dynamic slider elements		 */		el.redrawSlider = function(){			// resize all children in ratio to new screen size			slider.children.add(el.find('.bx-clone')).width(getSlideWidth());			// adjust the height			slider.viewport.css('height', getViewportHeight());			// update the slide position			if(!slider.settings.ticker) setSlidePosition();			// if active.last was true before the screen resize, we want			// to keep it last no matter what screen size we end on			if (slider.active.last) slider.active.index = getPagerQty() - 1;			// if the active index (page) no longer exists due to the resize, simply set the index as last			if (slider.active.index >= getPagerQty()) slider.active.last = true;			// if a pager is being displayed and a custom pager is not being used, update it			if(slider.settings.pager && !slider.settings.pagerCustom){				populatePager();				updatePagerActive(slider.active.index);			}		}		/**		 * Destroy the current instance of the slider (revert everything back to original state)		 */		el.destroySlider = function(){			// don't do anything if slider has already been destroyed			if(!slider.initialized) return;			slider.initialized = false;			$('.bx-clone', this).remove();			slider.children.each(function() {				$(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');			});			$(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');			$(this).unwrap().unwrap();			if(slider.controls.el) slider.controls.el.remove();			if(slider.controls.next) slider.controls.next.remove();			if(slider.controls.prev) slider.controls.prev.remove();			if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();			$('.bx-caption', this).remove();			if(slider.controls.autoEl) slider.controls.autoEl.remove();			clearInterval(slider.interval);			if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);		}		/**		 * Reload the slider (revert all DOM changes, and re-initialize)		 */		el.reloadSlider = function(settings){			if (settings != undefined) options = settings;			el.destroySlider();			init();		}		init();		// returns the current jQuery object		return this;	}})(jQuery);
/*! Magnific Popup - v1.0.0 - 2015-01-03
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
;(function (factory) { 
if (typeof define === 'function' && define.amd) { 
 // AMD. Register as an anonymous module. 
 define(['jquery'], factory); 
 } else if (typeof exports === 'object') { 
 // Node/CommonJS 
 factory(require('jquery')); 
 } else { 
 // Browser globals 
 factory(window.jQuery || window.Zepto); 
 } 
 }(function($) { 
/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */
/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';
/**
 * Private vars 
 */
/*jshint -W079 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;
/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);
		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			/*jshint -W020 */
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor
		if( s['transition'] !== undefined ) {
			return true; 
		}
			
		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}
				
		return false;
	};
/**
 * Public functions
 */
MagnificPopup.prototype = {
	constructor: MagnificPopup,
	/**
	 * Initializes Magnific Popup plugin. 
	 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isIE7 = appVersion.indexOf("MSIE 7.") !== -1; 
		mfp.isIE8 = appVersion.indexOf("MSIE 8.") !== -1;
		mfp.isLowIE = mfp.isIE7 || mfp.isIE8;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();
		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_document = $(document);
		mfp.popupsCache = {};
	},
	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {
		var i;
		if(data.isObj === false) { 
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();
			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = $.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}
		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}
		
		mfp.types = []; 
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}
		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}
		mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;
		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}
		
		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {
			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});
			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});
			mfp.container = _getEl('container', mfp.wrap);
		}
		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}
		// Initializing modules
		var modules = $.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');
		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}
		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}
	
		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({ 
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}
		
		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}
		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});
		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}
		
		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);
		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();
		
		var windowStyles = {};
		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }
		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				$('body, html').css('overflow', 'hidden');
			}
		}
		
		
		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}
		// add content
		mfp.updateItemHTML();
		_mfpTrigger('BuildControls');
		// remove scrollbar, add margin e.t.c
		$('html').css(windowStyles);
		
		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );
		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;
		
		// Wait for next cycle to allow CSS transition
		setTimeout(function() {
			
			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}
			
			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);
		}, 16);
		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);
		return data;
	},
	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);
		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},
	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);
		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';
		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();
		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}
		mfp._removeClassFromMFP(classesToRemove);
		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				$('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			$('html').css(windowStyles);
		}
		
		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);
		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');
		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}
		if(mfp._lastFocusedEl) {
			$(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;	
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;
		_mfpTrigger(AFTER_CLOSE_EVENT);
	},
		updateSize: function(winHeight) {
		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}
		_mfpTrigger('Resize');
	},
	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];
		// Detach and perform modifications
		mfp.contentContainer.detach();
		if(mfp.content)
			mfp.content.detach();
		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}
		var type = item.type;	
		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });
		
		mfp.currItem = item;
		
		
		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;
			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);
			if(markup) {
				mfp.currTemplate[type] = $(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}
		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}
		
		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);
		item.preloaded = true;
		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;
		
		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);
		_mfpTrigger('AfterChange');
	},
	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;
		
		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}
		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');
		mfp.contentContainer.append(mfp.content);
	},
	
	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type;
		if(item.tagName) {
			item = { el: $(item) };
		} else {
			type = item.type;
			item = { data: item, src: item.src };
		}
		if(item.el) {
			var types = mfp.types;
			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}
			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}
		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);
		return mfp.items[index];
	},
	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};
		if(!options) {
			options = {};
		} 
		var eName = 'click.magnificPopup';
		options.mainEl = el;
		
		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;
		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey ) ) {
			return;
		}
		var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;
		if(disableOn) {
			if($.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}
		
		if(e.type) {
			e.preventDefault();
			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}
			
		options.el = $(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},
	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {
		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}
			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}
			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);
			status = data.status;
			text = data.text;
			mfp.preloader.html(text);
			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});
			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},
	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {
		if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}
		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;
		if(closeOnContent && closeOnBg) {
			return true;
		} else {
			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}
			// if click is outside the content
			if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( $.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}
		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = $.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );
		$.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);
				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( '<img src="'+value+'" class="' + el.attr('class') + '" />' );
						}
					} else {
						el.attr(arr[1], value);
					}
				}
			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},
	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}
}; /* MagnificPopup core prototype end */
/**
 * Public static functions
 */
$.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],
	open: function(options, index) {
		_checkInstance();	
		if(!options) {
			options = {};
		} else {
			options = $.extend(true, {}, options);
		}
			
		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},
	close: function() {
		return $.magnificPopup.instance && $.magnificPopup.instance.close();
	},
	registerModule: function(name, module) {
		if(module.options) {
			$.magnificPopup.defaults[name] = module.options;
		}
		$.extend(this.proto, module.proto);			
		this.modules.push(name);
	},
	defaults: {   
		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
		
		disableOn: 0,	
		key: null,
		midClick: false,
		mainClass: '',
		preloader: true,
		focus: '', // CSS selector of input to focus after popup is opened
		
		closeOnContentClick: false,
		closeOnBgClick: true,
		closeBtnInside: true, 
		showCloseBtn: true,
		enableEscapeKey: true,
		modal: false,
		alignTop: false,
			removalDelay: 0,
		prependTo: null,
		
		fixedContentPos: 'auto', 
			fixedBgPos: 'auto',
		overflowY: 'auto',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
		tClose: 'Close (Esc)',
		tLoading: 'Loading...'
	}
};
$.fn.magnificPopup = function(options) {
	_checkInstance();
	var jqEl = $(this);
	// We call some API method of first param is a string
	if (typeof options === "string" ) {
		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;
			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}
	} else {
		// clone options obj
		options = $.extend(true, {}, options);
		
		/*
		 * As Zepto doesn't support .data() method for objects 
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}
		mfp.addGroup(jqEl, options);
	}
	return jqEl;
};
//Quick benchmark
/*
var start = performance.now(),
	i,
	rounds = 1000;
for(i = 0; i < rounds; i++) {
}
console.log('Test #1:', performance.now() - start);
start = performance.now();
for(i = 0; i < rounds; i++) {
}
console.log('Test #2:', performance.now() - start);
*/
/*>>core*/
/*>>inline*/
var INLINE_NS = 'inline',
	_hiddenClass,
	_inlinePlaceholder, 
	_lastInlineElement,
	_putInlineElementsBack = function() {
		if(_lastInlineElement) {
			_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
			_lastInlineElement = null;
		}
	};
$.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: 'hide', // will be appended with `mfp-` prefix
		markup: '',
		tNotFound: 'Content not found'
	},
	proto: {
		initInline: function() {
			mfp.types.push(INLINE_NS);
			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				_putInlineElementsBack();
			});
		},
		getInline: function(item, template) {
			_putInlineElementsBack();
			if(item.src) {
				var inlineSt = mfp.st.inline,
					el = $(item.src);
				if(el.length) {
					// If target element has parent - we replace it with placeholder and put it back after popup is closed
					var parent = el[0].parentNode;
					if(parent && parent.tagName) {
						if(!_inlinePlaceholder) {
							_hiddenClass = inlineSt.hiddenClass;
							_inlinePlaceholder = _getEl(_hiddenClass);
							_hiddenClass = 'mfp-'+_hiddenClass;
						}
						// replace target inline element with placeholder
						_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
					}
					mfp.updateStatus('ready');
				} else {
					mfp.updateStatus('error', inlineSt.tNotFound);
					el = $('<div>');
				}
				item.inlineElement = el;
				return el;
			}
			mfp.updateStatus('ready');
			mfp._parseMarkup(template, {}, item);
			return template;
		}
	}
});
/*>>inline*/
/*>>ajax*/
var AJAX_NS = 'ajax',
	_ajaxCur,
	_removeAjaxCursor = function() {
		if(_ajaxCur) {
			$(document.body).removeClass(_ajaxCur);
		}
	},
	_destroyAjaxRequest = function() {
		_removeAjaxCursor();
		if(mfp.req) {
			mfp.req.abort();
		}
	};
$.magnificPopup.registerModule(AJAX_NS, {
	options: {
		settings: null,
		cursor: 'mfp-ajax-cur',
		tError: '<a href="%url%">The content</a> could not be loaded.'
	},
	proto: {
		initAjax: function() {
			mfp.types.push(AJAX_NS);
			_ajaxCur = mfp.st.ajax.cursor;
			_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
			_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
		},
		getAjax: function(item) {
			if(_ajaxCur) {
				$(document.body).addClass(_ajaxCur);
			}
			mfp.updateStatus('loading');
			var opts = $.extend({
				url: item.src,
				success: function(data, textStatus, jqXHR) {
					var temp = {
						data:data,
						xhr:jqXHR
					};
					_mfpTrigger('ParseAjax', temp);
					mfp.appendContent( $(temp.data), AJAX_NS );
					item.finished = true;
					_removeAjaxCursor();
					mfp._setFocus();
					setTimeout(function() {
						mfp.wrap.addClass(READY_CLASS);
					}, 16);
					mfp.updateStatus('ready');
					_mfpTrigger('AjaxContentAdded');
				},
				error: function() {
					_removeAjaxCursor();
					item.finished = item.loadError = true;
					mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
				}
			}, mfp.st.ajax.settings);
			mfp.req = $.ajax(opts);
			return '';
		}
	}
});
	
/*>>ajax*/
/*>>image*/
var _imgInterval,
	_getTitle = function(item) {
		if(item.data && item.data.title !== undefined) 
			return item.data.title;
		var src = mfp.st.image.titleSrc;
		if(src) {
			if($.isFunction(src)) {
				return src.call(mfp, item);
			} else if(item.el) {
				return item.el.attr(src) || '';
			}
		}
		return '';
	};
$.magnificPopup.registerModule('image', {
	options: {
		markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<figure>'+
						'<div class="mfp-img"></div>'+
						'<figcaption>'+
							'<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							'</div>'+
						'</figcaption>'+
					'</figure>'+
				'</div>',
		cursor: 'mfp-zoom-out-cur',
		titleSrc: 'title', 
		verticalFit: true,
		tError: '<a href="%url%">The image</a> could not be loaded.'
	},
	proto: {
		initImage: function() {
			var imgSt = mfp.st.image,
				ns = '.image';
			mfp.types.push('image');
			_mfpOn(OPEN_EVENT+ns, function() {
				if(mfp.currItem.type === 'image' && imgSt.cursor) {
					$(document.body).addClass(imgSt.cursor);
				}
			});
			_mfpOn(CLOSE_EVENT+ns, function() {
				if(imgSt.cursor) {
					$(document.body).removeClass(imgSt.cursor);
				}
				_window.off('resize' + EVENT_NS);
			});
			_mfpOn('Resize'+ns, mfp.resizeImage);
			if(mfp.isLowIE) {
				_mfpOn('AfterChange', mfp.resizeImage);
			}
		},
		resizeImage: function() {
			var item = mfp.currItem;
			if(!item || !item.img) return;
			if(mfp.st.image.verticalFit) {
				var decr = 0;
				// fix box-sizing in ie7/8
				if(mfp.isLowIE) {
					decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
				}
				item.img.css('max-height', mfp.wH-decr);
			}
		},
		_onImageHasSize: function(item) {
			if(item.img) {
				
				item.hasSize = true;
				if(_imgInterval) {
					clearInterval(_imgInterval);
				}
				
				item.isCheckingImgSize = false;
				_mfpTrigger('ImageHasSize', item);
				if(item.imgHidden) {
					if(mfp.content)
						mfp.content.removeClass('mfp-loading');
					
					item.imgHidden = false;
				}
			}
		},
		/**
		 * Function that loops until the image has size to display elements that rely on it asap
		 */
		findImageSize: function(item) {
			var counter = 0,
				img = item.img[0],
				mfpSetInterval = function(delay) {
					if(_imgInterval) {
						clearInterval(_imgInterval);
					}
					// decelerating interval that checks for size of an image
					_imgInterval = setInterval(function() {
						if(img.naturalWidth > 0) {
							mfp._onImageHasSize(item);
							return;
						}
						if(counter > 200) {
							clearInterval(_imgInterval);
						}
						counter++;
						if(counter === 3) {
							mfpSetInterval(10);
						} else if(counter === 40) {
							mfpSetInterval(50);
						} else if(counter === 100) {
							mfpSetInterval(500);
						}
					}, delay);
				};
			mfpSetInterval(1);
		},
		getImage: function(item, template) {
			var guard = 0,
				// image load complete handler
				onLoadComplete = function() {
					if(item) {
						if (item.img[0].complete) {
							item.img.off('.mfploader');
							
							if(item === mfp.currItem){
								mfp._onImageHasSize(item);
								mfp.updateStatus('ready');
							}
							item.hasSize = true;
							item.loaded = true;
							_mfpTrigger('ImageLoadComplete');
							
						}
						else {
							// if image complete check fails 200 times (20 sec), we assume that there was an error.
							guard++;
							if(guard < 200) {
								setTimeout(onLoadComplete,100);
							} else {
								onLoadError();
							}
						}
					}
				},
				// image error handler
				onLoadError = function() {
					if(item) {
						item.img.off('.mfploader');
						if(item === mfp.currItem){
							mfp._onImageHasSize(item);
							mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
						}
						item.hasSize = true;
						item.loaded = true;
						item.loadError = true;
					}
				},
				imgSt = mfp.st.image;
			var el = template.find('.mfp-img');
			if(el.length) {
				var img = document.createElement('img');
				img.className = 'mfp-img';
				if(item.el && item.el.find('img').length) {
					img.alt = item.el.find('img').attr('alt');
				}
				item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
				img.src = item.src;
				// without clone() "error" event is not firing when IMG is replaced by new IMG
				// TODO: find a way to avoid such cloning
				if(el.is('img')) {
					item.img = item.img.clone();
				}
				img = item.img[0];
				if(img.naturalWidth > 0) {
					item.hasSize = true;
				} else if(!img.width) {										
					item.hasSize = false;
				}
			}
			mfp._parseMarkup(template, {
				title: _getTitle(item),
				img_replaceWith: item.img
			}, item);
			mfp.resizeImage();
			if(item.hasSize) {
				if(_imgInterval) clearInterval(_imgInterval);
				if(item.loadError) {
					template.addClass('mfp-loading');
					mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
				} else {
					template.removeClass('mfp-loading');
					mfp.updateStatus('ready');
				}
				return template;
			}
			mfp.updateStatus('loading');
			item.loading = true;
			if(!item.hasSize) {
				item.imgHidden = true;
				template.addClass('mfp-loading');
				mfp.findImageSize(item);
			} 
			return template;
		}
	}
});
/*>>image*/
/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;		
	};
$.magnificPopup.registerModule('zoom', {
	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},
	proto: {
		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;
				
			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}
			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';
					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;
					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;
			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {
					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');
					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it
					
					image = mfp._getItemToZoom();
					if(!image) {
						showMainContent();
						return;
					}
					animatedImg = getElToAnimate(image); 
					
					animatedImg.css( mfp._getOffset() );
					mfp.wrap.append(animatedImg);
					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {
							showMainContent();
							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images 
						}, duration); // this timeout equals animation duration
					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation
					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					clearTimeout(openTimeout);
					mfp.st.removalDelay = duration;
					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}
					
					
					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');
					
					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}
			});
			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}	
			});
		},
		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},
		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},
		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}
			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( $(window).scrollTop() - paddingTop );
			/*
			
			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.
			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};
			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}
	}
});
/*>>zoom*/
/*>>iframe*/
var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',
		_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) { 
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}
				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};
$.magnificPopup.registerModule(IFRAME_NS, {
	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',
		srcAction: 'iframe_src',
		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com', 
				id: 'v=', 
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},
	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);
			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					} 
				}// else {
					// iframe source is switched, don't do anything
				//}
			});
			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},
		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;
				
			$.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});
			
			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);
			mfp.updateStatus('ready');
			return template;
		}
	}
});
/*>>iframe*/
/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
		var numSlides = mfp.items.length;
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	_replaceCurrTotal = function(text, curr, total) {
		return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
	};
$.magnificPopup.registerModule('gallery', {
	options: {
		enabled: false,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		preload: [0,2],
		navigateByImgClick: true,
		arrows: true,
		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '%curr% of %total%'
	},
	proto: {
		initGallery: function() {
			var gSt = mfp.st.gallery,
				ns = '.mfp-gallery',
				supportsFastClick = Boolean($.fn.mfpFastClick);
			mfp.direction = true; // true - next, false - prev
			
			if(!gSt || !gSt.enabled ) return false;
			_wrapClasses += ' mfp-gallery';
			_mfpOn(OPEN_EVENT+ns, function() {
				if(gSt.navigateByImgClick) {
					mfp.wrap.on('click'+ns, '.mfp-img', function() {
						if(mfp.items.length > 1) {
							mfp.next();
							return false;
						}
					});
				}
				_document.on('keydown'+ns, function(e) {
					if (e.keyCode === 37) {
						mfp.prev();
					} else if (e.keyCode === 39) {
						mfp.next();
					}
				});
			});
			_mfpOn('UpdateStatus'+ns, function(e, data) {
				if(data.text) {
					data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
				}
			});
			_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
				var l = mfp.items.length;
				values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
			});
			_mfpOn('BuildControls' + ns, function() {
				if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
					var markup = gSt.arrowMarkup,
						arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),			
						arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);
					var eName = supportsFastClick ? 'mfpFastClick' : 'click';
					arrowLeft[eName](function() {
						mfp.prev();
					});			
					arrowRight[eName](function() {
						mfp.next();
					});	
					// Polyfill for :before and :after (adds elements with classes mfp-a and mfp-b)
					if(mfp.isIE7) {
						_getEl('b', arrowLeft[0], false, true);
						_getEl('a', arrowLeft[0], false, true);
						_getEl('b', arrowRight[0], false, true);
						_getEl('a', arrowRight[0], false, true);
					}
					mfp.container.append(arrowLeft.add(arrowRight));
				}
			});
			_mfpOn(CHANGE_EVENT+ns, function() {
				if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);
				mfp._preloadTimeout = setTimeout(function() {
					mfp.preloadNearbyImages();
					mfp._preloadTimeout = null;
				}, 16);		
			});
			_mfpOn(CLOSE_EVENT+ns, function() {
				_document.off(ns);
				mfp.wrap.off('click'+ns);
			
				if(mfp.arrowLeft && supportsFastClick) {
					mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick();
				}
				mfp.arrowRight = mfp.arrowLeft = null;
			});
		}, 
		next: function() {
			mfp.direction = true;
			mfp.index = _getLoopedId(mfp.index + 1);
			mfp.updateItemHTML();
		},
		prev: function() {
			mfp.direction = false;
			mfp.index = _getLoopedId(mfp.index - 1);
			mfp.updateItemHTML();
		},
		goTo: function(newIndex) {
			mfp.direction = (newIndex >= mfp.index);
			mfp.index = newIndex;
			mfp.updateItemHTML();
		},
		preloadNearbyImages: function() {
			var p = mfp.st.gallery.preload,
				preloadBefore = Math.min(p[0], mfp.items.length),
				preloadAfter = Math.min(p[1], mfp.items.length),
				i;
			for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
				mfp._preloadItem(mfp.index+i);
			}
			for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
				mfp._preloadItem(mfp.index-i);
			}
		},
		_preloadItem: function(index) {
			index = _getLoopedId(index);
			if(mfp.items[index].preloaded) {
				return;
			}
			var item = mfp.items[index];
			if(!item.parsed) {
				item = mfp.parseEl( index );
			}
			_mfpTrigger('LazyLoad', item);
			if(item.type === 'image') {
				item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
					item.hasSize = true;
				}).on('error.mfploader', function() {
					item.hasSize = true;
					item.loadError = true;
					_mfpTrigger('LazyLoadError', item);
				}).attr('src', item.src);
			}
			item.preloaded = true;
		}
	}
});
/*
Touch Support that might be implemented some day
addSwipeGesture: function() {
	var startX,
		moved,
		multipleTouches;
		return;
	var namespace = '.mfp',
		addEventNames = function(pref, down, move, up, cancel) {
			mfp._tStart = pref + down + namespace;
			mfp._tMove = pref + move + namespace;
			mfp._tEnd = pref + up + namespace;
			mfp._tCancel = pref + cancel + namespace;
		};
	if(window.navigator.msPointerEnabled) {
		addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
	} else if('ontouchstart' in window) {
		addEventNames('touch', 'start', 'move', 'end', 'cancel');
	} else {
		return;
	}
	_window.on(mfp._tStart, function(e) {
		var oE = e.originalEvent;
		multipleTouches = moved = false;
		startX = oE.pageX || oE.changedTouches[0].pageX;
	}).on(mfp._tMove, function(e) {
		if(e.originalEvent.touches.length > 1) {
			multipleTouches = e.originalEvent.touches.length;
		} else {
			//e.preventDefault();
			moved = true;
		}
	}).on(mfp._tEnd + ' ' + mfp._tCancel, function(e) {
		if(moved && !multipleTouches) {
			var oE = e.originalEvent,
				diff = startX - (oE.pageX || oE.changedTouches[0].pageX);
			if(diff > 20) {
				mfp.next();
			} else if(diff < -20) {
				mfp.prev();
			}
		}
	});
},
*/
/*>>gallery*/
/*>>retina*/
var RETINA_NS = 'retina';
$.magnificPopup.registerModule(RETINA_NS, {
	options: {
		replaceSrc: function(item) {
			return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
		},
		ratio: 1 // Function or number.  Set to 1 to disable.
	},
	proto: {
		initRetina: function() {
			if(window.devicePixelRatio > 1) {
				var st = mfp.st.retina,
					ratio = st.ratio;
				ratio = !isNaN(ratio) ? ratio : ratio();
				if(ratio > 1) {
					_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
						item.img.css({
							'max-width': item.img[0].naturalWidth / ratio,
							'width': '100%'
						});
					});
					_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
						item.src = st.replaceSrc(item, ratio);
					});
				}
			}
		}
	}
});
/*>>retina*/
/*>>fastclick*/
/**
 * FastClick event implementation. (removes 300ms delay on touch devices)
 * Based on https://developers.google.com/mobile/articles/fast_buttons
 *
 * You may use it outside the Magnific Popup by calling just:
 *
 * $('.your-el').mfpFastClick(function() {
 *     console.log('Clicked!');
 * });
 *
 * To unbind:
 * $('.your-el').destroyMfpFastClick();
 * 
 * 
 * Note that it's a very basic and simple implementation, it blocks ghost click on the same element where it was bound.
 * If you need something more advanced, use plugin by FT Labs https://github.com/ftlabs/fastclick
 * 
 */
(function() {
	var ghostClickDelay = 1000,
		supportsTouch = 'ontouchstart' in window,
		unbindTouchMove = function() {
			_window.off('touchmove'+ns+' touchend'+ns);
		},
		eName = 'mfpFastClick',
		ns = '.'+eName;
	// As Zepto.js doesn't have an easy way to add custom events (like jQuery), so we implement it in this way
	$.fn.mfpFastClick = function(callback) {
		return $(this).each(function() {
			var elem = $(this),
				lock;
			if( supportsTouch ) {
				var timeout,
					startX,
					startY,
					pointerMoved,
					point,
					numPointers;
				elem.on('touchstart' + ns, function(e) {
					pointerMoved = false;
					numPointers = 1;
					point = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
					startX = point.clientX;
					startY = point.clientY;
					_window.on('touchmove'+ns, function(e) {
						point = e.originalEvent ? e.originalEvent.touches : e.touches;
						numPointers = point.length;
						point = point[0];
						if (Math.abs(point.clientX - startX) > 10 ||
							Math.abs(point.clientY - startY) > 10) {
							pointerMoved = true;
							unbindTouchMove();
						}
					}).on('touchend'+ns, function(e) {
						unbindTouchMove();
						if(pointerMoved || numPointers > 1) {
							return;
						}
						lock = true;
						e.preventDefault();
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							lock = false;
						}, ghostClickDelay);
						callback();
					});
				});
			}
			elem.on('click' + ns, function() {
				if(!lock) {
					callback();
				}
			});
		});
	};
	$.fn.destroyMfpFastClick = function() {
		$(this).off('touchstart' + ns + ' click' + ns);
		if(supportsTouch) _window.off('touchmove'+ns+' touchend'+ns);
	};
})();
/*>>fastclick*/
 _checkInstance(); }));
 
 /*! http://mths.be/placeholder v2.1.2 by @mathias */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;
    var settings = {};

    if (isInputSupported && isTextareaSupported) {

        placeholder = $.fn.placeholder = function() {
            return this;
        };

        placeholder.input = true;
        placeholder.textarea = true;

    } else {

        placeholder = $.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = $.extend({}, defaults, options);

            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.'+settings.customClass)
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {

                var $element = $(element);
                var $passwordInput = $element.data('placeholder-password');

                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {

                var $element = $(element);
                var $replacement;
                var $passwordInput;

                if (value !== '') {

                    $replacement = $element.data('placeholder-textinput');
                    $passwordInput = $element.data('placeholder-password');

                    if ($replacement) {
                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
                        $replacement[0].value = value;

                    } else if ($passwordInput) {
                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
                        element.value = value;
                    }
                }

                if (!$element.data('placeholder-enabled')) {
                    element.value = value;
                    return $element;
                }

                if (value === '') {
                    
                    element.value = value;
                    
                    // Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }

                } else {
                    
                    if ($element.hasClass(settings.customClass)) {
                        clearPlaceholder.call(element);
                    }

                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }

        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.'+settings.customClass, this).each(function() {
                    clearPlaceholder.call(this, true, '');
                });

                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.'+settings.customClass).each(function() {
                this.value = '';
            });
        });
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;

        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });

        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        
        var input = this;
        var $input = $(input);
        
        if (input.value === $input.attr('placeholder') && $input.hasClass(settings.customClass)) {
            
            input.value = '';
            $input.removeClass(settings.customClass);

            if ($input.data('placeholder-password')) {

                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    $input[0].value = value;

                    return value;
                }

                $input.focus();

            } else {
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder(event) {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = input.id;

        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
        if (event && event.type === 'blur') {
            
            if ($input.hasClass(settings.customClass)) {
                return;
            }

            if (input.type === 'password') {
                $replacement = $input.prevAll('input[type="text"]:first');
                if ($replacement.length > 0 && $replacement.is(':visible')) {
                    return;
                }
            }
        }

        if (input.value === '') {
            if (input.type === 'password') {
                if (!$input.data('placeholder-textinput')) {
                    
                    try {
                        $replacement = $input.clone().prop({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }

                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-enabled': true,
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);

                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }

                input.value = '';
                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

            } else {
                
                var $passwordInput = $input.data('placeholder-password');

                if ($passwordInput) {
                    $passwordInput[0].value = '';
                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                }
            }

            $input.addClass(settings.customClass);
            $input[0].value = $input.attr('placeholder');

        } else {
            $input.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        try {
            return document.activeElement;
        } catch (exception) {}
    }
}));

/**
* jquery.matchHeight.js master
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display') === 'inline-block' ? 'inline-block' : 'block';

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        display = $that.css('display') === 'inline-block' ? 'inline-block' : 'block';

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert display block
                    $that.css('display', '');
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, targetHeight - verticalPadding);
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // update heights on load and resize events
    $(window).bind('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window).bind('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

})(jQuery);
