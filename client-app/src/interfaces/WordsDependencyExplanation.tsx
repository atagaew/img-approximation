
export class WordsDependencyExplanation {
    mainWordId = 0;
    otherWordsIds: number[] = [];
    explanation = "";

    constructor(mainWordId: number, otherWordsIds: number[]) {
        this.mainWordId = mainWordId;
        this.otherWordsIds = otherWordsIds;
        this.explanation = "";
    }
}
