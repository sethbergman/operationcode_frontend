const fs = require('fs-extra')
const path = require('path')
const syncRequest = require('sync-request')

export function(downloadURL, destinationPath) {
	console.log(`Downloading file from GitHub Repository to ${destinationPath}`)
	const response = syncRequest('GET', downloadURL, {
		'headers': {
			'Accept': 'application/vnd.github.v3.raw',
			'User-Agent': 'Atom Build'
		}
	})

	if (response.statusCode === 200) {
		fs.mkdirpSync(path.dirname(destinationPath))
		fs.writeFileSync(destinationPath, response.body)
	} else {
		throw new Error('Error downloading file. HTTP Status ' + response.statusCode + '.')
	}
}
const config = {
	GITHUB_CLIENT_ID: "e0b1671ff764de482212",
	GITHUB_CLIENT_SECRET: "8f77dcfd6a807cff38ac558400c859f240806071"
};

const AUTH_URL_PATH = "https://api.github.com/authorizations";

export function login(name, pwd) {
	const bytes = name.trim() + ":" + pwd.trim();
	const encoded = base64.encode(bytes);

	return fetch(AUTH_URL_PATH, {
		method: "POST",
		headers: {
			Authorization: "Basic " + encoded,
			"User-Agent": "GitHub Issue Browser",
			"Content-Type": "application/json; charset=utf-8",
			Accept: "application/vnd.github.machine-man-preview+json"
		},
		body: JSON.stringify({
			client_id: GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			scopes: [
				"user", "repo"
			],
			note: "not abuse"
		})
	}).then(response => response.json().then(json => {
		if (response.status < 400) {
			return json.token;
		} else {
			throw new Error(json.message);
		}
	}));
}
