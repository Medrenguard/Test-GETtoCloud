document.getElementById('cloud-relative').onclick = function() {
	document.getElementById('b-accurate').classList.add('hide');
	document.getElementById('b-relative').classList.remove('hide');
};
document.getElementById('cloud-accurate').onclick = function() {
	document.getElementById('b-accurate').classList.remove('hide');
	document.getElementById('b-relative').classList.add('hide');
};
var mass = [];
var get = unzipRequest(location.search.slice(1));
function unzipRequest(str) {
	function unzipPhrase(phrase) {
		if (phrase.search('_') >= 0) {
			phrase = phrase.replace(/_/g, ' ');
		};
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