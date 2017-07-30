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
            "content": '{"data":[{"FirstName":"Jane","LastName":"Austin","DOB":"2017-10-31T18:30:00.000Z","UserImage":"Upload/User/3d120b76-d6de-4645-aefa-a2caa2c5d272.png","City":null,"FavouriteId":80,"OrgId":2,"UserId":177,"isClient":1},{"FirstName":"Rajkumar","LastName":"rathore","DOB":"1990-05-05T00:00:00.000Z","UserImage":"Upload/User/527575.png","City":null,"FavouriteId":67,"OrgId":2,"UserId":149,"isClient":27},{"FirstName":"Rippon","LastName":"Medical","DOB":"0000-00-00 00:00:00","UserImage":"Upload/User/profilepic.png\r\n","City":"ddd","FavouriteId":81,"OrgId":2,"UserId":4,"isClient":null}]}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Followers"
    }, {
      "type": "get",
      "url": "Organization/GetById?id=:OrgId",
      "title": "Get Organization info",
      "version": "1.0.0",
      "name": "Fetch Organization info",
      "group": "Organization",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get details based on the Organization ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"organization":{"OrgId":46,"OrgName":"Aesthetic Pro","OrgImage":"http://xxxxxnull","OrgAddress":"cbe","OrgTitle":null,"OrgPhone":null,"OrgDesc":"test desc","CreateDate":"2017-07-18T08:32:50.000Z","ModifyDate":"2017-07-18T08:32:50.000Z","City":"cbe","Country":"india","Feedback":null,"RegistrationNo":"12345","Longitude":null,"Latitude":null,"OrgOwner":"test123lasttest","OrgCoverImage":"http://xxxxxnull","Profession":"test","PostCode":641004},"ResponseMessage":"Wow!! you are so passionate about your OrganizationRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Organization"
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
              "field": "OrgName",
              "description": "<p>Organization Name (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Profession",
              "description": "<p>Profession of the Organization (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "RegistrationNo",
              "description": "<p>RegistrationNo of the Organization (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgDesc",
              "description": "<p>Organization Description (required)</p>"
            },
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
      "name": "Update User data",
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
    }, {
      "type": "post",
      "url": "/Clients",
      "title": "Add Client",
      "version": "1.0.0",
      "name": "Add Client",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Client</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>Organisation ID (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "FavouriteId",
              "description": "<p>Favourite id of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CreateDate",
              "description": "<p>Created Date (required)</p>"
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
    }, {
      "type": "get",
      "url": "/Clients/:OrgId",
      "title": "Get Clients list",
      "version": "1.0.0",
      "name": "List Clients",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Clients based on the Organization ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"clientlist":[{"ClientId":1,"OrgId":2,"UserId":177,"FavouriteId":80,"CreateDate":"2017-07-02T15:44:34.000Z","CreatedBy":200,"IsActive":1,"ModifiedDate":"2017-07-02T15:44:34.000Z","ModifiedBy":null,"FirstName":null,"LastName":null,"DOB":"0000-00-00 00:00:00","Address":null,"PostCode":null,"Town":null,"UserImage":null}],"ResponseMessage":"Wow!! you are so passionate about your Clients"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Followers"
    }
  ]
});
