import { create } from 'zustand';
import wiki, {  } from "wikipedia";

interface ConfigStore {
    lang: string,
    setLang: (arg0: string) => void
}

interface WikiStore {
    title: string,
    titleStack: string[],
    initStore: () => void,
    movePage: (dest: string, callback?: ()=> void, fallback?: ()=> void) => void,
    moveToPrev: () => void,
    revertTo: (dest: string) => void,
}

const defaultConfigs = {
    lang: 'ko'
}

const useWikiStore = create<WikiStore & ConfigStore>()((set, get) => ({
    title: "",
    titleStack: [],

    lang: defaultConfigs.lang,

    setLang: (value: string) => set(() => {
        wiki.setLang(value);
        return {lang: value};
    }),

    initStore: () => set(() => ({
        title: "",
        titleStack: [],
        lang: defaultConfigs.lang
    })),

    movePage: (dest: string) => set(() => {
        if (get().title) get().titleStack.push(get().title);
        return { title: dest };
    }),
    moveToPrev: () => set(() => ({ title: get().titleStack.pop() })),
    revertTo: (dest: string) => set(() => {
        while (get().titleStack.length > 0) {
            const top = get().titleStack.pop();
            if (top === dest)
                break;
        }
        return { title: dest };
    })
}))

export default useWikiStore;