# javascript-DOM和BOM  

## 概念  
javascript是运行在浏览器上的、基于对象和时间驱动的脚本语言。它和HTML一样，是一种描述性语言，有了javascript就可以和网页进行一系列交互。  

## javascript的组成  
javascript由三个部分组成，分别是：  
1、ECMAScript ：它是javascript的标准和基础  
2、DOM(文档对象模型)：描述处理网页内容的方法和接口  
3、BOM(浏览器对象模型):描述与浏览器进行交互的方法和接口  

## DOM&BOM  

### 认识DOM  
文档对象模型，是W3C组织推荐的处理可扩展标志语言的标准编程接口，它把整个页面规划为层级式的节点结构。  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>
        <a href="#" id="a" name="a">JavaScript</a>
    </h1>
    <p></p>
    <ul>
        <li>ESCMScript</li>
        <li>DOM</li>
        <li>BOM</li>
    </ul>
</body>
</html>
```  
上面的这个html文档就是由节点构成的集合，DOM节点有：  
1、文档节点：整个HTML文档就是一个文档节点  
2、元素节点：上面这段代码中的html、head、body、h1、p、ul、li都是元素节点，即标签，其中html为根元素节点  
3、文本节点：向页面上展示的内容，如li标签里面的"ESCMScript、DOM、BOM"等文本  
4、属性节点：元素属性，如a标签的href属性。  

### 认识BOM  
浏览器对象模型可对浏览器窗口进行操作和访问，主要包含的对象有：window、history、location，其中window是它的核心对象，而window对象有具有双重角色，它既是通过javascript方法浏览器窗口的一个接口，又是一个全局对象，这意味着网页中定义的任何对象、变量、函数都是以window作为其全局对象的。  

### DOM和BOM的关系  
javascript是通过BOM对象来访问、控制、修改浏览器的，由于BOM的window对象包含了document对象，而window的属性和方法又是直接可以使用并且感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改HTML文档的内容与结构了。因为document对象又是DOM的根节点，所有说BOM包含了DOM，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而javascript可以操作浏览器以及浏览器读取的文档。

## DOM的应用  
### 选择器  
W3C提供了比较方便的定位节点的方法，以便我们快速得得到节点和它的属性，分别为：  
1、getElementById()通过元素节点定义的id属性值获取该元素节点  
2、getElementByName()通过元素定义的name属性获取元素节点的集合  
3、getElementByTagName()通过元素节点的标签名获得元素节点的集合  
4、getAttribute()通过元素属性名称获得元素属性值  

### 节点操作  
DOM不仅可以查找节点，还可以创建节点、插入节点、替换节点和删除节点  
```js
var div = document.getElementById("div");           //通过id获得元素节点
var p = document.createElement("p");                //创建一个元素节点p
div.appendChild(p);                                 //把新创建的元素节点p添加为div元素节点的末尾的子节点
var text = document.createTextNode("文本节点");     //创建一个文本节点
ele.appendChild(text);                              //把文本节点添加到p标签中去
div.parentNode.replaceChild(p.div);                 //通过父节点将子节点div替换为p
div.parentNode.removeChild(div);                    //通过父节点删除子节点
```  

### 常用的操作  
1、innerHTML可以获取元素内容和改变元素内容  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        function add() {
            var nid = document.getElementById("num");
            var text = nid.innerHTML;
            text = parseInt(text);
            text += 1;
            nid.innerHTML = text;
        }

    </script>
</head>
<body>
   <div id="num">
       1
   </div>
    <input type="button" value="点击" onclick="add()">
</body>
</html>
```  

2、通过style属性改变样式  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script>
        #div{ background:red; }
    </script>
    <script>
        function change() {
            var div = document.getElementById("div");
            div.style.background(pink);
        }
    </script>
</head>
<body>
   <div id="div">
       div
   </div>
    <input type="button" value="修改颜色" onclick="change()">
</body>
</html>
```  

## 事件  
事件通过与函数配合使用，这样通过事件触发函数的执行  

### 常用事件  
1、onclick事件 ：点击元素事件  
2、onsubmit事件 ： 表单提交事件  
3、onfocus事件 ： 元素获得焦点  
4、onblur事件：元素失去焦点  
5、onload事件 ： 加载页面时触发的事件  

### 用法举例  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        var username = null;
        var password = null;
        var rePassword = null;
        var relName = null;
        var remind = null;
        function getElements() {
            username = document.getElementById("username")[0];
            password = document.getElementById("password")[0];
            rePassword = document.getElementById("rePassword")[0];
            relName = document.getElementById("relName")[0];
            remind = document.getElementById("remind");
        }
        function checkUsername() {
            var regExp = /^[a-zA-Z]+$/;
            if (regExp.test(username.value)){
                remind[0].innerHTML = '';
                password.focus();
            }else{
                remind[0].innerHTML = '用户名格式错误';
                username.focus();
            }
        }
        function checkPassword() {
            var regExp = /^[a-zA-Z]+$/;
            if (regExp.test(password.value)){
                remind[1].innerHTML = '';
                rePassword.focus();
            }else{
                remind[1].innerHTML = '密码名格式错误';
                password.focus();
            }
        }
        function checkRePassword() {
            var regExp = /^[a-zA-Z]+$/;
            if (rePassword.value==password.value){
                remind[2].innerHTML = '';
                relName.focus();
            }else{
                remind[2].innerHTML = '两次密码不一样';
                rePassword.focus();
            }
        }
        function checkRelName() {
            var regExp = /^[a-zA-Z]+$/;
            if (regExp.test(relName.value)){
                remind[3].innerHTML = '';
                age.focus();
            }else{
                remind[3].innerHTML = '用户名格式错误';
                relName.focus();
            }
        }
    </script>
</head>
<body onload="getElements()">
   <div id="container">
       <h1 align="center">用户注册页面</h1>
       <div id="context">
           <form action="#" method="post" onsubmit="return reg()">
               <table>
                   <tr>
                       <td>用户名：</td>
                       <td>
                           <input type="text" name="username" onblur="checkUsername()"/>
                       </td>
                       <td name="remind"></td>
                   </tr>
                   <tr>
                       <td>密 码：</td>
                       <td>
                           <input type="password" name="password" onblur="checkPassword()"/>
                       </td>
                       <td name="remind"></td>
                   </tr>
                   <tr>
                       <td>确认密码：</td>
                       <td>
                           <input type="password" name="rePassword" onblur="checkRePassword()"/>
                       </td>
                       <td name="remind"></td>
                   </tr>
                   <tr>
                       <td>姓名：</td>
                       <td>
                           <input type="text" name="relName" onblur="checkRelName()"/>
                       </td>
                       <td name="remind"></td>
                   </tr>
                   <tr>
                       <td>性别：</td>
                       <td>
                           男<input type="radio" name="sex" value="1" checked="checked"/>
                           女<input type="radio" name="sex" value="0" />
                       </td>
                       <td name="remind"></td>
                   </tr>
                   <tr>
                       <td>年龄：</td>
                       <td>
                           <input type="number" name="age" />
                       </td>
                       <td name="remind"></td>
                   </tr>
                   <tr>
                       <td colspan="2" align="center">
                           <input type="submit" value="注册"/>
                       </td>
                       <td name="remind"></td>
                   </tr>
               </table>
           </form>

       </div>
   </div>
</body>
</html>
```

