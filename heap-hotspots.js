(function() {

	if(!window.heapHotspotToggle) {
		window.heapHotspotToggle = 1;
	}
	else {
		window.heapHotspotToggle = 0;
		$('.chg-tracking-label').remove();
		$('.chg-tracking-section').removeClass('chg-tracking-section');
		$('.chg-tracking-entity').removeClass('chg-tracking-entity');
		return;
	}

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.chg-tracking-section {\
	box-shadow: 0 0 0 1px white inset, 0 0 0 4px red inset !important;\
}\
\
.chg-tracking-entity {\
	box-shadow: 0 0 0 1px white inset, 0 0 0 4px blue inset !important;\
}\
\
.chg-tracking-label {\
	position: absolute;\
	background-color: white;\
	font-size: 11px;\
	font-family: $family-01;\
	font-weight: normal;\
	padding: 3px 5px;\
	opacity: 0.8;\
	z-index: 100;\
}';
	document.getElementsByTagName("head")[0].appendChild(style);

	var sectionPrefix = '(chgsec_|chgser_|chgsub_)';
	var entityPrefix = '(chgent_|chgentid_)';
	 
	$('[class*=chgsec_]').each(function(i, el) {
		var $el = $(el);
		var className = $el.attr('class');
		var regex = new RegExp('(^|\\s)' + sectionPrefix + '[^ ]*', 'g');
		var matches = className.match(regex);
		if(!matches) {
			return;
		}
		$el.addClass('chg-tracking-section');
		var offset = $el.offset();
		var label = $('<div class="chg-tracking-label" style="color: red;">' + matches.join() + '</div>');
		$el.prepend(label);
		label.offset(offset);
	});
	 
	$('[class*=chgent_]').each(function(i, el) {
		var $el = $(el);
		var className = $el.attr('class');
		var regex = new RegExp('(^|\\s)' + entityPrefix + '[^ ]*', 'g');
		var matches = className.match(regex);
		if(!matches) {
			return;
		}
		$el.addClass('chg-tracking-entity');
		var offset = $el.offset();
		var label = $('<div class="chg-tracking-label" style="color: blue;">' + matches.join() + '</div>');
		$el.prepend(label);
		label.offset(offset);
	});
})();
