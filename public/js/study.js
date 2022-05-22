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


                console.log(selStudyList);

                studyContent.requestSubjectList(requestList);
                
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
        swh.loadComponent(".study-left-menu","study-left-menu.html");
    }

    function loadStudySubject(){
        console.log("==============");
        swh.loadComponent(".study-subject-content","study-subject-content.html", function(){
            setMenu();
            divFocus("subject");
        });
    }

    function loadStudyList(subject){
        if(subject == null){
            return;
        }
        swh.loadComponent(".study-list-content","study-list.html", function(){
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