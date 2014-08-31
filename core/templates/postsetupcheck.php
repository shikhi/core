<div id="postsetupchecks" class="update" data-doclink="<?php p(\OC_Helper::linkToDocs('admin-install')) ?>">
	<h2 class="title bold"><?php p($l->t('Running post setup checks')) ?></h2>
	<div class="loading"></div>
	<div class="errors hidden">
	</div>
	<div class="hint hidden">
		<span class="error"><?php
			print_unescaped($l->t('Please double check the <a href=\'%s\'>installation guides</a>.', \OC_Helper::linkToDocs('admin-install')));
		?></span>
	</div>
</div>
