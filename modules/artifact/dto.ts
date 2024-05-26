import { Dimension } from "./model";

export interface CreateArtifactDto {
    organization?: string,
    name: string
    description: string
    media: string[]
    discoveryLocation: string
    age: string
    material: string
    dimensions: Array<Dimension>
    indexCode: string
    currentLocation: string
}