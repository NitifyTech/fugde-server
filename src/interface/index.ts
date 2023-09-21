//@ts-nocheck
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { funcoes } from '../application/io/'
import { createServer } from 'node:http'
import { router } from '../interface/router/'
import { Server } from 'socket.io'

export class WSService {
    private port = process.env?.PORT ?? 3000
    private app = express()
    private httpServer = createServer(this.app)
    private io = new Server(this.httpServer)
    constructor() {
        this.configureHttpModule()
        this.configureWebSocket()
    }



    private configureHttpModule() {
        this.app.use(router)
        this.app.use(morgan('dev'))
        this.app.use(express.json({
            limit: 2e5,
        }))
        this.app.use(cors())
        this.app.use((req, res) => {
            res.status(404).send({
                erro: 404,
                message: 'Desculpe, a página que você selecionou não foi encontrada.'
            })
        })



        this.httpServer.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}`);
        });
    }


    private configureWebSocket() {
        funcoes.forEach(([eventName, funct]) => {
            this.io.on(eventName, funct)
        })
    }
}

