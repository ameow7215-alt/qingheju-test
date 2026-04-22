# Vercel 免费托管测试指南

## 一、测试目的
验证 `.site` 域名在微信小程序 web-view 中的兼容性，使用免费 Vercel 托管服务。

## 二、当前状态
- ✅ 域名已购买：`testqingheju.site`
- ✅ 实名认证：已通过
- ✅ 测试页面：已准备完成 (`test.html`)
- ❌ 需要：GitHub 账号、Vercel 账号

## 三、部署步骤

### 第1步：准备 GitHub 账号
1. 访问：https://github.com
2. 注册新账号（如果没有）
3. 登录 GitHub

### 第2步：创建仓库并上传测试页面
1. 点击右上角 "+" → "New repository"
2. 仓库名：`testqingheju-site`（任意名称）
3. 选择 "Public"（公开仓库）
4. 点击 "Create repository"
5. 在仓库页面点击 "Add file" → "Upload files"
6. 将本地的 `test.html` 文件拖入上传区域
7. 点击 "Commit changes"

### 第3步：注册 Vercel 并部署
1. 访问：https://vercel.com
2. 点击 "Sign up"，选择 "Continue with GitHub"
3. 授权 GitHub 账号
4. 登录后点击 "Add New..." → "Project"
5. 选择刚刚创建的仓库 `testqingheju-site`
6. 点击 "Import"
7. 保持默认配置，点击 "Deploy"
8. 等待部署完成（约1分钟）

### 第4步：绑定自定义域名
1. 在 Vercel 项目页面，点击 "Settings" → "Domains"
2. 在输入框中输入：`testqingheju.site`
3. 点击 "Add"
4. Vercel 会显示需要配置的 DNS 记录

### 第5步：配置 DNS 解析（腾讯云）
1. 登录腾讯云控制台 → 域名注册 → 我的域名
2. 找到 `testqingheju.site`，点击 "解析"
3. 添加 DNS 记录：
   - 类型：CNAME
   - 主机记录：@（或留空）
   - 记录值：`cname.vercel-dns.com`
   - TTL：600
4. 点击保存，等待 DNS 生效（通常几分钟到几小时）

### 第6步：验证配置
1. 回到 Vercel "Domains" 页面
2. 等待域名状态变为 "Valid"
3. 访问：https://testqingheju.site
4. 应该能看到测试页面

## 四、微信测试
1. 在微信中打开：https://testqingheju.site
2. 运行页面上的兼容性测试
3. 记录测试结果

## 五、测试标准
- ✅ **通过**：页面正常加载，无 timeout，兼容性测试 ≥90%
- ⚠️ **警告**：页面能加载但有警告，兼容性测试 80-90%
- ❌ **失败**：页面无法加载或严重错误

## 六、后续决策
### 如果测试通过：
1. 购买主域名：`qingheju.site`（10元/年）
2. 决定正式服务器方案：
   - 继续用 Vercel（免费但有限制）
   - 购买正式服务器（首尔28.98元/月或国内服务器）

### 如果测试失败：
1. 放弃 `.site` 域名
2. 购买 `.cn` 域名：`qingheju.cn`（33元/年）
3. 购买正式服务器

## 七、注意事项
1. Vercel 免费版限制：
   - 带宽：100GB/月
   - 构建时间：100小时/月
   - 对于测试和小型 H5 足够
2. DNS 生效时间可能较长，请耐心等待
3. 测试时请使用微信，而不是浏览器

## 八、问题排查
### 域名验证失败：
- 检查 DNS 记录是否正确
- 等待更长时间（DNS 最长可能需24小时）
- 在 Vercel 重新验证域名

### 页面无法访问：
- 检查 Vercel 部署状态
- 检查域名是否绑定成功
- 尝试清除微信缓存

### 兼容性测试失败：
- 记录具体错误信息
- 截图反馈给元利分析

## 九、技术支持
元利提供：
1. 测试页面优化
2. DNS 配置指导
3. 测试结果分析
4. 后续方案建议

---

**时间线建议：**
- 今天：完成 Vercel 部署和测试
- 明天：根据结果决定主域名和服务器方案
- 后天：部署正式 H5，解决核心问题