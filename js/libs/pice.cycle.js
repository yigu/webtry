/*
vertion: 1.0
creat time: 2016-05-18
update time: 2016-05-18
author: yigu 1159255468@qq.com

piceCycle is for web page to change pice by pice and infinite.
it needs JQuery first.
*/
var PiceCycle = (function() {
    var TIME = 1000; //1s
    var piceCycleIndex = 0;
    var ARRAYID = [];
    var screenHeight;
    var times = 0;
    var SUM = 0, Y = 0;
    //browser
    document.addEventListener('DOMMouseScroll', beautyScroll, false); //firefox  
    document.onmousewheel = beautyScroll; //ie chrome  

    function beautyScroll(e) {
        e = e || window.event;
        if (e.wheelDelta && times++ == 3) { //判断浏览器IE，谷歌滑轮事件    
            console.log(e.wheelDelta);
            if (e.wheelDelta > 0) {
                nextFromUP();
            } else if (e.wheelDelta < 0) {
                nextFromDown();
            }
            times = 0;
        } else if (e.detail && times++ == 3) { //Firefox滑轮事件  
            console.log(e.detail);
            return 0;
            if (e.detail > 0) {
                nextFromUP();
            } else if (e.detail < 0) {
                nextFromDown();
            }
            times = 0;
        }
    }

    //phone
    document.addEventListener('touchstart', function(event) {
        Y = event.targetTouches[0].pageY;
    }, false);
    document.addEventListener('touchmove', function(event) {
        SUM = event.targetTouches[0].pageY - Y;
    }, false);
    document.addEventListener('touchend', function(event) {
        if (SUM > 0) {
            console.log("上");
            nextFromUP();
        } else if (SUM < 0) {
            console.log("下");
            nextFromDown();
        }
        SUM = 0;
        Y = 0;
    }, false);

    function nextFromUP() {
        //$("#"+ ARRAYID[piceCycleIndex]).css("z-index", 5);
        $(".activeFD").removeClass("activeFD");
        $(".activeFU").removeClass("activeFU");
        piceCycleIndex = piceCycleIndex == 0 ? ARRAYID.length - 1 : piceCycleIndex - 1;
        $("#" + ARRAYID[piceCycleIndex]).addClass("activeFU");
        setTimeout(function() {
            $(".active").removeClass("active");
            $("#" + ARRAYID[piceCycleIndex]).addClass("active");
        }, TIME);
    }

    function nextFromDown() {
        $(".activeFD").removeClass("activeFD");
        $(".activeFU").removeClass("activeFU");
        piceCycleIndex = (piceCycleIndex + 1) % ARRAYID.length;
        $("#" + ARRAYID[piceCycleIndex]).addClass("activeFD");
        setTimeout(function() {
            $(".active").removeClass("active");
            $("#" + ARRAYID[piceCycleIndex]).addClass("active");
        }, TIME);
    }

    return function(arrayID) {
        ARRAYID = arrayID;
    };
})();