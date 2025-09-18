# Git使用规范手册

## 规范说明

### 🎯 制定目的
为满足新疆EPG项目多人同时开发需求，确保上线代码版本正确性和团队协作效率，特制定此Git使用规范。

### ⚠️ 核心原则
- **严禁直接向master分支推送代码**（特殊情况除外）
- **所有代码必须经过代码审查**
- **遵循统一的提交信息规范**
- **保持分支结构清晰有序**



## 项目管理结构

### 📱 项目地址
```bash
http://gayhub.seeingtv.com/pkvision_cy_epg/epg_xinjiang
```
### 👥 权限管理
- **项目管理员**: 负责代码版本合并与打标签
- **项目拥有者**: 拥有完整仓库权限
- **开发人员**: 只能向开发分支推送代码



## 分支管理策略

### 🌳 分支结构图
```
master (生产环境)
├── dev (开发环境)
├── 20231201-gjx (割接分支)
├── feature-用户登录优化 (功能分支)
├── feature-内容推荐算法 (功能分支)
└── hotfix-紧急修复登录bug (热修复分支)
```

### 📝 分支命名规范

#### 1. 割接分支（由管理员创建）
```bash
# 确定割接时间的分支
20231201-gjx    # 格式：YYYYMMDD-gjx
20240115-gjx    # 2024年1月15日割接

# 创建割接分支
git checkout master
git pull origin master
git checkout -b 20231201-gjx
git push -u origin 20231201-gjx
```

#### 2. 功能开发分支（开发者自行创建）
```bash
# 不确定割接时间的开发分支
feature-用户认证模块
feature-视频播放器优化
feature-数据统计功能

# 创建功能分支
git checkout dev
git pull origin dev
git checkout -b feature-用户认证模块
git push -u origin feature-用户认证模块
```

#### 3. 热修复分支
```bash
# 紧急修复分支
hotfix-修复登录异常
hotfix-解决视频卡顿问题

# 创建热修复分支
git checkout master
git pull origin master
git checkout -b hotfix-修复登录异常
```



## 开发工作流程

### 🚀 标准开发流程

#### 阶段一：准备开发环境
```bash
# 1. 克隆项目（首次）
git clone git@server:mobile/epg-main.git
cd epg-main

# 2. 配置用户信息
git config user.name "张三"
git config user.email "zhangsan@company.com"

# 3. 查看现有分支
git branch -a
```

#### 阶段二：开始功能开发
```bash
# 1. 确保本地dev分支是最新的
git checkout dev
git pull origin dev

# 2. 创建功能分支
git checkout -b feature-用户权限管理

# 3. 开发过程中的提交（重要！）
# 每完成一个小功能就提交一次
git add .
git commit -m "feat(auth): 添加用户角色验证功能"

# 4. 定期推送到远程
git push origin feature-用户权限管理
```

#### 阶段三：日常开发维护
```bash
# 每天开始工作前必须执行！
git checkout dev
git pull origin dev
git checkout feature-用户权限管理
git merge dev  # 合并最新的dev分支代码

# 解决可能的冲突后
git add .
git commit -m "merge: 合并dev分支最新代码"
git push origin feature-用户权限管理
```

#### 阶段四：功能完成后的处理
```bash
# 1. 最终自测确认无误
git add .
git commit -m "feat(auth): 完成用户权限管理功能"

# 2. 推送最终版本
git push origin feature-用户权限管理

# 3. 在GitLab/GitHub创建Merge Request
# 目标分支：dev 或 对应的割接分支
# 标题：[功能] 用户权限管理功能
# 描述：详细说明功能特点和测试情况
```

### 🔄 割接分支工作流程

#### 当割接分支创建后
```bash
# 1. 检查是否有本地开发分支需要合并
git branch

# 2. 将本地功能分支合并到割接分支
git checkout 20231201-gjx
git pull origin 20231201-gjx
git merge feature-用户权限管理

# 3. 解决冲突并测试
git add .
git commit -m "merge: 合并用户权限管理功能到割接分支"

# 4. 推送到远程割接分支
git push origin 20231201-gjx
```



## 提交规范详解

### 📝 提交信息格式
```bash
<type>(<scope>): <subject>

<body>

<footer>
```

### 🏷️ Type类型详解

| 序号 | 类型     | 说明         | 示例                               |
| ---- | -------- | ------------ | ---------------------------------- |
| 1    | feat     | 新功能       | `feat(user): 添加用户登录功能`     |
| 2    | fix      | 修复bug      | `fix(video): 修复视频播放卡顿问题` |
| 3    | docs     | 文档修改     | `docs(readme): 更新部署说明`       |
| 4    | style    | 代码格式化   | `style(css): 调整按钮样式`         |
| 5    | refactor | 代码重构     | `refactor(api): 重构用户接口`      |
| 6    | test     | 测试代码     | `test(auth): 添加登录单元测试`     |
| 7    | chore    | 构建工具变动 | `chore(webpack): 更新构建配置`     |

### 💡 提交信息最佳实践

#### 单个功能提交
```bash
git commit -m "feat(auth): 新增用户登录、注册、密码找回功能"
git commit -m "fix(video): 修复播放器在移动端的兼容性问题"
git commit -m "docs(api): 更新用户接口文档"
```

#### 多类型内容提交（不推荐，建议分开提交）
```bash
git commit -m "feat(auth): 新增登录功能; fix(video): 修复播放异常bug"
```

#### 详细提交信息示例
```bash
git commit -m "feat(epg): 新增EPG节目单功能

- 添加节目单数据获取接口
- 实现节目单UI展示组件
- 支持按时间筛选节目
- 添加节目详情弹窗

Closes #123"
```

### 📋 Scope范围建议
```bash
# 按功能模块
(auth)      # 用户认证相关
(video)     # 视频播放相关
(epg)       # EPG节目单相关
(api)       # 接口相关
(ui)        # 用户界面相关
(db)        # 数据库相关

# 按技术层面
(frontend)  # 前端相关
(backend)   # 后端相关
(config)    # 配置相关
(deploy)    # 部署相关
```



## 合并与发布流程

### 🔀 分支合并规范

#### 1. 开发分支合并到割接分支
```bash
# 开发者操作
git checkout feature-用户管理
git pull origin feature-用户管理

# 切换到割接分支
git checkout 20231201-gjx
git pull origin 20231201-gjx

# 合并功能分支
git merge feature-用户管理

# 解决冲突后提交
git add .
git commit -m "merge: 合并用户管理功能"
git push origin 20231201-gjx
```

#### 2. 申请合并到主分支（重要流程）
```bash
# 在GitLab/GitHub上创建Merge Request
源分支: 20231201-gjx
目标分支: master
标题: [割接] 2023年12月1日割接项目
审查者: @项目管理员

# 合并说明模板
## 割接内容
- [ ] 用户管理功能优化
- [ ] 视频播放器性能提升
- [ ] EPG界面改版
- [ ] 数据统计功能新增

## 测试情况
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 用户验收测试通过

## 风险评估
- 低风险：界面优化
- 中风险：播放器改动
- 需要关注：数据库结构变更
```

#### 3. 管理员合并操作
```bash
# 管理员在Web界面操作
1. 审查代码变更
2. 勾选"压缩提交记录"
3. 填写合并信息：
   Title: 20231201-gjx
   Description: 2023年12月1日割接项目合并
4. 确认合并到master
5. 同步合并到dev分支
```

#### 4. 创建版本标签
```bash
# 管理员操作
git checkout master
git pull origin master

# 创建标签
git tag -a "2023.12.01" -m "2023年12月1日割接项
- 用户管理功能优化
- 视频播放器性能提升
- EPG界面改版升级
- 新增数据统计模块"

# 推送标签
git push origin "2023.12.01"
```

### 📦 发布后清理工作
```bash
# 删除已合并的功能分支
git branch -d feature-用户管理
git push origin --delete feature-用户管理

# 保留割接分支作为历史记录（可选）
# 或删除割接分支
git branch -d 20231201-gjx
git push origin --delete 20231201-gjx
```



## 实用技巧与问题解决

### 🛠️ 高级Git技巧

#### 1. 代码储藏 (Stash) - 临时保存工作
```bash
# 场景：正在开发功能，突然需要切换分支修复紧急bug
# 保存当前工作现场
git stash save "临时保存用户登录功能开发进度"

# 切换到其他分支处理紧急问题
git checkout hotfix-紧急修复

# 处理完毕后回到原分支
git checkout feature-用户登录

# 恢复工作现场
git stash list  # 查看储藏列表
git stash pop   # 恢复最新储藏并删除

# 或者只应用不删除
git stash apply stash@{0}
```

#### 2. 撤销错误操作
```bash
# 撤销工作区的修改
git checkout -- filename.js
git restore filename.js  # Git 2.23+

# 撤销暂存区的文件
git reset HEAD filename.js
git restore --staged filename.js  # Git 2.23+

# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 修改最后一次提交信息
git commit --amend -m "fix(auth): 修复用户登录验证逻辑"

# 危险操作：完全撤销最后一次提交
git reset --hard HEAD~1
```

#### 3. Cherry-pick 精确移植提交
```bash
# 场景：需要将某个分支的特定提交应用到当前分支
# 1. 查看要移植的提交
git log --oneline feature-A

# 2. 切换到目标分支
git checkout feature-B

# 3. 精确移植指定提交
git cherry-pick <commit-hash>

# 4. 移植多个提交
git cherry-pick <commit-hash1> <commit-hash2>

# 5. 移植提交范围
git cherry-pick <start-commit>..<end-commit>
```

### 🚨 常见问题解决方案

#### 问题1：合并冲突处理
```bash
# 1. 合并时出现冲突
git merge feature-branch
# CONFLICT (content): Merge conflict in src/login.js

# 2. 查看冲突状态
git status

# 3. 编辑冲突文件
# <<<<<<< HEAD
# 当前分支的代码
# =======
# 要合并分支的代码
# >>>>>>> feature-branch

# 4. 手动解决冲突后
git add src/login.js
git commit -m "resolve: 解决登录功能合并冲突"

# 5. 推送解决后的代码
git push origin current-branch

# 6. 使用工具辅助解决冲突
git mergetool  # 启动合并工具
```

#### 问题2：误提交到错误分支
```bash
# 场景：本应该提交到feature分支，却提交到了master
# 1. 记录错误提交的hash
git log --oneline -5

# 2. 回退master分支
git reset --hard HEAD~1

# 3. 切换到正确分支并应用提交
git checkout feature-correct-branch
git cherry-pick <错误提交的hash>

# 4. 推送修正
git push origin master --force-with-lease  # 谨慎使用
git push origin feature-correct-branch
```

#### 问题3：远程分支被删除但本地仍存在
```bash
# 1. 查看远程分支状态
git remote show origin

# 2. 清理本地无效的远程分支引用
git remote prune origin

# 3. 删除对应的本地分支
git branch -d feature-已删除的分支

# 4. 查看清理结果
git branch -a
```

#### 问题4：提交历史过于混乱需要整理
```bash
# 使用交互式rebase整理最近3次提交
git rebase -i HEAD~3

# 在编辑器中可以选择：
# pick：保留该提交
# reword：修改提交信息
# edit：修改提交内容
# squash：合并到前一个提交
# drop：删除该提交

# 示例：
# pick abc1234 feat: 添加登录功能
# squash def5678 fix: 修复登录bug
# reword ghi9012 feat: 完善登录逻辑
```

### 🔍 代码审查最佳实践

#### 创建高质量的Merge Request
```bash
# 1. 确保分支是最新的
git checkout feature-user-management
git rebase dev  # 使用rebase保持历史整洁

# 2. 自我审查代码
git diff dev..feature-user-management

# 3. 运行测试确保质量
npm test  # 或相应的测试命令
npm run lint  # 代码规范检查

# 4. 创建MR时的描述模板
```

**Merge Request模板：**

```markdown
## 功能描述
简要描述本次开发的功能特性

## 变更内容
- [ ] 新增用户权限验证模块
- [ ] 优化登录流程用户体验
- [ ] 修复用户信息显示bug
- [ ] 更新相关文档

## 测试情况
- [ ] 单元测试通过 (覆盖率 > 80%)
- [ ] 功能测试通过
- [ ] 兼容性测试通过
- [ ] 性能测试通过

## 截图/录屏
如有UI变更，请提供对比截图

## 风险评估
- 风险等级：低/中/高
- 影响范围：前端/后端/数据库
- 回滚方案：如有需要请说明

## 相关链接
- 需求文档：[链接]
- 设计稿：[链接]
- 测试用例：[链接]
```



## 常用命令速查表

### 🚀 日常开发命令

#### 基础操作
```bash
# 查看状态
git status
git status -s  # 简短格式

# 查看差异
git diff                    # 工作区与暂存区
git diff --staged          # 暂存区与最后提交
git diff HEAD              # 工作区与最后提交
git diff branch1..branch2  # 两个分支间差异

# 添加文件
git add .                  # 添加所有变更
git add -A                 # 添加所有变更（包括删除）
git add -u                 # 只添加已跟踪文件的变更
git add *.js               # 添加所有js文件

# 提交代码
git commit -m "提交信息"
git commit -am "跳过暂存直接提交"
git commit --amend         # 修改最后一次提交
```

#### 分支操作
```bash
# 分支查看
git branch                 # 本地分支
git branch -r             # 远程分支
git branch -a             # 所有分支
git branch -v             # 显示最后一次提交

# 分支创建与切换
git checkout -b new-branch        # 创建并切换
git switch -c new-branch         # Git 2.23+新语法
git checkout existing-branch     # 切换分支
git switch existing-branch       # Git 2.23+新语法

# 分支合并
git merge branch-name            # 合并分支
git merge --no-ff branch-name    # 禁用快进合并
git rebase branch-name           # 变基合并

# 分支删除
git branch -d branch-name        # 安全删除
git branch -D branch-name        # 强制删除
git push origin --delete branch-name  # 删除远程分支
```

#### 远程操作
```bash
# 远程仓库管理
git remote -v                    # 查看远程仓库
git remote add origin <url>      # 添加远程仓库
git remote set-url origin <url>  # 修改远程仓库地址

# 拉取与推送
git fetch origin                 # 获取远程更新
git pull origin branch-name      # 拉取并合并
git pull --rebase origin branch  # 拉取并变基
git push origin branch-name      # 推送分支
git push -u origin branch-name   # 首次推送并设置上游
git push --force-with-lease      # 安全的强制推送
```

### 📋 新疆EPG项目专用命令

#### 割接分支操作
```bash
# 管理员创建割接分支
git checkout master
git pull origin master
git checkout -b 20240315-gjx
git push -u origin 20240315-gjx

# 开发者合并到割接分支
git checkout 20240315-gjx
git pull origin 20240315-gjx
git merge feature-my-feature
git push origin 20240315-gjx
```

#### 标准提交流程
```bash
# 每日开始工作
git checkout dev
git pull origin dev
git checkout feature-my-feature
git merge dev

# 开发过程提交
git add .
git commit -m "feat(epg): 新增节目单筛选功能"
git push origin feature-my-feature

# 功能完成
git add .
git commit -m "feat(epg): 完成节目单模块开发"
git push origin feature-my-feature
# 然后创建Merge Request
```

#### 紧急修复流程
```bash
# 创建热修复分支
git checkout master
git pull origin master
git checkout -b hotfix-fix-login-issue

# 修复并测试
git add .
git commit -m "fix(auth): 修复登录验证异常问题"

# 合并到master和dev
git checkout master
git merge hotfix-fix-login-issue
git push origin master

git checkout dev
git merge hotfix-fix-login-issue
git push origin dev

# 删除热修复分支
git branch -d hotfix-fix-login-issue
```

### 🔧 实用工具命令

#### 历史查看
```bash
# 查看提交历史
git log --oneline -10           # 最近10次提交
git log --graph --oneline       # 图形化显示
git log --author="张三"          # 特定作者的提交
git log --since="2023-12-01"    # 指定时间后的提交
git log --grep="登录"            # 搜索提交信息

# 查看文件历史
git log -p filename             # 文件的变更历史
git blame filename              # 查看文件每行的作者
git show commit-hash            # 查看特定提交详情
```

#### 标签管理
```bash
# 创建标签
git tag v1.0.0
git tag -a v1.0.0 -m "版本1.0.0发布"

# 查看标签
git tag                         # 所有标签
git tag -l "v1.*"              # 匹配的标签
git show v1.0.0                # 标签详情

# 推送标签
git push origin v1.0.0         # 推送单个标签
git push origin --tags         # 推送所有标签

# 删除标签
git tag -d v1.0.0              # 删除本地标签
git push origin --delete v1.0.0 # 删除远程标签
```



## 🎯 团队协作规范

### 📅 日常工作检查清单

#### 每日开始工作前
- [ ] 检查当前所在分支
- [ ] 更新dev分支到本地
- [ ] 将dev分支合并到当前功能分支
- [ ] 解决可能的冲突
- [ ] 运行测试确保代码正常

#### 提交代码前
- [ ] 确认当前分支正确
- [ ] 代码自测通过
- [ ] 提交信息符合规范
- [ ] 先pull再push
- [ ] 检查推送结果

#### 功能开发完成后
- [ ] 最终自测无问题
- [ ] 创建Merge Request
- [ ] 填写详细的MR描述
- [ ] 指定合适的审查者
- [ ] 通知相关人员进行审查

### ⚠️ 禁止操作清单

#### 绝对禁止
- ❌ 直接向master分支推送代码
- ❌ 使用`git push --force`到共享分支
- ❌ 删除他人的分支
- ❌ 修改已推送的公共提交历史
- ❌ 提交包含密码、密钥等敏感信息

#### 谨慎操作
- ⚠️ 使用`git reset --hard`
- ⚠️ 使用`git rebase`修改已推送的提交
- ⚠️ 合并大型功能分支
- ⚠️ 在非自己创建的分支上进行破坏性操作

### 🆘 紧急情况处理

#### 误操作恢复
```bash
# 查看操作历史
git reflog

# 恢复到特定状态
git reset --hard HEAD@{2}

# 恢复被删除的分支
git checkout -b recovered-branch HEAD@{5}
```

#### 联系管理员情况
- 需要恢复被误删的重要分支
- 需要修改master分支的提交历史
- 遇到复杂的合并冲突无法解决
- 需要紧急回滚线上版本
