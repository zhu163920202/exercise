window.onload = function() {
    /*获取左侧栏*/
    var ct_cleft = document.querySelector(".ct_cleft");
    var leftHeight = ct_cleft.offsetHeight;
    /*获取用来滑动的列表*/
    var ulBox = ct_cleft.querySelector("ul:first-of-type");
    var ulBoxHeight = ulBox.offsetHeight;
    /*设置静态下的最值*/
    var lis = ulBox.querySelectorAll("li");
    /*设置动态下的最值*/
    var maxTop = 0;
    var minTop = leftHeight - ulBoxHeight;
    var maxBounceTop = maxTop + 100;
    var minBounceTop = minTop - 100;
    // console.log(maxBounceTop +";"+ minBounceTop);
    // 实现滑动
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    /*记录当前元素滑动到的距离*/
    var currentY = 0;
    ulBox.addEventListener("touchstart", function(e) {
        startY = e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove", function(e) {
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        if(currentY+distanceY > maxBounceTop || currentY+distanceY<minBounceTop){
            console.log("out of range")
        }
        ulBox.style.transition = "none";
        ulBox.style.top = (currentY + distanceY) + "px";
    });
    ulBox.addEventListener("touchend", function(e) {
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            ulBox.style.transition = " top 0.5s";
            ulBox.style.top = minTop + "px";
        } else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = maxTop + "px";
        } else {
            currentY += distanceY;
        }
    });
    for (var i=0;i<lis.length;i++) {
        lis[i].index = i;
    }
}