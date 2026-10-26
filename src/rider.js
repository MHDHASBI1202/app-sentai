export const RIDER_ROLES = ['Main Rider', 'Secondary Rider', 'Third Rider', 'Fourth Rider', 'Fifth Rider', 'Sixth Rider', 'Seventh Rider', 'Eighth Rider', 'Ninth Rider', 'Tenth Rider', 'Extra Rider', 'Dark Rider', 'Movie Rider']
// Short concept names, following the direct thematic naming of existing series.
export const RIDER_NAME_PRESETS = [
  { name: 'Shift', reference: 'Drive', theme: 'kecepatan & mesin' },
  { name: 'Forge', reference: 'Build', theme: 'kreasi & teknologi' },
  { name: 'Rune', reference: 'Wizard', theme: 'sihir & simbol' },
  { name: 'Fang', reference: 'Kiva', theme: 'taring & monster' },
  { name: 'Crest', reference: 'Blade / Saber', theme: 'pedang & lambang ksatria' },
  { name: 'Volt', reference: 'Stronger', theme: 'listrik & tenaga' },
  { name: 'Pulse', reference: 'Hibiki', theme: 'irama & gelombang' },
  { name: 'Byte', reference: 'Ex-Aid / Zero-One', theme: 'digital & sistem' },
  { name: 'Stride', reference: 'Kabuto / Drive', theme: 'gerak & akselerasi' },
  { name: 'Roar', reference: 'Ryuki / Revice', theme: 'naga & kekuatan hewan' },
]
export const RIDER_SERIES = RIDER_NAME_PRESETS.map(({ name }) => `Kamen Rider ${name}`)
export const RIDER_SERIES_LABELS = Object.fromEntries(RIDER_NAME_PRESETS.map(({ name, reference, theme }) => [`Kamen Rider ${name}`, `${theme}; referensi ${reference}`]))
export const RIDER_ARMORS = [
  ['Bio-organic carapace', 'layered insect-like carapace plates, ribbed flexible joints, an articulated chest exoskeleton'],
  ['Knight plated armor', 'angular knight breastplate, raised pauldrons, segmented gauntlets and armored greaves'],
  ['Cybernetic reactor', 'mechanical chest reactor, circuit-lit hard-surface armor, exposed joint actuators'],
  ['Asymmetric dual armor', 'asymmetric split-material chest armor, contrasting shoulder silhouettes and offset forearm plates'],
  ['Tactical reinforced', 'compact ballistic chest plates, reinforced shoulder guards, modular armored boots'],
  ['Mystic relic armor', 'engraved relic plates, sculpted chest sigils, layered ceremonial shoulder armor'],
]
export const RIDER_EYES = ['Compound insect eyes', 'Angular luminous eyes', 'Round retro compound eyes', 'Split asymmetric eyes', 'Crystal faceted eyes']
export const RIDER_FINISHERS = ['Rider Kick', 'Rider Punch', 'Weapon Slash', 'Charged Projectile', 'Aerial Dive Kick']
export const RIDER_DEVICES = [
  ['Core Driver', 'a waist-mounted transformation belt; insert a personal core and rotate its locking ring'],
  ['Card Driver', 'a waist-mounted belt with a card scanner; scan a personal card and pull the side lever'],
  ['Twin-key Driver', 'a waist-mounted belt; insert two keys and turn both outward'],
  ['Relic Driver', 'a waist-mounted belt with a relic socket; seat the personal relic and press its crest'],
  ['Dial Driver', 'a waist-mounted belt; rotate the mechanical dial and press the release trigger'],
]

export function makeRider(index) {
  return {
    riderRole: RIDER_ROLES[index] || 'Extra Rider', riderName: RIDER_NAME_PRESETS[index]?.name || `Extra ${index + 1}`,
    armor: RIDER_ARMORS[index % RIDER_ARMORS.length][0], eyes: RIDER_EYES[index % RIDER_EYES.length],
    driver: RIDER_DEVICES[index % RIDER_DEVICES.length][0], riderAccent: 'Ikuti aksen seri',
    riderFinisher: RIDER_FINISHERS[index % RIDER_FINISHERS.length], weapon: ['Armored boots for kicking', 'Twin energy blades', 'Lance and shield', 'Compact blaster'][index % 4],
    form: 'Base Form', riderDetail: '',
  }
}

export function buildRiderOutputs({ heroes, auras, series, mode, sequence, aesthetic, location, shout, suitSystem, accent, chestMode, civilianOutfit, feminineDetail, motifName }) {
  const clean = (value) => String(value || '').replaceAll('"', '')
  const name = (h) => `Kamen Rider ${clean(h.riderName || h.name)}`
  const personalAccent = (h) => h.riderAccent === 'Ikuti aksen seri' ? accent : h.riderAccent || accent
  const scene = `${location}; ${aesthetic}. Hyperrealistic live-action tokusatsu, practical painted armor and flexible joints, natural anatomy, cinematic lighting, 4k.`
  const driver = (h) => { const d = RIDER_DEVICES.find(([n]) => n === h.driver) || RIDER_DEVICES[0]; return `${d[0]}: ${d[1]}` }
  const lock = (h) => `${name(h)} (${h.riderRole}), civilian identity ${clean(h.name)}, ${h.form}. ${auras[h.aura][0]} primary armor; ${personalAccent(h)} accent finish. ${RIDER_ARMORS.find(([n]) => n === h.armor)?.[1] || RIDER_ARMORS[0][1]}. Helmet: ${h.eyes}, a unique ${motifName(h)} crest, individual jaw guard and antenna geometry. Motif: ${motifName(h)}. ${h.body} build; coverage: ${h.coverage}. ${h.gender.toLowerCase().includes('wanita') ? feminineDetail(h).replaceAll('spandex', 'flexible armored undersuit').replaceAll('minimal armor', 'articulated armor') : ''} Weapon: ${clean(h.weapon)}. ${driver(h)}. Finisher: ${h.riderFinisher}. ${clean(h.riderDetail)}.`
  const bible = `RIDER DESIGN LOCK — ${clean(series)}. Series direction: ${suitSystem}; default accent ${accent}. Each Rider has their own armor architecture, helmet silhouette, eyes, proportions, palette and Driver housing; roles indicate narrative position, not recolors or power ranking. Preserve each Rider's exact personal design across references, storyboards and video. Chest emblem placement: ${chestMode}. Original fictional designs and emblems. `
  const roster = heroes.map(lock).join('\n')
  const cref = `[ATTACH 'MASTER RIDER REFERENCE' AS CREF] ${bible}`
  const item = (id, kind, title, text) => ({ id, kind, title, text })
  const civilian = (h) => `${clean(h.name)}, ${h.age}-year-old ${h.gender}, ${h.ethnicity} heritage, ${h.body} build, ${h.hair}; wearing ${civilianOutfit(h)}, accessory ${h.accessory}`
  const shoutText = shout === 'Tanpa teriakan (Hening)' ? 'Transform in focused silence.' : `Shout "${clean(shout)}".`
  const action = (h, includeSpeech = true) => mode === 'Henshin'
    ? `${civilian(h)}. ${includeSpeech ? shoutText : 'Show the transformation through poses and visual effects only.'} Activate ${driver(h)}. ${auras[h.aura][2]} surrounds the body; articulated ${h.armor} plates assemble from boots to chest, then the ${h.eyes} helmet closes. Finish with an individual combat stance. ${lock(h)}`
    : `${name(h)} activates ${driver(h)}, charges ${auras[h.aura][2]}, and executes ${h.riderFinisher} using ${clean(h.weapon)}. ${h.riderFinisher.includes('Kick') ? 'Leap, extend the armored striking leg, connect with an energy impact, then land in a low stance.' : 'Wind up, release the personal strike, then settle into a victory stance.'} ${lock(h)}`
  const groupAction = (list, includeSpeech = true) => list.map(h => action(h, includeSpeech)).join('\n')
  const image = [
    item('rider-master', 'IMAGE • RIDER CONTINUITY', `${series} — Master Rider Reference`, `Full-body lineup of exactly ${heroes.length} distinct armored Riders, each identifiable by their own armor and separate silhouette. ${bible}\n${roster}\nFront view, boots and Drivers visible. ${scene}`),
    item('rider-lineup', 'IMAGE • RIDER LINEUP', `${series} — Rider Assembly`, `${cref} Cinematic ${heroes.length}-Rider assembly, each in an individual combat stance, staggered composition with separated armor silhouettes.\n${roster}\nPractical sparks and colored smoke. ${scene} 16:9.`),
    item('rider-logo', 'IMAGE • SERIES EMBLEM', `${series} — Emblem / Crest`, `Original fictional symbol-only series emblem, inspired by ${motifName(heroes[0])}. Abstract sculpted geometric crest, ${heroes.map(h => auras[h.aura][0]).join(', ')} accents, black background, centered prop product photo. Purely pictorial design. 4k.`),
    ...heroes.flatMap(h => [
      item(`human-${h.id}`, 'IMAGE • HUMAN FORM', `${h.name} — Civilian Reference`, `Full-body civilian reference: ${civilian(h)}. Holding the personal transformation component for ${driver(h)}. ${scene}`),
      item(`hero-${h.id}`, 'IMAGE • HERO FORM', `${name(h)} — ${h.riderRole}`, `${cref} Full-body armored hero reference, individual battle-ready stance, boots visible. ${lock(h)} ${scene}`),
      item(`sheet-${h.id}`, 'IMAGE • CHARACTER SHEET 9:16', `${name(h)} — Character Sheet`, `${cref} White background, 2 columns (civilian on the left and armored Rider on the right), 5 rows arranged from top to bottom: front, three-quarter, side, back, face / helmet detail. Separate the views with clean empty gutters. Civilian: ${civilian(h)}. Armor: ${lock(h)} Even studio lighting. ${scene} 9:16.`),
      item(`driver-${h.id}`, 'IMAGE • PROP MACRO', `${name(h)} — ${h.driver}`, `Personal transformation prop product photo. ${lock(h)} Focus only on ${driver(h)}, its personal ${motifName(h)} component, ${personalAccent(h)} trim, tactile controls, painted ABS, metal and translucent resin. Dark tabletop, rim light, shallow depth of field, 4k.`),
    ]),
  ]
  const groups = sequence === 'Solo' ? heroes.map(h => [h]) : [heroes]
  const video = []
  groups.forEach((list, i) => {
    const title = list.length === 1 ? name(list[0]) : `${series} — ${list.length} Riders`
    const panels = mode === 'Henshin'
      ? 'Read left to right, top to bottom: civilian stance; close-up of each personal Driver activation; individual energy motif; segmented armor assembles; personal helmet and eyes lock; completed Rider combat stance.'
      : 'Read left to right, top to bottom: armored battle stance; each personal Driver charges; personal aura gathers; wind-up for each personal finisher; distinct finishing strikes impact; landing and victory stance.'
    image.push(item(`rider-story-${i}`, 'IMAGE • STORYBOARD 3:2', `${title} — ${mode} Storyboard`, `${cref} Strict 2 columns × 3 rows, six equal visual panels, thin white gutters. ${panels}\n${groupAction(list, false)}\n${scene} 3:2.`))
    video.push(item(`rider-video-${i}`, 'VIDEO • CINEMATIC PROMPT', `${title} — ${mode}`, `${cref} ${groupAction(list)}\nCamera: close-up Driver trigger, tracking action, low-angle wide final stance. ${scene} Practical VFX, 8s, 16:9.`))
  })
  video.push(item('rider-assembly-video', 'VIDEO • RIDER ASSEMBLY', `${series} — Rider Assembly Sequence`, `${cref} ${roster}\nEach Rider steps into frame and takes a distinct combat stance. Announce individual Rider identities in sequence. Practical sparks and drifting smoke. Camera tracks across each unique helmet and armor, pulls back to show exactly ${heroes.length} Riders. ${scene} 8s, 16:9.`))
  const imageOnlyRule = 'Render only the visual scene. Names, roles and reference instructions are context only and must never appear in the artwork. No text overlays, captions, subtitles, nameplates, labels, panel numbers, speech bubbles, lettering, typography or watermarks. Emblems must be pictorial symbols without letters or words.'
  return { image: image.map(prompt => ({ ...prompt, text: `${prompt.text}\n${imageOnlyRule}` })), video, seo: [item('rider-seo', 'PRODUCTION • SEO', 'Metadata Produksi', `Title: ${series} — ${mode} ${sequence}\nDescription: Original armored Rider concept at ${location}, ${aesthetic}.\nCast: ${heroes.map(h => `${name(h)} (${h.riderRole})`).join(', ')}\nKeywords: kamen rider inspired, tokusatsu, armored hero, transformation driver, ${mode.toLowerCase()}, practical armor, ${heroes.map(motifName).join(', ')}.\nOriginal fictional characters.`)] }
}
