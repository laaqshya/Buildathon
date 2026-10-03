import json
import math
import sys
import wave
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / 'video_libs'))
import av
import numpy as np
from PIL import Image, ImageDraw

source = Path(sys.argv[1])
out = Path(__file__).parent / source.stem.replace(' ', '_')
out.mkdir(parents=True, exist_ok=True)
container = av.open(str(source))
metadata = {'file': source.name, 'duration_s': container.duration / av.time_base if container.duration else None,
            'streams': [{'type': s.type, 'codec': s.codec_context.name} for s in container.streams]}
frames = []
next_time = 0.0
for frame in container.decode(video=0):
    t = float(frame.time or 0)
    if t + 0.01 < next_time:
        continue
    im = frame.to_image()
    im.save(out / f'frame_{t:07.2f}.jpg', quality=90)
    thumb = im.copy()
    thumb.thumbnail((640, 360))
    card = Image.new('RGB', (640, 390), 'white')
    card.paste(thumb, (0, 30))
    ImageDraw.Draw(card).text((8, 8), f'{t:.2f} seconds', fill='black')
    frames.append(card)
    next_time = t + 3.0
container.close()
for i in range(0, len(frames), 9):
    batch = frames[i:i+9]
    sheet = Image.new('RGB', (1920, 390 * math.ceil(len(batch) / 3)), '#dddddd')
    for j, card in enumerate(batch):
        sheet.paste(card, ((j % 3) * 640, (j // 3) * 390))
    sheet.save(out / f'contact_{i//9:02}.jpg', quality=92)
container = av.open(str(source))
if container.streams.audio:
    resampler = av.AudioResampler(format='s16', layout='mono', rate=16000)
    samples = []
    for frame in container.decode(audio=0):
        for f in resampler.resample(frame):
            samples.append(f.to_ndarray().flatten())
    for f in resampler.resample(None):
        samples.append(f.to_ndarray().flatten())
    audio = np.concatenate(samples) if samples else np.array([], dtype=np.int16)
    with wave.open(str(out / 'audio.wav'), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(16000)
        w.writeframes(audio.tobytes())
    metadata['audio_rms'] = float(np.sqrt(np.mean(audio.astype(float)**2))) if audio.size else 0
    metadata['audio_seconds'] = len(audio) / 16000
container.close()
metadata['sampled_frames'] = len(frames)
metadata['output_dir'] = str(out)
(out / 'metadata.json').write_text(json.dumps(metadata, indent=2), encoding='utf-8')
print(json.dumps(metadata, indent=2))
