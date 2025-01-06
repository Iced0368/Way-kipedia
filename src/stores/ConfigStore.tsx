import { create } from 'zustand';

interface Configs {
    lang?: string,
    generateDepth?: number,
    generateBatch?: number,

    setConfigs: (config: Configs) => void,
}

const useConfigStore = create<Configs>()((set) => ({
    lang: "ko",
    generateDepth: 10,
    generateBatch: 5,

    setConfigs: (config: Configs) => set(() => config),
}));

export default useConfigStore;