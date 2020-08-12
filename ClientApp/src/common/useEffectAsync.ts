import {DependencyList, useEffect} from "react";
import {toSync} from "./toSyncFunc";

export function useEffectAsync(effect: () => Promise<void>, deps?: DependencyList): void {
    useEffect(toSync(effect), deps);
}
