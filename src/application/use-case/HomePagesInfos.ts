//@ts-nocheck
import { prisma } from '../../infraestructure/orm'
interface Data {
    id?: string;
    titleCallAction: string;
    describeCallAction: string;
}
export async function Homepage() {
    const [callAction, cardsList] = await Promise.all([
        prisma.homepage.findFirst({
            where: { status: "Ativo" }
        }),
        prisma.especies.findMany({
            where: { status: "Ativo" }
        })
    ])
    return {
        callAction,
        cards: {
            title: "Espécies",
            shortDescription: "Espécies registradas em nosso dominio.",
            cardsList
        }
    }
}