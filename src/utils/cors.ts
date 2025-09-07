const CorsConfig = {
    origin : process.env.CLIENT,
    methods: ["GET","POST","PUT","DELETE"],
    credentials : true,
    allowedHeaders:["Content-Type","Authorization"]
}

export default CorsConfig