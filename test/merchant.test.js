let request =require('supertest');
let app =require('../server');
let expect =require('chai').expect;

describe('merchant',()=>{
    describe('merchant info',function (){
        it('returns status 200 to get the merchant page successfully',function(done){
            request(app)
            .get('/merchant/1')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done()
            })
        })
        it('returns status 404 to get the merchant page successfully',function(done){
            request(app)
            .get('/merchant/2')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done()
            })
        })
    })
})

