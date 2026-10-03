# Weather GPT: features from the five recordings

This report lists what the recordings show. They contain several differently branded reference demos, so their features should inform a Weather GPT proposal rather than imply that one completed project already contains everything.

Audio check: recordings 1, 3, 4, and 5 are effectively silent. Recording 2 contains very low-level sound, but a local speech-detection and transcription pass returned no intelligible speech. The feature analysis below therefore comes from the visible interfaces and interactions.

## 1. Screen Recording 2026-09-27 102457.mp4

Length: about 31 seconds. On-screen name: WeatherGPT.

- Interactive 3D Earth with zoom between globe and detailed satellite views, approximately 0–6 seconds.
- Map-style controls: Satellite, Standard, Terrain, and Night Earth.
- Geographic overlay controls: countries, cities, roads/highways, railways, and airports.
- Visualization controls: condition dots, heatmap field, atmospheric glow, and pulsing markers, visible around 18–21 seconds.
- Weather-layer menu: temperature, rainfall, temperature anomaly, drought, and sea-surface temperature, visible around 21 seconds. Rainfall selection appears around 24 seconds.
- Earth visual controls: atmosphere, day/night cycle, global event points, and condition layer.
- Global-signals dashboard with a temperature headline, trend bars, and summary indicators. The recording does not establish whether these figures come from live measurements.
- Selected-signal panel that invites the user to inspect a condition or event marker for location, category, and estimated severity. A populated marker detail is not demonstrated.
- Location-search field and Earth/UTC clock are visible. Search results are not demonstrated.

The extracted audio is effectively silent: its peak is 1 on a 16-bit scale whose full-scale value is 32,768. There is no usable narration in this recording.

## 2. Screen Recording 2026-09-27 102703.mp4

Length: about 58 seconds. On-screen name: WeatherGPT.

- Switching among globe base-map styles, approximately 0–6 seconds.
- Smooth zoom into a regional satellite map and back to the globe, approximately 9–33 seconds.
- Geographic overlays and Earth-visual settings, approximately 36–51 seconds.
- Switching the selected weather layer from temperature to rainfall, approximately 45–48 seconds.
- The same global-signals dashboard and selected-signal panel as recording 1.

This is mainly a longer demonstration of the navigation and layer controls from recording 1. An unrelated desktop notification is not a Weather GPT feature.

## 3. Screen Recording 2026-09-27 103319.mp4

Length: about 51 seconds. On-screen name: Weather Globe.

- Rotating a textured 3D globe with clouds and an atmospheric effect.
- Hovering over countries to display their names.
- Clicking a country to open a weather-details panel.
- Examples of country selections: Ukraine, United States of America, Mexico, India, and China.
- Current temperature and weather condition with an icon.
- Additional readings: feels-like temperature, humidity, wind speed, precipitation, pressure, and UV index.
- Seven-day forecast with daily weather icons, temperature values, and precipitation amounts.
- Loading feedback while the app fetches weather data.
- A close control for the weather-details panel.
- The interface attributes live data to Open-Meteo. The recording does not independently establish API freshness or geographic sampling accuracy.

The final repost/watch-again overlay belongs to the video player, not the weather application.

## 4. Screen Recording 2026-09-28 082043.mp4

Length: about 63 seconds. On-screen names: WeatherEx.ai and Cumulus.

- Weather maps with colored temperature and precipitation overlays. Switching between those two layers is demonstrated.
- Atmospheric-layer menu: precipitation, temperature, wind, cloud cover, pressure, CAPE, CIN, solar, and humidity.
- Agriculture-layer menu: evapotranspiration, growing degree days, and soil moisture.
- Local weather summary for Mumbai, with temperature, rain, and wind.
- A date/time indicator, model-selector control, Celsius/Fahrenheit controls, and 2D/3D controls are visible. Changing each of these settings is not demonstrated.
- An integrated Cumulus weather-chat interface.
- Sign-in before accessing the personal assistant.
- A weather question about rain in Kochi tomorrow, typed in Malayalam using Latin characters: "kochiyil nale mazha peyyumo?"
- A response in Malayalam script, demonstrating a regional-language interaction.
- Clickable suggested follow-up questions and another response after selecting a suggestion.
- Conversation history, a clear-chat control, and window minimize/close controls.
- Suggested prompt types for forecasts, trip planning, extended forecasts, and comparisons between locations. These prompts are visible examples, not individually verified response capabilities.

## 5. Screen Recording 2026-09-28 082340.mp4

Length: about 12 seconds. This is a heatwave-analysis concept montage.

- Historical/lagged weather features as model inputs.
- A temperature-threshold concept labelled "90th Percentile Threshold."
- A machine-learning stage labelled "Random Forest classifier" for heatwave risk.
- An explainability stage with a SHAP-style feature-contribution view.
- A process connecting analysis, machine learning, explainability, and a dashboard.

Treat these as proposed research features. The montage does not demonstrate a trained model, working prediction service, evaluation results, or reliable numerical charts.

## Recommended scope for the Weather GPT abstract

Core proposal:

1. Search or select a location on an interactive globe/map.
2. Show current weather and a seven-day forecast.
3. Explain weather through a conversational assistant with regional-language support.
4. Offer selectable weather overlays and suggested follow-up questions.

Optional extension:

- Develop and evaluate heatwave-risk prediction with explanations of the main contributing factors.

Use proposal language such as "we propose" or "the system will" until you can verify which parts your team has actually implemented. The recordings do not establish a mandatory PPT template, slide limit, deadline, or submission portal.

## Before submission

- Add your team name, member names, institution, and problem-statement ID to the draft deck.
- Match the organizer's official template and slide limit if supplied separately.
- Confirm which features your team has implemented and which remain planned.
- Verify the actual weather-data provider and model stack used by your project.
- Upload the approved final deck to the organizer's portal and keep the submission acknowledgement.
