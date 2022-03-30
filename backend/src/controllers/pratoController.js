const db = require("../models");
const Prato = db.pratos;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Criando um prato
    const prato = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        disponivel: req.body.disponivel ? req.body.disponivel : false
    };

    Prato.create(prato)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu enquanto o 'Prato' estava sendo criado."
            });
        });
};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    console.log("nome " + nome)
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;
    Prato.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu enquanto os 'Pratos' estavam sendo buscados."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Prato.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi encontrado o 'Prato' com  id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro na busca pela 'Prato' com id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Prato.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "'Prato' atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o 'Prato com id=${id}. Talvez o 'Prato' não tenha sido encontrado ou o req.body is vazio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar o 'Prato' com id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Prato.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "'Prato' deletado com  sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar o 'Prato com id=${id}. Talvez o 'Prato' não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `O 'Prato' com id=${id} não foi deletado.`
            });
        });
};

exports.deleteAll = (req, res) => {
    Prato.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pratos deletados com sucesso!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu enquanto os 'Pratos' estavam sendo deletados."
            });
        });
};


exports.findAllDisponiveis = (req, res) => {
    Prato.findAll({ where: { disponivel: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu enquanto os 'Pratos' estavam sendo buscados."
            });
        });
};