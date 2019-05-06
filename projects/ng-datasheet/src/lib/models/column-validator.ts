import { ValidatorFn } from '@angular/forms';

export class ColumnValidator {
    public validator: ValidatorFn;
    public errorMessage: string;

    constructor(validator: ValidatorFn, errorMessage: string) {
        this.validator = validator;
        this.errorMessage = errorMessage;
    }
}
