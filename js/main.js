/**
 * Created by sf-pc on 2017/2/4.
 */
'use strict';

$(function(){
    function resize(){
        var windowWidth=$(window).width();
        var isSmallScreen=windowWidth<768;
        $('#main_ad > .carousel-inner > .item').each(function(i,item){
            var $item=$(item);
            var imgSrc=$item.data(isSmallScreen?'image-sm':'image-lg');
            //我们需要小图时 尺寸等比例变化，所以小图使用img方式
            $item.css('backgroundImage','url("'+imgSrc+'")');
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'"/>');
            }
            else{
                $item.html();
            }
        });
    }

    $(window).on('resize',resize).trigger('resize');

    //初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页的标签容器宽度
    var $ulContainer=$('.nav-tabs');
    var width=30;//因为ul上有padding-left
    $ulContainer.children().each(function(index,element){
        width+=element.clientWidth;
    });
    if(width>$(window).width())
        $ulContainer.css('width',width).parent().css('overflow-x','scroll');

    //a点击注册事件
    var $newsTitle=$('.news-title');
    $('#news .nav-pills a').on('click',function(){
        var $this=$(this);
        var title= $this.data('title');
        $newsTitle.text(title);
    });

    var $carousel=$('.carousel');
    var startX,endX;
    var offset=50;
    $carousel.on('touchstart',function(e){
        startX=e.originalEvent.touches[0].clientX;
    });

    $carousel.on('touchmove',function(e){
        endX= e.originalEvent.touches[0].clientX;
    });

    $carousel.on('touchend',function(e){
        var distance=Math.abs(startX-endX);
        if(distance>offset){
            $(this).carousel(startX>endX?'next':'prev');
        }

    });


});