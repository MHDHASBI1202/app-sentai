import test from 'node:test'
import assert from 'node:assert/strict'
import { buildBattleOutputs, MATCHUPS, FIGHT_STYLES, FIGHT_ENDINGS, NO_IMAGE_TEXT } from './battle.js'
import { CLEAN_COSTUME, LIVE_ACTION_REALISM } from './promptStyle.js'

const fixture = (types) => types.map((franchise, index) => ({
  id: `fighter-${index}`, franchise, name: index ? 'Blue Guardian' : 'Kamen Rider Shift',
  description: index ? 'Blue Guardian, blue fabric suit, bird crest, silver belt.' : 'Kamen Rider Shift, red plated armor, compound eyes, Core Driver.',
  weapon: index ? 'Short staff' : 'Single short sword',
  civilianDescription: index ? 'Sora, long hair, denim jacket and glasses.' : 'Hayate, short hair, techwear and earpiece.',
}))
const settings = { location: 'Open city plaza', aesthetic: 'Natural practical cinema' }

test('all duel pairings, styles, outcomes and durations preserve two distinct fighter designs', () => {
  for (const [matchup, , types] of MATCHUPS) for (const [style] of FIGHT_STYLES) for (const [ending] of FIGHT_ENDINGS) for (const duration of [15, 30]) {
    const fighters = fixture(types)
    const outputs = buildBattleOutputs({ ...settings, fighters, matchup, style, ending, duration })
    assert.equal(outputs.image.length, duration === 15 ? 9 : 10)
    assert.equal(outputs.video.length, duration / 15)
    assert.equal(outputs.seo.length, 1)
    for (const list of Object.values(outputs)) assert.equal(new Set(list.map(x => x.id)).size, list.length)
    for (const prompt of [...outputs.image, ...outputs.video]) {
      assert.ok(prompt.text.includes(LIVE_ACTION_REALISM))
      assert.ok(prompt.text.includes(CLEAN_COSTUME))
      assert.doesNotMatch(prompt.text, /undefined|numbered panels|labeled panels|massive explosion/)
    }
    for (const prompt of outputs.image) assert.ok(prompt.text.includes(NO_IMAGE_TEXT))
    for (const prompt of [...outputs.image.filter(prompt => /duel-master|duel-keyframe|duel-storyboard/.test(prompt.id)), ...outputs.video]) {
      for (const fighter of fighters) assert.ok(prompt.text.includes(fighter.description))
      assert.match(prompt.text, /exactly two opposing fighters/)
      assert.match(prompt.text, /no identity swaps/)
    }
    const fullVideo = outputs.video.at(-1).text
    for (const video of outputs.video) assert.match(video.text, /Timeline, 15s total for this scene/)
    if (ending === 'draw') assert.match(fullVideo, /Neither wins/)
    else assert.match(fullVideo, new RegExp(`${ending.toUpperCase()} wins the exchange`))
    if (style === 'martial') assert.match(fullVideo, /weapons remain securely holstered/)
    else for (const fighter of fighters) assert.ok(fullVideo.includes(fighter.weapon))
    if (duration === 30) {
      assert.match(outputs.video[0].text, /Neither has won yet/)
      assert.doesNotMatch(outputs.video[0].text, /[AB] wins the exchange/)
      assert.match(outputs.video[1].text, /FINAL FRAME OF SCENE 1 AS THE START FRAME OF SCENE 2/)
      assert.match(outputs.video[1].text, /Do not return the fighters to their opening marks/)
      assert.match(outputs.video[1].text, /overall duel time 15–30s of 30s/)
    }
    for (const storyboard of outputs.image.filter(image => image.id.startsWith('duel-storyboard'))) {
      assert.doesNotMatch(storyboard.text, /16:9/)
      assert.match(storyboard.text, /3:2/)
    }
    fighters.forEach((fighter, index) => {
      assert.ok(outputs.image.find(image => image.id === `duel-human-${index}`).text.includes(fighter.civilianDescription))
      const sheet = outputs.image.find(image => image.id === `duel-sheet-${index}`).text
      assert.ok(sheet.includes(fighter.civilianDescription))
      assert.ok(sheet.includes(fighter.description))
    })
  }
})

test('duels reject missing opponents, duplicate fighters, wrong franchises and invalid settings', () => {
  const base = { ...settings, fighters: fixture(['rider', 'sentai']), matchup: 'rider-sentai' }
  assert.throws(() => buildBattleOutputs({ ...base, fighters: base.fighters.slice(0, 1) }), /exactly two/)
  assert.throws(() => buildBattleOutputs({ ...base, fighters: [base.fighters[0], base.fighters[0]] }), /distinct/)
  assert.throws(() => buildBattleOutputs({ ...base, matchup: 'sentai-sentai' }), /types/)
  assert.throws(() => buildBattleOutputs({ ...base, duration: 60 }), /settings/)
  assert.throws(() => buildBattleOutputs({ ...base, duration: 8 }), /settings/)
  assert.throws(() => buildBattleOutputs({ ...base, duration: 12 }), /settings/)
  assert.throws(() => buildBattleOutputs({ ...base, ending: 'unknown' }), /settings/)
})
