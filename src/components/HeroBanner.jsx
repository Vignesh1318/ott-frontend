import { useNavigate } from "react-router-dom";

export default function HeroBanner({ item, subtitle }) {
  const navigate = useNavigate();

  function handlePlay() {
    if (item?.id) {
      navigate(`/content/${item.id}`);
    }
  }

  return (
    <section
      className="hero-banner"
      style={
        item?.backdropUrl || item?.thumbnailUrl
          ? { backgroundImage: `url(${item.backdropUrl || item.thumbnailUrl})` }
          : undefined
      }
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">{item?.title}</h1>
          {subtitle && <p className="details-meta">{subtitle}</p>}
          {item?.description && (
            <p className="hero-description">{item.description}</p>
          )}
          <div className="hero-actions">
            <button className="primary-btn" onClick={handlePlay}>
              Play
            </button>
            <button
              className="secondary-btn"
              type="button"
              onClick={handlePlay}
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

