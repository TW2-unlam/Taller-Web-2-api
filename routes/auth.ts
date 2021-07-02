var express = require('express');
var router = express.Router();

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
//var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

 import * as AWS from 'aws-sdk';
// const AWS = require('aws-sdk');

 import { SignupRequest } from '../signupRequest'
// var SignupRequest = require('../signupRequest.ts');

global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : process.env.USER_POOL_ID!,   
    ClientId : process.env.CLIENT_ID! 
}; 

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

router.post('/signup', (req: any, res: any) => {
    console.log("JSON:" + JSON.stringify(req.body));
    let request: SignupRequest = req.body;

    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:request.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:request.name}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name",Value:request.family_name}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:request.address}));

    userPool.signUp(request.email, request.password, attributeList, [], function(err: any, result: any){
        if (err) {
            console.log(err);
            res.json(err);
            return;
        }
        let cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        res.json({
            bienvenido: `${cognitoUser.getUsername()}`
        })
    });
   
});

router.post("/login", (req: any, res: any) => {
    const loginData = {
        Username: req.body.email,
        Password: req.body.password,
    }

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginData)

    const userData = {
        Username: req.body.email,
        Pool: userPool
    }

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: data => {
            var user_data = {
                name: data.getIdToken().decodePayload().name,
                family_name: data.getIdToken().decodePayload().family_name,
                email: data.getIdToken().decodePayload().email,
            }

            var response_data = {
                jwt: data.getIdToken().getJwtToken(),
                user: user_data
            }
            res.json( response_data );
        },
        onFailure: err => {
            console.log(err);
            res.json(err);
            return;
        }
    })
});

module.exports = router;