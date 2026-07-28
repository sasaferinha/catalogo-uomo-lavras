"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Product = { name: string; category: string; image?: string; note: string };
type CartItem = { product: Product; size: string; quantity: number };

const products: Product[] = [
  { name: "Camiseta UOMO", category: "Camisetas", note: "Casual com acabamento premium" },
  { name: "Calça jeans", category: "Calças jeans", note: "Modelagem moderna e confortável" },
  { name: "Calça de alfaiataria", category: "Calças alfaiataria", note: "Elegância em cada detalhe" },
  { name: "Terno clássico", category: "Ternos", note: "Ajustes personalizados" },
  { name: "Blazer premium", category: "Blazers", note: "Presença para toda ocasião" },
  { name: "Óculos masculino", category: "Óculos", note: "Acessórios que completam o visual" },
  { name: "Casaco UOMO", category: "Casacos", note: "Proteção com sofisticação" },
  { name: "Suéter masculino", category: "Suéteres", note: "Conforto e elegância" },
  { name: "Calçado masculino", category: "Calçados", note: "Conforto, acabamento e presença" },
];

const categories = ["Todos", "Camisetas", "Calças jeans", "Calças alfaiataria", "Ternos", "Blazers", "Óculos", "Calçados", "Casacos", "Suéteres"];
const whatsapp = "https://wa.me/5535999508805?text=Olá!%20Vim%20pelo%20catálogo%20da%20UOMO%20e%20gostaria%20de%20atendimento.";

export default function Home() {
  const [active, setActive] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = active === "Todos" || product.category === active;
    const query = search.trim().toLocaleLowerCase("pt-BR");
    return matchesCategory && (!query || `${product.name} ${product.category}`.toLocaleLowerCase("pt-BR").includes(query));
  }), [active, search]);

  const addPhoto = (productName: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setCustomImages((current) => ({ ...current, [productName]: URL.createObjectURL(file) }));
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const orderLink = cart.length
    ? `https://wa.me/5535999508805?text=${encodeURIComponent(`Olá! Tenho interesse nestas peças do catálogo UOMO:\n\n${cart.map((item) => `• ${item.product.name} — tamanho ${item.size} — ${item.quantity} ${item.quantity === 1 ? "unidade" : "unidades"}`).join("\n")}\n\nGostaria de saber o valor e a disponibilidade.`)}`
    : whatsapp;

  const productSizes = (product: Product) => {
    if (product.category === "Calçados") return ["38", "39", "40", "41", "42", "43"];
    if (product.category === "Óculos") return ["Tamanho único"];
    return ["P", "M", "G", "GG"];
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.category === "Óculos" ? "Tamanho único" : "");
    setQuantity(1);
  };

  const addToCart = () => {
    if (!selectedProduct || !selectedSize) return;
    setCart((current) => {
      const existingIndex = current.findIndex((item) => item.product.name === selectedProduct.name && item.size === selectedSize);
      if (existingIndex >= 0) {
        return current.map((item, index) => index === existingIndex ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item);
      }
      return [...current, { product: selectedProduct, size: selectedSize, quantity }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));

  const productCard = (product: Product) => {
    const image = customImages[product.name] || product.image;
    return <article className="product-card" key={product.name}>
      <div
        className={`product-image ${image ? "" : "placeholder"}`}
        role="button"
        tabIndex={0}
        aria-label={`Ver informações de ${product.name}`}
        onClick={() => openProduct(product)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProduct(product);
          }
        }}
      >
        {image ? <img src={image} alt={product.name} /> : <div className="image-placeholder"><span>UOMO</span><p>Espaço para foto</p></div>}
        <span className="category-label">{product.category}</span>
        <label className="photo-upload" onClick={(event) => event.stopPropagation()}>+ Adicionar foto<input type="file" accept="image/*" onChange={(event) => addPhoto(product.name, event)} /></label>
      </div>
      <div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><small>{product.note}</small><div><strong>Valor sob consulta</strong><button onClick={() => openProduct(product)}>Ver produto</button></div></div>
    </article>;
  };

  return (
    <main>
      <div className="benefit-bar"><span>Envios para todo o Brasil</span><span>Consultoria especializada</span><span>Ajustes personalizados</span></div>
      <header className="header">
        <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <a href="#inicio" className="brand" aria-label="UOMO início"><span>UOMO</span><img src="https://catalogo-uomo-lavras.sebasgoleiro0320.chatgpt.site/uomo/logo.png" alt="" /></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#loja" onClick={() => setMenuOpen(false)}>Loja</a>
        </nav>
        <button className="bag" type="button" onClick={() => setCartOpen(true)} aria-label={`Carrinho com ${cartQuantity} itens`}><span>{cartQuantity}</span><span className="cart-icon" aria-hidden="true">🛒</span> Carrinho</button>
      </header>

      <nav className={`category-navbar ${categoryMenuOpen ? "category-open" : ""}`} aria-label="Categorias do catálogo">
        <button className="category-toggle" type="button" aria-expanded={categoryMenuOpen} onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>
          <span>Categorias</span><span>{categoryMenuOpen ? "−" : "+"}</span>
        </button>
        <div className="category-links">
          {categories.slice(1).map((category) => <a key={category} href="#catalogo" onClick={() => { setActive(category); setCategoryMenuOpen(false); }}>{category}</a>)}
        </div>
      </nav>

      <section className="hero" id="inicio">
        <img className="hero-accessibility-image" src="https://catalogo-uomo-lavras.sebasgoleiro0320.chatgpt.site/uomo/hero-cinza.webp" alt="Homem usando terno cinza em campanha de moda masculina da UOMO" loading="eager" fetchPriority="high" />
        <a className="hero-banner-link" href="#catalogo" aria-label="Explorar coleção de moda masculina UOMO" />
        <div className="hero-mobile-content"><p className="eyebrow">Moda masculina • Lavras, MG</p><h1>Vista sua<br /><em>melhor versão.</em></h1><p>Do casual à alfaiataria. Uma curadoria completa para homens que valorizam presença.</p><a href="#catalogo" className="primary">Explorar coleção <span>→</span></a></div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="section-heading"><div><p className="eyebrow">Seleção UOMO</p><h2>Encontre o seu estilo</h2></div><p>Escolha uma categoria, selecione suas peças e fale diretamente com um consultor.</p></div>
        <div className="search-wrap"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="O que você procura hoje?" aria-label="Buscar no catálogo" /></div>
        <div className="categories">{categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)}>{category}</button>)}</div>
        <div className="photo-notice"><strong>Área de fotos</strong><span>Use “Adicionar foto” para visualizar suas próprias imagens. A foto fica apenas neste aparelho durante a sessão.</span></div>
        {active === "Todos" && !search.trim() ? <div className="catalog-groups">
          {categories.slice(1).map((category) => {
            const categoryProducts = products.filter((product) => product.category === category);
            return <section className="catalog-group" key={category}>
              <div className="group-title"><h3>{category}</h3><button onClick={() => setActive(category)}>Ver categoria →</button></div>
              <div className="product-grid">{categoryProducts.map(productCard)}</div>
            </section>;
          })}
        </div> : <div className="product-grid">{filtered.map(productCard)}</div>}
        {!filtered.length && <p className="empty">Nenhuma peça encontrada. Tente outra busca.</p>}
      </section>

      <section className="store store-text-only" id="loja"><div><p className="eyebrow">Visite a UOMO</p><h2>Seu novo estilo começa aqui.</h2><p>Rua Dr. Francisco Sales, 576 B — Centro<br />Lavras, MG • CEP 37200-000</p><p className="store-note">Estacionamento exclusivo para clientes</p><a href={whatsapp} target="_blank" rel="noreferrer" className="primary">Agendar atendimento</a></div></section>

      {selectedProduct && <div className="product-modal-backdrop" role="presentation">
        <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
          <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Fechar detalhes">×</button>
          <div className="modal-gallery">
            {(customImages[selectedProduct.name] || selectedProduct.image) ? <img src={customImages[selectedProduct.name] || selectedProduct.image} alt={selectedProduct.name} /> : <div className="modal-placeholder"><span>UOMO</span><p>Imagem do produto</p></div>}
          </div>
          <div className="modal-details">
            <p className="modal-category">{selectedProduct.category}</p>
            <h2 id="product-detail-title">{selectedProduct.name}</h2>
            <p className="modal-note">{selectedProduct.note}</p>
            <div className="modal-price"><strong>Valor sob consulta</strong><span>Consulte disponibilidade com nossa equipe</span></div>
            <div className="size-heading"><strong>Selecione o tamanho</strong><span>Guia de medidas UOMO</span></div>
            <div className="size-options">{productSizes(selectedProduct).map((size) => <button key={size} type="button" className={selectedSize === size ? "selected" : ""} onClick={() => setSelectedSize(size)}>{size}</button>)}</div>
            <div className="quantity-row">
              <div><strong>Quantidade</strong><span>Escolha quantas peças deseja</span></div>
              <div className="quantity-control" aria-label="Selecionar quantidade">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Diminuir quantidade">−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} disabled={quantity === 10} aria-label="Aumentar quantidade">+</button>
              </div>
            </div>
            <ul className="product-benefits"><li>Atendimento personalizado</li><li>Ajustes disponíveis na loja</li><li>Envio para todo o Brasil</li></ul>
            <button className="add-to-cart" type="button" onClick={addToCart} disabled={!selectedSize}>Adicionar ao carrinho <span>🛒</span></button>
            {!selectedSize && <small className="size-warning">Escolha um tamanho para continuar.</small>}
          </div>
        </section>
      </div>}

      {cartOpen && <div className="cart-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="cart-header"><div><p className="eyebrow">Sua seleção</p><h2 id="cart-title">Carrinho</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho">×</button></div>
          {cart.length ? <>
            <div className="cart-items">
              {cart.map((item, index) => {
                const image = customImages[item.product.name] || item.product.image;
                return <article className="cart-item" key={`${item.product.name}-${item.size}`}>
                  <div className="cart-item-image">{image ? <img src={image} alt="" /> : <span>UOMO</span>}</div>
                  <div><p>{item.product.category}</p><h3>{item.product.name}</h3><span>Tamanho: {item.size} · Quantidade: {item.quantity}</span></div>
                  <button type="button" onClick={() => removeFromCart(index)} aria-label={`Remover ${item.product.name}`}>Remover</button>
                </article>;
              })}
            </div>
            <div className="cart-summary"><span>Total de peças</span><strong>{cartQuantity}</strong></div>
            <a className="cart-whatsapp" href={orderLink} target="_blank" rel="noreferrer">Finalizar pelo WhatsApp →</a>
            <button className="continue-shopping" type="button" onClick={() => setCartOpen(false)}>Continuar escolhendo</button>
          </> : <div className="empty-cart"><span>🛒</span><h3>Seu carrinho está vazio</h3><p>Escolha uma peça, selecione o tamanho e a quantidade para adicionar.</p><button type="button" onClick={() => setCartOpen(false)}>Ver catálogo</button></div>}
        </aside>
      </div>}

      <footer><a href="#inicio" className="footer-brand">UOMO</a><p>Moda masculina clássica para homens de presença.</p><div><a href="https://instagram.com/uomo_masculino" target="_blank" rel="noreferrer">Instagram</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="tel:+553534092342">(35) 3409-2342</a></div><small>© 2026 UOMO Moda Masculina • Lavras, MG</small></footer>
      {cart.length > 0 && <button type="button" onClick={() => setCartOpen(true)} className="floating-order">Ver carrinho <span>{cartQuantity}</span></button>}
    </main>
  );
}
