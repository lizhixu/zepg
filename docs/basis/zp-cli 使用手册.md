# zp-cli 使用手册

> 本文档面向团队成员，详细介绍 zp-cli 工具的安装、配置和使用方法。

---

## 目录

1. [项目概述](#项目概述)
2. [安装方法](#安装方法)
3. [快速上手](#快速上手)
4. [命令详解](#命令详解)
5. [VS Code 扩展使用指南](#vs-code-扩展使用指南)
6. [WebStorm 外部工具集成](#webstorm-外部工具集成)
7. [Windows 资源管理器右键](#windows-资源管理器右键)
8. [sync 命令详解](#sync-命令详解)
9. [配置文件说明](#配置文件说明)
10. [子目录映射功能](#子目录映射功能)
11. [同步服务功能](#同步服务功能)
12. [部署流程说明](#部署流程说明)
13. [常见问题解答](#常见问题解答)
14. [项目结构](#项目结构)

---

## 项目概述

**zp-cli** (`@wxuns/zp-cli`) 是一个基于 Node.js 的命令行部署工具，用于将本地代码通过 SSH 上传并部署到远程服务器。

### 核心特性

| 特性 | 说明 |
|------|------|
| **Git 仓库自动感知** | 通过读取当前仓库的 origin URL 自动匹配部署配置，支持跨目录精准识别，无需每次手动指定 |
| **灵活的子目录映射** | 支持 monorepo 场景，同一仓库的不同子目录可部署到不同服务器 |
| **多目标部署** | 同一子目录可配置多个部署目标，未指定时默认使用第一条并提示，可通过 `--server` 参数选择 |
| **多文件上传** | 支持 `zp-cli up file1 file2` 一次上传多个文件，同服务器同目录自动合并为一次 SSH 连接和一个 tar.gz 包 |
| **VS Code 官方扩展** | 原生扩展插件，支持资源管理器多选右键、原生顶部下拉弹窗选择服务器、Output 面板实时查看日志 |
| **WebStorm 外部工具** | 支持自动探测配置目录，按服务器生成右键子菜单与自动匹配项，Run 控制台查看日志 |
| **Windows 右键上传** | 支持安装文件资源管理器右键菜单，多选文件可合并到一个终端中执行上传 |
| **跨平台兼容** | 使用 npm tar 包而非系统 tar 命令，完美支持 Windows |
| **配置安全同步** | 通过独立 PHP 后端实现多端同步与历史版本管理；`push`/`restore` 具备密码二次确认防误操作机制 |
| **提权部署** | 支持通过 expect 脚本自动执行 `su root`，适合需要 root 权限的环境 |

### 技术栈

- **运行环境**: Node.js >= 14.0.0
- **当前版本**: 0.0.9
- **核心依赖**: commander (命令行)、node-ssh (SSH 连接)、tar (打包)、chalk (终端美化)、inquirer (交互输入)
- **IDE 扩展**: VS Code 官方 Extension (`.vsix`)、WebStorm External Tools XML 集成
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
# 输出: 0.0.9
```

### 升级到最新版本

```bash
npm update -g @wxuns/zp-cli
```

> 同时建议 `zp-cli s pull` 

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
| `zp-cli install vscode` | - | 安装 VS Code 官方右键上传扩展 |
| `zp-cli uninstall vscode` | - | 卸载 VS Code 扩展 |
| `zp-cli install webstorm` | - | 安装 WebStorm 外部工具右键上传菜单 |
| `zp-cli uninstall webstorm` | - | 卸载 WebStorm 外部工具集成 |
| `zp-cli install menu` | - | 安装 Windows 文件资源管理器右键菜单 |
| `zp-cli uninstall menu` | - | 卸载 Windows 文件资源管理器右键菜单 |
| `zp-cli sync <操作>` | `zp-cli s <操作>` | 管理配置文件的远程同步（支持 `-y` 跳过密码确认） |
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
zp-cli up .\page\ .\js\
```

---

## VS Code 扩展使用指南

v0.0.7 起提供官方 VS Code 扩展（`zp-cli-vscode`），支持直接在编辑器和文件树右键完成部署。

### 1. 安装与卸载

```bash
# 一键安装扩展（自动检测 code 命令并静默安装）
zp-cli install vscode

# 若使用的是 VS Code Insiders 版
zp-cli install vscode --insiders

# 指定自定义扩展目录安装
zp-cli install vscode -e "D:\custom\vscode\extensions"

# 卸载扩展
zp-cli uninstall vscode
```

> 💡 **提示**：安装后无需重启 VS Code；若窗口已在运行，按 `Ctrl+Shift+P` 执行「**开发人员: 重载窗口 (Developer: Reload Window)**」即可立即加载。
>
> VS Code 系列编辑器（*TRAE*，*Cursor* 等），可自行下载 vsix 扩展自行导入即可，下载地址：[Github官方源](https://github.com/lizhixu/zp-cli/raw/refs/heads/main/vscode-extension/zp-cli-vscode.vsix) ，[加速地址](https://v4.gh-proxy.org/https://github.com/lizhixu/zp-cli/raw/refs/heads/main/vscode-extension/zp-cli-vscode.vsix) 

### 2. 右键功能说明

在 VS Code 资源管理器（文件树）或当前编辑器内右键，即可看到以下菜单项：

| 菜单项 | 功能说明 | 适用场景 |
|--------|----------|----------|
| **zp-cli: 自动匹配上传** | 根据当前文件所在 Git 仓库的远程地址自动匹配 `~/.zp-cli.json` 规则并上传 | 日常快速单文件/多文件修改部署 |
| **zp-cli: 选择服务器上传...** | 弹出 VS Code 原生顶部下拉选择框，实时读取配置中的服务器列表供选择，选定后上传 | 部署到测试服/生产服等指定环境 |
| **zp-cli: 打开配置文件 (~/.zp-cli.json)** | 快速在 VS Code 编辑器内打开全局配置文件 | 随时调整服务器与映射参数 |

### 3. 多选与实时日志优势

- **多选批量上传**：支持按住 `Ctrl` 或 `Shift` 在资源管理器中多选文件、文件夹，右键选择上传，扩展会自动合并传入所有绝对路径，由 CLI 一次性打包部署。
- **实时日志输出**：部署启动后会自动打开底部「**输出 (Output)**」面板并切换到 **`zp-cli`** 通道，流式打印 SSH 连接、文件传输与远程解压日志。
- **动态服务器感知**：新增或修改 `~/.zp-cli.json` 中的服务器后，**无需重新安装扩展**，下次点击「选择服务器上传...」时即时读取最新配置。

---

## WebStorm 外部工具集成

支持在 WebStorm（及 IntelliJ IDEA、PhpStorm 等 JetBrains 系列 IDE）中注册外部工具（External Tools），提供右键部署能力。

### 1. 安装与卸载

```bash
# 安装 WebStorm 集成（自动探测配置目录）
zp-cli install webstorm

# 若自动探测未找到，手动指定配置目录
zp-cli install webstorm -d "C:\Users\<用户名>\AppData\Roaming\JetBrains\WebStorm2024.2"

# 仅为每个服务器生成菜单，不生成"自动匹配"项
zp-cli install webstorm --no-auto-match

# 卸载
zp-cli uninstall webstorm
```

> ⚠️ **重要提示（防覆盖机制）**：
> WebStorm 的 External Tools 配置文件在 IDE 启动时加载进内存，**若在 WebStorm 运行期间写入配置，关闭 IDE 时可能会被内存数据覆盖**。
> 因此，`zp-cli install webstorm` 默认会检测 WebStorm 是否处于运行中；**请先完全退出 WebStorm，再执行安装命令**（支持 `--force` 强制写入）。

### 2. 生成的菜单说明

安装后重启 WebStorm，右键项目视图中的文件/文件夹/空白处，展开 **External Tools** 即可看到：

- **`zp-cli: 上传到 <别名>`** — 将选中的文件/文件夹部署到指定服务器
- **`zp-cli: 上传当前目录到 <别名>`** — 将当前所在目录部署到指定服务器
- **`zp-cli: 自动匹配上传`** — 自动根据 Git 映射匹配目标服务器部署

部署输出会直接显示在 IDE 底部的 External Tools / Run 控制台面板中。

---

## Windows 资源管理器右键

支持在 Windows 系统文件管理器中直接右键上传，免去手动打开命令行终端。安装需要管理员权限。

```bash
# 安装右键菜单（需管理员权限运行终端）
zp-cli install menu

# 卸载右键菜单
zp-cli uninstall menu
```

安装后可在文件、文件夹或空白处看到「**用 zp-cli 上传**」菜单项：

| 右键位置 | 行为 |
|---------|------|
| 单个文件 | 上传该文件 |
| 文件夹 | 上传该文件夹 |
| 多选文件/文件夹 | 自动排队合并为一个终端窗口，执行一次批量上传 |
| 文件夹空白处 | 上传当前目录 `.` |

多选上传时，右键脚本会先收集 Explorer 传入的路径，再转换为类似下面的命令执行：

```powershell
zp-cli up .\page\ .\js\
```

> 💡 Windows 11 用户在点击右键后，需要点击「显示更多选项」或按住 `Shift` 再右键才能看到该菜单项。
>
> 右键脚本安装在 `~/.zp-cli/` 目录下，包括 `.cmd`、`.vbs`、`.ps1` 辅助脚本。

---

## sync 命令详解

`sync` 命令用于管理 `~/.zp-cli.json` 配置文件的远程同步，方便在多台电脑间同步部署配置。

```bash
zp-cli sync <操作> [历史文件名] [选项]
```

### 操作列表

| 操作 | 说明 | 安全提示 |
|------|------|----------|
| `push` | 推送本地配置到同步服务覆盖服务端 | ⚠️ **需密码二次确认**，防止误覆盖远端团队配置 |
| `pull` | 从同步服务拉取配置覆盖本地 | 自动在本地生成备份（`~/.zp-cli.json.bak-xxx`） |
| `history` | 查看服务端历史备份版本列表 | 查看历史文件名、大小与提交时间 |
| `restore <文件名>` | 将指定历史版本恢复为当前配置并下发到本地 | ⚠️ **需密码二次确认**，覆盖服务端与本地配置 |

### 安全防护与密码确认

为防止误操作导致团队配置丢失，从 v0.0.8 起，执行 **`push`** 和 **`restore`** 这类破坏性写操作时，终端会强制进行交互式密码确认：

```bash
zp-cli sync push
# ⚠️  推送将覆盖同步服务端现有配置
# ? 请输入同步服务 API 密码以确认: ********
```

**选项说明：**

| 选项 | 简写 | 说明 |
|------|------|------|
| `--yes` | `-y` | 跳过交互式密码确认（直接校验配置文件中的密码后执行，适合脚本自动化使用） |
| `--password <密码>` | `-p` | 直接通过命令行传入密码进行校验 |

**使用示例：**

```bash
# 1. 默认交互确认推送
zp-cli sync push

# 2. 脚本/快捷跳过确认推送
zp-cli sync push -y

# 3. 从服务端拉取最新配置覆盖本地
zp-cli sync pull
# 简写
zp-cli s pull

# 4. 查看历史版本
zp-cli s history

# 5. 恢复指定历史版本（输入密码确认）
zp-cli sync restore 20260902-180000.json

# 6. 跳过确认恢复历史版本
zp-cli sync restore 20260902-180000.json -y
```

---

## 配置文件说明

配置文件路径：`~/.zp-cli.json`

### 配置文件结构
> 初始化后可以直接替换 `syncService` 为 `InN5bmNTZXJ2aWNlIjogewogICAgInVybCI6ICJodHRwOi8venAtY2xpLmxpemhpeHUuY24vYXBpLnBocCIsCiAgICAiYXBpUGFzc3dvcmQiOiAiaXB0djIwMjYtYXBpIgogIH0=` (需要base64解密)

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

**A:** 使用 npm `tar` 包进行跨平台打包，不依赖系统 `tar` 命令。请确认依赖已正确安装，可尝试重新执行 `npm install` 或重新全局安装 zp-cli。

### Q: 如何查看当前配置？

**A:** 使用 `zp-cli config show` 命令。

### Q: 如何查看配置文件路径？

**A:** 使用 `zp-cli config path` 命令。

### Q: 在 VS Code 或 WebStorm 中右键为什么没有生效？

**A:**

- **VS Code**: 执行 `zp-cli install vscode` 后，在 VS Code 按 `Ctrl+Shift+P` 执行「开发人员: 重载窗口 (Reload Window)」即可立即生效。
- **WebStorm**: External Tools 在 IDE 运行时不会热加载，请**完全退出 WebStorm 后再执行 `zp-cli install webstorm`**，重新打开 IDE 即可看到「External Tools → zp-cli: ...」菜单。

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
│   │   ├── upload.js               # 上传部署逻辑（支持跨目录精确匹配 Git 仓库）
│   │   ├── install.js              # Windows 资源管理器右键菜单安装/卸载
│   │   ├── vscode.js               # VS Code 官方扩展安装/卸载
│   │   ├── webstorm.js             # WebStorm External Tools 安装/卸载
│   │   └── sync.js                 # 配置同步服务命令（带安全密码确认）
│   ├── core/
│   │   ├── configManager.js        # 配置读写与验证
│   │   ├── gitHelper.js            # Git 仓库感知、URL 归一化、路径映射
│   │   └── sshDeployer.js          # SSH 连接、打包、上传、解压
│   └── utils/
│       └── logger.js               # 终端彩色输出
├── vscode-extension/               # VS Code 官方扩展源码与安装包
│   ├── package.json                # 扩展配置、菜单与命令声明
│   ├── extension.js                # 扩展运行逻辑（多选、QuickPick 选择服务器、Output 流式日志）
│   ├── readme.md                   # 扩展说明文档
│   └── zp-cli-vscode.vsix          # 打包好的离线安装包（固定命名，无版本号后缀）
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
│  zp-cli install vscode          安装 VS Code 官方右键扩展     │
│  zp-cli install webstorm        安装 WebStorm 外部工具菜单    │
│  zp-cli install menu            安装 Windows 资源管理器右键   │
│  zp-cli s push                  推送配置（需输入密码二次确认）│
│  zp-cli s push -y               跳过确认直接推送配置          │
│  zp-cli s pull                  从同步服务拉取配置            │
│  zp-cli s restore <file>        恢复历史配置（需密码确认）    │
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

### v0.0.9 (2026-09-03)

**构建与产物优化：**
- 📦 **VS Code 扩展产物固定命名**：编译输出文件统一为 `zp-cli-vscode.vsix`（不再附加版本号后缀），避免每次版本升级产生文件重命名冗余与旧包残留。
- 🛠️ **安装命令自动适配**：`zp-cli install vscode` 自动寻找并安装固定命名的 `zp-cli-vscode.vsix`。

### v0.0.8 (2026-09-02)

**安全与稳定性改进：**
- 🔒 **配置同步密码二次确认**：`zp-cli sync push` 与 `zp-cli sync restore` 增加交互式密码确认机制，防止误操作覆盖服务端与本地配置。支持 `-y, --yes` 参数跳过确认，支持 `-p, --password <密码>` 参数直接指定。
- 📦 **VS Code 扩展升级**：扩展同步更新至 0.0.8，`package.json` 提供 `"build:vscode"` 便捷打包脚本。

### v0.0.7 (2026-09-02)

**功能新增：**

- 💻 **VS Code 官方扩展支持**：
  - 新增 `zp-cli install vscode` / `zp-cli uninstall vscode` 一键静默安装/卸载命令。
  - 支持资源管理器多选/单选文件、文件夹右键批量上传。
  - 支持原生顶部下拉弹窗（QuickPick）动态选择目标服务器（实时读取配置，增删服务器免重装）。
  - 支持在 VS Code 底部「输出 (Output)」面板切换到 `zp-cli` 查看流式上传与解压日志。
- 🛠️ **WebStorm 外部工具集成**：
  - 新增 `zp-cli install webstorm` / `zp-cli uninstall webstorm`。
  - 自动探测 WebStorm 实际配置目录（支持探测 Toolbox 的 `-Didea.config.path` 参数与新版 `toolSet` XML schema）。
  - 按服务器生成右键子菜单与自动匹配上传项。
- 🔍 **跨目录 Git 仓库智能感知**：
  - 重构 `gitHelper.js` 与 `upload.js`，支持从任意工作目录下精准探测传入文件所在的真实 Git 根目录，彻底解决在不同项目路径下调用时的"不在 Git 仓库内"误判问题。

### v0.0.6 (2026-07-27)

**问题修复：**
- 修复 `subdirectoryMappings` 直接传根目录时（如 `dist`），因 `relativePath` 为空导致解压到远程目标父目录的问题。使用 `--strip-components=1` 保证直接解压到 `remoteBase`。

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

*文档更新日期: 2026-09-03*
