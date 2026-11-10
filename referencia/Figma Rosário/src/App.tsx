import { useEffect, useState } from 'react'

type Screen = 'selection' | 'prayer'
type Mode = 'traditional' | 'luminous'

const mysterySets = {
  traditional: {
    title: 'Mistérios Gozosos',
    subtitle: 'Segunda-feira e sábado',
    mysteries: [
      'A Anunciação do Anjo',
      'A Visitação de Nossa Senhora',
      'O Nascimento de Jesus',
      'A Apresentação no Templo',
      'O Encontro no Templo',
    ],
  },
  luminous: {
    title: 'Mistérios Luminosos',
    subtitle: 'Quinta-feira',
    mysteries: [
      'O Batismo no Jordão',
      'As Bodas de Caná',
      'O Anúncio do Reino',
      'A Transfiguração',
      'A Instituição da Eucaristia',
    ],
  },
}

const paintings = [
  'https://images.unsplash.com/photo-1784292204926-dd2aabc3f4dd?auto=format&fit=crop&w=1080&q=88',
  'https://images.unsplash.com/photo-1762118777899-8864d960ddf7?auto=format&fit=crop&w=1080&q=88',
  'https://images.unsplash.com/photo-1761427172973-c7a726f23c38?auto=format&fit=crop&w=1080&q=88',
  'https://images.unsplash.com/photo-1762118777670-25743b8b6f68?auto=format&fit=crop&w=1080&q=88',
  'https://images.unsplash.com/photo-1783765399301-9f6976cb454e?auto=format&fit=crop&w=1080&q=88',
]

const prayers = {
  ourFather: {
    title: 'Pai Nosso',
    short: 'Pai nosso que estais nos Céus, santificado seja o vosso Nome…',
    full: 'Pai nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
  },
  hailMary: {
    title: 'Ave Maria',
    short: 'Ave Maria, cheia de graça, o Senhor é convosco…',
    full: 'Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.',
  },
  glory: {
    title: 'Glória ao Pai',
    short: 'Glória ao Pai, ao Filho e ao Espírito Santo…',
    full: 'Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.',
  },
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

function RosaryMark({ className = '' }: { className?: string }) {
  const beads = [
    [50, 17],
    [69, 22],
    [82, 36],
    [86, 55],
    [79, 73],
    [65, 84],
    [35, 84],
    [21, 73],
    [14, 55],
    [18, 36],
    [31, 22],
  ]

  return (
    <svg
      className={className}
      viewBox="0 0 100 126"
      role="img"
      aria-label="Terço dourado"
    >
      <path className="mark-thread" d="M50 17C28 15 14 31 14 52c0 23 16 38 36 38s36-15 36-38c0-21-14-37-36-35Z" />
      {beads.map(([cx, cy], index) => (
        <circle className="mark-bead" key={index} cx={cx} cy={cy} r="4.6" />
      ))}
      <path className="mark-thread" d="M50 89v17" />
      <path className="mark-cross" d="M45 105h10v7h8v9h-8v5H45v-5h-8v-9h8Z" />
    </svg>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState<Screen>('selection')
  const [mode, setMode] = useState<Mode>('traditional')
  const [mysteryIndex, setMysteryIndex] = useState(0)
  const [bead, setBead] = useState(1)
  const [phase, setPhase] = useState<'father' | 'decade' | 'glory'>('decade')
  const [expanded, setExpanded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const currentSet = mysterySets[mode]
  const prayer =
    phase === 'father'
      ? prayers.ourFather
      : phase === 'glory'
        ? prayers.glory
        : prayers.hailMary

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2100)
    return () => window.clearTimeout(timer)
  }, [])

  function beginPrayer(index = 0) {
    setMysteryIndex(index)
    setBead(1)
    setPhase('decade')
    setExpanded(false)
    setScreen('prayer')
  }

  function advance() {
    if (transitioning) return
    setExpanded(false)
    setTransitioning(true)

    window.setTimeout(() => {
      if (phase === 'father') {
        setPhase('decade')
        setBead(1)
      } else if (phase === 'decade' && bead < 10) {
        setBead((value) => value + 1)
      } else if (phase === 'decade') {
        setPhase('glory')
      } else if (mysteryIndex < 4) {
        setMysteryIndex((value) => value + 1)
        setPhase('father')
        setBead(1)
      } else {
        setScreen('selection')
      }
      setTransitioning(false)
    }, 220)
  }

  return (
    <main className="app-shell">
      <div className={`mobile-frame ${screen === 'prayer' ? 'is-praying' : ''}`}>
        <div className={`splash-screen ${loading ? 'splash-visible' : 'splash-hidden'}`} aria-hidden={!loading}>
          <div className="splash-halo">
            <RosaryMark className="splash-mark" />
          </div>
          <div className="splash-copy">
            <p>Ora et contempla</p>
            <h1>Rosário<br />Meditativo</h1>
            <span>Preparando seu momento de oração</span>
          </div>
          <div className="splash-loader" aria-label="Carregando">
            <i />
            <i />
            <i />
          </div>
        </div>

        <section
          className={`screen selection-screen ${screen === 'selection' ? 'screen-active' : 'screen-behind'}`}
          aria-hidden={screen !== 'selection'}
        >
          <header className="selection-header">
            <p className="eyebrow">Ora et contempla</p>
            <h1>Rosário<br />Meditativo</h1>
            <p className="intro">Um momento de silêncio, presença e oração.</p>
          </header>

          <div className="segment" aria-label="Modo do rosário">
            <button
              className={mode === 'traditional' ? 'selected' : ''}
              onClick={() => setMode('traditional')}
            >
              Tradicional
            </button>
            <button
              className={mode === 'luminous' ? 'selected' : ''}
              onClick={() => setMode('luminous')}
            >
              Com Luminosos
            </button>
          </div>

          <button className="complete-card" onClick={() => beginPrayer(0)}>
            <span className="cross" aria-hidden="true">✦</span>
            <span>
              <small>Todos os mistérios</small>
              <strong>Rosário completo</strong>
              <em>Cerca de 45 minutos</em>
            </span>
            <ArrowIcon />
          </button>

          <section className="daily">
            <div className="section-label">
              <span>Mistérios do dia</span>
              <span className="rule" />
            </div>
            <div className="daily-heading">
              <div>
                <p>{currentSet.subtitle}</p>
                <h2>{currentSet.title}</h2>
              </div>
              <button onClick={() => beginPrayer(0)}>Rezar este terço</button>
            </div>

            <div className="mystery-list">
              {currentSet.mysteries.map((mystery, index) => (
                <button key={mystery} onClick={() => beginPrayer(index)}>
                  <span className="number">{index + 1}</span>
                  <span className="mystery-name">{mystery}</span>
                  <ArrowIcon />
                </button>
              ))}
            </div>
          </section>

          <footer className="selection-footer">
            <span />
            <p>“Permanecei em mim”</p>
            <span />
          </footer>
        </section>

        <section
          className={`screen prayer-screen ${screen === 'prayer' ? 'screen-active' : 'screen-next'}`}
          aria-hidden={screen !== 'prayer'}
          style={{ '--painting': `url("${paintings[mysteryIndex]}")` } as React.CSSProperties}
        >
          <div className="painting" />
          <div className="painting-vignette" />

          <header className="prayer-top">
            <button
              className="icon-button"
              onClick={() => setScreen('selection')}
              aria-label="Voltar à seleção"
            >
              <BackIcon />
            </button>
            <div>
              <span>{mysteryIndex + 1}º mistério</span>
              <small>{mysteryIndex + 1} de 5</small>
            </div>
            <span className="top-spacer" />
          </header>

          <button
            className="advance-area"
            onClick={advance}
            aria-label="Avançar para a próxima oração"
          >
            <span>Toque para avançar</span>
          </button>

          <div className={`prayer-content ${transitioning ? 'changing' : ''}`}>
            <div className="mystery-caption">
              <span>{currentSet.title}</span>
              <h2>{currentSet.mysteries[mysteryIndex]}</h2>
            </div>

            <button
              className={`prayer-card ${expanded ? 'expanded' : ''}`}
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              <span className="prayer-kicker">
                {phase === 'decade' ? `${bead}ª conta da dezena` : 'Oração'}
              </span>
              <h3>{prayer.title}</h3>
              <p>{expanded ? prayer.full : prayer.short}</p>
              <small>{expanded ? 'Toque para recolher' : 'Toque para ver texto completo'}</small>
            </button>

            <div className="bead-counter" aria-label={`Conta ${bead} de 10`}>
              <div className="beads">
                {Array.from({ length: 10 }, (_, index) => {
                  const number = index + 1
                  return (
                    <span
                      key={number}
                      className={`${number < bead ? 'completed' : ''} ${number === bead ? 'current' : ''}`}
                    />
                  )
                })}
              </div>
              <p>{phase === 'decade' ? `${bead} de 10` : phase === 'father' ? 'Pai Nosso' : 'Glória'}</p>
            </div>
          </div>

          <a
            className="photo-credit"
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            The Met / Unsplash
          </a>
        </section>
      </div>
    </main>
  )
}
