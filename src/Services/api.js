// Separate API logic file is created so that I can implement modularity,consistency and reusability across entire project

import axios from 'axios'
console.log("process.env",process.env.REACT_APP_BASE_URL)
const BASE_URL = "https://assignment.stage.crafto.app"

const api = axios.create({
    baseURL : BASE_URL ,
    headers:{
        'Content-Type' : 'application/json'
    }
});

//In order to Fetch and add Authorization tokens we recieved from api and stored in localstorage

api.interceptors.request.use((request)=>{
    const token = localStorage.getItem('authToken');
    if(token){
        request.headers['Authorization'] = token
    }
    return request;

},error =>{
    return Promise.reject(error)
})

export const login = async (payload) => {
      const response = await api.post('/login',payload);
      return response.data
};
export const fetchQuotes = async (payload) => {
      const response = await api.get(`/getQuotes?limit=${payload.limit}&offset=${payload.offset}`);
      return response.data
};








