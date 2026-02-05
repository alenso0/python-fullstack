import os
from moviepy import VideoFileClip

def trim_and_compress_gif(input_path, output_path, start_time=0, end_time=2):
    # 1. Load the GIF
    clip = VideoFileClip(input_path)
    
    # 2. Trim (subclipped), Resize (resized), and Set FPS (with_fps)
    # These names are specific to MoviePy v2.x
    final_clip = (clip
                  .subclipped(start_time, end_time)
                  .resized(0.3) 
                  .with_fps(12))
    
    # 3. Write the file 
    # Removed 'program' and 'opt' as they are deprecated/removed in v2
    final_clip.write_gif(output_path)
    
    # Verify the size
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Success! Final size: {size_mb:.2f} MB")

if __name__ == "__main__":
    # Make sure "input.gif" exists in your Day13 folder!
    trim_and_compress_gif("input.gif", "output_trimmed.gif", start_time=0, end_time=2)