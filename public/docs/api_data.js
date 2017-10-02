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
      "type": "put",
      "url": "/Clients/:ClientId",
      "title": "Update Client info",
      "version": "1.0.0",
      "name": "Update Client",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Update Client Info</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ClientId",
              "description": "<p>ClientId of the Client to be sent in URL(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "FirstName",
              "description": "<p>FirstName of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "LastName",
              "description": "<p>LastName of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "Date",
              "optional": false,
              "field": "DOB",
              "description": "<p>DOB of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Address",
              "description": "<p>Address of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Town",
              "description": "<p>Town of the Client (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "PostCode",
              "description": "<p>PostCode of the Client (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Updated Client info Successfully"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "delete",
      "url": "/Clients/:ClientId",
      "title": "Delete the Client",
      "version": "1.0.0",
      "name": "Delete Client",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Delete Client</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Deleted Client Successfully"}',
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
      "url": "/Posts/:OrgId/:input/:country/:pagenumber/:limit",
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
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrganizationID for whom Posts has to be retrieved <strong>false</strong> if need to list every post(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "input",
              "description": "<p>Searchbox value <strong>false</strong> if no text value is available(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "country",
              "description": "<p>Country based filtering  <strong>false</strong> if no Country value is available(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "pagenumber",
              "description": "<p>Used for pagination (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "limit",
              "description": "<p>Number of posts to be listed</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"data":[{"FirstName":"Aesthetic","LastName":"Tester","UserImage":"upload/user/UserDefault.png","PostId":39,"PostMessage":null,"PostTime":"2017-08-03T11:57:03.000Z","PostImage":null,"CreateDate":"2017-08-02T18:30:00.000Z","ModifyDate":null,"DisplayTime":"11 days","CountOfComment":0},{"FirstName":"Aesthetic","LastName":"Tester","UserImage":"upload/user/UserDefault.png","PostId":40,"PostMessage":null,"PostTime":"2017-08-03T12:00:27.000Z","PostImage":"Upload/Post/696598.png","CreateDate":"2017-08-02T18:30:00.000Z","ModifyDate":null,"DisplayTime":"11 days","CountOfComment":0},{"FirstName":"Aesthetic","LastName":"Tester","UserImage":"upload/user/UserDefault.png","PostId":41,"PostMessage":null,"PostTime":"2017-08-03T12:03:45.000Z","PostImage":"Upload/Post/242798.png","CreateDate":"2017-08-02T18:30:00.000Z","ModifyDate":null,"DisplayTime":"11 days","CountOfComment":0}],"paginationData":{"page":4,"pageSize":3,"rowCount":13,"pageCount":5}}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "MyPosts"
    }, {
      "type": "get",
      "url": "/Client/:ClientId",
      "title": "Get Client info",
      "version": "1.0.0",
      "name": "Get Client info",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get Client info based on the Client ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Got Client info Successfully","data":{"ClientId":28,"OrgId":2,"UserId":149,"FavouriteId":69,"CreateDate":"2017-08-17T10:00:00.000Z","CreatedBy":null,"IsActive":1,"ModifiedDate":"2017-08-08T14:33:21.000Z","ModifiedBy":null,"FirstName":"Dinesh","LastName":"Raja","DOB":"2017-08-17T04:25:59.000Z","Address":"4/517 A,Jeeva Nagar","PostCode":642126,"Town":"Udumalpet","UserImage":null}}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Clients"
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
      "type": "delete",
      "url": "/Notes/:NoteId",
      "title": "Delete Note",
      "version": "1.0.0",
      "name": "Delete Note",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Delete Note</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Deleted Note Successfully"}',
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
    },
    {
      "type": "post",
      "url": "/Users/ChangePassword",
      "title": "Change Password",
      "version": "1.0.0",
      "name": "Change Password",
      "group": "Account",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to Change their Password</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "oldPassword",
              "description": "<p>oldPassword of the User (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Newpassword",
              "description": "<p>Newpassword of the User (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User (required)</p>"
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
    }, {
      "type": "post",
      "url": "/Treatment",
      "title": "Add Treatment",
      "version": "1.0.0",
      "name": "Add Treatment",
      "group": "Treatment",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to Add Treatment</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Desc",
              "description": "<p>Description about the Treatment (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "TreatmentName",
              "description": "<p>Title of the Treatment(required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the User (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"OrgId":"42","TreatmentName":"Massage","Desc":"Relax your body by doing Massage","TreatmentIdPrimary":7},"ResponseMessage":"Added Treatment successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "Treatment/GetByOrgId?OrgId=:OrgId",
      "title": "List Treatments",
      "version": "1.0.0",
      "name": "Get List of Treatments of an Organization",
      "group": "Treatment",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get List of Treatments of an Organization by Organization ID</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>Organization ID to be sent in URL as QueryString (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstTreatment":[{"TreatmentId":7,"Desc":"Relax your body by doing Massage","TreatmentName":"Massage","OrgId":42}],"ResponseMessage":"Wow!! you are so passionate about your TraetmentRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Treatment"
    }, {
      "type": "post",
      "url": "/Review/PostReview",
      "title": "Add Review",
      "version": "1.0.0",
      "name": "Add Review",
      "group": "Review",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to Add Review</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the Review adder (required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ReviewComment",
              "description": "<p>Review Text(required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the User (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"review_":{"UserId":"201","OrgId":"42","ReviewComment":"Hi Dinesh","ReviewTime":"2017-08-16 20:39:41","CreateDate":"2017-08-16 20:39:41","ModifyDate":"2017-08-16 20:39:41","ReviewId":17},"ResponseMessage":"Review insert successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "/Review/GetReviewByOrgId?id=:OrgId",
      "title": "Get Review list of the Organization",
      "version": "1.0.0",
      "name": "List Reviews",
      "group": "Review",
      "permission": [
        {
          "name": "Universal"
        }
      ], "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>Organization ID to be sent in URL as QueryString (required)</p>"
            }
          ]
        }
      },
      "description": "<p>Get list of Reviews based on the Organization ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstReview":[{"ReviewId":16,"UserId":201,"OrgId":42,"ReviewComment":"Testing Review from Post man","ReviewTime":"2017-08-10T12:24:19.000Z","CreateDate":"2017-08-10T12:24:19.000Z","ModifyDate":"2017-08-10T12:24:19.000Z","Attachment":"http://xxxxxnull","UserAccount":null,"OrgImage":null,"OrgName":null,"address":"null, null","UserImage":"http://xxxxxupload/user/UserDefault.png","FirstName":"Aesthetic","LastName":"Tester","CommentOfCount":0,"Fullname":"Aesthetic Tester","DisplayTime":"6 days"},{"ReviewId":17,"UserId":201,"OrgId":42,"ReviewComment":"Hi Dinesh","ReviewTime":"2017-08-16T15:09:41.000Z","CreateDate":"2017-08-16T15:09:41.000Z","ModifyDate":"2017-08-16T15:09:41.000Z","Attachment":"http://xxxxxnull","UserAccount":null,"OrgImage":null,"OrgName":null,"address":"null, null","UserImage":"http://xxxxxupload/user/UserDefault.png","FirstName":"Aesthetic","LastName":"Tester","CommentOfCount":0,"Fullname":"Aesthetic Tester","DisplayTime":"8 Minutes"}],"ResponseMessage":"Wow!! you are so passionate about your ReviewRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Review"
    }, {
      "type": "post",
      "url": "/FeedBack",
      "title": "Send Feedback",
      "version": "1.0.0",
      "name": "Send Feedback",
      "group": "Feedback",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Feedback</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId to be sent as Query String (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": true,
              "field": "Attachment",
              "description": "<p>Image file if any (base64)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "FeedBackCategory",
              "description": "<p>Category of the Feedback (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "message",
              "description": "<p>Feed back message (required)</p>"
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
      "url": "/Gallery",
      "title": "Add Picture",
      "version": "1.0.0",
      "name": "Add Picture",
      "group": "Gallery",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Pictures</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the Creator (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "Date",
              "optional": false,
              "field": "picture",
              "description": "<p>picture in base64 format (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"Photos":"Upload/Gallery/704743.png","GalleryId":4},"ResponseMessage":"Uploaded Picture Successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "Gallery/GetGalleryById?Id=:OrgId",
      "title": "List Gallery Photos",
      "version": "1.0.0",
      "name": "Get List of Treatment Photos",
      "group": "Gallery",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get List of Treatment Photos of an Organization by OrgId ID</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>Organization ID to be sent in URL as QueryString (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstgallery":[{"GalleryId":1,"Photos":"Upload/Gallery/gallerya.png","OrgId":1},{"GalleryId":2,"Photos":"Upload/Gallery/galleryb.png","OrgId":1},{"GalleryId":3,"Photos":"Upload/Gallery/804333.png","OrgId":1}],"ResponseMessage":"Wow!! you are so passionate about your GalleryRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Treatment"
    }, {
      "type": "get",
      "url": "Client/treatment/:ClientId",
      "title": "List Treatment Photos of Client",
      "version": "1.0.0",
      "name": "Get List of Treatment Photos of Client",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get List of Treatment Photos of an Client by Client ID</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>ClientId to be sent in URL as QueryString (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"ClientId":28,"PictureId":1,"Picture":"Upload/Client/105126.png"}],"ResponseMessage":"Wow!! you are so passionate about your Client Treatment"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Client"
    }, {
      "type": "post",
      "url": "Client/treatment/:ClientId",
      "title": "Add Treatment photo for a Client",
      "version": "1.0.0",
      "name": "Add Treatment Photo",
      "group": "Client",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows user to Add Treatment photo to an Client Profile</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Picture",
              "description": "<p>Treatment picture as base64(required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ClientId",
              "description": "<p>ClientId of the Client to be sent in URL (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"ClientId":"28","PictureId":2},"ResponseMessage":"Added Treatment Photo successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "post",
      "url": "/Favourite",
      "title": "Add Favourite",
      "version": "1.0.0",
      "name": "Add Favourite",
      "group": "Favourite",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Favourite</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User who is adding a Favourite (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>Organisation ID (required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Favourite added successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "Users/GetById?id=:UserId",
      "title": "Get Profile info of the user",
      "version": "1.0.0",
      "name": "Fetch User info",
      "group": "Account",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get details based on the User ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"userAccount":{"UserId":1,"UserImage":"Upload/User/cecilcinross.png\r\n","FirstName":"Jay","LastName":"Pocoyo","Password":"LkrEHfiqrxPh6rvJA0EfUQ==","ConfirmPassword":"LkrEHfiqrxPh6rvJA0EfUQ==","EmailId":"newindmin.a@gmail.com","ConfirmEmail":"newindsmin.a@gmail.com","Gender":"Male","Town":"ddd","City":"ddd","Role":"User","CreateDate":null,"ModifyDate":null,"Address":"gggg","PostCode":123,"Profile":"a","DOB":"0000-00-00 00:00:00","IsActive":null,"TagLine":"I went to a visual arts high school and focused on film \rphotography. Ever since, I’ve loved capturing my life","OrgId":null,"businessInfoFound":null},"ResponseMessage":"Wow!! you are so passionate about your UserAccountRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Organization"
    }, {
      "type": "put",
      "url": "/Organization/:OrgId",
      "title": "Update Organization Cover photo",
      "version": "1.0.0",
      "name": "Update Organization",
      "group": "Organization",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Update Cover photo</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the Organization to be sent in URL(required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgCoverImage",
              "description": "<p>OrgCoverImage of the Organization to be sent as base64 string(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Organization Cover Updated Successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "post",
      "url": "/ReviewComment",
      "title": "Add Review Comment",
      "version": "1.0.0",
      "name": "Add Review Comment",
      "group": "Review",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization/User to Add Comments to an Review</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User who is adding a Comment over a Review (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ReviewId",
              "description": "<p>Review ID to which you are commenting(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ReviewCommentMsg",
              "description": "<p>Review Message(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ReviewCommentImage",
              "description": "<p>Review image in base64 format(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Review Comment added successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "post",
      "url": "/Comment",
      "title": "Add Comment for a Post",
      "version": "1.0.0",
      "name": "Add Post Comment",
      "group": "Posts",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization/User to Add Comments to a Post</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User who is adding a Comment over a Review (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "PostId",
              "description": "<p>Post ID to which User is commenting(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CommentMsg",
              "description": "<p>Review Message(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CommentImage",
              "description": "<p>Comment image in base64 format(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Comment added successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "Comment/GetById?id=:PostId",
      "title": "Get list of comments of the post",
      "version": "1.0.0",
      "name": "Fetch Comments list",
      "group": "Posts",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Comments of a Post</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstComment":[{"CommentId":19,"PostId":20,"UserId":149,"CommentMsg":"ok","CommentImage":"0","UserName":"Rajkumar rathore","UserImage":"Upload/User/527575.png","FirstName":"Rajkumar","LastName":"rathore","City":null,"ReviewComment":null,"ReviewTime":"0001-01-01T00:00:00","ReviewCommentId":0,"CommentCount":0,"PostTime":"0001-01-01T00:00:00","DisplayTime":"7 months","CommentTime":"2017-03-24T06:48:23.000Z","CreateDate":null,"ModifyDate":null,"PostGet":null,"UserAccount":null},{"CommentId":20,"PostId":20,"UserId":149,"CommentMsg":"test","CommentImage":"0","UserName":"Rajkumar rathore","UserImage":"Upload/User/527575.png","FirstName":"Rajkumar","LastName":"rathore","City":null,"ReviewComment":null,"ReviewTime":"0001-01-01T00:00:00","ReviewCommentId":0,"CommentCount":0,"PostTime":"0001-01-01T00:00:00","DisplayTime":"7 months","CommentTime":"2017-03-25T13:03:40.000Z","CreateDate":null,"ModifyDate":null,"PostGet":null,"UserAccount":null}],"ResponseMessage":"Wow!! you are so passionate about your CommentRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Posts"
    }, {
      "type": "get",
      "url": "ReviewComment/GetReviewCommentById?id=:ReviewId",
      "title": "Get list of comments of the post",
      "version": "1.0.0",
      "name": "Fetch Comments list",
      "group": "Review",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Comments of a Review</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstReviewComment":[{"ReviewCommentId":1,"ReviewId":55,"UserId":149,"ReviewCommentMsg":"hello","ReviewCommentImage":null,"ReviewCommentTime":"2017-03-08T14:19:46.000Z","ReviewCreateDate":"2017-03-08T14:19:46.000Z","ReviewModifyDate":"2017-03-08T14:19:46.000Z","UserImage":"Upload/User/527575.png","FirstName":"Rajkumar","LastName":"rathore","FullName":"Rajkumar rathore","DisplayTime":"7 months"}],"ResponseMessage":"Wow!! you are so passionate about your lstReviewCommentRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Review"
    }, {
      "type": "post",
      "url": "/Comment/Update",
      "title": "Update Comment for a Post",
      "version": "1.0.0",
      "name": "Update Post Comment",
      "group": "Posts",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization/User to Update Comments</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User who is adding a Comment over a Review (required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CommentId",
              "description": "<p>Comment ID you need to update(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CommentMsg",
              "description": "<p>Review Message(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "CommentImage",
              "description": "<p>Comment image in base64 format(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Comment updated successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "Comment/Delete?id=:CommentID",
      "title": "Delete comment of the post",
      "version": "1.0.0",
      "name": "Delete Comment",
      "group": "Posts",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Delete a Comment of a Post</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Deleted Successfully"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Posts"
    }, {
      "type": "get",
      "url": "/GetAllCategories",
      "title": "List all Categories",
      "version": "1.0.0",
      "name": "List Categories",
      "group": "Categories",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List Categories</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstCategories":[{"CatId":1,"CatName":"Body","CatImage":"Upload/Category/girl3.png\r\n\r\n","OrgId":1},{"CatId":2,"CatName":"Face","CatImage":"Upload/Category/girl4.png\r\n","OrgId":1}],"ResponseMessage":"Wow!! you are so passionate about your Categories Repository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Categories"
    }, {
      "type": "get",
      "url": "/Categories/GetCategoryWithSubCategory",
      "title": "List all Categories with SubCategories",
      "version": "1.0.0",
      "name": "List Categories with SubCategories",
      "group": "Categories",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List Categories with SubCategories</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstComment":[{"CatId":1,"CatName":"Body","CatImage":"Upload/Category/girl3.png\r\n\r\n","OrgId":1,"SubCategories":[{"SubcatId":2,"SbCatName":"Cellulite Treatment","CatId":1},{"SubcatId":3,"SbCatName":"Moisturisers","CatId":1}]},{"CatId":2,"CatName":"Face","CatImage":"Upload/Category/girl4.png\r\n","OrgId":1,"SubCategories":[]}],"ResponseMessage":"Wow!! you are so passionate about your CommentRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Categories"
    }, {
      "type": "post",
      "url": "/Item",
      "title": "Add Item",
      "version": "1.0.0",
      "name": "Add Item",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Item</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the Organization who is adding a Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemName",
              "description": "<p>Name of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemDiscp",
              "description": "<p>Description of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemPrice",
              "description": "<p>Price of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "subcatId",
              "description": "<p>Subcategory to which Product belongs to(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemQuantity",
              "description": "<p>Quantity of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "EstDelivery",
              "description": "<p>Estimated Delivery Time of the Product in days(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemCurrency",
              "description": "<p>Euro or Dollars(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemOfferPrice",
              "description": "<p>Offer Price of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "Timestamp",
              "optional": false,
              "field": "OfferValidTill",
              "description": "<p>Offer Valid till as Timestamp(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Returns",
              "description": "<p>Return of Product 'Accepted' or 'Not Accepted'(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemImage",
              "description": "<p>Item Picture as Base64 string</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemPrice":"2000","subcatId":"2","ItemQuantity":"3","EstDelivery":"3 days","ItemCurrency":"Dollars","ItemOfferPrice":"1800","OfferValidTill":null,"Returns":"Accepted","OrgId":"12","ItemID":37},"ResponseMessage":"Added Item successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "/Item/:OrgId",
      "title": "List all Items of an Organization",
      "version": "1.0.0",
      "name": "List all Items of an Organization",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List all Items of an Organization</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"ItemID":37,"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemImage":null,"ItemPrice":2000,"subcatId":2,"ItemQuantity":3,"EstDelivery":"3 days","Returns":"Accepted","ItemCurrency":"Dollars","ItemOfferPrice":1800,"OfferValidTill":"2017-09-09T13:35:43.000Z","OrgId":12}],"Message":"Fetched Posts."}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "My Shop"
    }, {
      "type": "get",
      "url": "/Order/:OrgId",
      "title": "List all Items of an Organization",
      "version": "1.0.0",
      "name": "List all Items of an Organization",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List all Items of an Organization</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"ItemID":37,"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemImage":null,"ItemPrice":2000,"subcatId":2,"ItemQuantity":3,"EstDelivery":"3 days","Returns":"Accepted","ItemCurrency":"Dollars","ItemOfferPrice":1800,"OfferValidTill":"2017-09-09T13:35:43.000Z","OrgId":12}],"Message":"Fetched Posts."}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "My Shop"
    }, {
      "type": "put",
      "url": "/Organization/terms/:OrgId",
      "title": "Update Organization Terms and Condition",
      "version": "1.0.0",
      "name": "Update Organization Terms",
      "group": "Organization",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Update Terms and Condition</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the Organization to be sent in URL(required)</p>"
            }, {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "TermsAndCondition",
              "description": "<p>TermsAndCondition of the Organization(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Organization Terms Updated Successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "Item/GetByItemId?id=:ItemId",
      "title": "Get Item info",
      "version": "1.0.0",
      "name": "Fetch Item info",
      "group": "My Shop",
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
      "groupTitle": "My Shop"
    }, {
      "type": "put",
      "url": "/Item",
      "title": "Update Item",
      "version": "1.0.0",
      "name": "Update Item",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Update Item</p>",
      "parameter": {
        "fields": {
          "Parameter": [

            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemID",
              "description": "<p>ItemID of the Item to be updated(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "OrgId",
              "description": "<p>OrgId of the Organization who is adding a Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemName",
              "description": "<p>Name of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemDiscp",
              "description": "<p>Description of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemPrice",
              "description": "<p>Price of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "subcatId",
              "description": "<p>Subcategory to which Product belongs to(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemQuantity",
              "description": "<p>Quantity of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "EstDelivery",
              "description": "<p>Estimated Delivery Time of the Product in days(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemCurrency",
              "description": "<p>Euro or Dollars(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemOfferPrice",
              "description": "<p>Offer Price of the Product(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "Timestamp",
              "optional": false,
              "field": "OfferValidTill",
              "description": "<p>Offer Valid till as Timestamp(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Returns",
              "description": "<p>Return of Product 'Accepted' or 'Not Accepted'(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemImage",
              "description": "<p>Item Picture as Base64 string</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemPrice":"2000","subcatId":"2","ItemQuantity":"3","EstDelivery":"3 days","ItemCurrency":"Dollars","ItemOfferPrice":"1800","OfferValidTill":null,"Returns":"Accepted","OrgId":"12","ItemID":37},"ResponseMessage":"Added Item successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "delete",
      "url": "/Item/:ItemID",
      "title": "Delete the Item",
      "version": "1.0.0",
      "name": "Delete Item",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Delete Item</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Deleted Item Successfully"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "post",
      "url": "/Item",
      "title": "Place Order",
      "version": "1.0.0",
      "name": "Place Order",
      "group": "Order",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to place Order</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the user who is placing an Order(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "Object[]",
              "optional": false,
              "field": "items",
              "description": "<p>Object Array holding the Order Items(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemId",
              "description": "<p>ItemId of the Order Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemQuantity",
              "description": "<p>ItemQuantity of the Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemRate",
              "description": "<p>ItemRate of the Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemCurrency",
              "description": "<p>ItemCurrency of the Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "BasketId",
              "description": "<p>BasketId of the Item(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemPrice":"2000","subcatId":"2","ItemQuantity":"3","EstDelivery":"3 days","ItemCurrency":"Dollars","ItemOfferPrice":"1800","OfferValidTill":null,"Returns":"Accepted","OrgId":"12","ItemID":37},"ResponseMessage":"Placed Order successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "/SubCategory/GetSubCategoryByCategoryId?id=:CatID",
      "title": "List all SubCategories",
      "version": "1.0.0",
      "name": "List all SubCategories",
      "group": "Categories",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List SubCategories of Categories</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstComment":[{"CatId":1,"CatName":"Body","CatImage":"Upload/Category/girl3.png\r\n\r\n","OrgId":1,"SubCategories":[{"SubcatId":2,"SbCatName":"Cellulite Treatment","CatId":1},{"SubcatId":3,"SbCatName":"Moisturisers","CatId":1}]},{"CatId":2,"CatName":"Face","CatImage":"Upload/Category/girl4.png\r\n","OrgId":1,"SubCategories":[]}],"ResponseMessage":"Wow!! you are so passionate about your CommentRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Categories"
    }, {
      "type": "get",
      "url": "/api/Item/GetItemBySubcategoryId?id=:SubCatId",
      "title": "List all Items in this Sub category",
      "version": "1.0.0",
      "name": "List all Items in this Sub category",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List SubCategories of Categories</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"lstComment":[{"CatId":1,"CatName":"Body","CatImage":"Upload/Category/girl3.png\r\n\r\n","OrgId":1,"SubCategories":[{"SubcatId":2,"SbCatName":"Cellulite Treatment","CatId":1},{"SubcatId":3,"SbCatName":"Moisturisers","CatId":1}]},{"CatId":2,"CatName":"Face","CatImage":"Upload/Category/girl4.png\r\n","OrgId":1,"SubCategories":[]}],"ResponseMessage":"Wow!! you are so passionate about your CommentRepository"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "My Shop"
    }, {
      "type": "post",
      "url": "/Basket",
      "title": "Add Item to Basket",
      "version": "1.0.0",
      "name": "Add Item to Basket",
      "group": "My Shop",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Add Item to Basket</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "UserId",
              "description": "<p>UserId of the User who is adding an Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "ItemID",
              "description": "<p>ItemID of the Item to be added in the Cart(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Quantity",
              "description": "<p>Quantity of the Item(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Status",
              "description": "<p>Status of the Item('P-Pending')(required)</p>"
            },
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "AddedTime",
              "description": "<p>Time added(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemPrice":"2000","subcatId":"2","ItemQuantity":"3","EstDelivery":"3 days","ItemCurrency":"Dollars","ItemOfferPrice":"1800","OfferValidTill":null,"Returns":"Accepted","OrgId":"12","ItemID":37},"ResponseMessage":"Added Item to the Cart successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "/Basket/:UserID",
      "title": "Get Items in my Cart",
      "version": "1.0.0",
      "name": "Get Items in my Cart",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Get list of Items based on the User ID</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"clientlist":[{"ClientId":1,"OrgId":2,"UserId":177,"FavouriteId":80,"CreateDate":"2017-07-02T15:44:34.000Z","CreatedBy":200,"IsActive":1,"ModifiedDate":"2017-07-02T15:44:34.000Z","ModifiedBy":null,"FirstName":null,"LastName":null,"DOB":"0000-00-00 00:00:00","Address":null,"PostCode":null,"Town":null,"UserImage":null}],"ResponseMessage":"Wow!! you are so passionate about your Cart"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Cart"
    }, {
      "type": "delete",
      "url": "/Basket/:BasketId",
      "title": "Delete the Item from Basket",
      "version": "1.0.0",
      "name": "Delete Item from Basket",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows Organization to Delete Item from Basket</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"ResponseMessage":"Deleted Item from Cart Successfully"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "put",
      "url": "/Basket",
      "title": "Update Item Quantity in Basket",
      "version": "1.0.0",
      "name": "Update Item in Basket",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Allows User to Update Item in Basket</p>",
      "parameter": {
        "fields": {
          "Parameter": [
            {
              "group": "Parameter",
              "type": "String",
              "optional": false,
              "field": "Quantity",
              "description": "<p>Quantity of the Item(required)</p>"
            }
          ]
        }
      },
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":{"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemPrice":"2000","subcatId":"2","ItemQuantity":"3","EstDelivery":"3 days","ItemCurrency":"Dollars","ItemOfferPrice":"1800","OfferValidTill":null,"Returns":"Accepted","OrgId":"12","ItemID":37},"ResponseMessage":"Updated Item Quantity in the Cart successfully!"}',
            "type": "json"
          }
        ]
      }
    }, {
      "type": "get",
      "url": "/ItemInBasket/:UserId/:ItemID",
      "title": "Check Item in Basket",
      "version": "1.0.0",
      "name": "Check Item in Basket",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>Check whether the Item is in Basket or not</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{ "StatusCode": 200,"alreadyInCart": 1, "Message": "Fetched Item in Cart Status."}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Cart"
    }, {
      "type": "get",
      "url": "/OrderPlaced/:UserId",
      "title": "Orders placed",
      "version": "1.0.0",
      "name": "List the Orders placed by the User",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List the Orders placed by the User</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"OrderId":1,"OrderDate":"2017-09-29T13:29:28.000Z","UserId":206,"OrgId":45,"OrderNo":null,"OrderStatus":"P","ModifyDate":"2017-08-31T22:41:00.000Z","TotalAmount":2000,"OrdDEtaild":1,"ItemId":37,"ItemName":"Mobile","ItemDiscp":"An excellent phone","ItemImage":null,"ItemCurrency":"Dollars"}],"ResponseMessage":"Listed your Orders"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Cart"
    }, {
      "type": "get",
      "url": "/OrderRecevied/:OrgId",
      "title": "Orders Received",
      "version": "1.0.0",
      "name": "List the Orders received by the Organization",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List the Orders received by the Organization</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"OrderId":1,"OrderDate":"2017-09-29T13:29:28.000Z","UserId":206,"OrgId":46,"OrderNo":null,"OrderStatus":"P","ModifyDate":"2017-09-26T14:36:12.000Z","TotalAmount":2000,"UserImage":"Upload/user/UserDefault.png","FirstName":"Raja","LastName":"Guru","Password":"dUSFuC28mJkr4XxeocgzTA==","ConfirmPassword":"qwerty","EmailId":"dineshraja.fl@gmail.com","ConfirmEmail":"dineshraja.fl@gmail.com","Gender":null,"Town":null,"City":null,"Role":"business","CreateDate":"2017-09-26T14:36:12.000Z","Address":null,"PostCode":0,"Profile":null,"DOB":"0000-00-00 00:00:00","IsActive":null,"TagLine":null,"businessInfoFound":1}],"ResponseMessage":"Listed your Orders"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Cart"
    }, {
      "type": "get",
      "url": "/OrderDetail/:OrderId",
      "title": "Order Detail",
      "version": "1.0.0",
      "name": "List the Orders details",
      "group": "Cart",
      "permission": [
        {
          "name": "Universal"
        }
      ],
      "description": "<p>List the Orders details</p>",
      "success": {
        "examples": [
          {
            "title": "Success-Response:",
            "content": '{"StatusCode":200,"data":[{"OrderId":1,"OrderDate":"2017-09-29T13:29:28.000Z","UserId":206,"OrgId":45,"OrderNo":null,"OrderStatus":"P","ModifyDate":"2017-08-31T22:41:00.000Z","TotalAmount":2000,"OrdDEtaild":2,"ItemId":36,"ItemQuantity":1,"ItemRate":2000,"SellerID":45,"OrdDetailStatus":"P","PlaceOrderDate":"2017-09-28T22:47:00.000Z","OtherChargeID":null,"OtherChargeAmount":null,"Amount":2000,"ItemCurrency":"Dollar"},{"OrderId":1,"OrderDate":"2017-09-29T13:29:28.000Z","UserId":206,"OrgId":45,"OrderNo":null,"OrderStatus":"P","ModifyDate":"2017-08-31T22:41:00.000Z","TotalAmount":2000,"OrdDEtaild":2,"ItemId":36,"ItemQuantity":1,"ItemRate":2000,"SellerID":45,"OrdDetailStatus":"P","PlaceOrderDate":"2017-09-28T22:47:00.000Z","OtherChargeID":null,"OtherChargeAmount":null,"Amount":2000,"ItemCurrency":"Dollar"}],"ResponseMessage":"Listed your Order details"}',
            "type": "json"
          }
        ]
      },
      "groupTitle": "Cart"
    }
  ]
});
