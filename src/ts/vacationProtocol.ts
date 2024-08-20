export interface vacationProtocol {
    form: HTMLFormElement,
    containerResults: HTMLDivElement,

    calcRemuneration(): number,
    makeSpanResult(val: number): HTMLSpanElement,
    showRemuneration(): void,
}