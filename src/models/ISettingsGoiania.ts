import TTypeLog from './TTypeLog'

export default interface ISettingsGoiania {
    dateHourProcessing: string,
    hourLog: string,
    loguin: string,
    idUser: number,
    password: string,
    id?: number,
    typeLog?: TTypeLog,
    codeCompanie?: string,
    companie?: string,
    cgceCompanie?: string,
    inscricaoMunicipal?: string,
    year?: string,
    month?: string,
    entradasOrSaidas?: string,
    typeNF?: string,
    messageError?: string,
    messageLog?: string,
    messageLogToShowUser?: string,
    error?: string,
    valueLabelSite?: string,
    dateStartDown?: string,
    dateEndDown?: string,
    dayInitialMonth?: string,
    dayFinalMonth?: string,
    qtdNotes?: number,
    qtdTimesReprocessed?: number
}