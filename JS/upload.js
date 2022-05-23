const myform = _("#myform");
const percentage = _("#percentage");
const rate = _("#rate");
const FileLinksContainer = _("#FileLinksContainer");
const time_min = _("#time_min");
const time_sec = _("#time_sec");
const Progress= _("#Progress");
const RefreshButton = _("#RefreshButton");
const main_progress_bar = _("#main_progress_bar");
const main_progress_bar_fill = _("#main_progress_bar_fill");
const file_progress_bar = _("#file_progress_bar");
const file_progress_bar_fill = _("#file_progress_bar_fill");
const CancelButton = _("#CancelButton");
const myOtherConst = 1024*1024;
const myConstant = 1000/myOtherConst;
let DateObject;
let timeout = setTimeout(function(){},1000);
let loadedTime = 0;
let flag = false;

function setPath(){
	path = Path.value;
}

function toogleWhileSharing(){
	toogleVisibility(main_progress_bar,'inline-block');
	toogleVisibility(file_progress_bar,'inline-block');
	toogleVisibility(myform,'block');
	toogleVisibility(Path,'inline-block');
	toogleVisibility(ToogleCheckboxesButton,'inline-block');
	toogleVisibility(Progress,'block');
	toogleVisibility(CancelButton,'inline-block');
	toogleVisibility(RefreshButton,'inline-block');
}

function updateSpeed(){
	rate.innerHTML = 0;
	time_min.innerHTML = "--";
	time_sec.innerHTML = "--";
	flag = true;
}

function reloadFileLinks(){
	let xhr = new XMLHttpRequest();
	xhr.open("POST","PHP_Scripts/filelink.php");
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("dir="+path);
	xhr.onload = function(){
		FileLinksContainer.innerHTML = xhr.responseText;
		for(let i =0;i<Checkboxes.length;i++){
			Checkboxes[i].style.display = 'none';
		}
		if(navigator.userAgent.indexOf("Firefox") != -1){
			for(let i =0;i<Checkboxes.length;i++){
				Checkboxes[i].style.width ='2vh';
				Checkboxes[i].style.height ='2vh';
				Checkboxes[i].style.transform ='scale(2.5)';
				Checkboxes[i].style.margin ='0 1vw 0 3vw';
			}
		}
	}
}

function uploadEachFile(no,done,total){
	if(typeof(file_input.files[no])!="undefined"){
		let formdata = new FormData();
		formdata.append("file",file_input.files[no]);
		let xhttp = new XMLHttpRequest();
		let ratioLoaded = 0;
		let diff=0;
		xhttp.open("POST",'PHP_Scripts/upload.php');
		DateObject = new Date();
		firstLoadedTime = DateObject.getTime();
		xhttp.upload.onprogress = function (e) {
			DateObject = new Date();
			clearTimeout(timeout);
			if(flag){
				flag=false;
				diff += DateObject.getTime()-loadedTime;
			}		
			loadedTime = DateObject.getTime();
			rate.innerHTML = ((e.loaded)*myConstant/(loadedTime-firstLoadedTime-diff)).toFixed(2);
			ratioLoaded = (e.loaded/e.total);
			percentage.innerHTML = (100*ratioLoaded).toFixed(2);
			timeRemainingInSecs = parseInt((total-done-e.loaded)/(parseFloat(rate.innerHTML)*myOtherConst));
			time_min.innerHTML = Math.floor(timeRemainingInSecs/60);
			time_sec.innerHTML = timeRemainingInSecs % 60;
			file_progress_bar_fill.style.width = (ratioLoaded*60).toFixed(2) + 'vw';
			main_progress_bar_fill.style.width = ((done+e.loaded)*60/total).toFixed(2) + 'vw';
			timeout = setTimeout(updateSpeed,2000);
		};
		xhttp.send(formdata);
		xhttp.onload = function(){
			clearTimeout(timeout);
			updateSpeed();
			flag = false;
			reloadFileLinks();
			done+= file_input.files[no].size;no++;
			uploadEachFile(no,done,total);
		};
	}
	else{
		toogleWhileSharing();
		reloadFileLinks();
	}
}

CancelButton.style.display = 'none';
RefreshButton.style.display = 'inline-block';
file_progress_bar.style.display = 'none';
main_progress_bar.style.display = 'none';
Progress.style.display = 'none';
myform.onsubmit = function (el) {
	el.preventDefault();
	toogleWhileSharing();
	let total = 0;
	let no = 0;
	while(typeof(file_input.files[no])!="undefined"){
		total+=file_input.files[no].size;
		no++;
	}
	uploadEachFile(0,0,total);
};

CancelButton.onclick = function(){
	toogleWhileSharing();
	window.location = window.location;
};

RefreshButton.onclick = function(){
	setPath();
	reloadFileLinks();
};
