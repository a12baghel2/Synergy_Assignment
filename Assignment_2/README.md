# How to run

1. `npm i` to install the packages.
2. crate a `.env` file and set `SECRET_TOKEN={any string}`. 
3. In `controllers/db.js` replace *username* and *password* with your created credentials.
4. Run `npm run dev` to start the development server ot you can just `npm start` to run the application.

> Note: __Admin__ is not created in the database plase add this :
```javascript
app.post("/add", async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const admin = await user.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
        });
        res.redirect("/auth/login");
    }catch(err) {
        res.status(500).send("server error);
    }
})
```
> in `./route/admin` before any where between `const route = express.Router` and  `module.exports = route` and send a __POST__ request through any api tool __Postman__ or in __*VScode*__ use __Thunderclient__ extension
