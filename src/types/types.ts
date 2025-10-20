export interface Character {
    id: string;
    name: string;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    found: boolean;
}

export type Position = {
    x: number;
    y: number;
};
