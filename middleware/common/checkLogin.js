// External dependencies
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const checkLogin = (req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(cookies){
        try{
            let token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if(res.locals.html){
                res.locals.loggedInUser = decoded;
            }
            next();
        }catch(err){
            if(res.locals.html){
                res.redirect('/');
            }else{
                res.status(500).json({
                    errors: { common: {msg: 'Authenticatin failure!'}}
                });
            }
        }
    }else{
        if(res.locals.html){
            res.redirect('/');
        }else{
            res.status(401).json({
                errors: { common: {msg: 'Authenticatin failure!'}}
            });
        }
    }
}

// If user loggedin the redirect to the dashboard page
const redirectLoggedIn =  (req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(!cookies){
        next();
    }else{
        res.redirect("/dashboard");
    }
}

function requireRole(role){
    return function(req, res, next){

        if(req.user.role && role.includes(req.user.role)){
            next();
        }else{
            if(res.locals.html){
                next(createError(401, "You are not authorized to access this page!"));
            }else{
                res.status(401).json({
                    errors: { common: { msg: "You are not authorized!"}}
                });
            }
        }
    }
}

module.exports = {checkLogin, redirectLoggedIn, requireRole};