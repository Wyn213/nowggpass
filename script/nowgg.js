var doc = document.getElementById("iframe").contentWindow; 
  
var script=doc.document.createElement("script");
script.src=window.location.origin+"script/fixer.js";
doc.document.body.appendChild(script);