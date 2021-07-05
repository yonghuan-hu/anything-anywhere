function dropHandler(ev) {
	console.log('dropHandler() dropped');
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			var datatype = ev.dataTransfer.items[i].kind;
			console.log(datatype);
			if (datatype === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile();
				console.log('... file[' + i + '].name = ' + file.name);
				var reader = new FileReader();
				reader.onload = function(e) {
					var fileContent = e.target.result; // binary data
					submit(4141, file.name, fileContent);
				};
				reader.onerror = function(e) {
					// error occurred
					console.log('Error : ' + e.type);
				};
				reader.readAsBinaryString(file);
			}
			else if (datatype === 'string') {

			}
			else {

			}
		}
	} else {
		// Use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
		console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
		}
	}
}

function dragOverHandler(ev) {
	console.log('dragOverHandler() triggered');
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
	// prompt user to drop file
	var prompt = document.getElementById("drop_prompt");
	prompt.style.visibility = "visible";
}

function submit(uid, filename, content) {
	console.log("submit() triggered");
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

function get(uid, filename) {
	console.log("submit() triggered");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
			alert(this.responseText);
			var content = this.responseText;
			var blob = new Blob([content], { type: 'text/plain' });
            var file = new File([blob], filename, { type: 'text/plain' });
			file
         }
    };
    request.open("GET", 
		"https://nuept8nnrj.execute-api.us-west-2.amazonaws.com/default/anything-anywhere?"
		+ 'uid=' + uid + '&' + 'filename=' + filename
	, true);
	request.setRequestHeader("Content-type", "application/json");
    request.send();
}