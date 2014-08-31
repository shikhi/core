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
		 * Check whether the WebDAV connection works.
		 *
		 * @return $.Deferred object resolved with an array of error messages
		 */
		checkWebDAV: function() {
			var deferred = $.Deferred();
			var afterCall = function(doc, statusText, result) {
				var messages = [];
				if (result.status !== 200 && result.status !== 207 && result.status !== 401) {
					messages.push(
						t('core', 'Your web server is not yet properly setup to allow files synchronization because the WebDAV interface seems to be broken.')
					);
				}
				deferred.resolve(messages);
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
			return deferred.promise();
		},

		/**
		 * Runs setup checks on the server side
		 *
		 * @return $.Deferred object resolved with an array of error messages
		 */
		checkSetup: function() {
			var deferred = $.Deferred();
			var afterCall = function(doc, statusText, result) {
				var messages = [];
				if (result.status === 200) {
					if (!result.serverhasinternetconnection) {
						messages.push(
							t('core', 'This server has no working internet connection. This means that some of the features like mounting of external storage, notifications about updates or installation of 3rd party apps don´t work. Accessing files from remote and sending of notification emails might also not work. We suggest to enable internet connection for this server if you want to have all features.')
						);
					}
				} else {
					messages.push(t('core', 'Error occurred while checking server setup'));
				}
				deferred.resolve(messages);
			};

			$.ajax({
				type: 'GET',
				url: OC.filePath('settings', 'ajax', 'checksetup.php'),
				error: afterCall,
				success: afterCall
			});
			return deferred.promise();
		}
	};
})();

