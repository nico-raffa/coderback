export const login = (req,res) =>{
    const { user } = req.body
    if(user){
        req.session.login = true
        req.session.user = user        
        res.render('greetings',{
            login: req.session.login,
            user: req.session.user
        })
    }else{
        res.render('login',{})
    }
}
export const logout = (req,res) =>{
    req.session.login = false
    const user = req.session.user
    res.render('greetings',{
        user
    })
    setTimeout(() => {
        req.session.user = null        
    }, 4000);
}