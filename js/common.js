let uid = 666;
let fileList = [];

window.onload = function() {
	getFileList(uid, function(fileListRemote){
		fileList = fileListRemote;
		fileList.forEach(filename => {
			console.log(filename);
		});
	});
};