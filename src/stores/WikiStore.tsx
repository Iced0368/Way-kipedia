import { create } from 'zustand';
import wiki from "wikipedia";

interface DocData {
    title?: string,
    description?: string,
    intro?: string,
    imageURL?: string | null,
    links?: string[],
    redirect?: string,
    isLoading?: boolean,
}

interface ConfigStore {
    lang: string,
    setLang: (arg0: string) => void
}

interface WikiStore {
    title: string,
    titleStack: string[],
    returnToPrev: () => void,
    setIsLoading: (loading: boolean) => void,
    locatePage: (dest: string) => void,
}

const defaultConfigs = {
    lang: 'ko'
}

const useWikiStore = create<WikiStore & ConfigStore & DocData>()((set, get) => ({
    title: "",
    description: "",
    intro: "",
    imageURL: null,
    links: [],
    redirect: "",
    isLoading: false,
    titleStack: [],

    lang: defaultConfigs.lang,

    setLang: (value: string) => set(() => {
        wiki.setLang(value);
        return {lang: value};
    }),

    returnToPrev: () => set(() => ({ title: get().titleStack.pop() })),
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),

    locatePage: async (dest: string) => {
        get().setIsLoading(true);
        
        let title: string = "";
        let description: string = "";
        let imageURL: string | null = "";
        let intro: string = "";
        let links: string[] = [];
        let redirect: string = "";

        console.time();

        wiki.setLang('ko');
        try {
            const page = await wiki.page(dest);

            title = page.title; 
            if (page.title !== dest)
                redirect = dest;
            else
                redirect = "";

            const allPromise = Promise.all([
                page.summary()
                    .then(summary => {
                        description = summary.description || "";
                        imageURL = summary.thumbnail ? summary.thumbnail.source : null;
                    }),
                page.intro()
                    .then(res => intro = res)
                    .catch(error => console.error(error)),

                page.links()
                    .then(res => links = res)
                    .catch(error => console.error(error)),
            ])

            allPromise.then(() => set(() => (
                {
                    title: title,   description: description,
                    intro: intro,   imageURL: imageURL,
                    links: links,   redirect: redirect,
                    isLoading: false,
                }
            )))
        }
        catch(error) {
            get().setIsLoading(false);
            console.error(error);
        }

        console.timeEnd();
    }
}))

export default useWikiStore;