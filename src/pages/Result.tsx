import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Play, Pause, Volume2, Music2 } from "lucide-react";
import { toast } from "sonner";

const Result = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumes, setVolumes] = useState({
    melody: 80,
    chords: 70,
    bass: 75,
    drums: 85,
  });

  const tracks = [
    { id: "melody", name: "Melody", color: "from-primary to-primary/60" },
    { id: "chords", name: "Chords", color: "from-secondary to-secondary/60" },
    { id: "bass", name: "Bass", color: "from-purple-500 to-purple-500/60" },
    { id: "drums", name: "Drums", color: "from-orange-500 to-orange-500/60" },
  ];

  const handleDownload = (type: string) => {
    toast.success(`Downloading ${type}...`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Generated Music</h1>
            <p className="text-muted-foreground">Listen, adjust, and download your creation</p>
          </div>

          {/* Main Player Card */}
          <Card className="p-8 glass border-border/50 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                size="lg"
                className="h-16 w-16 rounded-full glow-effect"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>

              <div className="flex-1">
                <div className="h-2 glass rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-primary to-secondary" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0:45</span>
                  <span>2:30</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <Slider defaultValue={[80]} max={100} className="w-24" />
              </div>
            </div>

            {/* Track Controls */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Individual Tracks</h3>
              {tracks.map((track) => (
                <div key={track.id} className="glass rounded-lg p-4 border border-border/30">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center`}>
                      <Music2 className="h-5 w-5 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{track.name}</span>
                        <div className="flex items-center gap-4">
                          <Button size="sm" variant="ghost">
                            Solo
                          </Button>
                          <Button size="sm" variant="ghost">
                            Mute
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          value={[volumes[track.id as keyof typeof volumes]]}
                          onValueChange={(value) =>
                            setVolumes({ ...volumes, [track.id]: value[0] })
                          }
                          max={100}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {volumes[track.id as keyof typeof volumes]}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Download Options */}
          <Card className="p-8 glass border-border/50">
            <h3 className="text-2xl font-bold mb-6">Download Options</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="h-14 justify-start glow-effect"
                onClick={() => handleDownload("Full Mix MP3")}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Full Mix (MP3)
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 justify-start"
                onClick={() => handleDownload("MIDI")}
              >
                <Download className="mr-2 h-5 w-5" />
                Download MIDI
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 justify-start"
                onClick={() => handleDownload("All Stems")}
              >
                <Download className="mr-2 h-5 w-5" />
                Download All Stems (ZIP)
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 justify-start"
                onClick={() => handleDownload("Project File")}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Project File
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Result;
