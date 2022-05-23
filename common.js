function _(selector){
	let identifier = selector.slice(0,1);
	let name = selector.slice(1,selector.length);
	if(identifier=="#"){
		return document.getElementById(name);
	}
	else if (identifier=="."){
		return document.getElementsByClassName(name);
	}
	else{
		return document.getElementsByTagName(identifier+name);
	}
}

function toogleVisibility(element,display_style,multiple=false){
	if(multiple){
		for(let i =0;i<element.length;i++){
			element[i].style.display = (element[i].style.display=='none'?display_style:'none');
		}
	}
	else{
		element.style.display = (element.style.display=='none'?display_style:'none');
	}
}
