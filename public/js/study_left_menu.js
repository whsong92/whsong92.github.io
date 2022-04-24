var studyLeftMenuLib = (function(){
    const li = document.querySelectorAll(".study-li");

    li.forEach((li, index) => {
        li.addEventListener("click", () => {
            study.setMenu(index);
            liClicked(index);
        });
    });

    function liClicked(index){
        removeLiActiveClass();
        li[index].classList.add("active");
    }

    function removeLiActiveClass(){
        li.forEach((li) => {
            li.classList.remove("active");
        });
    }
});
var studyLeftMenu = new studyLeftMenuLib();

function getPageglobalVar(){
    return studyLeftMenu;
}