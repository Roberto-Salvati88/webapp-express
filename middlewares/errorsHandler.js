// middleware di gestione errori: Express lo riconosce perché ha QUATTRO parametri
function errorsHandler(err, req, res, next) {
  console.error(err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
}

module.exports = errorsHandler;
