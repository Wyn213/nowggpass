setInterval(() => {
    var div=document.getElementsByTagName("div");
    for (var i=0; i<div.length;i++){
        if (div[i].className.includes("ad-blocker")){
            div[i].style.display="none";
        }
    }

    var fixHalfScreen=document.getElementById("js-game-video");
    fixHalfScreen.style.top = "50vh";
},0);
