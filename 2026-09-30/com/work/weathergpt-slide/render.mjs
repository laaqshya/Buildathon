import fs from "node:fs/promises";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
const pptx = "C:\\Users\\laaqs\\Documents\\Codex\\2026-09-30\\com\\outputs\\WeatherGPT_Domain_and_Problem_Statement_v3.pptx";
const deck = await PresentationFile.importPptx(await FileBlob.load(pptx));
const png = await deck.export({ slide: deck.slides.getItem(0), format: "png", scale: 1.5 });
await fs.writeFile("C:\\Users\\laaqs\\Documents\\Codex\\2026-09-30\\com\\work\\weathergpt-slide\\slide-preview.png", new Uint8Array(await png.arrayBuffer()));
