module.exports ={
    port: process.env.PORT || 8081,
    db: {
        user: process.env.DB_USER || 'ACC',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'ACCBlog',
        host: process.env.HOST || 'localhost',
        dialect: 'sqlite',
        storage: './AmericanCarClub.sqlite'
    }
};