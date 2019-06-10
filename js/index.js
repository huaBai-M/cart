$(function () {
    /*1.全屏切换的初始化*/
    $('.container').fullpage({
        /*2.不垂直居中*/
        verticalCentered: false,
        /*3.设置背景颜色*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        /*4.设置指示器*/
        navigation: true,
        /*屏动画切换的时间*/
        scrollingSpeed:1500,
        /*5.点击更多切换下一屏*/
        /*在插件没有初始化成功的时候 去调用插件的功能可能调用不了*/
        /*等插件初始化 成功*/
        afterRender: function () {
            $('.more').on('click', function () {
                /*切换下一页*/
                /*jquery的插件封装机制  基于  $.fn.fullpage */
                $.fn.fullpage.moveSectionDown();
            });
            /*第五屏的鼠标效果*/
            $('.screen05 .handImg').on('transitionend',function () {
                $('.screen05 .mouse02Img').show();
            });
            /*第8屏的效果*/
            $('.screen08').on('mousemove',function (e) {
                $(this).find('.hand').css({
                    left:e.clientX + 20, // 保证手指在鼠标上
                    top:e.clientY + 20  // 空出一个按钮的位置
                });
                /*mouserenter 只会触发一次 mouseover 如果有子元素会触发多次 */
            }).find('.btn').on('mouseenter',function () {
                $(this).find('.btn02Img').show().siblings().hide();
            }).on('mouseleave',function () {
                $(this).find('.btn02Img').hide().siblings().show();
            }).siblings('.again').on('click',function () {
                /*跳到第一屏 清空所有动画*/
                $.fn.fullpage.moveTo(1);
                /*当前例子 实现动画有三个方式*/
                /*1. animated */
                /*2. jquery show() fadeIn()  会给当前元素添加行内样式 */
                /*3. selected*/
                /*干掉它们*/
                /*$node.remove() $node 自杀 */
                /*$node.empty() $node  清理门户 */
                $('.animated').removeClass('animated');
                $('.section [style]').removeAttr('style');
                $('.selected').removeClass('selected');
            });

        },
        /*6.跟多按钮的  显示隐藏功能*/
        /*当离开某一屏都要动画的隐藏  当进入下一屏的时候显示*/
        /*什么时候离开  什么时候进入*/
        onLeave: function (index, nextIndex, direction) {
            /*当离开某一个屏幕触发  当前离开的屏幕的序号  下一个进入的屏幕的序号  切换的方向*/
            $('.more').fadeOut();
            /*确定是第2到第3*/
            if(index == 2 && nextIndex == 3){
                $('.screen02').find('.sofa').addClass('animated');
            }else if(index == 3 && nextIndex == 4){
                /*1.隐藏横的沙发*/
                /*2.显示斜的沙发*/
                $('.screen03').find('.sofa').hide().siblings('.skewSofa').show().addClass('animated').on('animationend',function () {
                    /*3.斜沙发掉下之后显示 购物车当中的沙发*/
                    /*jquery animate(需要动画的属性类型是对象，动画的时间，动画的速度（swing,linear），动画结束的回调函数)*/
                    /* animationend  事件 动画结束事件*/
                    /* transitionend  事件 过渡结束事件*/
                    $('.screen04').find('.sofaImg').show();
                    $('.screen04').find('.cart').addClass('animated').on('animationend',function () {
                        /*4.显示收货地址的文字 上*/
                        $('.screen04').find('.text img').hide().eq(1).show();
                        /*5.显示收货地址容器*/
                        $('.screen04').find('.address').fadeIn(1000,function () {
                            /*6.显示收货地址文字 下*/
                            $('.screen04').find('.address .addressImg').fadeIn();
                        });
                    });
                });
            }else if(index == 5 && nextIndex == 6){
                $('.screen05 .sofa').addClass('animated');
                /*为了让离开第5屏的时候就立马执行 selected 的动画*/
                $('.screen06').parent().addClass('selected');

            }else if(index == 6 && nextIndex == 7){
                /*星星动画*/
                $('.screen07 .star img').each(function (i,item) {
                    /*delay() 在执行动画之前使用  单位是毫秒*/
                    /* slow normal fast  400 */
                    $(item).delay(500*i).fadeIn();
                });
                $('.screen07 .text').addClass('animated');
            }
        },
        afterLoad: function (link, index) {
            /*当完全进入某一屏的时候触发  link导航链接  index当前屏序号 */
            $('.more').fadeIn();
            /*实现动画  过渡和动画的原理：只有属性发生改变触发动画 */
            /*过渡怎么改变属性  动画怎么加上animation*/
            $(this).addClass('selected');
        }
    });
});