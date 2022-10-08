import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = (noteObject) => {
    const request = axios.post(baseUrl, noteObject);
    return request.then(response => response.data)
}

const contactsService = {
    getAll,
    create,
};

export default contactsService