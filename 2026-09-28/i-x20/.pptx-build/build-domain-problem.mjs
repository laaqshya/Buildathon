import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import { icons } from "lucide";

const workspaceDir = "C:\\Users\\laaqs\\Documents\\Codex\\2026-09-28\\i-x20";
const SKILL_DIR = "C:\\Users\\laaqs\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.909.12148\\skills\\presentations";
const RUNTIME_PYTHON = "C:\\Users\\laaqs\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const buildDir = path.join(workspaceDir, ".pptx-build");
const outputDir = path.join(workspaceDir, "outputs");
const assetsDir = path.join(workspaceDir, "assets");
const finalPath = path.join(outputDir, "Weather_GPT_Domain_Problem_All_Icons.pptx");
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(assetsDir, { recursive: true });

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const slide = presentation.slides.add();
slide.background.fill = "#FFFFFF";

const C = {
  charcoal: "#292D32",
  blue: "#376A96",
  teal: "#258B88",
  coral: "#C95C57",
  grey: "#666A70",
  light: "#D9DDE1",
  pale: "#F5F7F8",
  white: "#FFFFFF",
};
const FONT = "Arial";

function box(x, y, w, h, fill = "none", lineFill = "none", lineWidth = 0) {
  return slide.shapes.add({
    geometry: "rect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { fill: lineFill, width: lineWidth },
  });
}

function text(x, y, w, h, value, opts = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = {
    typeface: FONT,
    fontSize: opts.size ?? 16,
    bold: opts.bold ?? false,
    color: opts.color ?? C.charcoal,
    alignment: opts.align ?? "left",
    autoFit: "none",
  };
  return shape;
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

function addIconLabel(iconName, label, x, y, color, width = 154) {
  addIcon(iconName, x, y, 22, color, `${label} icon`);
  text(x + 29, y + 1, width - 29, 26, label, { size: 10.2, bold: true, color: C.grey });
}

// Title and domain strip
text(62, 24, 1155, 54, "Domain and Problem Statement", { size: 40, bold: true, color: C.charcoal });
box(62, 81, 1160, 3, C.teal);
text(62, 96, 78, 24, "DOMAIN", { size: 14, bold: true, color: C.teal });
text(145, 94, 1075, 42,
  "Agentic Artificial Intelligence, Conversational AI, Weather Analytics, Geospatial Visualisation, Speech Technology and Hazard-Awareness Systems",
  { size: 17, bold: true, color: C.grey });
box(62, 144, 1160, 1, C.light);

// Main column dividers
box(459, 164, 1, 310, C.light);
box(862, 164, 1, 310, C.light);

// Problem statement column
text(62, 164, 360, 28, "PROBLEM STATEMENT", { size: 19, bold: true, color: C.coral });
box(62, 196, 78, 3, C.coral);
text(62, 210, 373, 250,
  "Weather information is spread across forecast applications, technical dashboards, map services and separate emergency-alert platforms. Users often need to interpret numerical data without receiving a clear explanation of how the conditions affect their location, activity or travel plans. Most applications provide static results and require manual navigation between screens. Weather GPT addresses this gap through an agentic AI assistant that understands user intent, selects trusted weather and alert sources, analyses the retrieved information and presents relevant guidance through text, voice and interactive maps.",
  { size: 13.2, color: C.grey });

// Pain points column
text(483, 164, 340, 28, "PAIN POINTS", { size: 19, bold: true, color: C.teal });
box(483, 196, 58, 3, C.teal);
const pains = [
  ["PanelsTopLeft", "Fragmented information", "Current conditions, forecasts, map layers and emergency alerts often appear in separate applications."],
  ["BrainCog", "Difficult interpretation", "Technical maps, measurements and scientific terms can be difficult for ordinary users to understand."],
  ["PauseCircle", "Static interaction", "Traditional applications show fixed results and provide limited support for follow-up questions."],
  ["Hand", "Limited hands-free access", "Manual navigation makes weather information less convenient while travelling, working or handling urgent situations."],
  ["CircleHelp", "Weak decision support", "Generic forecasts do not explain how weather may affect travel, outdoor work, events or personal safety."],
];
let py = 207;
for (const [iconName, heading, desc] of pains) {
  addIcon(iconName, 483, py + 1, 25, C.teal, `${heading} icon`);
  text(518, py, 324, 18, heading, { size: 13.7, bold: true, color: C.charcoal });
  text(518, py + 18, 324, 35, desc, { size: 10.6, color: C.grey });
  py += 53;
}

// Stakeholders and target users — compact icon groups.
text(886, 164, 325, 26, "STAKEHOLDERS", { size: 18, bold: true, color: C.blue });
box(886, 194, 74, 2, C.blue);
addIconLabel("CloudSun", "Weather agencies", 886, 207, C.blue);
addIconLabel("ShieldAlert", "Disaster authorities", 1049, 207, C.blue);
addIconLabel("Landmark", "Local government", 886, 241, C.blue);
addIconLabel("CodeXml", "Researchers and developers", 1049, 241, C.blue);
addIconLabel("Megaphone", "Community groups", 886, 275, C.blue);
box(886, 326, 325, 1, C.light);
text(886, 344, 325, 26, "TARGET USERS", { size: 18, bold: true, color: C.teal });
box(886, 374, 64, 2, C.teal);
addIconLabel("Users", "General public", 886, 384, C.teal);
addIconLabel("Wheat", "Farmers and outdoor workers", 1049, 384, C.teal);
addIconLabel("Waves", "Coastal communities", 886, 418, C.teal);
addIconLabel("BusFront", "Travellers and commuters", 1049, 418, C.teal);
addIconLabel("Accessibility", "Older and voice-first users", 886, 452, C.teal, 250);

// Key challenges separator and heading
box(62, 492, 1160, 1, C.light);
text(62, 503, 1158, 28, "KEY CHALLENGES", { size: 19, bold: true, color: C.charcoal });

const challenges = [
  ["Database", "RELIABLE DATA\nINTEGRATION", "Weather APIs, geospatial services and official alert feeds may use different formats, update intervals and levels of accuracy.", C.blue],
  ["Bot", "AGENT DECISION\nRELIABILITY", "The agent must select the correct tools, interpret results accurately and avoid generating unsupported weather information.", C.teal],
  ["MapPin", "LOCATION AND TIME\nAMBIGUITY", "Incomplete place names and phrases such as “tomorrow evening” must be resolved before retrieving data.", C.coral],
  ["TriangleAlert", "VERIFIED HAZARD\nINFORMATION", "Heatwave assessments must follow defined thresholds, while tsunami warnings must come from authorised sources.", C.blue],
  ["AudioLines", "VOICE AND RESPONSE\nQUALITY", "Speech recognition and spoken responses must remain understandable across accents, background noise and unstable connectivity.", C.teal],
];
const colX = [62, 302, 542, 782, 1022];
for (let i = 0; i < challenges.length; i++) {
  const [iconName, heading, desc, accent] = challenges[i];
  const x = colX[i];
  if (i > 0) box(x - 13, 546, 1, 137, C.light);
  addIcon(iconName, x, 538, 25, accent, `${heading.replaceAll("\n", " ")} icon`);
  box(x, 565, 40, 2, accent);
  text(x, 574, 210, 38, heading, { size: 13.5, bold: true, color: C.charcoal });
  text(x, 616, 210, 68, desc, { size: 11.5, color: C.grey });
}

// Export draft and preview.
const candidatePath = path.join(buildDir, "domain-problem-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
const preview = await presentation.export({ slide, format: "png", scale: 1.5 });
await fs.writeFile(path.join(buildDir, "domain-problem-preview.png"), new Uint8Array(await preview.arrayBuffer()));
const layout = await slide.export({ format: "layout" });
await fs.writeFile(path.join(buildDir, "domain-problem-layout.json"), await layout.text());

// Validate and finalize.
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const requirements = {
  explicitTotalSlideCount: 1,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
};
const result = await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "12192000,6858000",
    "--validate-heading-fit",
  ],
  requiredNativeTableOwnerSlides: [],
  fontPolicy: { basis: "user_request", families: [FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(buildDir, "Weather_GPT_Domain_Problem_All_Icons.validation.json"),
});
console.log(JSON.stringify({ finalPath, previewPath: path.join(buildDir, "domain-problem-preview.png"), result }, null, 2));
