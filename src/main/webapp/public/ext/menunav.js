/**
 * 菜单导航控件
 * $().menunav(options);
 */
!function(){
	'use strict';
	
	$.widget('ui.menunav',{
		options:{
			scrollThreshold:0.1,    //滚动检测阀值 0.1在浏览器窗口中间部位
            scrollSpeed:700,        //滚动到指定位置的动画时间
            scrollTopBorder:500,    //滚动条距离顶部多少的时候显示导航，如果为0，则一直显示
            easing: 'swing',        //不解释
            delayDetection:100,     //延时检测，避免滚动的时候检测过于频繁
            targetWin: 'window',   //滚动的窗口，默认为浏览器  _self:自己
            navwinArr: [],          //滚动窗口中的导航列表
            scrollChange:function(){} //滚动的时候回调函数
		},
		_init:function(){
			var options = this.options;
			if(!options.targetWin && !options.navwinArr){
				console.error('menunav未能初始化，请检查配置！');
			}else{
				this.$win = options.targetWin === '_self' ? this.element : $(window);
		        this.$h = options.navwinArr;
		        this.$pageNavList = "";
		        this.$pageNavListLis ="";
		        this.$curTag = "";
		        this.$pageNavListLiH = "";
		        this.offArr = [];
		        this.curIndex = 0;
		        this.scrollIng = false;
		        
		        this.make();
	            this.setArr();
	            this.bindEvent();
			}
		},
		make:function(){
        	this.$win.append('<div class="directory-nav" id="directoryNav"><ul></ul><span class="cur-tag"></span><span class="c-top"></span><span class="c-bottom"></span><span class="line"></span></div>');
            var $hs = this.$h,
                $directoryNav = $("#directoryNav"),
                temp = [],
                index1 = 0,
                index2 = 0;
            $hs.each(function(index){
                var $this = $(this),
                text = $this.attr("title");
                if($this.hasClass("first")){
                    index1++;
                    if(index1%2==0) index2 = 0;
                    temp.push('<li class="l1"><span class="c-dot"></span>'+index1+'. <a class="l1-text">'+text+'</a></li>');
                }else{
                    index2++;
                    temp.push('<li class="l2">'+index1+'.'+index2+' <a class="l2-text">'+text+'</a></li>');

                }
            });
            $directoryNav.find("ul").html(temp.join(""));
            //设置变量
            this.$pageNavList = $directoryNav;
            this.$pageNavListLis = this.$pageNavList.find("li");
            this.$curTag = this.$pageNavList.find(".cur-tag");
            this.$pageNavListLiH = this.$pageNavListLis.eq(0).height();
            this.$pageNavList.show();
        },
        setArr:function(){
            var This = this;
            this.$h.each(function(){
                var $this = $(this),
                    offT = Math.round($this.offset().top);
                This.offArr.push(offT);
            });
            this.ifPos(0);
        },
        posTag:function(top){
            this.$curTag.css({top:top+'px'});
        },
        ifPos:function(st){
            var offArr = this.offArr;
            var windowHeight = Math.round(this.$win.height() * this.options.scrollThreshold);
            for(var i=0;i<offArr.length;i++){
                if((offArr[i] - windowHeight) <= st) {
                    var $curLi = this.$pageNavListLis.eq(i),
                        tagTop = $curLi.position().top;
                    $curLi.addClass("cur").siblings("li").removeClass("cur");
                    this.curIndex = i;
                    this.posTag(tagTop+this.$pageNavListLiH*0.5);
                    this.options.scrollChange.call(this);
                }
            }
        },
        bindEvent:function(){
            var This = this,
                show = false,
                timer = 0;
            this.$win.on("scroll",function(){
                var $this = $(this);
                clearTimeout(timer);
                timer = setTimeout(function(){
                    This.scrollIng = true;
                    if($this.scrollTop()>=This.options.scrollTopBorder){
                        This.ifPos( $this.scrollTop() );
                    }
                },This.options.delayDetection);
            });

            this.$pageNavList.on("click","li",function(){
                var $this = $(this),
                    index = $this.index();
                This.scrollTo(This.offArr[index]);
            })
        },
        scrollTo: function(offset,callback) {
            var This = this;
            this.$win.animate({
                scrollTop: offset
            }, this.options.scrollSpeed, this.options.easing, function(){
                This.scrollIng = false;
                //修正弹两次回调 蛋疼
                callback && this.tagName.toLowerCase()=='body' && callback();
            });
        }
	});
}();