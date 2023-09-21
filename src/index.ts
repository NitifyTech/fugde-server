//@ts-nocheck

import './config/'
import cluster from 'node:cluster'
import { WSService } from './interface'


class Init {
    private isPrimary = cluster.isPrimary
    private core = 1
    constructor() {
        this.run()
    }
    run() {
        if (this.isPrimary) {
            return this.primaryProcess()
        }
        return this.workerProcess()
    }
    private async primaryProcess() {
        console.log(`Running cluster with ${this.core} at PID ${process.pid}`)
        for (let i = 0; i < this.core; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code) => {
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                cluster.fork()
                console.log("Worker died, scheduling other!")
            }
        })
    }
    private workerProcess() {
        new WSService()
    }

}

new Init()