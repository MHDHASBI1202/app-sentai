import { useMemo, useState } from 'react'
import { ArrowRight, Check, Clapperboard, Clipboard, Film, Swords, WandSparkles } from 'lucide-react'
import { buildBattleOutputs, MATCHUPS, FIGHT_STYLES, FIGHT_ENDINGS } from './battle.js'

export default function BattlePanel({ catalog, makeFighter, describeFighter, HeroCard, SelectField, OutputCard, initialMatchup = 'rider-sentai' }) {
  const [matchup, setMatchup] = useState(initialMatchup)
  const [fighters, setFighters] = useState(() => [makeFighter(0), makeFighter(1)])
  const [style, setStyle] = useState('martial')
  const [ending, setEnding] = useState('draw')
  const [duration, setDuration] = useState(15)
  const [location, setLocation] = useState(catalog.locations[0])
  const [aesthetic, setAesthetic] = useState('Sinematik Praktikal 35mm')
  const [openFighter, setOpenFighter] = useState(0)
  const [tab, setTab] = useState('image')
  const [copied, setCopied] = useState('')
  const [notice, setNotice] = useState('Atur dua petarung, lalu salin referensi dan prompt duel.')
  const types = MATCHUPS.find(([id]) => id === matchup)[2]
  const update = (index, key, value) => setFighters(current => current.map((hero, i) => i === index ? {
    ...hero, [key]: value, ...(key === 'motif' ? { submotif: catalog.motifs[value]?.[0] || '', sentaiFinisher: (catalog.finishers[value] || catalog.finishers.default)[0] } : {}),
  } : hero))
  const outputs = useMemo(() => buildBattleOutputs({
    fighters: fighters.map((hero, index) => describeFighter(hero, types[index])), matchup, style, ending, duration, location, aesthetic,
  }), [fighters, matchup, style, ending, duration, location, aesthetic, describeFighter])
  const copy = async (text, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text)
      else {
        const helper = document.createElement('textarea')
        helper.value = text
        helper.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
        helper.setAttribute('readonly', '')
        document.body.appendChild(helper)
        helper.select()
        const success = document.execCommand('copy')
        helper.remove()
        if (!success) throw new Error('Clipboard unavailable')
      }
      setCopied(id)
      setTimeout(() => setCopied(''), 2000)
    } catch { setNotice('Clipboard diblokir browser. Salin manual dari kotak prompt.') }
  }
  const options = items => items.map(value => <option key={value} value={value}>{value}</option>)
  return <main className="app-shell battle-workspace">
    <header className="topbar"><a className="brand" href="#battle-top"><Swords size={26} /><span>DUEL <em>FORGE</em></span></a><div className="project-status"><span className="pulse" />Live-action · 1 vs 1</div></header>
    <div className="workspace" id="battle-top">
      <aside className="left-pane">
        <div className="pane-title"><span className="pane-icon"><Swords size={18} /></span><div><p>DUEL CONTROL</p><h1>Pertarungan 1 vs 1</h1></div></div>
        <section className="mode-control">
          <SelectField label="Jenis pertarungan" value={matchup} onChange={setMatchup}>{MATCHUPS.map(([id, label]) => <option value={id} key={id}>{label}</option>)}</SelectField>
          <p className="profile-note">Dua petarung dengan desain terpisah. Gerakan berbobot, kontak terbaca, kamera sinematik, dan kostum tetap bersih.</p>
        </section>
        <section className="settings-grid">
          <SelectField label="Koreografi" value={style} onChange={setStyle}>{FIGHT_STYLES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</SelectField>
          <SelectField label="Hasil pertarungan" value={ending} onChange={setEnding}>{FIGHT_ENDINGS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</SelectField>
          <SelectField label="Durasi pertarungan" value={String(duration)} onChange={value => setDuration(Number(value))}><option value="15">15 detik (1 scene)</option><option value="30">30 detik (2 scene × 15 detik)</option></SelectField>
          <SelectField label="Estetika visual" value={aesthetic} onChange={setAesthetic}>{options(catalog.aesthetics)}</SelectField>
          <SelectField label="Arena pertarungan" value={location} onChange={setLocation}>{options(catalog.locations)}</SelectField>
        </section>
        {fighters.map((hero, index) => {
          const isRider = types[index] === 'rider'
          const seriesKey = isRider ? 'riderSeries' : 'sentaiSeries'
          const seriesModeKey = `${seriesKey}Mode`
          const finisherOptions = [...new Set([hero.sentaiFinisher, ...(catalog.finishers[hero.motif] || catalog.finishers.default)])]
          return <section key={hero.id} className="battle-fighter">
            <div className="section-rule"><span>Petarung {index === 0 ? 'A' : 'B'}</span><small>{isRider ? 'Kamen Rider' : 'Super Sentai'}</small></div>
            <div className="settings-grid">
              <SelectField label={isRider ? 'Seri Rider' : 'Tim Sentai'} value={hero[seriesModeKey] === 'custom' ? 'Kustom' : hero[seriesKey]} onChange={value => {
                if (value === 'Kustom') update(index, seriesModeKey, 'custom')
                else setFighters(current => current.map((fighter, i) => i === index ? { ...fighter, [seriesKey]: value, [seriesModeKey]: 'preset' } : fighter))
              }}>{(isRider ? catalog.riderSeries : catalog.sentaiSeries).map(value => <option key={value} value={value}>{value}{isRider ? ` (${catalog.riderSeriesLabels[value]})` : ''}</option>)}<option value="Kustom">Kustom (Buat sendiri)</option></SelectField>
              {hero[seriesModeKey] === 'custom' && <label className="field"><span>{isRider ? 'Nama seri kustom' : 'Nama tim kustom'}</span><input value={hero[seriesKey]} onChange={e => update(index, seriesKey, e.target.value)} /></label>}
              <SelectField label="Finishing aksen dasar" value={hero.accent} onChange={value => update(index, 'accent', value)}>{options(catalog.accents)}</SelectField>
              {isRider && <SelectField label="Arah desain seri" value={hero.riderSuitSystem} onChange={value => update(index, 'riderSuitSystem', value)}>{options(catalog.riderSuits)}</SelectField>}
              <SelectField label="Penempatan Logo Dada" value={hero.chestEmblemMode} onChange={value => update(index, 'chestEmblemMode', value)}>{options(catalog.chestOptions)}</SelectField>
              {!isRider && <>
                <SelectField label="Sistem kostum Sentai" value={hero.suitSystem} onChange={value => update(index, 'suitSystem', value)}>{options(catalog.sentaiSuits)}</SelectField>
                <SelectField label="Alat henshin pada kostum" value={String(hero.deviceIndex)} onChange={value => update(index, 'deviceIndex', Number(value))}>{catalog.devices.map(([name], i) => <option key={name} value={i}>{name}</option>)}</SelectField>
                <SelectField label="Serangan pamungkas" value={hero.sentaiFinisher} onChange={value => update(index, 'sentaiFinisher', value)}>{options(finisherOptions)}</SelectField>
                <label className="field"><span>Senjata / perlengkapan</span><input value={hero.weapon} onChange={e => update(index, 'weapon', e.target.value)} /></label>
              </>}
            </div>
            <HeroCard hero={hero} index={index} expanded={openFighter === index} onToggle={() => setOpenFighter(openFighter === index ? -1 : index)} onChange={(key, value) => update(index, key, value)} device={catalog.devices[hero.deviceIndex]} unifiedMotif={false} isRider={isRider} />
          </section>
        })}
        <button className="generate-button" onClick={() => { setTab('image'); setNotice('Prompt duel diperbarui. Mulai dari Master Duel Reference untuk menjaga kedua desain konsisten.') }}><span><WandSparkles size={20} /> Buat Prompt Pertarungan</span><ArrowRight size={19} /></button>
        <p className="build-note"><Check size={14} />{notice}</p>
      </aside>
      <section className="right-pane">
        <div className="output-header"><div><div className="eyeline"><Swords size={16} /> Cinematic duel</div><h2>Battle Production Output</h2><p>Referensi dua petarung, storyboard, dan video pertarungan yang saling tersambung.</p></div></div>
        <nav className="output-tabs" aria-label="Output pertarungan">
          <button className={tab === 'image' ? 'selected' : ''} onClick={() => setTab('image')}><Clapperboard size={16} />Prompt Image <span>{outputs.image.length}</span></button>
          <button className={tab === 'video' ? 'selected' : ''} onClick={() => setTab('video')}><Film size={16} />Prompt Video <span>{outputs.video.length}</span></button>
          <button className={tab === 'seo' ? 'selected' : ''} onClick={() => setTab('seo')}>SEO <span>{outputs.seo.length}</span></button>
          <button className="copy-all" onClick={() => copy(outputs[tab].map(item => `${item.title}\n${item.text}`).join('\n\n'), 'all')}><Clipboard size={15} />{copied === 'all' ? 'Semua disalin!' : 'Salin semua'}</button>
        </nav>
        <div className="output-scroll">
          <p className="output-lead"><span className="signal" />{tab === 'image' ? 'Buat Master Duel Reference terlebih dahulu. Referensi civilian dan character sheet mengikuti seluruh pengaturan karakter; adegan pertarungan tetap memakai kostum hero.' : tab === 'video' ? (duration === 15 ? 'Satu scene 15 detik: pembukaan, pertukaran serangan, dan hasil pertarungan.' : 'Dua scene × 15 detik, total 30 detik. Buat Scene 1 dahulu, lalu gunakan frame akhirnya sebagai start frame Scene 2. Hasil pertarungan hanya terjadi di akhir Scene 2.') : 'Metadata mengikuti jenis duel, identitas petarung, dan hasil pertarungan.'}</p>
          {outputs[tab].map(item => <OutputCard key={item.id} item={item} copied={copied} onCopy={copy} />)}
        </div>
      </section>
    </div>
  </main>
}
