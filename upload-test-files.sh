#!/bin/bash

# 测试文件上传脚本
# 使用: ./upload-test-files.sh <服务器IP>

set -e

if [ $# -lt 1 ]; then
    echo "使用方法: $0 <服务器IP地址>"
    echo "示例: $0 123.456.789.123"
    exit 1
fi

SERVER_IP="$1"
DOMAIN="testqingheju.site"  # 根据实际修改

echo "上传测试文件到服务器..."
echo "目标服务器: $SERVER_IP"
echo "目标目录: /var/www/$DOMAIN/"

# 检查文件是否存在
if [ ! -f "test.html" ]; then
    echo "错误: test.html 文件不存在"
    exit 1
fi

# 上传文件
echo "正在上传文件..."
scp test.html root@$SERVER_IP:/var/www/$DOMAIN/
scp 部署指南.md root@$SERVER_IP:/var/www/$DOMAIN/ 2>/dev/null || true

echo "设置文件权限..."
ssh root@$SERVER_IP "chown -R www-data:www-data /var/www/$DOMAIN"

echo "文件上传完成!"
echo ""
echo "请登录服务器检查文件:"
echo "ssh root@$SERVER_IP"
echo "ls -la /var/www/$DOMAIN/"