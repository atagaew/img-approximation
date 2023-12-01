import { WordCategory } from "./WordCategory";

export class Word {
    id = 0;
    value = '';
    lineNumber = 0;
    wordNumber = 0;
    isSelected= false;
    category = WordCategory.Nouns;
    // tracks all references to the word
    referencingWords: Word[];

    //Associate a single word with another word
    associatedWord: Word | null;

    constructor(id = 0, value = '', lineNumber = 0, wordNumber = 0, isSelected = false, category = WordCategory.Nouns, association:Word[] = []) {
        this.id = id;
        this.value = value;
        this.lineNumber = lineNumber;
        this.wordNumber = wordNumber;
        this.isSelected = isSelected;
        this.category = category;
        this.referencingWords = association;
        this.associatedWord = null;
    }

    static create(id: number, lineNumber: number, wordNumber: number, value: string, category: WordCategory): Word {
        return new Word(
            id,
            value,
            lineNumber,
            wordNumber,
            false,
            category,
            []
        );
    }
}