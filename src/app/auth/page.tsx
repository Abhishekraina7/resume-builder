"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginWithGoogle, loginWithEmail, registerWithEmail } from "@/backend/firebase/auth.service";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      await loginWithGoogle();
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setErrorMsg("Please fill in all fields.");
    try {
      setIsLoading(true);
      setErrorMsg("");
      if (isSignIn) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background subtle radial gradient effect matching the image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-[radial-gradient(circle,_#cbd5e1_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="bg-white w-full max-w-[420px] rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] relative z-10 flex flex-col">
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-8 tracking-tight">
          <Link href="/">Digital Atelier</Link>
        </h1>

        {/* Toggle Sign In / Sign Up */}
        <div className="bg-slate-100 p-1.5 rounded-full flex mb-8">
          <button
            onClick={() => setIsSignIn(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              isSignIn 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              !isSignIn 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Google Auth Button */}
        <button 
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-full transition-colors mb-7 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-4 mb-7">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">or</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Form fields */}
        <form className="space-y-4 flex-1 flex flex-col" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div>
               <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name" 
                className="w-full bg-slate-100/80 hover:bg-slate-100 border-none rounded-full px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0066ff]/20 focus:bg-white transition-all outline-none"
              />
            </div>
          )}
          
          <div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" 
              required
              className="w-full bg-slate-100/80 hover:bg-slate-100 border-none rounded-full px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0066ff]/20 focus:bg-white transition-all outline-none"
            />
          </div>
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required
              className="w-full bg-slate-100/80 hover:bg-slate-100 border-none rounded-full pl-5 pr-12 py-3.5 text-sm text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0066ff]/20 focus:bg-white transition-all outline-none"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 focus:outline-none transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex justify-start min-h-[24px]">
            {isSignIn && (
              <button type="button" className="text-[13px] font-semibold text-[#0066ff] hover:text-[#0055cc] transition-colors mt-1 px-1">
                Forgot password?
              </button>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0055cc] text-white font-semibold py-3.5 rounded-full transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-[12px] text-center text-slate-500 mt-8 leading-relaxed max-w-[280px] mx-auto">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-800 transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-slate-800 transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
