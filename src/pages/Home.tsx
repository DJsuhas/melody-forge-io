import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Upload, Wand2, Music, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.success("Recording started");
    // TODO: Implement MediaRecorder API
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.info("Recording stopped");
    // TODO: Stop recording and process
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`File uploaded: ${file.name}`);
      // TODO: Process uploaded file
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
            <img
              src="/images/hero-reference.png"
              alt=""
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-floatGlow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-floatGlow" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container-custom relative z-10 text-center space-y-6 py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Music Generation</span>
            </div>

            <h1 className="hero-text max-w-4xl mx-auto">
              Transform Your Voice Into{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Beautiful Music
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Record your melody, hum a tune, or upload audio. Our AI generates professional multi-track
              music instantly.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="glow-effect-strong h-14 px-8 text-lg">
                <Wand2 className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                View Examples
              </Button>
            </div>
          </div>
        </section>

        {/* Recording Interface */}
        <section className="py-20">
          <div className="container-custom">
            <Card className="p-8 md:p-12 glass border-border/50 max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-8">
                <h2 className="text-3xl font-bold">Create Your Music</h2>
                <p className="text-muted-foreground">
                  Record your voice or upload an audio file to get started
                </p>
              </div>

              {/* Waveform Visualization Placeholder */}
              <div className="mb-8 h-32 glass rounded-xl border border-border/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full transition-all"
                      style={{
                        height: isRecording
                          ? `${Math.random() * 100}%`
                          : "20%",
                        opacity: isRecording ? 0.8 : 0.3,
                      }}
                    />
                  ))}
                </div>
                {!isRecording && (
                  <div className="relative z-10 text-muted-foreground">
                    <Music className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Waveform will appear here</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {!isRecording ? (
                  <Button
                    size="lg"
                    onClick={handleStartRecording}
                    className="glow-effect h-14 px-8"
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={handleStopRecording}
                    className="h-14 px-8"
                  >
                    Stop Recording
                  </Button>
                )}

                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="file-upload"
                  />
                  <Button size="lg" variant="outline" className="h-14 px-8" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Audio
                    </label>
                  </Button>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="glow-effect-strong h-14 px-12 text-lg"
                  onClick={() => {
                    toast.success("Generating music...");
                    setTimeout(() => navigate("/result"), 2000);
                  }}
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Music
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gradient-to-b from-background to-card/20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional-grade music generation with AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Music,
                  title: "Multi-Track Generation",
                  description: "Separate melody, chords, bass, and drums tracks",
                },
                {
                  icon: Wand2,
                  title: "AI-Powered",
                  description: "Advanced neural networks for realistic music",
                },
                {
                  icon: Sparkles,
                  title: "Export Options",
                  description: "Download MIDI, MP3, and individual stems",
                },
              ].map((feature, i) => (
                <Card key={i} className="p-6 glass border-border/50 hover:border-primary/50 transition-all">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
