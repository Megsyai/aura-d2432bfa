import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { useCollection } from "@/lib/db";

export const Navbar = () => {
  const { data: cartItems } = useCollection("cart");
  const cartCount = cartItems.reduce((acc, item: any) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="lg:hidden"><Menu className="w-5 h-5" /></button>
          <div className="hidden lg:flex items-center gap-6 text-sm uppercase tracking-widest font-medium">
            <Link to="/shop" className="hover:text-primary/60 transition-colors">المتجر</Link>
            <Link to="/collections" className="hover:text-primary/60 transition-colors">المجموعات</Link>
            <Link to="/about" className="hover:text-primary/60 transition-colors">عن Aura</Link>
          </div>
        </div>

        <Link to="/" className="text-3xl font-serif tracking-tighter">AURA</Link>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block"><Search className="w-5 h-5" /></button>
          <Link to="/profile"><User className="w-5 h-5" /></Link>
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
