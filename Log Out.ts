/**
 * Handles the logout request
 * @author SoDisliked
 */

import { IRequest, IResponse } from '../../interfaces/vendors';

class Logout {
    public static perform (req: IRequest, res: IResponse): any {
        req.logout();
        req.session.destroy((err) => {
            if (err) {
                console.log('Error : Failed to shutdown the session during logout.', err);
            }

            req.user = null;
            return res.redirect('/');
        });
    }
}

export default Logout;