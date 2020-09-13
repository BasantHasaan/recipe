const jwt = require("jsonwebtoken");
const User = require("./models/User");
// const Recipe = require('./models/Recipe')
const bcrypt = require("bcrypt");
const Recipe = require("./models/Recipe");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args ) => {
      // console.log(Recipe)
      const allRecipes = await Recipe.find();
      return allRecipes;
    },
    getRecipe: async(root, {_id})=>{
      const recipe = await Recipe.findOne({_id});
      return recipe;
    },
    getCurrentUser: async( root, args, currentUser,{...context })=>{
      // console.log("welcome")
      // console.log(User)
      console.log("11",currentUser.username)
      if(!currentUser) {
        return null
      }
      const user = await User.findOne({username: currentUser.username})
        .populate({
          path: 'favorites',
          model: 'Recipe'
        })
        console.log(user,"in getCurrent")
        return user;
    }
   
  },
  Mutation: {
    addRecipe: async (
      root,
      { name, description, category, instructions, username },
      { Recipe }
    ) => {
      console.log("test", name, { Recipe });
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username,
      }).save();
      // console.log('test', newRecipe)
      return newRecipe;
    },
    signinUser: async (root, { username, password } ) => {
      // console.log({username})
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid Password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    signupUser: async (root, { username, email, password } ) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already Exist");
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    
  },
  
};
