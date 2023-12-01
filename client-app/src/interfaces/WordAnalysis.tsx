import { Word } from "./Word";
import { WordsDependencyExplanation } from "./WordsDependencyExplanation";

export class WordAnalysis {
    title = '';
    text = '';
    words: Word[] = [];
    selectedWords: Word[] = [];
    round = 1;
    wordsDependency: WordsDependencyExplanation[] = [];

    static createEmpty(): WordAnalysis {
        return new WordAnalysis();
    }
}

