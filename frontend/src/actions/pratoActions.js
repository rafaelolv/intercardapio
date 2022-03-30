import {
    CREATE_PRATO,
    RETRIEVE_PRATOS,
    UPDATE_PRATO,
    DELETE_PRATO,
    DELETE_ALL_PRATOS,
} from "./actionTypes/pratoActionTypes";
import PratoService from "../services/pratoService";


export const createPrato = (nome, descricao) => async (dispatch) => {
    try {
        const res = await PratoService.create({ nome, descricao });
        dispatch({
            type: CREATE_PRATO,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrievePratos = () => async (dispatch) => {
    try {
        const res = await PratoService.getAll();
        dispatch({
            type: RETRIEVE_PRATOS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updatePrato = (id, data) => async (dispatch) => {
    try {
        const res = await PratoService.update(id, data);
        dispatch({
            type: UPDATE_PRATO,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deletePrato = (id) => async (dispatch) => {
    try {
        await PratoService.remove(id);
        dispatch({
            type: DELETE_PRATO,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllPratos = () => async (dispatch) => {
    try {
        const res = await PratoService.removeAll();
        dispatch({
            type: DELETE_ALL_PRATOS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findPratosByName = (nome) => async (dispatch) => {
    try {
        const res = await PratoService.findByName(nome);
        dispatch({
            type: RETRIEVE_PRATOS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};