/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authTechradar7713fa94UserPoolId = process.env.AUTH_TECHRADAR7713FA94_USERPOOLID
var apiTechradarGraphQLAPIIdOutput = process.env.API_TECHRADAR_GRAPHQLAPIIDOUTPUT
var apiTechradarGraphQLAPIEndpointOutput = process.env.API_TECHRADAR_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const excel = require('exceljs');
const tempfile = require('tempfile');
const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-19', region: process.env.REGION });

const environment = process.env.ENV
const authTechradar7713fa94UserPoolId = process.env.AUTH_TECHRADAR7713FA94_USERPOOLID
const apiTechradarGraphQLAPIIdOutput = process.env.API_TECHRADAR_GRAPHQLAPIIDOUTPUT
const apiTechradarGraphQLAPIEndpointOutput = process.env.API_TECHRADAR_GRAPHQLAPIENDPOINTOUTPUT

console.log(authTechradar7713fa94UserPoolId);
console.log(apiTechradarGraphQLAPIIdOutput);
console.log(apiTechradarGraphQLAPIEndpointOutput);

const dynamodb = new AWS.DynamoDB.DocumentClient();

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


app.post('/jsonToExcel', function (req, res) {
  const workbook = new excel.Workbook(); //creating workbook
  const sheet = workbook.addWorksheet('TechRadarWorksheet'); //creating worksheet

  const currentRadarObj = req.body.currentRadarObj;
  console.log('current radar object: ', currentRadarObj);

  sheet.addRow().values = Object.keys(currentRadarObj[0]);

  currentRadarObj.forEach(function (item) {
    let valueArray = [];
    valueArray = Object.values(item); // forming an array of values of single json in an array
    sheet.addRow().values = valueArray; // add the array as a row in sheet
  });

  try {
    const tempFilePath = tempfile('.csv');
    console.log('tempFilePath : ', tempFilePath);

    workbook.csv.writeFile(tempFilePath).then(function () {
      console.log('file is written');
      // res.setHeader('Content-disposition', 'attachment; filename=tech-radar.xlsx');
      res.sendFile(tempFilePath, function (err) {
        if (err) {
          console.log('error in response: ', res);
          console.error('---------- error downloading file: ', err);
        } else {
          console.log('no error');
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
});

const tableHash = environment === "prod" ? "lvlj5t5honcxdaad7i2gnd3h7m-prod" : "xh2ogkna6nfoppcihalud3uvgq-dev"

const radarTableName = `Radar-${tableHash}`;
const techTableName = `Tech-${tableHash}`;

/********************************
 * HTTP Get method for all Radars where public is true *
 ********************************/

app.get("/public-radar", function (req, res) {

  let queryParams = {
    TableName: radarTableName,
    // KeyConditions: condition,
    FilterExpression: '#isPublic = :isPublic',
    ExpressionAttributeNames: {
      '#isPublic': 'isPublic',
    },
    ExpressionAttributeValues: {
      ':isPublic': true,
    },
  };

  try {
    dynamodb.scan(queryParams, async (err, data) => {
      if (err) {
        res.json({ error: 'Could not load items: ' + err });
      } else {
        const resolvedTech = await Promise.all(
          data.Items.map((radar) =>
            getRadarWithTech(radar).then((data) => {
              console.log(`Inside promise answer`);
              console.log(radar);
              console.log(data);
              return { ...radar, techList: data.Items };
            }),
          ),
        );
        console.log(resolvedTech);
        res.json(resolvedTech);
      }
    });
  } catch (err) {
    res.json({ error: 'Catch: ' + err });
  }
});
async function getRadarWithTech(radar) {
  console.log(`getRadarWithTech ${JSON.stringify(radar)}`);
  let techQueryParams = {
    TableName: techTableName,
    FilterExpression: '#radarId = :radarId',
    ExpressionAttributeNames: {
      '#radarId': 'radarId',
    },
    ExpressionAttributeValues: {
      ':radarId': radar.id,
    },
  };
  return dynamodb.scan(techQueryParams).promise();

}

async function getGroupsForUser(event) {
  // first gets the user attributes from the sub of the user invoking the event
  let userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1]
  let userParams = {
    UserPoolId: authTechradar7713fa94UserPoolId,
    Filter: `sub = "${userSub}"`,
  }
  let userData = await cognito.listUsers(userParams).promise()
  const user = userData.Users[0]
  // next gets the groups for the user invoking the event
  var groupParams = {
    UserPoolId: authTechradar7713fa94UserPoolId,
    Username: user.Username
  }
  const groupData = await cognito.adminListGroupsForUser(groupParams).promise()
  // returns the group data
  return groupData
}

async function getUserWithGroupData(user) {
  // gets the groups for the user
  var groupParams = {
    UserPoolId: authTechradar7713fa94UserPoolId,
    Username: user.Username
  }
  const groupData = await cognito.adminListGroupsForUser(groupParams).promise()
  // returns the group data
  return { ...user, ...groupData }
}

async function canPerformAction(event, group) {
  return new Promise(async (resolve, reject) => {
    if (!event.requestContext.identity.cognitoAuthenticationProvider) {
      return reject('not authorized to perform this action')
    }
    const groupData = await getGroupsForUser(event)
    const groupsForUser = groupData.Groups.map(group => group.GroupName)
    if (groupsForUser.includes(group)) {
      console.log("includes user in group");
      resolve()
    } else {
      reject('user not in group, cannot perform action..')
    }
  })
}

async function getAllUsers() {
  const params = {
    UserPoolId: authTechradar7713fa94UserPoolId
  };

  return new Promise(async (resolve, reject) => {

    cognito.listUsers(params, (err, data) => {

      if (err) {
        console.log(err);
        reject(err);
      } else {
        const allUsersWithGroupData = data.Users.map(async user => {
          return await getUserWithGroupData(user)
        })

        console.log('allUsersWithGroupData', allUsersWithGroupData);
        resolve(allUsersWithGroupData);
      }
    });
  })

}

app.get('/user-admin', async function (req, res) {
  // Add your code here

  try {
    await canPerformAction(req.apiGateway.event, 'admin');
    console.log("canPerformAction")
    const userWithGroupData = await getAllUsers();
    const response = await Promise.all(userWithGroupData).then( data => {
      console.log("res: ", data);
      return data;
    })
    res.json(response);
  } catch (err) {
    return { error: err }
  }


});

// app.delete('/user-admin/delete', async function (req, res) {
//   var params = {
//     UserPoolId: authTechradar7713fa94UserPoolId /* required */,
//     Username: req.body.username /* required */,
//   };

//   try {
//     await canPerformAction(req.apiGateway.event, 'admin');
//     cognito.adminDeleteUser(params, function (err, data) {
//       if (err) {
//         res.json({ success: null, error: err, url: req.url });
//       } else {
//         res.json({ success: data, error: null, url: req.url });
//       }
//     });
//   } catch(err) {
//       res.json({ error: err })
//   }
// });

app.post('/set-admin', async function (req, res) {

  await canPerformAction(req.apiGateway.event, 'admin');
  console.log("canPerformAction")

  var params = {
    GroupName: 'admin', //The name of the group in you cognito user pool that you want to add the user to
    UserPoolId: authTechradar7713fa94UserPoolId, 
    Username: req.body.Username
  };

  cognito.adminAddUserToGroup(params, function (err, data) {
    if (err) {
      res.json({ success: null, error: err, url: req.url });
    } else {
      res.json(data);
    }
  });
});


app.delete('/user-admin/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
