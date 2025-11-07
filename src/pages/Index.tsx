import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music2, Mic, Wand2, Download, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with image */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
          <img
            src="/images/hero-reference.png"
            alt=""
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>

        {/* Animated glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-floatGlow" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-floatGlow" style={{ animationDelay: "2s" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center space-y-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-4 animate-slideInLeft">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Music Generation Platform</span>
          </div>

          <h1 className="hero-text max-w-5xl mx-auto animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
            The future of music is{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                human + AI
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl -z-10" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slideInRight" style={{ animationDelay: "0.2s" }}>
            Transform your voice into professional multi-track music. Record, generate, and download complete
            compositions in seconds.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6 animate-slideInLeft" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className="glow-effect-strong h-16 px-10 text-lg group"
              onClick={() => navigate("/auth")}
            >
              <Wand2 className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-10 text-lg border-primary/30"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-16">
            {[
              { icon: Mic, title: "Record or Upload", desc: "Voice, humming, or audio files" },
              { icon: Wand2, title: "AI Generation", desc: "Multi-track arrangements instantly" },
              { icon: Download, title: "Export Everything", desc: "MIDI, MP3, and stems" },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border border-border/30 hover:border-primary/50 transition-all animate-slideInLeft"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <feature.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logo in top corner */}
        <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
          <Music2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Voice2Music
          </span>
        </div>

        {/* Auth button in top right */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Login
          </Button>
          <Button className="glow-effect" onClick={() => navigate("/auth")}>
            Sign Up
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
