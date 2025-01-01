import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { CardSpotlight } from "../components/ui/card-spotlight";

const ArticleDetails = () => {
  const { id } = useParams();
  const article = useSelector(state => 
    state.news.articles.find(a => a.id.toString() === id)
  );

  if (!article) {
    return <div className="text-center py-12 text-white">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/news" className="flex items-center text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>
        <CardSpotlight className="p-8">
          <h1 className="text-3xl font-bold relative z-20 text-white mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-neutral-300 mb-6 relative z-20">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{article.type}</span>
            </div>
          </div>
          <div className="prose prose-invert max-w-none relative z-20">
            <p className="text-neutral-200">{article.description}</p>
            {article.content && (
              <p className="text-neutral-200 mt-4">{article.content}</p>
            )}
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 mt-4 inline-block"
              >
                Read full article
              </a>
            )}
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
};

export default ArticleDetails;