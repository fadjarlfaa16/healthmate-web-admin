import { useEffect, useState } from "react";

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

interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const NewsList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        const data: ApiResponse = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Latest News
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading news...</div>
      ) : (
        <div className="h-[400px] overflow-y-auto space-y-4">
          {articles.map((news, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 mb-3">
                <img
                  src={news.urlToImage || "https://via.placeholder.com/100"}
                  alt={news.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {news.title}
                    </h2>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {news.source.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {news.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="italic">
                      By {news.author || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
