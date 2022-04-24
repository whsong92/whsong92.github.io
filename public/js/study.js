var studyLib = (function(){
    var selMenuIdx;
    var env = ['linux', 'wsl', 'docker', 'vscode', 'git', 'graalvm', 'jenkins'];
    var lang = ['java', 'javascript', 'html', 'css', 'python', 'clojure', 'rust'];
    var frame = ['browser', 'reactjs', 'vuejs', 'svelte', 'electronjs', 'nodejs', 'spring', 'django', 'luminus','unreal'];
    var api = ['graphql', 'grpc'];
    var db = ['redis', 'mongodb', 'oracle', 'neo4j'];
    var theory = ['automata', 'compiler', 'blockchain', 'ipfs', 'deeplearning', 'os'];
    var etc = [];
    var all = [].concat(env).concat(lang).concat(frame).concat(api).concat(db).concat(etc).concat(theory);
    function getAll(){return all;}
    function getEnv(){return env;}
    function getLang(){return lang;}
    function getFrame(){return frame;}
    function getApi(){return api;}
    function getDb(){return db;}
    function getTheory(){return theory;}
    function getEtc(){return etc;}
    
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
                studyContent.studyContentsLoad(requestList);
            }
        }
    }


    function init(){
        swh.loadComponent(".study-content","study-content.html", this.setMenu);
        swh.loadComponent(".study-left-menu","study-left-menu.html");
    }
    

    return {init, getAll, getEnv, getLang, getFrame, getApi, getDb, getTheory, getEtc, setMenu}


});
var study = new studyLib();
study.init();