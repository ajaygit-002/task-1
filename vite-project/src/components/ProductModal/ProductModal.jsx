import './ProductModal.css'

function ProductModal({ form, editingId, onSubmit, onClose, onTextChange, onImageChange }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="modal" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Product' : 'Add Product'}</h3>

        <label htmlFor="image">Upload Image</label>
        <input id="image" name="image" type="file" accept="image/*" onChange={onImageChange} />

        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onTextChange}
          placeholder="Enter product name"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          value={form.price}
          onChange={onTextChange}
          placeholder="Enter product price"
          required
        />

        {form.image ? <img className="preview-image" src={form.image} alt="Preview" /> : null}

        <div className="modal-actions">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button className="btn btn-secondary" onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductModal
