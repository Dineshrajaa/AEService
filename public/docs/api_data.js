define({
  "api": [
    {
      "type": "post",
      "url": "/Aesthetic/api/Users/",
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
      }
    },{
      "type": "post",
      "url": "/Aesthetic/api/Users/Login",
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
              "field": "Email",
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
    }
  ]
});
