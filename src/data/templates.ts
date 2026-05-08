export interface TemplateData {
  id: string;
  name: string;
  category: string;
  tags: string[];
  latexSource: string;
}

const atlasLatex = `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}

\\pagestyle{fancy}
\\fancyhf{} 
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Alex Rivera} \\\\ \\vspace{1pt}
    San Francisco, CA $|$ \\href{mailto:alex@atelier.dev}{\\underline{alex@atelier.dev}} $|$ (555) 000-0000
\\end{center}

\\section{Experience}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
      \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{Digital Atelier} & Jan 2022 -- Present \\\\
        \\textit{Senior Software Engineer} & \\textit{San Francisco, CA} \\\\
      \\end{tabular*}\\vspace{-7pt}
      \\begin{itemize}
        \\item Architected the core LaTeX compilation engine using WebAssembly, reducing build times by 40\\%.
        \\item Implemented a collaborative editing environment supporting up to 50 concurrent users.
        \\item Mentored a team of 5 junior engineers and established modern CI/CD practices.
      \\end{itemize}

    \\item
      \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{TechFlow Systems} & June 2019 -- Dec 2021 \\\\
        \\textit{Full Stack Developer} & \\textit{San Francisco, CA} \\\\
      \\end{tabular*}\\vspace{-7pt}
      \\begin{itemize}
        \\item Developed microservices in Node.js serving 1M+ daily active users.
        \\item Redesigned the internal dashboard using React, improving operational efficiency by 25\\%.
      \\end{itemize}
  \\end{itemize}

\\section{Education}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
      \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{University of California, Berkeley} & Class of 2019 \\\\
        \\textit{B.S. in Computer Science} & \\textit{Berkeley, CA} \\\\
      \\end{tabular*}
  \\end{itemize}

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item{
     \\textbf{Languages}{: JavaScript (ES6+), TypeScript, LaTeX, C++, Rust, Python} \\\\
     \\textbf{Frameworks}{: React, Node.js, Tailwind CSS, WebAssembly, Express}
    }
 \\end{itemize}

\\end{document}
`;

const novaLatex = `\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{primary}{RGB}{0, 102, 255}

\\titleformat{\\section}{\\large\\bfseries\\color{primary}}{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{minipage}[t]{0.3\\textwidth}
    \\vspace{0pt}
    {\\huge\\bfseries Jordan \\\\ Smith}\\\\[1em]
    \\textbf{Contact}\\\\
    jordan@example.com\\\\
    (555) 123-4567\\\\
    New York, NY\\\\[1em]
    
    \\textbf{Skills}\\\\
    JavaScript\\\\
    React\\\\
    Node.js\\\\
    PostgreSQL
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.65\\textwidth}
    \\vspace{0pt}
    \\section*{Experience}
    \\textbf{Frontend Developer} \\hfill 2021 - Present\\\\
    \\textit{Creative Agency, NY}\\\\
    Built responsive web applications using React and Tailwind CSS.
    
    \\vspace{1em}
    \\textbf{Junior Developer} \\hfill 2019 - 2021\\\\
    \\textit{Tech Startup, NY}\\\\
    Assisted in building REST APIs and managing database schemas.
    
    \\section*{Education}
    \\textbf{B.S. Software Engineering}\\\\
    \\textit{New York University} \\hfill 2019
\\end{minipage}

\\end{document}
`;

export const templates: TemplateData[] = [
  {
    id: "atlas",
    name: "Atlas",
    category: "ATS-Optimized",
    tags: ["ATS FRIENDLY", "CLASSIC"],
    latexSource: atlasLatex,
  },
  {
    id: "nova",
    name: "Nova",
    category: "Modern",
    tags: ["MODERN", "DESIGNER"],
    latexSource: novaLatex,
  },
  // We can add others later. For now, defaulting to Atlas if not found.
];
