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


(async function () {
	console.log("ℹ️ Importing extensions...");
	const EXTENSIONS_FILE = "./extensions.json"

	const exists = existsSync(EXTENSIONS_FILE)
	if (!exists) {
		console.log(`❗The ${EXTENSIONS_FILE} file does not exist. Exiting.`);
		return
	}

	const extensions = JSON.parse(readFileSync(EXTENSIONS_FILE).toString());

	const installedExtensions = await list()

	const extensionsToUninstall = installedExtensions.filter((e) => {
		return !extensions.includes(e)
	})

	const extensionsToInstall = extensions.filter((e) => {
		return !installedExtensions.includes(e)
	})

	const alreadyInstalled = installedExtensions.filter((e) => {
		return extensions.includes(e)
	})

	if (extensionsToUninstall.length && extensionsToUninstall.length > 0) {
		console.log(extensionsToUninstall);
		const resp = await question("Above extensions will be uninstalled. Proceed? [y/n]: ")

		if (resp === "y") {
			await uninstall(extensionsToUninstall)
			console.log("✔️ Extensions uninstalled!");
		}
	}

	if (!extensionsToInstall.length) {
		console.log("✔️ Nothing to install. Extensions updated!");
	} else {
		await install(extensionsToInstall)
		console.log("✔️ Extensions updated!");
	}

	readline.close()
	readline.on("close", function () {
		process.exit(0);
	});
})()
