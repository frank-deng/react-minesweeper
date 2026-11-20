#!/bin/sh
# Linux/macOS/Termux 开发服务器启动脚本
# react-scripts 4.0.3 依赖 webpack 4 的 md4 哈希，在 Node 17+ 上需要开启 legacy provider
export NODE_OPTIONS=--openssl-legacy-provider
export BROWSER=none
export PORT=8082
exec npx react-scripts start "$@"
