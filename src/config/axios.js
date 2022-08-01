import axios from "axios";
 
 
//aqui no se necesita un dotenv?
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-type': 'application/json' }
}); 