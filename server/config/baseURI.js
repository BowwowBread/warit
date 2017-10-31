let baseURI
var env = (process.env.NODE_ENV || 'test').trim();
  
if (env == "test") {
  baseURI = "http://localhost:3000"    
} else {
  baseURI = "https://ec2-13-125-41-251.ap-northeast-2.compute.amazonaws.com:3000"  
}

exports.baseURI = baseURI