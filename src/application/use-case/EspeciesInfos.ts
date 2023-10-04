//@ts-nocheck
import { prisma } from '../../infraestructure/orm'
interface Data {
    id: string;
    especie: string;
}

interface ChartData {
    options: {
        chart: {
            id: string;
        };
        xaxis: {
            categories: number[];
        };
    };
    series: {
        name: string;
        data: number[];
    }[];
}



async function GetGraphs(id: string, especie: string): Promise<ChartData[]> {
    const firstGraph = await prisma.peixeData.aggregateRaw({
        pipeline: [
            {
                $sort: {
                    comprimento: 1
                }
            },
            {
                $group:
                {
                    _id: "$sexo",
                    data: {
                        $addToSet: "$comprimento",
                    },
                },
            },
            {
                $project:
                {
                    _id: 0,
                    label: "$_id",
                    data: 1,
                },
            },
        ]
    })

    return [{
        options: {
            chart: {
                id: "rangeArea",
                animations: {
                    speed: 200
                }
            },
        },
        series: firstGraph.map(x => {
            return {
                type: 'line',
                name: x.label,
                data: x.data
            }
        })
    }]
}

export async function Especies(data: Data) {
    const { id, especie } = data

    const result = await prisma.especies.findFirst({
        where: { id }
    })
    const { cardTitle: shortDescription, cardDescription: title } = result
    return {
        title,
        shortDescription,
        chartsList: await GetGraphs(id, especie)
    }
}