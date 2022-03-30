import { 
    CREATE_PRATO, 
    RETRIEVE_PRATOS, 
    UPDATE_PRATO, 
    DELETE_PRATO, 
    DELETE_ALL_PRATOS 
} from '../actions/actionTypes/pratoActionTypes';

const initialState = [];

function pratolReducer(pratos = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PRATO:
            return [...pratos, payload];

        case RETRIEVE_PRATOS:
            return payload;

        case UPDATE_PRATO:
            return pratos.map((prato) => {
                if (prato.id === payload.id) {
                    return {
                        ...prato,
                        ...payload,
                    };
                } else {
                    return prato;
                }
            });

        case DELETE_PRATO:
            return pratos.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_PRATOS:
            return [];
        default:
            return pratos;
    }
};

export default pratolReducer;