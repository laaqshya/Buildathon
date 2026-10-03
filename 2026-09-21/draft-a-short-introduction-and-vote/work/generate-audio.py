import sys
from pathlib import Path
import re
import asyncio
sys.path.insert(0, str(Path(__file__).parent / 'tts-packages'))
import edge_tts

async def main():
    script = Path(__file__).with_name('read-speech.ps1').read_text(encoding='utf-8')
    speech = script.split("$speech = @'", 1)[1].split("'@", 1)[0]
    speech = re.sub(r'<[^>]+>', '\n\n', speech).strip()
    output = Path(__file__).parent.parent / 'outputs' / 'workshop-speech.mp3'
    await edge_tts.Communicate(speech, 'en-IN-PrabhatNeural', rate='-8%').save(str(output))
    print(f'Audio created: {output.stat().st_size} bytes')

asyncio.run(main())
