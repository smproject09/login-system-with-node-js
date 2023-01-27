function decorateHtmlRes(pageTitle){
    return function(res, res, next){
        res.locals.html = true;
        res.locals.title = pageTitle;
        res.locals.loggedInUser = {};
        res.locals.errors = {};
        res.locals.data = {};
        next();
    }
}

module.exports = decorateHtmlRes;