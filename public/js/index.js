document.addEventListener("DOMContentLoaded", function(){
    addEvent();
});


function addEvent(){
    const lBtn = document.querySelector(".left-btn");
    const rBtn = document.querySelector(".right-btn");

    lBtn.addEventListener("click", function(){
        //location.href="./public/page/study.html";
        location.href="./public/page/main.html?page=study";
    });

    rBtn.addEventListener("click", function(){
        //location.href="./public/page/project.html";
        location.href="./public/page/main.html?page=project";
    });
}