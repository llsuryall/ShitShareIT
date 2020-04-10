<?php
	if(file_exists($_POST['dir'])){
		$path = $_POST['dir'];
	}
	else{
		$path = "/var/www/share/files_for_share";
		echo "<p align='center' style='color:white;'>That directory does not exist! Opening default directory...</p>";
	}
	$files= array_diff(scandir("$path"),array("."));
	shell_exec('rm -rf ../temp/* ../temp/.*');
	foreach( $files as $file){
		if(is_dir("$path/$file")){
			echo "<div class='linkcontainer'><input class='checkbox' type='checkbox' name='files' value='$path/$file'/><span class='dir' onclick='path=\"$path/$file\";reloadFileLinks();if(checkbox_flag){toogleAll();}'>$file</span></div>";
		}
		else{
			shell_exec("ln -s '$path/$file' '../temp/$file'");
			echo "<div class='linkcontainer'><input class='checkbox' type='checkbox' name='files' value='$path/$file'/><a class='FileLink' download='$file' href='./temp/$file'>$file</a></div>";
		}
	}
?>
