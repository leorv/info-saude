export enum EventTypesEnum {
    CC = 'Câncer',
    DB = 'Doenças bacterianas',
    DG = 'Doenças genéticas',
    DP = 'Doenças psicológicas',
    DST = 'Doenças sexualmente transmissíveis',
    MC = 'Micoses',
    PV = 'Protozooses/Verminoses',
    VIR = 'Viroses',
    GRI = 'Gripes',
    COV = 'Covid'
}

export const EventTypes2LabelMapping: Record<EventTypesEnum, string> = {
    [EventTypesEnum.CC]: 'Câncer',
    [EventTypesEnum.DB]: 'Doenças bacterianas',
    [EventTypesEnum.DG]: 'Doenças genéticas',
    [EventTypesEnum.DP]: 'Doenças psicológicas',
    [EventTypesEnum.DST]: 'Doenças sexualmente transmissíveis',
    [EventTypesEnum.MC]: 'Micoses',
    [EventTypesEnum.PV]: 'Protozooses/Verminoses',
    [EventTypesEnum.VIR]: 'Viroses',
    [EventTypesEnum.GRI]: 'Gripes',
    [EventTypesEnum.COV]: 'Covid'
}