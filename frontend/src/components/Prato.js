import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { updatePrato, deletePrato } from "../actions/pratoActions";
import PratoService from "../services/pratoService";

const Prato = (props) => {
  const initialPratoState = {
    id: null,
    nome: "",
    descricao: "",
    disponivel: false
  };

  const [currentPrato, setCurrentPrato] = useState(initialPratoState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const getPrato = id => {
    PratoService.get(id)
      .then(response => {
        setCurrentPrato(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log("-- " + props.match.params.id)
    getPrato(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPrato({ ...currentPrato, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentPrato.id,
      title: currentPrato.nome,
      description: currentPrato.descricao,
      published: status
    };

    dispatch(updatePrato(currentPrato.id, data))
      .then(response => {
        console.log(response);

        setCurrentPrato({ ...currentPrato, disponivel: status });
        setMessage("O status foi atuaizado com  sucesso");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePrato(currentPrato.id, currentPrato))
      .then(response => {
        console.log(response);

        setMessage("O prato foi atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removePrato = () => {
    dispatch(deletePrato(currentPrato.id))
      .then(() => {
        props.history.push("/pratos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPrato ? (
        <div className="edit-form">
          <h4>Prato</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={currentPrato.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                name="descricao"
                value={currentPrato.descricao}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPrato.disponivel ? "Disponível" : "Indisponível"}
            </div>
          </form>

          {currentPrato.disponivel ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              Retirar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Disponibilizar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removePrato}>
            Deletar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Selecione um prato para disponibilizá-lo no cardápio ou para editá-lo...</p>
        </div>
      )}
    </div>
  );
};

export default Prato;