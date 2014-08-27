<?php
/**
 * @author Jörn Friedrich Dreyer
 * @copyright (c) 2014 Jörn Friedrich Dreyer <jfd@owncloud.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Files_Skeleton;

class Skeleton {

	public static function copySkeleton($params) {
		$user = \OC::$server->getUserManager()->get($params['user']);
		if ($user) {
			$skeletonDirectory = \OCP\Config::getSystemValue('skeletondirectory', \OC::$SERVERROOT . '/core/skeleton');
			$userDirectory = $user->getHome() . '/files';

			if (!empty($skeletonDirectory)) {
				\OCP\Util::writeLog(
					'files_skeleton',
					'copying skeleton for '.$user->getDisplayName().' ('.$user->getUID().') from '.$skeletonDirectory.' to '.$userDirectory,
					\OCP\Util::DEBUG
				);
				\OC_Util::copyr($skeletonDirectory, $userDirectory);
			}
		}
	}

}
