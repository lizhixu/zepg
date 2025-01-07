# Xepg 框架说明

## EleArrayObj : `object`

选取类数组，放外面，兼容有些盒子不兼容，取不到内部变量

**Kind**: global variable **Access**: public

## setSelectId(selectId) ⇒ `object`

预设选中ID

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param    | Type     | Description |
| -------- | -------- | ----------- |
| selectId | `string` | 选中ID      |

**Example**

```javascript
XEpg.area("nav1").setSelectId("nav1_1");
```



## setColumn(column) ⇒ `object`

设置显示区域一行多少列

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param  | Type     | Description |
| ------ | -------- | ----------- |
| column | `number` | 设置列      |

**Example**

```javascript
XEpg.area("nav1").setColumn(5);
```



## setRow(row) ⇒ `object`

设置显示区域多少行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description |
| ----- | -------- | ----------- |
| row   | `number` | 设置行      |

**Example**

```javascript
XEpg.area("nav1").setRow(3);
```



## setStartIndex(startIndex) ⇒ `object`

设置起始下标

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param      | Type     | Description  |
| ---------- | -------- | ------------ |
| startIndex | `number` | 设置起始下标 |

**Example**

```javascript
XEpg.area("nav1").setStartIndex(3);
```



## up(对象) ⇒ `object`

区域边界上键执行操作绑定，可以去区域，某元素，执行方法，按先后顺序执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").up({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}}); //区域跳转,id为区域ID，indexs 为当前区域顶部下标，对应目标区域的底部下标，isMemory为true为记忆，认为不记忆
```

**Example**

```javascript
XEpg.area("nav1").up({"id":"nav4_0"}); //ID跳转，区域跳某元素ID
```

**Example**

```javascript
XEpg.area("nav1").up([{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}]); //先执行区域后执行方法，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").up({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}); //先执行方法后元素导航,多参数
```



## down(对象) ⇒ `object`

区域边界下键执行操作绑定，可以去区域，某元素，执行方法，按先后顺序执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").down({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}}); //区域跳转,id为区域ID，indexs 为当前区域底部下标，对应目标区域的顶部下标，isMemory为true为记忆默认为不记忆
```

**Example**

```javascript
XEpg.area("nav1").down({"id":"nav4_0"}); //ID跳转，区域跳某元素ID
```

**Example**

```javascript
XEpg.area("nav1").down([{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}]); //先执行区域后执行方法，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").down({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}); //先执行方法后元素导航,多参数
```



## left(对象) ⇒ `object`

区域边界左键执行操作绑定，可以去区域，某元素，执行方法，按先后顺序执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").left({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}}); //区域跳转,id为区域ID，indexs 为当前区域左部下标，对应目标区域的右部下标，isMemory为true为记忆默认为不记忆
```

**Example**

```javascript
XEpg.area("nav1").left({"id":"nav4_0"}); //ID跳转，区域跳某元素ID
```

**Example**

```javascript
XEpg.area("nav1").left([{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}]); //先执行区域后执行方法，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").left({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}); //先执行方法后元素导航,多参数
```



## right(对象) ⇒ `object`

区域边界右键执行操作绑定，可以去区域，某元素，执行方法，按先后顺序执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").right({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}}); //区域跳转,id为区域ID，indexs 为当前区域右部下标，对应目标区域的左部下标，isMemory为true为记 忆，默认为不记忆
```

**Example**

```javascript
XEpg.area("nav1").right({"id":"nav4_0"}); //ID跳转，区域跳某元素ID
```

**Example**

```javascript
XEpg.area("nav1").right([{"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}]); //先执行区域后执行方法，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").right({"area":{"id":"nav2","indexs":[0,0,0,1,1],"isMemory":true}},{"func":testFunc}); //先执行方法后元素导航,多参数
```



## subClick(对象) ⇒ `object`

子元素点击执行操作绑定，可以在按点击触发一个方法，则设置func;也可以跳转url，则设置url,如果要使用title里的url进行跳转，则设置"titleUrl":"";如果是既要触发方法也要执行url跳转，则2个 都设置，放前面的先执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"func":testFunc}多个用逗号隔开如：{"func":testFunc},{"url":"test.htm"},{"titleUrl":""},多个传数组[{"func":testFunc},{"url":"test.htm"},{"titleUrl":""}] |

**Example**

```javascript
XEpg.area("nav1").subClick({"url":"test.htm"});  //点击页面跳转
```

**Example**

```javascript
XEpg.area("nav1").subClick({"titleUrl":""});  //点击根据元素title里值页面跳转
```

**Example**

```javascript
XEpg.area("nav1").subClick([{"func":testFunc},{"url":"test.htm"}]);  //先执行方法后页面跳转，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subClick({"func":testFunc},{"url":"test.htm"});  //先执行方法后页面跳转，多参数
```

**Example**

```javascript
XEpg.area("nav1").subClick({"func":testFunc,"url":"test.htm"});  //先执行方法后页面跳转，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## subFocus(对象) ⇒ `object`

元素焦点显示绑定，可以在焦点显示时触发一个方法，则设置func;也可以改变className，则设置class;也可以改变style,则设置style；如果是既要触发方法也要改变calss，则2个都设置，放前面的先执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"class":"item_select"},多个用逗号隔开如：{"func":testFunc},{"class":"item_focus"},{"style":"left:70px"},多个传数组[{"func":testFunc},{"class":"item_focus"},{"style":"left:70px"}] |

**Example**

```javascript
XEpg.area("nav1").subFocus({"class":"item item_focus"}); //元素焦点展示，改变class
```

**Example**

```javascript
XEpg.area("nav1").subFocus({"style":"left:70px"});  //元素焦点展示，改变style
```

**Example**

```javascript
XEpg.area("nav1").subFocus([{"func":testFunc},{"class":"item item_focus"}]);  //先执行方法后改变class，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subFocus({"func":testFunc},{"class":"item item_focus"});  //先执行方法后改变class，多参数
```

**Example**

```javascript
XEpg.area("nav1").subFocus({"func":testFunc,"class":"item item_focus"});    //先执行方法后改变class，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## subBlur(对象) ⇒ `object`

元素失去焦点显示绑定，可以在失去焦点时触发一个方法，则设置func;也可以改变className，则设置class;也可以改变style,则设置style；如果是既要触发方法也要改变calss，则2个都设置，放前面的执行

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"class":"item_select"},多个用逗号隔开如：{"func":testFunc},{"class":"item"},{"style":"left:70px"},多个传数组[{"func":testFunc},{"class":"item_select"},{"style":"left:70px"}] |

**Example**

```javascript
XEpg.area("nav1").subBlur({"class":"item"}); //元素焦点展示，改变class
```

**Example**

```javascript
XEpg.area("nav1").subBlur({"style":"left:70px"});  //元素焦点展示，改变style
```

**Example**

```javascript
XEpg.area("nav1").subBlur([{"func":testFunc},{"class":"item"}]);  //先执行方法后改变class，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subBlur({"func":testFunc},{"class":"item"});  //先执行方法后改变class，多参数
```

**Example**

```javascript
XEpg.area("nav1").subBlur({"func":testFunc,"class":"item"});    //先执行方法后改变class，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## subScrollText(setObj) ⇒ `object`

设置文字滚动,按英文字符算，一个中文算2个英文字符,enTextLen显示区域所能显示的英文字符总长度，超过则隐藏，enSingleWidth文字大小fontSize/2,moveSpacing移动间隔，不传默认为2，越大动的 幅度越大;timeSpacing时间间隔，不填默认为150ms，越短速度越快

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param  | Type     | Description                                 |
| ------ | -------- | ------------------------------------------- |
| setObj | `object` | 对象 如:`{"enTextLen":28,"enSingleWidth":12}` |

**Example**

```javascript
XEpg.area("nav1").subScrollText({"enTextLen":28,"enSingleWidth":12});  //简单文字滚动赋值
```

**Example**

```javascript
XEpg.area("nav1").subScrollText({"enTextLen":28,"enSingleWidth":12,"moveSpacing":2,"timeSpacing":150});   //文字滚动赋值,自己控制速度与间隔
```



## subUp(对象) ⇒ `object`

区域内部元素上键执行操作绑定，可以在按上键触发一个方法，则设置func;由于内部导航会自动计算，id里面的值不用赋，默认如果没传id对象，是会在执行完内部导航后，执行方法，设置func在ID对象前面，则是执行完方法，后执行导航

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"func":testFunc}多个用逗号隔开如：{"id":""},{"func":testFunc},多个传数组[{"id":""},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").subUp({"func":testFunc}); //执行完导航后执行方法
```

**Example**

```javascript
XEpg.area("nav1").subUp([{"func":testFunc},{"id":""}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subUp({"func":testFunc},{"id":""}); //先执行方法后元素导航,多参数
```



## subDown(对象) ⇒ `object`

区域内部元素下键执行操作绑定，可以在按下键触发一个方法，则设置func;由于内部导航会自动计算，id里面的值不用赋，默认如果没传id对象，是会在执行完内部导航后，执行方法，设置func在ID对象前面，则是执行完方法，后执行导航

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"func":testFunc}多个用逗号隔开如：{"id":""},{"func":testFunc},多个传数组[{"id":""},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").subDown({"func":testFunc}); //执行完导航后执行方法
```

**Example**

```javascript
XEpg.area("nav1").subDown([{"func":testFunc},{"id":""}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subDown({"func":testFunc},{"id":""}); //先执行方法后元素导航,多参数
```



## subLeft(对象) ⇒ `object`

区域内部元素左键执行操作绑定，可以在按左键触发一个方法，则设置func;由于内部导航会自动计算，id里面的值不用赋，默认如果没传id对象，是会在执行完内部导航后，执行方法，设置func在ID对象前面，则是执行完方法，后执行导航

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"func":testFunc}多个用逗号隔开如：{"id":""},{"func":testFunc},多个传数组[{"id":""},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").subLeft({"func":testFunc}); //执行完导航后执行方法
```

**Example**

```javascript
XEpg.area("nav1").subLeft([{"func":testFunc},{"id":""}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subLeft({"func":testFunc},{"id":""}); //先执行方法后元素导航,多参数
```



## subRight(对象) ⇒ `object`

区域内部元素右键执行操作绑定，可以在按右键触发一个方法，则设置func;由于内部导航会自动计算，id里面的值不用赋，默认如果没传id对象，是会在执行完内部导航后，执行方法，设置func在ID对象前面，则是执行完方法，后执行导航

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"func":testFunc}多个用逗号隔开如：{"id":""},{"func":testFunc},多个传数组[{"id":""},{"func":testFunc}] |

**Example**

```javascript
XEpg.area("nav1").subRight({"func":testFunc}); //执行完导航后执行方法
```

**Example**

```javascript
XEpg.area("nav1").subRight([{"func":testFunc},{"id":""}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.area("nav1").subRight({"func":testFunc},{"id":""}); //先执行方法后元素导航,多参数
```



## getSelectId() ⇒ `string`

获取选中ID,区域selectId不是focusId

**Kind**: global function **Returns**: `string` - 已选中ID **Example**

```javascript
var selectId = XEpg.area("nav1").getSelectId();
```



## getColumn() ⇒ `number`

获取可见区域一行多少列

**Kind**: global function **Returns**: `number` - 列 **Example**

```javascript
var column = XEpg.area("nav1").getColumn();
```



## getRow() ⇒ `number`

获取可见区域多少行

**Kind**: global function **Returns**: `number` - 列 **Example**

```javascript
var row = XEpg.area("nav1").getRow();
```



## run()

执行生效,区域绑定完，最后必须.run() 才会生成元素绑定，否则不生效

**Kind**: global function **Example**

```javascript
XEpg.area("nav1").run();
```



## getSubEleNavObj(index) ⇒ `string`

根据下标获取子元素对象

**Kind**: global function **Returns**: `string` - 目标元素对象

| Param | Type     | Description |
| ----- | -------- | ----------- |
| index | `number` | 下标        |

**Example**

```javascript
var obj = XEpg.area("nav1").getSubEleNavObj(2);
```



## getSubNavArray(navObj, inSubObj) ⇒ `object`

根据子导航对象与需处理导航对象获取导航数组，对{"area":{"id",""}}进行内部导航对象替换

**Kind**: global function **Returns**: `object` - 合成导航数组,如{"area":{"func":testFunc,"id":"nav2_1"}}

| Param    | Type     | Description                                         |
| -------- | -------- | --------------------------------------------------- |
| navObj   | `object` | 子导航对象，如{"id":"nav2_1"}                       |
| inSubObj | `object` | 需处理导航对象,如{"area":{"func":testFunc,"id":""}} |

**Example**

```javascript
var arr = XEpg.area("nav1").getSubNavArray(navObj,inSubObj);
```



## getUpObj(i, j) ⇒ `object`

根据行，列下标，获取上键执行对象

**Kind**: global function **Returns**: `object` - 子元素上键执行方法

| Param | Type     | Description     |
| ----- | -------- | --------------- |
| i     | `number` | 行下标，从0开始 |
| j     | `number` | 列下标，从0开始 |

**Example**

```javascript
var obj = XEpg.area("nav1").getUpObj(0,1);
```



## getDownObj(i, j) ⇒ `object`

根据行，列下标，获取下键执行对象

**Kind**: global function **Returns**: `object` - 子元素下键执行方法

| Param | Type     | Description     |
| ----- | -------- | --------------- |
| i     | `number` | 行下标，从0开始 |
| j     | `number` | 列下标，从0开始 |

**Example**

```javascript
var obj = XEpg.area("nav1").getDownObj(0,1);
```



## getLeftObj(i, j) ⇒ `object`

根据行，列下标，获取左键执行对象

**Kind**: global function **Returns**: `object` - 子元素左键执行方法

| Param | Type     | Description     |
| ----- | -------- | --------------- |
| i     | `number` | 行下标，从0开始 |
| j     | `number` | 列下标，从0开始 |

**Example**

```javascript
var obj = XEpg.area("nav1").getLeftObj(0,1);
```



## getRightObj(i, j) ⇒ `object`

根据行，列下标，获取右键执行对象

**Kind**: global function **Returns**: `object` - 子元素右键执行方法

| Param | Type     | Description     |
| ----- | -------- | --------------- |
| i     | `number` | 行下标，从0开始 |
| j     | `number` | 列下标，从0开始 |

**Example**

```javascript
var obj = XEpg.area("nav1").getRightObj(0,1);
```



## onOutHandle(positionObj, targetObj, positionStr)

区域边界执行处理

**Kind**: global function

| Param       | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| positionObj | `object` | 方位对象，上下左右                    |
| targetObj   | `object` | 目标对象                              |
| positionStr | `string` | 方位字符串"top","down","left","right" |

**Example**

```javascript
XEpg.area("nav1").onOutHandle(positionObj,targetObj,"top");
```



## eventObjHandle(eventObjs, positionStr)

区域边界执行处理

**Kind**: global function

| Param       | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| eventObjs   | `object` | 事件对象，如：func,area,id            |
| positionStr | `string` | 方位字符串"top","down","left","right" |

**Example**

```javascript
XEpg.area("nav1").eventObjHandle(eventObjs,"top");
```



## areaHandle(itemObj, positionStr)

区域对象处理

**Kind**: global function

| Param       | Type     | Description                                          |
| ----------- | -------- | ---------------------------------------------------- |
| itemObj     | `object` | 区域对象，如{"area":{"func":testFunc,"id":"nav2_1"}} |
| positionStr | `string` | 方位字符串"top","down","left","right"                |

**Example**

```javascript
XEpg.area("nav1").areaHandle(itemObj,"top");
```



## memoryHandle(positionStr, toAreaId, toIndex)

区域记忆处理

**Kind**: global function

| Param       | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| positionStr | `string` | 方位字符串"top","down","left","right" |
| toAreaId    | `string` | 目标区域ID                            |
| toIndex     | `number` | 目标区域对应下标                      |

**Example**

```javascript
XEpg.area("nav1").memoryHandle("top","nav2",0);
```



## onOutUp() ⇒ `object`

执行上边界值处理方法

**Kind**: global function **Returns**: `object` - AreaClass对象 **Example**

```javascript
XEpg.area("nav1").onOutUp();
```



## onOutDown() ⇒ `object`

执行下边界值处理方法

**Kind**: global function **Returns**: `object` - AreaClass对象 **Example**

```javascript
XEpg.area("nav1").onOutDown();
```



## onOutLeft() ⇒ `object`

执行左边界值处理方法

**Kind**: global function **Returns**: `object` - AreaClass对象 **Example**

```javascript
XEpg.area("nav1").onOutLeft();
```



## onOutRight() ⇒ `object`

执行右边界值处理方法

**Kind**: global function **Returns**: `object` - AreaClass对象 **Example**

```javascript
XEpg.area("nav1").onOutRight();
```



## setSelectedId(id)

设置已选中ID,并显示选中效果

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `string` | 选中ID      |

**Example**

```javascript
XEpg.area("nav1").setSelectedId("nav1_0");
```



## getTargetAreaEleId(areaId, index, fromIndexArr, fromIndex) ⇒ `string`

获取目标区域元素id

**Kind**: global function **Returns**: `string` - 目标区域元素id

| Param        | Type     | Description      |
| ------------ | -------- | ---------------- |
| areaId       | `string` | 目标区域ID       |
| index        | `number` | 目标区域下标     |
| fromIndexArr | `object` | 起始区域下标数组 |
| fromIndex    | `number` | 起始区域下标     |

**Example**

```javascript
XEpg.area("nav1").getTargetAreaEleId("nav2",1,[0,0,1,1],3);
```



## getEleIdByIndex(areaIndex) ⇒ `string`

根据目标下标获取目标区域元素id

**Kind**: global function **Returns**: `string` - 目标区域元素id

| Param     | Type     | Description  |
| --------- | -------- | ------------ |
| areaIndex | `number` | 目标区域下标 |

**Example**

```javascript
XEpg.area("nav1").getEleIdByIndex(1);
```



## getAreaIndexByCurrentId() ⇒ `number`

获取该区域当前元素下标

**Kind**: global function **Returns**: `number` - 当前元素下标 **Example**

```javascript
XEpg.area("nav1").getAreaIndexByCurrentId();
```



## setIdStartIndexRefreshArea(startIndex) ⇒ `object`

设置Id起始下标，刷新区域

**Kind**: global function **Returns**: `object` - AreaClass对象

| Param      | Type     | Description  |
| ---------- | -------- | ------------ |
| startIndex | `number` | 区域起始下标 |

**Example**

```javascript
XEpg.area("nav1").setIdStartIndexRefreshArea();
```



## clearObj(startIndex, count)

清理对象,传参则按传参下标开始删除，不传则用默认

**Kind**: global function

| Param      | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| startIndex | `number` | 区域起始下标，不传用默认       |
| count      | `number` | 清理个数，不传用默认用行乘以列 |

**Example**

```javascript
XEpg.area("nav1").clearObj();
```



## deleteObj(startIndex, notDelArea)

删除对象,传参则按传参下标开始删除，不传则用默认

**Kind**: global function

| Param      | Type      | Description              |
| ---------- | --------- | ------------------------ |
| startIndex | `number`  | 区域起始下标，不传用默认 |
| notDelArea | `boolean` | 是否删除区域，默认不删除 |

**Example**

```javascript
XEpg.area("nav1").deleteObj();
```



## clearObj() ⇒ `object`

清理Ele缓存dom内容，在html内容被替换后，需要clearObj，否则元素选取操作还是原来的html而不是最新的

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").clearObj();
```



## deleteObj(locationObj)

删除dom对象与EleClass对象,在Ele对象不再使用，需要释放Ele缓存资源执行

**Kind**: global function

| Param       | Type     | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| locationObj | `object` | 对象如：{"direction":"left","val":20}，当移除改DOM，需要对父节点位置进行删减控制，则传入参数，否则不传 |

**Example**

```javascript
XEpg.$("testDiv").deleteObj(); //移除ELE对象与html元素
```

**Example**

```javascript
XEpg.$("testDiv").deleteObj({"direction":"left","val":20}); //移除ELE对象与html元素，且需要更改父容器
```



## show() ⇒ `object`

Dom元素显示

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").show();
```



## hide() ⇒ `object`

Dom元素隐藏

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").hide();
```



## html(val) ⇒ `object` | `string`

Dom元素html写入|读取，如果有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `string` - EleClass对象|html字符串

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| val   | `string` | 要写入的html |

**Example**

```javascript
XEpg.$("testDiv").html("test");  //写入html
```

**Example**

```javascript
XEpg.$("testDiv").html();  //读取html
```



## addHtml(val, isbefore) ⇒ `object`

Dom元素html累加写入，如果isbefore为true则前面累加，默认为内容后累加

**Kind**: global function **Returns**: `object` - EleClass对象

| Param    | Type      | Description      |
| -------- | --------- | ---------------- |
| val      | `string`  | 要累加写入的html |
| isbefore | `boolean` | 是否前面累加     |

**Example**

```javascript
XEpg.$("testDiv").addHtml("test");  //html默认追加最后面
```

**Example**

```javascript
XEpg.$("testDiv").addHtml("test",true);  //html追加最前面
```



## value(val) ⇒ `object` | `string`

Dom元素值写入|读取，如果有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `string` - EleClass对象|元素值

| Param | Type     | Description |
| ----- | -------- | ----------- |
| val   | `string` | 要写入的值  |

**Example**

```javascript
(new EleClass("testInput")).value("test");  //写入值
```

**Example**

```javascript
(new EleClass("testInput")).value(); //读取值
```



## addValue(val, isbefore) ⇒ `object`

Dom元素值累加写入，如果isbefore为true则前面累加，默认为内容后累加

**Kind**: global function **Returns**: `object` - EleClass对象

| Param    | Type      | Description    |
| -------- | --------- | -------------- |
| val      | `string`  | 要累加写入的值 |
| isbefore | `boolean` | 是否前面累加   |

**Example**

```javascript
(new EleClass("testInput")).addValue("test");   //值默认追加最后面
```

**Example**

```javascript
(new EleClass("testInput")).addValue("test",true); //值追加最前面
```



## style(val) ⇒ `object` | `string`

Dom元素style写入|读取，如果有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `string` - EleClass对象|style字符串

| Param | Type     | Description |
| ----- | -------- | ----------- |
| val   | `string` | 要替换style |

**Example**

```javascript
XEpg.$("testDiv").style("left:720px;top:10px");  //写入样式值
```

**Example**

```javascript
XEpg.$("testDiv").style();  //读取样式值
```



## addStyle(val) ⇒ `object`

Dom元素样式累加写入

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description      |
| ----- | -------- | ---------------- |
| val   | `string` | 要累加写入的样式 |

**Example**

```javascript
XEpg.$("testDiv").addStyle("left:720px");
```



## removeStyle(val) ⇒ `object`

Dom元素样式移除

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| val   | `string` | 要移除的样式 |

**Example**

```javascript
XEpg.$("testDiv").removeStyle("left:720px");
```



## className(val) ⇒ `object` | `string`

Dom元素className写入|读取，如果有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `string` - EleClass对象|className字符串

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| val   | `string` | 要替换样式名 |

**Example**

```javascript
XEpg.$("testDiv").className("item item_select");   //写入class值
```

**Example**

```javascript
XEpg.$("testDiv").className();   //读取class值
```



## addClassName(val) ⇒ `object`

Dom元素ClassName累加写入

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| val   | `string` | 要累加写入的ClassName |

**Example**

```javascript
XEpg.$("testDiv").addClassName("item_select");
```



## removeClassName(val) ⇒ `object`

Dom元素className移除

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description       |
| ----- | -------- | ----------------- |
| val   | `string` | 要移除的className |

**Example**

```javascript
XEpg.$("testDiv").removeClassName("item_select");
```



## styleAttr(key, val) ⇒ `object` | `string`

Dom元素style属性写入|读取，如果val有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `string` - EleClass对象|style属性值字符串

| Param | Type     | Description       |
| ----- | -------- | ----------------- |
| key   | `string` | 属性名            |
| val   | `string` | 要替换style属性值 |

**Example**

```javascript
XEpg.$("testDiv").styleAttr("left","90px");  //样式属性写入值
```

**Example**

```javascript
XEpg.$("testDiv").styleAttr("left");  //样式属性读取值
```



## styleAttrNumber(key, val, unit) ⇒ `object` | `number`

Dom元素style属性数值写入|读取，如果val有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `number` - EleClass对象|style数值

| Param | Type     | Description                |
| ----- | -------- | -------------------------- |
| key   | `string` | 属性名                     |
| val   | `number` | 要替换style数值            |
| unit  | `string` | 单位,px或%等，默认不传为px |

**Example**

```javascript
XEpg.$("testDiv").styleAttrNumber("left","90");   //样式属性数字写入值
```

**Example**

```javascript
XEpg.$("testDiv").styleAttrNumber("left");   //样式属性数字读取值
```

**Example**

```javascript
XEpg.$("testDiv").styleAttrNumber("left","90","%"); //样式属性带单位数字写入值
```



## removeStyleAttr(keys) ⇒ `object`

Dom元素style属性移除,支持单个与多个,多个用,逗号隔开

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description         |
| ----- | -------- | ------------------- |
| keys  | `string` | 要移除的style属性名 |

**Example**

```javascript
XEpg.$("testDiv").removeStyleAttr("left"); //移除样式属性
```

**Example**

```javascript
XEpg.$("testDiv").removeStyleAttr(["left","top"]); //移除多个样式属性
```



## isActive() ⇒ `boolean`

Dom元素是否活跃，该元素必须存在，并可见才算活跃

**Kind**: global function **Returns**: `boolean` - 是否活跃 **Example**

```javascript
XEpg.$("testDiv").isActive();
```



## scrollText(setObj) ⇒ `object`

设置文字滚动,按英文字符算，一个中文算2个英文字符,enTextLen显示区域所能显示的英文字符总长度，超过则隐藏，enSingleWidth文字大小fontSize/2,moveSpacing移动间隔，不传默认为2，越大动的 幅度越大;timeSpacing时间间隔，不填默认为150ms，越短速度越快

**Kind**: global function **Returns**: `object` - EleClass对象

| Param  | Type     | Description                                |
| ------ | -------- | ------------------------------------------ |
| setObj | `object` | 对象如:`{"enTextLen":28,"enSingleWidth":12}` |

**Example**

```javascript
XEpg.$("testDiv").scrollText({"enTextLen":28,"enSingleWidth":12});  //简单文字滚动赋值
```

**Example**

```javascript
XEpg.$("testDiv").scrollText({"enTextLen":28,"enSingleWidth":12,"moveSpacing":2,"timeSpacing":150});   //文字滚动赋值,自己控制速度与间隔
```



## up(对象) ⇒ `object`

元素上键执行操作绑定，可以在按上键触发一个方法，则设置func;也可以移到某个元素，则设置id;如果是既要触发方法也要执行id移动，则2个都设置，放前面的先执行，比如先写func，则是先执行方法多个id使用逗号隔开，从左边起，如果第一个不存在，则跳转执行第二个

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"id":"nav4_0"}多个用逗号隔开如：{"id":"nav4_0"},{"func":testFunc},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.$("testDiv").up({"id":"nav4_0"}); //元素导航
```

**Example**

```javascript
XEpg.$("testDiv").up([{"func":testFunc},{"id":"nav4_0"}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").up({"func":testFunc},{"id":"nav4_0"}); //先执行方法后元素导航,多参数
```

**Example**

```javascript
XEpg.$("testDiv").up({"func":testFunc,"id":"nav4_0"}); //先执行方法后元素导航，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## down(对象) ⇒ `object`

元素下键执行操作绑定，可以在按下键触发一个方法，则设置func;也可以移到某个元素，则设置id;如果是既要触发方法也要执行id移动，则2个都设置，放前面的先执行，比如先写id，则是先执行移到某元素;多个id使用逗号隔开，从左边起，如果第一个不存在，则跳转执行第二个

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"id":"nav4_0"}多个用逗号隔开如：{"id":"nav4_0"},{"func":testFunc},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.$("testDiv").down({"id":"nav4_0"}); //元素导航
```

**Example**

```javascript
XEpg.$("testDiv").down([{"func":testFunc},{"id":"nav4_0"}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").down({"func":testFunc},{"id":"nav4_0"}); //先执行方法后元素导航,多参数
```

**Example**

```javascript
XEpg.$("testDiv").down({"func":testFunc,"id":"nav4_0"}); //先执行方法后元素导航，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## left(对象) ⇒ `object`

元素左键执行操作绑定，可以在按左键触发一个方法，则设置func;也可以移到某个元素，则设置id;如果是既要触发方法也要执行id移动，则2个都设置，放前面的先执行，比如先写func，则是先执行方法多个id使用逗号隔开，从左边起，如果第一个不存在，则跳转执行第二个

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"id":"nav4_0"}多个用逗号隔开如：{"id":"nav4_0"},{"func":testFunc},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.$("testDiv").left({"id":"nav4_0"}); //元素导航
```

**Example**

```javascript
XEpg.$("testDiv").left([{"func":testFunc},{"id":"nav4_0"}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").left({"func":testFunc},{"id":"nav4_0"}); //先执行方法后元素导航,多参数
```

**Example**

```javascript
XEpg.$("testDiv").left({"func":testFunc,"id":"nav4_0"}); //先执行方法后元素导航，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## right(对象) ⇒ `object`

元素右键执行操作绑定，可以在按右键触发一个方法，则设置func;也可以移到某个元素，则设置id;如果是既要触发方法也要执行id移动，则2个都设置，放前面的先执行，比如先写id，则是先执行移到某元素;多个id使用逗号隔开，从左边起，如果第一个不存在，则跳转执行第二个

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"id":"nav4_0"}多个用逗号隔开如：{"id":"nav4_0"},{"func":testFunc},多个传数组[{"id":"nav4_0"},{"func":testFunc}] |

**Example**

```javascript
XEpg.$("testDiv").right({"id":"nav4_0"}); //元素导航
```

**Example**

```javascript
XEpg.$("testDiv").right([{"func":testFunc},{"id":"nav4_0"}]); //先执行方法后元素导航，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").right({"func":testFunc},{"id":"nav4_0"}); //先执行方法后元素导航,多参数
```

**Example**

```javascript
XEpg.$("testDiv").right({"func":testFunc,"id":"nav4_0"}); //先执行方法后元素导航，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## click(对象) ⇒ `object`

元素点击执行操作绑定，可以在按点击触发一个方法，则设置func;也可以跳转url，则设置url,如果要使用title里的url进行跳转，则设置"titleUrl":"";如果是既要触发方法也要执行url跳转，则2个都 设置，放前面的先执行

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"func":testFunc}多个用逗号隔开如：{"func":testFunc},{"url":"test.htm"},{"titleUrl":""},多个传数组[{"func":testFunc},{"url":"test.htm"},{"titleUrl":""}] |

**Example**

```javascript
XEpg.$("testDiv").click({"url":"test.htm"});  //点击页面跳转
```

**Example**

```javascript
XEpg.$("testDiv").click({"titleUrl":""});  //点击根据元素title里值页面跳转
```

**Example**

```javascript
XEpg.$("testDiv").click([{"func":testFunc},{"url":"test.htm"}]);  //先执行方法后页面跳转，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").click({"func":testFunc},{"url":"test.htm"});  //先执行方法后页面跳转，多参数
```

**Example**

```javascript
XEpg.$("testDiv").click({"func":testFunc,"url":"test.htm"});  //先执行方法后页面跳转，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## focus(对象) ⇒ `object`

元素焦点显示绑定，可以在焦点显示时触发一个方法，则设置func;也可以改变className，则设置class;也可以改变style,则设置style；如果是既要触发方法也要改变calss，则2个都设置，放前面的先执行

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"class":"item_select"},多个用逗号隔开如：{"func":testFunc},{"class":"item_focus"},{"style":"left:70px"},多个传数组[{"func":testFunc},{"class":"item_select"},{"style":"left:70px"}] |

**Example**

```javascript
XEpg.$("testDiv").focus({"class":"item item_focus"}); //元素焦点展示，改变class
```

**Example**

```javascript
XEpg.$("testDiv").focus({"style":"left:70px"});  //元素焦点展示，改变style
```

**Example**

```javascript
XEpg.$("testDiv").focus([{"func":testFunc},{"class":"item item_focus"}]);  //先执行方法后改变class，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").focus({"func":testFunc},{"class":"item item_focus"});  //先执行方法后改变class，多参数
```

**Example**

```javascript
XEpg.$("testDiv").focus({"func":testFunc,"class":"item item_focus"});    //先执行方法后改变class，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## blur(对象) ⇒ `object`

元素失去焦点显示绑定，可以在失去焦点时触发一个方法，则设置func;也可以改变className，则设置class;也可以改变style,则设置style；如果是既要触发方法也要改变calss，则2个都设置，放前面的执行

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| 对象  | `object` | 如:{"class":"item"},多个用逗号隔开如：{"func":testFunc},{"class":"item"},{"style":"left:70px"},多个传数组[{"func":testFunc},{"class":"item"},{"style":"left:70px"}] |

**Example**

```javascript
XEpg.$("testDiv").blur({"class":"item"}); //元素焦点展示，改变class
```

**Example**

```javascript
XEpg.$("testDiv").blur({"style":"left:70px"});  //元素焦点展示，改变style
```

**Example**

```javascript
XEpg.$("testDiv").blur([{"func":testFunc},{"class":"item"}]);  //先执行方法后改变class，数组参数，多个推荐使用
```

**Example**

```javascript
XEpg.$("testDiv").blur({"func":testFunc},{"class":"item"});  //先执行方法后改变class，多参数
```

**Example**

```javascript
XEpg.$("testDiv").blur({"func":testFunc,"class":"item"});    //先执行方法后改变class，对象参数，不推荐使用，低级盒端不兼容先后执行顺序
```



## onScrollText() ⇒ `object`

执行文字滚动

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onScrollText();
```



## onUp() ⇒ `object`

执行上事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onUp();
```



## onDown() ⇒ `object`

执行下事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onDown();
```



## onLeft() ⇒ `object`

执行左事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onLeft();
```



## onRight() ⇒ `object`

执行右事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onRight();
```



## onClick() ⇒ `object`

执行点击事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onClick();
```



## onFocus() ⇒ `object`

执行焦点显示事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onFocus();
```



## onBlur() ⇒ `object`

执行失去焦点事件

**Kind**: global function **Returns**: `object` - EleClass对象 **Example**

```javascript
XEpg.$("testDiv").onBlur();
```



## eventObjHandle(eventObj)

事件对象执行，统一处理绑定的，上下左右，点击，焦点显示，失去焦点的事件执行

**Kind**: global function

| Param    | Type     | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| eventObj | `object` | 对象 如：`{"func":testFunc,"class":"item item_select","style":"left:70px","url":"test.htm","titleUrl":"","id":"testDiv4"}` |

**Example**

```javascript
XEpg.$("testDiv").eventObjHandle({"func":testFunc,"class":"item item_select"});
```



## effectHandle(elementId) ⇒ `object`

元素特效处理，主要场景，处理元素焦点移动，显示下一个元素特效

**Kind**: global function **Returns**: `object` - EleClass对象

| Param     | Type     | Description |
| --------- | -------- | ----------- |
| elementId | `string` | 特效处理id  |

**Example**

```javascript
XEpg.$("testDiv").effectHandle("testDiv4");
```



## gotoPage(url) ⇒ `object`

页面跳转

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description |
| ----- | -------- | ----------- |
| url   | `string` | 跳转地址    |

**Example**

```javascript
XEpg.$("testDiv").gotoPage("test.htm");
```



## attr(key, val) ⇒ `object` | `string`

Dom元素属性写入|读取，如果val有值传入则写入，反之则读取

**Kind**: global function **Returns**: `object` | `string` - EleClass对象|属性值字符串

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| key   | `string` | 属性名       |
| val   | `string` | 要替换属性值 |

**Example**

```javascript
XEpg.$("testDiv").attr("title","testName"); //元素属性写入值
```

**Example**

```javascript
XEpg.$("testDiv").attr("title"); //读取元素属性值
```



## getObj() ⇒ `object`

获取元素dom对象

**Kind**: global function **Returns**: `object` - 元素dom对象 **Example**

```javascript
XEpg.$("testDiv").getObj();  等于 document.getElementById("testDiv")
```



## getEleObj(id) ⇒ `object`

获取元素选取对象

**Kind**: global function **Returns**: `object` - EleClass对象

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `string` | 元素id      |

**Example**

```javascript
XEpg.$("testDiv").effectHandle("testDiv4");
```



## init(initObj)

页面个性化设置绑定，currentId:当前显示焦点id，则设置class;isQuitSaveCooke:是否页面离开保存cookie，不传默认保存;pageMark:页面标识backType为1，唯一存储读取cookie标识;currentAreaId: 当前区域id,如果没设置currentId,则默认显示区域第1个;backType:返回类型，默认为1使用浏览器返回方式;

**Kind**: global function

| Param   | Type     | Description                                                  |
| ------- | -------- | ------------------------------------------------------------ |
| initObj | `object` | 初始化对象如:`{"currentId":"area1_0","isQuitSaveCooke":false,"pageMark":"pageHome","currentAreaId":"area1","backType":1}` |

**Example**

```javascript
XEpg.My.init({"currentId":"area1_0"}); //设置起始元素
```

**Example**

```javascript
XEpg.My.init({"currentAreaId":"area1"}); //设置起始区域，不带currentId，默认取该区域第1个
```

**Example**

```javascript
XEpg.My.init({"currentAreaId":"area1","currentId":"area1_3"});  //设置起始区域，与起始元素
```



## getIdIndex(id, pid) ⇒ `number`

获取元素id数字下标，主要针对area1_0,area1_1这样有规律的id，如果不传，则默认对this.currentId进行转换

**Kind**: global function **Returns**: `number` - 数字下标

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `string` | 元素id      |
| pid   | `null`   |             |

**Example**

```javascript
XEpg.My.getIdIndex("area1_0");
```



## getHistory()

获取页面历史对象，从cookie里获取，前面从该页面离开，所存储的信息

**Kind**: global function **Example**

```javascript
XEpg.My.getHistory();
```



## setHistory()

设置页面历史对象

**Kind**: global function **Example**

```javascript
XEpg.My.setHistory();
```



## onFocusById(id) ⇒ `object`

按所给id显示焦点，现有焦点blur，失去焦点

**Kind**: global function **Returns**: `object` - XEpg.My

| Param | Type     | Description      |
| ----- | -------- | ---------------- |
| id    | `string` | 要显示焦点元素id |

**Example**

```javascript
XEpg.My.onFocusById("area1_0");
```



## pageLoadShowFocus()

页面加载完显示焦点

**Kind**: global function **Example**

```javascript
XEpg.My.pageLoadShowFocus();
```



## gotoPage(urlStr)

页面跳转

**Kind**: global function

| Param  | Type     | Description |
| ------ | -------- | ----------- |
| urlStr | `string` | 地址        |

**Example**

```javascript
XEpg.My.gotoPage("test.htm");
```



## backPage()

页面返回

**Kind**: global function **Example**

```javascript
XEpg.My.backPage();
```



## pageQuitSetHistoryUrl() ⇒ `string`

设置页面跳转需要保存的URL,请根据实际情况对需要保存的地址参数进行改写

**Kind**: global function **Returns**: `string` - url完整字符串 **Example**

```javascript
XEpg.My.pageQuitSetHistoryUrl();
```

**Example**

```javascript
改写 XEpg.My.pageQuitSetHistoryUrl=function(){return window.location.href+"pageIndex=3";};
```



## pageQuitSetHistoryParameter() ⇒ `string`

设置页面跳转需要保存记录的参数,请根据实际情况对需要保存的参数进行改写，不同参数采用&分隔，与URL ？后面参数形式一样

**Kind**: global function **Returns**: `string` - url参数字符串，?后的参数内容 **Example**

```javascript
XEpg.My.pageQuitSetHistoryParameter();
```

**Example**

```javascript
改写 XEpg.My.pageQuitSetHistoryParameter=function(){var para = "historyId="+this.currentId;para +="&test=mytest";return para;};
```



## init(EleClass对象, {"enTextLen":28,"enSingleWidth":12})

文字滚动,按英文字符算，一个中文算2个英文字符,enTextLen显示区域所能显示的英文字符总长度，超过则隐藏，enSingleWidth文字大小fontSize/2,moveSpacing移动间隔，不传默认为2，timeSpacing时间隔，不填默认为150ms

**Kind**: global function

| Param                               | Type     | Description |
| ----------------------------------- | -------- | ----------- |
| EleClass对象                        | `object` |             |
| `{"enTextLen":28,"enSingleWidth":12}` | `object` | 对象        |

**Example**

```javascript
(new ScrollText()).init(XEpg.$("testDiv"),{"enTextLen":28,"enSingleWidth":12});  //简单文字滚动赋值
```

**Example**

```javascript
(new ScrollText()).init(XEpg.$("testDiv"),{"enTextLen":28,"enSingleWidth":12,"moveSpacing":2,"timeSpacing":150});   //文字滚动赋值,自己控制速度与间隔
```



## getStrRealLen(str) ⇒ `number`

获取字符串真实长度,中文字符算2长度

**Kind**: global function **Returns**: `number` - 字符串长度

| Param | Type     | Description |
| ----- | -------- | ----------- |
| str   | `string` | 字符串      |

**Example**

```javascript
(new ScrollText()).getStrRealLen("en中文");
```



## timeDelay()

定时延迟执行

**Kind**: global function **Example**

```javascript
(new ScrollText()).timeDelay();
```



## scrollText()

滚动文字处理

**Kind**: global function **Example**

```javascript
(new ScrollText()).scrollText();
```



## moveScrollText()

移动滚动文字区域

**Kind**: global function **Example**

```javascript
(new ScrollText()).moveScrollText();
```



## revert()

位置还原

**Kind**: global function **Example**

```javascript
(new ScrollText()).revert();
```



## sonScrollText(setObj) ⇒ `object`

实例化绑定sonScrollText

**Kind**: global function **Returns**: `object` - EleClass对象

| Param  | Type     | Description                                                 |
| ------ | -------- | ----------------------------------------------------------- |
| setObj | `string` | ScrollText初始化对象如：`{"enTextLen":28,"enSingleWidth":12}` |

**Example**

```javascript
XEpg.$("testDiv").sonScrollText({"enTextLen":28,"enSingleWidth":12});
```



## keyBind()

键值绑定

**Kind**: global function **Example**

```javascript
XEpg.Nav.keyBind();
```



## onkeypressKeyEvent(event)

按键按下松开处理

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| event | `object` | 按键事件    |

**Example**

```javascript
window.document.onkeypress = window["XEpg"].Nav.onkeypressKeyEvent;
```



## onkeydownKeyEvent(event)

按键按下处理

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| event | `object` | 按键事件    |

**Example**

```javascript
window.document.onkeydown = window["XEpg"].Nav.onkeydownKeyEvent;
```



## keyHandle(keyCode)

键值处理

**Kind**: global function

| Param   | Type     | Description |
| ------- | -------- | ----------- |
| keyCode | `number` | 按键键值    |

**Example**

```javascript
XEpg.Nav.keyHandle(37);
```



## key_default_event()

键值默认处理，不在case处理中的其他键值

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_default_event();
```



## key_number_event(num)

数字键处理, 增加debug捕捉，连续按数字键处理

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| num   | `number` | 数字键值    |

**Example**

```javascript
XEpg.Nav.key_number_event(49);
```



## key_up_event()

上键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_up_event();
```



## key_down_event()

下键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_down_event();
```



## key_left_event()

左键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_left_event();
```



## key_right_event()

右键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_right_event();
```



## key_ok_event()

确认OK键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_ok_event();
```



## key_back_event()

返回键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_back_event();
```



## key_home_event()

首页事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_home_event();
```



## key_pageUp_event()

上页键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_pageUp_event();
```



## key_pageDown_event()

下页键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_pageDown_event();
```



## key_del_event()

删除键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_del_event();
```



## key_red_event()

红色键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_red_event();
```



## key_green_event()

绿色键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_green_event();
```



## key_yellow_event()

黄色键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_yellow_event();
```



## key_blue_event()

蓝色键事件处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_blue_event();
```



## timeKeyPageUp()

延时500毫秒上页键事件处理，防止过快跳页

**Kind**: global function **Example**

```javascript
XEpg.Nav.timeKeyPageUp();
```



## timeKeyPageDown()

延时500毫秒下页键事件处理，防止过快跳页

**Kind**: global function **Example**

```javascript
XEpg.Nav.timeKeyPageDown();
```



## key_up_opt()

上键处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_up_opt();
```



## key_down_opt()

下键处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_down_opt();
```



## key_left_opt()

左键处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_left_opt();
```



## key_right_opt()

右键处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_right_opt();
```



## key_click_opt()

确定键处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_click_opt();
```



## key_back_opt()

返回键处理

**Kind**: global function **Example**

```javascript
XEpg.Nav.key_back_opt();
```



## onPressdNumber()

用于捕捉debug事件，仅限于数字键， 在需要的时候重写

**Kind**: global function

## trim(需要清理空格字符串) ⇒ `string`

字符串方法拓展，清除字符串里的空格

**Kind**: global function **Returns**: `string` - 转换完成字符串

| Param              | Type     |
| ------------------ | -------- |
| 需要清理空格字符串 | `string` |

**Example**

```javascript
var testStr = "test test2 ".trim();
```



## jsonTrim(需要过滤特殊字符json字符串) ⇒ `string`

字符串方法拓展，过滤json字符串里特殊字符

**Kind**: global function **Returns**: `string` - 过滤完成字符串

| Param                      | Type     |
| -------------------------- | -------- |
| 需要过滤特殊字符json字符串 | `string` |

**Example**

```javascript
var testStr = "{\"content\":\"test2 \n \r \"}".jsonTrim();
```



## replaceAll(s1, s2) ⇒ `string`

字符串方法拓展，批量替换字符串

**Kind**: global function **Returns**: `string` - 替换完毕字符串

| Param | Type     | Description      |
| ----- | -------- | ---------------- |
| s1    | `string` | 被替换原始字符串 |
| s2    | `string` | 替换字符串       |

**Example**

```javascript
var testStr = "content com".replaceAll("co","test");
```



## createJsonp(id, url)

jsonp请求创建

**Kind**: global function

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| id    | `string` | 自动创建script的id |
| url   | `string` | 请求地址           |

**Example**

```javascript
XEpg.Util.createJsonp("jsonp1","test.htm");
```



## createJsonp(id)

jsonp script移除，对不适用的json进行清理，减少资源占用,需要与createJsonp 一一对应

**Kind**: global function

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| id    | `string` | 自动创建script的id |

**Example**

```javascript
XEpg.Util.deleteJsonp("jsonp1");
```



## jsonTrim(str)

清除字符串里的换行与回车

**Kind**: global function

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| str   | `string` | 待替换字符串 |

**Example**

```javascript
XEpg.Util.jsonTrim("test \n str");
```



## isArray(obj)

判断对象是否为数组

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| obj   | `object` | 待判断对象  |

**Example**

```javascript
XEpg.Util.isArray([1,2]);
```



## argumentsToArray(setObj)

参数对象转数组

**Kind**: global function

| Param  | Type     | Description       |
| ------ | -------- | ----------------- |
| setObj | `object` | arguments参数对象 |

**Example**

```javascript
XEpg.Util.argumentsToArray(arguments);
```



## ajaxGet(url, callBack, time) ⇒ `string`

ajax get请求，如果传callBack，则异步执行，不传为同步执行，结果直接返回，由于同步会阻塞线程，使用需谨慎,异常情况返回空对象，防止页面卡死

**Kind**: global function **Returns**: `string` - 返回数据

| Param    | Type       | Description  |
| -------- | ---------- | ------------ |
| url      | `string`   | ajax请求地址 |
| callBack | `function` | 回调方法     |
| time     | `number`   | 超时时间     |

**Example**

```javascript
XEpg.Util.ajaxGet("test.htm?p1=a&p2=b",testAjax);  function testAjax(contentStr){alert(contentStr);} 异步实例
```

**Example**

```javascript
var contentStr = XEpg.Util.ajaxGet("test.htm?p1=a&p2=b"); 同步实例
```



## ajaxPost(url, content, callBack, time) ⇒ `string`

ajax post请求，如果传callBack，则异步执行，不传为同步执行，结果直接返回，由于同步会阻塞线程，使用需谨慎，异常情况返回空对象，防止页面卡死

**Kind**: global function **Returns**: `string` - 返回数据

| Param    | Type       | Description  |
| -------- | ---------- | ------------ |
| url      | `string`   | ajax请求地址 |
| content  | `string`   | ajax请求内容 |
| callBack | `function` | 回调方法     |
| time     | `number`   | 超时时间     |

**Example**

```javascript
XEpg.Util.ajaxPost("test.htm","p1=a&p2=b",testAjax);  function testAjax(contentStr){alert(contentStr);} 异步实例
```

**Example**

```javascript
var contentStr = XEpg.Util.ajaxPost("test.htm","p1=a&p2=b"); 同步实例
```



## gotoPage(url)

页面跳转

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| url   | `string` | 跳转地址    |

**Example**

```javascript
XEpg.Util.gotoPage("test.htm");
```



## setCookie(key, val)

设置cookie

**Kind**: global function

| Param | Type     | Description    |
| ----- | -------- | -------------- |
| key   | `string` | 关键字，需唯一 |
| val   | `string` | 值             |

**Example**

```javascript
XEpg.Util.setCookie("testCookie1","p1=a&p2=b");
```



## getCookie(key) ⇒ `string`

获取cookie存储的值

**Kind**: global function **Returns**: `string` - 值

| Param | Type     | Description                    |
| ----- | -------- | ------------------------------ |
| key   | `string` | 关键字，需唯一,与setCookie对应 |

**Example**

```javascript
XEpg.Util.getCookie("testCookie1");
```



## delCookie(key)

删除cookie

**Kind**: global function

| Param | Type     | Description                    |
| ----- | -------- | ------------------------------ |
| key   | `string` | 关键字，需唯一,与setCookie对应 |

**Example**

```javascript
XEpg.Util.delCookie("testCookie1");
```



## objectToStr(jsonObj) ⇒ `string`

json对象转换为字符串

**Kind**: global function **Returns**: `string` - 字符串

| Param   | Type     | Description |
| ------- | -------- | ----------- |
| jsonObj | `object` | json对象    |

**Example**

```javascript
var str = XEpg.Util.objectToStr({"id":"3","name":"test"});
```



## convertStr2Obj(paramStr)

将长字符串参数转化为对象

**Kind**: global function

| Param    | Type     | Description  |
| -------- | -------- | ------------ |
| paramStr | `string` | 长字符串参数 |

**Example**

```javascript
XEpg.Util.convertStr2Obj(paramStr);// { index: '1', name: 'abc' }
```



## getStrRealLen(str) ⇒ `number`

获取字符串真实长度,中文字符算2长度

**Kind**: global function **Returns**: `number` - 字符长度

| Param | Type     | Description |
| ----- | -------- | ----------- |
| str   | `string` | 字符串      |

**Example**

```javascript
var str = XEpg.Util.getStrRealLen("test测试");
```



## getSubStr(str, len, isSuffix) ⇒ `string`

截取字符串,中文字符算2长度

**Kind**: global function **Returns**: `string` - 截取后字符串

| Param    | Type      | Description              |
| -------- | --------- | ------------------------ |
| str      | `string`  | 截取前字符串             |
| len      | `number`  | 截取长度,中文字符算2长度 |
| isSuffix | `boolean` | 是否加省略号，默认不加   |

**Example**

```javascript
var str = XEpg.Util.getSubStr("test测试",6); //普通截取
```

**Example**

```javascript
var str = XEpg.Util.getSubStr("test测试",6,true); //截取后面加省略号
```



## numSupplyZero(initNumStr, numStr) ⇒ `string`

数字前面补0

**Kind**: global function **Returns**: `string` - 格式化后字符串

| Param      | Type     | Description    |
| ---------- | -------- | -------------- |
| initNumStr | `string` | 初始化字符串   |
| numStr     | `string` | 需要格式化数字 |

**Example**

```javascript
var str = XEpg.Util.numSupplyZero("112","0000"); 结果为:0112
```



## getPageTotal(totalNum, pageSize) ⇒ `number`

根据总条数与每页条数，计算出总页数

**Kind**: global function **Returns**: `number` - 总页数

| Param    | Type     | Description |
| -------- | -------- | ----------- |
| totalNum | `number` | 总条数      |
| pageSize | `number` | 每页条数    |

**Example**

```javascript
XEpg.Util.getPageTotal(112,10);
```



## getSliceList(objs, pageIndex, pageSize) ⇒ `array`

根据数组开始页与每页条数，计算出当前页数组列表

**Kind**: global function **Returns**: `array` - 本页数组

| Param     | Type     | Description |
| --------- | -------- | ----------- |
| objs      | `array`  | 列表数组    |
| pageIndex | `number` | 开始页      |
| pageSize  | `number` | 每页条数    |

**Example**

```javascript
XEpg.Util.getSliceList([1,3,5,6,8,9,7],2,3);
```



## replaceUrlParams(url, key, value) ⇒ `string`

替换地址里的参数值,如果地址里没有该参数，则再末尾补参数与值

**Kind**: global function **Returns**: `string` - 替换后地址

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| url   | `string`            | 地址          |
| key   | `string`            | url参数关键字 |
| value | `string` | `number` | 参数值        |

**Example**

```javascript
XEpg.Util.replaceUrlParams("test.htm?a=cc&b=kk","a","oo");
```



## getUrlParam(strname, url) ⇒ `string`

获取URL地址中的参数值

**Kind**: global function **Returns**: `string` - 参数值

| Param   | Type     | Description   |
| ------- | -------- | ------------- |
| strname | `string` | url参数关键字 |
| url     | `string` | 地址          |

**Example**

```javascript
XEpg.Util.getUrlParam("a","test.htm?a=cc&b=kk");
```



## getUrlParameterObj(url) ⇒ `object`

获取记录地址里的参数对象

**Kind**: global function **Returns**: `object` - 参数对象

| Param | Type     | Description |
| ----- | -------- | ----------- |
| url   | `string` | 地址        |

**Example**

```javascript
XEpg.Util.getUrlParameterObj("test.htm?a=cc&b=kk");  结果为 {"a":"cc","b":"kk"}
```



## timeFormat(time) ⇒ `string`

时间格式化 hh24:mi:ss

**Kind**: global function **Returns**: `string` - 格式化完成字符串

| Param | Type     | Description            |
| ----- | -------- | ---------------------- |
| time  | `number` | 需要格式化数值,单位秒s |

**Example**

```javascript
XEpg.Util.timeFormat("5700");
```



## addNavigationUrl(url)

导航地址压入数组

**Kind**: global function

| Param | Type     | Description |
| ----- | -------- | ----------- |
| url   | `string` | 地址        |

**Example**

```javascript
XEpg.Util.addNavigationUrl("test.htm?a=cc&b=kk");
```



## gotoBackNavigationUrl()

跳回前一导航页面

**Kind**: global function **Example**

```javascript
XEpg.Util.gotoBackNavigationUrl();
```



## getLastNavigationUrl() ⇒ `string`

获取上一次访问地址,不清理导航记录

**Kind**: global function **Returns**: `string` - 上一次访问地址字符串 **Example**

```javascript
XEpg.Util.getLastNavigationUrl();
```



## getBackNavigationUrl() ⇒ `string`

获取上一次访问地址,并清理导航记录

**Kind**: global function **Returns**: `string` - 上一次访问地址字符串 **Example**

```javascript
XEpg.Util.getBackNavigationUrl();
```