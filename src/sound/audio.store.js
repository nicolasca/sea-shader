import create from 'zustand'

const useAudioStore = create((set) => ({
    audioPlay: false,
    setAudioPlay: (value) => set({ audioPlay: value }),
    audioStart: false,
    setAudioStart: (value) => set({ audioStart: value }),
}))

export default useAudioStore