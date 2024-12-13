const permissions = (req, res, next) => {
    console.log(req.auth)
    // todo check whether the request has the permissions to access the resource
    next()
}
module.exports = permissions;
