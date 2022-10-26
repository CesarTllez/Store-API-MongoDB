export default (req, res) => {
  res
    .status(404)
    .send({
      message: 'Path not found',
      url: req.path,
    })
    .end();
};
