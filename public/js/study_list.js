var studyListLib = (function(){
    var fileName = "/list.html"
    var selSubject = null;

    function requestList(subject){

        if(subject == null){
            return;
        }else{
            var reqUrl = subject + fileName;

            console.log(reqUrl);

            swh.loadContentsHtml(reqUrl, function(response){
                var target = document.querySelector(".study-lists");
                target.innerHTML = target.innerHTML + '\n' + response;
            });   
        }
    }


    return {requestList};

});


var studyList = new studyListLib();