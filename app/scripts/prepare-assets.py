from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"C:/Users/lucas/Projects/defense-against-dark-arts-test-site/app/public/assets")
ROOT.mkdir(parents=True, exist_ok=True)

sources = {
    "hero.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_152513_f384cea9.png"),
    "hall.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_152616_a7a1d77a.png"),
    "combat.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_152903_1724a836.png"),
    "keeper.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_153121_3625e860.png"),
    "enemy-null-choir.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_153509_2749c4a4.png"),
    "enemy-gloam-hound.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_153612_27a26e26.png"),
    "enemy-crownless.webp": Path(r"C:/Users/lucas/AppData/Local/hermes/cache/images/openai_codex_gpt-image-2-high_20260710_153728_d45ddaf0.png"),
}

for name, source in sources.items():
    image = Image.open(source).convert("RGB")
    max_width = 1600 if image.width >= image.height else 1100
    if image.width > max_width:
        ratio = max_width / image.width
        image = image.resize((max_width, round(image.height * ratio)), Image.Resampling.LANCZOS)
    image.save(ROOT / name, "WEBP", quality=82, method=6)

favicon = Image.new("RGB", (512, 512), "#070a09")
draw = ImageDraw.Draw(favicon)
draw.ellipse((42, 42, 470, 470), outline="#c8ff5a", width=6)
draw.ellipse((94, 94, 418, 418), outline="#313a33", width=3)
font_candidates = [
    r"C:/Windows/Fonts/bodoni.ttf",
    r"C:/Windows/Fonts/georgia.ttf",
]
font_path = next((path for path in font_candidates if Path(path).exists()), None)
font = ImageFont.truetype(font_path, 244) if font_path else ImageFont.load_default()
bbox = draw.textbbox((0, 0), "D", font=font)
x = (512 - (bbox[2] - bbox[0])) / 2 - bbox[0]
y = (512 - (bbox[3] - bbox[1])) / 2 - bbox[1] - 8
draw.text((x, y), "D", fill="#f0f2e9", font=font)
favicon.save(ROOT / "favicon.png", "PNG", optimize=True)

for path in sorted(ROOT.iterdir()):
    print(f"{path.name}\t{path.stat().st_size}")
