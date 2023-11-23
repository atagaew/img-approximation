import { Word } from "./Word";


export interface Association {
    sourceWord: Word;
    targetWord: Word | null;
}
