function decorateHtmlRes(pageTitle){
    return function(res, res, next){
        res.locals.html = true;
        res.locals.title = pageTitle;
        next();
    }
}

module.exports = decorateHtmlRes;