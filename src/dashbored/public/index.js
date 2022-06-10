const fs = require('fs');

const Client = require('../../../bot').client
const floc = ('../html/index.ejs');

module.exports = {
    name: "/index",
    run: async (req, res) => {

       delete require.cache[require.resolve(floc)]; 
       let args = {
        users: Client.users.cache.size,
        guilds: Client.guilds.cache.size
    }



  //  let file = fs.readFileSync("./src/dashbored/html/test.ejs", { encoding: "utf8" });
    res.render("./src/dashbored/html/index.ejs", args)
    }
}