# @yacshy/wait-dom-stable

等待 DOM 树稳定后再执行操作，用于准确判断单页面应用（SPA）是否真正渲染完成。

## 为什么需要这个包？

在传统的 Web 开发中，我们通常使用 `window.onload` 或 `DOMContentLoaded` 来判断页面是否加载完成。但在 Vue、React、Angular 等现代框架开发的单页面应用（SPA）中，这些事件触发时，**页面内容实际上并未完全渲染**。

### 问题分析

| 事件 | 触发时机 | 问题 |
|------|---------|------|
| `DOMContentLoaded` | HTML 文档解析完成 | 框架的 JavaScript 代码尚未执行 |
| `window.onload` | 所有资源（图片、样式等）加载完成 | 框架生命周期函数尚未执行，组件尚未渲染 |

对于 SPA 应用，页面内容是通过 JavaScript 动态生成的。`window.onload` 触发时，框架可能还在执行以下操作：

1. 路由初始化
2. 组件挂载
3. 数据请求和状态更新
4. DOM 节点动态插入

因此，直接使用 `window.onload` 会导致操作过早执行，无法获取到最终渲染的 DOM 元素。

### 解决方案

`wait-dom-stable` 通过监听 DOM 变化来判断页面是否真正稳定。当连续一段时间内没有新的 DOM 节点添加或删除时，即认为页面渲染完成。

## 安装

```bash
npm install @yacshy/wait-dom-stable
# 或
pnpm add @yacshy/wait-dom-stable
```

## 使用方法

```typescript
import { waitDomStable } from '@yacshy/wait-dom-stable';

// 等待整个文档稳定
waitDomStable(document.body, 500, 10000)
  .then(() => {
    console.log('页面渲染完成！');
    // 在这里执行需要等待页面加载完成的操作
  })
  .catch(() => {
    console.log('等待超时');
  });
```

## API

### `waitDomStable(dom, idleTime, timeout)`

等待指定 DOM 元素稳定。

#### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `dom` | `HTMLElement` | - | 要监听的 DOM 元素 |
| `idleTime` | `number` | `500` | 稳定等待时间（毫秒），推荐 500-1000 |
| `timeout` | `number` | `10000` | 最大等待时间（毫秒），防止无限等待 |

#### 返回值

`Promise<void>` - 当 DOM 稳定后 resolve，超时后 reject

## 工作原理

1. 使用 `MutationObserver` 监听 DOM 元素的变化
2. 当检测到 DOM 变化时，重置计时器
3. 如果在 `idleTime` 时间内没有新的变化，则认为 DOM 稳定
4. 设置最大 `timeout` 防止因页面持续更新而无限等待

## 使用场景

- **浏览器插件开发**：在页面渲染完成后注入内容
- **自动化测试**：等待页面加载完成后进行断言
- **性能监控**：准确计算首屏渲染时间
- **第三方脚本集成**：确保脚本在正确的时机执行

## 示例

```typescript
// 等待某个特定元素出现并稳定
async function waitForElementAndStable(selector: string): Promise<HTMLElement> {
  const element = await new Promise<HTMLElement>((resolve) => {
    const check = () => {
      const el = document.querySelector(selector);
      if (el) {
        resolve(el as HTMLElement);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
  
  await waitDomStable(element);
  return element;
}

// 使用
waitForElementAndStable('.my-target-element').then((el) => {
  console.log('目标元素已稳定:', el);
});
```

## 注意事项

1. `idleTime` 的值需要根据实际场景调整，复杂页面可能需要更长时间
2. `timeout` 确保即使页面持续更新也不会无限等待
3. 超时后 Promise 会 reject，建议在 catch 中处理超时情况

## 许可证

ISC