const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8888;

const app = express();

const BASE_PREFIX = process.env.BASE_PREFIX || "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// app.use("/static", express.static(`${__dirname}/public`));

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.post(`/whatsapp`, (req, res) => {
  var axios = require("axios");
  var FormData = require("form-data");
  var fs = require("fs");

//   {
//     urlDomain: 'https://app.wintook.com/',
//     accountId: 38,
//     ConversationId: 5185,
//     file: 'A00012.pdf'
//   }
  

  var data = new FormData();
  data.append(
    "attachments[]",
    fs.createReadStream(`${__dirname}/files/A00012.pdf`)
  );

  var config = {
    method: "post",
    url: `${req.body.urlDomain}api/v1/accounts/${req.body.accountId}/conversations/${req.body.ConversationId}/messages`,
    headers: {
      api_access_token: `${req.body.apiAccessToken}`,
      file_type: "application/pdf",
      "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary",
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});
