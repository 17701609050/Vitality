import jwt from 'jsonwebtoken'
import config from '../config/config.js'

class Utils {
    parseQueryOptions(query) {
        const DEFAULT_LIMIT = 12;
        var options = {
            'limit': DEFAULT_LIMIT,
            'skip': 0
        };

        if (query.limit) {
            try {
                var limit = parseInt(query.limit, 10);
                options.limit = limit;
            } catch (e) {
            }
        }
        if (query.page) {
            try {
                var page = parseInt(query.page, 10);
                if (page > 0) {
                    options.skip = options.limit * (page - 1);
                }
            } catch (e) {
            }
        }
        return options;
    }
    generateToken(uid, scope) {
        const secretKey = config.security.secretKey;
        const expiresIn = config.security.expiresIn;
        const token = jwt.sign({
            uid,
            scope
        }, secretKey, {
            expiresIn: expiresIn
        })
        return token
    }
}
export default new Utils()