import ContactForm from "../../components/shared/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero banner */}
      <div className="w-full mb-8">
        <div
          className="mx-auto max-w-6xl rounded-xl overflow-hidden"
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}
        >
          <div
            className="w-full h-48 bg-center bg-cover flex items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1400&q=80')",
            }}
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-r-md ml-8">
              <h1 className="text-3xl font-bold">Liên hệ</h1>
              <p className="text-gray-600">Chúng tôi sẵn sàng hỗ trợ bạn 24/7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Left contact cards */}
        <div className="space-y-4 lg:col-span-1">
          <ContactCard icon={<Phone className="w-6 h-6 text-blue-600" />} title="Điện thoại" subtitle="Thứ 2 - Thứ 7: 08:00 - 22:00">
            <a href="tel:0936018360" className="text-blue-600 font-medium block">0936 018 360</a>
          </ContactCard>

          <ContactCard icon={<Mail className="w-6 h-6 text-blue-600" />} title="Email" subtitle="Phản hồi trong vòng 24 giờ">
            <a href="mailto:shopbesupport@gmail.com" className="text-blue-600 font-medium block">shopbesupport@gmail.com</a>
          </ContactCard>

          <ContactCard icon={<MapPin className="w-6 h-6 text-blue-600" />} title="Địa chỉ văn phòng" subtitle="Quận 5, TP. HCM">
            <span className="text-gray-700 block">273 An Dương Vương, Phường Chợ Quán</span>
          </ContactCard>

          <ContactCard icon={<Clock className="w-6 h-6 text-blue-600" />} title="Giờ làm việc" subtitle="Thứ 2 - Thứ 7">
            <span className="text-gray-700 block">08:00 - 22:00</span>
          </ContactCard>
        </div>

        {/* Right - form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">Gửi tin nhắn cho chúng tôi</h2>
            <p className="text-gray-500 mb-6">Điền thông tin và mô tả yêu cầu — chúng tôi sẽ liên hệ sớm nhất có thể.</p>

            <ContactForm />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <iframe
            title="shop-map"
            src="https://www.google.com/maps?q=273+An+D%C6%B0%C6%A1ng+V%C6%B0%C6%A1ng+Ho+Chi+Minh&output=embed"
            className="w-full h-64 border-0"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-center text-xl font-semibold mb-6">Câu hỏi thường gặp</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQCard title="Thời gian giao hàng là bao lâu?">Thời gian giao hàng thông thường từ 2-4 ngày làm việc tuỳ theo khu vực. Đối với các đơn hàng nhỏ, có thể nhận hàng trong ngày.</FAQCard>
          <FAQCard title="Làm thế nào để theo dõi đơn hàng?">Sau khi đặt hàng, bạn sẽ nhận được email xác nhận kèm mã vận đơn. Dùng mã đó để theo dõi trên website của đơn vị vận chuyển.</FAQCard>
          <FAQCard title="Chính sách đổi trả như thế nào?">Chúng tôi áp dụng chính sách đổi trả trong vòng 30 ngày kể từ ngày nhận hàng, nếu sản phẩm còn nguyên tem mác và chưa qua sử dụng.</FAQCard>
          <FAQCard title="Các hình thức thanh toán?">Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử và COD.</FAQCard>
        </div>
      </div>
    </div>
  );
}

function ContactCard(props: any) {
  const { icon, title, subtitle, children } = props;
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

function FAQCard(props: any) {
  const { title, children } = props;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  );
}
