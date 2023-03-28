import axios from 'axios';
import { MAIN_URL } from './Url';

export function getPosts(){
    return axios.get(`${MAIN_URL}posts/fetchpost`);
}
export function addPost(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data);
}
export function login(data){
    return axios.post(`${MAIN_URL}posts/login`,data);
}