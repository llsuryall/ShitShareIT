<?php
	$files= array_diff(scandir("../files_for_share"),array(".",".."));
	foreach( $files as $file){
		echo "<a class='FileLink' download='$file' href='files_for_share/$file'>$file</a><input class='checkbox' type='checkbox' name='files' value='files_for_share/$file'/><br/>";
	}
?>
