// API client for backend communication
// MongoDB integration placeholder

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export interface GenerateAudioOptions {
  genre?: string;
  tempo?: number;
  mood?: string;
}

export interface GenerateResponse {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  estimatedTime?: number;
}

export interface JobResult {
  jobId: string;
  status: string;
  tracks?: {
    melody: string;
    chords: string;
    bass: string;
    drums: string;
  };
  midi?: string;
  mp3?: string;
  error?: string;
}

export interface TrackMetadata {
  userId: string;
  title: string;
  genre?: string;
  duration?: number;
  createdAt: Date;
}

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async postGenerateAudio(
    audioBlob: Blob,
    options: GenerateAudioOptions = {}
  ): Promise<GenerateResponse> {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("options", JSON.stringify(options));

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to generate audio");
    }

    return await response.json();
  }

  async getResult(jobId: string): Promise<JobResult> {
    return this.request(`/result/${jobId}`);
  }

  async saveUserTrack(metadata: TrackMetadata): Promise<{ id: string }> {
    return this.request("/tracks", {
      method: "POST",
      body: JSON.stringify(metadata),
    });
  }

  async getUserTracks(userId: string): Promise<TrackMetadata[]> {
    return this.request(`/tracks/user/${userId}`);
  }

  // Poll for job completion
  async pollResult(jobId: string, onProgress?: (status: string) => void): Promise<JobResult> {
    const maxAttempts = 60;
    const pollInterval = 2000; // 2 seconds

    for (let i = 0; i < maxAttempts; i++) {
      const result = await this.getResult(jobId);
      
      if (onProgress) {
        onProgress(result.status);
      }

      if (result.status === "completed" || result.status === "failed") {
        return result;
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error("Polling timeout");
  }
}

export const api = new ApiClient();
