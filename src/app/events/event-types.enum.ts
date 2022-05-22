export enum EventTypesEnum {
    DO = 'Doenças oncológicas',
    DG = 'Doenças em geral',
    VIR = 'Gripes e Viroses',
    COV = 'Covid e variações',
    OT = 'Outros'
}

export const EventTypes2LabelMapping: Record<EventTypesEnum, string> = {
    [EventTypesEnum.DG]: 'Doenças em geral',
    [EventTypesEnum.VIR]: 'Gripes e Viroses',
    [EventTypesEnum.COV]: 'Covid e variações',
    [EventTypesEnum.DO]: 'Doenças oncológicas',
    [EventTypesEnum.OT]: 'Outros'
}