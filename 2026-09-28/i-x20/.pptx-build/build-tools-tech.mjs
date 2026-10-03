import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import { icons } from "lucide";

const workspaceDir = "C:\\Users\\laaqs\\Documents\\Codex\\2026-09-28\\i-x20";
const SKILL_DIR = "C:\\Users\\laaqs\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.909.12148\\skills\\presentations";
const RUNTIME_PYTHON = "C:\\Users\\laaqs\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const buildDir = path.join(workspaceDir, ".pptx-build", "tools-tech");
const outputDir = path.join(workspaceDir, "outputs");
const finalPath = path.join(outputDir, "Weather_GPT_Tools_and_Technologies_Required-v2.pptx");
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const slide = presentation.slides.add();
slide.background.fill = "#FFFFFF";

const C = {
  charcoal: "#292D32",
  grey: "#666A70",
  light: "#D9DDE1",
  pale: "#F7F7F8",
  purple: "#8F79C6",
  deepPurple: "#6B4FB1",
  blue: "#376A96",
  teal: "#258B88",
  coral: "#C95C57",
  green: "#578B68",
  white: "#FFFFFF",
};
const BODY_FONT = "Arial";
const TITLE_FONT = "Georgia";

function shape(geometry, x, y, w, h, fill = "none", lineFill = "none", lineWidth = 0) {
  return slide.shapes.add({
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { fill: lineFill, width: lineWidth },
  });
}

function text(x, y, w, h, value, opts = {}) {
  const item = shape("textbox", x, y, w, h);
  item.text = value;
  item.text.style = {
    typeface: opts.typeface ?? BODY_FONT,
    fontSize: opts.size ?? 16,
    bold: opts.bold ?? false,
    color: opts.color ?? C.charcoal,
    alignment: opts.align ?? "left",
    verticalAlignment: opts.valign ?? "top",
    autoFit: "none",
  };
  return item;
}

function iconBytes(iconName, color) {
  const nodes = icons[iconName];
  if (!nodes) throw new Error(`Unknown Lucide icon: ${iconName}`);
  const body = nodes.map(([tag, attrs]) => {
    const attributes = Object.entries(attrs)
      .map(([key, value]) => `${key}="${String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`)
      .join(" ");
    return `<${tag} ${attributes}/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  return new Uint8Array(Buffer.from(svg));
}

function addIcon(iconName, x, y, size, color, alt) {
  slide.images.add({
    blob: iconBytes(iconName, color),
    contentType: "image/svg+xml",
    alt,
    fit: "contain",
    position: { left: x, top: y, width: size, height: size },
  });
}

function technologyBlock({ x, y, heading, items, icon, accent }) {
  shape("roundRect", x, y, 395, 130, C.pale, C.light, 1);
  shape("rect", x, y, 6, 130, accent);
  addIcon(icon, x + 22, y + 19, 31, accent, `${heading} icon`);
  text(x + 66, y + 17, 300, 26, heading, { size: 16.5, bold: true, color: accent });
  text(x + 22, y + 53, 340, 68, items.join("\n"), { size: 13.2, color: C.grey });
}

// Template header and footer.
shape("ellipse", 11, 12, 53, 53, C.purple);
addIcon("Pin", 25, 25, 27, "#40315F", "Pin symbol");
text(82, 14, 800, 45, "Tools and Technologies Required", { size: 30, bold: true, color: "#111111", typeface: TITLE_FONT });
shape("rect", 0, 76, 1280, 1, C.light);
text(82, 88, 900, 25, "Proposed implementation stack for the Weather GPT prototype", { size: 14.5, color: C.grey });
shape("rect", 0, 700, 1280, 20, C.deepPurple);

// Connector framework behind the technology blocks.
shape("rect", 491, 197, 2, 350, C.light);
shape("rect", 787, 197, 2, 350, C.light);
for (const y of [197, 362, 527]) {
  shape("rect", 460, y, 33, 2, C.light);
  shape("rect", 787, y, 33, 2, C.light);
}
shape("rect", 491, 371, 34, 2, C.light);
shape("rect", 755, 371, 34, 2, C.light);

// Technology groups.
technologyBlock({
  x: 65, y: 132, heading: "FRONTEND INTERFACE", icon: "MonitorSmartphone", accent: C.blue,
  items: ["React and TypeScript", "HTML5, CSS3 and responsive design", "Accessible chat and forecast interface"],
});
technologyBlock({
  x: 65, y: 297, heading: "MAPS AND GEOSPATIAL", icon: "Globe2", accent: C.teal,
  items: ["CesiumJS interactive 3D globe", "Map tiles and weather overlays", "Geocoding and location search"],
});
technologyBlock({
  x: 65, y: 462, heading: "SPEECH AND LANGUAGE", icon: "AudioLines", accent: C.deepPurple,
  items: ["Speech-to-text and text-to-speech", "Voice-command processing", "Language detection and translation"],
});

technologyBlock({
  x: 820, y: 132, heading: "AGENTIC AI", icon: "Bot", accent: C.deepPurple,
  items: ["Tool-calling language model", "Agent planning and orchestration", "Prompt guardrails and data verification"],
});
technologyBlock({
  x: 820, y: 297, heading: "BACKEND AND APIs", icon: "ServerCog", accent: C.coral,
  items: ["Python and FastAPI", "REST APIs and WebSocket communication", "Pydantic data validation"],
});
technologyBlock({
  x: 820, y: 462, heading: "DATA AND DEPLOYMENT", icon: "DatabaseZap", accent: C.green,
  items: ["Open-Meteo and official warning feeds", "PostgreSQL and Redis cache", "Docker, GitHub and cloud monitoring"],
});

// Central platform node.
shape("ellipse", 525, 268, 230, 210, C.purple, C.deepPurple, 2);
addIcon("CloudSun", 617, 300, 45, C.white, "Weather GPT platform icon");
text(558, 343, 164, 62, "WEATHER\nGPT", { size: 22, bold: true, color: C.white, align: "center" });
text(562, 417, 156, 36, "Agentic weather platform", { size: 12.5, color: C.white, align: "center" });

// Footnote line inside the slide canvas.
shape("rect", 65, 626, 1150, 1, C.light);
text(65, 640, 1150, 31, "The stack combines the interactive weather interface, agent orchestration, verified data sources and voice access.", { size: 13, color: C.grey, align: "center" });

slide.speakerNotes.textFrame.setText(
  "Proposed implementation stack for Weather GPT. Open-Meteo appears as a reference data provider in the supplied Weather Globe recording. Other technologies are proposed choices and should be updated if the team selects different frameworks or hosting services."
);

const candidatePath = path.join(buildDir, "tools-tech-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
const preview = await presentation.export({ slide, format: "png", scale: 1.5 });
await fs.writeFile(path.join(buildDir, "tools-tech-preview.png"), new Uint8Array(await preview.arrayBuffer()));
const layout = await slide.export({ format: "layout" });
await fs.writeFile(path.join(buildDir, "tools-tech-layout.json"), await layout.text());

const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 1,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: [BODY_FONT, TITLE_FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(buildDir, "Weather_GPT_Tools_and_Technologies_Required-v2.validation.json"),
});

console.log(JSON.stringify({ finalPath, previewPath: path.join(buildDir, "tools-tech-preview.png"), result }, null, 2));
