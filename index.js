const app = require("./app");
const port = process.env.PORT || 3001;
const mongoose = require('mongoose')

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
});