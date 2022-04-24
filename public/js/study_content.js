var studyContentLib = (function(){
    var filepath = "./contents/study";





    function requestContent(list){
        var content = list.pop();
        swh.loadContentsHtml("/"+content+'/logo.html', function(response){
            var target = document.querySelector(".study-lists");
            target.innerHTML = target.innerHTML + '\n' + response;
            
            if(list.length > 0){
                requestContent(list);
            }else{
                return;
            }
        });          
    }


    
    function studyContentsLoad(contentList){
        if(contentList.length > 0){
            var target = document.querySelector(".study-lists");
            target.innerHTML = '';
            requestContent(contentList.reverse());
        }
    }


    return {studyContentsLoad}
});


var studyContent = new studyContentLib();