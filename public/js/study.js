var studyLib = (function(){
    var selMenuIdx;
    var selStudyList = [];
    var env = ['linux', 'wsl', 'docker', 'vscode', 'git', 'graalvm', 'jenkins'];
    var lang = ['language', 'html', 'css', 'javascript', 'python', 'java', 'clojure', 'rust'];
    var frame = ['browser', 'reactjs', 'vuejs', 'svelte', 'electronjs', 'nodejs', 'spring', 'django', 'luminus','unreal'];
    var api = ['graphql', 'grpc'];
    var db = ['redis', 'mongodb', 'oracle', 'neo4j'];
    var theory = ['automata', 'compiler', 'blockchain', 'ipfs', 'deeplearning', 'os_kernel'];
    var etc = ['photoshop', 'cakewalk', 'blender', 'economic'];
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
                studyContent.studyContentsLoad(requestList);
            }
        }
    }


    function init(){
        swh.loadComponent(".study-content","study-content.html", this.setMenu);
        swh.loadComponent(".study-left-menu","study-left-menu.html");
    }
    

    return {init, getAll, getEnv, getLang, getFrame, getApi, getDb, getTheory, getEtc, getStudyList, setMenu}


});
var study = new studyLib();
study.init();