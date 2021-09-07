#!/usr/bin/env bash
cat extensions | xargs -L 1 echo code --install-extension $1
