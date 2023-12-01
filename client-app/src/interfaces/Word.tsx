import { WordCategory } from "./WordCategory";

export class Word {
    id = 0;
    value = '';
    lineNumber = 0;
    wordNumber = 0;
    isSelected= false;
    category = WordCategory.Nouns;
    // tracks all references to the word
    referencingWordIds: number[];

    //Associate a single word with another word
    associatedWordId: number | null;
    
    //round where association was set
    associationRound = 0;
    weight = 1;

    constructor(id = 0, value = '', lineNumber = 0, wordNumber = 0, isSelected = false, category = WordCategory.Nouns, association:number[] = []) {
        this.id = id;
        this.value = value;
        this.lineNumber = lineNumber;
        this.wordNumber = wordNumber;
        this.isSelected = isSelected;
        this.category = category;
        this.referencingWordIds = association;
        this.associatedWordId = null;
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