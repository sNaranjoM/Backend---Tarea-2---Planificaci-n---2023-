import express from "express";
import morgan from "morgan";

// Routes
import languageRoutes from "./routes/language.routes";

const app = express();
const cors = require('cors');

//Settings 
app.set("port", 4000);

//Middelwares
app.use(morgan("dev"));
app.use(express.json());

// Routes
//app.use("/api/languages", languageRoutes);
app.use("/api/actionPlans", languageRoutes);

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000' // Agrega el origen de la solicitud
  }));




export default app;


