# zp-cli 使用手册

> 本文档面向团队成员，详细介绍 zp-cli 工具的安装、配置和使用方法。

---

## 目录

1. [项目概述](#项目概述)
2. [安装方法](#安装方法)
3. [快速上手](#快速上手)
4. [命令详解](#命令详解)
5. [配置文件说明](#配置文件说明)
6. [子目录映射功能](#子目录映射功能)
7. [同步服务功能](#同步服务功能)
8. [部署流程说明](#部署流程说明)
9. [常见问题解答](#常见问题解答)
10. [项目结构](#项目结构)

---

## 项目概述

**zp-cli** (`@wxuns/zp-cli`) 是一个基于 Node.js 的命令行部署工具，用于将本地代码通过 SSH 上传并部署到远程服务器。

### 核心特性

| 特性 | 说明 |
|------|------|
| **Git 仓库自动感知** | 通过读取当前仓库的 origin URL 自动匹配部署配置，无需每次手动指定 |
| **灵活的子目录映射** | 支持 monorepo 场景，同一仓库的不同子目录可部署到不同服务器 |
| **多目标部署** | 同一子目录可配置多个部署目标，未指定时默认使用第一条并提示，可通过 `--server` 参数选择 |
| **多文件上传** | 支持 `zp-cli up file1 file2` 一次上传多个文件，同服务器同目录自动合并为一次 SSH 连接和一个 tar.gz 包 |
| **Windows 右键上传** | 支持安装资源管理器右键菜单，多选文件可合并到一个终端中执行上传 |
| **跨平台兼容** | 使用 npm tar 包而非系统 tar 命令，完美支持 Windows |
| **配置同步** | 通过独立的 PHP 后端实现配置文件多端同步，支持历史版本管理 |
| **提权部署** | 支持通过 expect 脚本自动执行 `su root`，适合需要 root 权限的环境 |

### 技术栈

- **运行环境**: Node.js >= 14.0.0
- **当前版本**: 0.0.5
- **核心依赖**: commander (命令行)、node-ssh (SSH 连接)、tar (打包)、chalk (终端美化)
- **后端服务**: PHP (配置同步服务)

---

## 安装方法

### 方式一：全局安装（推荐）

```bash
npm install -g @wxuns/zp-cli
```

### 方式二：使用 npx 临时运行

不想全局安装时，可以使用 npx 临时运行：

```bash
npx @wxuns/zp-cli --help
npx @wxuns/zp-cli upload ./dist
```

### 方式三：本地开发调试

开发者克隆仓库后，使用 `npm link` 进行本地调试：

```bash
# 克隆仓库
git clone https://github.com/lizhixu/zp-cli.git
cd zp-cli

# 安装依赖
npm install

# 全局链接到本地代码
npm link

# 现在可以直接使用
zp-cli --help

# 调试完成后取消链接
npm unlink -g zp-cli
```

### 验证安装

```bash
zp-cli --version
# 输出: 0.0.5
```

### 升级到最新版本

```bash
npm update -g @wxuns/zp-cli
```

### 卸载

```bash
npm uninstall -g @wxuns/zp-cli
```

### 系统要求

| 要求 | 说明 |
|------|------|
| **Node.js** | >= 14.0.0 |
| **npm** | >= 6.0.0 |
| **操作系统** | Windows / Linux / macOS |
| **网络** | 需要访问 npm registry 和目标服务器 SSH 端口 |

> 💡 **跨平台兼容**：打包功能使用 npm `tar` 包实现，不依赖系统 `tar` 命令，Windows 用户无需额外安装。

---

## 快速上手

### 第一步：生成配置文件

```bash
zp-cli init
```

此命令会在用户目录下生成 `~/.zp-cli.json` 配置文件模板。

- **Windows**: `%USERPROFILE%\.zp-cli.json`
- **Linux/Mac**: `~/.zp-cli.json`

### 第二步：编辑配置文件

使用你喜欢的编辑器打开配置文件，填入服务器信息：

```bash
# Windows
notepad %USERPROFILE%\.zp-cli.json

# Linux/Mac
vim ~/.zp-cli.json
# 或
code ~/.zp-cli.json
```

### 第三步：上传文件

```bash
# 上传单个文件
zp-cli upload ./dist/index.html

# 上传整个目录
zp-cli upload ./dist

# 使用简写命令
zp-cli up ./dist

# 一次上传多个文件或目录
zp-cli up ./dist/index.html ./dist/assets ./dist/config.js
```

---

## 命令详解

### 命令总览

| 命令 | 别名 | 说明 |
|------|------|------|
| `zp-cli init` | `zp-cli i` | 生成 demo 配置文件 |
| `zp-cli upload <路径...>` | `zp-cli up <路径...>` | 上传一个或多个文件/目录到远程服务器 |
| `zp-cli install menu` | - | 安装 Windows 右键上传菜单 |
| `zp-cli uninstall menu` | - | 卸载 Windows 右键上传菜单 |
| `zp-cli sync <操作>` | `zp-cli s <操作>` | 管理配置文件的远程同步 |
| `zp-cli config show` | `zp-cli c show` | 查看当前配置内容 |
| `zp-cli config path` | `zp-cli c path` | 显示配置文件路径 |
| `zp-cli --help` | - | 查看帮助信息 |
| `zp-cli -v` | - | 查看版本号 |

### upload 命令详解

```bash
zp-cli upload <路径...> [选项]
```

**参数说明：**

| 参数 | 说明 | 示例 |
|------|------|------|
| `<路径...>` | 要上传的一个或多个本地文件/目录路径 | `./dist`、`./src/index.js ./src/app.js` |

**选项说明：**

| 选项 | 简写 | 说明 | 示例 |
|------|------|------|------|
| `--server <别名>` | `-s` | 指定目标服务器（覆盖自动匹配） | `--server hw` |
| `--remote-path <路径>` | `-r` | 指定远程目标路径（覆盖配置默认值） | `--remote-path /var/www` |

**使用示例：**

```bash
# 自动匹配服务器和路径（基于 Git 仓库配置）
zp-cli up ./dist

# 指定服务器
zp-cli up ./dist --server web-server

# 同时指定服务器和路径
zp-cli up ./dist --server web-server --remote-path /var/www/html

# 使用简写
zp-cli up ./dist -s hw -r /home/www

# 一次上传多个文件/目录
zp-cli up ./dist/index.html ./dist/config.js ./dist/assets

# 多文件在同一服务器同一远程目录时，会自动合并为一次 SSH 连接和一个 tar.gz 包上传
zp-cli up .\iflytek\ .\iflytek-others\
```

### Windows 右键菜单

v0.0.5 起支持在 Windows 资源管理器中安装右键上传菜单。

```bash
# 安装右键菜单
zp-cli install menu

# 卸载右键菜单
zp-cli uninstall menu
```

安装后可在以下位置看到「用 zp-cli 上传」菜单项：

| 右键位置 | 行为 |
|---------|------|
| 文件 | 上传该文件 |
| 文件夹 | 上传该文件夹 |
| 多选文件/文件夹 | 收集选中项，在一个终端中转换为一次 `zp-cli up ...` 命令执行 |
| 文件夹空白处 | 上传当前目录 `.` |

多选上传时，右键脚本会先收集 Explorer 传入的路径，再转换为类似下面的命令执行：

```powershell
zp-cli up .\iflytek .\iflytek-others
```

> 注意：Windows 11 的新版右键菜单会折叠传统注册表菜单项，可能需要点击「显示更多选项」或按住 Shift 右键查看。
>
> 右键脚本安装在 `~/.zp-cli/` 目录下，包括 `.cmd`、`.vbs`、`.ps1` 辅助脚本。

### sync 命令详解

`sync` 命令用于管理 `~/.zp-cli.json` 配置文件的远程同步，方便在多台电脑间同步配置。

```bash
zp-cli sync <操作>
```

| 操作 | 说明 |
|------|------|
| `push` | 推送本地配置到同步服务 |
| `pull` | 从同步服务拉取配置覆盖本地（自动备份旧配置） |
| `history` | 查看服务端历史版本列表 |
| `restore <文件名>` | 恢复指定历史版本 |

**使用示例：**

```bash
# 推送配置
zp-cli sync push
# 或使用简写
zp-cli s push

# 拉取配置
zp-cli s pull

# 查看历史版本
zp-cli s history

# 恢复指定版本
zp-cli s restore backup_20260710_120000.json
```

---

## 配置文件说明

配置文件路径：`~/.zp-cli.json`

### 配置文件结构

```jsonc
{
  "syncService": {
    "url": "https://your-domain.com/zp-sync/api.php",
    "apiPassword": "your-api-password"
  },
  "servers": [
    {
      "alias": "test-server",
      "host": "192.168.1.100",
      "port": 22,
      "username": "root",
      "password": "your-password",
      "privateKeyPath": "~/.ssh/id_rsa",
      "defaultRemotePath": "/home/www",
      "rootPassword": "",
      "reuseMapping": ""
    }
  ],
  "mappings": [
    {
      "gitRemoteUrl": "git@github.com:yourorg/project.git",
      "serverAlias": "test-server",
      "remotePath": "/var/www/project",
      "subdirectoryMappings": {}
    }
  ]
}
```

### syncService 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `url` | string | 选填 | 同步服务 API 地址 |
| `apiPassword` | string | 选填 | API 密码（仅 sync 命令需要） |

> ⚠️ `syncService` 只用于同步管理配置文件，与 SSH 部署服务器无关。

### servers 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `alias` | string | **必填** | 服务器别名，用于 `--server` 参数和 mappings 引用 |
| `host` | string | **必填** | 服务器 IP 或域名 |
| `port` | number | 选填 | SSH 端口，默认 `22` |
| `username` | string | **必填** | 登录用户名 |
| `password` | string | **条件必填** | 登录密码（与 privateKeyPath 二选一） |
| `privateKeyPath` | string | **条件必填** | SSH 私钥路径（与 password 二选一） |
| `defaultRemotePath` | string | 选填 | 默认远程部署目录 |
| `rootPassword` | string | 选填 | root 密码（需要提权时填写） |
| `reuseMapping` | string | 选填 | 复用其他服务器的路径映射 |

> **条件必填**：`password` 和 `privateKeyPath` 至少填一个。同时存在时优先使用 `privateKeyPath`。

### mappings 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `gitRemoteUrl` | string | **必填** | Git 远程仓库地址（支持 SSH 和 HTTPS） |
| `serverAlias` | string | **条件必填** | 目标服务器别名（有子映射时可省略） |
| `remotePath` | string | **条件必填** | 远程部署根路径（有子映射时可省略） |
| `subdirectoryMappings` | object | 选填 | 子目录映射配置 |

### Git URL 匹配规则

配置中的 `gitRemoteUrl` 和实际仓库的 `origin` 地址会自动归一化后匹配，以下写法等价：

```
git@github.com:org/repo.git          ←→  https://github.com/org/repo.git
ssh://git@github.com:22/org/repo.git ←→  git@github.com:org/repo.git
git@gitlab.com:group/sub/repo.git    ←→  https://gitlab.com/group/sub/repo.git
```

---

## 子目录映射功能

子目录映射是 zp-cli 的核心特性，支持将同一仓库的不同子目录部署到不同服务器或路径。

### 格式一：同服务器不同路径

```json
"subdirectoryMappings": {
  "web": "/var/www/project/frontend"
}
```

**效果：** 上传 `./web/index.js` → 部署到 `/var/www/project/frontend/index.js`

### 格式二：部署到不同服务器

```json
"subdirectoryMappings": {
  "api": {
    "serverAlias": "backend-server",
    "remotePath": "/opt/services/api"
  }
}
```

**效果：** 上传 `./api/main.py` → 部署到 `backend-server` 的 `/opt/services/api/main.py`

### 格式三：多目标部署

```json
"subdirectoryMappings": {
  "hw/data": {
    "targets": {
      "hw": "/home/vsp/vsc/tomcat/webapps/VSC/EPG/jsp/defaultv6hy/data",
      "zx": "/home/zxin10/was/tomcat/webapps/iptvepg/frame1003/main/data"
    }
  }
}
```

**使用方式：** 默认使用第一条目标，也可以通过 `--server` 参数选择目标

```bash
zp-cli up ./hw/data --server hw
zp-cli up ./hw/data --server zx
```

> 💡 **多目标默认规则**：当子目录配置了多个目标且未指定 `--server` 时，工具会**默认使用第一条目标**并输出警告提示；需要部署到其他目标时，可显式传入 `--server`。
>
> 示例输出：
> ```
> ⚠ 该子目录配置了多个目标: hw, zx，已默认使用第一条
> ```

### 多级子目录匹配

```json
"subdirectoryMappings": {
  "hw/data": {
    "serverAlias": "hw",
    "remotePath": "/home/vsp/vsc/tomcat/webapps/VSC/EPG/jsp/defaultv6hy/data"
  }
}
```

**效果：** 上传 `./hw/data/index.json` → 部署到 `hw` 的 `/home/vsp/vsc/tomcat/webapps/VSC/EPG/jsp/defaultv6hy/data/index.json`

> 💡 **匹配优先级**：多个映射同时命中时，会优先使用最长匹配。例如同时存在 `hw` 和 `hw/data`，上传 `./hw/data/a.json` 会优先匹配 `hw/data`。

### reuseMapping 复用映射

如果多台服务器路径结构相同，可以在服务器配置里使用 `reuseMapping` 复用路径映射：

```json
"servers": [
  {
    "alias": "hw",
    "host": "117.146.223.166"
  },
  {
    "alias": "hw2",
    "host": "117.146.223.143",
    "reuseMapping": "hw"
  }
]
```

**效果：** 执行 `zp-cli up ./hw/data --server hw2` 会连接 `hw2` 服务器，但路径映射使用 `targets.hw`。

### 完整配置示例

```json
{
  "servers": [
    { "alias": "web-server",     "host": "10.0.0.1", "username": "root", "password": "xxx" },
    { "alias": "backend-server", "host": "10.0.0.2", "username": "root", "password": "xxx" }
  ],
  "mappings": [
    {
      "gitRemoteUrl": "git@github.com:yourorg/mono-repo.git",
      "serverAlias": "web-server",
      "remotePath": "/var/www/mono",
      "subdirectoryMappings": {
        "web": "/var/www/mono/frontend",
        "api": {
          "serverAlias": "backend-server",
          "remotePath": "/opt/services/api"
        },
        "config": "/etc/mono-repo"
      }
    }
  ]
}
```

**部署结果：**

| 上传路径 | 目标服务器 | 远程路径 |
|---------|-----------|---------|
| `./web/index.js` | web-server | `/var/www/mono/frontend/index.js` |
| `./api/main.py` | **backend-server** | `/opt/services/api/main.py` |
| `./config/app.conf` | web-server | `/etc/mono-repo/app.conf` |
| `./README.md` | web-server | `/var/www/mono/README.md` |

---

## 同步服务功能

同步服务用于在多台电脑间同步 `~/.zp-cli.json` 配置文件。

### 后端部署

1. 将 `backend/php/` 目录部署到支持 PHP 的 Web 服务器
2. 修改 `backend/php/config.php` 中的用户名密码和数据目录
3. 在 `~/.zp-cli.json` 的 `syncService` 中配置对应的 URL 和 API 密码

**本地测试：**

```bash
cd backend/php
php -S 127.0.0.1:8080
```

### 使用流程

```bash
# 1. 配置同步服务地址（在 ~/.zp-cli.json 中）
# 2. 推送当前配置
zp-cli s push

# 3. 在另一台电脑拉取配置
zp-cli s pull

# 4. 查看历史版本
zp-cli s history

# 5. 恢复到指定版本
zp-cli s restore backup_20260710_120000.json
```

---

## 部署流程说明

执行 `zp-cli upload` 时的完整流程：

```
1. 检查本地路径是否存在
2. 读取 ~/.zp-cli.json 配置
3. 逐个路径解析目标服务器、远程基础目录和相对路径
   ├─ 命令行指定了 --server / --remote-path → 优先使用命令行参数
   └─ 未指定 → 读取 .git/config 获取 origin 地址 → 匹配 mappings / subdirectoryMappings / targets
4. 多文件上传时按 server + remoteBase 分组
5. 每组建立一个 SSH 连接
6. 将该组文件/目录复制到本地临时 staging 目录
7. 打包为一个 tar.gz 并上传到服务器 /tmp 临时目录
8. 在服务器上解压到目标路径
9. 显示上传结果并清理临时文件
10. 关闭连接
```

### 四种部署目标解析模式

| 模式 | 条件 | 说明 |
|------|------|------|
| **模式 A** | 同时指定 `--server` 和 `--remote-path` | 直接使用命令行参数 |
| **模式 B** | 仅指定 `--server` | 从 Git 映射获取 remotePath，回退到服务器的 defaultRemotePath |
| **模式 C** | 仅指定 `--remote-path` | 从 Git 映射推断服务器 |
| **模式 D** | 都不指定 | 智能模式，通过 Git origin URL 自动匹配 |

---

## 常见问题解答

### Q: 报错"配置文件不存在"

**A:** 先执行 `zp-cli init` 生成配置文件。

### Q: 报错"无法自动确定部署目标"

**A:** 当前目录不在 Git 仓库内，或配置文件中没有匹配的映射。可以用 `--server` 和 `--remote-path` 手动指定。

### Q: 如何部署到同一台服务器的不同目录？

**A:** 在 `subdirectoryMappings` 中用字符串格式配置即可：

```json
"subdirectoryMappings": {
  "web": "/var/www/project/frontend",
  "api": "/var/www/project/api"
}
```

### Q: 如何将仓库的不同子目录部署到不同服务器？

**A:** 在 `subdirectoryMappings` 中用对象格式，指定 `serverAlias` 和 `remotePath`：

```json
"subdirectoryMappings": {
  "frontend": {
    "serverAlias": "web-server",
    "remotePath": "/var/www/frontend"
  },
  "backend": {
    "serverAlias": "backend-server",
    "remotePath": "/opt/services/backend"
  }
}
```

### Q: Windows 上打包报错？

**A:** v0.0.5 使用 npm `tar` 包进行跨平台打包，不依赖系统 `tar` 命令。请确认依赖已正确安装，可尝试重新执行 `npm install` 或重新全局安装 zp-cli。

### Q: 如何查看当前配置？

**A:** 使用 `zp-cli config show` 命令。

### Q: 如何查看配置文件路径？

**A:** 使用 `zp-cli config path` 命令。

---

## 项目结构

```
zp-cli/
├── package.json                    # 项目配置
├── bin/
│   └── zp-cli.js                   # CLI 主入口
├── lib/
│   ├── commands/
│   │   ├── init.js                 # 生成 demo 配置
│   │   ├── upload.js               # 上传部署逻辑
│   │   ├── install.js              # Windows 右键菜单安装/卸载
│   │   └── sync.js                 # 配置同步服务命令
│   ├── core/
│   │   ├── configManager.js        # 配置读写与验证
│   │   ├── gitHelper.js            # Git 仓库感知、URL 归一化、路径映射
│   │   └── sshDeployer.js          # SSH 连接、打包、上传、解压
│   └── utils/
│       └── logger.js               # 终端彩色输出
├── backend/
│   └── php/                        # 同步服务后端实现
│       ├── api.php                 # API 入口
│       ├── auth.php                # 认证逻辑
│       ├── config.php              # 服务端配置
│       ├── index.php               # Web 管理界面
│       ├── logout.php              # 登出
│       └── .htaccess               # Apache URL 重写规则
└── README.md                       # 项目文档
```

---

## 快速参考卡片

```
┌─────────────────────────────────────────────────────────────┐
│                    zp-cli 常用命令速查                        │
├─────────────────────────────────────────────────────────────┤
│  zp-cli init                    生成配置文件模板              │
│  zp-cli up ./dist               上传目录（自动匹配服务器）    │
│  zp-cli up a.js b.js            一次上传多个文件              │
│  zp-cli up ./dist -s hw         上传到指定服务器              │
│  zp-cli up ./dist -r /var/www   上传到指定路径                │
│  zp-cli install menu            安装 Windows 右键上传菜单     │
│  zp-cli s push                  推送配置到同步服务            │
│  zp-cli s pull                  从同步服务拉取配置            │
│  zp-cli c show                  查看当前配置                  │
│  zp-cli c path                  查看配置文件路径              │
└─────────────────────────────────────────────────────────────┘
```

---

## 联系与支持

- **项目仓库**: https://github.com/lizhixu/zp-cli.git
- **NPM 包**: @wxuns/zp-cli
- **License**: MIT

如有问题或建议，请联系项目维护者或提交 GitHub Issue。

---

## 更新日志

### v0.0.5 (2026-07-17)

**功能新增：**
- 📁 **多文件上传**：`upload/up` 命令支持 `<路径...>`，可一次上传多个文件或目录
- 📦 **批量打包上传**：同一服务器、同一远程基础目录的多个文件会合并到一个 tar.gz 包上传，并复用同一个 SSH 连接
- 🖱️ **Windows 右键菜单**：新增 `zp-cli install menu` / `zp-cli uninstall menu`，支持在资源管理器中右键上传文件、文件夹和当前目录
- 🧩 **右键多选合并**：资源管理器多选时会收集选中项，在一个终端中转换为一次 `zp-cli up ...` 命令执行

**问题修复：**
- 修复多文件上传时子目录映射中的 `serverAlias` 被忽略，导致上传到错误服务器的问题
- 修复右键上传单文件路径被拆成字符的问题
- 修复右键多选时队列写入并发丢失，导致只上传第一个或最后一个文件的问题
- 修复批量上传远程临时包名固定可能导致并发冲突的问题
- 上传后 `ls` 输出改为 `ls -la`，补充隐藏文件和符号链接展示

### v0.0.4 (2026-07-10)

**功能改进：**
- 🔄 **多目标部署优化**：当子目录配置了多个目标且未指定 `--server` 时，不再返回歧义错误，而是默认使用第一个目标并输出警告提示，引导用户选择其他目标

**CI/CD 改进：**
- 📦 npm 发布添加 `--provenance` 参数，增强包的可追溯性
- 🔧 固定 npm 版本为 11.5.1，确保构建环境一致性

### v0.0.3 (2026-07-09)

- 🎨 重新设计管理界面，采用 Ant Design 风格
- 🔄 切换 npm registry 从镜像源到官方源
- 📝 更新仓库 URL

---

*文档更新日期: 2026-07-17*
