const session = require('express-session');

const sessionAuth = session({
    secret: "sit725",	// encrypt cookie
    name: "session",	// cookie name
    resave: false,	
    rolling: false,	
    cookie: {
        maxAge: 5 * 60 * 1000 // expired time
    }
});

const attachUserToLocals = async (req, res, next) => {
    
    if (req.session.user) {
        const user = req.session.user;
        // console.log("user from session:", user);
        res.locals.user = user? user : null;
    } else {
        res.locals.user = null;        
    }
    next();
};

const ensureAuthenticated = (req, res, next) => {
    if (!req.session.user || !req.session) {
        console.log(`[Access Denied] Unauthenticated user tried to access: ${req.originalUrl}`);
        return res.redirect('/user/login'); // Redirect to login if not authenticated
    }
    next(); // Proceed to the next middleware or route handler if authenticated
};


module.exports = {sessionAuth, attachUserToLocals, ensureAuthenticated};
