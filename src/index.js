require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const nunjucks = require("nunjucks");
const path = require("path");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SEARCH_API_URL || !process.env.SEARCH_API_KEY) {
  console.error("Missing required environment variables: SEARCH_API_URL and SEARCH_API_KEY");
  process.exit(1);
}

const limiter = rateLimit({
  windowMs: 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

const env = nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: false
});

env.addFilter("sanitize", (html) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["b", "i", "em", "strong", "br"] });
});

app.set("view engine", "njk");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Seek" });
});

app.get("/suggest", async (req, res) => {
  const query = req.query.q || "";
  
  if (!query) {
    return res.json({ suggestions: [] });
  }

  try {
    const baseUrl = process.env.SEARCH_API_URL.replace(/res\/v1\/web\/?$/, '');
    const response = await fetch(`${baseUrl}res/v1/suggest/search?q=${encodeURIComponent(query)}&count=5`, {
      headers: {
        "Authorization": `Bearer ${process.env.SEARCH_API_KEY}`
      }
    });

    if (!response.ok) {
      return res.json({ suggestions: [] });
    }

    const data = await response.json();
    const suggestions = (data.results || []).map(r => r.query);
    res.json({ suggestions });
  } catch (err) {
    console.error(err);
    res.json({ suggestions: [] });
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q || "";
  let results = [];
  let error = null;

  if (!query) {
    return res.redirect("/");
  }

  try {
    const response = await fetch(`${process.env.SEARCH_API_URL}search?q=${encodeURIComponent(query)}&count=20`, {
      headers: {
        "Authorization": `Bearer ${process.env.SEARCH_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const data = await response.json();
    results = data.web?.results || [];
  } catch (err) {
    error = "Failed to fetch search results. Please try again.";
    console.error(err);
  }

  res.render("search", { query, results, error });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
