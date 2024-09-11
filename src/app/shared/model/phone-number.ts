import { PhoneType } from "./phone-type";

export class PhoneNumber {
    constructor(
        public number : string,
        public type : PhoneType
    ) {}
}