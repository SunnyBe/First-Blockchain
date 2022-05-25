const Block = require('./block');
const Blockchain = require('./index');

describe('Blockchain', ()=>{
    let bc, bc2;

    beforeEach(()=>{
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('test with genesis block', ()=> {
        expect(bc.chain[0]).toEqual(Block.genesis())
    });

    it('adds a new block to the chain', ()=> {
        const data = "foo";
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    });

    it('validates a valid chain', ()=> {
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with corrupt genesis block', ()=> {
        bc2.chain[0].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a chain with corrupt block', ()=> {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replace current chain with a valid chain', ()=> {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the chain with one of less than or equal to length of chain', ()=> {
        bc.addBlock("floo");
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });

});