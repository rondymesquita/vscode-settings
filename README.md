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
 # cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/
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
code --list-extensions > extensions.txt
```

### Import
```bash
cat extensions.txt | xargs -n1 code --install-extension $1
```

