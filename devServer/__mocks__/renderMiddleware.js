module.exports = {
  default: (req, res, next) => {
    res.locals.fra = 'keep going'
    next()
  },
}
