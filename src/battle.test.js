import test from 'node:test'
import assert from 'node:assert/strict'
import { buildBattleOutputs, MATCHUPS, FIGHT_STYLES, FIGHT_ENDINGS, NO_IMAGE_TEXT } from './battle.js'
import { CLEAN_COSTUME, LIVE_ACTION_REALISM } from './promptStyle.js'

const fixture = (types) => types.map((franchise, index) => ({
  id: `fighter-${index}`, franchise, name: index ? 'Blue Guardian' : 'Kamen Rider Shift',
  description: index ? 'Blue Guardian, blue fabric suit, bird crest, silver belt.' : 'Kamen Rider Shift, red plated armor, compound eyes, Core Driver.',
  weapon: index ? 'Short staff' : 'Single short sword',
}))
const settings = { location: 'Open city plaza', aesthetic: 'Natural practical cinema' }

test('all duel pairings, styles, outcomes and durations preserve two distinct fighter designs', () => {
  for (const [matchup, , types] of MATCHUPS) for (const [style] of FIGHT_STYLES) for (const [ending] of FIGHT_ENDINGS) for (const duration of [8, 12]) {
    const fighters = fixture(types)
    const outputs = buildBattleOutputs({ ...settings, fighters, matchup, style, ending, duration })
    assert.equal(outputs.image.length, 5)
    assert.equal(outputs.video.length, 4)
    assert.equal(outputs.seo.length, 1)
    for (const list of Object.values(outputs)) assert.equal(new Set(list.map(x => x.id)).size, list.length)
    for (const prompt of [...outputs.image, ...outputs.video]) {
      assert.ok(prompt.text.includes(LIVE_ACTION_REALISM))
      assert.ok(prompt.text.includes(CLEAN_COSTUME))
      assert.doesNotMatch(prompt.text, /undefined|numbered panels|labeled panels|massive explosion/)
    }
    for (const prompt of outputs.image) assert.ok(prompt.text.includes(NO_IMAGE_TEXT))
    for (const prompt of [outputs.image[0], outputs.image[3], outputs.image[4], ...outputs.video]) {
      for (const fighter of fighters) assert.ok(prompt.text.includes(fighter.description))
      assert.match(prompt.text, /exactly two opposing fighters/)
      assert.match(prompt.text, /no identity swaps/)
    }
    const fullVideo = outputs.video[0].text
    assert.match(fullVideo, new RegExp(`Timeline, ${duration}s total`))
    if (ending === 'draw') assert.match(fullVideo, /Neither wins/)
    else assert.match(fullVideo, new RegExp(`${ending.toUpperCase()} wins the exchange`))
    if (style === 'martial') assert.match(fullVideo, /weapons remain securely holstered/)
    else for (const fighter of fighters) assert.ok(fullVideo.includes(fighter.weapon))
    assert.match(outputs.video[2].text, /FINAL FRAME OF CLIP 1/)
    assert.match(outputs.video[3].text, /FINAL FRAME OF CLIP 2/)
    assert.doesNotMatch(outputs.image[4].text, /16:9/)
    assert.match(outputs.image[4].text, /3:2/)
  }
})

test('duels reject missing opponents, duplicate fighters, wrong franchises and invalid settings', () => {
  const base = { ...settings, fighters: fixture(['rider', 'sentai']), matchup: 'rider-sentai' }
  assert.throws(() => buildBattleOutputs({ ...base, fighters: base.fighters.slice(0, 1) }), /exactly two/)
  assert.throws(() => buildBattleOutputs({ ...base, fighters: [base.fighters[0], base.fighters[0]] }), /distinct/)
  assert.throws(() => buildBattleOutputs({ ...base, matchup: 'sentai-sentai' }), /types/)
  assert.throws(() => buildBattleOutputs({ ...base, duration: 60 }), /settings/)
  assert.throws(() => buildBattleOutputs({ ...base, ending: 'unknown' }), /settings/)
})
