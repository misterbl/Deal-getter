var express = require("express");
var getDeal = require("./getDeal.js");
var app = express();

app.use(
  express.static("public", {
    index: false,
    extensions: ["png"]
  })
);

app.get("/", function(req, res) {
  res.send(
    "Enter a valid url to look up a deal. E.g. http://127.0.0.1:3000/deals/allDeals to see all the deals. Or http://127.0.0.1:3000/deals/1 to see deal number 1"
  );
});

app.get("/deals/:id", async function(req, res) {
  var id = req.params.id;
  await getDeal(id);
  res.redirect(`/deals/${id}`);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
