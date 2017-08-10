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
      "groupTitle": "Clients"
    }, {
      "type": "get",
      "url": "/Posts/:OrgId",
      "title": "Get all the Posts of a Business user",
      "version": "1.0.0",
      "name": "List Posts",
      "group": "MyPosts",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Posts based on the Organization ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"data":[{"PostId":20,"OrgId":2,"PostMessage":"I went to a visual arts high school and focused on film \rphotography. Ever since, I’ve loved capturing my life. \r\nABC ","IsFavourite":0,"PostTime":"2016-09-30T13:30:09.000Z","CreateDate":"2016-09-09T13:30:09.000Z","ModifyDate":"2016-09-09T13:30:09.000Z","PostImage":null},{"PostId":28,"OrgId":2,"PostMessage":"Hi Dinesh","IsFavourite":null,"PostTime":"2017-07-30T03:01:34.000Z","CreateDate":"2017-07-30T03:01:34.000Z","ModifyDate":null,"PostImage":null}]}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "MyPosts"
    }, {
      "type": "post",
      "url": "/Posts",
      "title": "Add Post",
      "version": "1.0.0",
      "name": "Add Post",
      "group": "MyPosts",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Posts</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "PostMessage",
              "description": "<p>Post Message (required)</p>"
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
              "field": "PostTime",
              "description": "<p>Date or time Post which was created(needed to avoid TimeZone issue) (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CreateDate",
              "description": "<p>Created Date (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "PostImage",
              "description": "<p>Image as base64 (required for image post/optional for text post)</p>"
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
      "url": "/Notes",
      "title": "Add Note",
      "version": "1.0.0",
      "name": "Add Note",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Notes about a Client</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ClientId",
              "description": "<p>ClientId of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "Date",
              "optional": false,
              "field": "NoteDate",
              "description": "<p>Date of the Creation of Note (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "NoteDesc",
              "description": "<p>Note Description (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "NoteText",
              "description": "<p>Note Title (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"note_":{"ClientId":"28","NoteDate":"2017-08-09T06:27:17.730Z","NoteText":"Testing Note","NoteDesc":"Test Notes list","NoteId":1},"ResponseMessage":"Added Note successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "/Notes/:ClientId",
      "title": "List Notes",
      "version": "1.0.0",
      "name": "List Notes",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Notes based on the Client ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"ClientId":"28","NoteDate":"2017-08-09T00:57:17.000Z","NoteText":"Testing Note","NoteId":1,"NoteDesc":"Test Notes list"}],"ResponseMessage":"Listed Client Successfully"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Clients"
    }, {
      "type": "post",
      "url": "/Users/ResetPassword",
      "title": "Reset Password",
      "version": "1.0.0",
      "name": "Reset Password",
      "group": "Account",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to Reset their Password</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "EmailId",
              "description": "<p>EmailId of the User (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Reset Password has been emailed Successfully!!!"}',
            "type": "json"
          }
        ]
      }
    }
  ]
});
