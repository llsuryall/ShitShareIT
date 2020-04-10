const DeleteButton = _("#DeleteButton");
const DownloadButton = _("#DownloadButton");
const ToogleCheckboxesButton = _("#ToogleCheckboxesButton");
const SubmitButton = _("#SubmitButton");
const Checkboxes = _(".checkbox");
const FileLinks = _(".FileLink");
const Path = _("#Path");
const PathLB = _("#PathLB");
const SelectAllButton = _("#SelectAllButton");
let checkbox_flag=0;
let count=0;

function DownloadFiles(){
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
RefreshButton.style.display = 'inline-block';
DeleteButton.style.display = 'none';
DownloadButton.style.display = 'none';
SelectAllButton.style.display = 'none';
Path.style.display = 'inline-block';
PathLB.style.display = 'initial';
ToogleCheckboxesButton.style.display = 'inline-block';
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
	checkbox_flag = !checkbox_flag;
	toogleVisibility(RefreshButton,'inline-block');
	toogleVisibility(DeleteButton,'inline-block');
	toogleVisibility(DownloadButton,'inline-block');
	toogleVisibility(myform,'block');
	toogleVisibility(SelectAllButton,'inline-block');
	toogleVisibility(Checkboxes,'inline-block',true);
	toogleVisibility(Path,'inline-block');
	toogleVisibility(PathLB,'initial');
}

DownloadButton.onclick = function(){ count=0;DownloadFiles();};

DeleteButton.onclick = function(){
	let str = "com = rm -R -f ";
	let con=0;
	for(let i =0;i<Checkboxes.length;i++){
		if(Checkboxes[i].checked){
			con++;
			str = str +'"' + Checkboxes[i].value+ '" ';
		}
	}
	if(con>=1){
		let xhttp = new XMLHttpRequest();
		xhttp.open('POST','PHP_Scripts/delete.php');
		xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhttp.send(str);
		xhttp.onload = function(){
			reloadFileLinks();toogleAll();
		}
	}
}

Path.onchange = function (){
	setPath();
	reloadFileLinks();
};

SelectAllButton.onclick = function(){
	for(let i=0;i<Checkboxes.length;i++){
		Checkboxes[i].checked = true;
	}
}
