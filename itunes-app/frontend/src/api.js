import axios from 'axios';

let tokenPromise;

//get short lived jwt from backend
async function getToken() {
    if (!tokenPromise) {
        tokenPromise = axios.post('/api/token').then(r => r.data.token);
    }
    return tokenPromise;
};

//GET that includes token
export async function apiGet(url, config = {}) {
    const token = await getToken();
    return axios.get(url, {
        ...config,
        headers: { ...(config.headers || {}), Authorization: `Bearer ${token}` }
    });
};