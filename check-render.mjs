import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'
import assert from 'node:assert/strict'
import { CLEAN_COSTUME, LIVE_ACTION_REALISM } from './src/promptStyle.js'

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
} finally { await server.close() }
