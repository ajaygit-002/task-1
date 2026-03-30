import './ProductCard.css'

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="price">Price: Rs {product.price}</p>

      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(product)} type="button">
          Update
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)} type="button">
          Delete
        </button>
      </div>
    </article>
  )
}

export default ProductCard
