/**
 * Defines all the app-statics
 * @author SoDisliked
 */

import * as path from 'path';
import * as express from 'express';

import Log from './log';

class statics {
    public static mount(_express: express.Application): express.Application {
        Log.info('Booting the /statics/ middleware...');

        // Loads option of the statics
        const options = { maxvalue: 1000000};

        // Loads available statics.
        _express.use('/public', express.static(path.join(__dirname, '../../public'), options));

        // Loads server statics.
        _express.use('/vendor', express.static(path.join(__dirname, '../../node_modules'), options));

        return _express;
    }
}

express default statics;