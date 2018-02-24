var curState = {};

document.getElementById("fld1").addEventListener('change', function(){updatePageState("fld1");});
document.getElementById("fld2").addEventListener('change', function(){updatePageState("fld2");});
document.getElementById("fld3").addEventListener('change', function(){updatePageState("fld3");});
document.getElementById("sel1").addEventListener('change', function(){updatePageState("sel1");});
document.getElementById("sel2").addEventListener('change', function(){updatePageState("sel2");});
document.getElementById("sel3").addEventListener('change', function(){updatePageState("sel3");});
document.getElementById("btn1").addEventListener('change', function(){updatePageState("btn1");});
document.getElementById("btn2").addEventListener('change', function(){updatePageState("btn2");});
document.getElementById("btn3").addEventListener('change', function(){updatePageState("btn3");});

function updatePageState(elmId){
	var val = document.getElementById(elmId).value;
	curState[elmId] = val;

	if(elmId == 'btn1'){
		delete curState['btn2'];
		delete curState['btn3'];
	}
	else if(elmId == 'btn2'){
		delete curState['btn1'];
		delete curState['btn3'];
	}
	else if(elmId == 'btn3'){
		delete curState['btn1'];
		delete curState['btn2'];
	}

	document.getElementById("curPageState").innerHTML = JSON.stringify(curState);
	console.log(elmId+":"+curState[elmId]);
}

function resetPageState(){
	/*Reset page state based*/
}