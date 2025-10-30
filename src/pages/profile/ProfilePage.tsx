import React, { useState, useEffect } from 'react';
import { useCustomerProfile } from '../../hooks/auth/useCustomerProfile';

export default function ProfilePage() {
  const { customerData, loading, error, isUpdating, updateProfile } = useCustomerProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (customerData) {
      setFirstName(customerData.firstName || '');
      setLastName(customerData.lastName || '');
      setEmail(customerData.email || '');
      setPhone(customerData.phone || '');
    }
  }, [customerData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    const updatedCustomer = {
      firstName,
      lastName,
      email,
      phone,
    };

    const success = await updateProfile(updatedCustomer, newPassword || undefined);

    if (success) {
      setMessage('Cập nhật thông tin thành công!');
      setMessageType('success');
      setNewPassword('');
    } else if (error) {
      setMessage(error);
      setMessageType('error');
    } else {
      setMessage('Cập nhật thông tin thất bại.');
      setMessageType('error');
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Đang tải thông tin...</div>;
  }

  if (error && messageType !== 'error') {
    return <div className="container mx-auto p-4 text-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {message && (
          <div className={`p-3 mb-4 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Họ</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isUpdating}
          >
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
          </button>
        </form>
      </div>
    </div>
  );
}
