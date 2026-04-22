#!/bin/bash

# 清和居 .site域名测试部署脚本
# 使用: ./deploy-test-site.sh <服务器IP> <域名>

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

error() {
    echo -e "${RED}[错误] $1${NC}"
    exit 1
}

success() {
    echo -e "${GREEN}[成功] $1${NC}"
}

info() {
    echo -e "${YELLOW}[信息] $1${NC}"
}

step() {
    echo -e "\n${GREEN}▶ $1${NC}"
}

# 检查参数
if [ $# -lt 2 ]; then
    echo "使用方法: $0 <服务器IP地址> <域名>"
    echo "示例: $0 123.456.789.123 testqingheju.site"
    exit 1
fi

SERVER_IP="$1"
DOMAIN="$2"
DOMAIN_WWW="www.$DOMAIN"

step "1. 检查服务器连接"
ping -c 3 $SERVER_IP > /dev/null 2>&1 || error "无法连接到服务器 $SERVER_IP"
success "服务器连接正常"

step "2. 生成SSH连接命令"
echo "请使用以下命令连接到服务器："
echo "ssh root@$SERVER_IP"
echo ""
echo "连接后，执行以下步骤："

cat > /tmp/deploy-instructions.txt << EOF
# ============================================
# 清和居 .site 域名测试部署步骤
# ============================================

# 1. 更新系统并安装Nginx
sudo apt update
sudo apt upgrade -y
sudo apt install nginx -y

# 2. 创建网站目录
sudo mkdir -p /var/www/$DOMAIN
sudo chown -R www-data:www-data /var/www/$DOMAIN

# 3. 上传测试文件（从本地上传到服务器）
# 在本地执行：
# scp -r /path/to/test-site-domain/* root@$SERVER_IP:/var/www/$DOMAIN/

# 4. 创建Nginx配置
sudo tee /etc/nginx/sites-available/$DOMAIN << NGINX_CONFIG
server {
    listen 80;
    server_name $DOMAIN $DOMAIN_WWW;
    
    root /var/www/$DOMAIN;
    index test.html;
    
    location / {
        try_files \\\$uri \\\$uri/ =404;
    }
    
    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
NGINX_CONFIG

# 5. 启用站点配置
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 6. 测试Nginx配置
sudo nginx -t

# 7. 重启Nginx
sudo systemctl restart nginx

# 8. 检查Nginx状态
sudo systemctl status nginx

# 9. 配置防火墙（如果启用）
sudo ufw allow 'Nginx Full'
sudo ufw status

# ============================================
# HTTPS证书配置（建议但非必需初始测试）
# ============================================
# 安装Certbot：
# sudo apt install certbot python3-certbot-nginx -y
# 
# 申请证书：
# sudo certbot --nginx -d $DOMAIN -d $DOMAIN_WWW
# 
# 证书会自动配置并重定向到HTTPS
EOF

echo "详细部署步骤已保存到：/tmp/deploy-instructions.txt"
info "请查看上面的文件获取完整部署步骤"

step "3. DNS配置指南"
echo "请在域名注册商控制台配置DNS解析："
echo ""
echo "记录类型：A"
echo "主机记录：@"
echo "记录值：$SERVER_IP"
echo "TTL：600"
echo ""
echo "记录类型：A"
echo "主机记录：www"
echo "记录值：$SERVER_IP"
echo "TTL：600"
echo ""
echo "等待DNS生效（通常几分钟到几小时）"

step "4. 测试验证"
echo "部署完成后，请测试："
echo "1. HTTP测试：http://$DOMAIN"
echo "2. 微信中打开：http://$DOMAIN"
echo "3. 如果配置HTTPS：https://$DOMAIN"
echo ""
echo "测试页面包含环境检测和兼容性测试功能。"

step "5. 测试结果反馈"
echo "测试完成后，请反馈："
echo "1. 页面是否正常加载？"
echo "2. 兼容性测试结果如何？"
echo "3. 是否有任何错误或警告？"

step "6. 后续步骤"
echo "根据测试结果决定："
echo "- 如果测试通过：购买 qingheju.site（10元/年）"
echo "- 如果测试失败：购买 qingheju.cn（33元/年）"
echo "- 部署正式H5到选择的域名"

success "部署指南生成完成！"
echo ""
info "等待道友的域名实名通过后，立即开始部署测试！"