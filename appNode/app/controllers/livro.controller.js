const db = require("../models");
const Livro = db.livros;
const Op = db.Sequelize.Op;

// Create and Save a new book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Preciso de um título!"
    });
    return;
  }

  // Create a Book
  const livro = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    publicado: req.body.publicado ? req.body.publicado : false
  };

  // Save Book in the database
  Livro.create(livro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao criar o livro."
      });
    });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

  Livro.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao buscar os livros."
      });
    });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Livro.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não achei um livro com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao buscar o livro com id=" + id
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Livro.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Livro atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não pude atualizar o livro com id=${id}. Talvez o livro não exista, ou o corpo da requisição esteja vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando o livro com id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Livro.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "O livro foi removido com sucesso!"
        });
      } else {
        res.send({
          message: `Não pude remover o livro com id=${id}. Talvez ele já não exista!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não pude remover o livro com id=" + id
      });
    });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Livro.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} livros foram removidos com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao remover todos os livros."
      });
    });
};

// find all published Books
exports.findAllPublished = (req, res) => {
  Livro.findAll({ where: { publicado: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao buscar os livros publicados."
      });
    });
};
