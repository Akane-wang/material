# 绘制一段弧线
## 实际效果如下：
## 完整代码如下：
```html
<body>
        <canvas id="canvas" style="border: 1px solid red">
            this browser cant be for canvas
        </canvas>
    <script>
        window.onload = function() {
            var canvas = document.getElementById('canvas');
            canvas.width = 1024;
            canvas.height = 768;
            
            var context = canvas.getContext("2d");

            context.arc(500,500,100,0,Math.PI,anticlockwise = false)
            context.stroke();
        }
    </script>
</body>
```

# 绘制一段弧线块，以颜色填充
## 实际效果
## 完整代码
```html
<body>
        <canvas id="canvas" style="border: 1px solid red">
            this browser cant be for canvas
        </canvas>
    <script>
        window.onload = function() {
            var canvas = document.getElementById('canvas');
            canvas.width = 1024;
            canvas.height = 768;
            
            var context = canvas.getContext("2d");

            context.arc(500,500,100,0,Math.PI,anticlockwise = false)
            // context.stroke();
            context.fillStyle = "yellow";
            context.fill();
        }
    </script>
</body>
```
# 绘制多段弧线
## 实际效果
## 完整代码
```html
<body>
        <canvas id="canvas" style="border: 1px solid red">
            this browser cant be for canvas
        </canvas>
    <script>
        window.onload = function() {
            var canvas = document.getElementById('canvas');
            canvas.width = 1024;
            canvas.height = 768;
            
            var context = canvas.getContext("2d");

            for(var i = 0; i< 10; i++) {
                context.beginPath();
                context.arc(50 + i*100, 180, 40, 0, 2*Math.PI*(i+1)/10)
                context.stroke();
            }
        }
    </script>
</body>
```

# 绘制多段弧线块
## 实际效果
## 完整代码
```html
<body>
        <canvas id="canvas" style="border: 1px solid red">
            this browser cant be for canvas
        </canvas>
    <script>
        window.onload = function() {
            var canvas = document.getElementById('canvas');
            canvas.width = 1024;
            canvas.height = 768;
            
            var context = canvas.getContext("2d");

            for(var i = 0; i< 10; i++) {
                context.beginPath();
                context.arc(50 + i*100, 280, 40, 0, 2*Math.PI*(i+1)/10)
                context.closePath();
                context.stroke();
            }
        }
    </script>
</body>
```