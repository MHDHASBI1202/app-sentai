import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'
import assert from 'node:assert/strict'
import { CLEAN_COSTUME, LIVE_ACTION_REALISM } from './src/promptStyle.js'
import { MATCHUPS } from './src/battle.js'

const server = await createServer({ server: { middlewareMode: true } })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToString(React.createElement(App))
  assert.ok(html.includes('Super Sentai'))
  assert.ok(html.includes('Kamen Rider'))
  assert.ok(html.includes('Master Team Reference'))
  assert.ok(html.includes('Sixth Ranger'))
  console.log('Default Sentai render and category selector: OK')
  const riderHtml = renderToString(React.createElement(App, { initialCategory: 'rider' }))
  for (const detail of ['Main Rider', 'Secondary Rider', 'Third Rider', 'Fourth Rider', 'Master Rider Reference', 'Driver pribadi', 'Finisher pribadi']) assert.ok(riderHtml.includes(detail), detail)
  assert.ok(!riderHtml.includes('Gaya sixth ranger'))
  assert.ok(!riderHtml.includes('spandex'))
  assert.ok(riderHtml.includes('Kamen Rider Shift'))
  assert.ok(riderHtml.includes('referensi Drive'))
  assert.ok(!/Asterion|Veyron|Luminary|Nocturne|Solstice/.test(riderHtml))
  console.log('Rider settings, roles and production output render: OK')
  for (const markup of [html, riderHtml]) {
    assert.ok(markup.includes('Fotografi live-action natural'))
    assert.ok(markup.includes('Plaza kota bersih saat siang'))
    const prompts = [...markup.matchAll(/<pre>([\s\S]*?)<\/pre>/g)].map(match => match[1])
    assert.ok(prompts.length > 0)
    for (const prompt of prompts) {
      assert.ok(prompt.includes(LIVE_ACTION_REALISM))
      assert.ok(prompt.includes(CLEAN_COSTUME) || prompt.includes('requested pristine prop or emblem'))
      assert.doesNotMatch(prompt, /massive practical|pyrotechnic|drifting sparks and embers|billowing dense/i)
    }
  }
  console.log('Natural live-action defaults and clean costumes across both image output categories: OK')
  for (const [matchup, label, types] of MATCHUPS) {
    const duelHtml = renderToString(React.createElement(App, { initialWorkspace: 'battle', initialMatchup: matchup }))
    assert.ok(duelHtml.includes('Pertarungan 1 vs 1'))
    assert.ok(duelHtml.includes('Petarung A'))
    assert.ok(duelHtml.includes('Petarung B'))
    assert.ok(duelHtml.includes('Master Duel Reference'))
    assert.ok(duelHtml.includes('Buat Prompt Pertarungan'))
    assert.ok(duelHtml.includes('No text overlays'))
    const battleOutput = duelHtml.slice(duelHtml.indexOf('Battle Production Output'))
    assert.match(battleOutput, /FIGHTER A, initially screen-left/)
    assert.match(battleOutput, /FIGHTER B, initially screen-right/)
    if (types.includes('rider')) assert.match(battleOutput, /Sculpted practical Rider armor/)
    if (types.includes('sentai')) assert.match(battleOutput, /Physical fabric-first Super Sentai suit/)
    assert.doesNotMatch(battleOutput, /undefined|NaN/)
    console.log(`Duel configuration and fighter descriptions render: ${label}: OK`)
  }
} finally { await server.close() }
