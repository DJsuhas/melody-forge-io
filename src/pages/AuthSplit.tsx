import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Music2, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { signInWithEmail, signUpWithEmail, onAuthStateChanged } from "@/lib/firebase";

const AuthSplit = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Monitor auth state
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        // If user is already logged in, redirect to home
        navigate("/home");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!loginForm.email || !loginForm.password) {
        toast.error("Please fill in all fields");
        return;
      }

      const result = await signInWithEmail(loginForm.email, loginForm.password);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.user) {
        toast.success("Welcome back!");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!signupForm.name || !signupForm.email || !signupForm.password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (signupForm.password !== signupForm.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (signupForm.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      if (!signupForm.terms) {
        toast.error("Please accept the terms and conditions");
        return;
      }

      const result = await signUpWithEmail(signupForm.email, signupForm.password);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.user) {
        // Here you might want to update the user's profile with their name
        toast.success("Account created successfully!");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl animate-floatGlow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-primary/30 to-secondary/30 rounded-full blur-3xl animate-floatGlow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />
      </div>

      <div className={`relative w-full max-w-5xl transition-all duration-700 ease-out ${isLogin ? "auth-active" : "auth-inactive"}`}>
        <div className="grid md:grid-cols-2 gap-0 glass rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:shadow-glow">
          {/* Login Panel */}
          <div 
            className={`p-8 md:p-12 transition-all duration-700 ease-out relative ${isLogin ? "opacity-100 translate-x-0 scale-100" : "opacity-60 -translate-x-4 scale-95"}`}
            style={{
              backgroundImage: "url('/images/auth-bg.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Enhanced dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75 backdrop-blur-md" />
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-3 mb-8 animate-fadeIn">
                <div className="p-2 rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <Music2 className="h-8 w-8 text-primary" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Voice2Music
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-extrabold text-foreground">Welcome back</h2>
                <p className="text-muted-foreground text-lg">Sign in to continue your musical journey</p>
              </div>

              {/* Social Login Buttons */}
              <div className="grid gap-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 glass border-primary/20 text-primary hover:bg-primary/6 transition-all duration-300"
                  onClick={() => toast.info("Google login coming soon!")}
                >
                  <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 glass border-primary/20 text-primary hover:bg-primary/6 transition-all duration-300"
                  onClick={() => toast.info("Apple login coming soon!")}
                >
                  <img src="/apple.svg" alt="Apple" className="w-5 h-5 mr-2" />
                  Continue with Apple
                </Button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/80 backdrop-blur px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium flex items-center">
                    Email
                    <span className="text-xs text-muted-foreground ml-2">(Required)</span>
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-12 glass border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium flex items-center">
                    Password
                    <span className="text-xs text-muted-foreground ml-2">(Required)</span>
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 glass border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="remember"
                      checked={loginForm.remember}
                      onCheckedChange={(checked) =>
                        setLoginForm({ ...loginForm, remember: checked as boolean })
                      }
                      className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-colors duration-300"
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-300">
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 mt-6 rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300 shadow-glow"
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </>
                    )}
                  </span>
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>

          {/* Signup Panel */}
          <div 
            className={`p-8 md:p-12 transition-all duration-500 relative ${!isLogin ? "opacity-100 translate-x-0" : "opacity-60 translate-x-4"}`}
            style={{
              backgroundImage: "url('/images/auth-bg.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm" />
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Create account</h2>
                <p className="text-muted-foreground">Start your musical journey today</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12 glass border-border/50"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-12 glass border-border/50"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 glass border-border/50"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 glass border-border/50"
                      value={signupForm.confirmPassword}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, confirmPassword: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={signupForm.terms}
                    onCheckedChange={(checked) =>
                      setSignupForm({ ...signupForm, terms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-tight">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button type="submit" className="w-full h-12 glow-effect" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
          <div className="w-1 h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default AuthSplit;
