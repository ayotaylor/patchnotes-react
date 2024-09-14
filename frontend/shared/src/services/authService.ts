import axios from 'axios';

const API_URL = 'http://localhost:8080';

// add other fields for registration ex. pfp, bio, etc.
export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, {username, email, password });
    return response.data;
};

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/authenitcate}`, {username, password });
    return response.data;
}