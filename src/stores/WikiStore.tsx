import { create } from 'zustand';
import { Page } from "wikipedia";

interface WikiStore {
    currentTitle: string,

    startPoint: string | null,
    startIntro: string,

    endPoint: string | null,
    endIntro: string,

    titleStack: string[],

    initStore: () => void,
    setWikiGoal: (startPage: Page, endPage: Page) => Promise<void>,
    movePage: (dest: string, callback?: ()=> void, fallback?: ()=> void) => void,
    moveToPrev: () => void,
    revertTo: (dest: string) => void,
}

const useWikiStore = create<WikiStore>()((set, get) => ({
    currentTitle: "",

    startPoint: null,
    startIntro: "",

    endPoint: null,
    endIntro: "",

    titleStack: [],

    initStore: () => set(() => ({
        currentTitle: "",
        titleStack: [],
    })),

    setWikiGoal: async (startPage: Page, endPage: Page) => {
        let [si, ei] = ["", ""];

        await Promise.all([
            startPage.intro()
                .then(res => si = res), 
            endPage.intro()
                .then(res => ei = res), 
        ]);

        set(()=> ({
            startPoint: startPage.title,
            endPoint: endPage.title,
            startIntro: si,
            endIntro: ei,
        }))
    },

    movePage: (dest: string) => set(() => {
        const currentTitle = get().currentTitle;
        if (currentTitle) 
            get().titleStack.push(currentTitle);
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