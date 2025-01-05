import { create } from 'zustand';
import { Page } from "wikipedia";

interface WikiStore {
    currentTitle: string,

    startPoint: string | null,
    startDescription: string,

    endPoint: string | null,
    endDescription: string,

    titleStack: string[],

    initStore: () => void,
    setGoals: (startPage: Page, endPage: Page) => void,
    movePage: (dest: string, callback?: ()=> void, fallback?: ()=> void) => void,
    moveToPrev: () => void,
    revertTo: (dest: string) => void,
}

const defaultConfigs = {
    lang: 'ko'
}

const useWikiStore = create<WikiStore>()((set, get) => ({
    currentTitle: "",

    startPoint: null,
    startDescription: "",

    endPoint: null,
    endDescription: "",

    titleStack: [],

    initStore: () => set(() => ({
        title: "",
        titleStack: [],
        lang: defaultConfigs.lang
    })),

    setGoals: async (startPage: Page, endPage: Page) => {
        let [sd, ed] = ["", ""];

        await Promise.all([
            startPage.summary()
                .then(res => sd = res.description), 
            endPage.summary()
                .then(res => ed = res.description), 
        ]);

        set(()=> ({
            startPoint: startPage.title,
            endPoint: endPage.title,
            startDescription: sd,
            endDescription: ed,
        }))
    },

    movePage: (dest: string) => set(() => {
        if (get().currentTitle) get().titleStack.push(get().currentTitle);
        return { currentTitle: dest };
    }),
    moveToPrev: () => set(() => ({ currentTitle: get().titleStack.pop() })),
    revertTo: (dest: string) => set(() => {
        while (get().titleStack.length > 0) {
            const top = get().titleStack.pop();
            if (top === dest)
                break;
        }
        return { currentTitle: dest };
    })
}))

export default useWikiStore;