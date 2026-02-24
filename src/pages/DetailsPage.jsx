import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contentService } from "../services/apiClient";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function DetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await contentService.getContentDetails(id);
        if (!cancelled) {
          setItem(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page-center">
        <ErrorMessage message="Content not found." />
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-hero">
        {(item.backdropUrl || item.thumbnailUrl) && (
          <div
            className="details-backdrop"
            style={{ backgroundImage: `url(${item.backdropUrl || item.thumbnailUrl})` }}
          />
        )}
        <div className="details-info">
          {(item.posterUrl || item.thumbnailUrl) && (
            <img
              className="details-poster"
              src={item.posterUrl || item.thumbnailUrl}
              alt={item.title}
            />
          )}
          <div className="details-text">
            <h1>{item.title}</h1>
            {item.year && <span className="details-meta">{item.year}</span>}
            {item.rating && <span className="details-meta">{item.rating}</span>}
            {Array.isArray(item.genres) && item.genres.length > 0 && (
              <span className="details-meta">{item.genres.join(", ")}</span>
            )}
            {item.durationMinutes && (
              <span className="details-meta">{item.durationMinutes} min</span>
            )}
            {item.description && <p className="details-description">{item.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

