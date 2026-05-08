const https = require('https');

const latexCode = `\\documentclass{article}\\begin{document}Hello World\\end{document}`;

// Test latexonline.cc
const formData = new URLSearchParams();
formData.append("text", latexCode);
formData.append("command", "pdflatex");

fetch("https://latexonline.cc/compile", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData.toString()
})
.then(res => {
  console.log("latexonline.cc status:", res.status);
  return res.text();
})
.then(text => console.log("latexonline.cc response:", text.substring(0, 100)))
.catch(err => console.error("latexonline err:", err));

// Test ytotech
fetch("https://latex.ytotech.com/builds/sync", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    compiler: "pdflatex",
    resources: [
      {
        main: true,
        file: "main.tex",
        content: latexCode
      }
    ]
  })
})
.then(res => {
  console.log("ytotech status:", res.status);
  return res.text();
})
.then(text => console.log("ytotech response length:", text.length, "starts with:", text.substring(0, 20)))
.catch(err => console.error("ytotech err:", err));
