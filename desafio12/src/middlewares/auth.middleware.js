export const auth = (req, res, next) => {
    if (req.session.login) {
        next()
    }else{
        res.redirect('/api/login')
    }
}