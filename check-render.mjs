import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'
import assert from 'node:assert/strict'

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
  console.log('Rider settings, roles and production output render: OK')
} finally { await server.close() }
