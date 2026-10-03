import json
import os
import ssl
import sys
from pathlib import Path

base = Path(__file__).parent
sys.path.insert(0, str(base / 'speech_libs'))
os.environ['HF_HOME'] = str(base / 'speech_models')
os.environ['HF_HUB_DISABLE_XET'] = '1'
import httpx
from huggingface_hub import set_client_factory
set_client_factory(lambda: httpx.Client(verify=ssl.create_default_context(), follow_redirects=True))
from faster_whisper import WhisperModel

model = WhisperModel('tiny', device='cpu', compute_type='int8',
                     download_root=str(base / 'speech_models'), cpu_threads=4)
audio = base / 'Screen_Recording_2026-09-27_102703' / 'audio.wav'
segments, info = model.transcribe(str(audio), vad_filter=True, beam_size=3)
result = {'language': info.language, 'language_probability': info.language_probability,
          'duration_after_vad': info.duration_after_vad,
          'segments': [{'start': s.start, 'end': s.end, 'text': s.text,
                        'avg_logprob': s.avg_logprob, 'no_speech_prob': s.no_speech_prob}
                       for s in segments]}
(audio.parent / 'transcription_check.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
print(json.dumps(result, indent=2))
