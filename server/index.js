const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree= require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());


const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
console.log(root)

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = root;

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name} = req.body;
  console.log(name);
 
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);
  

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, root);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
