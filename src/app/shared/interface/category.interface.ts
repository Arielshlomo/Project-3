import { Languages } from "../enum/language.enum";
import { TranslatedWord } from "./translated-word.interface";

export interface Category {
    categoryName: string;
    description?: string;
    categoryImage?: string;
    numericIdentifier: string;
    lastModificationDate: Date;
    sourceLanguage: Languages;
    targetLanguage: Languages;
    words: TranslatedWord[];
}