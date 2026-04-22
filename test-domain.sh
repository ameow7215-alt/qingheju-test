#!/bin/bash

# 域名测试脚本
# 使用: ./test-domain.sh <域名>

set -e

if [ $# -lt 1 ]; then
    echo "使用方法: $0 <域名>"
    echo "示例: $0 testqingheju.site"
    exit 1
fi

DOMAIN="$1"

echo "测试域名: $DOMAIN"
echo "=================="

echo "1. DNS解析测试:"
echo "----------------"
dig +short $DOMAIN
dig +short www.$DOMAIN

echo ""
echo "2. HTTP访问测试:"
echo "----------------"
echo "测试 HTTP (80端口):"
curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://$DOMAIN || echo "连接失败"

echo ""
echo "测试 HTTPS (443端口):"
curl -s -o /dev/null -w "HTTPS状态码: %{http_code}\n" https://$DOMAIN 2>/dev/null || echo "HTTPS连接失败或证书问题"

echo ""
echo "3. SSL证书测试:"
echo "----------------"
openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || echo "无法获取证书信息"

echo ""
echo "4. 微信UA模拟测试:"
echo "----------------"
echo "模拟微信浏览器访问:"
curl -s -o /dev/null -w "状态码: %{http_code}\n" -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.15" http://$DOMAIN

echo ""
echo "5. 响应时间测试:"
echo "----------------"
time curl -s -o /dev/null http://$DOMAIN

echo ""
echo "测试完成!"
echo ""
echo "手动测试建议:"
echo "1. 在微信中打开: https://$DOMAIN"
echo "2. 点击页面中的'运行兼容性测试'按钮"
echo "3. 查看测试结果"