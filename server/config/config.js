module.exports ={
    port: process.env.PORT || 8081,
    db: {
        user: process.env.DB_USER || 'MITBlogger',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'MITBlog',
        host: process.env.HOST || 'localhost',
        dialect: 'sqlite',
        storage: './MITBlog.sqlite'
    }
};