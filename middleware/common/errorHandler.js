// External dependencies
const createError = require('http-errors');

// 404 (not found) error handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your requested url was not found!"));
}

// Default error handler
const errorHandler = (err, req, res, next)=>{
    res.status(err.status||500);
    res.locals.error = {err_msg: err.message};

    if(res.locals.html){
        // html response
        res.render('error', { title: "Error page"});
    }else{
        // json response
        res.json(res.locals.error);
    }
};

module.exports = {
    notFoundHandler,
    errorHandler
};