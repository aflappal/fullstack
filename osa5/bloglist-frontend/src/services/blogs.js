import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
};

const create = async newObj => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.post(baseUrl, newObj, config);
    return response.data;
};

const update = async updatedObj => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.put(baseUrl.concat('/', updatedObj.id), updatedObj, config);
    return response.data;
};


export default { getAll, create, setToken, update };
