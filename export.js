const { writeFileSync } = require('fs')
const { list } = require('./util');

(async function (){
	console.log("ℹ️ Exporting extensions...");
	const extensions = await list()
	writeFileSync('extensions.json', JSON.stringify(extensions, null, 2))
	console.log("✔️ Extensions exported successfully!");
})()
