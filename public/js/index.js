document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    var device = "desktop";
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        device = "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        device = "mobile";
    }else{
        device = "desktop";
    }

    switch(device){
        case "desktop" :
            addEvent();
            break;
        case "tablet":
        case "mobile":
            goMobile();
            break;
    }
}

function addEvent(){
    const lBtn = document.querySelector(".left-btn");
    const rBtn = document.querySelector(".right-btn");

    lBtn.addEventListener("click", function(){
        location.href="./public/pages/main.html?page=study";
    });

    rBtn.addEventListener("click", function(){
        location.href="./public/pages/main.html?page=project";
    });
}

function goMobile(){
    alert("모바일 페이지는 준비 중 입니다.\n구글로 이동합니다.");
    location.href= "http://google.co.kr";
}