setInterval(() => {
    var div=document.getElementsByTagName("div");
    for (var i=0; i<div.length;i++){
        if (div[i].className.includes("ad-blocker")){
            div[i].style.display="none";
        }
    }

    var fixHalfScreen=document.getElementById("js-game-video");
    fixHalfScreen.style.top = "0vh";
    fixHalfScreen.style.left = "0vw";
    fixHalfScreen.style.width = "100vw"
    fixHalfScreen.style.height = "100vh"
},0);
