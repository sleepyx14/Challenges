var curState = {};
var beefyLipsumURL = 'https://baconipsum.com/api/?type=meat-and-filler';

document.getElementById("fld1").addEventListener('change', function(){updatePageState("fld1");});
document.getElementById("fld2").addEventListener('change', function(){updatePageState("fld2");});
document.getElementById("fld3").addEventListener('change', function(){updatePageState("fld3");});

document.getElementById("sel1").addEventListener('change', function(){updatePageState("sel1");});
document.getElementById("sel2").addEventListener('change', function(){updatePageState("sel2");});
document.getElementById("sel3").addEventListener('change', function(){updatePageState("sel3");});

document.getElementById("btn1").addEventListener('change', function(){updatePageState("btn1");});
document.getElementById("btn2").addEventListener('change', function(){updatePageState("btn2");});
document.getElementById("btn3").addEventListener('change', function(){updatePageState("btn3");});

document.getElementById("save").addEventListener('click', function(){savePageState();});
document.getElementById("reset").addEventListener('click', function(){resetPageState();});

document.getElementById("GETbl1").addEventListener('click', function(){
																getAjax(beefyLipsumURL,
																function(data){
																	handleBeefyAjaxData(data,'fld1');
																});
															});
document.getElementById("GETbl2").addEventListener('click', function(){
																getAjax(beefyLipsumURL,
																function(data){
																	handleBeefyAjaxData(data,'fld2');
																});
															});
document.getElementById("GETbl3").addEventListener('click', function(){
																getAjax(beefyLipsumURL,
																function(data){
																	handleBeefyAjaxData(data,'fld3');
																});
															});



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
	// console.log(elmId+":"+curState[elmId]);
	console.log(curState);
}

function savePageState(){
	var copyTextarea = document.querySelector('#curPageState');
	copyTextarea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		/* console.log('Copying text command was ' + msg); */
	}
	catch (err) {
		/* console.log('Oops, unable to copy:'+ err); */
	}
}

function resetPageState(){
	var val = document.getElementById("curPageState").value;
	var jVal = JSON.parse(val);

	for(key in jVal){
		/* console.log("key:"+key+" ,value:"+jVal[key]); */
			if(key == 'btn1'){
				document.getElementById('btn1').checked=true;
				document.getElementById('btn2').checked=false;
				document.getElementById('btn3').checked=false;
			}
			else if(key == 'btn2'){
				document.getElementById('btn2').checked=true
				document.getElementById('btn1').checked=false;
				document.getElementById('btn3').checked=false;
			}
			else if(key == 'btn3'){
				document.getElementById('btn3').checked=true
				document.getElementById('btn1').checked=false;
				document.getElementById('btn2').checked=false;
			}

			document.getElementById(key).value = jVal[key];
	}
}

function getAjax(url, success) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState>3 && xhr.status==200){
			success(xhr.responseText);
		}
	};

	xhr.send();
	return xhr;
}

function handleBeefyAjaxData(data,elmId){
	var jData = JSON.parse(data);
	/* console.log(data); */
	var beefyLipsum = '';

	for(key in jData){
		beefyLipsum += jData[key]+'\n';
	}
	document.getElementById(elmId).value = beefyLipsum;
	updatePageState(elmId);
}