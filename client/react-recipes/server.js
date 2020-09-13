const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const jwt = require('jsonwebtoken');

// Bring in GraphQL-Express middleware
// const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { ApolloServer} = require('apollo-server-express');


const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");// Initializes application

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
//mergeSchemas can be imported from apollo-server
//const schema = mergeSchemas(...);

// const server = new ApolloServer({ typeDefs, resolvers });





// Connects to database
mongoose
  .connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));



const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
const path = '/graphql';

// const createContext = async (request) => {
//   console.log(request.req)
//   let token =request.req.headers.authorization

//   if(!token)
//       return { username: 'Unknown' }
//   else{
//      const currentUser = await jwt.verify(token, process.env.SECRET)
//      return {currentUser


//   }
//       }

// }
//set up JWT authentication middleware
// app.use(path,async(req, res, next)=>{
//   const token = req.headers['authorization'];
//   console.log(token,"token in Be")
//   if(!token){
//     return res.status(401).json({ error: 'token missing' })
//   }
//   // if(token !== null){
//     try{
//       const currentUser = await jwt.verify(token, process.env.SECRET)
//       // console.log(currentUser),
//       req.currentUser = currentUser
//       // return currentUser
//     } catch(err){
//       console.log(err)
//     }
//   // }
//   next()
//}
const app = express();
app.use(cors(corsOptions));
const tokenveri =(token)=>{
  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    return decoded
  } catch(err) {
    console.log(err)
    return (err)
    // err
  }
  // console.log(token,"5")

    // try to retrieve a user with the token
    // const user =  jwt.verify(token, process.env.SECRET)
    // console.log(user,"12")
    // return user

}
const server = new ApolloServer({ schema,
  // tracing: true,
  // console.log(currentUser,"in apollosssss");
  context:({req}) => {
    // Recipe,
    // User
  
    const token = req.headers.authorization || '';
    let decoded= ''
    if(token){
      console.log(token,"toke1");
      // currentUser1 = await tokenveri(token)
      try {
        decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded)
        return decoded
      } catch(err) {
        console.log(err)
        return (err)
        // err
      }
      // console.log(currentUser1)
      // return currentUser1
    }
  
 
    // add the user to the context
    return {
      Recipe,
      User,
      decoded
      // currentUser1
    //   // mongoose
      
    //   // User
    };
  }

  // context: ({
  //   Recipe,
  //   User,
  //   req
  // })
//   context: {
//   Recipe,
//   User,
//   // currentUser
// }
 });
//  console.log(server.context())


server.applyMiddleware({ app,path});

const PORT = process.env.PORT || 4444;


app.listen({ port: PORT }, () =>
  console.log(`Server listening on PORT ${PORT}${server.graphqlPath}`)
)

// app.listen(PORT, () => {
//   console.log(`Server listening on PORT ${PORT}`);
// });
