const { existsSync, readFileSync } = require('fs')
const { exec } = require("child_process");
const { promisify } = require('util');
const shell = promisify(exec)

const EXTENSIONS_FILE = "./extensions.json"

console.log("ℹ️ Importing extensions...");

const exists = existsSync(EXTENSIONS_FILE)
if (!exists) {
	console.log("❗The 'extensions.json' file does not exist. Exiting.");
	return
}

const extensions = JSON.parse(readFileSync(EXTENSIONS_FILE).toString());

(async function (){
	for (let extension of extensions) {
		console.log(`ℹ️ Installing ${extension}`);
		const cmd = `code --install-extension ${extension}`
		const { stdout } = await shell(cmd)
		console.log(stdout);
		console.log();
	}
})()

console.log("✔️ Extensions installed!");
