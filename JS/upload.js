const myform = _("#myform");
const percentage = _("#percentage");
const rate = _("#rate");
const time_min = _("#time_min");
const time_sec = _("#time_sec");
const Progress= _("#Progress");
const progress_bar = _(".progress_bar")[0];
const progress_bar_fill = _(".progress_bar_fill")[0];
const myOtherConst = 1024*1024;
const myConstant = 1000/myOtherConst;
let DateObject;
let timeout = setTimeout(function(){},1000);
let loadedTime = 0;
let diff = 0;
let flag = false;

function toogleWhileSharing(){
	toogleVisibility(progress_bar,'inline-block');
	toogleVisibility(myform,'block');
	toogleVisibility(Progress,'block');
}

function updateSpeed(){
	rate.innerHTML = 0;
	time_min.innerHTML = "--";
	time_sec.innerHTML = "--";
	flag = true;
}

function uploadFile(){
	let formdata = new FormData(myform);
	let xhttp = new XMLHttpRequest();
	let ratioLoaded = 0;
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
		timeRemainingInSecs = parseInt((e.total-e.loaded)/(parseFloat(rate.innerHTML)*myOtherConst));
		time_min.innerHTML = Math.floor(timeRemainingInSecs/60);
		time_sec.innerHTML = timeRemainingInSecs % 60;
		progress_bar_fill.style.width = (ratioLoaded*60).toFixed(2) + 'vw';
		timeout = setTimeout(updateSpeed,2000);
	};
	xhttp.send(formdata);
	xhttp.onload = function(){
		window.location = window.location;
	};
}

progress_bar.style.display = 'none';
Progress.style.display = 'none';
myform.onsubmit = function (el) { 	
	el.preventDefault();
	toogleWhileSharing();
	uploadFile();
};
