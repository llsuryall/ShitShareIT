<?php
	if(!empty($_FILES['file'])){
		if(!empty($_FILES['file']['name'])){
			foreach($_FILES['file']['name'] as $key => $file_name){
				move_uploaded_file($_FILES['file']['tmp_name'][$key],'../files_for_share/'.$file_name);
			}
		}
	}
?>
