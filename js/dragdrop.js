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
					uploadFile(uid, file.name, fileContent);
				};
				reader.onerror = function(e) {
					// error occurred
					console.log('Error : ' + e.type);
				};
				reader.readAsBinaryString(file);
			}
			else if (datatype === 'string') {
				var str = ev.dataTransfer.getData("text");
				uploadFile(uid, String(Date.now()), str);
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
