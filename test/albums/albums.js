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

describe("API testing for albums endpoint",function(){
  it("should return the album Tim (from Avicii)",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums/" + env.album_valid_id[0],
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
        expect(_body.name).to.be.a('string')
        expect(_body.name).to.equal("TIM")
        expect(_body.artists[0].name).to.equal("Avicii")
        expect(_body.label).to.equal("Universal Music AB")
        expect(_body.total_tracks).to.equal(12)
        expect(_body.copyrights[0].text).to.include('2019 Avicii Recordings AB, under exclusive license to Universal Music AB')
        expect(_body.copyrights[0].type).to.equal('C')
        expect(_body.copyrights[1].text).to.include('2019 Avicii Recordings AB, under exclusive license to Universal Music AB')
        expect(_body.copyrights[1].type).to.equal('P')
      }
    )
  })

  it("should return the album Tim (from Avicii) - market specific",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums/" + env.album_valid_id[0] + "?market=BR",
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
        expect(_body.name).to.be.a('string')
        expect(_body.name).to.equal("TIM")
        expect(_body.artists[0].name).to.equal("Avicii")
        expect(_body.label).to.equal("Universal Music AB")
        expect(_body.total_tracks).to.equal(12)
        expect(_body.copyrights[0].text).to.include('2019 Avicii Recordings AB, under exclusive license to Universal Music AB')
        expect(_body.copyrights[0].type).to.equal('C')
        expect(_body.copyrights[1].text).to.include('2019 Avicii Recordings AB, under exclusive license to Universal Music AB')
        expect(_body.copyrights[1].type).to.equal('P')
      }
    )
  })

  it("should return the albums Tim (from Avicii) and World War Joy (from The Chainsmokers)",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums?ids=" + env.album_valid_id[0] + "," + env.album_valid_id[1],
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

        // First album validations
        expect(response.statusCode).to.equal(200)
        expect(_body.albums[0].name).to.be.a('string')
        expect(_body.albums[0].name).to.equal("TIM")
        expect(_body.albums[0].artists[0].name).to.equal("Avicii")
        expect(_body.albums[0].label).to.equal("Universal Music AB")
        expect(_body.albums[0].total_tracks).to.equal(12)
        expect(_body.albums[0].copyrights[0].text).to.include('2019 Avicii Recordings AB, under exclusive license to Universal Music AB')
        expect(_body.albums[0].copyrights[0].type).to.equal('C')
        expect(_body.albums[0].copyrights[1].text).to.include('2019 Avicii Recordings AB, under exclusive license to Universal Music AB')
        expect(_body.albums[0].copyrights[1].type).to.equal('P')

        //Second album validations
        expect(_body.albums[1].name).to.be.a('string')
        expect(_body.albums[1].name).to.equal("World War Joy...Takeaway")
        expect(_body.albums[1].artists[0].name).to.equal("The Chainsmokers")
        expect(_body.albums[1].label).to.equal("Disruptor Records/Columbia")
        expect(_body.albums[1].total_tracks).to.equal(5)
        expect(_body.albums[1].copyrights[0].text).to.include('(P) 2019 Disruptor Records/Columbia Records')
        expect(_body.albums[1].copyrights[0].type).to.equal('P')
      }
    )
  })

  it("should return the tracks of World War Joy...Takeaway album",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums/" + env.album_valid_id[1] + "/tracks",
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

        // Track 1
        expect(_body.items[0].track_number).to.equal(1)
        expect(_body.items[0].name).to.equal('Takeaway')
        expect(_body.items[0].artists[0].name).to.equal("The Chainsmokers")
        expect(_body.items[0].artists[1].name).to.equal("ILLENIUM")
        expect(_body.items[0].artists[2].name).to.equal("Lennon Stella")
        // Track 2
        expect(_body.items[1].track_number).to.equal(2)
        expect(_body.items[1].name).to.equal('Call You Mine')
        expect(_body.items[1].artists[0].name).to.equal("The Chainsmokers")
        expect(_body.items[1].artists[1].name).to.equal("Bebe Rexha")
        // Track 3
        expect(_body.items[2].track_number).to.equal(3)
        expect(_body.items[2].name).to.equal('Do You Mean')
        expect(_body.items[2].artists[0].name).to.equal("The Chainsmokers")
        expect(_body.items[2].artists[1].name).to.equal("Ty Dolla $ign")
        expect(_body.items[2].artists[2].name).to.equal("bülow")
        // Track 4
        expect(_body.items[3].track_number).to.equal(4)
        expect(_body.items[3].name).to.equal('Kills You Slowly')
        expect(_body.items[3].artists[0].name).to.equal("The Chainsmokers")
        // Track 5
        expect(_body.items[4].track_number).to.equal(5)
        expect(_body.items[4].name).to.equal('Who Do You Love')
        expect(_body.items[4].artists[0].name).to.equal("The Chainsmokers")
        expect(_body.items[4].artists[1].name).to.equal("5 Seconds of Summer")
      }
    )
  })

  it("should return an error message with invalid id",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums/" + env.album_invalid_id,
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

  it("should return an error message with invalid market code",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums/" + env.album_valid_id[0] + "?market=123",
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
        expect(_body.error.message).to.equal("Invalid market code")
      }
    )
  })

  it("should return an error message with invalid token",function(){
    request.get(
      {
        url: env.urlBase + "/v1/albums/" + env.album_valid_id[0],
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
        url: env.urlBase + "/v1/albums/" + env.album_valid_id[0]
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