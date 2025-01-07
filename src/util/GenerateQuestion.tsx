import RandomGenerator from "./RandomGenerator";
import wiki, { Page } from "wikipedia";
import koreanCharacters from "../assets/korean_characters.json";

function isValidString(input: string) {
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    return regex.test(input);
}

const getLCS = (str1: string, str2: string) => {
    const m = str1.length;
    const n = str2.length;

    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    let maxLength = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLength = Math.max(maxLength, dp[i][j]);
            } else {
                dp[i][j] = 0;
            }
        }
    }

    return maxLength;
}

const getRandomTitle = async (generator: RandomGenerator, lang: string) => {
    const characters = koreanCharacters.korean_chars;

    let ret: string | null = null;

    while(ret === null) {
        let randomKoreanString = "";
        for(let i = 0; i < 2; i++)
            randomKoreanString += characters[generator.random() % characters.length];

        wiki.setLang(lang);
        let searchResults = (await wiki.search(randomKoreanString)).results;
        searchResults.filter(item => isValidString(item));
        
        if (searchResults.length > 0)
            ret = searchResults[generator.random() % searchResults.length].title;
    }
    return ret;
}

const generateQuestion = async (depth: number, seed: number, lang: string, onProgress?: () => void) => {
    const generator = new RandomGenerator(seed);
    const start = await getRandomTitle(generator, lang);
    const stack: Page[] = [];

    wiki.setLang(lang);

    let startPage = null;
    try {
        startPage = await wiki.page(start, {preload: true, fields: ["links"]});
    }
    catch (error) {
        console.error(error);
        return null;
    }
    let cur = startPage;

    for (let i = 0; i < depth; i++) {
        const links = await cur.links();
        
        if (links !== null && (links?.length ?? 0) > 0) {
            let minLCS: number = 1000;
            let candidate: string[] = [];

            links?.forEach(item => {
                const lcs = getLCS(cur.title, item);
                if (lcs < minLCS)
                    [minLCS, candidate] = [lcs, [item]];
                else if (lcs === minLCS)
                    candidate.push(item);
            })

            const nextTitle = candidate[generator.random() % candidate.length];

            try {
                const nextPage = await wiki.page(nextTitle);
                stack.push(cur);
                cur = nextPage;
            }
            catch(_) {
                cur._links = cur._links.filter(link => link !== nextTitle);
            }
        }

        onProgress && onProgress();
    }
    stack.push(cur);

    return {
        start: start,
        end: cur.title,
        startPage: startPage,
        endPage: cur,
        searched: stack.length,
        path: stack.map(page => page.title),
    }
}

const generateQuestions = async (depth: number, batch: number, seed: number, lang: string, onProgress?: () => void) => {
    const promises = [...Array(batch).keys()].map((i) => generateQuestion(depth, seed + i*1000, lang, onProgress));
    const questions = await Promise.all(promises);
    return questions;
}


export {generateQuestions};