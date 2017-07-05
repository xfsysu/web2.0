var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var existedObject;

console.log('server is starting on port 2222...');

http.createServer(myFunction).listen(2222);

function myFunction(request, response) {
	var pathname = url.parse(request.url).pathname;
	var query = url.parse(request.url).query;

	if (query && query.match(/username=/)) {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		queryUsername(query, response);
	}
	else {
		judgeByPathname(request, pathname, response);
	}
}

function queryUsername(query, response) {
	var detail = '';

	if (isUsernameExisted(query)) {
		detail = fs.readFileSync('detail/detail.html', 'utf-8');

		detail = detail.replace('用户名', '用户名:' + existedObject.username).replace('学号', '学号:' + existedObject.idNumber).replace('电话', '电话:' + existedObject.telephone).replace('邮箱', '邮箱:' + existedObject.email);
	}
	else {
		detail = fs.readFileSync('sign/sign.html', 'utf-8');
	}
	response.end(detail);
}

function isUsernameExisted(query) {
	var jsonContent = fs.readFileSync('json/user.json', 'utf-8');

	if (jsonContent == '') {
		jsonContent = "[]";
	}
	var jsonContentObject = JSON.parse(jsonContent);

	for (var i = 0; i < jsonContentObject.length; i++) {
		if (jsonContentObject[i].username == query.substring(9)) {
			existedObject = jsonContentObject[i];
			return true;
		}
	}
	return false;
}


function judgeByPathname(request, pathname, response) {
	if (pathname == '/') {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		fs.readFile('sign/sign.html', 'utf-8', (err, data)=> {
			if (err) throw err;
			response.write(data);
			response.end();
		});
	}
	else if (pathname.match(/signStyle\.css/)) {
		response.writeHead(200, {'Content-Type': 'text/css'});
		fs.readFile('sign/signStyle.css', 'utf-8', (err, data)=> {
			if (err) throw  err;
			response.write(data);
			response.end();
		});
	}
	else if (pathname.match(/jquery\.js/)) {
		response.writeHead(200, {'Content-Type': 'text/javascript'});
		fs.readFile('sign/jquery.js', 'utf-8', (err, data)=> {
			if (err) throw err;
			response.write(data);
			response.end();
		});
	}
	else if (pathname.match(/signAction\.js/)) {
		response.writeHead(200, {'Content-Type': 'text/javascript'});
		fs.readFile('sign/signAction.js', 'utf-8', (err, data)=> {
			if (err) throw err;
			response.write(data);
			response.end();
		});
	}
	else if (pathname == '/post') {
		importUserJson(request, response);
	}
	else if (pathname.match(/detailStyle\.css/)) {
		response.writeHead(200, {'Content-Type': 'text/css'});
		fs.readFile('detail/detailStyle.css', 'utf-8', (err, data)=> {
			if (err) throw  err;
			response.write(data);
			response.end();
		});
	}
	else if (pathname.match(/background\.jpg/)) {
		response.writeHead(200, {'Content-Type': 'image/jpg'});
		var data = fs.readFileSync('background/background.jpg', 'binary');

		response.write(data, 'binary');
		response.end();
	}
	else {
		response.end();
	}
}

function importUserJson(request, response) {
	var userJsonContent = '';
	var newHtmlContent = '';
	var userJson = '';

	userJson = fs.readFileSync('json/user.json', 'utf-8');
	request.on('data', function(data) {
		userJsonContent += data;
	});
	request.on('end', function() {
		userJsonContent = querystring.parse(userJsonContent);
		if (userJson == '') userJson = '[]';
		userJson = JSON.parse(userJson);
		var exist = '';
		for (var i = 0; i < userJson.length; i++) {
			for (var name in userJson[i]) {
				if (userJson[i].hasOwnProperty(name)) {
					if (userJson[i][name] == userJsonContent[name]) {
						exist = name;
						break;
					}
				}
			}
			if (exist != '') break;
		}

		response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
		if (exist != '') {
			newHtmlContent = fs.readFileSync('sign/sign.html', 'utf-8');
				if (exist.match(/username/)) {
					exist = "The username has already exist!"
				} else if (exist.match(/telephone/)) {
					exist = "The phone number has already exist!"
				} else if (exist.match(/idNumber/)) {
					exist = "The id number has already exist!"
				} else if (exist.match(/email/)) {
					exist = "The email address has already exist!"
				}
				newHtmlContent = newHtmlContent.replace('Please input your information', exist);
		}
		else {
			userJson.push(userJsonContent);
			fs.writeFile('json/user.json', JSON.stringify(userJson), function(err) {
				if (err) {
					throw err;
				}
			});
			newHtmlContent = fs.readFileSync('detail/detail.html', 'utf-8');
			newHtmlContent = newHtmlContent.replace('用户名', '用户名:' + userJsonContent.username).replace('学号', '学号:' + userJsonContent.idNumber).replace('电话', '电话:' + userJsonContent.telephone).replace('邮箱', '邮箱:' + userJsonContent.email);
		}
		response.end(newHtmlContent);
	});
}



