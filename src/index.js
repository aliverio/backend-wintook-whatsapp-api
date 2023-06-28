const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8888;

const app = express();

const BASE_PREFIX = process.env.BASE_PREFIX || "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/static", express.static(`${__dirname}/public`));

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.post(`/whatsapp`, (req, res) => {
  var axios = require("axios");
  var FormData = require("form-data");
  var fs = require("fs");

  var data = new FormData();
  data.append(
    "attachments[]",
    fs.createReadStream("/home/chatzeus/Documentos/FileWA.pdf")
  );

  var config = {
    method: "post",
    url: "https://app.wintook.com/api/v1/accounts/38/conversations/5185/messages",
    headers: {
      api_access_token: "SP6FvYSTYpr9piWc5imLXBEq",
      file_type: "application/pdf",
      "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary",
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});
