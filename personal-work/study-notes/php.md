# `<?= var_dump($_LANG['coupon-obtain-list'])?>`

在HTML页面打印数组

# 当报错说Invalid argument supplied for foreach()：即for循环是无效参数时
在对其进行for循环以前，先将这个for循环的数组对象通过if条件判断，判断为true了再嵌套for循环

```php
<?php if(is_array($_LANG['coupon-obtain-list'])):?>
    <? foreach($_LANG['coupon-obtain-list'] as $item): ?>
        <div class="single-coupon-box">
            <div class="single-coupon">
                <p class="coupon-amount"><?= $item['coupon-save-amount'] ?></p>
                <div class="coupon-code">
                    <p class="coupon-purchase"><?= $item['coupon-code'] ?></p>
                    <p class="coupon-save-more"><?= $item['coupon-save-more']?></p>
                </div>
            </div>
        </div>
    <? endforeach; ?>
<?php endif?>


<?php if(is_array()):?>
<?php endif?>
```

# 情况：某种情况下，某个标签的值会被改变，这是需求
- 实际情况：这个被改变的标签的值，会根据语言包的不同而发生变化，不能通过直接从js设置不同的值去改变，而且你也不知道是哪种语言环境下
- 解决方案：将这种要改变的情况的值放在PHP里，预先就有了。在HTML里将这个将会被加载的值先放在这个标签的属性里，先加载出来。然后通过js去设置不同的属性值。
- jQuery获取属性值的方式：var p = $("标签ID").prop("属性");

# 上传德语：移动端也需要上传德语
比如：
PC-en:d/for-business(index)
PC-de:d/de/for-business(index)

# 单独上传图片图片被删除问题
在新建文件夹，放入图片以后，引用图片，使用`./gulp.sh`压缩图片，压缩完了以后，图片在assets里，此时，执行`./build-dev.sh`图片则在dist里，即可在filezila里查看和上传。

# PHP模板语法判断item为true或是false
 - <? if($item['itemName']): ?>

# 跳转到正确的对应的服里的代码实现
```php
<a class="sk-button ui-button empty-button visit-more" href="<?=rpg_get_locale_url($_LANG['visit-href'])?>"><?= $_LANG['visit-store'] ?></a>
```