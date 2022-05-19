import { fork } from "child_process";

let calc = fork(`./src/utils/calculo.util.js`);

export const random = (req,res) => {
    const {cant=100000000} = req.query;
    calc.on("message", (rsdo) => {
        console.log(rsdo)
        res.status(200).send({ rsdo });
        calc.kill();
        calc = fork(`./src/utils/calculo.util.js`);
    });
    calc.send(cant);
    
}
