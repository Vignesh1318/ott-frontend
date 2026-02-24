import RowItem from "./RowItem";

export default function Row({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-scroller">
        {items.map((item) => (
          <RowItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

