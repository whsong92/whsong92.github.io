var swhLib = (function(){
    var loadedPage = {};
    var loadedComponent = {};
    var loadedContent = {};
    var loadedScript = {};
    
    function isDevEnv(){
        var result = false;
        var locat = location.hostname;

        if(locat.indexOf("127.0.0.1") > 0 || locat.indexOf("localhost") > 0){
            result = true;
        }

        return result;
    }

    function loadPage(page){
        location.href="./main.html?page="+page;
    }

    function loadPages(target, component){
        var prefix = "./page/";
        var fullUrl = prefix + component;
        var targets = document.querySelector(target);
        loadHtml(targets, fullUrl);
    }



    function loadComponent(target, component){
        var prefix = "./component/";
        var fullUrl = prefix + component;
        var targets = document.querySelector(target);
        loadHtml(targets, fullUrl);
    }

    function loadContent(content_url){
        var prefix = "./page/";
        var fullUrl = prefix + content_url;
        var target = document.querySelector(".content-div");
        loadHtml(target, fullUrl);
    }
 
    function getMainPage(){
        return loadedPage["mainPage"];
    }

    function loadHtml(target, url){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                target.innerHTML  = this.responseText;
                var script_list = target.querySelectorAll("script");
                console.log(script_list);
                for(var i=0; i < script_list.length; i++){
                    if(script_list[i].src){
                        loadScript(script_list[i].src);
                    }
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function loadScript(url, callback = null){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        if(callback){
            script.onreadystatechange = callback;
            script.onload = callback;
        }

        // Fire the loading
        document.body.appendChild(script);
    }
    
    return {loadPage, loadPages, loadComponent, loadContent, getMainPage};
});
var swh = new swhLib();










