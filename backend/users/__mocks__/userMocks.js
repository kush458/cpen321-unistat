// Mock the whole users module

// The following line automatically assigns jest.fn() to each module export, mocking all functions.

const users = require("../userHandlers")

jest.mock("../userHandlers");

const sampleStat = {
    "statData": [
        {  
            "_id": {    "$oid": "62c9c7ed498bfa049b59b9cb"  },  
            "userEmail": "kushar339@gmail.com",  
            "userPhoto": "https://lh3.googleusercontent.com/a/AItbvmnZ_qSBbayg--2ZH-kFFsfVZC6v57Rv1x4Ugtg=s96-c",  
            "userName": "Kush Arora",  
            "univName": "UBC",  
            "univMajor": "cpen",  
            "univGpa": "3.5",  
            "univEntranceScore": 
            "1200",  
            "univBio": "story"}
    ]
}

/********* Mock implementaions ****************/

// storeGoogleUserData() returns true/false incdicating if a user already exists
users.storeGoogleUserData.mockImplementationOnce((idToken, fb_token) => true) // For first call
users.storeGoogleUserData.mockImplementationOnce((idToken, fb_token) => false) // For second call
users.storeGoogleUserData.mockImplementation((idToken, fb_token) => false) // For future all calls

// handleUserEntry() returns "signedUp" or "loggedIn" on the basis of a boolean result from storeGoogleUserData()
users.handleUserEntry.mockImplementationOnce((req, res) => {
    const jsonResp = {"status": "loggedIn"}
    return JSON.stringify(jsonResp)
}) 
users.handleUserEntry.mockImplementationOnce((req, res) => {
    const jsonResp = {"status": "signedUp"}
    return JSON.stringify(jsonResp)
})
users.handleUserEntry.mockImplementation((req, res) => {
    const jsonResp = {"status": "loggedIn"}
    return JSON.stringify(jsonResp)
}) 

// createUserStat()
users.createUserStat.mockImplementation((req, res) => {
    const jsonResp = {
        "status": `Stat stored for ${req.body.userEmail}`
    }
    return JSON.stringify(jsonResp)
})

// getAllUserStats()
users.getAllUserStats.mockImplementation((req, res) => {
    const jsonResp = sampleStat
    return JSON.stringify(jsonResp)
})

// getStatsByFilter()
users.getStatsByFilter.mockImplementation((req, res) => {
    const jsonResp = sampleStat
    return JSON.stringify(jsonResp)
})

// getStatsBySorting()
users.getStatsBySorting.mockImplementation((req, res) => {
    const jsonResp = sampleStat
    return JSON.stringify(jsonResp)
})

// getStatsByConfiguration()
users.getStatsByConfiguration.mockImplementation((req, res) => {
    const jsonResp = sampleStat
    return JSON.stringify(jsonResp)
})

// updateStat()
users.updateStat.mockImplementation((req, res) => {
    const jsonResp = {
        "status": `Stat updated for ${req.body.userEmail}`
    }
    return JSON.stringify(jsonResp)
})

// sendMeetingRequest()
users.sendMeetingRequest.mockImplementation(async (email) => {
    const jsonResp = {
        "res" : "Successfully sent notification"
    }
    console.log("HERE------------------------------------------------------")
    return JSON.stringify(jsonResp)
})

// sendMeetingResponse()
users.sendMeetingResponse.mockImplementation(async (email) => {
    const jsonResp = {
        "res" : "Successfully sent notification"
    }
    return JSON.stringify(jsonResp)
})


/********* Test Suite ************************/
// test('storeGoogleUserData test', () => { 
//     expect(users.storeGoogleUserData("token1", "token2")).toBe(true);
//     expect(users.storeGoogleUserData("token1", "token2")).toBe(false);
// })

// test('handleUserEntry test', () => { 
//     const req = {}
//     const res = {}
//     var expected = {"status": "loggedIn"}
//     const jsonExpected1 = JSON.stringify(expected)
//     expected = {"status": "signedUp"}
//     const jsonExpected2 = JSON.stringify(expected)
//     expect(users.handleUserEntry(req, res)).toBe(jsonExpected1);
//     expect(users.handleUserEntry(req, res)).toBe(jsonExpected2);
// })

// test('createUserStat test', () => { 
//     const req = {
//         "body": {
//             "userEmail": "email"
//         }
//     }
//     const res = {}
//     const expected = {
//         "status": `Stat stored for ${req.body.userEmail}`
//     }
//     const jsonExpected = JSON.stringify(expected)
//     expect(users.createUserStat(req, res)).toBe(jsonExpected);
// })

// test('getAllUserStats test', () => { 
//     const req = {}
//     const res = {}
//     const expected = sampleStat
//     const jsonExpected = JSON.stringify(expected)
//     expect(users.getAllUserStats(req, res)).toBe(jsonExpected);
// })

// test("getStatsByFilter test", () => { 
//     const req = {
//         "body": {
//             "univName": "UBC"
//         }
//     }
//     const res = {}
//     const expected = sampleStat
//     const jsonExpected = JSON.stringify(expected)
//     expect(users.getStatsByFilter(req, res)).toBe(jsonExpected);
// })

// test("getStatsBySorting test", () => { 
//     const req = {
//         "body": {
//             "univGpa": ""
//         }
//     }
//     const res = {}
//     const expected = sampleStat
//     const jsonExpected = JSON.stringify(expected)
//     expect(users.getStatsBySorting(req, res)).toBe(jsonExpected);
// })

// test("getStatsByConfiguration test", () => { 
//     const req = {
//         "body": {
//             "univName": "UBC",
//             "univGpa": ""
//         }
//     }
//     const res = {}
//     const expected = sampleStat
//     const jsonExpected = JSON.stringify(expected)
//     expect(users.getStatsByConfiguration(req, res)).toBe(jsonExpected);
// })

// test("updateStat test", () => { 
//     const req = {
//         "body": {
//             "userEmail": "email"
//         }
//     }
//     const res = {}
//     const expected = {
//         "status": `Stat updated for ${req.body.userEmail}`
//     }
//     const jsonExpected = JSON.stringify(expected)
//     expect(users.updateStat(req, res)).toBe(jsonExpected);
// })

// test('sendMeetingRequest test', async (email) => {
//     const expected = {
//         "res" : "Successfully sent notification"
//     }
//     const jsonExpected = JSON.stringify(expected)
//     const res = await users.sendMeetingRequest(email)
//     expect(res).toBe(jsonExpected);
// })

// test('sendMeetingResponse test', (email) => {
//     const expected = {
//         "res" : "Successfully sent notification"
//     }
//     expect(users.sendMeetingResponse(email)).toBe(expected);
// })