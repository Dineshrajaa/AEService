define({
  "api": [
    {
      "type": "post",
      "url": "/Users",
      "title": "Signup with Aesthetic Pro",
      "version": "1.0.0",
      "name": "signup",
      "group": "Account",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows new user signup</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "FirstName",
              "description": "<p>FirstName of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "LastName",
              "description": "<p>LastName of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Password",
              "description": "<p>Plaintext password of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ConfirmPassword",
              "description": "<p>Plaintext Confirm Password of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "EmailId",
              "description": "<p>EmailId of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ConfirmEmail",
              "description": "<p>Confirm Email of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Role",
              "description": "<p>User role <b>'business'</b> for pro user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Gender",
              "description": "<p>Gender of user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "Address",
              "description": "<p>Address of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "Town",
              "description": "<p>Town of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "City",
              "description": "<p>City of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "PostCode",
              "description": "<p>PostCode of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "Profile",
              "description": "<p>Profile of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "TagLine",
              "description": "<p>TagLine of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "DOB",
              "description": "<p>DOB of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "IsActive",
              "description": "<p>Activity of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "Date",
              "optional": false,
              "field": "CreateDate",
              "description": "<p>CreateDate of the user</p>"
            },
            {
              "group": "Parameter",
              "type": "Date",
              "optional": false,
              "field": "ModifyDate",
              "description": "<p>ModifyDate of the user (same as created date)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"user":{"FirstName":"Aesthetic","LastName":"Tester","Password":"+9scs3az8vA3QYQ15qE9pg==","ConfirmPassword":"Test1234?","EmailId":"aesthetictester@gmail.com","Role":"business","UserImage":"upload/user/UserDefault.png","ConfirmEmail":"aesthetictester@gmail.com","Gender":"male","Address":null,"Town":null,"City":null,"PostCode":0,"Profile":null,"TagLine":null,"DOB":null,"IsActive":null,"CreateDate":"2017-07-15 12:08:42","ModifyDate":"2017-07-15 12:08:42","OrgId":42,"UserId":201},"ResponseMessage":"New user created successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "post",
      "url": "/Users/Login",
      "title": "Signin to Aesthetic Pro",
      "version": "1.0.0",
      "name": "signin",
      "group": "Account",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows new user signin</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "EmailId",
              "description": "<p>Email of user (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Password",
              "description": "<p>Password of user (required)</p>"
            }
          ]
        }
      }
    }, {
      "type": "get",
      "url": "/Followers/:OrgId",
      "title": "Get Followers list",
      "version": "1.0.0",
      "name": "List Followers",
      "group": "Followers",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Followers based on the Organization ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '[{"FirstName":"Rajkumar","LastName":"rathore","DOB":"1990-05-05T00:00:00.000Z","UserImage":"Upload/User/527575.png","FavouriteId":67,"OrgId":2,"UserId":149},{"FirstName":"Jane","LastName":"Austin","DOB":"2017-10-31T18:30:00.000Z","UserImage":"Upload/User/3d120b76-d6de-4645-aefa-a2caa2c5d272.png","FavouriteId":80,"OrgId":2,"UserId":177}]',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Followers"
    }, {
      "type": "post",
      "url": "/Organization",
      "title": "Register Organization data",
      "version": "1.0.0",
      "name": "Register Organization",
      "group": "Organization",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to provide business info after signup</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgOwner",
              "description": "<p>Organization Owner (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgAddress",
              "description": "<p>Organization Address (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "City",
              "description": "<p>Organization City (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Country",
              "description": "<p>Organization Country (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "PostCode",
              "description": "<p>Organization PostCode (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>Organization ID received during initial signup (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>User ID received during initial signup (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Saved Business info Successfully!!!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "post",
      "url": "/PutUserImage",
      "title": "Update User data after signup",
      "version": "1.0.0",
      "name": "Update User dat",
      "group": "Account",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to update personal info after signup</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "FirstName",
              "description": "<p>FirstName of the User (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "LastName",
              "description": "<p>LastName of the User (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Gender",
              "description": "<p>Gender of the User (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Address",
              "description": "<p>Address of the User (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Town",
              "description": "<p>Town/City of the User (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "PostCode",
              "description": "<p>PostCode of the User (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Profile",
              "description": "<p>Profile of the User (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "DOB",
              "description": "<p>DOB of the User (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Updated Successfully!!!"}',
            "type": "json"
          }
        ]
      }
    }
  ]
});
