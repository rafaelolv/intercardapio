import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePratos,
  findPratosByName,
  deleteAllPratos,
} from "../actions/pratoActions";
import { Link } from "react-router-dom";

const PratoList = () => {
  const [currentPrato, setCurrentPrato] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const pratos = useSelector(state => state.pratoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePratos());
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const refreshData = () => {
    setCurrentPrato(null);
    setCurrentIndex(-1);
  };

  const setActive = (prato, index) => {
    setCurrentPrato(prato);
    setCurrentIndex(index);
  };

  const removeAllPratos = () => {
    dispatch(deleteAllPratos())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    refreshData();
    dispatch(findPratosByName(searchName));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar pelo nome do prato"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de pratos</h4>

        <ul className="list-group">
          {pratos &&
            pratos.map((prato, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActive(prato, index)}
                key={index}
              >
                {prato.nome}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPratos}
        >
          Remover todos os pratos
        </button>
      </div>
      <div className="col-md-6">
        {currentPrato ? (
          <div>
            <h4>Prato</h4>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentPrato.nome}
            </div>
            <div>
              <label>
                <strong>Descrição:</strong>
              </label>{" "}
              {currentPrato.descricao}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPrato.disponivel ? "Disponivel" : "Indisponivel"}
            </div>

            <Link
              to={"/pratos/" + currentPrato.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor clique em um prato...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PratoList;