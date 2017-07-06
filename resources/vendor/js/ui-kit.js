// Code Box
$(document).ready(function() {
	$(".code-box").css({'height':'0px','overflow':'hidden','position':'relative'});
	$(".code-box").append('<a class="code-box-expand-trigger"><i class="fa fa-cog fa-spin"></i> Peek at the code...</a>');
	$(".code-box").append('<a class="code-box-collapse-trigger"><i class="fa fa-times"></i> All done</a>');
	
	$(".code-box-expand-trigger").click(function(){	
		$(this).parent().css({'height':'auto'});
	});
	
	$(".code-box-collapse-trigger").click(function(){	
		$(this).parent().css({'height':'0px'});
	});
});

/*!	
* uiKitAlert v1.0
*
* Copyright 2015, Rory Hurlburt @ Wild Apple Design Group
* Released under the WTFPL license 
* http://www.wildappledesigngroup.com
*
* Date: 12/19/15
*/
(function($){
     $.fn.extend({ 

         uiKitAlert: function(options) {
            var defaults = {
							dimissIconFAclass: 'fa-times',
            };
            
            var options = $.extend(defaults, options);
        
            return this.each(function() {
						
							// Variables
							var o = options;
							var alertItem = $(this);
							
							$(alertItem).append('<a class="alert-dismiss-trigger" href="#a"><i class="fa '+o.dimissIconFAclass+'"></i></a>');
							
							var alertCloseTrig = $(alertItem).find('.alert-dismiss-trigger');
							
							$(window).on('resize', function () {
								var alertHeight = $(alertItem).innerHeight();
								$(alertCloseTrig).css({
									'lineHeight':alertHeight+'px'
								});
								
							}).resize();
							
							
							$(alertCloseTrig).click(function(evt){
								evt.preventDefault();
								$(alertItem).fadeOut("slow");
							});

            });
        }
    });
})(jQuery);

$('.alert').uiKitAlert();



// Field Icons
var fiElement = $('.fi');

$(fiElement).each(function(){
		
	var fiActv = $(this);
	
	// Grab the icon class
	var getIconClass = $.grep(this.className.split(" "), function(v, i){
       return v.indexOf('fi-') === 0;
  }).join().slice(3);
	
	$(fiActv).wrap('<div class="fi-group"/>');
	
	$(fiActv).parent().prepend('<span class="fi-group-icon"><i class="fa fa-'+getIconClass+'"></i></span>');
			
	var fiIconElement = $(fiActv).parent().find('.fa');
	
	if ($(fiActv).hasClass('inverse-icon-color')) {
		$(fiIconElement).css({'color':'#FFF'});
	}
	
	// Flag required fields
	if ($(fiActv).hasClass('required-field')) {
		$(fiIconElement).addClass('brand-color-1');
	}
	
	// Move the label as tooltip so when focused so you don't lose track of what you're doing on mobile...
	var fiLabel = $(fiActv).parent().parent().find('label.sem-label , label');
	$(fiLabel).insertBefore(fiActv);
	
	// flag label with "required"
	if ($(fiActv).hasClass('required-field')) {
		$(fiLabel).append(' :: <span class="warning">required</span>');
	}
	
	
	$(fiActv).parent().click(function(){
					
		$(this).children('input, textarea, select').focus();
		
	});
	
	
});

// DROPDOWNS

/* jQuery AddBack function */
$.fn.addBack = function (selector) {
    return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
}

/*
 * jQuery dropdown: A simple dropdown plugin
 *
 * Copyright A Beautiful Site, LLC. (http://www.abeautifulsite.net/)
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
*/
if (jQuery) (function ($) {

    $.extend($.fn, {
        dropdown: function (method, data) {

            switch (method) {
                case 'show':
                    show(null, $(this));
                    return $(this);
                case 'hide':
                    hide();
                    return $(this);
                case 'attach':
                    return $(this).attr('data-dropdown', data);
                case 'detach':
                    hide();
                    return $(this).removeAttr('data-dropdown');
                case 'disable':
                    return $(this).addClass('dropdown-disabled');
                case 'enable':
                    hide();
                    return $(this).removeClass('dropdown-disabled');
            }

        }
    });

    function show(event, object) {

        var trigger = event ? $(this) : object,
			dropdown = $(trigger.attr('data-dropdown')),
			isOpen = trigger.hasClass('dropdown-open');

        // In some cases we don't want to show it
        if (event) {
            if ($(event.target).hasClass('dropdown-ignore')) return;

            event.preventDefault();
            event.stopPropagation();
        } else {
            if (trigger !== object.target && $(object.target).hasClass('dropdown-ignore')) return;
        }
        hide();

        if (isOpen || trigger.hasClass('dropdown-disabled')) return;

        // Show it
        trigger.addClass('dropdown-open');
        dropdown
			.data('dropdown-trigger', trigger)
			.show();

        // Position it
        position();

        // Trigger the show callback
        dropdown
			.trigger('show', {
				dropdown: dropdown,
				trigger: trigger
			});

    }

    function hide(event) {

        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;

        // Are we clicking anywhere in a dropdown?
        if (targetGroup && targetGroup.is('.dropdown')) {
            // Is it a dropdown menu?
            if (targetGroup.is('.dropdown-menu')) {
                // Did we click on an option? If so close it.
                if (!targetGroup.is('A')) return;
            } else {
                // Nope, it's a panel. Leave it open.
                return;
            }
        }

        // Hide any dropdown that may be showing
        $(document).find('.dropdown:visible').each(function () {
            var dropdown = $(this);
            dropdown
				.hide()
				.removeData('dropdown-trigger')
				.trigger('hide', { dropdown: dropdown });
        });

        // Remove all dropdown-open classes
        $(document).find('.dropdown-open').removeClass('dropdown-open');

    }

    function position() {

        var dropdown = $('.dropdown:visible').eq(0),
			trigger = dropdown.data('dropdown-trigger'),
			hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
			vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;

        if (dropdown.length === 0 || !trigger) return;

        // Position the dropdown relative-to-parent...
        if (dropdown.hasClass('dropdown-relative')) {
            dropdown.css({
                left: dropdown.hasClass('dropdown-anchor-right') ?
					trigger.position().left - (dropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
					trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
            });
        } else {
            // ...or relative to document
            dropdown.css({
                left: dropdown.hasClass('dropdown-anchor-right') ?
					trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
                top: trigger.offset().top + trigger.outerHeight() + vOffset
            });
        }
    }

    $(document).on('click.dropdown', '[data-dropdown]', show);
    $(document).on('click.dropdown', hide);
    $(window).on('resize', position);

})(jQuery);