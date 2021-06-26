//Importar lo que haga falta


// logica de middleware
module.exports = (req: any, res: any, next: any) => {
    try {
        // logica de verificacion de token
        throw new Error;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Usuario no autorizado.'
        })
    }
}

