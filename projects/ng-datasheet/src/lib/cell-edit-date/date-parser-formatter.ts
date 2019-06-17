
import * as moment_ from 'moment';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
 const moment = moment_;


export class DateParserFormatter extends NgbDateParserFormatter {

    constructor(
        public formatDate: string
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
        const d: moment_.Moment = moment(value, this.formatDate);
        return {
            year: parseInt(d.format('YYYY'), 10),
            month: parseInt(d.format('MM'), 10),
            day: parseInt(d.format('DD'), 10)
        };
    }
}
