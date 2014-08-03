<?php
/**
 * Copyright (c) 2014 Christopher Schäpers <christopher@schaepers.it>
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 * See the COPYING-README file.
 */

namespace OC\Core\Share;

class Controller {
	public static function showShare($args) {
		\OC_Util::checkAppEnabled('files_sharing');

	        // convert the token to hex, if it's base36
		if (strlen($args['token']) != 16 && strlen($args['token']) != 32) {
			$token = \OC_Util::bc_base_convert($args['token'], 36, 16);

			// the token should have leading zeroes and needs to be padded
			if (strlen($token) != 16) {
				$padding = '';
				for ($i = 0; $i < (16 - strlen($token)); $i++) {
					$padding .= '0';
				}
				$token = $padding . $token;
			}
		} else {
			$token = $args['token'];
		}

		\OC_App::loadApp('files_sharing');
		\OC_User::setIncognitoMode(true);

		require_once \OC_App::getAppPath('files_sharing') .'/public.php';
	}
}
?>
