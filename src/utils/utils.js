const request = require('request')

const callback = (error, data) => {
    if(error){
       return (error);
    }else {
        return data;
    }
}

const location = (city, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=751a53695bf4eb52b3a6144e94a66fc3&query=${city}&units=f`
  
    request({url:url , json: true} , (error, response) => {
    const data = response.body;
    if(error  ){
       callback(error );
    }else if(data.success == false) {
      callback(data);
    } else {
        
        callback(undefined, data)
    }
})

}


module.exports = {location};

