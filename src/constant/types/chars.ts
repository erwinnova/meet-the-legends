export type Chars = {
    displayName: string;
    description: string;
    displayIcon: string;
    fullPortrait: string;
    role: string;
    abilities: CharAbilities[];
    video: string;
};

export type CharAbilities = {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
};
