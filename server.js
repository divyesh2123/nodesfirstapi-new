const express = require("express");
const cors = require("cors");
const log4js = require('log4js');

const app = express();

log4js.configure({
  appenders: { 
    fileAppender: { type: 'file', filename: 'logs/server.log' }
  },
  categories: {
    default: { appenders: ['fileAppender'], level: 'info' }
  }
});

app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));


var corsOptions = {
    origin: "*"
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;

  app.use(express.urlencoded({ extended: true }));

  db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  require('./app/routes/auth.routes')(app);

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application1." });
  });

  const logger = log4js.getLogger();

  // Log an info message
  logger.info('This is an info message');
  
  // Log an error message
  logger.error('This is an error message', new Error('Something went wrong'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    Role.estimatedDocumentCount().then((count,err) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save().then(y=> {

          
       let d = new Role({
          name: "moderator"
        }).save().then(y=> {

        })
  
        new Role({
          name: "admin"
        }).save().then(y=> {
          
        });
          

        }).catch(y=> {
       
            if (err) {
              console.log("error", err);
            }
    
           
          });
        
        
       
  
      }
    });
  }

  