let baseURI
if (process.env.NODE_ENV == "production") {
  baseURI = "ec2-13-125-41-251.ap-northeast-2.compute.amazonaws.com:3000"  
} else {
  baseURI = "localhost:3000"  
}

exports.baseURI = baseURI