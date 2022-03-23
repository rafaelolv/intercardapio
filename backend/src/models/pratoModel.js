module.exports = (sequelize, Sequelize) => {
    const Prato = sequelize.define("prato", {
        nome: {
            type: Sequelize.STRING
        },
        descricao: {
            type: Sequelize.STRING
        },
        disponivel: {
            type: Sequelize.BOOLEAN
        }
    });
    return Prato;
};