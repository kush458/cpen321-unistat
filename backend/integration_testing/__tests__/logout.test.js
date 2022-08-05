const request = require('supertest')
const {app, server} = require('../../server')
const db = require("../../database/connect")
const client = db.client


const menteeUser = {
    "iss": "https://accounts.google.com",
    "azp": "572477064370-fo6khhqfp4g0bp8k8s9fqsjn2msoqimq.apps.googleusercontent.com",
    "aud": "572477064370-fo6khhqfp4g0bp8k8s9fqsjn2msoqimq.apps.googleusercontent.com",
    "sub": "110978389962889292287",
    "email": "manekgujral11@gmail.com",
    "email_verified": true,
    "at_hash": "B8XZ0KZ81_4blNoVFCeJJw",
    "iat": 1659631906,
    "exp": 1659635506,
    "firebase_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY1OTYzMTkwOCwiZXhwIjoxNjU5NjM1NTA4LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1vNWVhZkB1bmlzdGF0LTE2NTYxMjg1OTU5MzkuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1vNWVhZkB1bmlzdGF0LTE2NTYxMjg1OTU5MzkuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiIxMDYwODk3ODYyMjIxNjE1Nzk0NzkifQ.HU5CGo3U1iQyBoR9wttLO6bYfBcbG4oag_R2S18mAh6wjoQdTkVq8eEPYvft0fIaRsaP_5wNoN_mnmebrNT9t7U1iiGcUHcVzf8As6l3YZv46KyqHTXyRcRO-fiEVhWkWWkjKWQT1OJ5iDQUvM4lq5muuNb-YuWPMmpGq3mYb-hj7aAm-SjKNuVYmbfX843gRU8iCvW9oKxhvo3dE8-rvYC_0y4KTGkEOpJPdGDOTLJ96cjNb7yRU14Ko7_B9BRATaA_NW0hakJlardM9rl7huKpR7Gs-NktwRxbdpx-Ab_MZS_4ZDB_Byqe9TJ92XCRuKuZNBIAGEh0_XBH71b1lw",
    "currency": 100
}

beforeAll(() => {
    console.log("DROPPING")

    var query1 = {email : "manekgujral11@gmail.com"}
    client.db("UniStatDB").collection("Users").deleteOne(query1);

    client.db("UniStatDB").collection("Users").insertOne(menteeUser);

})

afterAll( () => {
    // Close the server instance after each test
    server.close()
    client.close()
})


// Tests for updating a firebase token
describe("PUT /firebaseToken", () => {
    test("Update firebase token for a valid user", async () => {
        await process.nextTick(() => { });
        const res = await request(app).put("/firebaseToken").send({
            "email": "manekgujral11@gmail.com",
            "firebase_token": ""
        })
        expect(res.statusCode).toBe(200)
    })

    test("Update firebase token for an invalid user", async () => {
        await process.nextTick(() => { });
        const res = await request(app).put("/firebaseToken").send({
            "email": "johnwick@gmail.com",
            "firebase_token": ""
        })
        expect(res.statusCode).toBe(400)
    })
})