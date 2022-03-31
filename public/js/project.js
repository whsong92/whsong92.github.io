const activePanel = document.querySelectorAll(".panel");

activePanel.forEach((panel, index) => {
    panel.addEventListener("click", goProject);
});

function goProject(){
    if(this.className.split(' ').indexOf('active') < 0){
        return;
    }

    loadContent('project_dtl.html');

    var projectNo = this.getAttribute("project-no");
    switch(projectNo){
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            break;
    }
  }