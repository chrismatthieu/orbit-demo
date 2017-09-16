const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('localhost', '5001')
const orbitdb = new OrbitDB(ipfs)

// const docstore = orbitdb.docstore('computes.nodes')

const db = orbitdb.docstore('orbit.users.shamb0t.profile', { indexBy: 'name' })

var counter = 0
setInterval(function(){
  db.put({ _id: 'QmAwesomeIpfsHash', name: 'shamb0t', followers: counter++ }).then((hash) => console.log(hash))
}, 1000)

db.events.on('ready', () => {
  const profile = db.get('shamb0t')
    .map((e) => console.log(e))
})
db.load()

db.events.on('synced', () => {
  db.get('shamb0t')
    .map((e) => console.log(e))
} )

db.events.on('write', (dbname, hash, entry) => {
  console.log(dbname, hash, entry);
} )
