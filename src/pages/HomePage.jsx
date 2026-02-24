import { useEffect, useState } from "react";
import { contentService, profileService } from "../services/apiClient";
import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const [rows, setRows] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const activeProfileId = profileService.getActiveProfileId();
        const data = await contentService.getHome(activeProfileId);
        if (!cancelled) {
          setRows(Array.isArray(data.rows) ? data.rows : []);
          setFeatured(data.featured || null);
          setProfileName(data.profile?.name || "");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load content.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

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

  return (
    <div className="home-page">
      {featured && <HeroBanner item={featured} subtitle={profileName && `For ${profileName}`} />}

      <div className="rows-container">
        {rows.map((section) => (
          <Row
            key={section.id || section.title}
            title={section.title}
            items={section.items || []}
          />
        ))}
      </div>
    </div>
  );
}

