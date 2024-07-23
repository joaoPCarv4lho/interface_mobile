import axios from 'axios';
//import Cookies from 'js-cookie';

const baseUrl = "https://restfulapi-ecommerce.onrender.com/api";

export function signup(data){
    delete data.confirmPassword;
    const body = {
        ...data,
        username: generateUserName(data.name)
    };
    const response = axios.post(`${baseUrl}/user/register`, body);
    return response;
}

export function signin(data){
    const response = axios.post(`${baseUrl}/auth/login`, data);
    return response;
}

export function userLogged(){
    const response = axios.get(`${baseUrl}/user/findByID`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    });
    return response;
}

function generateUserName(name){
    const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}