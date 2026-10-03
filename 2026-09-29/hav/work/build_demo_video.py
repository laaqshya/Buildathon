from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(r"C:\Users\laaqs\Documents\Codex\2026-09-29\hav")
IMAGES = Path(r"C:\Users\laaqs\.codex\generated_images\01a0ede3-1361-7921-add7-2cc134d1e7de")
OUTPUT = ROOT / "outputs" / "cloud-sre-agent-demo.mp4"
SIZE = (1600, 1000)
FPS = 24
FONT = Path(r"C:\Windows\Fonts\segoeuib.ttf")
FONT_REGULAR = Path(r"C:\Windows\Fonts\segoeui.ttf")

SCENES = [
    (
        "exec-41af1381-d559-43b3-93c1-fddaa3f0875c.png",
        "1. Incident detected",
        "The Payment API error rate rises to 18.4%. The agent starts the investigation.",
        (850, 220),
    ),
    (
        "exec-e4f79276-fae7-496b-bc49-33f0c1f0fda3.png",
        "2. Investigate the incident in the selected environment",
        "Production, Staging, and Development can be selected before the investigation runs.",
        (1430, 120),
    ),
    (
        "exec-25fac4a7-360a-4b00-87b1-9d804322a707.png",
        "3. Hindsight recalls similar incidents",
        "The agent retrieves two validated past incidents before proposing a fix.",
        (1420, 255),
    ),
    (
        "exec-d8be6cf2-6ce6-4672-a63f-cd8f7f6060fe.png",
        "4. A proven runbook is recommended",
        "The agent recommends increasing the database connection pool from 20 to 50.",
        (1420, 320),
    ),
    (
        "exec-30772ead-6c16-4ca6-9b1e-2ae82f79b81f.png",
        "5. The outcome becomes reusable memory",
        "After human approval, the resolution is stored to improve the next incident.",
        (350, 935),
    ),
]


def fit(image: Image.Image) -> Image.Image:
    image = image.convert("RGB")
    image.thumbnail(SIZE, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", SIZE, "#f7f9fc")
    x = (SIZE[0] - image.width) // 2
    y = 0
    canvas.paste(image, (x, y))
    return canvas


def render_scene(path: Path, title: str, subtitle: str) -> Image.Image:
    image = fit(Image.open(path))
    draw = ImageDraw.Draw(image)
    band_top = SIZE[1] - 150
    draw.rectangle((0, band_top, SIZE[0], SIZE[1]), fill="#ffffff")
    draw.line((0, band_top, SIZE[0], band_top), fill="#d9e1ee", width=2)
    title_font = ImageFont.truetype(str(FONT), 34)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 23)
    draw.text((65, band_top + 26), title, font=title_font, fill="#102a56")
    draw.text((65, band_top + 76), subtitle, font=subtitle_font, fill="#4b5f7c")
    return image


def draw_cursor(image: Image.Image, point: tuple[int, int], clicked: bool) -> Image.Image:
    """Overlay a simple, high-contrast pointer and a brief click ripple."""
    frame = image.copy()
    draw = ImageDraw.Draw(frame)
    x, y = point
    cursor = [(x, y), (x + 10, y + 30), (x + 17, y + 19), (x + 28, y + 31),
              (x + 34, y + 25), (x + 23, y + 14), (x + 38, y + 13)]
    draw.polygon(cursor, fill="#1d2939", outline="#ffffff", width=3)
    if clicked:
        for radius, color in ((26, "#3b82f6"), (16, "#60a5fa")):
            draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=color, width=3)
    return frame


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with imageio.get_writer(OUTPUT, fps=FPS, codec="libx264", quality=8) as writer:
        for filename, title, subtitle, target in SCENES:
            frame = render_scene(IMAGES / filename, title, subtitle)
            start = (60, 125)
            # Move for 2.5 seconds, hover briefly, then show a click ripple.
            for index in range(FPS * 6):
                progress = min(index / (FPS * 2.5), 1.0)
                point = (
                    round(start[0] + (target[0] - start[0]) * progress),
                    round(start[1] + (target[1] - start[1]) * progress),
                )
                clicked = FPS * 3.3 <= index < FPS * 4.0
                writer.append_data(np.asarray(draw_cursor(frame, point, clicked)))
    print(OUTPUT)


if __name__ == "__main__":
    main()
