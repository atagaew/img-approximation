import { Word } from "./Word";
import { WordsDependencyExplanation } from "./WordsDependencyExplanation";
import { ulid } from 'ulid';

export class WordAnalysis {
    id: string = ulid();
    title = '';
    text = '';
    words: Word[] = [];
    selectedWords: Word[] = [];
    round = 1;
    wordsDependency: WordsDependencyExplanation[] = [];
    finalIdea = '';
    creationDate: Date = new Date();

    static createEmpty(): WordAnalysis {
        const wordAnalysis = new WordAnalysis();
        wordAnalysis.id = ulid();
        wordAnalysis.creationDate = new Date(); 
        return wordAnalysis;
    }
}

