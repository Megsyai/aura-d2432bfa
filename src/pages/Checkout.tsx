import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCollection } from "@/lib/db";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { data: items, clear } = useCollection("cart");
  const [complete, setComplete] = useState(false);

  const subtotal = items.reduce((acc, item: any) => acc + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplete(true);
    clear();
    toast.success("تم استلام طلبك بنجاح!");
    setTimeout(() => navigate("/"), 4000);
  };

  if (complete) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen bg-background">
        <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-primary animate-bounce" />
        <h1 className="text-4xl font-serif mb-4">شكراً لتسوقك مع Aura</h1>
        <p className="text-muted-foreground mb-8 text-lg">طلبك قيد المعالجة الآن. ستصلك رسالة تأكيد قريباً.</p>
        <p className="text-sm text-muted-foreground">سيتم توجيهك للصفحة الرئيسية خلال لحظات...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-background text-right min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif mb-12">إتمام الطلب</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 justify-end">معلومات الشحن <Truck className="w-5 h-5" /></h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الاسم الأخير</Label>
                  <Input required className="bg-transparent border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label>الاسم الأول</Label>
                  <Input required className="bg-transparent border-primary/20" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>العنوان بالتفصيل</Label>
                  <Input required className="bg-transparent border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label>الرمز البريدي</Label>
                  <Input required className="bg-transparent border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Input required className="bg-transparent border-primary/20" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 justify-end">الدفع <CreditCard className="w-5 h-5" /></h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>رقم البطاقة</Label>
                  <Input placeholder="0000 0000 0000 0000" required className="bg-transparent border-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رمز التحقق (CVV)</Label>
                    <Input placeholder="123" required className="bg-transparent border-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label>تاريخ الانتهاء</Label>
                    <Input placeholder="MM/YY" required className="bg-transparent border-primary/20" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="bg-card p-8 h-fit border border-border sticky top-32">
            <h2 className="text-2xl font-serif mb-8">ملخص الدفع</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between flex-row-reverse">
                <span className="text-muted-foreground">المجموع</span>
                <span>{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between flex-row-reverse">
                <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                <span>{(subtotal * 0.15).toFixed(2)} ر.س</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between font-bold text-xl flex-row-reverse">
                <span>الإجمالي النهائي</span>
                <span>{(subtotal * 1.15).toFixed(2)} ر.س</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end text-sm text-muted-foreground mb-8">
              <span>جميع المعاملات مشفرة وآمنة</span>
              <ShieldCheck className="w-4 h-4 text-green-600" />
            </div>

            <Button type="submit" className="w-full py-8 text-lg">
              تأكيد الطلب والدفع
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
