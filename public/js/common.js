var swhCommonLib = (function(){
    function sleep(ms){
        return new Promise((r) => setTimeout(r, ms));
    }

    function startLoading(){
        var studyLoading = document.querySelector(".study-loading-content");
        var projectLoading = document.querySelector(".project-loading-content");
        var aboutLoading = document.querySelector(".about-loading-content");
        if(studyLoading){
            studyLoading.classList.add("active");
        }else if(projectLoading){
            projectLoading.classList.add("active");
        }else if(aboutLoading){
            aboutLoading.classList.add("active");
        }
    }

    function stopLoading(){
        var studyLoading = document.querySelector(".study-loading-content");
        var projectLoading = document.querySelector(".project-loading-content");
        var aboutLoading = document.querySelector(".about-loading-content");

        if(studyLoading){
            studyLoading.classList.remove("active");
        }
        
        if(projectLoading){
            projectLoading.classList.remove("active");
        }
        
        if(aboutLoading){
            aboutLoading.classList.remove("active");
        }

    }
    
    return {sleep, startLoading, stopLoading};
});
var swhCommon = new swhCommonLib();










