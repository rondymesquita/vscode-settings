const { exec } = require("child_process");
const { promisify } = require('util');
const shell = promisify(exec);

exports.install = async (extensions) => {
	for (let extension of extensions) {
		console.log(`ℹ️ Installing ${extension}`);
		const cmd = `code --install-extension ${extension}`
		try {
			const { stdout } = await shell(cmd)
			console.log(stdout);
		} catch (err) {
			console.error(`Extension ${extensions} could not be installed. Skipping`)
			console.error(`Error: ${err}`)
		}
	}
}

exports.uninstall = async (extensions) => {
	for (let extension of extensions) {
		console.log(`ℹ️ Uninstalling ${extension}`);
		const cmd = `code --uninstall-extension ${extension}`
		const { stdout } = await shell(cmd)
		console.log(stdout);
	}
}

exports.list = async () => {
	const { stdout } = await shell('code --list-extensions')
	const installedExtensions = stdout.trim().split("\n")
	return installedExtensions
}
