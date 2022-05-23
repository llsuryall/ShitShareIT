<?php
//	$path = "/var/www/share/files_for_share";
	$path = "/mnt/Windows1/Share";
//	$path = "/mnt/Linux1/Share";
	if(!empty($_FILES['file'])){
		move_uploaded_file($_FILES['file']['tmp_name'],"$path/".$_FILES['file']['name']);
	}
?>
