import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPrato } from "../actions/pratoActions";

const AddPrato = () => {
  const initialPratoState = {
    id: null,
    nome: "",
    descricao: "",
    disponivel: false
  };
  const [prato, setPrato] = useState(initialPratoState);
  const [disponivel, setDisponivel] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPrato({ ...prato, [name]: value });
  };

  const salvarPrato = () => {
    const { nome, descricao } = prato;

    dispatch(createPrato(nome, descricao))
      .then(data => {
        setPrato({
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
          disponivel: data.disponivel
        });
        setDisponivel(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPrato = () => {
    setPrato(initialPratoState);
    setDisponivel(false);
  };

  return (
    <div className="submit-form">
      {disponivel ? (
        <div>
          <h4>O prato foi salvo com sucesso!</h4>
          <button className="btn btn-success" onClick={newPrato}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={prato.nome}
              onChange={handleInputChange}
              name="nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              required
              value={prato.descricao}
              onChange={handleInputChange}
              name="descricao"
            />
          </div>

          <button onClick={salvarPrato} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPrato;