document.addEventListener("DOMContentLoaded", function(){
    addEvent();
});


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
