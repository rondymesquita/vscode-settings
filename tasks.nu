#!/usr/bin/env nu

# Run a very quick build
let filename = "extensions.json"

# Print this help message
def help [] {
	print "Usage: nu tasks.nu <task>\n"

	print "import: install extensions from extensions.json"
	print "export: export installed extensions to extensions.json"

	# let list = [pwd, banner]
	# scope commands | where type == custom | where {|item| $item.name not-in $list } | select name description
}

def install_ [extensions: list] {
	print "Installing extensions..."
	print $extensions
	$extensions | each {|ext| code --install-extension $ext }
	print "Extensions installed!"
}

def uninstall_ [extensions: list] {
	print "Uninstalling extensions..."
	print $extensions
	$extensions | each {|ext|
		try {
			code --uninstall-extension $ext
		} catch {|err|
			print $err
		}
	}
	print "Extensions uninstalled!"
}

def list_ []: nothing -> list {
	let exts = code --list-extensions | lines
	return $exts
}

def exportExtensions []: nothing -> nothing {
	print "ℹ️ Exporting extensions..."
	list_ | to json | save --force $filename
	print "✔️ Extensions exported successfully!"
}

def importExtensions []: nothing -> nothing  {
	print "ℹ️ Updating extensions..."
	let extensions  = open $filename

	let installedExtensions  = list_

	let extensionsToUninstall = $installedExtensions | filter {|e| $e not-in $extensions}

	let extensionsToInstall = $extensions | filter {|e| $e not-in $installedExtensions }

	uninstall_ $extensionsToUninstall
	install_ $extensionsToInstall

	print "✔️ Extensions updated successfully!"
}

def main [task?: string] {
	match $task {
			"export" => { exportExtensions }
			"import" => { importExtensions }
			_ => {
				help
			}
	}
}
