var config         = require('../config'), 
    Favourite = require('../models/Favourite.model'),
    PostImage = require('../models/PostImage.model'),
    PostGet = require('../models/PostGet.model'),
    Comment = require('../models/Comment.model'), 
    Organization = require('../models/Organization.model'),
    helperServices = require('../services/helper.service'),
    Promise        = require("bluebird");
exports.GetAllFavourites = function(value, field){
    var fetchParams={withRelated:['UserAccount','Organization']};
    return Favourite.forge().query(function(qb){
        if(field)
            qb.where(field,value);
    }).fetchAll(fetchParams).then(function(result){
        return result;
    }).catch(function(err){
        res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
    })
}

exports.SearchRecord = function(params) {
  var  UserId = (params.id)?params.id:false;
  var  OrgName_or_Des = (params.input)?params.input:false;
  var  country = (params.country)?params.country:false;
    return Favourite.forge().query(function(qb){
        qb.select('PostGet.PostId','PostGet.OrgId','PostGet.PostMessage','PostGet.IsFavourite','PostImage.PostImageUrl as PostImage','PostImage.PostImageUrl','PostGet.PostTime','PostGet.CreateDate','PostGet.ModifyDate','Organization.OrgName','Organization.OrgImage','Organization.OrgAddress as Address','Organization.City','Organization.Country','Organization.OrgTitle');

        qb.join('Organization',function(){
            this.on('Favourite.OrgId','=','Organization.OrgId')
        })
        qb.join('PostGet',function(){
            this.on('Favourite.OrgId','=','PostGet.OrgId')
        });
        qb.leftJoin('PostImage',function(){
            this.on('PostGet.PostId','=','PostImage.PostId')
        });
       
        if(OrgName_or_Des){
            qb.where(function(){
                this.where('Organization.OrgName','like',"%"+OrgName_or_Des+"%").orWhere('PostGet.PostMessage','like',"%"+OrgName_or_Des+"%")
            }).andWhere('Favourite.UserId',UserId);
        }else if(country){
            qb.where(function(){
                this.where('Organization.Country','like',"%"+country+"%")
            }).andWhere('Favourite.UserId',UserId);
        }
        else{
            qb.where('Favourite.UserId',UserId);   
        }
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
  
};

exports.addFavourite = function(params){

    console.log(params);
    var UserId = (params.UserId)?params.UserId:null;
    var OrgId = (params.OrgId)?params.OrgId:null;
    var data = {
        "UserId":UserId,
        "OrgId":OrgId
    }
    var FavouriteData = new Favourite(data);
    return FavouriteData.save(null).tap(function (model){
      FavouriteRes = model;
      return FavouriteRes;
    }).then(function(FavouriteRes){
      return FavouriteRes;
    }).catch(function(err){
      console.log(err);
    });
};

exports.OrgDuplicate = function(params){
    return Favourite.forge().query(function(qb){
            qb.where("OrgId",params.OrgId);
            qb.andWhere("UserId",params.Userid);
    }).fetch().then(function(result){
        return result;
    }).catch(function(err){
        res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
    })
}

exports.DeleteFavouriteByUser = function(params){
    return Favourite.forge().query(function(qb){
            qb.where("OrgId",params.OrgId);
            qb.andWhere("UserId",params.Userid);
            qb.delete();
    }).fetch().then(function(result){
        return result;
    }).catch(function(err){
        res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
    })
}