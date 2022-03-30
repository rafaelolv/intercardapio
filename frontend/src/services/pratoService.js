import http from "../http-common";

const getAll = () => {
    return http.get("/pratos");
};

const get = id => {
    return http.get(`/pratos/${id}`);
};

const create = data => {
    return http.post("/pratos", data);
};

const update = (id, data) => {
    return http.put(`/pratos/${id}`, data);
};

const remove = id => {
    return http.delete(`/pratos/${id}`);
};

const removeAll = () => {
    return http.delete(`/pratos`);
};

const findByName = nome => {
    return http.get(`/pratos?nome=${nome}`);
};

const pratoService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};

export default pratoService;