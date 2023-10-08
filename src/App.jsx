import useAudioStore from './sound/audio.store'
import './App.css'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import RagingSea from './sea/RagingSea'
import { Leva } from 'leva'

function App() {

  const [audioPlay, setAudioPlay] = useAudioStore(state => [state.audioPlay, state.setAudioPlay])

  return (
    <div style={{ height: '100%', width: '100%' }}>

      {/* <button onClick={() => { setAudioPlay(!audioPlay) }}>
        {audioPlay ? 'Pause' : 'Play'}
      </button> */}

      <Leva theme={{ sizes: { rootWidth: "340px" } }} />
      <Suspense fallback={'...'}>
        <Canvas style={{ background: "black" }} camera={{ position: [1.0, 1.0, 1.0] }}>

          {/* <Experience /> */}
          <RagingSea />
        </Canvas>
      </Suspense>
    </div >
  )
}

export default App
