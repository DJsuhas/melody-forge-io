import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Music2, Sparkles, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="hero-text mb-6">About Voice2Music</h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to democratize music creation through the power of AI, making
                professional music production accessible to everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8 glass border-border/50">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower creators, musicians, and enthusiasts worldwide by providing cutting-edge AI
                  tools that transform vocal ideas into fully-produced musical compositions.
                </p>
              </Card>

              <Card className="p-8 glass border-border/50">
                <Sparkles className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  A world where anyone can express their musical ideas without needing years of training
                  or expensive equipment. Music creation for all.
                </p>
              </Card>
            </div>

            <Card className="p-12 glass border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <Music2 className="h-16 w-16 text-primary" />
                <div>
                  <h2 className="text-3xl font-bold">The Technology</h2>
                  <p className="text-muted-foreground">Powered by advanced neural networks</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-4">
                  Voice2Music uses state-of-the-art machine learning models trained on millions of musical
                  compositions. Our AI understands musical theory, harmony, rhythm, and production
                  techniques to generate professional-quality multi-track arrangements.
                </p>

                <p className="text-lg text-muted-foreground mb-4">
                  Whether you're humming a melody, singing lyrics, or just exploring musical ideas, our
                  platform analyzes your input and generates complementary instrumental tracks including
                  melody, chords, bassline, and drums.
                </p>

                <p className="text-lg text-muted-foreground">
                  Each generation is unique and customizable. Export to MIDI for further editing in your
                  DAW, or download high-quality audio stems for immediate use in your projects.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
