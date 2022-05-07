var swhCommonLib = (function(){
    function sleep(ms){
        return new Promise((r) => setTimeout(r, ms));
    }
    
    return {sleep};
});
var swhCommon = new swhCommonLib();










