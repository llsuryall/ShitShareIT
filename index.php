<!DOCTYPE html>
<html>
	<head>
		<title> SHIT SHAREit </title>
		<meta charset="utf-8" name="viewport" content="user-scalable=no"/>
		<meta name="theme-color" content="#2790fb"/>
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
		</form>
		<div>
				<div id="file_progress_bar" class="progress_bar">
					<div id="file_progress_bar_fill" class="progress_bar_fill"></div>
				</div>
				<div id="main_progress_bar" class="progress_bar">
					<div id="main_progress_bar_fill" class="progress_bar_fill"></div>
				</div>
				<input id="Path" class="TextInput" type="text"/><br id="PathLB"/>
				<input type="button" class="Button" id="RefreshButton" value="Refresh">
				<input type="button" class="Button" id="ToogleCheckboxesButton" value="Toogle Checkboxes"/>
				<input type="button" class="Button" id="DownloadButton" value="Download"/>
				<input type="button" class="Button" id="DeleteButton" value="Delete"/>
				<input type="button" class="Button" id="SelectAllButton" value="Select All"/>
				<input type="button" class="Button" id="CancelButton" value="Cancel">
		</div>
		<h2 id="Progress">
			<span id="percentage">0</span>%
			<span id="rate">0</span>MB/s 
			<span id="time_min">0</span>m 
			<span id="time_sec">0</span>s
		</h2>
		<p id="FileLinksContainer">
		</p>
		<script>
			let path = "/var/www/share/files_for_share";
			window.onload = function(){ reloadFileLinks();}
		</script>
	</body>
</html>
