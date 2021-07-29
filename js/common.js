let uid = 666;
let fileList = [];
let bgAngle = 135;

window.onload = function() {
	getFileList(uid, function(fileListRemote){
		fileList = fileListRemote;
		fileList.forEach(filename => {
			console.log(filename);
		});
		drawFiles();
	});
};

function drawFiles() {
	let overlay = document.createElement("div");
	overlay.setAttribute("class", "overlay center");
	let btnSave = document.createElement("button");
	btnSave.setAttribute("class", "btn btn-primary btn-sm");
	btnSave.innerHTML = "💾 Save";
	overlay.appendChild(btnSave);
	let btnDelete = document.createElement("button");
	btnDelete.setAttribute("class", "btn btn-danger btn-sm");
	btnDelete.innerHTML = "❌ Delete";
	overlay.appendChild(btnDelete)
	var dropZone = document.getElementById("cards");
	fileList.forEach(filename => {
		let card = document.createElement("div");
		card.setAttribute("class", "card m-1 p-0");
		card.appendChild(overlay);
		let header = document.createElement("div");
		header.setAttribute("class", "card-header");
		header.innerHTML = filename;
		card.appendChild(header);
		if (filename.includes(".")) {
			var extension = filename.split('.').pop();
			let img = document.createElement("img");
			// img.setAttribute("class", "card-img-top");
			img.setAttribute("src", "img/file.svg");
			card.appendChild(img);
		}
		else {
			let text = document.createElement("p");
			getFileContent(uid, filename, function(fileContent){
				text.innerHTML = fileContent;
			});
			card.appendChild(text);
		}

		dropZone.appendChild(card);
	});
	
}