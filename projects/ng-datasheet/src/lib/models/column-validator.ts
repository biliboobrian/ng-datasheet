import { ValidatorFn } from '@angular/forms';

export class ColumnValidator {
    public validator: ValidatorFn;
    public validationFn: Function;
    public errorMessage: string;

    constructor(validator: ValidatorFn, errorMessage: string, validationFn?: Function) {
        this.validator = validator;
        this.errorMessage = errorMessage;
        this.validationFn = validationFn;
    }
}
