// Check every 20 seconds via status.php if maintenance is over
var timer = window.setInterval(checkStatus, 20000);

function checkStatus() {
	var request = new XMLHttpRequest();
	request.open("GET", '/status.php', true);
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			var response = request.responseText;
			responseobj = JSON.parse(response);
			if (responseobj.maintenance === 'false') {
				window.location.reload();
			}
		}
	}
};
