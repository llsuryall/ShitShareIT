const DeleteButton = _("#DeleteButton");
const DownloadButton = _("#DownloadButton");
const ToogleCheckboxesButton = _("#ToogleCheckboxesButton");
const SubmitButton = _("#SubmitButton");
const Checkboxes = _(".checkbox");
const FileLinks = _(".FileLink");
const SelectAllButton = _("#SelectAllButton");
let count=0;

function DownloadFiles(){
	console.log(count);
	if(count>Checkboxes.length-1){
		return 0;
	}
	if(Checkboxes[count].checked){
		FileLinks[count].click();
	}
	else{ 
		count++;return DownloadFiles();
	}
	count++;
	return setTimeout(DownloadFiles,500);
}

if(navigator.userAgent.indexOf("Firefox") != -1){
	for(let i =0;i<Checkboxes.length;i++){
		Checkboxes[i].style.width ='2vh';
		Checkboxes[i].style.height ='2vh';
		Checkboxes[i].style.transform ='scale(2.5)';		
		Checkboxes[i].style.margin ='0vh 0vh 0vh 3vw';
	}
}
DeleteButton.style.display = 'none';
DownloadButton.style.display = 'none';
SelectAllButton.style.display = 'none';
for(let i =0;i<Checkboxes.length;i++){
	Checkboxes[i].style.display ='none';
}
for(let i =0;i<Checkboxes.length;i++){
	Checkboxes[i].checked=false;
}

ToogleCheckboxesButton.onclick = toogleAll;
function toogleAll(){
	if(Checkboxes[0].style.display =='inline-block'){
		for(let i =0;i<Checkboxes.length;i++){
			Checkboxes[i].checked=false;
		}
	}
	toogleVisibility(DeleteButton,'inline');
	toogleVisibility(DownloadButton,'inline');
	toogleVisibility(SubmitButton,'inline');
	toogleVisibility(SelectAllButton,'inline');
	toogleVisibility(Checkboxes,'inline-block',true);
}

DownloadButton.onclick = function(){ count=0;DownloadFiles();};

DeleteButton.onclick = function(){
	let str = "com = rm -R -f ";
	let con=0;
	for(let i =0;i<Checkboxes.length;i++){
		if(Checkboxes[i].checked){
			con++;
			str = str +'"../'+ Checkboxes[i].value+ '" ';
		}
	}
	if(con>=1){
		let xhttp = new XMLHttpRequest();
		xhttp.open('POST','PHP_Scripts/delete.php');
		xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhttp.send(str);
		xhttp.onload = function(){
			window.location=window.location;
		}
	}
}

SelectAllButton.onclick = function(){
	for(let i=0;i<Checkboxes.length;i++){
		Checkboxes[i].checked = true;
	}
}
