#!/usr/bin/env bash
cat extensions | xargs -n1 code --install-extension $1
