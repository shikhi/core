/*
 * Copyright (c) 2014
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

$(document).ready(function() {
	var $el = $('#postsetupchecks');
	// run setup checks then gather error messages
	$.when(
		OC.SetupChecks.checkWebDAV()
	).then(function(errors) {
		var $errorsEl = $el.find('.errors');
		$el.find('.loading').addClass('hidden');
		if (errors.length === 0) {
			$el.find('.success').removeClass('hidden');
			/*
			window.setTimeout(function() {
				location.href = OC.webroot;
			}, 3000);
			*/
		}
		else {
			for (var i = 0; i < errors.length; i++ ) {
				$errorsEl.append('<span class="error">' + errors[i] + '</span>');
			}
			$errorsEl.removeClass('hidden');
			$el.find('.hint').removeClass('hidden');
		}
	});
});
