import express from 'express';
import router from './routes';
import cors from "cors";
import morgan from "morgan";
import {createConnection} from "typeorm";
import {clientErrorHandler} from "./errors/error.handler";
const secrets = require('config');

class App {
    public app: express.Application;
    public port: string;

    constructor( port = '3000'){
        this.app = express();
        this.port = port;
        this.initializeMySql();
        this.initializeMiddlewares();
    }
    initializeMiddlewares(){
        this.app.use(express.urlencoded( { extended:true } ));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('short'));
        this.app.use(clientErrorHandler);
        this.app.use(function (err, req, res, next) {
            if (req.xhr) {
                res.status(500).send({ error: err.message})
              } else {
                next(err)
              }
          })
        this.app.use(router);
    }
    async initializeMySql() {
        const connectionOption = Object.assign( {type: "mysql" }, secrets.db.mysql);
        try{
            await createConnection(
                Object.assign( connectionOption,{
                    entities: [ __dirname + '/entities/*.{js,ts}'],
                }
            ),);
        }catch(err){
            console.log('Unable to connect to database',err);
            process.exit(1);
        }
    }
    public listen() {
        this.app.listen( this.port, () => {
            console.log(`App listing on port ${this.port}`);
        });
    }
}
new App(process.env.PORT).listen();
export default App;