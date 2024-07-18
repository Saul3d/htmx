import express from "express";

import { famous_quotes } from "./data/quotes.js";

const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware used to extract/parse the form data.
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>HTMX Essentials</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"

        />
        <link rel="icon" href="/icon.png" />
        <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <main>
          <p>Famous quotes from famous people, which one speaks to you?</p>
          <form hx-post="/quote" hx-target="ul" hx-swap="outerHTML">
            <p>
              <label for="quote">Your Quote</label>
              <input type="text" id="quote" name="quote" />
            </p>
            <p>
              <button>Show</button>
            </p>
          </form>
          <ul>
            ${famous_quotes.map((quote) => `<li>${quote}</li>`).join("")}
          </ul>
        </main>
      </body>
    </html>
  `);
});

app.post("/quote", (req, res) => {
  const enteredQuote = req.body.quote;
  famous_quotes.unshift(enteredQuote);
  // res.redirect('/');
  res.send(` 
    <ul>
      ${famous_quotes.map((quote) => `<li>${quote}</li>`).join("")}
    </ul>
  `);
});

app.listen(3000);
