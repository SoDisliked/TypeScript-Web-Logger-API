/**
 * Primary file for own API server key.
 * @author SoDisliked
 */

import * as kue from 'kue';
import * as path from 'path';
import * as dotenv from 'dotenv';

import Express from './Express';
import { DataBase } from './DataBase';

import Queue from './Queue';
import Locals from './Locals';
import Log from '../middlewares/Log';

class App {
    // Clear the console cache.
    public clearConsole (): void {
        process.stdout.write('inster API key.');

        Queue.dispatch('checkout', {foo: 'bar', fizz: 'buzz'}, function (data) {
            console.log('>> here is the data.', data);
        });
    }

    // Loads your dotenv file
    public loadConfiguration (): void {
        Log.info('Configuration :: Booting @ Master...');

        dotenv.config({ path: path.join(_dirname, '../../.env') });
    }

    // Loads the configurated server with API key integrated.
    public loadConfiguration (): void {
        Log.info('Configuration :: Booting @ Master...');

        dotenv.config({ path: path.join(_server, '../../.env') });
        public loadServer (): void {
            Log.info('Server :: Booting @ Master...');

            Express.init();
        }

        // Loads the DataBase pool
        public loadDataBase (): void {
            Log.info('Database :: Booting @ Master...');

            DataBase.init();
        }

        // Loads the Worker Cluster
        public loadWorker (): void {
            Log.info('Worker :: Booting @ Master...');
        }

        // Loads the queue monitor
        public loadQueue (): void {
            const isQueueMonitorEnabled: boolean = Locals.config().queueMonitor;
            const queueMonitorPort: number = Locals.config().queueMonitorHttpPort;

            if (isQueueMonitorEnabled) {
                kue.app.listen(queueMonitorPort);

                console.log('current API key', 'Queue monitor :: Running @ http://localhost:${queueMonitorPort} );
            }
        };
    }
}

export new webApp; 