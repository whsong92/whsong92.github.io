var inter;


document.addEventListener("DOMContentLoaded", () => {
    split_backgroud();
});

//백그라운드 이미지 크기 조절 이벤트
function split_backgroud(){
    const left = document.querySelector(".left");
    const leftSubtitle = document.querySelector(".left-subtitle");
    const right = document.querySelector(".right");
    const rightSubtitle = document.querySelector(".right-subtitle");
    const container = document.querySelector(".container");
    left.addEventListener("mouseenter", () => {
        container.classList.add("hover-left");
        var txt = "간단한 이론을 정리한 파트입니다.<br/>테스트";
        clearInterval(inter);
        setSubtitle(leftSubtitle, txt);
    });
    left.addEventListener("mouseleave", () => {
        container.classList.remove("hover-left");
        var txt = "";
        clearInterval(inter);
        leftSubtitle.innerHTML = txt;
        //setSubtitle(leftSubtitle, txt);
    });
    right.addEventListener("mouseenter", () => {
        container.classList.add("hover-right");
        var txt = "간단한 프로젝트를 실습하는 파트입니다.";
        clearInterval(inter);
        setSubtitle(rightSubtitle, txt);
    });
    right.addEventListener("mouseleave", () => {
        container.classList.remove("hover-right");
        var txt = "";
        clearInterval(inter);
        rightSubtitle.innerHTML = txt;
        //setSubtitle(rightSubtitle, txt);
    });
}

//===================================================
//              타이틀 한글 입력 이벤트
//===================================================
//한글 입력
function setSubtitle(target, subtitle){
    var result = subtitle.split('');
    var typeing = [];

    for(var i=0; i < result.length; i++){
        typeing[i] = getAlphabet(result[i]);
    }


    var text = "";
    var i=0;
    var j=0;
    var imax = typeing.length;

    console.log("========================");
    inter = setInterval(function(){
        if(i<=imax-1){
            //각 글자가 초성 중성 종성 순서대로 추가되도록 
            var jmax = typeing[i].length;
            target.innerHTML = text + typeing[i][j];
            console.log(typeing[i][j]);
            j++;
            if(j==jmax){
              text+=  typeing[i][j-1];//초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
              i++;
              j=0;
            }
          } else{
            clearInterval(inter);
          }
    }, 80);
}



//초성 중성 종성 분류
function getAlphabet(word){
    var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], 
      cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], 
      cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ]
      , cho, jung, jong; 

    var txt = word;
    var txtLen = word.length;
    var chars = [];
    var cCode;

    for(var i=0; i < txtLen; i++){
        cCode = txt.charCodeAt(i);

        //띄어쓰기인 경우
        if(cCode == 32){
            chars.push(" ");
            continue;
        }

        // 한글이 아닌 경우 
        if (cCode < 0xAC00 || cCode > 0xD7A3) { 
            chars.push(txt.charAt(i)); 
            continue; 
        } 

        //한글인 경우
        cCode = txt.charCodeAt(i) - 0xAC00; 
        
        //받침(종성)
        jong = cCode % 28;

        //모음(중성)
        jung = ((cCode - jong) / 28 ) % 21 

        //자음(초성)
        cho = (((cCode - jong) / 28 ) - jung ) / 21 

        chars.push(cCho[cho]);
        chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
        if (cJong[jong] !== '') { 
        chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
        }
    }
    return chars; 
}



