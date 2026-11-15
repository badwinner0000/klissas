#!/bin/sh
# nomes de const/function de topo repetidos entre arquivos (quebra o script único do build)
cd "$(dirname "$0")/.."
grep -ho "^\(const\|let\|function\) [A-Za-z_$][A-Za-z0-9_$]*" personagens.js motor.js hist*/*.js love/base.js love/*/*.js som.js rede.js ui.js 2>/dev/null | awk '{print $2}' | tr ',' '\n' | sort | uniq -d
grep -ho "^const [^=]*" love/*/*.js | sed 's/^const //' | tr ',' '\n' | sed 's/=.*//;s/ //g' | sort | uniq -d
