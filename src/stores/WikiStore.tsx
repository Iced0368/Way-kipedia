import { create } from 'zustand';

interface WikiState {
    title: string,
    setTitle: (value: string) => void
}

const useWikiStore = create<WikiState>()((set) => ({
    title: '',
    setTitle: (value: string) => set(() => ({title: value})),
}))

export default useWikiStore;