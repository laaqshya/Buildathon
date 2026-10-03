$ErrorActionPreference = 'Stop'
$voice = New-Object -ComObject SAPI.SpVoice
$stream = New-Object -ComObject SAPI.SpFileStream
$output = 'C:\Users\laaqs\Documents\Codex\2026-09-21\draft-a-short-introduction-and-vote\outputs\workshop-speech.wav'
$stream.Open($output, 3, $false)
$voice.AudioOutputStream = $stream
$voice.Rate = -1
$speech = @'
<speak>Introduction.<silence msec="700"/>
Good morning, everyone.
On behalf of A W S S B G, I am delighted to welcome our respected Head of Department, esteemed faculty members, our distinguished speaker, and all participants. Thank you for joining us for our DevOps workshop, marking the second event organized by our community. It is a distinct honour and privilege to serve as your host for today's proceedings.
DevOps has become central to modern software engineering. It brings together development, operations, automation, continuous integration and delivery, cloud infrastructure, monitoring, and security to help teams build reliable software faster and at scale. Today's workshop is an excellent opportunity to explore these practices beyond theory and understand their real-world application.
We are honoured to host Mr. Sudheendra Keshavapatnam, a Cloud and DevOps Architect with professional experience at Kantar. Sir, thank you for joining us and for generously sharing your expertise with our student community. We look forward to learning from your insights on cloud technologies, DevOps workflows, automation tools, and industry best practices.
We are also privileged to have with us our respected Sagar Sir, Head of the Departments of C S E, A I M L, I O T, and R A I. Sir, your continued guidance and encouragement inspire us to organize initiatives that connect academic learning with the evolving demands of the technology industry. We sincerely thank you for your support.
Before we begin the technical session, it is my honour to invite Sagar Sir to share his opening remarks and address the gathering.
May I request everyone to welcome Sagar Sir with a warm round of applause.
<silence msec="3000"/>Vote of thanks.<silence msec="700"/>
As we conclude today's DevOps workshop, it is my honour to propose the vote of thanks on behalf of A W S S B G.
We express our heartfelt gratitude to our speaker, Mr. Sudheendra Keshavapatnam, for his valuable time and for sharing his knowledge and professional insights. Sir, we sincerely appreciate your contribution to making this session an enriching learning experience.
We extend our sincere thanks to our respected Sagar Sir, H O D of C S E, A I M L, I O T, and R A I, for his opening remarks, guidance, and continued encouragement.
Our appreciation also goes to the faculty coordinators and the A W S S B G organizing team for their dedication and efforts in bringing this workshop together.
Finally, we thank all participants for their presence, enthusiasm, and involvement in making A W S S B G's second event a success.
Thank you, everyone.</speak>
'@
try { $voice.Speak($speech, 8) | Out-Null } finally { $stream.Close() }
Get-Item -LiteralPath $output | Select-Object Length
