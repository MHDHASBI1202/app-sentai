import { applyProductionStyle } from './promptStyle.js'

export const MATCHUPS = [
  ['rider-rider', 'Rider vs Rider', ['rider', 'rider']],
  ['sentai-sentai', 'Sentai vs Sentai', ['sentai', 'sentai']],
  ['rider-sentai', 'Rider vs Sentai', ['rider', 'sentai']],
  ['sentai-rider', 'Sentai vs Rider', ['sentai', 'rider']],
]
export const FIGHT_STYLES = [
  ['martial', 'Tangan kosong', 'a short measured straight punch from A, B parries with a forearm, then B returns a low body kick that A blocks before both reset their footing'],
  ['weapons', 'Duel senjata', 'A makes one controlled diagonal weapon strike, B catches it on a guarded parry, then B returns a short counterstrike that A steps back to evade'],
  ['mixed', 'Kombinasi bela diri & senjata', 'A makes one controlled weapon feint, B steps outside the line and checks the attacking wrist, then A releases the pressure and B returns a short guarded body kick'],
]
export const FIGHT_ENDINGS = [['draw', 'Imbang / saling menahan'], ['a', 'Petarung A menang'], ['b', 'Petarung B menang']]
export const NO_IMAGE_TEXT = 'Render only the visual scene. Names, roles and staging notes are context only, never visible artwork. No text overlays, captions, subtitles, nameplates, labels, panel numbers, speech bubbles, lettering or watermarks. Costume emblems are pictorial symbols without words.'

export function buildBattleOutputs({ fighters, matchup, style = 'martial', ending = 'draw', duration = 15, location, aesthetic }) {
  const selected = MATCHUPS.find(([id]) => id === matchup)
  if (!selected || fighters.length !== 2 || new Set(fighters.map(f => f.id)).size !== 2) throw new Error('A duel requires exactly two distinct fighters and a supported matchup.')
  if (fighters.some((fighter, index) => fighter.franchise !== selected[2][index])) throw new Error('Fighter types must match the selected matchup.')
  const fightStyle = FIGHT_STYLES.find(([id]) => id === style)
  if (!fightStyle || !FIGHT_ENDINGS.some(([id]) => id === ending) || ![15, 30].includes(duration)) throw new Error('Unsupported fight settings.')
  const [a, b] = fighters
  const title = `${a.name} vs ${b.name}`
  const roster = `FIGHTER A, initially screen-left: ${a.description}\nFIGHTER B, initially screen-right: ${b.description}`
  const weaponRule = style === 'martial'
    ? 'Both fight empty-handed; any carried weapons remain securely holstered throughout.'
    : `A uses only ${a.weapon}; B uses only ${b.weapon}. Each weapon stays in its owner\'s hands, with correct grip and visible clearance during parries. Choreograph the exchange around these exact prop shapes and reach.`
  const continuity = `DUEL CONTINUITY — exactly two opposing fighters, A and B, never a team or group attack. ${roster}\nPreserve each fighter's face under the helmet, helmet geometry, physical build, colors, suit materials, belt, insignia and equipment independently; no identity swaps, blended armor or duplicate fighters. Rider armor remains individually sculpted; Sentai suits remain fabric-first, following their own selected design. Keep A initially left and B initially right, preserve the action axis and eyelines when they move. Start in complete hero costumes; no henshin or civilian cutaways. ${weaponRule}`
  const mechanics = 'Staged live-action screen combat performed by real stunt actors: readable attack, timed defensive reaction, visible weight transfer, grounded footwork and believable recoil. Joints bend naturally; each fighter recovers balance between beats. The fighters look at one another, maintain credible reach, and make contact only at the demonstrated guard or prop. No interpenetrating bodies or weapons, teleportation, prolonged hovering, impossible flips or simultaneous unrelated attacks. Epic scale comes from composition, tension, performance and sound rather than giant explosions.'
  const finish = ending === 'draw'
    ? 'Both fighters meet in a guarded stalemate, release the pressure and take one short step apart, facing each other in stable ready stances. Neither wins.'
    : `${ending === 'a' ? 'A' : 'B'} wins the exchange with a controlled counter and forces ${ending === 'a' ? 'B' : 'A'} to yield, lowering their guard and taking one step back. The winner holds a grounded ready stance; both remain visible with clean intact costumes.`
  const scene = `${location}; ${aesthetic}. Cinematic live-action action film, natural motivated key light with restrained rim separation, realistic contact shadows, believable costume weight. 35–50mm lens perspective. No blood or costume damage.`
  const cref = `[ATTACH 'MASTER DUEL REFERENCE' AS CHARACTER REFERENCE FOR BOTH FIGHTERS] ${continuity}`
  const item = (id, kind, title, text) => ({ id, kind, title, text })
  const image = [
    item('duel-master', 'IMAGE • DUEL CONTINUITY', `${title} — Master Duel Reference`, `Neutral full-body reference photograph of exactly two opposing heroes, separated with clear silhouettes, A screen-left and B screen-right, three-quarter inward-facing guards, both helmets and boots visible. ${continuity} ${scene} 16:9.`),
    ...fighters.flatMap((fighter, index) => [
      item(`duel-human-${index}`, 'IMAGE • HUMAN FORM', `${index === 0 ? 'A' : 'B'} · ${fighter.name} — Civilian Reference`, `Photograph only this one fictional person, full body, head to toe: ${fighter.civilianDescription}. Preserve the selected hair, complete civilian outfit, accessories, age and physique. This is a separate identity reference, not a frame from the duel. Neutral studio background, natural expression.`),
      item(`duel-fighter-${index}`, 'IMAGE • HERO FORM', `${index === 0 ? 'A' : 'B'} · ${fighter.name} — Fighter Reference`, `[ATTACH 'MASTER DUEL REFERENCE' AS CREF] Photograph only this one fighter, head to toe in a comfortable ready stance: ${fighter.description} Preserve the reference costume exactly. Clean neutral background, gentle studio lighting.`),
      item(`duel-sheet-${index}`, 'IMAGE • CHARACTER SHEET 9:16', `${index === 0 ? 'A' : 'B'} · ${fighter.name} — Character Sheet`, `[ATTACH THIS FIGHTER'S CIVILIAN REFERENCE AND HERO REFERENCE AS CREF] One character shown in two columns, civilian left and complete hero costume right. Five rows, top to bottom: front, three-quarter, side, back, face and helmet close-up. Civilian: ${fighter.civilianDescription}. Hero: ${fighter.description}. Preserve the same underlying human identity across both columns. Clean white studio background, empty gutters, no labels. Aspect ratio 9:16.`),
    ]),
    item('duel-keyframe', 'IMAGE • BATTLE KEYFRAME', `${title} — Cinematic Clash`, `${cref} One readable freeze-frame from the exchange: ${style === 'martial' ? 'A extends one straight punch into B\'s raised forearm guard; B is visibly braced, both bodies separated, elbows and shoulders anatomically aligned' : 'A and B meet in a single guarded weapon parry, each holding their own selected weapon, feet planted with convincing weight transfer'}. Both fighters remain fully readable, slight low-angle medium-wide camera, subtle motion blur only on the moving limb or prop, crisp helmets and costumes. ${mechanics} ${scene} 16:9.`),
  ]
  const sound = 'Sound: grounded footsteps, fabric movement, armor movement and short guarded impact sounds synchronized with visible contact, restrained cinematic bass; no dialogue or subtitles.'
  const bridge = 'Both fighters recover into close guarded positions, maintain eye contact and visibly prepare the next exchange. Neither has won yet; no yielding, victory pose or decisive finish. End on a stable medium-wide continuation frame with the exact stances, spacing and weapon grips clearly visible.'
  const followUp = style === 'martial'
    ? 'B tests the guard with a short feint, A slips a half-step outside and checks the lead arm, B pivots to face A and both recover balance'
    : 'B makes one measured weapon feint, A parries outside the body line, B turns with the pressure and A steps into a controlled counter position'
  const scenePlans = duration === 15 ? [{
    timeline: `0–3s: two-fighter face-off and one measured step into range. 3–11s: ${fightStyle[2]}. 11–15s: ${finish}`,
    beats: `wide face-off; A initiates the attack; B defends; B counters and A reacts; both recover their footing; chosen ending: ${finish}`,
  }] : [{
    timeline: `0–3s: establish the two fighters at credible striking distance. 3–11s: ${fightStyle[2]}. 11–15s: ${bridge}`,
    beats: `wide face-off; A steps into range; A initiates the attack; B defends; B counters and A reacts; ${bridge}`,
  }, {
    timeline: `0–3s: continue directly from the held guard at the end of Scene 1, no reset or new introduction. 3–11s: ${followUp}. 11–15s: ${finish}`,
    beats: `same guarded positions from the end of Scene 1; B initiates the follow-up; A defends; measured counter; contact and recovery; chosen ending: ${finish}`,
  }]
  const video = scenePlans.map((plan, index) => {
    const continuation = index === 1 ? '[ATTACH THE FINAL FRAME OF SCENE 1 AS THE START FRAME OF SCENE 2] Match the exact prior positions, distance, weapon grips, lighting, camera side and costume details. Do not return the fighters to their opening marks. ' : ''
    const label = duration === 15 ? 'Complete Duel (15s)' : `Scene ${index + 1} of 2 (15s) — ${index === 0 ? 'Opening & Exchange' : 'Continuation & Resolution'}`
    image.push(item(`duel-storyboard-${index}`, 'IMAGE • STORYBOARD 3:2', `${title} — Scene ${index + 1} Storyboard`, `${cref} ${continuation} Six equal visual panels in a strict 2-column, 3-row grid, clean empty gutters; read left to right, top to bottom. Visual beats: ${plan.beats}. Preserve positions and designs in every panel. ${mechanics} ${scene} Storyboard aspect ratio 3:2.`))
    return item(`duel-scene-${index}`, 'VIDEO • 1 VS 1 FIGHT', `${title} — ${label}`, `${cref}\n${continuation}${scene}\n${mechanics}\nScene ${index + 1} of ${scenePlans.length}. Timeline, 15s total for this scene${duration === 30 ? `; overall duel time ${index * 15}–${(index + 1) * 15}s of 30s` : ''}: ${plan.timeline} Camera: smooth medium-wide tracking on the same side of the action axis, brief restrained emphasis on guarded contact, no rapid cuts. ${sound} Render exactly 15 seconds, 16:9.`)
  })
  const seo = [item('duel-seo', 'PRODUCTION • SEO', 'Metadata Pertarungan', `Title: ${title}\nMatchup: ${selected[1]}\nDuration: ${duration} seconds total; ${scenePlans.length} scene(s) × 15 seconds.\nDescription: Realistic cinematic one-on-one tokusatsu duel at ${location}. Exactly two fighters, clean physical costumes and grounded stunt choreography.\nEnding: ${ending === 'draw' ? 'Draw' : `${ending.toUpperCase()} wins`}\nKeywords: tokusatsu, live action, 1vs1, cinematic duel, ${fighters.map(f => f.franchise).join(', ')}.`)]
  return applyProductionStyle({ image: image.map(prompt => ({ ...prompt, text: `${prompt.text}\n${NO_IMAGE_TEXT}` })), video, seo })
}
