module.exports = (sequelize, Sequelize) => {
  const Livro = sequelize.define("livro", {
    titulo: {
      type: Sequelize.STRING
    },
    autor: {
      type: Sequelize.STRING
    },
    publicado: {
      type: Sequelize.BOOLEAN
    }
  });

  return Livro;
};
