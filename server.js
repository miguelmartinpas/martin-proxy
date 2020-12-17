const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const hostname = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Just a proxy!!");
});

// /lotto
app.get(
  "/lotto",
  createProxyMiddleware({
    target: "https://www.lottoland.com",
    changeOrigin: true,
    pathRewrite: function (path, req) {
      console.log(
        "proxy ...",
        path,
        path.replace("/lotto", "/api/drawings/euroJackpot")
      );
      return path.replace("/lotto", "/api/drawings/euroJackpot");
    },
  })
);

// /lotto/20201217
app.get(
  "/lotto/:date",
  createProxyMiddleware({
    target: "https://www.lottoland.com",
    changeOrigin: true,
    pathRewrite: function (path, req) {
      console.log(
        "proxy ...",
        path,
        path.replace("/lotto", "/api/drawings/euroJackpot")
      );
      return path.replace("/lotto", "/api/drawings/euroJackpot");
    },
  })
);

// /tv?v=json
app.get(
  "/tv",
  createProxyMiddleware({
    target: "http://www.movistarplus.es",
    changeOrigin: true,
    pathRewrite: function (path, req) {
      console.log("proxy ...", path, path.replace("/tv", "/programacion-tv"));
      return path.replace("/tv", "/programacion-tv"); // .concat("?v=json");
    },
  })
);

// /tv/2020-12-17?v=json
app.get(
  "/tv/:date",
  createProxyMiddleware({
    target: "http://www.movistarplus.es",
    changeOrigin: true,
    pathRewrite: function (path, req) {
      console.log("proxy ...", path, path.replace("/tv", "/programacion-tv"));
      return path.replace("/tv", "/programacion-tv");
    },
  })
);

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
