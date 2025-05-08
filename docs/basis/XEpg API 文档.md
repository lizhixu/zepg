# XEpg API 文档

本文档概述了 XEpg JavaScript 库的主要组件和功能，该库专为管理交互式用户界面元素、导航和实用工具函数设计，特别适用于 IPTV 或类似机顶盒环境。库中包括处理区域（`AreaClass`）、元素（`EleClass`）、导航（`NavObj`）和实用工具（`UtilObj`）的类，以及 Base64 编解码和 MD5 哈希功能。

## 概述

XEpg 库为构建交互式界面提供了框架，特别适用于基于电视的应用。它支持：

- **区域管理**：将 UI 元素组织成网格状区域，支持导航和事件处理。
- **元素操作**：通过链式方法管理 DOM 元素，包括样式、事件和内容。
- **导航处理**：处理键盘/遥控器输入，支持方向键、颜色键等。
- **实用工具**：提供 AJAX、Cookie、字符串操作等工具。
- **编码/解码**：包括 Base64 和 MD5 用于数据处理。

库通过全局 `XEpg` 对象访问，包含命名空间如 `XEpg.area`、`XEpg.$`、`XEpg.Nav` 和 `XEpg.Util`。


## AreaClass

`AreaClass` 用于管理网格状的 UI 元素区域，支持导航、焦点处理和事件绑定。它支持链式方法调用以进行配置。

### AreaClass 构造函数

```javascript
new XEpg.Area(id)
```

- **参数**：
  - `id` (string)：区域的唯一标识符。
- **返回值**：`AreaClass` 实例。
- **示例**：
  ```javascript
  var area = new XEpg.Area("nav1");
  ```

### AreaClass 属性

| 属性                    | 类型   | 描述                            |
| ----------------------- | ------ | ------------------------------- |
| `areaId`                | string | 区域的唯一 ID。                 |
| `column`                | number | 网格的列数（默认：1）。         |
| `row`                   | number | 网格的行数（默认：1）。         |
| `startIndex`            | number | 元素 ID 的起始索引（默认：0）。 |
| `selectId`              | string | 当前选中元素的 ID。             |
| `upEventObj`            | object | 区域边界上键的事件。            |
| `downEventObj`          | object | 区域边界下键的事件。            |
| `leftEventObj`          | object | 区域边界左键的事件。            |
| `rightEventObj`         | object | 区域边界右键的事件。            |
| `subClickEventObj`      | object | 子元素的点击事件。              |
| `subFocusEventObj`      | array  | 子元素的焦点显示事件。          |
| `subBlurEventObj`       | array  | 子元素的失焦显示事件。          |
| `subScrollTextEventObj` | object | 子元素的文字滚动设置。          |
| `subUpEventObj`         | object | 子元素的上键事件。              |
| `subDownEventObj`       | object | 子元素的下键事件。              |
| `subLeftEventObj`       | object | 子元素的左键事件。              |
| `subRightEventObj`      | object | 子元素的右键事件。              |
| `upTarget`              | object | 上方向导航的目标。              |
| `downTarget`            | object | 下方向导航的目标。              |
| `leftTarget`            | object | 左方向导航的目标。              |
| `rightTarget`           | object | 右方向导航的目标。              |

### AreaClass 方法

| 方法                                                         | 参数                                                         | 返回值      | 描述                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------- | ------------------------------------ |
| `setSelectId(selectId)`                                      | `selectId` (string)：要设置的选中 ID。                       | `AreaClass` | 设置选中的元素 ID。                  |
| `setColumn(column)`                                          | `column` (number)：列数。                                    | `AreaClass` | 设置网格的列数。                     |
| `setRow(row)`                                                | `row` (number)：行数。                                       | `AreaClass` | 设置网格的行数。                     |
| `setStartIndex(startIndex)`                                  | `startIndex` (number)：元素 ID 的起始索引。                  | `AreaClass` | 设置元素 ID 的起始索引。             |
| `up([...args])`                                              | `args` (object/array)：导航或函数对象。                      | `AreaClass` | 为区域边界上键绑定操作。             |
| `down([...args])`                                            | `args` (object/array)：导航或函数对象。                      | `AreaClass` | 为区域边界下键绑定操作。             |
| `left([...args])`                                            | `args` (object/array)：导航或函数对象。                      | `AreaClass` | 为区域边界左键绑定操作。             |
| `right([...args])`                                           | `args` (object/array)：导航或函数对象。                      | `AreaClass` | 为区域边界右键绑定操作。             |
| `subClick([...args])`                                        | `args` (object/array)：点击事件对象（如 `{func, url}`）。    | `AreaClass` | 为子元素绑定点击事件。               |
| `subFocus([...args])`                                        | `args` (object/array)：焦点事件对象（如 `{class, style}`）。 | `AreaClass` | 为子元素绑定焦点显示事件。           |
| `subBlur([...args])`                                         | `args` (object/array)：失焦事件对象（如 `{class, style}`）。 | `AreaClass` | 为子元素绑定失焦显示事件。           |
| `subScrollText(setObj)`                                      | `setObj` (object)：文字滚动设置（如 `{enTextLen, enSingleWidth}`）。 | `AreaClass` | 配置子元素的文字滚动。               |
| `subUp([...args])`                                           | `args` (object/array)：子元素上键事件对象。                  | `AreaClass` | 为子元素绑定上键事件。               |
| `subDown([...args])`                                         | `args` (object/array)：子元素下键事件对象。                  | `AreaClass` | 为子元素绑定下键事件。               |
| `subLeft([...args])`                                         | `args` (object/array)：子元素左键事件对象。                  | `AreaClass` | 为子元素绑定左键事件。               |
| `subRight([...args])`                                        | `args` (object/array)：子元素右键事件对象。                  | `AreaClass` | 为子元素绑定右键事件。               |
| `getSelectId()`                                              | 无                                                           | string      | 返回选中的元素 ID。                  |
| `getColumn()`                                                | 无                                                           | number      | 返回网格的列数。                     |
| `getRow()`                                                   | 无                                                           | number      | 返回网格的行数。                     |
| `run()`                                                      | 无                                                           | 无          | 应用绑定到元素；必须调用以激活区域。 |
| `getSubEleNavObj(index)`                                     | `index` (number)：元素索引。                                 | object      | 根据索引返回子元素的导航对象。       |
| `getSubNavArray(navObj, inSubObj)`                           | `navObj` (object), `inSubObj` (object)：导航对象。           | array       | 合并子元素的导航对象。               |
| `getUpObj(i, j)`                                             | `i` (number)：行索引，`j` (number)：列索引。                 | object      | 返回网格位置的上键事件对象。         |
| `getDownObj(i, j)`                                           | `i` (number)：行索引，`j` (number)：列索引。                 | object      | 返回网格位置的下键事件对象。         |
| `getLeftObj(i, j)`                                           | `i` (number)：行索引，`j` (number)：列索引。                 | object      | 返回网格位置的左键事件对象。         |
| `getRightObj(i, j)`                                          | `i` (number)：行索引，`j` (number)：列索引。                 | object      | 返回网格位置的右键事件对象。         |
| `onOutHandle(positionObj, targetObj, positionStr)`           | `positionObj` (object), `targetObj` (object), `positionStr` (string)。 | 无          | 处理边界事件（内部使用）。           |
| `eventObjHandle(eventObjs, positionStr)`                     | `eventObjs` (object), `positionStr` (string)。               | 无          | 处理边界的事件对象（内部使用）。     |
| `areaHandle(itemObj, positionStr)`                           | `itemObj` (object), `positionStr` (string)。                 | 无          | 处理区域导航（内部使用）。           |
| `memoryHandle(positionStr, toAreaId, toIndex)`               | `positionStr` (string), `toAreaId` (string), `toIndex` (number)。 | 无          | 管理区域的导航记忆。                 |
| `onOutUp()`                                                  | 无                                                           | `AreaClass` | 处理上边界导航。                     |
| `onOutDown()`                                                | 无                                                           | `AreaClass` | 处理下边界导航。                     |
| `onOutLeft()`                                                | 无                                                           | `AreaClass` | 处理左边界导航。                     |
| `onOutRight()`                                               | 无                                                           | `AreaClass` | 处理右边界导航。                     |
| `setSelectedId(id)`                                          | `id` (string)：元素 ID。                                     | 无          | 设置并显示选中的元素。               |
| `getTargetAreaEleId(areaId, index, fromIndexArr, fromIndex)` | `areaId` (string), `index` (number), `fromIndexArr` (array), `fromIndex` (number)。 | string      | 返回导航目标的元素 ID。              |
| `getEleIdByIndex(areaIndex)`                                 | `areaIndex` (number)：目标索引。                             | string      | 根据索引返回目标区域的元素 ID。      |
| `getAreaIndexByCurrentId()`                                  | 无                                                           | number      | 返回区域中当前元素的索引。           |
| `setIdStartIndexRefreshArea(startIndex)`                     | `startIndex` (number)：新的起始索引。                        | `AreaClass` | 使用新的起始索引刷新区域。           |
| `clearObj([startIndex, count])`                              | `startIndex` (number, 可选), `count` (number, 可选)。        | 无          | 清除元素绑定。                       |
| `deleteObj([startIndex, notDelArea])`                        | `startIndex` (number, 可选), `notDelArea` (boolean, 可选)。  | 无          | 删除元素并可选删除区域。             |

---

## EleClass

`EleClass` 提供链式接口用于操作 DOM 元素，包括样式、内容和事件处理。

### EleClass 构造函数

```javascript
new XEpg.EleClass(id)
```

- **参数**：
  - `id` (string)：DOM 元素的 ID。
- **返回值**：`EleClass` 实例。
- **示例**：
  ```javascript
  var element = new XEpg.EleClass("testDiv");
  ```

### EleClass 属性

| 属性                 | 类型   | 描述                                                     |
| -------------------- | ------ | -------------------------------------------------------- |
| `id`                 | string | DOM 元素的 ID。                                          |
| `obj`                | object | 缓存的 DOM 元素引用。                                    |
| `scrollTextEventObj` | object | 文字滚动设置。                                           |
| `upEventObj`         | object | 上键事件绑定。                                           |
| `downEventObj`       | object | 下键事件绑定。                                           |
| `leftEventObj`       | object | 左键事件绑定。                                           |
| `rightEventObj`      | object | 右键事件绑定。                                           |
| `clickEventObj`      | object | 点击事件绑定。                                           |
| `focusEventObj`      | array  | 焦点事件绑定（默认：`[{"class": "item item_focus"}]`）。 |
| `blurEventObj`       | array  | 失焦事件绑定（默认：`[{"class": "item"}]`）。            |

### EleClass 方法

| 方法                        | 参数                                                         | 返回值               | 描述                                 |
| --------------------------- | ------------------------------------------------------------ | -------------------- | ------------------------------------ |
| `clearObj()`                | 无                                                           | `EleClass`           | 清除缓存的 DOM 引用和文字滚动对象。  |
| `deleteObj([locationObj])`  | `locationObj` (object, 可选)：`{direction, val}` 用于父节点定位。 | 无                   | 删除 DOM 元素并清除缓存。            |
| `show()`                    | 无                                                           | `EleClass`           | 显示元素（设置 `display: block`）。  |
| `hide()`                    | 无                                                           | `EleClass`           | 隐藏元素（设置 `display: none`）。   |
| `html([val])`               | `val` (string, 可选)：要设置的 HTML 内容。                   | `EleClass` 或 string | 设置或获取元素的 innerHTML。         |
| `addHtml(val, [isbefore])`  | `val` (string)：要追加的 HTML，`isbefore` (boolean, 可选)：true 为前置追加。 | `EleClass`           | 追加 HTML 内容。                     |
| `value([val])`              | `val` (string, 可选)：要设置的值。                           | `EleClass` 或 string | 设置或获取元素的值（适用于输入框）。 |
| `addValue(val, [isbefore])` | `val` (string)：要追加的值，`isbefore` (boolean, 可选)：true 为前置追加。 | `EleClass`           | 追加元素的值。                       |
| `style([val])`              | `val` (string, 可选)：要设置的 CSS 样式。                    | `EleClass` 或 string | 设置或获取元素的 CSS 样式。          |
| `addStyle(val)`             | `val` (string)：要追加的样式。                               | `EleClass`           | 追加 CSS 样式。                      |
| `removeStyle(val)`          | `val` (string)：要移除的样式。                               | `EleClass`           | 移除指定的 CSS 样式。                |
| `className([val])`          | `val` (string, 可选)：要设置的类名。                         | `EleClass` 或 string | 设置或获取元素的类名。               |
| `addClassName(val)`         | `val` (string)：要添加的类名。                               | `EleClass`           | 如果类名不存在则添加。               |
| `removeClassName(val)`      | `val` (string)：要移除的类名。                               | `EleClass`           | 移除指定的类名。                     |
| `styleAttr(key, [val])`     | `key` (string)：样式属性，`val` (string, 可选)：要设置的值。 | `EleClass` 或 string | 设置或获取特定的样式属性。           |
| `onUp([...args])`           | `args` (object/array)：上键事件对象。                        | `EleClass`           | 绑定上键事件。                       |
| `onDown([...args])`         | `args` (object/array)：下键事件对象。                        | `EleClass`           | 绑定下键事件。                       |
| `onLeft([...args])`         | `args` (object/array)：左键事件对象。                        | `EleClass`           | 绑定左键事件。                       |
| `onRight([...args])`        | `args` (object/array)：右键事件对象。                        | `EleClass`           | 绑定右键事件。                       |
| `onClick([...args])`        | `args` (object/array)：点击事件对象。                        | `EleClass`           | 绑定点击事件。                       |
| `onFocus([...args])`        | `args` (object/array)：焦点事件对象。                        | `EleClass`           | 绑定焦点事件。                       |
| `onBlur([...args])`         | `args` (object/array)：失焦事件对象。                        | `EleClass`           | 绑定失焦事件。                       |
| `scrollText(setObj)`        | `setObj` (object)：文字滚动设置。                            | `EleClass`           | 配置文字滚动。                       |
| `isActive()`                | 无                                                           | boolean              | 检查元素是否激活（可见且未禁用）。   |
| `effectHandle(id)`          | `id` (string)：目标元素 ID。                                 | boolean              | 对目标元素应用导航效果。             |

---

## NavObj

`NavObj` 处理键盘/遥控器输入，支持方向键、颜色键和页面导航。

### NavObj 属性

| 属性                 | 类型   | 描述                     |
| -------------------- | ------ | ------------------------ |
| `keyPageUpTimeObj`   | object | 上页键去抖动的超时对象。 |
| `keyPageDownTimeObj` | object | 下页键去抖动的超时对象。 |

### NavObj 方法

| 方法                     | 参数                            | 返回值 | 描述                                               |
| ------------------------ | ------------------------------- | ------ | -------------------------------------------------- |
| `keyBind()`              | 无                              | 无     | 将按键事件绑定到文档。                             |
| `key_pageUp_event()`     | 无                              | 无     | 处理上页键（默认空操作，需重写）。                 |
| `key_pageDown_event()`   | 无                              | 无     | 处理下页键（默认空操作，需重写）。                 |
| `key_menu_event()`       | 无                              | 无     | 处理菜单键（默认空操作，需重写）。                 |
| `key_home_event()`       | 无                              | 无     | 处理主页键（默认空操作，需重写）。                 |
| `key_exit_event()`       | 无                              | 无     | 处理退出键（默认空操作，需重写）。                 |
| `key_del_event()`        | 无                              | 无     | 处理删除键（默认空操作，需重写）。                 |
| `key_red_event()`        | 无                              | 无     | 如果不在 `live.html`，导航到 `live.html`。         |
| `key_green_event()`      | 无                              | 无     | 如果不在 `lookback.html`，导航到 `lookback.html`。 |
| `key_yellow_event()`     | 无                              | 无     | 如果不在 `dibb.html`，导航到 `dibb.html`。         |
| `key_blue_event()`       | 无                              | 无     | 如果不在 `service.html`，导航到 `service.html`。   |
| `timeKeyPageUp()`        | 无                              | 无     | 为上页键设置 500ms 去抖动延迟。                    |
| `timeKeyPageDown()`      | 无                              | 无     | 为下页键设置 500ms 去抖动延迟。                    |
| `key_up_opt()`           | 无                              | 无     | 触发当前元素的上键事件。                           |
| `key_down_opt()`         | 无                              | 无     | 触发当前元素的下键事件。                           |
| `key_left_opt()`         | 无                              | 无     | 触发当前元素的左键事件。                           |
| `key_right_opt()`        | 无                              | 无     | 触发当前元素的右键事件。                           |
| `key_click_opt()`        | 无                              | 无     | 触发当前元素的点击事件。                           |
| `key_back_opt()`         | 无                              | 无     | 调用自定义返回页面逻辑（`XEpg.My.backPage`）。     |
| `onPressdNumber(number)` | `number` (number)：按下的数字。 | 无     | 处理数字键按下（默认空操作，需重写用于调试）。     |

---

## UtilObj

`UtilObj` 提供实用工具函数，包括 AJAX、Cookie、字符串操作等，优化用于低端设备。

### UtilObj 方法

| 方法                                       | 参数                                                         | 返回值         | 描述                                    |
| ------------------------------------------ | ------------------------------------------------------------ | -------------- | --------------------------------------- |
| `createJsonp(id, url)`                     | `id` (string)：脚本 ID，`url` (string)：JSONP 地址。         | 无             | 创建 JSONP 脚本元素。                   |
| `deleteJsonp(id)`                          | `id` (string)：脚本 ID。                                     | 无             | 删除 JSONP 脚本元素。                   |
| `jsonTrim(str)`                            | `str` (string)：要清理的字符串。                             | string         | 移除字符串中的换行和回车。              |
| `isArray(obj)`                             | `obj` (object)：要检查的对象。                               | boolean        | 检查对象是否为数组。                    |
| `argumentsToArray(setObj)`                 | `setObj` (object)：参数对象。                                | array          | 将参数对象转换为数组。                  |
| `ajaxGet(url, [callBack, time])`           | `url` (string), `callBack` (function, 可选), `time` (number, 可选)。 | string 或 无   | 执行 AJAX GET 请求（同步或异步）。      |
| `ajaxPost(url, content, [callBack, time])` | `url` (string), `content` (string), `callBack` (function, 可选), `time` (number, 可选)。 | string 或 无   | 执行 AJAX POST 请求（同步或异步）。     |
| `gotoPage(url)`                            | `url` (string)：目标地址。                                   | 无             | 导航到指定地址，特定情况下追加会话 ID。 |
| `setCookie(key, val)`                      | `key` (string), `val` (string)：Cookie 键和值。              | 无             | 设置 7 天有效期的 Cookie。              |
| `getCookie(key)`                           | `key` (string)：Cookie 键。                                  | string 或 null | 获取 Cookie 值。                        |
| `delCookie(key)`                           | `key` (string)：Cookie 键。                                  | 无             | 删除 Cookie。                           |
| `objectToStr(jsonObj)`                     | `jsonObj` (object)：JSON 对象。                              | string         | 将 JSON 对象转换为字符串。              |
| `convertStr2Obj(paramStr)`                 | `paramStr` (string)：查询字符串（如 `a=1&b=2`）。            | object         | 将查询字符串转换为对象。                |
| `getStrRealLen(str)`                       | `str` (string)：输入字符串。                                 | number         | 计算字符串真实长度（中文字符计为 2）。  |
| `getSubStr(str, len, [isSuffix])`          | `str` (string), `len` (number), `isSuffix` (boolean, 可选)。 | string         | 截取字符串，可选添加省略号。            |
| `numSupplyZero(initNumStr, numStr)`        | `initNumStr` (string), `numStr` (string)：要格式化的数字。   | string         | 为数字添加前导零。                      |
| `getPageTotal(totalNum, pageSize)`         | `totalNum` (number), `pageSize` (number)。                   | number         | 根据总条数和每页条数计算总页数。        |
| `getSliceList(objs, pageIndex, pageSize)`  | `objs` (array), `pageIndex` (number), `pageSize` (number)。  | array          | 为分页切分数组。                        |
| `replaceUrlParams(url, key, value)`        | `url` (string), `key` (string), `value` (string/number)。    | string         | 替换或追加 URL 参数。                   |
| `getUrlParam(strname, [url])`              | `strname` (string), `url` (string, 可选)。                   | string 或 null | 获取 URL 参数值。                       |
| `getUrlParameterObj([url])`                | `url` (string, 可选)：目标地址。                             | object 或 null | 获取 URL 的所有参数对象。               |
| `timeFormat(time)`                         | `time` (number)：秒数。                                      | string         | 将秒数格式化为 `hh:mm:ss`。             |
| `addNavigationUrl(url)`                    | `url` (string)：要记录的地址。                               | 无             | 将地址添加到导航历史（基于 Cookie）。   |
| `gotoBackNavigationUrl()`                  | 无                                                           | 无             | 导航到上一个历史地址。                  |
| `getLastNavigationUrl()`                   | 无                                                           | string         | 获取最后一个地址，不移除记录。          |
| `getBackNavigationUrl()`                   | 无                                                           | string         | 获取并移除最后一个地址。                |
| `parseJSON(data)`                          | `data` (string)：JSON 字符串。                               | object         | 将 JSON 字符串解析为对象。              |
| `trim(text)`                               | `text` (string)：要清理的文本。                              | string         | 移除文本首尾空白。                      |
| `each(obj, callback)`                      | `obj` (object/array), `callback` (function)：迭代函数。      | object         | 迭代对象或数组。                        |
| `renderTpl(data, tpl)`                     | `data` (object/array), `tpl` (string)：模板字符串。          | string         | 使用数据渲染模板。                      |
| `countDown(seconds, end, [run])`           | `seconds` (number), `end` (function), `run` (function, 可选)。 | object         | 运行倒计时计时器，带回调函数。          |

---

## Base64

提供 Base64 编码和解码，包含 escape/unescape 处理。

### Base64 方法

| 方法               | 参数                          | 返回值 | 描述                    |
| ------------------ | ----------------------------- | ------ | ----------------------- |
| `base64.encode(s)` | `s` (string)：输入字符串。    | string | 将字符串编码为 Base64。 |
| `base64.decode(s)` | `s` (string)：Base64 字符串。 | string | 解码 Base64 字符串。    |

---

## MD5

提供字符串的 MD5 哈希功能。

### MD5 方法

| 方法       | 参数                         | 返回值 | 描述                    |
| ---------- | ---------------------------- | ------ | ----------------------- |
| `MD5(str)` | `str` (string)：输入字符串。 | string | 生成 MD5 哈希（大写）。 |

---

## 使用示例

### 创建和配置区域

```javascript
XEpg.area("nav1")
  .setColumn(5)
  .setRow(2)
  .setStartIndex(0)
  .subFocus([{"class": "item item_focus"}])
  .subBlur([{"class": "item"}])
  .subClick([{"url": "page.html"}])
  .up({"area": {"id": "nav2", "indexs": [0,0,0,1,1], "isMemory": true}})
  .run();
```

### 操作元素

```javascript
XEpg.$("testDiv")
  .html("<p>你好，世界</p>")
  .addClassName("highlight")
  .style("left: 100px; top: 50px")
  .show();
```

### 处理导航

```javascript
// 重写上页事件
XEpg.Nav.key_pageUp_event = function() {
  console.log("上页键按下");
};

// 触发当前元素的点击事件
XEpg.Nav.key_click_opt();
```

### 使用实用工具

```javascript
// AJAX GET 请求
XEpg.Util.ajaxGet("data.json", function(data) {
  console.log(data);
});

// 设置 Cookie
XEpg.Util.setCookie("user", "john_doe");

// 截取字符串
var text = XEpg.Util.getSubStr("你好 世界", 6, true); // 返回 "你好..."
```

### Base64 编码/解码

```javascript
var encoded = base64.encode("你好世界"); // 编码为 Base64
var decoded = base64.decode(encoded); // 解码回 "你好世界"
```

### MD5 哈希

```javascript
var hash = MD5("password123"); // 生成 MD5 哈希
```

---

## 注意事项

- **兼容性**：库针对低端设备（如机顶盒）设计，包含对旧浏览器（如 IE6）的兼容处理。
- **链式方法**：`AreaClass` 和 `EleClass` 支持方法链式调用，代码更简洁。
- **区域激活**：配置 `AreaClass` 后必须调用 `run()` 以应用绑定。
- **导航历史**：使用 Cookie 存储导航历史，可能受存储限制。
- **错误处理**：AJAX 方法在出错时返回空对象以防止崩溃。
- **性能**：谨慎使用同步 AJAX 调用（`ajaxGet`、`ajaxPost` 无回调），因其会阻塞线程。

如需更多详细信息，请参阅源代码注释或联系开发团队。

---

此 API 文档基于提供的代码涵盖了 XEpg 库的核心功能。如需补充或扩展特定部分，请告知！

