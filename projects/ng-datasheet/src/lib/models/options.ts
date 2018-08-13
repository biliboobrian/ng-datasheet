export class Options {
    dataSet: Array<object>; // data source for component making links with other tables
    label: string; // label displayed for dataSet object
    value: string; // value returned to the main object
    format: string; // when a display component need a specific format
    retreiveFunction: Function; // for asyncrone calls, to retreive data
    placeHolder: string; // in case of input component
}
