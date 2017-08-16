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
      "url": "/Posts/:OrgId/:pagenumber/:limit",
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
            "content": '{"data":[{"FirstName":"Aesthetic","LastName":"Tester","UserImage":"upload/user/UserDefault.png","PostId":39,"PostMessage":null,"PostTime":"2017-08-03T11:57:03.000Z","PostImage":null,"CreateDate":"2017-08-02T18:30:00.000Z","ModifyDate":null,"DisplayTime":"11 days","CountOfComment":0},{"FirstName":"Aesthetic","LastName":"Tester","UserImage":"upload/user/UserDefault.png","PostId":40,"PostMessage":null,"PostTime":"2017-08-03T12:00:27.000Z","PostImage":"Upload/Post/696598.png","CreateDate":"2017-08-02T18:30:00.000Z","ModifyDate":null,"DisplayTime":"11 days","CountOfComment":0},{"FirstName":"Aesthetic","LastName":"Tester","UserImage":"upload/user/UserDefault.png","PostId":41,"PostMessage":null,"PostTime":"2017-08-03T12:03:45.000Z","PostImage":"Upload/Post/242798.png","CreateDate":"2017-08-02T18:30:00.000Z","ModifyDate":null,"DisplayTime":"11 days","CountOfComment":0}],"paginationData":{"page":4,"pageSize":3,"rowCount":13,"pageCount":5}}',
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
    }
  ]
});
