window.onload = function() {
    searchEffect();
    timeBack();
    bannerEffect();
}
// =======================================================================
//头部js效果
function searchEffect(){
    //    头部搜索块红色效果
    //    1.获取当前banner的高度
    var banner
        = document.querySelector(".jd_banner");
    var search = document.querySelector(".jd_search");
    var bannerHeight = banner.offsetHeight;
    // console.log(bannerHeight);
    //    2.获取当前屏幕滚动时，banner滚动出屏幕的距离
    window.onscroll = function() {
        // var offsetTop = document.body.scrollTop;
        var offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(offsetTop)
        //    3.计算比例值获取透明度，设置背景颜色
        var opacity = 0;
        if (offsetTop < bannerHeight) {
            opacity = offsetTop/bannerHeight;
            search.style.backgroundColor = "rgba(233,35,34,"+ opacity+")";
        }
    }
}
//================================================================================
// 轮播图
function bannerEffect() {
    /*1.设置修改轮播图的页面结构
    * 在开始位置添加原始的最后一张图片，结束位置添加原始的第一张
    * 获取轮播图结构
    */
    var banner = document.querySelector(".jd_banner");
    /*
   * 获取图片容器
   */
    var imgBox = banner.querySelector("ul:first-of-type");
    /* 获取原始的第一张图
   * 插入*/
    var first = imgBox.querySelector("li:first-of-type");
    var last = imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    /*2.设置对应的样式*/
    var lis = imgBox.querySelector("li");
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + "px";
    for (var i=0; i<lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }
    /*3.设置默认的偏移*/
    var index = 1;
    imgBox.style.left = -bannerWidth + "px";
    /*4.当屏幕变化时，重新计算宽度*/
    window.onresize = function() {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count * bannerWidth + "px";
        for (var i=0;i<lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        imgBox.style.left = -index*bannerWidth + "px";
    }
    /*5.实现自动轮播*/
    var timerId;
    var startTime = function() {
        timerId = setInterval(function() {
            index++;
            // console.log(index);
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
            setTimeout(function() {
                console.log(index);
                if (index === count-1) {
                    console.log(index);
                    index = 1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-index*bannerWidth)+"px";
                }
            },500);
        },2000);
    }
    startTime();
    /*6.实现手动轮播*/
    var startX,moveX, distanceX;
    imgBox.addEventListener("touchstart", function(e) {
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function(e) {
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX-startX;
        imgBox.style.transition = "none";
        imgBox.style.left = (-index*bannerWidth + distanceX) + "px";
    });
    imgBox.addEventListener("touchend", function(e) {
        if(Math.abs(distanceX)>100) {
            if (distanceX>0){
                index--;
            } else {
                index++;
            }
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        } else if (Math.abs(distanceX)>0){
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        startTime();
    });
    imgBox.addEventListener("webkitTransitionEnd",function(){
        /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
        if(index==count-1){
            index=1;
            /*清除过渡*/
            imgBox.style.transition="none";
            /*设置偏移*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            /*清除过渡*/
            imgBox.style.transition="none";
            /*设置偏移*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
    });
}
//================================================================================
// 倒计时js
function timeBack() {
    //    获取用于显示时间的span
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    //    设置初始倒计时时间,单位s
    var totalTime = 37894;
    var timeID = setInterval(function(){
        totalTime--;
        if (totalTime<0) {
            clearInterval(timeID);
            return;
        }
        var hour = Math.floor(totalTime/3600);
        var minute = Math.floor(totalTime%3600/60);
        var second = Math.floor(totalTime%60);

        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);

        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);

        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
    },1000)
}