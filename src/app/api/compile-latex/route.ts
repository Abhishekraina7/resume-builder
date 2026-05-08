import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { latexCode } = await request.json();

    if (!latexCode) {
      return NextResponse.json(
        { error: "LaTeX code is required" },
        { status: 400 }
      );
    }

    // We use latexonline.cc for compilation
    // POST /compile is deprecated, so we use GET /compile?text=...
    const url = `https://latexonline.cc/compile?text=${encodeURIComponent(latexCode)}&command=pdflatex`;

    const response = await fetch(url, {
      method: "GET",
      // Some compilations take a few seconds
      signal: AbortSignal.timeout(15000), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LaTeX Compilation Failed:", errorText);
      return NextResponse.json(
        { error: "Compilation failed. Check your LaTeX syntax." },
        { status: response.status }
      );
    }

    // The response is the raw PDF binary
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // We convert it to base64 so we can easily send it to the client
    // and display it in an iframe or <object> tag
    const base64Pdf = buffer.toString("base64");
    const dataUrl = `data:application/pdf;base64,${base64Pdf}`;

    return NextResponse.json({ pdfUrl: dataUrl });
  } catch (error: any) {
    console.error("API Error during compilation:", error);
    
    if (error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Compilation timed out. The LaTeX code might be too complex or contain an infinite loop." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error during compilation." },
      { status: 500 }
    );
  }
}
