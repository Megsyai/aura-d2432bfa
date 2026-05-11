import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Perfume"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white text-right">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.3em] text-sm mb-4"
          >
            مجموعة الخريف الحصرية
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
          >
            أثرٌ لا يُنسى، <br /> وهالةٌ تسحر.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-10 py-8 text-lg">
              <Link to="/shop">اكتشف المجموعة <ArrowRight className="mr-2 w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 text-right">
            <Link to="/shop" className="text-sm uppercase tracking-widest border-b border-primary pb-1">عرض الكل</Link>
            <h2 className="text-4xl font-serif">الأكثر مبيعاً</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-right">
            {[
              { id: 1, name: "Midnight Oud", price: "750 ر.س", img: "https://images.unsplash.com/photo-1544467328-345179a4b7a9?auto=format&fit=crop&q=80&w=800" },
              { id: 2, name: "Desert Rose", price: "620 ر.س", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" },
              { id: 3, name: "Amber Silk", price: "580 ر.س", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800" }
            ].map((product, idx) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted mb-6">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-24 border-y border-border">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 text-right">
            <span className="text-primary/60 uppercase tracking-widest text-sm mb-6 block">فلسفتنا</span>
            <h2 className="text-5xl font-serif mb-8 leading-snug">العطر هو القصيدة التي يقرؤها الآخرون بصمت.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              في Aura، نؤمن أن العطر ليس مجرد رائحة، بل هو امتداد للشخصية، وذكرى تُحفر في الأذهان. نختار أندر المكونات من قلب الطبيعة لنصنع لك هالة تليق بك.
            </p>
            <Button variant="outline" className="px-10 py-6 border-primary">قصتنا</Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1616948055600-a1911722306d?auto=format&fit=crop&q=80&w=1000" 
                alt="Process"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-10 -left-10 w-2/3 h-2/3 border-8 border-background z-10 overflow-hidden hidden md:block">
                <img src="https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
