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
    // console.log("req.session.user:", req.session.user);
    
    if (req.session.user) {
        const user = req.session.user;
        // console.log("user from session:", user);
        res.locals.user = user? user : null;
    } else {
        res.locals.user = null;
    }
    next();
};

module.exports = {sessionAuth, attachUserToLocals};
