import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PlayerPosition {
    x: number;
    y: number;
    z: number;
}
export interface backendInterface {
    getPlayerPosition(): Promise<PlayerPosition>;
    loadWorld(worldName: string): Promise<Uint8Array>;
    saveWorld(worldName: string, worldData: Uint8Array): Promise<void>;
    updatePlayerPosition(x: number, y: number, z: number): Promise<void>;
}
