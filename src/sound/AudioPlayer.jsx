import { PositionalAudio } from "@react-three/drei";
import useAudioStore from "./audio.store";
import { useEffect } from "react";

export default function AudioPlayer({ audioRef }) {

    const [audioStart, audioPlay, setAudioPlay] = useAudioStore(state => [state.audioStart, state.audioPlay, state.setAudioPlay])

    useEffect(() => {
        if (!audioRef.current) return;

        console.log(audioPlay)

        if (audioPlay) {
            audioRef.current.play()
            console.log('play')
        } else {
            audioRef.current.pause()
        }
    }, [audioPlay])

    return (
        <PositionalAudio url={'queen.mp3'} ref={audioRef} distance={1}
            onEnded={() => setAudioPlay(false)} />

    )

}
