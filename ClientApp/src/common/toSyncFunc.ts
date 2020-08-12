export function toSync(callback: () => Promise<void>): () => void {
    return (): void => { (async (): Promise<void> => await callback())() };
}