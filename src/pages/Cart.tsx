import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/lib/db";

const Cart = () => {
  const { data: items, remove, update } = useCollection("cart");

  const subtotal = items.reduce((acc, item: any) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-20" />
        <h1 className="text-3xl font-serif mb-4">سلة التسوق فارغة</h1>
        <p className="text-muted-foreground mb-8">لم تضف أي عطور إلى سلتك بعد.</p>
        <Button asChild className="px-10 py-6">
          <Link to="/shop">ابدأ التسوق</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-background text-right">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif mb-12">سلة التسوق</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map((item: any) => (
              <motion.div 
                layout
                key={item.id} 
                className="flex gap-6 pb-8 border-b border-border items-center"
              >
                <button onClick={() => remove(item.id!)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="flex-1 flex gap-6 items-center flex-row-reverse">
                  <div className="w-24 h-32 bg-muted overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif mb-1">{item.name}</h3>
                    <p className="text-muted-foreground mb-4">{item.price} ر.س</p>
                    
                    <div className="flex items-center gap-4 border w-fit px-2 py-1">
                      <button onClick={() => update(item.id!, { quantity: item.quantity + 1 })}><Plus className="w-4 h-4" /></button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        disabled={item.quantity <= 1}
                        onClick={() => update(item.id!, { quantity: item.quantity - 1 })}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-card p-8 h-fit border border-border">
            <h2 className="text-2xl font-serif mb-8">ملخص الطلب</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between flex-row-reverse">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between flex-row-reverse">
                <span className="text-muted-foreground">الشحن</span>
                <span className="text-green-600">مجاني</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between font-bold text-xl flex-row-reverse">
                <span>الإجمالي</span>
                <span>{subtotal} ر.س</span>
              </div>
            </div>
            <Button asChild className="w-full py-8 text-lg">
              <Link to="/checkout">إتمام الدفع <ArrowRight className="mr-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
