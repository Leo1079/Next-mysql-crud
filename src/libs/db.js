import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    ssl: {
      rejectUnauthorized: false
    }
  },
});
