/*
vertion: 1.0
creat time: 2016-05-10
update time: 2016-05-10
author: yigu 1159255468@qq.com

piceScroll is for web page to change pice by pice.
it needs JQuery first.
*/
var PiceScroll = (function(){
    var piceScrollIndex = 0;
    var ARRAYID = [];
    var times = 0;
    var SUM, Y;
    //browser
    document.addEventListener('DOMMouseScroll', beautyScroll, false);//firefox  
    document.onmousewheel = beautyScroll;//ie chrome  

    function beautyScroll(e) {  
        e = e || window.event;  
        if (e.wheelDelta && times++ == 3) {  //判断浏览器IE，谷歌滑轮事件    
            console.log(e.wheelDelta);
            if (e.wheelDelta > 0) {  
                nextUP();
            }else if (e.wheelDelta < 0) {  
                nextDown();
            }  
            times = 0;
        } else if (e.detail && times++ == 3) {  //Firefox滑轮事件  
            console.log(e.detail);
            return 0;
            if (e.detail> 0) { 
                nextUP();
            }else if (e.detail< 0) {
                nextDown();
            }  
            times = 0;
        }  
    }

    //phone
    document.addEventListener('touchstart', function(event) {
        Y = event.targetTouches[0].pageY;
    }, false);
    document.addEventListener('touchmove', function(event) {
        SUM = event.targetTouches[0].pageY -  Y;
    }, false);
    document.addEventListener('touchend', function(event) {
        if(SUM > 0){
            console.log("上");
            nextUP(); 
        }else if(SUM < 0){
            console.log("下");
            nextDown();  
        }
    }, false);

    function nextUP(){
        if(piceScrollIndex-1 < 0){
            return 0;
        }
        $(".piceScroll>.active").removeClass("active");
        $(".piceScroll>#" + ARRAYID[--piceScrollIndex]).addClass("active");
        var top = $(".piceScroll>.active")[0].offsetTop;
        console.log("+"+top);
        $(".piceScroll").css("transform", "translateY(-"+top+"px)");
    }

    function nextDown(){
        //window.location.hash = "#"+ARRAYID[piceScrollIndex];
        if(piceScrollIndex+1 >= ARRAYID.length){
            return 0;
        }
        $(".piceScroll>.active").removeClass("active");
        $(".piceScroll>#" + ARRAYID[++piceScrollIndex]).addClass("active");
        var top = $(".piceScroll>.active")[0].offsetTop;
        console.log("-"+top);
        $(".piceScroll").css("transform", "translateY(-"+top+"px)");
    }

    return function (arrayID){
        ARRAYID = arrayID;
    };
})();
  