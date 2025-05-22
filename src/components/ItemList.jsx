import ItemCard from './ItemCard';

export default function ItemList({ itens, onEdit, onDelete }) {
  return (
    <div>
      {itens.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
