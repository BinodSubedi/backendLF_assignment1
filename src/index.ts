import express from "express";
import env from "./config";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(router)

const port = env.port || 3000;

app.listen(port, ()=>{
    console.log(`listening to the server at port ${port}....`)
})


