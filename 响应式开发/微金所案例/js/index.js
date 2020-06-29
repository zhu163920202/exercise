$(function() {
    $('[data-toggle="popover"]').popover();
    var items = $('.carousel-inner .item');
    // 监听屏幕大小改变
    $(window).on("resize", function() {
        var width = $(window).width();
        if (width >= 768) {
            $(items).each(function(index, value) {
                // 当前自定义属性中的图片路径
                var item = $(this);
                var imgSrc = item.data("largeImages");
                console.log(imgSrc);
                item.html($('<a href="javascript:;" class="pcImg"></a>')).css("backgroundImage","url('"+imgSrc+"')");
            });
        } else {
            $(items).each(function(index, value) {
                var imgSrc = $(this).data("smallImages");
                $(this).html($('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'"> </a>'))

            });
        }
    }).trigger("resize");
    /*添加移动端的滑动操作*/
    var startX,endX;
    var carousel_inner=$(".carousel-inner")[0];

    /*获取当前轮播图*/
    var carousel=$(".carousel");

    carousel_inner.addEventListener("touchstart",function(e){
        startX= e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener("touchend",function(e){
        endX= e.changedTouches[0].clientX;
        if(endX-startX > 0){
            /*上一张*/
            carousel.carousel('prev');
        }
        else if(endX-startX < 0){
            /*下一张*/
            carousel.carousel('next');
        }
    });
});
