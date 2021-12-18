const { existsSync, readFileSync } = require('fs')
const rl = require("readline");
const { install, uninstall, list } = require('./util');

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
	return new Promise(resolve => {
			readline.question(query, resolve);
	})
}


(async function (){
	const resp = await question("Uninstall all extensions? [y/n]: ")

	if (resp === "y") {
		const installedExtensions = await list()
		await uninstall(installedExtensions)
		console.log("✔️ Extensions uninstalled!");
	}

	readline.close()
	readline.on("close", function() {
    process.exit(0);
	});
})()
