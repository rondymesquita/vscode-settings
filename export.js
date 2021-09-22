const { writeFileSync } = require('fs')
const { exec } = require("child_process");
const { promisify } = require('util');
const shell = promisify(exec)

const cmd = "code --list-extensions"

console.log("ℹ️ Exporting extensions...");
shell(cmd).then(({stdout}) => {
	const extensions = stdout.trim().split("\n")
	writeFileSync('extensions.json', JSON.stringify(extensions, null, 2))
	console.log("✔️ Extensions exported successfully!");
})
