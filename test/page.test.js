import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { JSDOM, VirtualConsole } from 'jsdom'

const html = fs.readFileSync('job_agent.html', 'utf8')
const windows = []
after(() => windows.forEach(w => w.close()))
const open = () => { const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole: new VirtualConsole() }); windows.push(dom.window); return dom.window.document }

test('each tab shows its own panel and hides the others', () => {
  const doc = open()
  const tabs = [...doc.querySelectorAll('.tab')]
  assert.equal(tabs.length, 3)
  for (const tab of tabs) {
    tab.click()
    const id = /switchTab\('(\w+)'/.exec(tab.getAttribute('onclick'))[1]
    const active = [...doc.querySelectorAll('.panel.active')].map(p => p.id)
    assert.deepEqual(active, [`tab-${id}`])
    assert.ok(tab.classList.contains('active'))
    assert.equal(doc.querySelectorAll('.tab.active').length, 1)
  }
})

test('every external link is https and opens without giving the target a handle back', () => {
  const doc = open()
  const links = [...doc.querySelectorAll('a[href]')]
  assert.ok(links.length > 20)
  for (const a of links) {
    assert.match(a.getAttribute('href'), /^https:\/\//, `${a.getAttribute('href')} is https`)
    if (a.target === '_blank') assert.match(a.rel, /noopener/, `${a.href} has rel=noopener`)
  }
})

test('the page is dated, so its job counts are not read as live', () => {
  const doc = open()
  assert.match(doc.querySelector('header p').textContent, /Snapshot from May 2026/)
})
