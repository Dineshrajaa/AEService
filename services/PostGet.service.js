var config         = require('../config'),
Favourite = require('../models/Favourite.model'),
    PostImage = require('../models/PostImage.model'),
    PostGet = require('../models/PostGet.model'),
    Comment = require('../models/Comment.model'), 
    Organization = require('../models/Organization.model'),
    helperServices = require('../services/helper.service'),
    moment = require('moment'),
    Promise        = require("bluebird");
exports.SearchRecord = function(params,action){
  var  UserId = (params.id)?params.id:false;
  var  country = (params.country)?params.country:false;
  if(action)
  	var country = (params.input)?params.input:false;
  else
    var  OrgName_or_Des = (params.input)?params.input:false;


return Favourite.forge().query(function(qb){
	qb.select('OrgId');
	qb.where('UserId',UserId);
}).fetchAll().then(function(favorg){
	org = [];

	if(favorg.length){
		favorg.forEach(function(s) {
              org.push(s.attributes.OrgId);
            });
	}
	return org
}).then(function(orgs){
        return Organization.forge().query(function(qb){
        qb.select('PostGet.PostId','PostGet.OrgId','PostGet.PostMessage','PostGet.IsFavourite','PostImage.PostImageUrl as PostImage','PostImage.PostImageUrl','PostGet.PostTime','PostGet.CreateDate','PostGet.ModifyDate','Organization.OrgName','Organization.OrgImage','Organization.OrgAddress as Address','Organization.City','Organization.Country','Organization.OrgTitle');

       
        qb.join('PostGet',function(){
            this.on('Organization.OrgId','=','PostGet.OrgId')
        });
        qb.leftJoin('PostImage',function(){
            this.on('PostGet.PostId','=','PostImage.PostId')
        });
       
        if(OrgName_or_Des){
            qb.where(function(){
                this.where('Organization.OrgName','like',"%"+OrgName_or_Des+"%").orWhere('PostGet.PostMessage','like',"%"+OrgName_or_Des+"%")
            });
        }

        //console.log("ddd"+country+"sss");

        if(country){
            qb.where(function(){
                this.where('Organization.Country','like',"%"+country+"%")
            });
        }
        if(orgs.length){
			qb.whereNotIn('Organization.OrgId',orgs);
		}
        qb.orderBy('PostGet.ModifyDate', 'desc');
  }).fetchAll().then(function(result){

        if(result.length){
                return Promise.map(result.models,function(Fav){
                    return Comment.forge().query(function(qb){
                        qb.count('CommentId as totalcomments');
                        qb.where('PostId',Fav.get('PostId'))
                    }).fetch().then(function(CountOfComment){
                            var DisplayTime = helperServices.getDisplayTime(Fav.get('PostTime'));
                            Fav.set("DisplayTime",DisplayTime);
                            Fav.set("Address",Fav.get("City")+', '+Fav.get("Country"));
                            Fav.set("OrgImage",config.image_url+Fav.get("OrgImage"));
                            if(Fav.get("PostImage")!=null || Fav.get("PostImage")!='')
                            Fav.set("PostImage",config.image_url+Fav.get("PostImage"));
                            Fav.set('CountOfComment',CountOfComment.get('totalcomments'));
                            return Fav;
                    }).catch(function(err){
                        console.log("error in comment");
                        console.log(err);
                    });
                })
                
        }else{
                return [];
        }
  }).then(function(finalresult){
        return finalresult;
  }).catch(function(err){
                        console.log("error in outer");
                        console.log(err);
    });

}).catch(function(err){
                        console.log("error in outer");
                        console.log(err);
});
}

exports.SearchRecordbyOrganization = function(params,action){
  var  OrgId = (params.Id)?params.Id:false;
  return Organization.forge().query(function(qb){
        qb.select('PostGet.PostId','PostGet.OrgId','PostGet.PostMessage','PostGet.IsFavourite','PostImage.PostImageUrl as PostImage','PostImage.PostImageUrl','PostGet.PostTime','PostGet.CreateDate','PostGet.ModifyDate','Organization.OrgName','Organization.OrgImage','Organization.OrgAddress as Address','Organization.City','Organization.Country','Organization.OrgTitle');
        qb.join('PostGet',function(){
            this.on('Organization.OrgId','=','PostGet.OrgId')
        });
        qb.leftJoin('PostImage',function(){
            this.on('PostGet.PostId','=','PostImage.PostId')
        });
        if(OrgId){
            qb.where('Organization.OrgId',OrgId);
        }
        
  }).fetchAll().then(function(result){
        if(result.length){
                return Promise.map(result.models,function(Fav){
                    return Comment.forge().query(function(qb){
                        qb.count('CommentId as totalcomments');
                        qb.where('PostId',Fav.get('PostId'))
                    }).fetch().then(function(CountOfComment){
                            Fav.set("OrgImage",config.image_url+Fav.get("OrgImage"));
                            Fav.set('CountOfComment',CountOfComment.get('totalcomments'));
                            return Fav;
                    }).catch(function(err){
                        console.log("error in comment");
                        console.log(err);
                    });
                })
                
        }else{
                return [];
        }
  }).then(function(finalresult){
        return finalresult;
  }).catch(function(err){
                        console.log("error in outer");
                        console.log(err);
    });
}

