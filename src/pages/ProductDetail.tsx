import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/lib/db";
import { toast } from "sonner";

const PRODUCTS = [
  { id: 1, name: "Midnight Oud", price: 750, category: "خشبي", img: "https://images.unsplash.com/photo-1544467328-345179a4b7a9?auto=format&fit=crop&q=80&w=800", desc: "مزيج ساحر من دهن العود المعتق مع لمسات من البخور والجلود. عطر يعكس الفخامة والغموض في آن واحد." },
  { id: 2, name: "Desert Rose", price: 620, category: "زهري", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800", desc: "جوهر الورد الطائفي الممزوج مع المسك الأبيض وخشب الصندل. أنوثة طاغية ورقة لا تضاهى." },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { insert, data: cartItems, update } = useCollection("cart");
  
  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];

  const addToCart = () => {
    const existing = cartItems.find((item: any) => item.productId === product.id);
    if (existing) {
      update(existing.id!, { quantity: existing.quantity + 1 });
    } else {
      insert({ productId: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
    }
    toast.success("تمت إضافة المنتج إلى السلة");
  };

  return (
    <div className="pt-32 pb-24 bg-background text-right">
      <div className="container mx-auto px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm mb-12 hover:text-primary/60">
          <ArrowLeft className="w-4 h-4 rotate-180" /> العودة للمتجر
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] bg-muted overflow-hidden"
          >
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-primary/60 mb-4">{product.category}</span>
            <h1 className="text-5xl font-serif mb-6">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-8 justify-end text-yellow-600">
              <span className="text-sm text-muted-foreground mr-2">(124 مراجعة)</span>
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>

            <p className="text-3xl font-serif mb-8">{product.price} ر.س</p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {product.desc}
            </p>

            <div className="flex gap-4 mb-12">
              <Button onClick={addToCart} className="flex-1 py-8 text-lg bg-primary text-white">
                إضافة للسلة <ShoppingBag className="mr-2 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-border">
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <p className="font-medium">شحن سريع</p>
                  <p className="text-xs text-muted-foreground">خلال 2-3 أيام عمل</p>
                </div>
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <p className="font-medium">منتج أصلي 100%</p>
                  <p className="text-xs text-muted-foreground">ضمان الجودة من Aura</p>
                </div>
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
