# XEpg 框架详细使用说明

## 1. 概述
**XEpg 框架** 是一个专为 IPTV 机顶盒等低资源环境设计的 JavaScript 框架，用于管理页面区域导航、DOM 元素操作和工具函数。它通过 `AreaClass`、`EleClass`、`UtilObj` 和 `Nav` 提供了一套完整的工具，支持链式调用，优化了性能和兼容性。本文档详细介绍每个类中的属性和方法，包含使用场景、参数说明和示例代码。

---

## 2. AreaClass（区域类）

### 2.1 概述
`AreaClass` 用于管理基于网格的导航区域，适用于遥控器导航的电视界面。它支持上下左右键导航、焦点管理、点击事件绑定等功能，适合构建交互式菜单或内容展示区域。`AreaClass` 支持链式调用，需在配置完成后调用 `run()` 方法使设置生效。

### 2.2 构造函数
```javascript
new AreaClass(id)
```
- **参数**：
  
  - `id`（字符串）：区域的 DOM 元素 ID。
- **描述**：创建一个新的 `AreaClass` 实例，用于管理指定 ID 的区域。
- **示例**：
  ```javascript
  var area = new XEpg.Area("nav1");
  ```

### 2.3 属性
以下是 `AreaClass` 的主要属性及其用途：

| 属性名                  | 类型      | 默认值                          | 描述                                                   |
| ----------------------- | --------- | ------------------------------- | ------------------------------------------------------ |
| `areaId`                | 字符串    | 无                              | 区域的唯一 ID，由构造函数传入。                        |
| `column`                | 数字      | 1                               | 区域的列数，表示每行显示的元素数量。                   |
| `row`                   | 数字      | 1                               | 区域的行数，表示显示的行数。                           |
| `startIndex`            | 数字      | 0                               | 元素 ID 的起始索引，用于生成子元素 ID（如 `nav1_0`）。 |
| `upEventObj`            | 对象/数组 | null                            | 上键边界事件的绑定对象，支持跳转区域、元素或执行函数。 |
| `downEventObj`          | 对象/数组 | null                            | 下键边界事件的绑定对象。                               |
| `leftEventObj`          | 对象/数组 | null                            | 左键边界事件的绑定对象。                               |
| `rightEventObj`         | 对象/数组 | null                            | 右键边界事件的绑定对象。                               |
| `subClickEventObj`      | 对象/数组 | null                            | 子元素的点击事件绑定，支持执行函数或页面跳转。         |
| `subFocusEventObj`      | 数组      | `[{"class":"item item_focus"}]` | 子元素获得焦点时的行为（如更改类名）。                 |
| `subBlurEventObj`       | 数组      | `[{"class":"item"}]`            | 子元素失去焦点时的行为。                               |
| `subScrollTextEventObj` | 对象      | null                            | 子元素文字滚动的配置。                                 |
| `subUpEventObj`         | 对象/数组 | null                            | 子元素内部上键事件绑定。                               |
| `subDownEventObj`       | 对象/数组 | null                            | 子元素内部下键事件绑定。                               |
| `subLeftEventObj`       | 对象/数组 | null                            | 子元素内部左键事件绑定。                               |
| `subRightEventObj`      | 对象/数组 | null                            | 子元素内部右键事件绑定。                               |
| `upTarget`              | 对象/数组 | null                            | 上键边界的目标对象（用于记忆功能）。                   |
| `downTarget`            | 对象/数组 | null                            | 下键边界的目标对象。                                   |
| `leftTarget`            | 对象/数组 | null                            | 左键边界的目标对象。                                   |
| `rightTarget`           | 对象/数组 | null                            | 右键边界的目标对象。                                   |
| `selectId`              | 字符串    | null                            | 当前选中的元素 ID。                                    |

**使用说明**：
- 这些属性通常通过对应的 `set` 方法设置（如 `setColumn`），或在事件绑定时自动更新（如 `upEventObj`）。
- `selectId` 表示当前选中的元素，区别于焦点元素（`focusId`），可通过 `setSelectId` 或 `setSelectedId` 修改。
- 事件对象（如 `upEventObj`）支持多种格式：
  - 单一对象：`{"area": {"id": "nav2", "indexs": [0], "isMemory": true}}`
  - 数组：`[{"area": {"id": "nav2"}}, {"func": testFunc}]`
  - 这些对象定义了边界或内部导航的行为。

### 2.4 方法

#### 2.4.1 setSelectId
```javascript
setSelectId(selectId)
```
- **参数**：
  - `selectId`（字符串）：要预设的选中元素 ID。
- **返回值**：`AreaClass` 对象（支持链式调用）。
- **描述**：设置区域的初始选中元素 ID，调用 `run()` 后生效。
- **示例**：
  ```javascript
  XEpg.area("nav1").setSelectId("nav1_1").run();
  ```
  将 `nav1_1` 设置为初始选中元素。

#### 2.4.2 setColumn
```javascript
setColumn(column)
```
- **参数**：
  - `column`（数字）：区域的列数。
- **返回值**：`AreaClass` 对象。
- **描述**：设置区域每行显示的元素数量。
- **示例**：
  ```javascript
  XEpg.area("nav1").setColumn(5).run();
  ```
  配置区域为 5 列。

#### 2.4.3 setRow
```javascript
setRow(row)
```
- **参数**：
  - `row`（数字）：区域的行数。
- **返回值**：`AreaClass` 对象。
- **描述**：设置区域的行数。
- **示例**：
  ```javascript
  XEpg.area("nav1").setRow(3).run();
  ```
  配置区域为 3 行。

#### 2.4.4 setStartIndex
```javascript
setStartIndex(startIndex)
```
- **参数**：
  - `startIndex`（数字）：子元素 ID 的起始索引。
- **返回值**：`AreaClass` 对象。
- **描述**：设置子元素 ID 的起始索引（如 `nav1_3` 表示从索引 3 开始）。
- **示例**：
  ```javascript
  XEpg.area("nav1").setStartIndex(3).run();
  ```
  子元素 ID 从 `nav1_3` 开始。

#### 2.4.5 up
```javascript
up(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：上键边界事件的对象，支持区域跳转、元素跳转或执行函数。
- **返回值**：`AreaClass` 对象。
- **描述**：绑定区域上边界（第一行）的上键行为，可跳转到其他区域、元素或执行函数。
- **事件对象格式**：
  - 区域跳转：`{"area": {"id": "nav2", "indexs": [0,0,0,1,1], "isMemory": true}}`
  - 元素跳转：`{"id": "nav4_0"}`
  - 执行函数：`{"func": testFunc}`
  - 多个操作：`[{"area": {"id": "nav2"}}, {"func": testFunc}]`
- **示例**：
  ```javascript
  XEpg.area("nav1").up({"area": {"id": "nav2", "indexs": [0], "isMemory": true}}).run();
  ```
  当在 `nav1` 第一行按上键时，跳转到 `nav2` 的索引 0 元素，并启用记忆功能。

#### 2.4.6 down
```javascript
down(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：下键边界事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：绑定区域下边界（最后一行）的下键行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").down({"id": "nav4_0"}).run();
  ```
  当在 `nav1` 最后一行按下键时，跳转到 `nav4_0` 元素。

#### 2.4.7 left
```javascript
left(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：左键边界事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：绑定区域左边界（第一列）的左键行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").left([{"func": testFunc}, {"id": "nav4_0"}]).run();
  ```
  当在 `nav1` 第一列按左键时，先执行 `testFunc`，然后跳转到 `nav4_0`。

#### 2.4.8 right
```javascript
right(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：右键边界事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：绑定区域右边界（最后一列）的右键行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").right({"area": {"id": "nav2", "indexs": [0]}}).run();
  ```
  当在 `nav1` 最后一列按右键时，跳转到 `nav2` 的索引 0 元素。

#### 2.4.9 subClick
```javascript
subClick(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：子元素点击事件的绑定对象。
- **返回值**：`AreaClass` 对象。
- **描述**：为区域内子元素绑定点击事件，支持执行函数、跳转 URL 或根据 `title` 属性跳转。
- **事件对象格式**：
  - 执行函数：`{"func": testFunc}`
  - 跳转 URL：`{"url": "test.htm"}`
  - 跳转 `title` URL：`{"titleUrl": ""}`
  - 多个操作：`[{"func": testFunc}, {"url": "test.htm"}]`
- **示例**：
  ```javascript
  XEpg.area("nav1").subClick([{"func": testFunc}, {"url": "test.htm"}]).run();
  ```
  子元素点击时，先执行 `testFunc`，然后跳转到 `test.htm`。

#### 2.4.10 subFocus
```javascript
subFocus(setObj)
```
- **参数**：
  - `setObj`（对象/数组）：子元素获得焦点时的行为。
- **返回值**：`AreaClass` 对象。
- **描述**：定义子元素获得焦点时的行为，如更改类名、样式或执行函数。
- **事件对象格式**：
  - 更改类名：`{"class": "item item_focus"}`
  - 更改样式：`{"style": "left:70px"}`
  - 执行函数：`{"func": testFunc}`
  - 多个操作：`[{"func": testFunc}, {"class": "item item_focus"}]`
- **示例**：
  ```javascript
  XEpg.area("nav1").subFocus({"class": "item item_focus"}).run();
  ```
  子元素获得焦点时，应用 `item item_focus` 类名。

#### 2.4.11 subBlur
```javascript
subBlur(setObj)
```
- **参数**：
  - `setObj`（对象/数组）：子元素失去焦点时的行为。
- **返回值**：`AreaClass` 对象。
- **描述**：定义子元素失去焦点时的行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").subBlur({"class": "item"}).run();
  ```
  子元素失去焦点时，应用 `item` 类名。

#### 2.4.12 subScrollText
```javascript
subScrollText(setObj)
```
- **参数**：
  - `setObj`（对象）：文字滚动配置。
    - `enTextLen`（数字）：显示区域可容纳的英文字符长度（中文算 2 个英文字符）。
    - `enSingleWidth`（数字）：单个字符宽度（通常为 `fontSize/2`）。
    - `moveSpacing`（数字，可选）：每次移动的像素间隔，默认 2。
    - `timeSpacing`（数字，可选）：滚动时间间隔（毫秒），默认 150。
- **返回值**：`AreaClass` 对象。
- **描述**：为子元素配置文字滚动效果，超出长度时自动滚动。
- **示例**：
  ```javascript
  XEpg.area("nav1").subScrollText({"enTextLen": 28, "enSingleWidth": 12}).run();
  ```
  配置子元素文字滚动，显示区域最多 28 个英文字符。

#### 2.4.13 subUp
```javascript
subUp(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：子元素内部上键事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：为子元素绑定内部上键行为，支持执行函数或导航（导航由库自动计算）。
- **示例**：
  ```javascript
  XEpg.area("nav1").subUp({"func": testFunc}).run();
  ```
  子元素按上键时，执行 `testFunc`。

#### 2.4.14 subDown
```javascript
subDown(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：子元素内部下键事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：为子元素绑定内部下键行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").subDown([{"func": testFunc}, {"id": ""}]).run();
  ```
  子元素按下键时，先执行 `testFunc`，然后执行自动导航。

#### 2.4.15 subLeft
```javascript
subLeft(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：子元素内部左键事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：为子元素绑定内部左键行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").subLeft({"func": testFunc}).run();
  ```

#### 2.4.16 subRight
```javascript
subRight(eventObj)
```
- **参数**：
  - `eventObj`（对象/数组）：子元素内部右键事件的对象。
- **返回值**：`AreaClass` 对象。
- **描述**：为子元素绑定内部右键行为。
- **示例**：
  ```javascript
  XEpg.area("nav1").subRight({"func": testFunc}).run();
  ```

#### 2.4.17 getSelectId
```javascript
getSelectId()
```
- **参数**：无。
- **返回值**：字符串，当前选中的元素 ID。
- **描述**：获取区域当前选中的元素 ID。
- **示例**：
  ```javascript
  var selectId = XEpg.area("nav1").getSelectId();
  console.log(selectId); // 输出：nav1_0
  ```

#### 2.4.18 getColumn
```javascript
getColumn()
```
- **参数**：无。
- **返回值**：数字，区域的列数。
- **描述**：获取区域的列数。
- **示例**：
  ```javascript
  var column = XEpg.area("nav1").getColumn();
  console.log(column); // 输出：5
  ```

#### 2.4.19 getRow
```javascript
getRow()
```
- **参数**：无。
- **返回值**：数字，区域的行数。
- **描述**：获取区域的行数。
- **示例**：
  ```javascript
  var row = XEpg.area("nav1").getRow();
  console.log(row); // 输出：3
  ```

#### 2.4.20 run
```javascript
run()
```
- **参数**：无。
- **返回值**：无。
- **描述**：应用所有配置并绑定事件，必须调用以使区域设置生效。
- **示例**：
  ```javascript
  XEpg.area("nav1").setColumn(2).setRow(1).run();
  ```

#### 2.4.21 getSubEleNavObj
```javascript
getSubEleNavObj(index)
```
- **参数**：
  - `index`（数字）：子元素索引。
- **返回值**：对象，目标子元素的对象（如 `{"id": "nav1_2"}`）。
- **描述**：根据索引获取子元素导航对象。
- **示例**：
  ```javascript
  var obj = XEpg.area("nav1").getSubEleNavObj(2);
  console.log(obj); // 输出：{"id": "nav1_2"}
  ```

#### 2.4.22 getSubNavArray
```javascript
getSubNavArray(navObj, inSubObj)
```
- **参数**：
  - `navObj`（对象）：子导航对象，如 `{"id": "nav2_1"}`。
  - `inSubObj`（对象/数组）：需处理的导航对象。
- **返回值**：数组，合成后的导航数组。
- **描述**：将子导航对象与输入对象合并，替换内部导航 ID。
- **示例**：
  ```javascript
  var arr = XEpg.area("nav1").getSubNavArray({"id": "nav2_1"}, [{"func": testFunc}, {"id": ""}]);
  console.log(arr); // 输出：[{"func": testFunc}, {"id": "nav2_1"}]
  ```

#### 2.4.23 getUpObj
```javascript
getUpObj(i, j)
```
- **参数**：
  - `i`（数字）：行索引（从 0 开始）。
  - `j`（数字）：列索引（从 0 开始）。
- **返回值**：对象，上键执行对象。
- **描述**：根据行列索引获取子元素的上键行为对象。
- **示例**：
  ```javascript
  var obj = XEpg.area("nav1").getUpObj(0, 1);
  ```

#### 2.4.24 getDownObj
```javascript
getDownObj(i, j)
```
- **参数**：
  - `i`（数字）：行索引。
  - `j`（数字）：列索引。
- **返回值**：对象，下键执行对象。
- **描述**：获取子元素的下键行为对象。
- **示例**：
  ```javascript
  var obj = XEpg.area("nav1").getDownObj(0, 1);
  ```

#### 2.4.25 getLeftObj
```javascript
getLeftObj(i, j)
```
- **参数**：
  - `i`（数字）：行索引。
  - `j`（数字）：列索引。
- **返回值**：对象，左键执行对象。
- **描述**：获取子元素的左键行为对象。
- **示例**：
  ```javascript
  var obj = XEpg.area("nav1").getLeftObj(0, 1);
  ```

#### 2.4.26 getRightObj
```javascript
getRightObj(i, j)
```
- **参数**：
  - `i`（数字）：行索引。
  - `j`（数字）：列索引。
- **返回值**：对象，右键执行对象。
- **描述**：获取子元素的右键行为对象。
- **示例**：
  ```javascript
  var obj = XEpg.area("nav1").getRightObj(0, 1);
  ```

#### 2.4.27 onOutHandle
```javascript
onOutHandle(positionObj, targetObj, positionStr)
```
- **参数**：
  - `positionObj`（对象）：方位事件对象。
  - `targetObj`（对象）：目标对象（优先处理）。
  - `positionStr`（字符串）：方位字符串（`"top"`, `"down"`, `"left"`, `"right"`）。
- **返回值**：无。
- **描述**：处理区域边界事件，执行跳转或函数调用。
- **示例**：
  ```javascript
  XEpg.area("nav1").onOutHandle(XEpg.area("nav1").upEventObj, null, "top");
  ```

#### 2.4.28 eventObjHandle
```javascript
eventObjHandle(eventObjs, positionStr)
```
- **参数**：
  - `eventObjs`（对象/数组）：事件对象数组。
  - `positionStr`（字符串）：方位字符串。
- **返回值**：无。
- **描述**：处理边界事件对象，执行函数、跳转区域或元素。
- **示例**：
  ```javascript
  XEpg.area("nav1").eventObjHandle([{"func": testFunc}], "top");
  ```

#### 2.4.29 areaHandle
```javascript
areaHandle(itemObj, positionStr)
```
- **参数**：
  - `itemObj`（对象）：区域事件对象。
  - `positionStr`（字符串）：方位字符串。
- **返回值**：无。
- **描述**：处理区域跳转逻辑，更新当前区域和焦点。
- **示例**：
  ```javascript
  XEpg.area("nav1").areaHandle({"id": "nav2", "indexs": [0]}, "top");
  ```

#### 2.4.30 memoryHandle
```javascript
memoryHandle(positionStr, toAreaId, toIndex)
```
- **参数**：
  - `positionStr`（字符串）：方位字符串。
  - `toAreaId`（字符串）：目标区域 ID。
  - `toIndex`（数字）：目标区域索引。
- **返回值**：无。
- **描述**：处理区域记忆功能，记录导航历史。
- **示例**：
  ```javascript
  XEpg.area("nav1").memoryHandle("top", "nav2", 0);
  ```

#### 2.4.31 onOutUp
```javascript
onOutUp()
```
- **参数**：无。
- **返回值**：`AreaClass` 对象。
- **描述**：执行上边界处理逻辑。
- **示例**：
  ```javascript
  XEpg.area("nav1").onOutUp();
  ```

#### 2.4.32 onOutDown
```javascript
onOutDown()
```
- **参数**：无。
- **返回值**：`AreaClass` 对象。
- **描述**：执行下边界处理逻辑。
- **示例**：
  ```javascript
  XEpg.area("nav1").onOutDown();
  ```

#### 2.4.33 onOutLeft
```javascript
onOutLeft()
```
- **参数**：无。
- **返回值**：`AreaClass` 对象。
- **描述**：执行左边界处理逻辑。
- **示例**：
  ```javascript
  XEpg.area("nav1").onOutLeft();
  ```

#### 2.4.34 onOutRight
```javascript
onOutRight()
```
- **参数**：无。
- **返回值**：`AreaClass` 对象。
- **描述**：执行右边界处理逻辑。
- **示例**：
  ```javascript
  XEpg.area("nav1").onOutRight();
  ```

#### 2.4.35 setSelectedId
```javascript
setSelectedId(id)
```
- **参数**：
  - `id`（字符串）：要选中的元素 ID。
- **返回值**：无。
- **描述**：设置并显示选中的元素 ID，更新焦点效果。
- **示例**：
  ```javascript
  XEpg.area("nav1").setSelectedId("nav1_0");
  ```

#### 2.4.36 getTargetAreaEleId
```javascript
getTargetAreaEleId(areaId, index, fromIndexArr, fromIndex)
```
- **参数**：
  - `areaId`（字符串）：目标区域 ID。
  - `index`（数字）：目标区域索引。
  - `fromIndexArr`（数组）：起始区域索引数组。
  - `fromIndex`（数字）：起始区域索引。
- **返回值**：字符串，目标区域元素 ID。
- **描述**：获取目标区域的元素 ID，确保元素存在且可用。
- **示例**：
  ```javascript
  var toId = XEpg.area("nav1").getTargetAreaEleId("nav2", 1, [0,0,1,1], 3);
  ```

#### 2.4.37 getEleIdByIndex
```javascript
getEleIdByIndex(areaIndex)
```
- **参数**：
  - `areaIndex`（数字）：目标区域索引。
- **返回值**：字符串，目标元素 ID。
- **描述**：根据索引获取区域内元素 ID。
- **示例**：
  ```javascript
  var eleId = XEpg.area("nav1").getEleIdByIndex(1);
  ```

#### 2.4.38 getAreaIndexByCurrentId
```javascript
getAreaIndexByCurrentId()
```
- **参数**：无。
- **返回值**：数字，当前元素的索引。
- **描述**：获取区域当前元素的索引。
- **示例**：
  ```javascript
  var index = XEpg.area("nav1").getAreaIndexByCurrentId();
  ```

#### 2.4.39 setIdStartIndexRefreshArea
```javascript
setIdStartIndexRefreshArea(startIndex)
```
- **参数**：
  - `startIndex`（数字）：新的起始索引。
- **返回值**：`AreaClass` 对象。
- **描述**：设置新的起始索引并刷新区域。
- **示例**：
  ```javascript
  XEpg.area("nav1").setIdStartIndexRefreshArea(5);
  ```

#### 2.4.40 clearObj
```javascript
clearObj(startIndex, count)
```
- **参数**：
  - `startIndex`（数字，可选）：起始索引，默认使用 `this.startIndex`。
  - `count`（数字，可选）：清理的元素数量，默认使用 `row * column`。
- **返回值**：无。
- **描述**：清理区域内元素的绑定。
- **示例**：
  ```javascript
  XEpg.area("nav1").clearObj(3, 2);
  ```

#### 2.4.41 deleteObj
```javascript
deleteObj(startIndex, notDelArea)
```
- **参数**：
  - `startIndex`（数字，可选）：起始索引，默认使用 `this.startIndex`。
  - `notDelArea`（布尔值，可选）：是否保留区域对象，默认删除。
- **返回值**：无。
- **描述**：删除区域内元素及区域对象（可选）。
- **示例**：
  ```javascript
  XEpg.area("nav1").deleteObj(3, true);
  ```

### 2.5 示例
```html
<div id="nav1">
  <div id="nav1_0" class="item">Item 1</div>
  <div id="nav1_1" class="item">Item 2</div>
</div>
<script>
  XEpg.area("nav1")
    .setColumn(2)
    .setRow(1)
    .setSelectId("nav1_0")
    .subFocus({"class": "item item_focus"})
    .subBlur({"class": "item"})
    .subClick({"url": "page2.html"})
    .run();
</script>
```
此示例配置了一个 2x1 的导航区域，初始选中 `nav1_0`，点击元素跳转到 `page2.html`。

---

## 3. EleClass（元素类）

### 3.1 概述
`EleClass` 用于操作单个 DOM 元素，提供便捷的方法来管理元素的显示、内容、样式和事件。它支持链式调用，适用于低资源环境的 DOM 操作。

### 3.2 构造函数
```javascript
new EleClass(id)
```
- **参数**：
  - `id`（字符串）：DOM 元素 ID。
- **描述**：创建一个新的 `EleClass` 实例，管理指定 ID 的元素。

### 3.3 属性
| 属性名               | 类型      | 默认值                           | 描述                      |
| -------------------- | --------- | -------------------------------- | ------------------------- |
| `id`                 | 字符串    | 无                               | 元素 ID，由构造函数传入。 |
| `obj`                | 对象      | null                             | 缓存的 DOM 元素对象。     |
| `scrollTextEventObj` | 对象      | null                             | 文字滚动事件配置。        |
| `upEventObj`         | 对象/数组 | null                             | 上键事件绑定对象。        |
| `downEventObj`       | 对象/数组 | null                             | 下键事件绑定对象。        |
| `leftEventObj`       | 对象/数组 | null                             | 左键事件绑定对象。        |
| `rightEventObj`      | 对象/数组 | null                             | 右键事件绑定对象。        |
| `clickEventObj`      | 对象/数组 | null                             | 点击事件绑定对象。        |
| `focusEventObj`      | 数组      | `[{"class": "item item_focus"}]` | 获得焦点事件绑定。        |
| `blurEventObj`       | 数组      | `[{"class": "item"}]`            | 失去焦点事件绑定。        |

### 3.4 方法

#### 3.4.1 clearObj
```javascript
clearObj()
```
- **参数**：无。
- **返回值**：`EleClass` 对象。
- **描述**：清除缓存的 DOM 对象，适用于 HTML 内容替换后刷新操作。
- **示例**：
  ```javascript
  XEpg.$("testDiv").clearObj();
  ```

#### 3.4.2 deleteObj
```javascript
deleteObj(locationObj)
```
- **参数**：
  - `locationObj`（对象，可选）：父容器位置调整对象，如 `{"direction": "left", "val": 20}`。
- **返回值**：无。
- **描述**：删除 DOM 元素及其缓存，可调整父容器位置。
- **示例**：
  ```javascript
  XEpg.$("testDiv").deleteObj({"direction": "left", "val": 20});
  ```

#### 3.4.3 show
```javascript
show()
```
- **参数**：无。
- **返回值**：`EleClass` 对象。
- **描述**：显示元素（设置 `display: block`）。
- **示例**：
  ```javascript
  XEpg.$("testDiv").show();
  ```

#### 3.4.4 hide
```javascript
hide()
```
- **参数**：无。
- **返回值**：`EleClass` 对象。
- **描述**：隐藏元素（设置 `display: none`）。
- **示例**：
  ```javascript
  XEpg.$("testDiv").hide();
  ```

#### 3.4.5 html
```javascript
html(val)
```
- **参数**：
  - `val`（字符串，可选）：要设置的 HTML 内容。
- **返回值**：
  - 若传入 `val`：`EleClass` 对象。
  - 若未传入：字符串，当前 HTML 内容。
- **描述**：设置或获取元素的 HTML 内容。
- **示例**：
  ```javascript
  XEpg.$("testDiv").html("New Content"); // 设置
  var content = XEpg.$("testDiv").html(); // 获取
  ```

#### 3.4.6 addHtml
```javascript
addHtml(val, isbefore)
```
- **参数**：
  - `val`（字符串）：要添加的 HTML 内容。
  - `isbefore`（布尔值，可选）：是否前置添加，默认后置。
- **返回值**：`EleClass` 对象。
- **描述**：在元素内容前或后追加 HTML。
- **示例**：
  ```javascript
  XEpg.$("testDiv").addHtml("<span>Test</span>", true); // 前置添加
  ```

#### 3.4.7 value
```javascript
value(val)
```
- **参数**：
  - `val`（字符串，可选）：要设置的值。
- **返回值**：
  - 若传入 `val`：`EleClass` 对象。
  - 若未传入：字符串，当前值。
- **描述**：设置或获取输入元素的值。
- **示例**：
  ```javascript
  XEpg.$("testInput").value("test"); // 设置
  var val = XEpg.$("testInput").value(); // 获取
  ```

#### 3.4.8 addValue
```javascript
addValue(val, isbefore)
```
- **参数**：
  - `val`（字符串）：要添加的值。
  - `isbefore`（布尔值，可选）：是否前置添加，默认后置。
- **返回值**：`EleClass` 对象。
- **描述**：在输入元素值前或后追加内容。
- **示例**：
  ```javascript
  XEpg.$("testInput").addValue("prefix_", true); // 前置添加
  ```

#### 3.4.9 style
```javascript
style(val)
```
- **参数**：
  - `val`（字符串，可选）：要设置的样式字符串。
- **返回值**：
  - 若传入 `val`：`EleClass` 对象。
  - 若未传入：字符串，当前样式。
- **描述**：设置或获取元素的 CSS 样式。
- **示例**：
  ```javascript
  XEpg.$("testDiv").style("left: 720px"); // 设置
  var style = XEpg.$("testDiv").style(); // 获取
  ```

#### 3.4.10 addStyle
```javascript
addStyle(val)
```
- **参数**：
  - `val`（字符串）：要追加的样式。
- **返回值**：`EleClass` 对象。
- **描述**：追加 CSS 样式。
- **示例**：
  ```javascript
  XEpg.$("testDiv").addStyle("top: 10px");
  ```

#### 3.4.11 removeStyle
```javascript
removeStyle(val)
```
- **参数**：
  - `val`（字符串）：要移除的样式。
- **返回值**：`EleClass` 对象。
- **描述**：移除指定的 CSS 样式。
- **示例**：
  ```javascript
  XEpg.$("testDiv").removeStyle("left: 720px");
  ```

#### 3.4.12 className
```javascript
className(val)
```
- **参数**：
  - `val`（字符串，可选）：要设置的类名。
- **返回值**：
  - 若传入 `val`：`EleClass` 对象。
  - 若未传入：字符串，当前类名。
- **描述**：设置或获取元素的类名。
- **示例**：
  ```javascript
  XEpg.$("testDiv").className("item item_select"); // 设置
  var className = XEpg.$("testDiv").className(); // 获取
  ```

#### 3.4.13 addClassName
```javascript
addClassName(val)
```
- **参数**：
  - `val`（字符串）：要追加的类名。
- **返回值**：`EleClass` 对象。
- **描述**：追加类名（避免重复添加）。
- **示例**：
  ```javascript
  XEpg.$("testDiv").addClassName("item_select");
  ```

#### 3.4.14 removeClassName
```javascript
removeClassName(val)
```
- **参数**：
  - `val`（字符串）：要移除的类名。
- **返回值**：`EleClass` 对象。
- **描述**：移除指定的类名。
- **示例**：
  ```javascript
  XEpg.$("testDiv").removeClassName("item_select");
  ```

#### 3.4.15 styleAttr
```javascript
styleAttr(key, val)
```
- **参数**：
  - `key`（字符串）：样式属性名。
  - `val`（字符串，可选）：样式值。
- **返回值**：
  - 若传入 `val`：`EleClass` 对象。
  - 若未传入：字符串，样式值。
- **描述**：设置或获取单个样式属性。
- **示例**：
  ```javascript
  XEpg.$("testDiv").styleAttr("left", "90px"); // 设置
  var left = XEpg.$("testDiv").styleAttr("left"); // 获取
  ```

### 3.5 示例
```html
<div id="testDiv" class="item">Hello</div>
<script>
  XEpg.$("testDiv")
    .show()
    .html("Updated Content")
    .addClassName("item_select")
    .style("left: 100px");
</script>
```

---

## 4. UtilObj（工具类）

### 4.1 概述
`UtilObj` 提供了一系列实用工具函数，用于 AJAX 请求、字符串处理、Cookie 管理、URL 操作等，适用于 IPTV 应用的各种辅助功能。

### 4.2 方法

#### 4.2.1 createJsonp
```javascript
createJsonp(id, url)
```
- **参数**：
  - `id`（字符串）：JSONP 脚本的 ID。
  - `url`（字符串）：请求地址。
- **返回值**：无。
- **描述**：创建 JSONP 请求，动态添加 `<script>` 标签。
- **示例**：
  ```javascript
  XEpg.Util.createJsonp("jsonp1", "test.htm?callback=handleResponse");
  ```

#### 4.2.2 deleteJsonp
```javascript
deleteJsonp(id)
```
- **参数**：
  - `id`（字符串）：JSONP 脚本的 ID。
- **返回值**：无。
- **描述**：移除指定的 JSONP 脚本，释放资源。
- **示例**：
  ```javascript
  XEpg.Util.deleteJsonp("jsonp1");
  ```

#### 4.2.3 jsonTrim
```javascript
jsonTrim(str)
```
- **参数**：
  - `str`（字符串）：待处理的字符串。
- **返回值**：字符串，处理后的字符串。
- **描述**：清除字符串中的换行和回车符。
- **示例**：
  ```javascript
  var cleaned = XEpg.Util.jsonTrim("test\nstr");
  ```

#### 4.2.4 isArray
```javascript
isArray(obj)
```
- **参数**：
  - `obj`（任意）：待判断的对象。
- **返回值**：布尔值，是否为数组。
- **描述**：判断对象是否为数组，兼容低端设备。
- **示例**：
  ```javascript
  var isArr = XEpg.Util.isArray([1, 2, 3]); // true
  ```

#### 4.2.5 argumentsToArray
```javascript
argumentsToArray(setObj)
```
- **参数**：
  - `setObj`（对象）：函数的 `arguments` 对象。
- **返回值**：数组，转换后的数组。
- **描述**：将 `arguments` 对象转为数组。
- **示例**：
  ```javascript
  function test() {
    return XEpg.Util.argumentsToArray(arguments);
  }
  var arr = test({"func": testFunc}); // [{"func": testFunc}]
  ```

#### 4.2.6 ajaxGet
```javascript
ajaxGet(url, callBack, time)
```
- **参数**：
  - `url`（字符串）：请求地址。
  - `callBack`（函数，可选）：回调函数，异步时使用。
  - `time`（数字，可选）：超时时间（毫秒），默认 3000。
- **返回值**：
  - 同步：字符串，响应内容。
  - 异步：无。
- **描述**：执行 AJAX GET 请求，支持同步和异步。
- **示例**：
  ```javascript
  XEpg.Util.ajaxGet("test.htm", function(data) { console.log(data); });
  ```

#### 4.2.7 ajaxPost
```javascript
ajaxPost(url, content, callBack, time)
```
- **参数**：
  - `url`（字符串）：请求地址。
  - `content`（字符串）：请求内容。
  - `callBack`（函数，可选）：回调函数。
  - `time`（数字，可选）：超时时间，默认 3000。
- **返回值**：
  - 同步：字符串，响应内容。
  - 异步：无。
- **描述**：执行 AJAX POST 请求。
- **示例**：
  ```javascript
  XEpg.Util.ajaxPost("test.htm", "p1=a", function(data) { console.log(data); });
  ```

#### 4.2.8 gotoPage
```javascript
gotoPage(url)
```
- **参数**：
  - `url`（字符串）：跳转地址。
- **返回值**：无。
- **描述**：跳转到指定页面，自动添加用户会话信息（若适用）。
- **示例**：
  ```javascript
  XEpg.Util.gotoPage("test.htm");
  ```

#### 4.2.9 setCookie
```javascript
setCookie(key, val)
```
- **参数**：
  - `key`（字符串）：Cookie 键。
  - `val`（字符串）：Cookie 值。
- **返回值**：无。
- **描述**：设置 Cookie，默认保存 7 天。
- **示例**：
  ```javascript
  XEpg.Util.setCookie("testCookie", "value");
  ```

#### 4.2.10 getCookie
```javascript
getCookie(key)
```
- **参数**：
  - `key`（字符串）：Cookie 键。
- **返回值**：字符串，Cookie 值，或 `null`。
- **描述**：获取指定 Cookie 的值。
- **示例**：
  ```javascript
  var value = XEpg.Util.getCookie("testCookie");
  ```

#### 4.2.11 delCookie
```javascript
delCookie(key)
```
- **参数**：
  - `key`（字符串）：Cookie 键。
- **返回值**：无。
- **描述**：删除指定 Cookie。
- **示例**：
  ```javascript
  XEpg.Util.delCookie("testCookie");
  ```

#### 4.2.12 objectToStr
```javascript
objectToStr(jsonObj)
```
- **参数**：
  - `jsonObj`（对象）：JSON 对象或数组。
- **返回值**：字符串，转换后的字符串。
- **描述**：将 JSON 对象转为字符串。
- **示例**：
  ```javascript
  var str = XEpg.Util.objectToStr({"id": 3, "name": "test"});
  ```

#### 4.2.13 convertStr2Obj
```javascript
convertStr2Obj(paramStr)
```
- **参数**：
  - `paramStr`（字符串）：参数字符串，如 `"index=1&name=abc"`。
- **返回值**：对象，转换后的对象。
- **描述**：将参数字符串转为对象。
- **示例**：
  ```javascript
  var obj = XEpg.Util.convertStr2Obj("index=1&name=abc"); // {index: "1", name: "abc"}
  ```

#### 4.2.14 getStrRealLen
```javascript
getStrRealLen(str)
```
- **参数**：
  - `str`（字符串）：输入字符串。
- **返回值**：数字，字符串长度（中文算 2）。
- **描述**：计算字符串的真实长度，中文字符算 2 个长度。
- **示例**：
  ```javascript
  var len = XEpg.Util.getStrRealLen("test测试"); // 8
  ```

#### 4.2.15 getSubStr
```javascript
getSubStr(str, len, isSuffix)
```
- **参数**：
  - `str`（字符串）：输入字符串。
  - `len`（数字）：截取长度（中文算 2）。
  - `isSuffix`（布尔值，可选）：是否添加省略号，默认 false。
- **返回值**：字符串，截取后的字符串。
- **描述**：截取字符串，超出长度时可添加省略号。
- **示例**：
  ```javascript
  var sub = XEpg.Util.getSubStr("test测试", 6, true); // "test测..."
  ```

#### 4.2.16 numSupplyZero
```javascript
numSupplyZero(initNumStr, numStr)
```
- **参数**：
  - `initNumStr`（字符串）：初始数字字符串。
  - `numStr`（字符串）：目标数字字符串。
- **返回值**：字符串，补零后的字符串。
- **描述**：在数字前补零。
- **示例**：
  ```javascript
  var str = XEpg.Util.numSupplyZero("112", "0000"); // "0112"
  ```

#### 4.2.17 getPageTotal
```javascript
getPageTotal(totalNum, pageSize)
```
- **参数**：
  - `totalNum`（数字）：总条数。
  - `pageSize`（数字）：每页条数。
- **返回值**：数字，总页数。
- **描述**：计算总页数。
- **示例**：
  ```javascript
  var total = XEpg.Util.getPageTotal(112, 10); // 12
  ```

#### 4.2.18 getSliceList
```javascript
getSliceList(objs, pageIndex, pageSize)
```
- **参数**：
  - `objs`（数组）：数据数组。
  - `pageIndex`（数字）：页码。
  - `pageSize`（数字）：每页条数。
- **返回值**：数组，当前页数据。
- **描述**：获取指定页的数据切片。
- **示例**：
  ```javascript
  var list = XEpg.Util.getSliceList([1,3,5,6,8,9,7], 2, 3); // [6,8,9]
  ```

#### 4.2.19 replaceUrlParams
```javascript
replaceUrlParams(url, key, value)
```
- **参数**：
  - `url`（字符串）：原始 URL。
  - `key`（字符串）：参数键。
  - `value`（字符串/数字）：参数值。
- **返回值**：字符串，替换后的 URL。
- **描述**：替换或添加 URL 参数。
- **示例**：
  ```javascript
  var url = XEpg.Util.replaceUrlParams("test.htm?a=cc", "a", "oo"); // "test.htm?a=oo"
  ```

#### 4.2.20 getUrlParam
```javascript
getUrlParam(strname, url)
```
- **参数**：
  - `strname`（字符串）：参数名。
  - `url`（字符串，可选）：目标 URL，默认当前页面 URL。
- **返回值**：字符串，参数值，或 `null`。
- **描述**：获取 URL 中的参数值。
- **示例**：
  ```javascript
  var param = XEpg.Util.getUrlParam("a", "test.htm?a=cc"); // "cc"
  ```

#### 4.2.21 getUrlParameterObj
```javascript
getUrlParameterObj(url)
```
- **参数**：
  - `url`（字符串，可选）：目标 URL，默认当前页面 URL。
- **返回值**：对象，URL 参数对象。
- **描述**：获取 URL 中的所有参数作为对象。
- **示例**：
  ```javascript
  var params = XEpg.Util.getUrlParameterObj("test.htm?a=cc&b=kk"); // {a: "cc", b: "kk"}
  ```

#### 4.2.22 timeFormat
```javascript
timeFormat(time)
```
- **参数**：
  - `time`（数字）：时间（秒）。
- **返回值**：字符串，格式化时间（`hh:mm:ss`）。
- **描述**：将秒数格式化为 `hh:mm:ss` 格式。
- **示例**：
  ```javascript
  var time = XEpg.Util.timeFormat(5700); // "01:35:00"
  ```

#### 4.2.23 addNavigationUrl
```javascript
addNavigationUrl(url)
```
- **参数**：
  - `url`（字符串）：导航地址。
- **返回值**：无。
- **描述**：将页面 URL 记录到导航历史（存储在 Cookie 中）。
- **示例**：
  ```javascript
  XEpg.Util.addNavigationUrl("test.htm");
  ```

#### 4.2.24 gotoBackNavigationUrl
```javascript
gotoBackNavigationUrl()
```
- **参数**：无。
- **返回值**：无。
- **描述**：跳转到上一个导航页面，清理导航记录。
- **示例**：
  ```javascript
  XEpg.Util.gotoBackNavigationUrl();
  ```

#### 4.2.25 getLastNavigationUrl
```javascript
getLastNavigationUrl()
```
- **参数**：无。
- **返回值**：字符串，上一个导航 URL。
- **描述**：获取上一个导航 URL，不清理记录。
- **示例**：
  ```javascript
  var url = XEpg.Util.getLastNavigationUrl();
  ```

#### 4.2.26 getBackNavigationUrl
```javascript
getBackNavigationUrl()
```
- **参数**：无。
- **返回值**：字符串，上一个导航 URL。
- **描述**：获取上一个导航 URL，并清理记录。
- **示例**：
  ```javascript
  var url = XEpg.Util.getBackNavigationUrl();
  ```

#### 4.2.27 parseJSON
```javascript
parseJSON(data)
```
- **参数**：
  - `data`（字符串）：JSON 字符串。
- **返回值**：对象，解析后的 JSON 对象。
- **描述**：解析 JSON 字符串，兼容低端设备。
- **示例**：
  ```javascript
  var obj = XEpg.Util.parseJSON('{"id": 1}');
  ```

#### 4.2.28 trim
```javascript
trim(text)
```
- **参数**：
  - `text`（字符串）：输入字符串。
- **返回值**：字符串，清除首尾空格后的字符串。
- **描述**：清除字符串首尾空格。
- **示例**：
  ```javascript
  var str = XEpg.Util.trim("  test  "); // "test"
  ```

#### 4.2.29 each
```javascript
each(obj, callback)
```
- **参数**：
  - `obj`（对象/数组）：要遍历的对象。
  - `callback`（函数）：回调函数，接收索引和值。
- **返回值**：对象，输入对象。
- **描述**：遍历对象或数组，执行回调。
- **示例**：
  ```javascript
  XEpg.Util.each([1, 2, 3], function(i, val) { console.log(i, val); });
  ```

#### 4.2.30 renderTpl
```javascript
renderTpl(data, tpl)
```
- **参数**：
  - `data`（对象/数组）：模板数据。
  - `tpl`（字符串）：模板字符串，包含 `{{key}}` 占位符。
- **返回值**：字符串，渲染后的字符串。
- **描述**：根据数据渲染模板字符串。
- **示例**：
  ```javascript
  var html = XEpg.Util.renderTpl({name: "test"}, "<div>{{name}}</div>"); // "<div>test</div>"
  ```

#### 4.2.31 countDown
```javascript
countDown(seconds, end, run)
```
- **参数**：
  - `seconds`（数字）：倒计时秒数。
  - `end`（函数）：倒计时结束回调。
  - `run`（函数，可选）：每秒回调。
- **返回值**：对象，包含 `stop` 方法。
- **描述**：执行倒计时任务。
- **示例**：
  ```javascript
  var timer = XEpg.Util.countDown(10, function() { console.log("Done"); }, function(s) { console.log(s); });
  timer.stop(); // 停止倒计时
  ```

### 4.3 示例
```javascript
XEpg.Util.ajaxGet("data.json", function(data) {
  var obj = XEpg.Util.parseJSON(data);
  XEpg.$("testDiv").html(XEpg.Util.renderTpl(obj, "<div>{{name}}</div>"));
});
```

---

## 5. Navigation (Nav)

### 5.1 概述
`Nav` 对象管理全局键盘事件，处理遥控器的按键输入（如上下左右、颜色键、返回键等）。它自动绑定事件，开发者可重写特定方法以实现自定义行为。

### 5.2 方法

#### 5.2.1 keyBind
```javascript
keyBind()
```
- **参数**：无。
- **返回值**：无。
- **描述**：绑定键盘事件，自动监听遥控器按键。
- **示例**：
  ```javascript
  XEpg.Nav.keyBind();
  ```

#### 5.2.2 key_red_event
```javascript
key_red_event()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理红色键事件，默认跳转到 `live.html`。
- **示例**：
  ```javascript
  XEpg.Nav.key_red_event = function() { console.log("Red key pressed"); };
  ```

#### 5.2.3 key_green_event
```javascript
key_green_event()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理绿色键事件，默认跳转到 `lookback.html`。
- **示例**：
  ```javascript
  XEpg.Nav.key_green_event = function() { console.log("Green key pressed"); };
  ```

#### 5.2.4 key_yellow_event
```javascript
key_yellow_event()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理黄色键事件，默认跳转到 `dibb.html`。
- **示例**：
  ```javascript
  XEpg.Nav.key_yellow_event = function() { console.log("Yellow key pressed"); };
  ```

#### 5.2.5 key_blue_event
```javascript
key_blue_event()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理蓝色键事件，默认跳转到 `service.html`。
- **示例**：
  ```javascript
  XEpg.Nav.key_blue_event = function() { console.log("Blue key pressed"); };
  ```

#### 5.2.6 timeKeyPageUp
```javascript
timeKeyPageUp()
```
- **参数**：无。
- **返回值**：无。
- **描述**：延迟 500 毫秒处理上页键，防止快速翻页。
- **示例**：
  ```javascript
  XEpg.Nav.timeKeyPageUp();
  ```

#### 5.2.7 timeKeyPageDown
```javascript
timeKeyPageDown()
```
- **参数**：无。
- **返回值**：无。
- **描述**：延迟 500 毫秒处理下页键。
- **示例**：
  ```javascript
  XEpg.Nav.timeKeyPageDown();
  ```

#### 5.2.8 key_up_opt
```javascript
key_up_opt()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理上键，触发当前元素的 `onUp` 方法。
- **示例**：
  ```javascript
  XEpg.Nav.key_up_opt();
  ```

#### 5.2.9 key_down_opt
```javascript
key_down_opt()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理下键。
- **示例**：
  ```javascript
  XEpg.Nav.key_down_opt();
  ```

#### 5.2.10 key_left_opt
```javascript
key_left_opt()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理左键。
- **示例**：
  ```javascript
  XEpg.Nav.key_left_opt();
  ```

#### 5.2.11 key_right_opt
```javascript
key_right_opt()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理右键。
- **示例**：
  ```javascript
  XEpg.Nav.key_right_opt();
  ```

#### 5.2.12 key_click_opt
```javascript
key_click_opt()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理确定键。
- **示例**：
  ```javascript
  XEpg.Nav.key_click_opt();
  ```

#### 5.2.13 key_back_opt
```javascript
key_back_opt()
```
- **参数**：无。
- **返回值**：无。
- **描述**：处理返回键，调用页面自定义返回逻辑。
- **示例**：
  ```javascript
  XEpg.Nav.key_back_opt();
  ```

#### 5.2.14 onPressdNumber
```javascript
onPressdNumber(number)
```
- **参数**：
  - `number`（数字）：按下的数字键。
- **返回值**：无。
- **描述**：处理数字键输入，用于调试。
- **示例**：
  ```javascript
  XEpg.Nav.onPressdNumber = function(num) { console.log("Number pressed:", num); };
  ```

### 5.3 示例
```javascript
XEpg.Nav.key_red_event = function() {
  XEpg.Util.gotoPage("custom_page.html");
};
```

---

## 6. Base64 和 MD5 工具

### 6.1 Base64
提供 Base64 编码和解码功能，支持 `escape` 和 `unescape` 处理。

#### 6.1.1 encode
```javascript
base64.encode(s)
```
- **参数**：
  - `s`（字符串）：待编码字符串。
- **返回值**：字符串，Base64 编码结果。
- **描述**：将字符串编码为 Base64。
- **示例**：
  ```javascript
  var encoded = base64.encode("test"); // "dGVzdA=="
  ```

#### 6.1.2 decode
```javascript
base64.decode(s)
```
- **参数**：
  - `s`（字符串）：Base64 编码字符串。
- **返回值**：字符串，解码结果。
- **描述**：将 Base64 字符串解码。
- **示例**：
  ```javascript
  var decoded = base64.decode("dGVzdA=="); // "test"
  ```

### 6.2 MD5
提供 MD5 加密功能。

#### 6.2.1 MD5
```javascript
MD5(str)
```
- **参数**：
  - `str`（字符串）：待加密字符串。
- **返回值**：字符串，MD5 加密结果（大写）。
- **描述**：对字符串进行 MD5 加密。
- **示例**：
  ```javascript
  var hash = MD5("test"); // "098F6BCD4621D373CADE4E832627B4F6"
  ```

### 6.3 示例
```javascript
var encoded = base64.encode("test");
var hashed = MD5(encoded);
console.log(hashed); // 对 Base64 编码后的字符串进行 MD5 加密
```

---

## 7. 最佳实践
1. **链式调用**：充分利用 `AreaClass` 和 `EleClass` 的链式调用，减少代码冗余。
2. **延迟翻页**：使用 `timeKeyPageUp` 和 `timeKeyPageDown` 避免快速翻页导致的性能问题。
3. **清理资源**：在页面切换或元素移除时，调用 `clearObj` 或 `deleteObj` 释放资源。
4. **兼容性**：测试低端设备，确保事件对象格式（如数组）兼容旧浏览器。
5. **导航记忆**：启用 `isMemory: true` 优化区域间导航体验。

---

## 8. 故障排查
- **事件未触发**：检查是否调用了 `run()` 方法，确保区域配置生效。
- **元素未找到**：确认 DOM 元素 ID 正确，检查 `clearObj` 是否误清除了缓存。
- **导航异常**：验证 `indexs` 数组长度与目标区域的行列数匹配。
- **性能问题**：避免同步 AJAX 请求（`ajaxGet`/`ajaxPost` 无回调），使用异步模式。
