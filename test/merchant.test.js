let request =require('supertest');
let app =require('../server');
let expect =require('chai').expect;

describe('merchant',()=>{
    describe('get merchant info',function (){
        it('returns status 200 to check if api works',function(done){
            console.log("============")
            request(app)
            .get('/merchant?merchantId=1')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                console.log(res.body)
                done()
            })
        })
    })
})

