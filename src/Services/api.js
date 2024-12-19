// Separate API logic file is created so that I can implement modularity,consistency and reusability across entire project

import axios from 'axios'
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
export const createQuote = async (text, mediaUrl) => {
    const response = await api.post('/postQuote', { text, mediaUrl });
    return response.data;
  };
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await axios.post(
      'https://crafto.app/crafto/v1.0/media/assignment/upload',
      formData
    );
    return response.data;
  };








