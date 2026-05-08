const latexCode = `\\documentclass{article}\\begin{document}Hello World\\end{document}`;

// Test latexonline.cc GET
fetch("https://latexonline.cc/compile?text=" + encodeURIComponent(latexCode))
.then(res => {
  console.log("latexonline.cc GET status:", res.status);
  return res.buffer ? res.buffer() : res.arrayBuffer();
})
.then(buffer => console.log("latexonline.cc GET response length:", buffer.byteLength))
.catch(err => console.error("latexonline GET err:", err));

// Test latexonline.cc POST /data
const formData = new URLSearchParams();
formData.append("text", latexCode);
formData.append("command", "pdflatex");

fetch("https://latexonline.cc/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData.toString()
})
.then(res => {
  console.log("latexonline.cc POST /data status:", res.status);
  return res.text();
})
.then(text => console.log("latexonline.cc POST /data response:", text.substring(0, 100)))
.catch(err => console.error("latexonline POST /data err:", err));
