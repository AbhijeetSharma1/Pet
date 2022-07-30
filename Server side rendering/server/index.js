import express from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));

app.use((req, res) => {
  res.write(parts[0]); //writing this makes css and other markup load immediately in the head tag even before your javascript
  const staticContext = {};

  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup); /// this stream is hooked up to above response
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.status(staticContext || 200);
    res.write(parts[1]);
    res.end(); //then u can delete all that stuff down here
  });

  // res.status(staticContext.statusCode || 200);
  // res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  // res.end();
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
