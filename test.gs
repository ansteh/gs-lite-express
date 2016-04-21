function findTest(){
  function find(collection, json){
    var keys = Object.keys(json);
    for(var i=0; i<collection.length; i+=1){
      if(equals(keys, collection[i].pattern, json))
        return collection[i];
    }
  };

  function equals(keys, pattern, parameter){
    Logger.log(keys);
    Logger.log(pattern);
    Logger.log(parameter);

    if(Object.keys(pattern).length !== Object.keys(parameter).length) return false;

    var i = 0, key;
    for(var i=0; i<keys.length; i+=1){
      key = keys[i];
      if(pattern[key] !== parameter[key])
        return false;
    }
    return true;
  };

  var routers = [{
    pattern: { task: 'save' }
  }];

  Logger.log(find(routers, { task: 'save' }));
};
