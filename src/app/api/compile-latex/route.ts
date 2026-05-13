import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { latexCode } = await request.json();

    if (!latexCode) {
      return NextResponse.json({ error: "LaTeX code is required" }, { status: 400 });
    }

    // Prepare FormData exactly how TeXLive.net expects a file upload form submission
    const formData = new FormData();
    
    // We MUST wrap the string in a Blob so it's treated as a file upload, 
    // otherwise the older CGI script throws "Bad form type: no main document"
    const fileBlob = new Blob([latexCode], { type: "application/x-tex" });
    formData.append("filecontents[]", fileBlob, "resume.tex");
    
    formData.append("filename[]", "resume.tex");
    formData.append("engine", "pdflatex");
    formData.append("return", "pdf");

    // Send to TeXLive.net
    const response = await fetch("https://texlive.net/cgi-bin/latexcgi", {
      method: "POST",
      body: formData,
      // 30 seconds is plenty; TeXLive is usually very fast
      signal: AbortSignal.timeout(30000), 
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok || !contentType?.includes("application/pdf")) {
      // If it's not a PDF, TeXLive returns an HTML page with the compiler log.
      // We'll read it just to log it on the server, but return a clean error to the user.
      const errorHtml = await response.text();
      console.error("LaTeX Compilation Failed (TeXLive Log):", errorHtml.substring(0, 500) + "...");
      
      return NextResponse.json(
        { error: "Compilation failed. Please check your LaTeX code for syntax errors (e.g. missing brackets or unsupported packages)." },
        { status: 400 }
      );
    }

    // If successful, read the raw binary PDF stream
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to base64 for easy transport to the frontend iframe
    const base64Pdf = buffer.toString("base64");
    
    return NextResponse.json({
      pdfUrl: `data:application/pdf;base64,${base64Pdf}`
    });

  } catch (error: any) {
    console.error("API Error:", error);
    
    if (error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "The compilation service is taking too long. Please try again." }, 
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error during compilation." }, 
      { status: 500 }
    );
  }
}
