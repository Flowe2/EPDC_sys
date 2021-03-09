// 调用mongodb相关库
const { MongoClient } = require("mongodb");
const db_url = 'localhost:27017';
const db_usr = encodeURIComponent("root");
const db_pwd = encodeURIComponent("root");
// const authMechanism = "DEFAULT&ssl=false;
// /?authMechanism=${authMechanism}
const db_uri =`mongodb://${db_usr}:${db_pwd}@${db_url}`;
console.log(db_uri);

const client = new MongoClient(db_uri);
async function connect_to_db() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    let test_db = client.db('epdc_sys_db').collection('test');
    let res = await test_db.find({'u_acct': '954827899@qq.com'}, {'_id': 0, 'u_pwd':1}).toArray();
    console.log(res);
  } finally {
    await client.close();
  }
}
connect_to_db().catch(console.dir);