var studyLib = (function(){
    var selMenuIdx;
    var selStudyList = [];
    var env = ['linux', 'wsl', 'docker', 'vscode', 'git', 'graalvm', 'jenkins'];
    var lang = ['language', 'html', 'css', 'javascript', 'python', 'java', 'clojure', 'rust'];
    var frame = ['browser', 'reactjs', 'vuejs', 'svelte', 'electronjs', 'nodejs', 'spring', 'django', 'luminus'];
    var api = ['graphql', 'grpc'];
    var db = ['redis', 'mongodb', 'oracle', 'neo4j'];
    var theory = ['automata', 'compiler', 'blockchain', 'ipfs', 'deeplearning', 'os_kernel'];
    var etc = ['photoshop', 'composition','unreal', 'blender', 'economic'];
    var all = [].concat(env).concat(lang).concat(frame).concat(api).concat(db).concat(theory).concat(etc);
    function getAll(){return all;}
    function getEnv(){return env;}
    function getLang(){return lang;}
    function getFrame(){return frame;}
    function getApi(){return api;}
    function getDb(){return db;}
    function getTheory(){return theory;}
    function getEtc(){return etc;}
    function getStudyList(){return selStudyList;}

    function contentClick(target, idx){
        study.loadStudyList(target.getAttribute('id'));
    }

    function contentHover(target, idx){
        console.log(target);
        console.log(idx);

        var offset = target.getBoundingClientRect();
        var top = offset.top;
        var bottom = offset.bottom;
        var left = offset.left;
        var right = offset.right;


        var details = document.querySelectorAll(".contents-detail");
        details.forEach((detail, index) => {
            if(index == idx){

                console.log("top : " + top);
                console.log("bottom : " + bottom);
                console.log("left : " + left);
                console.log("right : " + right);
                console.log("window height : " + window.innerHeight);
                console.log("window width : " + window.innerWidth);

                var isLeft = window.innerWidth / 2 > left ? true : false;
                if(isLeft){
                    detail.style.left = left + "px";
                }else{
                    detail.style.right = (window.innerWidth - right) + "px";
                }
                
                var isBottom = window.innerHeight - bottom > 150 ? true : false;
                if(isBottom){
                    detail.style.top = top + 240 + "px";
                }else{
                    detail.style.top =  top - 300 + "px";
                }
                //detail.style.display = "block";
                detail.classList.add("active");
            }else{
                //detail.style.display = "none";
                detail.classList.remove("active");
            }
        });
    }

    function contentHoverOut(target, idx){
        console.log("Hover out");
        console.log(target);
        console.log(idx);

        var details = document.querySelectorAll(".contents-detail");
        details.forEach((detail, index) => {
            detail.classList.remove("active");
            //detail.style.display = "none";
        });
    }


    function setMenu(idx = 0){
        console.log("idx : " + idx);
        if(selMenuIdx != idx){
            selMenuIdx = idx;

            if(studyContent){
                var list;
                switch(selMenuIdx){
                    case 0:
                        list = getAll();
                        break;
                    case 1:
                        list = getEnv();
                        break;
                    case 2:
                        list = getLang();
                        break;
                    case 3:
                        list = getFrame();
                        break;
                    case 4:
                        list = getApi();
                        break;
                    case 5:
                        list = getDb();
                        break;
                    case 6:
                        list = getTheory();
                        break;
                    case 7:
                        list = getEtc();
                        break;
                }

                var requestList = [...list];
                selStudyList = [...list];

                swh.loadComponentHtml("/study_subject_logo_template.html", function(templateOrg){
                    swh.loadContentJson("/study/study.json", function(obj){
                        var target = document.querySelector(".study-subject-lists");
                        target.innerHTML = "";
                        list.forEach((li, index) => {
                            if(obj[li].show.toUpperCase() == "Y"){
                                var template = templateOrg.slice();

                                template = template.replaceAll('"{{id}}"', obj[li].title);
                                template = template.replaceAll('"{{title}}"', obj[li].title);
                                template = template.replaceAll('"{{kind}}"', "'" + "list " + obj[li].kind + "'");
                                template = template.replaceAll('{{img-src}}', obj[li].imgSrc);
                                template = template.replaceAll('{{total}}', obj[li].total);
                                template = template.replaceAll('{{lst_chg_dtm}}', obj[li].lstChgDtm);
                                
                                target.innerHTML = target.innerHTML + '\n' + template;
                            }


                            if(list.length-1 == index){
                                var lis = document.querySelectorAll(".study-subject-lists .list");
                                lis.forEach((li, index) => {
                                    console.log(li);
                                    li.addEventListener("click", function(){
                                        contentClick(this, index);
                                    });
                                    li.addEventListener("mouseenter", function(){
                                        contentHover(this, index);
                                    });
                    
                                    li.addEventListener("mouseout", function(){
                                        contentHoverOut(this, index);
                                    });
                                }); 
                            }
                        });                      
                    });
                })
                //일단 테스트용
                //studyContent.requestSubjectList(requestList);
                
            }
        }
        
        divFocus("subject");
    }

    function divFocus(focus){
        var subject = document.querySelector(".study-subject-content");
        var list = document.querySelector(".study-list-content");



        switch(focus){
            case "subject":
                subject.classList.add("max");
                list.classList.add("min");
                subject.classList.remove("min");
                list.classList.remove("max");
                break;
            case "list":
                subject.classList.add("min");
                list.classList.add("max");
                subject.classList.remove("max");
                list.classList.remove("min");
                break;
            default:
                break;
        }
    }


    function setSubject(subject){
        studyList.requestList(subject);
    }

    function loadStudyLeftMenu(){
        swh.loadComponent(".study-left-menu","study_left_menu.html");
    }

    function loadStudySubject(){
        console.log("==============");
        swh.loadComponent(".study-subject-content","study_subject_content.html", function(){
            setMenu();
            divFocus("subject");
        });
    }

    function loadStudyList(subject){
        if(subject == null){
            return;
        }
        swh.loadComponent(".study-list-content","study_list.html", function(){
            swh.setHistory("study");
            history.pushState(null, null, "./main.html?page=study");
            setSubject(subject);
            divFocus("list");
        });
    }

    function init(){
        loadStudyLeftMenu();
        loadStudySubject();
    }
    

    return {init, getAll, getEnv, getLang, getFrame, getApi, getDb, getTheory, getEtc, getStudyList, setMenu, loadStudyList}


});
var study = new studyLib();
study.init();