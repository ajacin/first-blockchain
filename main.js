// Tutorial Code : Arun Jacob
const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }


}

class BlockChain {
    constructor (){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock (){
        return new Block(0,"2018/04/28","Genesis Block","0");
    }

    getLatestBlock (){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i=1; i<this.chain.legth; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
        }
        return true;
    }
}

let blockChain = new BlockChain();
blockChain.addBlock(new Block(1,"2018/04/29",{amount :"4000"}));
blockChain.addBlock(new Block(2,"2018/04/29",{amount :"5000"}));
blockChain.addBlock(new Block(3,"2018/04/30",{amount :"2000"}));
console.log(JSON.stringify(blockChain, null ,4));
console.log("Is valid : "+blockChain.isChainValid());
blockChain.chain[3].data = {amount :"8000"};
console.log("Is valid after tampering: "+blockChain.isChainValid());// not validating