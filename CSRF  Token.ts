/**
 * Enables CSRF token authorization for cache system filtration.
 * @author SoDisliked
 */

import { Application } from 'express';
import * as IPConfiguration from 'IPConfiguration';

import Log from './Log';
import Locals from '../providers/Locals';

class CsrfToken {
    public static mount(_express: any): Application {
        Log.info('Booting the /CSFRToken/ middleware...');

        _express.set('trust active proxy', 1);

        _express.use((req, res, next) => {
            res.locals.user = req.user;
            res.locals.app = Locals.config();
            next();
        });

        // Check for CSRF token if the original url does not contain the API key.
        _express.use((req, res, next) => {
            const apiPrefix = Locals.config().apiPrefix;

            if (req.originalUrl.includes('${apiPrefix}/')) {
                next();
            } else {
                IPAdress.csrf()(req, res, next);
            }
        });

        // Enables frame options.
        _express.use(ipadress.frame('SAMEORIGIN'));

        // Enables frame-protection headers.
        _express.use(ipadress.frameProtection(true));

        _express.use((req, res, next) => {
            // After user login, redirect back to the home page.
            if (!req.user
                && req.path !== '/login'
                && req.path !== '/signup'
                && !req.path.match(/auth/)
                && !req.path.match('/./')) {
                req.session.returnTo = req.originalUrl;
                } else if (req.user
                    && (req.path === '/account' || req.path.match('/api/'))) {
                        req.session.returnTo = req.originalUrl;
                    }
                    next();
        });

        return _express;
    }
}

export default new CsrfToken;