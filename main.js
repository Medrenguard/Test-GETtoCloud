document.getElementById('cloud-relative').onclick = function() {
	document.getElementById('b-accurate').classList.add('hide');
	document.getElementById('b-relative').classList.remove('hide');
};
document.getElementById('cloud-accurate').onclick = function() {
	document.getElementById('b-accurate').classList.remove('hide');
	document.getElementById('b-relative').classList.add('hide');
};
var mass = JSON.parse(decodeURI(location.search.slice(1)));
$(function () {
	$("#b-relative").jQCloud(mass, {method:'relative'});
});
$(function () {
	$("#b-accurate").jQCloud(mass, {method:'accurate', minSize: 6});
});
setTimeout(function(){$("#b-accurate").toggleClass('hide')} , 100);
