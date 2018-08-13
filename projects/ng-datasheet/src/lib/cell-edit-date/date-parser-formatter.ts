import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment_ from 'moment'; const moment = moment_;

export class DateParserFormatter extends NgbDateParserFormatter {

    constructor(
        private formatDate: string
    ) {
        super();
    }
    format(date: NgbDateStruct): string {
        if (date === null) {
            return '';
        }
        const d: moment_.Moment = moment(new Date(date.year, date.month - 1, date.day));
        return (d) ? d.format(this.formatDate) : '';
    }

    parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        const d = new Date(value);
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
    }
}
