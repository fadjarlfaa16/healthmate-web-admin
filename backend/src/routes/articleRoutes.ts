import express, { Request, Response } from "express";
import fetch from "node-fetch";

const router = express.Router();

// Deklarasi variabel
interface Source {
  name: string;
}

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: Source;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// Route untuk endpoint
router.get("/articles", async (_req: Request, res: Response) => {
  try {
    const apiKey = "c87d4593318b440fa30c2084262a35ef";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = (await response.json()) as NewsApiResponse;

    if (data.status === "ok") {
      res.json({ articles: data.articles });
    } else {
      res.status(500).json({ error: "Failed to fetch news articles" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
});

export default router;
