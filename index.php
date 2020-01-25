<!DOCTYPE html>
<html>
	<head>
		<title> SHIT SHAREit </title>
		<link rel="stylesheet" href="CSS/stylesheet.css" type="text/css"/>
		<link rel="icon" type="icon/png" href="Icons/shareit.png"/>
		<script src="common.js"></script>
		<script src="JS/upload.js" defer></script>
		<script src="JS/delete&download.js" defer></script>
	</head>

	<body>
		<h1> SHIT <span class="shareit"><span class="share">SHARE</span>it</span> </h1>
		<form id="myform" action="" method="POST"  enctype="multipart/form-data">
			<input id="file_input" class="Button" type="file" name="file[]" multiple required/>
			<br/>
			<input class="Button" id="SubmitButton" name="submit" type="submit" value="Share"/>
			<button type="button" class="Button" id="ToogleCheckboxesButton">Toogle Checkboxes</button>
			<button type="button" class="Button" id="DownloadButton">Download</button>
			<button type="button" class="Button" id="DeleteButton">Delete</button>
			<button type="button" class="Button" id="SelectAllButton">Select All</button>
		</form>
		<div>
				<div id="file_progress_bar" class="progress_bar">
					<div id="file_progress_bar_fill" class="progress_bar_fill"></div>
				</div>
				<div id="main_progress_bar" class="progress_bar">
					<div id="main_progress_bar_fill" class="progress_bar_fill"></div>
				</div>
				<button type="button" class="Button" id="RefreshButton">Refresh</button>
				<br/>
				<button type="button" class="Button" id="CancelButton">Cancel</button>
		</div>
		<h2 id="Progress">
			<span id="percentage">0</span>%
			<span id="rate">0</span>MB/s 
			<span id="time_min">0</span>m 
			<span id="time_sec">0</span>s
		</h2>
		<p id="FileLinksContainer">
			<?php
				$files= array_diff(scandir("files_for_share"),array(".",".."));
				foreach( $files as $file){
					echo "<a class='FileLink' download='$file' href='files_for_share/$file'>$file</a><input class='checkbox' type='checkbox' name='files' value='files_for_share/$file'/><br/>";
				}
			?>
		</p>
	</body>
</html>
