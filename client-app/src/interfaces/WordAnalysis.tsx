import { Iteration } from "./Iteration";
import { Word } from "./Word";

export class WordAnalysis {
    title = '';
    text = '';
    words: Word[] = [];
    selectedWords: Word[] = [];
    iterations: Iteration[] = [];

    static createEmpty(): WordAnalysis {
        return new WordAnalysis();
    }
}