export const LIVE_ACTION_REALISM = 'Live-action photographic treatment with physical costumes and props on a real set. Any visible person must look like a real human performer: believable facial features, subtle natural skin texture, individual hair strands, normal human proportions and anatomically correct hands. Natural expressions, physically achievable posture and balanced weight; standing poses have convincing foot contact and contact shadows. Soft motivated lighting, accurate skin tones, realistic exposure, restrained color grading and natural lens perspective. Fabric has a fine weave and gentle movement folds; armor has clean painted surfaces with controlled reflections. No illustration, anime, game-engine rendering, waxy skin, beauty-filter smoothing, exaggerated muscles or distorted limbs.'

export const CLEAN_COSTUME = 'COSTUME CONDITION: freshly transformed, immaculate and well-maintained throughout every frame, including the final henshin reveal, action and victory pose. Uniform clean color, intact fabric, spotless helmet, polished intact armor, clean gloves and boots. No dirt, dust deposits, mud, soot, ash, stains, sweat marks, scratches, scuffs, rust, chipped paint, tears, battle damage, aging or weathering on the costume. Natural fabric folds and manufacturing seams are construction details, never dirt or damage.'

export const CONTROLLED_EFFECTS = 'Keep transformation energy subtle and separate from the performer: sparse translucent light trails behind the body, never opaque clouds covering the face or costume. Effects fade completely before the final reveal. Surroundings and the selected visual style affect only the background and lighting, never costume cleanliness or human anatomy.'

export const NATURAL_MOTION = 'Perform one readable action at a time with plausible joint movement, natural acceleration, weight transfer and controlled landings. Keep face, body proportions, costume construction and colors consistent between frames. No rubber-like limbs, floating feet, body morphing or frantic camera motion. Finish on a stable, clearly visible clean hero.'

export function applyProductionStyle(outputs) {
  const style = (items, motion) => items.map(item => {
    const propOnly = /PROP MACRO|LOGO|EMBLEM/.test(item.kind)
    const sceneEffects = motion || /STORYBOARD|ROLL CALL|LINEUP|BATTLE KEYFRAME/.test(item.kind)
    const surface = propOnly ? 'Photograph only the requested pristine prop or emblem, with clean intact surfaces and no dirt, scratches, rust, weathering or extra people.' : CLEAN_COSTUME
    const effects = propOnly ? '' : sceneEffects ? CONTROLLED_EFFECTS : 'Clear reference photography: unobstructed face and costume, neutral expression, comfortable balanced stance, no aura, particles, smoke or atmospheric effects.'
    return { ...item, text: `${item.text}\n${LIVE_ACTION_REALISM}\n${surface}\n${effects}${motion ? `\n${NATURAL_MOTION}` : ''}` }
  })
  return { ...outputs, image: style(outputs.image, false), video: style(outputs.video, true) }
}
