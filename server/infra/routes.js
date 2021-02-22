const fg = require('fast-glob')

module.exports = async (app) => {
  await fg.sync('**/route/**.js', { ignore: ['**/route/defaultRoute.js'] }).map(async (file) => {
    const route = await require(`../../${file}`)
    app.use('/', route)
    // console.log(`Imported route from: ${file}`)
  })

  // console.log('Imported default route')
  app.use('/', require('../route/defaultRoute'))
}
