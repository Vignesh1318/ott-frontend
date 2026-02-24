import { useNavigate } from "react-router-dom";

export default function RowItem({ item }) {
  const navigate = useNavigate();

  function handleClick() {
    if (item?.id) {
      navigate(`/content/${item.id}`);
    }
  }

  const poster = item.posterUrl || item.thumbnailUrl;

  return (
    <button className="row-item" type="button" onClick={handleClick}>
      {poster ? (
        <img src={poster} alt={item.title} loading="lazy" />
      ) : (
        <div className="row-item-fallback">{item.title}</div>
      )}
    </button>
  );
}

