var studyContentLib = (function(){
    var filepath = "./contents/study";



    function contentClick(target, idx){
        console.log(target);
        console.log(idx);

        var stdList = study.getStudyList();
        //alert(stdList[idx]);
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
                
                
                detail.style.display = "block";
            }else{
                detail.style.display = "none";
            }
        });
    }

    function contentHoverOut(target, idx){
        console.log("Hover out");
        console.log(target);
        console.log(idx);

        var details = document.querySelectorAll(".contents-detail");
        details.forEach((detail, index) => {
            detail.style.display = "none";
        });
    }



    function requestContent(list){
        var content = list.pop();
        swh.loadContentsHtml("/"+content+'/logo.html', function(response){
            var target = document.querySelector(".study-lists");
            target.innerHTML = target.innerHTML + '\n' + response;
            
            if(list.length > 0){
                requestContent(list);
            }else{
                
                var lis = document.querySelectorAll(".study-lists .list");
                
                lis.forEach((li, index) => {
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