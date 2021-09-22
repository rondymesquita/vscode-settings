# VSCode settings

## Windows
```bash
 cd "$APPDATA/Code/User"
```

## Linux
```bash
 # cd ~/.config/sublime-text-3/Packages/User
```

## MacOS
```bash
 cd ~/Library/Application\ Support/Code/User
```

# Setup

## Install
```bash
git init
git remote add origin https://github.com/rondymesquita/vscode-settings.git
git fetch
git reset --hard origin/main
```

## Extensions
### Export
```bash
node import.js
```

### Import
```bash
node export.js
```
