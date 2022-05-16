import path from 'path'

export const getSignup = (req, res)  => {
    res.sendFile(path.resolve( './src/views/signup.html'))
}

export const postSignup = (req, res) => {
    res.sendFile(path.resolve( './src/views/login.html'))
}

export const failSignup = (req, res) => {
    res.render("signup-error.hbs", {})
}


export const getLogin = (req, res) => {
    if(req.isAuthenticated()){
        const user = req.user
        res.render("login-ok.hbs", {
            usuario: user.userName,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email
        })
    }else{
        res.sendFile(path.resolve( './src/views/login.html'))
    }
}

export const postLogin = (req, res) => {
    const user = req.user
    req.session.login = true
    req.session.user = user.userName
    req.session.email = user.email
    res.redirect('/api/productos')
}

export const failLogin = (req, res) => {
    res.render("login-error.hbs", {})
}


export const logout = (req, res) => {
    req.session.login = false
    req.session.user = null
    req.logout()
    res.sendFile(path.resolve( './src/views/login.html'))
}