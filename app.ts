import { AfterworkJS } from 'kuaralabs-afterworkjs';
import { authMiddleware } from './middlewares/authMiddleware';

const SECRET_KEY = 'your_secret_key';  // Replace with your actual secret key
const DB_URL = 'your_database_url';    // Replace with your actual database URL
const DB_NAME = 'your_database_name';  // Replace with your actual database name

const app = new AfterworkJS({
  secret: SECRET_KEY,
  dbType: "postgres",                  // Replace with the databases that is supported
  dbConfig: {
    dbUrl: DB_URL,
    dbName: DB_NAME
  }
});

const protectedRouteHandler = (req: any, res: any) => {
  if (req.user) {
    res.json({ message: 'Access granted', user: req.user });
  } else {
    res.statusCode = 401;
    res.end('Unauthorized');
  }
};

const routeWithMiddleware = (middlewares: any[], finalHandler: any) => {
  return (req: any, res: any) => {
    let i = 0;

    const next = () => {
      if (i < middlewares.length) {
        middlewares[i++](req, res, next);
      } else {
        finalHandler(req, res);
      }
    };

    next();
  };
};

app.addRoute('get', '/protected', routeWithMiddleware([authMiddleware(SECRET_KEY)], protectedRouteHandler));

app.start(3000);
