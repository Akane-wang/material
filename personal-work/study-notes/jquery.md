# 为某个样式添加样式

$('.classname').css('padding-left')=>用css()方法返回元素的样式属性
$('.classname').css('classtype','classvalue')=>用css()设置样式
$("div").css({"background-color":"yellow","font-size":"200%"})=>设置多个样式
后面都在用addclass，removeclass

# jQuery获取属性值的方式

- var p = $("标签ID").prop("属性"); // 获取属性的值
- var q = $(this).attr('data-ifempty'); // 获取页面显示的值

# 添加自定义属性

$('div').attr( " data-zidingyi" ，“dig” )
<!-- $('div').data( " data-zidingyi"  ，“dig”) -->(测试，不行)

$('#ensure-input').removeAttr('inputchecked') -- 移除属性
两种情况都可以；但一般情况用data因为他兼容性更好（注意！data是保存在jquery对象里，attr是保存在DOM元素上）；

# js 控制输入框
var tall = prompt("请输入您的身高（厘米）","178");

# 设置了val，却没办法改变button的值，可以通过文本值去修改：button.text('someValue'),但是val还是其他的值
 - 如何修改button的值

# for循环中，想要让他在第几个目标上操作，用target[i].removeClass啥的是不可以的
这是jQuery的遍历方法：
解决：target.eq(i).removeClass(dn):重点在eq
<!-- 或者：$('.className:eq('+i+')'):似乎是这个样子，但是这种操作是不好看不美观的，不推荐，以上面一种为准 -->
