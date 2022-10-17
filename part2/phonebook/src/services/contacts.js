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

const deleteItem = (noteObject) => {
    const request = axios.delete(`${baseUrl}/${noteObject.id}`);
    return request.then(response => console.log(`deleted ${noteObject.name}`))
}

const contactsService = {
    getAll,
    create,
    deleteItem,
};

export default contactsService