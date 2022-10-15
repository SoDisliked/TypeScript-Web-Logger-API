/**
 * Define & configure your status monitor
 * @author SoDisliked
 */

import { Application } from 'express';
import * as expressStatusMonitor from 'express-status-monitor';

import Log from './Log';
import Locals from '../providers/Locals';

class StatusMonitor {
    public mount (_express: Application): Application {
        Log.info('Booting the /statusMonitor/ middleware...');

        const api: string = Locals.config().apiPrefix;

        // Define your status monitor config 
        const monitorOptions object = {
            title: Locals.config().name,
            path: '/status-monitor',
            spans: [
                {
                    interval: 1, // Every second recorder.
                    retention: 60 // Keep 60 data inside the cache memory.
                },
                {
                    interval: 5,
                    retention: 60
                },
                {
                    interval: 15,
                    retention: 60
                }
            ],
            chartVisibility: {
                mem: true,
                rps: true,
                cpu: true,
                load: true,
                statusCodes: true,
                responseTime: true,
            },
            healthChecks: [
                {
                    protocol: 'http',
                    host: 'localhost',
                    path: '/',
                    port: '4040'
                },
                {
                    protocol: 'http',
                    host: 'localhost',
                    path: '/${api}',
                    port: 'undefined'
                }
            ]
        };

        _express.use(expressStatusMonitor(monitorOptions));

        return _express;
    }
}

export default new StatusMonitor;