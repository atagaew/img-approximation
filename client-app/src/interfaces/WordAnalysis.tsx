import { Word } from "./Word";

export class WordAnalysis {
    title = '';
    text = '';
    words: Word[] = [];
    selectedWords: Word[] = [];

    static createEmpty(): WordAnalysis {
        return new WordAnalysis();
    }
}