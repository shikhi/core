/*
 * Copyright (c) 2014
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function() {
	OC.SetupChecks = {
		/**
		 * Run the setup checks
		 *
		 * @param {Function} callback function to call after the tests run,
		 * the function receives an array of error messages
		 */
		run: function(callback) {
			var errors = [];
			this.checkWebDAV(function(success, message) {
				if (!success) {
					errors.push(message);
				}
				callback(errors);
			});
		},

		/**
		 * Check whether the WebDAV connection works.
		 *
		 * @param {Function} callback callback function
		 */
		checkWebDAV: function(callback) {
			var afterCall = function(doc, statusText, result) {
				if (result.status === 200 || result.status === 207 || result.status === 403) {
					callback(true);
				} else {
					var message = t('core', 'Your web server is not yet properly setup to allow files synchronization because the WebDAV interface seems to be broken.');
					callback(false, message);
				}
			};

			$.ajax({
				type: 'PROPFIND',
				url: OC.linkToRemoteBase('webdav'),
				data: '<?xml version="1.0"?>' +
						'<d:propfind xmlns:d="DAV:">' +
						'<d:prop><d:resourcetype/></d:prop>' +
						'</d:propfind>',
				error: afterCall,
				success: afterCall
			});
		}
	};
})();

