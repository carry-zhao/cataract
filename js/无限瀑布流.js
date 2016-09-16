;
(function($) {
    $(window).load(function() {
        function Cataract(id) {
            this.$wrapper = $(id);
            this.$box = this.$wrapper.children();
            this.wrapperWidth = this.$wrapper.innerWidth();
            this.boxWidth = this.$box.eq(0).outerWidth(true);
            // 定义数据来源，img的src值
 			this.imgSrcs = [{src:"images/0.jpg",info:"图片信息0"},{src:"images/1.jpg",info:"图片信息1"},{src:"images/2.jpg",info:"图片信息2"},{src:"images/3.jpg",info:"图片信息3"},{src:"images/4.jpg",info:"图片信息4"},{src:"images/5.jpg",info:"图片信息5"},{src:"images/6.jpg",info:"图片信息6"},{src:"images/7.jpg",info:"图片信息7"},{src:"images/8.jpg",info:"图片信息8"},{src:"images/9.jpg",info:"图片信息9"},{src:"images/10.jpg",info:"图片信息10"},{src:"images/11.jpg",info:"图片信息11"},{src:"images/12.jpg",info:"图片信息12"},{src:"images/13.jpg",info:"图片信息13"},{src:"images/14.jpg",info:"图片信息14"},{src:"images/15.jpg",info:"图片信息15"},{src:"images/16.jpg",info:"图片信息16"},{src:"images/17.jpg",info:"图片信息17"}];
            this.wrapperTop = this.$wrapper.offset().top;
            this.init();
            this.setPosition(); //先调用一次，初始化各个盒子的位置
            this.jiazai();
        }
        // 初始化（计算出一些用到的数值）
        Cataract.prototype.init = function() {
            var that = this;
            // 计算出已开始wrapper内一行box的个数，作为最大值（参考值），
            // 一开始把lenNow和lenMax设置成一样，这样在setPosition函数中，就可以直接调用
            this.lenNow = this.lenMax = this.wrapperWidth / this.boxWidth;
            // 初始化窗口改变时的动作
            $(window).resize(function() {
                that.resizeWrapper();
                that.setPosition();
            });
        }

        // 改变窗口大小时，改变wrapper的宽度
        Cataract.prototype.resizeWrapper = function() {
            // 计算出window的宽度最大可以承载多少个box
            this.lenNow = Math.ceil($(window).width() / this.boxWidth) - 1;
            if (this.lenNow > this.lenMax) {
                this.lenNow = this.lenMax;
                return;
            };
            // 只有lenNow小于最大值时才会改变wrapper的宽度，以适应屏幕
            this.$wrapper.innerWidth(this.lenNow * this.boxWidth + "px");
        }
        // 设置图片位置的函数
        Cataract.prototype.setPosition = function() {
            var that = this;
            this.boxHeight = [];
            for (var i = 0; i < this.lenNow; i++) {
                // 把最上层的一行box的高度压入数组,作为基准值.
                this.boxHeight.push(that.$box.eq(i).outerHeight(true));
            }
            // 遍历每个box,设置其位置
            this.$box.each(function(index) {
                if (index < that.lenNow) { // 上面一层单独设置,top值设置为0
                    $(this).css({
                        left: index * that.boxWidth + "px",
                        top: 0,
                        position: "absolute"
                    });
                } else {
                    // 获取数组中最小的值
                    that.minHeight = Math.min.apply(null, that.boxHeight);
                    // 获取最小值得索引
                    var col = that.boxHeight.indexOf(that.minHeight);
                    $(this).css({
                        left: col * that.boxWidth + "px",
                        top: that.minHeight + "px",
                        position: "absolute"
                    });
                    // 改变数组中的最小值，这样col才会变化
                    that.boxHeight[col] = $(this).outerHeight(true) + that.minHeight;
                }
            });
        };

        // 无限加载
        Cataract.prototype.jiazai = function() {
            var that = this;
            $(window).scroll(function() {
            	// 窗口的高度加上滚动的高度大于最小高度的时候开始加载
                if ($(window).scrollTop() + $(window).height() > that.wrapperTop + that.minHeight) {
                	// 插入li
                	$.each(that.imgSrcs,function(index,item){
                		 that.$wrapper.append('<li class="box"><img src="'+item.src+'" alt=""><p>'+ item.info +'</p></li>');
                	});
                	// 重新获取that.$box,并重新定位
                	that.$box = that.$wrapper.children();
                	that.setPosition();
                }
            });
        }
        window.Cataract = Cataract;
    });
})(jQuery);
