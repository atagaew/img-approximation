import { WordCategory } from "./WordCategory";

export interface Word {
    id: number;
    value: string;
    lineNumber: number;
    isSelected: boolean;
    category: WordCategory;
}

