# 布局方式

- flex布局
- 1.目的（作用）：实现水平垂直居中？
- 能够实现哪些功能
- 如何实现

- 一个父容器里多个子容器的布局方式

 # 设置hr元素的颜色

 - hr颜色需要用background-color（color针对的是字体颜色，hr是线条）
 - hr默认有border，所以需要去掉它的边框：border：none
 - 此时hr是没有高度的，所以需要设置它的height：1px
 - hr {
 -   background-color: #ccc;
 -   border: none;
 -   height: 1px;
 - }
 - hr颜色设置完毕

 # js逻辑判断input输入框为空格（防止在填写string类型时，输入空格的问题而对其输入多个空格而进行判断）
 - new RegExp("^[ ]+$").test(str): str 为"   "返回true，否则返回false

 # 图片无法根据响应式去同时伸缩自己，导致在不同的视图里图片的展示不正确
 - 给图片设置一个宽或者高度（只设置一个）

 # calc()
 - 可用于css的计算，包括加减乘除
 - 计算时，运算符要留空格，否则会被当成一个数（100% -80px:此时就是一个无效的计算，正确的描述应该是（100% - 80px）才能被正常计算）

 # a标签会出现留白现象（a标签包裹图片时会出现图片部分留白的情况）
 - 设置font-size：0；

 # 如何设置footer让footer永远在页面的底部并且不会因为body内容部分height不高而往上移动导致底部留白

 <div class="app">
    <header></header>
    <body></body>
    <footer-copy class ="footer-copy"></footer-copy>
    <footer class="footer"></footer>
 </div>

 <style lang="less">
    .app {
        width: 100%;
        .footer-copy,
        .footer {
            height: 2rem;
            width: 100%;
        }
        .footer{
            position: absolute;
            bottom: 0;
        }
    }
 </style>



# BC官网构建过程
- 代码构造过程：
1.由哪些组成：component && pages
component: template.php(一个个组件)
pages: page.php(
    'components'=>{
        按顺序排列的来自components的一个个组件
        '自定义名字'=>'对应组件的地址',
        ...
    }
)
由多个components组成的page,经过编译（build-dev.sh），得到一个HTML文件
经过编译以后的文件存储在dist里，然后，你更改过某个文件，
将其经过build-dev.sh编译，
完了以后就将其从本地服务器通过filezela上传到远程服务器，然后再刷新开发服，进行验证

## 静态文件和动态文件的区别
- 静态页面：html、htm、shtml、xml
- 动态页面：asp、jsp、php、perl、cgi
- 共同点：呈现内容给用户，内容用超文本标记语言表示
- 动态页面：服务器端会对html页面进行处理，然后传给用户端（在服务器端处理数据时需要时间，所以首屏速度慢，但是SEO很好）
- 静态页面：服务器端不对html页面进行处理，直接传给用户端（首屏快，但是SEO不好）
- 因此，官网中，由于价位这种动态变化的，需要被爬虫捕获到有用的信息；
- 所以，一开始就有这种必要：让页面呈现的时候，直接呈现所有的数据，即动态的需要改变的数据直接展示，
- 就需要让展示的页面直接在服务器端处理了，然后，再展示出来。
- 所以接下来的是将页面变成动态的?
- 可是不是说变成静态页面？部分变成动态的。不怎么需要改变的变成静态页面？

# 在看代码写代码的时候，我要如何，去确定某个页面的代码部分在哪里？
？components/header/template.php：<body>没有闭合</body>

# php模板中处理链接的方法
- rpg_get_locale_url('/')：返回reolink官网首页地址
- rpg_get_locale_url('/...')：...
- rpg_get_store_url('/')：返回store域名首页地址
？如何通过这种地址去找到真正的链接呢(对应地址在哪里)

## 数据取值优先级
### $_LANG[]
- 例如英语页面调用的组件模板 **header** 使用 $_LANG['link']
 - 检测所在页面的 **en-us.php** 的 **header** 栏是否设置'link'属性，有则取值
 - 如果上步未检测到，则找组件模板所在组件中的**en-us.php** 文件是否有'link'属性，有则取值，无则报错

 ### $_DATA[]
 - 例如页面调用的组件模板 **header** 使用$_DATA['url']
    - 检测所在页面的 **page.php** 中 **data** 栏的 **header** 项 是否设置 'url'属性，有则取值
    - 如果上步未检测到，则继续检测该 **page.php** 中 **global** 栏的'url'属性，有则取值
    （page.php页面的global和data是给$_DATA[]提供数据的，没有其他目的）
    - 如果上步未检测到，则找组件模板所在组件中的 component.php 文件的return的对象中是否有'url'属性，有则取值，无则报错
