var express = (function(){
  function find(collection, json){
    var keys = Object.keys(json);
    for(var i=0; i<collection.length; i+=1){
      if(equals(keys, collection[i].pattern, json))
        return collection[i];
    }
  };

  function equals(keys, pattern, parameter){
    if(Object.keys(pattern).length !== Object.keys(parameter).length) return false;

    var i = 0, key;
    for(var i=0; i<keys.length; i+=1){
      key = keys[i];
      if(pattern[key] !== parameter[key])
        return false;
    }
    return true;
  };

  function json(request){
    return ContentService.createTextOutput(JSON.stringify(request))
    .setMimeType(ContentService.MimeType.JSON);
  };

  var routers = [];

  function get(pattern, handler){
    return routers.push({
      pattern: pattern,
      handler: handler
    });
  };

  function findRouter(request){
    return find(routers, request.parameter);
  };

  return {
    app: function(){
      return {
        get: get
      };
    },
    json: function(cb){
      return function(request){
        return json(cb(request));
      };
    },
    get: function(request){
      var router = findRouter(request);
      if(router){
        return router.handler(request);
      } else {
        return json(request);
      }
    }
  };
}());

function doGet(request){
  return express.get(request);
};
