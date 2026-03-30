import { useState } from 'react'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import ProductModal from '../components/ProductModal/ProductModal.jsx'
import './ProductRoute.css'

const INITIAL_FORM = {
  image: '',
  name: '',
  price: '',
}

function ProductRoute() {
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [form, setForm] = useState(INITIAL_FORM)

  const openAddModal = () => {
    setEditingId('')
    setForm({ ...INITIAL_FORM })
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingId(product.id)
    setForm({
      image: product.image,
      name: product.name,
      price: String(product.price),
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId('')
    setForm({ ...INITIAL_FORM })
  }

  const onTextChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const onImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setForm({
        ...form,
        image: String(reader.result || ''),
      })
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const trimmedName = form.name.trim()
    const numericPrice = Number(form.price)

    if (!form.image || !trimmedName || Number.isNaN(numericPrice) || numericPrice <= 0) {
      return
    }

    if (editingId !== '') {
      const updatedProducts = products.map((item) => {
        if (item.id === editingId) {
          return {
            ...item,
            image: form.image,
            name: trimmedName,
            price: numericPrice,
          }
        }
        return item
      })

      setProducts(updatedProducts)
    } else {
      const newProduct = {
        id: crypto.randomUUID(),
        image: form.image,
        name: trimmedName,
        price: numericPrice,
      }

      setProducts([newProduct, ...products])
    }

    closeModal()
  }

  const onDelete = (productId) => {
    const remainingProducts = products.filter((item) => item.id !== productId)
    setProducts(remainingProducts)
  }

  return (
    <main className="app-shell">
      <header className="top-bar">
        <h1>Product Manager</h1>
        <button className="btn btn-primary" onClick={openAddModal} type="button">
          Add Item
        </button>
      </header>

      <section className="list-section">
        {products.length === 0 ? (
          <p className="empty-text">No products yet. Click Add Item to create one.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </section>

      {isModalOpen ? (
        <ProductModal
          form={form}
          editingId={editingId}
          onSubmit={onSubmit}
          onClose={closeModal}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
        />
      ) : null}
    </main>
  )
}

export default ProductRoute
