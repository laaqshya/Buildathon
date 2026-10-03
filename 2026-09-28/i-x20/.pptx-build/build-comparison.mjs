import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import { icons } from "lucide";

const workspaceDir = "C:\\Users\\laaqs\\Documents\\Codex\\2026-09-28\\i-x20";
const SKILL_DIR = "C:\\Users\\laaqs\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.909.12148\\skills\\presentations";
const RUNTIME_PYTHON = "C:\\Users\\laaqs\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const buildDir = path.join(workspaceDir, ".pptx-build", "comparison");
const outputDir = path.join(workspaceDir, "outputs");
const finalPath = path.join(outputDir, "Weather_GPT_Existing_Solutions_vs_Our_Approach.pptx");
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const slide = presentation.slides.add();
slide.background.fill = "#FFFFFF";

const C = {
  charcoal: "#292D32",
  coral: "#C95C57",
  teal: "#258B88",
  blue: "#376A96",
  grey: "#686C72",
  mid: "#A7ADB3",
  line: "#D9DDE1",
  pale: "#F4F6F7",
  white: "#FFFFFF",
};
const FONT = "Arial";

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
    typeface: FONT,
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
  return new Uint8Array(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`));
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

// Header
text(80, 27, 1120, 47, "Existing Solutions vs Our Approach", { size: 35, bold: true, align: "center" });
text(155, 76, 970, 26, "How Weather GPT improves weather access, interaction and hazard awareness", { size: 15, color: C.grey, align: "center" });
shape("rect", 535, 108, 210, 3, C.teal);

// Group banners
shape("roundRect", 66, 128, 492, 57, C.coral);
shape("roundRect", 722, 128, 492, 57, C.teal);
text(92, 143, 438, 28, "EXISTING WEATHER SOLUTIONS", { size: 18, bold: true, color: C.white, align: "center", valign: "middle" });
text(748, 143, 438, 28, "WEATHER GPT APPROACH", { size: 18, bold: true, color: C.white, align: "center", valign: "middle" });

// Central comparison strip
shape("rect", 587, 116, 106, 553, C.pale, C.line, 1);
shape("ellipse", 605, 119, 70, 70, C.white, C.line, 1.2);
text(606, 132, 68, 40, "VS", { size: 30, bold: true, color: C.charcoal, align: "center", valign: "middle" });

const rows = [
  {
    icon: "Map",
    label: "INTERFACE",
    existing: ["COMPLEX WEATHER INTERFACES", "Technical maps and numerical dashboards make local conditions difficult to interpret."],
    proposed: ["INTERACTIVE WEATHER INTELLIGENCE", "A 3D globe combines live conditions, weather layers and seven-day forecasts."],
  },
  {
    icon: "MessageCircleMore",
    label: "INTERACTION",
    existing: ["STATIC USER EXPERIENCE", "Users navigate fixed screens and receive forecasts with limited follow-up support."],
    proposed: ["AGENTIC CONVERSATION", "The agent understands intent, selects suitable tools and answers follow-up questions."],
  },
  {
    icon: "MicVocal",
    label: "ACCESS",
    existing: ["LIMITED ACCESSIBILITY", "Text-first applications often lack regional-language support and hands-free access."],
    proposed: ["VOICE-BASED ACCESS", "Chat, speech-to-text, text-to-speech and voice commands make interaction easier."],
  },
  {
    icon: "TriangleAlert",
    label: "ALERTS",
    existing: ["FRAGMENTED HAZARD ALERTS", "Heatwave information, tsunami warnings and safety guidance come from separate services."],
    proposed: ["HAZARD-AWARE GUIDANCE", "Weather GPT analyses heatwave risk and integrates official warning and emergency feeds."],
  },
];

const rowTops = [203, 321, 439, 557];
for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const y = rowTops[i];

  // Left and right text pairs.
  text(78, y, 455, 22, row.existing[0], { size: 14.2, bold: true, color: C.coral, align: "right" });
  text(98, y + 27, 435, 47, row.existing[1], { size: 12.2, color: C.grey, align: "right" });
  shape("rect", 421, y + 83, 112, 1, C.line);

  text(747, y, 455, 22, row.proposed[0], { size: 14.2, bold: true, color: C.teal });
  text(747, y + 27, 435, 47, row.proposed[1], { size: 12.2, color: C.grey });
  shape("rect", 747, y + 83, 112, 1, C.line);

  // Central icon and comparison dimension.
  shape("ellipse", 610, y - 2, 60, 60, C.white, C.line, 1);
  addIcon(row.icon, 626, y + 10, 28, C.charcoal, `${row.label} comparison icon`);
  text(594, y + 63, 92, 18, row.label, { size: 9.5, bold: true, color: C.grey, align: "center" });
}

// Bottom finishing strokes from the reference composition.
shape("rect", 66, 687, 492, 3, C.coral);
shape("rect", 722, 687, 492, 3, C.teal);

const candidatePath = path.join(buildDir, "comparison-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
const preview = await presentation.export({ slide, format: "png", scale: 1.5 });
await fs.writeFile(path.join(buildDir, "comparison-preview.png"), new Uint8Array(await preview.arrayBuffer()));
const layout = await slide.export({ format: "layout" });
await fs.writeFile(path.join(buildDir, "comparison-layout.json"), await layout.text());

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
  fontPolicy: { basis: "design", families: [FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(buildDir, "Weather_GPT_Existing_Solutions_vs_Our_Approach.validation.json"),
});

console.log(JSON.stringify({ finalPath, previewPath: path.join(buildDir, "comparison-preview.png"), result }, null, 2));
