require('dotenv').config()
const request = require("request")
const expect = require('chai').expect
const env = require('../../environment')
const cache = require('../../services/cache')

let token
before(async function () {
  await cache.getUserToken().then(function (res) {
    token = res
  })
})

describe("API testing for artists endpoint",function(){
  it("should return the artist Alesso",function(){
    request.get(
      {
        url: env.urlBase + "/v1/artists/" + env.artist_valid_id,
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
      }
    )
  })

  it("should return and error message with missing query parameter",function(){
    request.get(
      {
        url: env.urlBase + "/v1/artists/" + env.artist_valid_id + "/top-tracks",
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

        expect(response.statusCode).to.equal(400)
        expect(_body.error.message).to.equal("missing country parameter")
        expect(_body.error.message).to.be.a('string')
      }
    )
  })

  it("should return the top tracks of Alesso",function(){
    request.get(
      {
        url: env.urlBase + "/v1/artists/" + env.artist_valid_id + "/top-tracks?country=BR",
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
        expect(_body.tracks[0].name).to.equal("Let Me Go (with Alesso, Florida Georgia Line & watt)")
        expect(_body.tracks[1].name).to.equal("REMEDY")
      }
    )
  })

  it("should return an error message with invalid id",function(){
    request.get(
      {
        url: env.urlBase + "/v1/artists/" + env.artist_invalid_id,
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

        expect(response.statusCode).to.equal(400)
        expect(_body.error.message).to.equal("invalid id")
      }
    )
  })

  it("should return an error message with invalid token",function(){
    request.get(
      {
        url: env.urlBase + "/v1/artists/" + env.artist_valid_id,
        headers:  {
          "Authorization": "Bearer " + process.env.AUTH_INVALID_TOKEN
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

        expect(response.statusCode).to.equal(401)
        expect(_body.error.message).to.equal("The access token expired")
      }
    )
  })

  it("should return an error message with no token in header",function(){
    request.get(
      {
        url: env.urlBase + "/v1/artists/" + env.artist_valid_id
      },

      function(error, response, body){
        var _body = {}
        try{
          _body = JSON.parse(body)
        }
        catch(e){
          _body = {}
        }

        expect(response.statusCode).to.equal(401)
        expect(_body.error.message).to.equal("No token provided")
      }
    )
  })
})