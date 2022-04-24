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



    function loadComponent(target, component, callback){
        var prefix = "./component/";
        var fullUrl = prefix + component;
        var targets = document.querySelector(target);
        loadHtml(targets, fullUrl, callback);
    }

    function loadContent(content_url){
        var prefix = "./page/";
        var fullUrl = prefix + content_url;
        var target = document.querySelector(".content-div");
        loadHtml(target, fullUrl);
    }


    function loadContentsHtml(url, callback){
        var prefix = "./contents/study/";
        var fullUrl = prefix + url;

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
         
            if(this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                callback(response);
            }
            
        }
        xhttp.open("GET", fullUrl, true);
        xhttp.send();
    }


 
    
    function loadHtml(target, url, callback = null){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                console.log(this.status);
                console.log(this);
                target.innerHTML  = this.responseText;
                var scriptList = target.querySelectorAll("script");
                console.log(scriptList);
                for(var i=0; i < scriptList.length; i++){
                    if(scriptList[i].src){
                        loadScript(scriptList[i].src, callback);
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
            script.onload = (function(){
                callback();
            });
            
        }

        // Fire the loading
        document.body.appendChild(script);
    }

    function getMainPage(){
        return loadedPage["mainPage"];
    }
    
    return {loadPage, loadPages, loadComponent, loadContent, loadContentsHtml, getMainPage};
});
var swh = new swhLib();










