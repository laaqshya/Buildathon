import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:\\Users\\laaqs\\Documents\\Codex\\2026-09-30\\com";
const SKILL_DIR = "C:\\Users\\laaqs\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.909.12148\\skills\\presentations";
const TMP_DIR = path.join(workspaceDir, "work", "weathergpt-slide");
const FINAL_PPTX = path.join(workspaceDir, "outputs", "WeatherGPT_Domain_and_Problem_Statement_v3.pptx");
const RUNTIME_PYTHON = "C:\\Users\\laaqs\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const { resolvePresentationFont, finalizePresentation } = await import(pathToFileURL(
  path.join(SKILL_DIR, "container_tools", "artifact_tool_utils.mjs"),
).href);
await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const font = resolvePresentationFont({ fontFamily: "Aptos" });
const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const slide = deck.slides.add();
slide.background.fill = "#F8FBFF";

function box(text, left, top, width, height, style = {}) {
  const s = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  s.text = text;
  s.text.style = {
    typeface: font,
    fontSize: 18,
    color: "#26364A",
    autoFit: "shrinkText",
    ...style,
  };
  return s;
}

function hex({ left, top, size, color, number, title, body }) {
  const outer = slide.shapes.add({
    geometry: "hexagon",
    position: { left, top, width: size, height: size * 0.88 },
    fill: color,
    line: { fill: color, width: 1 },
  });
  outer.text = title;
  outer.text.style = {
    typeface: font, fontSize: 17, bold: true, color: "#FFFFFF",
    alignment: "center", verticalAlignment: "middle", autoFit: "shrinkText",
  };
  const badge = slide.shapes.add({
    geometry: "ellipse",
    position: { left: left + size * 0.32, top: top - 19, width: 54, height: 54 },
    fill: "#FFFFFF",
    line: { fill: color, width: 2 },
  });
  badge.text = number;
  badge.text.style = {
    typeface: font, fontSize: 18, bold: true, color,
    alignment: "center", verticalAlignment: "middle", autoFit: "shrinkText",
  };
  box(body, left + size + 20, top + 4, 192, 88, {
    fontSize: 15, color: "#42566D", alignment: "left", verticalAlignment: "middle",
  });
  return outer;
}

// Header
box("WeatherGPT", 76, 49, 180, 32, { fontSize: 18, bold: true, color: "#0A7ED5" });
box("Domain and Problem Statement", 76, 87, 800, 57, { fontSize: 37, bold: true, color: "#172C45" });
box("Weather intelligence for clearer, context-aware decisions", 78, 148, 640, 30, { fontSize: 18, color: "#60778D" });
slide.shapes.add({
  geometry: "line", position: { left: 78, top: 193, width: 1124, height: 0 },
  line: { fill: "#D9E7F4", width: 1 }, fill: "none",
});

// Domain label on the left
box("DOMAIN", 83, 258, 150, 24, { fontSize: 13, bold: true, color: "#0A7ED5" });
box("Weather\nIntelligence", 82, 290, 175, 96, { fontSize: 26, bold: true, color: "#172C45" });
box("Users need timely forecasts that translate conditions into practical guidance.", 82, 403, 178, 95, { fontSize: 16, color: "#536B81" });

// Curved visual bridge inspired by the supplied journey reference.
slide.shapes.add({
  geometry: "arc",
  position: { left: 252, top: 248, width: 650, height: 378 },
  fill: "none",
  line: { fill: "#C9EFFF", width: 13 },
});
slide.shapes.add({
  geometry: "arc",
  position: { left: 252, top: 248, width: 650, height: 378 },
  fill: "none",
  line: { fill: "#0CC4E8", width: 8 },
});

// Center problem statement.
const center = slide.shapes.add({
  geometry: "ellipse",
  position: { left: 485, top: 336, width: 210, height: 210 },
  fill: "#E8F2FA",
  line: { fill: "#BFDCEC", width: 1.5 },
});
box("Problem\nStatement", 508, 364, 165, 58, { fontSize: 22, bold: true, color: "#1C3752", alignment: "center", verticalAlignment: "middle" });
box("Weather data often feels scattered, technical, and difficult to act on.", 510, 426, 160, 65, { fontSize: 14, color: "#4A6379", alignment: "center", verticalAlignment: "middle" });

// Three connected problems using the hexagon clarity of the second reference.
hex({ left: 312, top: 259, size: 145, color: "#10BFE3", number: "01", title: "Scattered\nSources", body: "People switch between apps, alerts, and search results." });
hex({ left: 731, top: 290, size: 145, color: "#438CEB", number: "02", title: "Low\nContext", body: "A forecast rarely explains what the weather means for a plan." });
hex({ left: 313, top: 515, size: 145, color: "#7D20E8", number: "03", title: "Delayed\nAction", body: "Users receive weather facts but lack timely next steps." });

// Outcome callout.
const outcome = slide.shapes.add({
  geometry: "roundRect",
  position: { left: 919, top: 414, width: 257, height: 123 },
  fill: "#112F4B",
  line: { fill: "#112F4B", width: 1 },
});
outcome.text = "WeatherGPT\nconverts forecast data into a clear, conversational answer.";
outcome.text.style = { typeface: font, fontSize: 17, bold: true, color: "#FFFFFF", alignment: "center", verticalAlignment: "middle", autoFit: "shrinkText" };
box("AI-powered weather assistant", 942, 559, 215, 25, { fontSize: 14, bold: true, color: "#0A7ED5", alignment: "center" });

slide.speakerNotes.textFrame.setText("Concept slide based on the supplied layout references. WeatherGPT capability statement is an assumed product framing and should be adapted if the project scope differs.");

const candidatePath = path.join(TMP_DIR, "candidate.pptx");
await (await PresentationFile.exportPptx(deck)).save(candidatePath);

const requirements = { explicitTotalSlideCount: 1, requiredNativeTableOwnerSlides: [], requiredNativeChartOwnerSlides: [] };
const result = await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools", "inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools", "inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-bullet-geometry", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: [font] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(TMP_DIR, "WeatherGPT_Domain_and_Problem_Statement_v3.validation.json"),
});
console.log(JSON.stringify({ finalPath: FINAL_PPTX, validation: result }, null, 2));
