import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile, FileBlob } from '@oai/artifact-tool';

const workspaceDir = 'C:/Users/laaqs/Documents/Codex/2026-09-28/i-x20';
const TMP_DIR = path.join(workspaceDir, 'work/ppt_build');
const SKILL_DIR = 'C:/Users/laaqs/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations';
const RUNTIME_PYTHON = 'C:/Users/laaqs/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
process.env.RUNTIME_NODE_MODULES = 'C:/Users/laaqs/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
process.env.RUNTIME_NODE = 'C:/Users/laaqs/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe';
process.env.RUNTIME_PYTHON = RUNTIME_PYTHON;
process.env.RUNTIME_BIN_DIR = 'C:/Users/laaqs/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override';
const FINAL_PPTX = path.join(workspaceDir, 'outputs/Weather_GPT_Abstract_Draft.pptx');
const { resolvePresentationFont, finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, 'container_tools/artifact_tool_utils.mjs')).href);
const family = resolvePresentationFont({ fontFamily: 'Arial' });
const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const C = { bg: '#07131F', title: '#F4F8FC', body: '#CBD9E6', accent: '#6CE2E8', muted: '#9AB1C5' };

function text(slide, content, x, y, w, h, size=28, color=C.body, bold=false) {
  const shape=slide.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  shape.text=content;
  shape.text.style={typeface:family,fontSize:size,color,bold,autoFit:'none',verticalAlignment:'top'};
  return shape;
}
function slide(title, sourceNotes='') {
  const s=presentation.slides.add();
  s.background.fill=C.bg;
  if(title) text(s,title,64,50,1152,80,44,C.title,true);
  s.speakerNotes.textFrame.setText(sourceNotes);
  return s;
}
function page(s,n){text(s,String(n).padStart(2,'0'),1174,666,50,28,19,C.muted);}
async function screenshot(s,relative,position,alt){
  const bytes=await fs.readFile(path.join(workspaceDir,'work',relative));
  s.images.add({blob:new Uint8Array(bytes),contentType:'image/jpeg',position,fit:'contain',alt});
}

let s=slide('', 'Weather GPT project proposal based on five user-supplied screen recordings. The recordings contain reference demos under the names WeatherGPT, Weather Globe, and WeatherEx.ai/Cumulus. They do not verify a single unified implementation. Add team details, institution and problem-statement ID before submitting. No official slide limit or template was available in the recordings.');
text(s,'Weather GPT',64,168,1130,108,76,C.title,true);
text(s,'Conversational weather intelligence',64,304,1100,58,38,C.accent);
text(s,'Abstract submission draft',64,542,1080,42,28,C.body);
text(s,'Interactive maps and forecasts in familiar language',64,593,1080,38,25,C.muted);
page(s,1);

s=slide('Problem statement and objectives', 'This is a proposed problem framing for the Weather GPT abstract, not a quotation from an official organizer brief. Reference inspiration: recording 2026-09-27 103319, country weather panels and forecasts, and recording 2026-09-28 082043, regional-language weather questions.');
text(s,'How can users find local weather and understand a forecast in familiar language?',64,160,1130,135,38,C.title,true);
text(s,'Location access',64,328,420,42,29,C.accent,true);
text(s,'Select a place on a globe or search by name.',510,328,690,70,28);
text(s,'Forecast understanding',64,425,420,42,29,C.accent,true);
text(s,'Explain current conditions and the coming week.',510,425,690,80,28);
text(s,'Everyday planning',64,532,420,42,29,C.accent,true);
text(s,'Answer practical questions about rain, temperature, and travel.',510,532,690,95,28);
page(s,2);

s=slide('Project abstract', 'This abstract describes a proposed system. Source features: WeatherGPT map controls in recordings 2026-09-27 102457 and 102703, country readings and seven-day forecasts in 103319, and multilingual Cumulus conversations in 2026-09-28 082043. No measured accuracy, performance result or implementation completion is claimed.');
text(s,'Weather GPT proposes a weather information platform that combines an interactive globe with a conversational assistant.',64,160,1148,110,31,C.title);
text(s,'Users will select a location, inspect current conditions and a seven-day forecast, and ask questions in natural language. The assistant will use structured weather data to explain rain, temperature, and other conditions in familiar language, including supported regional languages.',64,295,1148,183,29);
text(s,'Selectable weather overlays will provide geographic context. The project aims to make forecasts easier to understand for everyday planning. Explainable heatwave-risk analysis is a possible extension after the core weather workflow is complete.',64,512,1148,132,29);
page(s,3);

s=slide('Interactive globe and weather layers', 'Reference image: user-supplied Screen Recording 2026-09-27 102457.mp4, frame near 21 seconds. Map-style and overlay controls are visible in this reference interface. The weather-layer menu includes temperature, rainfall, temperature anomaly, drought and sea-surface temperature. The recording does not validate live data sources or working results for every menu item.');
await screenshot(s,'Screen_Recording_2026-09-27_102457/frame_0021.00.jpg',{left:64,top:181,width:756,height:421},'Reference WeatherGPT globe and weather-layer controls');
text(s,'Reference demo: WeatherGPT',64,613,756,30,21,C.muted);
text(s,'Globe navigation',866,170,346,42,28,C.accent,true);
text(s,'Rotate and zoom to explore locations.',866,221,346,83,26);
text(s,'Weather overlays',866,332,346,42,28,C.accent,true);
text(s,'Temperature and rainfall, with further layer options.',866,381,346,100,26);
text(s,'Map context',866,510,346,42,28,C.accent,true);
text(s,'Base-map styles and geographic overlays.',866,559,346,86,26);
page(s,4);

s=slide('Location weather and seven-day forecasts', 'Reference image: user-supplied Screen Recording 2026-09-27 103319.mp4, near 30 seconds, India selection. Additional selections include Ukraine, United States of America, Mexico and China. The panel displays current temperature and condition, feels-like temperature, humidity, wind, precipitation, pressure and UV index. The interface attributes live data to Open-Meteo. The recording does not validate API freshness or how country locations map to coordinates. Values in the screenshot are demonstration values, not current forecasts.');
await screenshot(s,'Screen_Recording_2026-09-27_103319/frame_0030.00.jpg',{left:64,top:181,width:756,height:421},'Reference Weather Globe with country weather and seven-day forecast');
text(s,'Reference demo: Weather Globe',64,613,756,30,21,C.muted);
text(s,'Current conditions',866,170,346,42,28,C.accent,true);
text(s,'Temperature, condition, and feels-like temperature.',866,221,346,100,26);
text(s,'Detailed readings',866,352,346,42,28,C.accent,true);
text(s,'Humidity, wind, rain, pressure, and UV index.',866,401,346,100,26);
text(s,'Seven-day outlook',866,531,346,42,28,C.accent,true);
text(s,'Daily conditions and forecast values.',866,580,346,66,26);
page(s,5);

s=slide('Weather conversations in regional languages', 'Reference image: user-supplied Screen Recording 2026-09-28 082043.mp4, near 24 seconds. WeatherEx.ai/Cumulus demonstrates a question typed in Malayalam using Latin characters: "kochiyil nale mazha peyyumo?", meaning approximately "Will it rain in Kochi tomorrow?" The assistant responds in Malayalam script and offers follow-up questions. Forecast, trip-planning, extended-forecast and comparison prompts are visible suggestions, not independently verified response capabilities. Sign-in is demonstrated, but its personal details are excluded from this deck.');
await screenshot(s,'Screen_Recording_2026-09-28_082043/frame_0024.00.jpg',{left:64,top:181,width:756,height:421},'Reference WeatherEx.ai Cumulus chat responding in Malayalam');
text(s,'Reference demo: WeatherEx.ai / Cumulus',64,613,756,30,21,C.muted);
text(s,'Natural-language questions',866,171,346,78,28,C.accent,true);
text(s,'“Will it rain in Kochi tomorrow?”',866,257,346,100,28,C.title);
text(s,'Regional-language support',866,377,346,77,28,C.accent,true);
text(s,'Romanized Malayalam input and a response in Malayalam script.',866,466,346,120,26);
text(s,'Suggested follow-up questions',866,610,346,35,24,C.body);
page(s,6);

s=slide('Proposed system approach', 'Conceptual architecture proposed for Weather GPT, not an architecture verified from the screen recordings. The core data flow uses an external weather-data service and an assistant that retrieves location-specific readings before composing an answer. The reference Weather Globe attributes data to Open-Meteo, but the team must confirm its actual provider, application stack and model before claiming an implementation. Data timestamps and units are proposed requirements.');
const steps=[
 ['1. Location input','Search text or a selected map position identifies the place.'],
 ['2. Weather retrieval','A weather service returns current readings and forecast data.'],
 ['3. Assistant response','The assistant uses the retrieved data to answer in the requested language.'],
 ['4. User interface','The map, forecast panel, and chat present the same location and time context.']
];
for(let i=0;i<steps.length;i++){
 const y=164+i*113;
 text(s,steps[i][0],64,y,365,46,29,C.accent,true);
 text(s,steps[i][1],461,y,750,90,28);
}
text(s,'Responses should show the data source, timestamp, and units.',64,637,1120,32,23,C.muted);
page(s,7);

s=slide('Expected outcomes and project scope', 'Expected outcomes are project objectives, not measured results. The heatwave extension draws inspiration from Screen Recording 2026-09-28 082340.mp4, a concept montage that shows lagged features, a 90th-percentile threshold, Random Forest and SHAP-style explainability. The montage does not establish a trained model, evaluation results or working risk service. For a future heatwave extension, define location-specific criteria and evaluate historical data with separate training and testing periods.');
text(s,'Core deliverable',64,163,530,48,31,C.accent,true);
text(s,'A working location-to-forecast workflow with an interactive map and a weather assistant.',64,226,530,130,29,C.title);
text(s,'Evaluation goals',64,403,530,48,31,C.accent,true);
text(s,'Check data consistency, answer accuracy, language quality, and ease of use.',64,468,530,135,28);
text(s,'Possible extension',685,163,530,48,31,C.accent,true);
text(s,'Heatwave-risk analysis using historical weather features, with explanations of the main contributing factors.',685,226,530,160,29,C.title);
text(s,'Scope boundary',685,431,530,48,31,C.accent,true);
text(s,'Core weather features come first. Risk-model development and evaluation form a later phase.',685,496,530,128,28);
page(s,8);

await fs.mkdir(TMP_DIR,{recursive:true});
await fs.mkdir(path.dirname(FINAL_PPTX),{recursive:true});
const candidatePath=path.join(TMP_DIR,'candidate.pptx');
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
console.log('Candidate exported');
const result=await finalizePresentation({
 workspaceDir,candidatePath,finalPath:FINAL_PPTX,pythonExecutable:RUNTIME_PYTHON,
 integrityValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
 requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],
 fontPolicy:{basis:'design',families:[family]},verifyArtifactToolImport:true,
 receiptPath:path.join(TMP_DIR,'validation.json')
});
console.log(JSON.stringify(result));
const finalized=await PresentationFile.importPptx(await FileBlob.load(FINAL_PPTX));
for(let i=0;i<finalized.slides.items.length;i++){
 const preview=await finalized.export({slide:finalized.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(TMP_DIR,`slide-${i+1}.png`),new Uint8Array(await preview.arrayBuffer()));
}
console.log(`Final file: ${FINAL_PPTX}`);
