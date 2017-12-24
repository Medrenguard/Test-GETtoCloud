document.getElementById('cloud-relative').onclick = function() {
	document.getElementById('b-accurate').classList.add('hide');
	document.getElementById('b-relative').classList.remove('hide');
};
document.getElementById('cloud-accurate').onclick = function() {
	document.getElementById('b-accurate').classList.remove('hide');
	document.getElementById('b-relative').classList.add('hide');
};

// Decode block

var rt = {};

rt['%E0']='%D0%B0';rt['%E1']='%D0%B1';rt['%E2']='%D0%B2';rt['%E3']='%D0%B3';rt['%E4']='%D0%B4';
rt['%E5']='%D0%B5';rt['%B8']='%D1%91';rt['%E6']='%D0%B6';rt['%E7']='%D0%B7';rt['%E8']='%D0%B8';
rt['%E9']='%D0%B9';rt['%EA']='%D0%BA';rt['%EB']='%D0%BB';rt['%EC']='%D0%BC';rt['%ED']='%D0%BD';
rt['%EE']='%D0%BE';rt['%EF']='%D0%BF';rt['%F0']='%D1%80';rt['%F1']='%D1%81';rt['%F2']='%D1%82';
rt['%F3']='%D1%83';rt['%F4']='%D1%84';rt['%F5']='%D1%85';rt['%F6']='%D1%86';rt['%F7']='%D1%87';
rt['%F8']='%D1%88';rt['%F9']='%D1%89';rt['%FC']='%D1%8C';rt['%FB']='%D1%8B';rt['%FA']='%D1%8A';
rt['%FD']='%D1%8D';rt['%FE']='%D1%8E';rt['%FF']='%D1%8F';rt['%C0']='%D0%90';rt['%C1']='%D0%91';
rt['%C2']='%D0%92';rt['%C3']='%D0%93';rt['%C4']='%D0%94';rt['%C5']='%D0%95';rt['%A8']='%D0%81';
rt['%C6']='%D0%96';rt['%C7']='%D0%97';rt['%C8']='%D0%98';rt['%C9']='%D0%99';rt['%CA']='%D0%9A';
rt['%CB']='%D0%9B';rt['%CC']='%D0%9C';rt['%CD']='%D0%9D';rt['%CE']='%D0%9E';rt['%CF']='%D0%9F';
rt['%D0']='%D0%A0';rt['%D1']='%D0%A1';rt['%D2']='%D0%A2';rt['%D3']='%D0%A3';rt['%D4']='%D0%A4';
rt['%D5']='%D0%A5';rt['%D6']='%D0%A6';rt['%D7']='%D0%A7';rt['%D8']='%D0%A8';rt['%D9']='%D0%A9';
rt['%DC']='%D0%AC';rt['%DB']='%D0%AB';rt['%DA']='%D0%AA';rt['%DD']='%D0%AD';rt['%DE']='%D0%AE';
rt['%DF']='%D0%AF';


function convert_from_cp1251(str) {
	var ret='';

	var l=str.length;
	var i=0;
	while (i<l) {

		var f=0;
		for (keyVar in rt) {
			if (str.substring(i,i+3)==keyVar) {ret+=rt[keyVar];i+=3;f=1;}
			}

		if (!f) {ret+=str.substring(i,i+1);i++;}
		}

	try {ret=decodeURIComponent((ret + '').replace(/\+/g, '%20'));}
	catch (e) {}
	return ret;
}

// Decode off


var mass = [];
var get = unzipRequest(location.search.slice(1));
function unzipRequest(str) {
	function unzipPhrase(phrase) {
		if (phrase.search('_') >= 0) {
			phrase = phrase.replace(/_/g, ' ');
		};
		if (phrase.search('`') >= 0) {
			phrase = phrase.replace(/`/g, '\'');
		};
		if (phrase.search('%') >= 0) {debugger;
			phrase = convert_from_cp1251(phrase);
		}
		return phrase;
	};
	str = str.split('|');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].split(':');
		mass.push({text: unzipPhrase(str[i][0]), weight: Number(str[i][1])});
	};
	return str;
};
$(function () {
	$("#b-relative").jQCloud(mass, {method:'relative'});
});
$(function () {
	$("#b-accurate").jQCloud(mass, {method:'accurate', minSize: 6});
});
setTimeout(function(){$("#b-accurate").toggleClass('hide')} , 100);