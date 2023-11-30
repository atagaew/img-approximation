import { Word } from "./Word";

export class WordAnalysis {
    title = '';
    text = '';
    words: Word[] = [];
    selectedWords: Word[] = [];
    round = 1;

    static createEmpty(): WordAnalysis {
        return new WordAnalysis();
    }
}