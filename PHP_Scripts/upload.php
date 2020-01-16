<?php
	if(!empty($_FILES['file'])){
		move_uploaded_file($_FILES['file']['tmp_name'],'../files_for_share/'.$_FILES['file']['name']);
	}
?>
