import 'dotenv/config';
import dbConnection from './src/db/dbConnection.js';
import app from './src/app.js';
const isProduction = process.env.NODE_ENV ==='production';

if (isProduction) {
    const port = process.env.PORT_PRODUCTION;
    dbConnection().then(()=>{
        app.on('ready',()=>{
            console.log("App is ready");
        });
        app.on('error', (error) => {
            console.error('App is not ready', error);
            throw new Error(error);
        });
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }).catch((error)=>{
        console.error('Error connecting to the database', error);
    })
    
} else {
    const port = process.env.PORT || 5000;
    console.log('hi');
    const httpsOptions = {
        key: readFileSync(resolve(__dirname, '../security/cert.key')),
        cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
    };

    const server = https.createServer(httpsOptions, app).listen(port, () => {
        console.log('https server running at ' + port);
        // console.log(all_routes(app));
    });
}