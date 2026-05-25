# jangoo

AI 助手项目，基于 Cursor 编辑器扩展的智能编码辅助工具。

## 版本需求

- Node 版本：20.x+
- pnpm 版本：8.x+

## 项目结构

```text
.
├── .agents/                   # 智能代理配置
│   ├── rules/                 # 代理规则定义
│   └── skills/                # 代理技能实现
├── .cursor/                   # Cursor 编辑器配置
│   ├── rules/                 # Cursor 规则文件
│   └── skills/                # Cursor 技能扩展
├── .trae/                     # Trae IDE 配置
├── main/                      # 主应用层
│   ├── extension/             # Chrome 扩展应用（React + WXT）
│   ├── knowledge-base/        # 知识库前端（React + Vite）
│   ├── management/            # 管理后台（React + Vite）
│   └── server/                # 后端服务（NestJS）
├── packages/                  # 共享包
│   └── wait-for-dom-stable/   # DOM 稳定等待工具
├── docs/                      # 项目文档
├── rules/                     # 编码规范规则
├── commitlint.config.js       # Commit 规范配置
├── eslint.config.ts           # ESLint 配置
├── stylelint.config.mjs       # Stylelint 配置
├── pnpm-workspace.yaml        # pnpm Workspace 配置
└── package.json               # Monorepo 根配置
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发模式

#### 启动扩展开发

```bash
pnpm --filter @jangoo/extension dev
```

#### 启动知识库前端

```bash
pnpm --filter @jangoo/knowledge-base dev
```

#### 启动管理后台

```bash
pnpm --filter @jangoo/management dev
```

#### 启动后端服务

```bash
pnpm --filter @jangoo/server start:dev
```

### 3. 构建生产版本

```bash
# 构建所有应用
pnpm build

# 或构建指定应用
pnpm --filter @jangoo/extension build
pnpm --filter @jangoo/knowledge-base build
pnpm --filter @jangoo/management build
pnpm --filter @jangoo/server build
```

## Workspace 说明

根 `package.json` 使用 pnpm workspaces：

- `main/*`：应用层
  - `extension`：Chrome 浏览器扩展
  - `knowledge-base`：知识库管理前端
  - `management`：系统管理后台
  - `server`：后端 API 服务
- `packages/*`：公共库层
  - `wait-for-dom-stable`：DOM 稳定检测工具

## 代码规范

- **ESLint**：JavaScript/TypeScript 代码校验
- **Stylelint**：CSS 样式校验
- **Prettier**：代码格式化
- **Commitlint**：Commit 消息规范

### 代码检查

```bash
pnpm lint
pnpm lint:fix
pnpm format
```

## 后续建议

- 在 `packages/` 中抽离更多通用能力（如 UI 组件库、工具函数）
- 引入 `turbo` 优化多包任务编排与缓存
- 添加单元测试和集成测试