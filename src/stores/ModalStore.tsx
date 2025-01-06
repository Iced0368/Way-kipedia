import { create } from "zustand";

interface modalStore {
    loadingVisible: boolean,
    notFoundVisible: boolean,
    setLoadingVisible: (value: boolean) => void,
    setNotFoundVisible: (value: boolean) => void,
}

const useModalStore = create<modalStore>()((set) => ({
    loadingVisible: false,
    notFoundVisible: false,

    setLoadingVisible: (value: boolean) => set(() => ({loadingVisible: value})),
    setNotFoundVisible: (value: boolean) => set(() => ({notFoundVisible: value})),
}))

export default useModalStore;