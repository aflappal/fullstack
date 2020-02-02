import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl).then(result => result.data);
};

const create = (newRecord) => {
    return axios.post(baseUrl, newRecord).then(result => result.data);
};

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, del };
