import { create } from 'zustand';
import wiki from 'wikipedia';

interface Configs {
    lang: string,
    setLang: (arg0: string) => void
}

const defaultConfigs = {
    lang: 'ko'
}

const useConfigStore = create<Configs>()((set) => ({
    lang: defaultConfigs.lang,
    setLang: (value: string) => set(() => {
        wiki.setLang(value);
        return {lang: value};
    }),
}))

export default useConfigStore;