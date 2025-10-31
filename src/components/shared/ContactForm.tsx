import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập tên";
    if (!form.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email không hợp lệ";
    if (!form.message.trim()) e.message = "Vui lòng nhập nội dung";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    setErrorMsg(null);

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    setSubmitting(true);
    try {
      // Simulate network request for demo. Replace with fetch to your API when ready.
      await new Promise((res) => setTimeout(res, 700));
      setSuccess("Cảm ơn bạn! Tin nhắn đã được gửi.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {success && <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-700">{success}</div>}
      {errorMsg && <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-700">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              value={form.name}
              onChange={(evt) => setForm({ ...form, name: evt.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:ring-0 p-3"
              placeholder="Nguyễn Văn A"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={form.email}
              onChange={(evt) => setForm({ ...form, email: evt.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:ring-0 p-3"
              placeholder="example@domain.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại (tuỳ chọn)</label>
            <input
              value={form.phone}
              onChange={(evt) => setForm({ ...form, phone: evt.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:ring-0 p-3"
              placeholder="0936 018 360"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chủ đề</label>
            <input
              value={form.subject}
              onChange={(evt) => setForm({ ...form, subject: evt.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:ring-0 p-3"
              placeholder="Ví dụ: Vấn đề đơn hàng #12345"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nội dung</label>
          <textarea
            value={form.message}
            onChange={(evt) => setForm({ ...form, message: evt.target.value })}
            rows={6}
            className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:ring-0 p-3"
            placeholder="Mô tả chi tiết vấn đề hoặc yêu cầu của bạn"
          />
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {submitting ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm({ name: "", email: "", phone: "", subject: "", message: "" });
              setErrors({});
              setSuccess(null);
              setErrorMsg(null);
            }}
            className="h-12 px-4 rounded-lg border border-gray-200 bg-white"
          >
            Xoá
          </button>
        </div>
      </form>
    </div>
  );
}
