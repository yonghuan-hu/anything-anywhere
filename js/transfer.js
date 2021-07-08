function uploadFile(uid, filename, content) {
	console.log("uploadFile() triggered");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    request.open("POST", "https://nuept8nnrj.execute-api.us-west-2.amazonaws.com/default/anything-anywhere", true);
	request.setRequestHeader("Content-type", "application/json");
	var body = JSON.stringify({'uid': uid, 'filename': filename, 'content': content});
	request.send(body);
}

function getFileContent(uid, filename) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			var content = this.responseText;
			var blob = new Blob([content], { type: 'text/plain' });
            var file = new File([blob], filename, { type: 'text/plain' });
			// file
         }
    };
    request.open("GET", 
		"https://nuept8nnrj.execute-api.us-west-2.amazonaws.com/default/anything-anywhere"
		+ '/' + uid + '/' + filename
	, true);
	request.setRequestHeader("Content-type", "application/json");
    request.send();
}

function getFileList(uid, callback) {
    var request = new XMLHttpRequest();
    request.responseType = "json";
	request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			callback(this.response);
        }
    };
    request.open("GET", 
		"https://nuept8nnrj.execute-api.us-west-2.amazonaws.com/default/anything-anywhere"
		+ "/" + uid
	, true);
	request.setRequestHeader("Content-type", "application/json");
    request.send();
}