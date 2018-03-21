const Page = require('./page')

module.exports = {
  addPath: (path) => {
    Page.findOrCreate({where: {path: path}})
  }
}
