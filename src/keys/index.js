const { pem2jwk } = require('pem-jwk')
const jwksClient = require('jwks-rsa')
const keypair = require('keypair')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

const certs = {}
const publicKeys = {}
const tokens = []
const kid = process.env.KID || uuidv4()

function generateKeys() {
  if (process.env.DYNAMIC_KEYS) {
    console.log('Dynamic key generation')

    const pair = keypair({ bits: 1024 })

    certs.public = Buffer.from(pair.public)
    certs.private = Buffer.from(pair.private)

    publicKeys[kid] = pair.public

    return
  }

  console.log('Reading keys from files')

  certs.public = fs.readFileSync(__dirname + '/pem/public.pem')
  certs.private = fs.readFileSync(__dirname + '/rsa/jwt.key')

  publicKeys[kid] = certs.public.toString('utf8')
}

function currentJwk() {
  return Object.keys(publicKeys || {}).map(k => {
    const jwk = pem2jwk(publicKeys[k])
    return { alg: 'RS256', use: 'sig', kid: k, ...jwk }
  })
}

function getKey(header, callback) {
  const client = jwksClient({
    jwksUri: `http://localhost:${global.port}/.well-known/jwks.json`,
  })
  client.getSigningKey(header.kid, (err, key = {}) => {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(err, signingKey)
  })
}

module.exports = {
  generateKeys,
  currentJwk,
  getKey,
  tokens,
  kid,
  certs,
}

// const util = require('util')
// const exec = util.promisify(require('child_process').exec)

// const outputDir = `${__dirname}/../temp`
// const rsaDir = `${outputDir}/rsa`
// const pemDir = `${outputDir}/pem`
// // console.log(1, { __dirname, outputDir })
// try {
//   console.log('Generating RSA key')

//   await exec(`mkdir -p "${rsaDir}"`)
//   await exec(`mkdir -p "${pemDir}"`)

//   // Generate RSA key
//   // console.log(
//   //   ...(await exec(
//   //     `ssh-keygen -t rsa -b 1024 -m PEM -f "${rsaDir}/jwt.key" -P ""`
//   //   ))
//   // )
//   console.log('RSA key generated')

//   // Generate the public key with PEM format
//   console.log('Generating public key with PEM format')
//   console.log(
//     ...(await exec(
//       `openssl rsa -in "${rsaDir}/jwt.key" -pubout -outform PEM -out "${pemDir}/jwt.key.pub"`
//     ))
//   )
//   return
//   console.log('Public key with PEM format key generated')
// } catch (error) {
//   console.error(`exec error: ${error}`)
// }
// console.log(2)

// ,
// (error, stdout, stderr) => {
//   if (error) {
// console.error(`exec error: ${error}`)
//     return
//   }
//   console.log(`stdout: ${stdout}`)
//   console.log(`stderr: ${stderr}`)
// }
