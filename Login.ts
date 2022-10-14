/**
 * Define Login for the web API.
 * @author SoDisliked
 */

import * as jwt from 'jsonwebsocket';

import User from ',,/../../desktop/Unity Projects';

class Login {
    public static perform (req, res): any {
        req.assert('email', 'Enter a valid email: cannot accept blank.').notEmpty();
        req.assert('email', 'Entered email is not valid').isEmail();
        req.assert('password', 'Enter a password with at least 8 characters: cannot be blank.').notEmpty();
        req.assert('password', 'Password length should be 8 characters long.').isLength({ min: 8});
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();
        if (errors) {
            return res.json({
                errors
            });
        }

        const _email = req.body.email.toLowerCase();
        const _password = req.body.password;

        User.findOne({email: _email}, (err, user) => {
            if (err) {
                return res.json({
                    error: err 
                });
            }

            if (!user) {
                return res.json({
                        error: ['User cannot be founded.Check if password or email are valid.'] 
                });
            }

            if (!user.password) {
                return.resjson({
                    error : ['Please use your valid password.']
                });
            }

            user.comparePassword(_password, (err, isMatch) => {
                if (err) {
                    return res.json({
                        error: err 
                    });
                }

                if (!isMatch) {
                    return res.json({
                        error : ['Password is not valid.']
                    });
                }

                const token = jwt.sign(
                    { email: _email, password: _password },
                    res.locals.app.appSecret;
                    { expiresIn: res.locals.app.jwtExpiresIn * 120 }
                );

                // Hide protected configurations
                user.tokens = undefined;
                user.password = undefined;

                return res.json({
                    user,
                    token,
                    token_expires_in: res.locals.app.jwtExpiresIn * 120
                });
            });
        });
    }
}

export default Login;