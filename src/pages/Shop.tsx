import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Midnight Oud", price: 750, category: "خشبي", img: "https://images.unsplash.com/photo-1544467328-345179a4b7a9?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Desert Rose", price: 620, category: "زهري", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Amber Silk", price: 580, category: "شرقي", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Mystic Musk", price: 490, category: "مسك", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Royal Jasmine", price: 680, category: "زهري", img: "https://images.unsplash.com/photo-1588405864443-f71bc4999efb?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Cedar Breeze", price: 540, category: "خشبي", img: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800" },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filtered = activeCategory === "الكل" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-right">
      <div className="container mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-5xl font-serif mb-4">المتجر الحصري</h1>
          <p className="text-muted-foreground">تصفح مجموعتنا المختارة من أرقى العطور العالمية.</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 border-b border-border pb-6">
          <div className="flex items-center gap-4 order-2 md:order-1">
            <span className="text-sm font-medium">ترتيب حسب:</span>
            <button className="flex items-center gap-2 text-sm border px-4 py-2 hover:bg-muted">
              الأكثر مبيعاً <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2 order-1 md:order-2 no-scrollbar">
            {["الكل", "خشبي", "زهري", "شرقي", "مسك"].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-primary font-bold border-b border-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filtered.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={product.id}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-muted mb-6 relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-lg text-primary font-serif">{product.price} ر.س</span>
                  <div className="text-right">
                    <h3 className="text-xl font-serif mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
