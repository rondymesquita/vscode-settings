const { writeFileSync, readFileSync } = require('fs')
const https = require('https');

const fetch = (url) => {
	return new Promise((resolve, reject) => {
	https.get(url, (resp) => {

			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				console.log(JSON.parse(data));
				resolve(JSON.parse(data))
			});

		}).on("error", (err) => {
			reject(err)
			// console.log("Error: " + err.message);
		});
	})

}

const getExtensionInfo = async (id) => {

	console.log(`Getting ${id} info`);
	const url = `https://open-vsx.org/api/-/query?extensionId=${id}`
	const result = await fetch(url)
	// console.log('res', result);
	return result
}


;(async function (){
	console.log("ℹ️  Getting extensions info");

	const extensions = JSON.parse(readFileSync('./extensions.json').toString())
	console.log([extensions[0]]);
	// const extensions = new Array(['adpyke.codesnap'])

	const infos = []
	// .forEach(async (extension) => {
		for (let index = 0; index < extensions.length; index++) {
			const extension = extensions[index];
			const info = await getExtensionInfo(extension)
			console.log('info', info);
			infos.push(info)
	}

	console.log('infos', infos);
	writeFileSync('./dist/result.json', JSON.stringify(infos))
	console.log("✔️ Extensions info downloaded");
})()
