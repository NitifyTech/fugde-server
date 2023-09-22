//@ts-nocheck
import { prisma } from '../../infraestructure/orm'
interface Data {
    id: string;
    especie: string;
}

export async function Especies(data: Data) {
    const { id, especie } = data

    const result = await prisma.especies.findFirst({
        where: { id }
    })
    const { cardTitle: title, cardDescription: shortDescription } = result
    return {
        title,
        shortDescription,
        chartsList: []
    }
}