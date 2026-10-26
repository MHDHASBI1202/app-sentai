import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRiderOutputs, makeRider, RIDER_ROLES } from './rider.js'
import { CLEAN_COSTUME, LIVE_ACTION_REALISM, NATURAL_MOTION } from './promptStyle.js'

const makeFixture = (count) => Array.from({ length: count }, (_, i) => ({
  ...makeRider(i), id: `rider-${i}`, name: `Civilian ${i}`, aura: 0, motif: 'Insect', submotif: `Motif ${i}`,
  body: 'Atletis', coverage: 'Tertutup penuh', gender: 'Pria', age: 25, ethnicity: 'Jepang', hair: 'Pendek', accessory: 'Jam tangan',
}))
const produce = (heroes, mode, sequence, overrides = {}) => buildRiderOutputs({
  heroes, mode, sequence, auras: [['Emerald', '#00ff00', 'green energy']], series: 'Kamen Rider Shift',
  aesthetic: 'Practical cinema', location: 'City', shout: 'Henshin!', suitSystem: 'Armored practical suits', accent: 'Brushed silver',
  chestMode: 'Tanpa logo di dada (Polos)', civilianOutfit: () => 'a complete jacket and trousers', feminineDetail: () => '', motifName: h => h.submotif,
  ...overrides,
})

test('all counts, scene modes and sequence modes generate complete Rider production outputs', () => {
  for (const count of [1, 2, 4, 6, 10]) for (const mode of ['Henshin', 'Finisher']) for (const sequence of ['Solo', 'Bersama']) {
    const heroes = makeFixture(count)
    const outputs = produce(heroes, mode, sequence)
    const scenes = sequence === 'Solo' ? count : 1
    assert.equal(outputs.image.length, 3 + count * 4 + scenes)
    assert.equal(outputs.video.length, scenes + 1)
    assert.equal(outputs.seo.length, 1)
    for (const list of Object.values(outputs)) {
      assert.equal(new Set(list.map(x => x.id)).size, list.length)
      for (const item of list) assert.doesNotMatch(item.text, /undefined|spandex|SIXTH RANGER|same base helmet|only change color/i)
    }
    for (const item of outputs.image) {
      assert.match(item.text, /No text overlays, captions, subtitles/)
      assert.doesNotMatch(item.text, /each labeled|labeled panels|numbered panels|metallic lettering|Shout "/i)
    }
    for (const item of [...outputs.image, ...outputs.video]) {
      assert.ok(item.text.includes(LIVE_ACTION_REALISM))
      if (!/PROP MACRO|EMBLEM/.test(item.kind)) assert.ok(item.text.includes(CLEAN_COSTUME))
      assert.doesNotMatch(item.text, /Practical sparks and colored smoke|drifting smoke|massive.*explosion/i)
    }
    for (const item of outputs.video) assert.ok(item.text.includes(NATURAL_MOTION))
    heroes.forEach(h => {
      const reference = outputs.image.find(x => x.id === `hero-${h.id}`)
      for (const detail of [h.riderRole, h.eyes, h.driver, h.riderFinisher, h.weapon, h.form]) assert.ok(reference.text.includes(detail))
    })
  }
})

test('individual forms, weapons, Drivers and finishers survive solo and group choreography', () => {
  const heroes = makeFixture(2)
  Object.assign(heroes[1], { riderRole: 'Dark Rider', riderName: 'Umbra', form: 'Final Form', riderFinisher: 'Aerial Dive Kick', weapon: 'Wing boots', riderDetail: 'Split horn and single giant shoulder', riderAccent: 'Crimson metallic' })
  for (const sequence of ['Solo', 'Bersama']) {
    const result = produce(heroes, 'Finisher', sequence)
    const text = result.video.map(v => v.text).join('\n')
    for (const value of ['Umbra', 'Dark Rider', 'Final Form', 'Aerial Dive Kick', 'Wing boots', 'Split horn and single giant shoulder', 'Crimson metallic']) assert.ok(text.includes(value))
    assert.ok(text.includes(heroes[0].riderFinisher))
  }
  assert.deepEqual(heroes.slice(0, 2).map(h => h.armor), ['Bio-organic carapace', 'Knight plated armor'])
  assert.equal(RIDER_ROLES[3], 'Fourth Rider')
})

test('series accent inheritance and silent henshin are honored', () => {
  const result = produce(makeFixture(1), 'Henshin', 'Solo', { shout: 'Tanpa teriakan (Hening)', accent: 'Rose gold' })
  const text = result.video[0].text
  assert.match(text, /focused silence/)
  assert.doesNotMatch(text, /Shout|Henshin!|Ikuti aksen seri/)
  assert.match(text, /Rose gold accent finish/)
})

test('image storyboards omit spoken dialogue while videos retain custom henshin shouts', () => {
  for (const sequence of ['Solo', 'Bersama']) {
    const result = produce(makeFixture(2), 'Henshin', sequence, { shout: 'Shift into high gear!' })
    for (const image of result.image) assert.ok(!image.text.includes('Shift into high gear!'))
    assert.ok(result.video.some(video => video.text.includes('Shout "Shift into high gear!"')))
    const emblem = result.image.find(image => image.id === 'rider-logo')
    assert.match(emblem.text, /symbol-only series emblem/)
    assert.match(emblem.text, /without letters or words/)
  }
})
