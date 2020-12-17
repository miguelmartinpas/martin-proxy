const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const hostname = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

// allow all origens
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.send("Just a proxy!!");
});

// /lotto path
app.get(
  "/lotto",
  createProxyMiddleware({
    target: "https://www.lottoland.com",
    changeOrigin: true,
    pathRewrite: function (path, req) {
      return path.replace("/lotto", "/api/drawings/euroJackpot");
    },
  })
);

// /lotto/20201217 path
app.get(
  "/lotto/:date",
  createProxyMiddleware({
    target: "https://www.lottoland.com",
    changeOrigin: true,
    pathRewrite: function (path, req) {
      return path.replace("/lotto", "/api/drawings/euroJackpot");
    },
  })
);

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
