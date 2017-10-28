let baseURI
if (process.env.NODE_ENV == "development") {
  baseURI = "localhost:3000"
} else {
  baseURI = "13.125.41.251:3000"
}

exports.baseURI = baseURI