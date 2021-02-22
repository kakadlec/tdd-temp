const app = require('../server/infra/app')

const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`Process start at ${port}, env: ${process.env.NODE_ENV}`) })
