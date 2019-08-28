require('dotenv').config()
const request = require("request")
const expect = require('chai').expect
const env = require('../../environment')
const auth = require('../../auth').auth

var token;
before(async function() {
  token = await auth.getAuthentication();
})

describe("API testing for artists endpoint",function(){
  it("should return the artist Alesso",function(done){
    request.get(
      {
        url : env.urlBase + "/v1/artists/" + env.artist_valid_id,
        headers:  {
          "Authorization": "Bearer " + token
        }
      },

      function(error, response, body){
        var _body = {}
        try{
          _body = JSON.parse(body)
        }
        catch(e){
          _body = {}
        }

        expect(response.statusCode).to.equal(200)
        expect(_body.name).to.equal("Alesso")
        expect(_body.name).to.be.a('string')

        done()
      }
    )
  })
})