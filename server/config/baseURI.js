let baseURI

if (process.env.NODE_ENV.trim() === "development") {

  baseURI = "http://localhost:3000"    
} else {
  baseURI = "https://ec2-18-220-103-113.us-east-2.compute.amazonaws.com:3000"  
}
console.log(`baseURI : ${baseURI}`)

exports.baseURI = baseURI