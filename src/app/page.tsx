import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Code2, FileText, LayoutTemplate, Sparkles, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">Digital Atelier</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#templates" className="hover:text-slate-900 transition-colors">Templates</Link>
            <Link href="#editor" className="hover:text-slate-900 transition-colors">Editor</Link>
            <Link href="#ai" className="hover:text-slate-900 transition-colors">AI Copilot</Link>
            <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/auth" className="hidden sm:block text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link href="/auth" className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-5 py-2 rounded-full transition-all flex items-center gap-1 shadow-sm shadow-blue-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 z-10 w-full max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Your Resume, <br />
            <span className="text-[#0055ff]">Crafted to <br /> Perfection.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
            AI-powered. LaTeX-precise. Effortlessly professional. The editorial workspace for your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth" className="inline-flex justify-center items-center gap-2 bg-[#0055ff] hover:bg-[#0044cc] text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all shadow-md shadow-blue-500/20">
              Get Started Free
            </Link>
            <Link href="#templates" className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-3.5 rounded-full font-medium text-lg transition-all shadow-sm">
              See Templates
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-600">
              Trusted by 10,000+ professionals
            </p>
          </div>
        </div>
        
        <div className="flex-1 relative w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[600px] aspect-[4/3] transform lg:translate-x-12">
            <Image 
              src="/hero_editor_mockup.png" 
              alt="Editor interface mockup" 
              fill 
              className="object-contain drop-shadow-2xl scale-110 md:scale-125"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-slate-50 py-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-4 md:gap-8 gap-y-4">
          {[
            { icon: <Code2 className="w-4 h-4 text-[#0055ff]" />, label: "LaTeX Editor" },
            { icon: <Sparkles className="w-4 h-4 text-[#0055ff]" />, label: "AI Copilot" },
            { icon: <LayoutTemplate className="w-4 h-4 text-[#0055ff]" />, label: "30+ Templates" },
            { icon: <Download className="w-4 h-4 text-[#0055ff]" />, label: "PDF Export" },
          ].map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-2.5 rounded-full shadow-sm text-sm font-medium text-slate-700">
              {feat.icon}
              {feat.label}
            </div>
          ))}
        </div>
      </section>

      {/* Feature 1: AI Advisor */}
      <section id="ai" className="py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 relative">
            <div className="w-full max-w-[480px] aspect-square relative">
              <Image 
                src="/ai_advisor_mockup.png" 
                alt="AI Advisor Interface" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Your Personal Resume Advisor
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              The Digital Atelier AI doesn't just check spelling. It understands the nuances of your industry. Upload your resume and target job description to receive context-aware recommendations that bridge the gap between your experience and their requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 2: LaTeX Power */}
      <section id="editor" className="py-24 md:py-32 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Full LaTeX Power, <br/> Zero Setup
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Experience the typesetting precision of LaTeX without the steep learning curve. Our cloud-based editor handles all the compilation in the background. Use professional macros or edit raw code—the choice is yours.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "No environment configuration required",
                "Real-time PDF rendering",
                "Version control for every iteration",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center relative">
            <div className="w-full max-w-[600px] aspect-[4/3] relative">
              <Image 
                src="/latex_editor_dark.png" 
                alt="LaTeX dark mode editor" 
                fill 
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Templates */}
      <section id="templates" className="py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center relative">
            <div className="w-full max-w-[500px] aspect-square relative transform -translate-x-4">
               <Image 
                src="/template_gallery_mockup.png" 
                alt="Beautiful resume templates" 
                fill 
                className="object-contain drop-shadow-xl saturate-110"
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Professionally Designed Templates
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Select from a curated gallery of templates designed by top recruiters. Whether you're a software engineer, a designer, or a corporate executive, we have the perfect editorial frame for your career story.
            </p>
            <div className="pt-4">
              <Link href="/templates" className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-[#0055ff] border-2 border-[#0055ff] px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-sm">
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-[#0055ff] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
          {/* Decorative grid background overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none mix-blend-overlay border-[1px] border-white/20" style={{backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'}}></div>
          
          <div className="relative z-10 space-y-8 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Ready to craft your masterpiece?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl font-medium">
              Join thousands of job seekers who landed their dream roles at Apple, Google, and Meta using Digital Atelier.
            </p>
            <Link href="/auth" className="inline-flex justify-center items-center bg-white hover:bg-slate-50 text-[#0055ff] px-10 py-4 rounded-full font-bold text-xl transition-all shadow-xl hover:scale-105 active:scale-95 border border-white/50">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="font-bold text-xl tracking-tight">Digital Atelier</span>
            <p className="text-sm text-slate-500">© 2024 Digital Atelier Inc. Built for precision.</p>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/twitter" className="hover:text-slate-900 transition-colors">Twitter</Link>
            <Link href="/support" className="hover:text-slate-900 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
