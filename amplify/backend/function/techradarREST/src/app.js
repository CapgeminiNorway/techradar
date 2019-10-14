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

const CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-19', region: process.env.REGION});

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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


app.post('/jsonToExcel', function(req, res) {
  const workbook = new excel.Workbook(); //creating workbook
  const sheet = workbook.addWorksheet('TechRadarWorksheet'); //creating worksheet

  const currentRadarObj = req.body.currentRadarObj;
  console.log('current radar object: ', currentRadarObj);

  sheet.addRow().values = Object.keys(currentRadarObj[0]);

  currentRadarObj.forEach(function(item) {
    let valueArray = [];
    valueArray = Object.values(item); // forming an array of values of single json in an array
    sheet.addRow().values = valueArray; // add the array as a row in sheet
  });

  try {
    const tempFilePath = tempfile('.csv');
    console.log('tempFilePath : ', tempFilePath);

    workbook.csv.writeFile(tempFilePath).then(function() {
      console.log('file is written');
      // res.setHeader('Content-disposition', 'attachment; filename=tech-radar.xlsx');
      res.sendFile(tempFilePath, function(err) {
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

app.get("/public-radar", function(req, res) {

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

app.get('/user-admin', function(req, res) {
  // Add your code here
  var params = {
    UserPoolId: authTechradar7713fa94UserPoolId
  };
  CognitoIdentityServiceProvider.listUsers(params, (err, data) => {

    if (err) {
      console.log(err);
      res.json({ success: null, error: err, url: req.url });
    } else {
      let userWithGroup = []
      
      for (let i = 0; i < data.Users.length; i++) {
        const userParams = {
          ...params,
          Username: data.Users.Username
        }
        CognitoIdentityServiceProvider.adminListGroupsForUser(userParams, function(_err, _data) {
          console.log("adminGetGroup: " + _data);
          userWithGroup.push({
            ...data.Users,
            ..._data
          })
        })
     };
    
      console.log('data', data);
      res.json({ success: userWithGroup, error: null, url: req.url });
    }
  });
});

app.delete('/user-admin/delete', function(req, res) {
  var params = {
    UserPoolId: authTechradar7713fa94UserPoolId /* required */,
    Username: req.body.username /* required */,
  };
  CognitoIdentityServiceProvider.adminDeleteUser(params, function(err, data) {
    if (err) {
      res.json({ success: null, error: err, url: req.url });
    } else {
      res.json({ success: data, error: null, url: req.url });
    }
  });
});

app.post('/user-admin/update', function(req, res) {
  var params = {
    UserAttributes: [
      {
        Name: req.body.UserAttribute, //'YOUR_USER_ATTRIBUTE_NAME',
        Value: 'YOUR_USER_ATTRIBUTE_VALUE'
      }
    ],
    UserPoolId: authTechradar7713fa94UserPoolId /* required */,
    Username: req.body.username /* required */,
  };
  
  CognitoIdentityServiceProvider.adminUpdateUserAttributes(params, function(err, data) {
      if (err) {
        res.json({ success: null, error: err, url: req.url });
      } else {
        res.json({ success: data, error: null, url: req.url });
      }
    });
});
  

app.delete('/user-admin/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
