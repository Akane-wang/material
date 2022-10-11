# GDPR合规化

## 什么是GDPR（5/25 2018正式生效）

- 欧盟发布的“一般数据保护条例”（GDPR）的主要目的是协调整个欧洲的数据隐私法律，保护所有欧洲公民的数据隐私，并重塑整个地区在存储和处理隐私数据上的管理方式。
- 若是违反GDPR的规定，组织可能会被罚款高达全球年营业额的4%,或2000万欧元，以金额大的为准。(云计算不会免于GDPR的执行)
- 欧洲发布新规的主要原因：
  - 为欧盟的数据主体提供更多保护个人隐私的权力
  - 基于隐私保护加强服务提供者与他们所服务的人之间的信任
  - 为企业提供明确的法律框架，通过制定统一的法律来消除任何区域差异
- GDPR适用范围：
  - 欧盟内部组织、位于欧盟以外但向欧盟数据主体提供产品或服务或监控其行为的组织
  - 适用于所有处理和持有居住在欧盟的数据主体的数据的公司、使用欧盟语言或货币，为欧盟居民量身定制产品、在欧盟范围内积极营销、监控定义为在线跟踪数据主体创建的资料，或分析和预测个人偏好，行为模式或态度
- 受到GDPR保护的隐私数据类型：
  - 基本的身份信息（姓名、地址、身份证号码等）
  - 网络数据（位置、IP地址、cookie数据、RFID标签等）
  - 医疗保健和遗传数据
  - 生物识别数据（指纹、虹膜等）
  - 种族或民族数据
  - 政治观点
  - 性取向
- 该规则要求网站尊重用户隐私，要求经用户明确许可才能跟踪cookies（仅关于跟踪/识别/授权cookies），因此网站想要为用户设置跟踪/识别/授权cookies，必须征得用户明确同意，网站才能设置cookie

## 为了实现这一需求，我们应该怎么做

- 对于一个网站来说，它会有很多cookie，其中包括了自身所需要的基础cookie、为了实现某个功能而使用的功能cookie、以及为了分析用户，跟踪用户获取用户信息从而有依据投放广告的广告分析类cookie。
  - 首先：搜集这些cookie，加以分类
  - 其次：分类以后，对这些cookie进行处理，用户有权选择同意被收集跟踪和投放广告，也可以随时选择拒绝，用户随时有对个人信息的处理权，因此对cookie的操作：应该可以随时停用cookie，设置cookie，展示cookie（key值）

## cookie

### 什么是cookie，为解决什么问题而存在

- cookie是直接保存在浏览器上的小数据串，是HTTP协议的一部分
- 当浏览器去请求服务器时，使用的是HTTP协议，而HTTP协议是无状态的，所以服务器无法判别是谁请求了它。为解决这个问题，每当浏览器去请求服务器，若是初次请求，服务器则会设置一个cookie添加到返回回来的HTTP请求头上，下次该浏览器再次去请求时，会带上这个cookie，用于告诉服务器该浏览器的身份。因此，cookie最常见的用处是：身份验证。
- cookie由服务器设置，保存在服务器中是不合理的，多个浏览器访问服务器，会有很多cookie被创建，全都放在服务器上，会对服务器造成压力。因此选择将其设置在用户自己的电脑硬盘上。
- 浏览器也可以设置cookie，和服务器设置cookie的方式不同

### 为解决这个问题，它将如何操作

-如何进行身份验证
  - 登录后，服务端通过Set-Cookie在响应的HTTP-header中设置了一个带有“会话标识符”的cookie
  - 下次如果相同的域名发起了请求，浏览器会发送带有cookie的HTTP-header
  - 服务器就知道是谁发起了请求
- 服务器如何创建cookie
  - 通过Set-Cookie在响应的http-header中设置
- 浏览器如何创建cookie
  - document.cookie = "keyName='123';expires='GMTTime';path='/';domain='reolink.com';secure='boolean'"
- cookie的相关操作
  - 1.读取cookie
    - `document.cookie`=>cookie1=value1;cookie2=value2;...
    - 寻找特定的cookie：
      - 使用`;`截取document.cookie,找到合适的名字；可以使用正则表达式或数组的方法来实现
      - 根据key查询对应的cookie的相应代码
         ```js
            // 根据key展示cookie
            showCookieByKey:function(keyName) {
                var cookieName = encodeURIComponent(keyName) + "=",
                    cookieStart = document.cookie.indexOf(cookieName),
                    cookieValue = null;
                if (cookieStart > -1) { // 有cookie
                    var cookieEnd = document.cookie.indexOf(";",cookieStart); // cookieStart: indexOf检索“；”的起始位置
                    if (cookieEnd == -1) {
                        cookieEnd = document.cookie.length;
                    }

                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                }

                return cookieValue;
            },
         ```
- 2.写入cookie
  - `document.cookie = "user=John;path=/;expires=Tue,19 Jan 2018 03:14:07 GMT;domain=reolink.com;secure"`
    - `document.cookie`的写入操作不是一个数据属性，而是一个访问者，赋值操作会被特殊处理
    - 浏览器的`document.cookie`写入操作只会更新已存在的cookies，而不会影响其他cookies
    - 写入时，要使用encodeURIComponent对相应键值对的写入进行编码：`encodeURIComponent(user)+'='+encodeURIComponent(value)...`；编码后的键值对大小不能超过4K，否则会被丢掉
    - path:
      - 可访问到cookie的URL路径前缀，必须是绝对路径，默认值为当前路径；通常设置`path=/`来允许网站下所有页面访问cookie
      - 如果发现在·通过重新设置cookie的方式·将`expire`设置为过期来清除cookie的时清除不掉且已经确定是当前域名或者其父域名的情况下，要考虑是不是静态页面，如果是静态页面，则必须指定`path='xxx'(默认为当前路径下'/')`,动态页面可以不用指定
    - expires,max-age:
      - expires的值可以有三种情况：过去时间、session、将来时间
      - 过去时间：意味着该cookie已经过期，如果expires过期则浏览器会自动删除这个cookie
        - 没有直接删除cookie的办法，因此，若是要删除某个cookie，则可以通过重新设置cookie的方式将其expires的时间设置为过去的GMT形式，浏览器会立刻删除该cookie
      - session：不设置expires时，则会以session填充
        - session让cookie的生命周期延续到浏览器窗口关闭就会消失，此类cookies被称为sessioncookies
      - 将来时间：将来时间必须为GMT格式：
        - 得到该格式的方式：new Date().toGMTString()/new Date.toUTCString(),可以将cookie保存到时间到了为止
      - max-age：
        - 可用于替换expires,具体说明cookie的过期时间距离当前时间的秒数，如果是`0或者负数`，cookie会立刻被删除
    - secure:
      - 设置了secure后，该cookie仅会在HTTPS环境下传输
      - 解决cookie存有敏感内容时，不应该在不安全的HTTP环境下发送的问题
    - domain:
- 3.攻击：XSRF攻击
  - 在登录某个网站A后，就有了该站点的身份验证cookie，每次请求浏览器都会将cookie带上发送给该站点，因此该站点也承认你的身份和所做出的敏感操作。偶然情况下访问到了B站点，B站点有一段代码是可以访问A的，而用户每次访问A时cookie都会发送，即使表单在B上提交，A站点也能识别你的身份并执行某些敏感操作。这就是`跨站点请求伪造(XSRF/CSRF攻击)`
  - 如何防止呢？
    - 由A站点生成的表单都有一个特殊的字段，即`xsrf保护令牌`，邪恶页面不能生成也不能从远程页面获取（可以提交表单但是无法获取数据），而A站点每次都会检查收到的表单上的令牌；这种防护需要时间来实现，需要确保每个表单都有token字段，而且必须检查所有的请求
    - 输入cookie samesite选项
      - 有两个可选的值：samesite = strict(和samesite没有值一样)
      - 如果用户来自同一站点之外，则设置了samesite = strict的cookie永远都不会发送，无论是用户跟踪邮件链接或从B站点提交表单，或是来自其他域名下的任何操作，cookie都不会发送
      - 缺点：不太方便：当用户跟随合法链接来到A站点，A站点不能识别它们的身份，此时samesite=strict cookies不会发送
      - 解决方案：一个cookie用来大致识别，另一个带有`samesite=strict` 的 cookie用来验证数据改变的操作，然后来自外部网站的用户会看到A站点的界面，但是必须在A站点发起某些敏感操作才能让第二个cookie被发送
    - samesite = lax
      - lax模式和strict模式类似，禁止浏览器发送来自外部网站的cookie，但增加了一个例外
        - samesite=lax cookie在以下两个条件都成立时会被发送：
          - HTTP方法是安全的（get方法而不是post）：其他安全方法都是只能用来读取数据但是不能写入数据的方法

### 背后的实现原理是什么

### 其他