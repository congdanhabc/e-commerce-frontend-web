import React, { useState, useEffect } from 'react';
import { useCustomerProfile } from '../../hooks/auth/useCustomerProfile';
import { countries } from '../../data/countries';

export default function ProfilePage() {
  const { customerData, loading, error, isUpdating, updateProfile, updateAddress, createAddress } = useCustomerProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (customerData) {
      setFirstName(customerData.firstName || '');
      setLastName(customerData.lastName || '');
      setEmail(customerData.email || '');
      setPhone(customerData.phone || '');
      if (customerData.defaultAddress) {
        setAddress1(customerData.defaultAddress.address1 || '');
        setCity(customerData.defaultAddress.city || '');
        setCountry(customerData.defaultAddress.country || '');
        setZip(customerData.defaultAddress.zip || '');
      }
    }
  }, [customerData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    if (!customerData) {
      setMessage("Không tìm thấy dữ liệu khách hàng.");
      setMessageType("error");
      return;
    }

    const profileChanges: { [key: string]: string } = {};
    if (firstName !== (customerData.firstName || '')) profileChanges.firstName = firstName;
    if (lastName !== (customerData.lastName || '')) profileChanges.lastName = lastName;
    if (email !== (customerData.email || '')) profileChanges.email = email;
    if (phone !== (customerData.phone || '')) profileChanges.phone = phone;

    const addressChanges: { [key: string]: string } = {};
    const newAddress: { [key: string]: string } = {};

    if (customerData.defaultAddress) {
        if (address1 !== (customerData.defaultAddress.address1 || '')) addressChanges.address1 = address1;
        if (city !== (customerData.defaultAddress.city || '')) addressChanges.city = city;
        if (country !== (customerData.defaultAddress.country || '')) addressChanges.country = country;
        if (zip !== (customerData.defaultAddress.zip || '')) addressChanges.zip = zip;
    } else {
        if (address1) newAddress.address1 = address1;
        if (city) newAddress.city = city;
        if (country) newAddress.country = country;
        if (zip) newAddress.zip = zip;
    }

    if (Object.keys(profileChanges).length === 0 && Object.keys(addressChanges).length === 0 && Object.keys(newAddress).length === 0 && !newPassword) {
      setMessage('Không có thông tin nào được thay đổi.');
      setMessageType('error');
      return;
    }

    let overallSuccess = true;
    let successMessages: string[] = [];
    let errorMessages: string[] = [];

    // Profile Update
    if (Object.keys(profileChanges).length > 0 || newPassword) {
        const profileError = await updateProfile(profileChanges, newPassword || undefined); // Renamed to profileError
        if (!profileError) { // Check if it's null (success)
            successMessages.push('Cập nhật thông tin cá nhân thành công!');
            setNewPassword('');
        } else { // It's a string (error message)
            overallSuccess = false;
            errorMessages.push(profileError); // Use the returned error message directly
        }
    }

    // Address Update
    if (Object.keys(addressChanges).length > 0 && customerData.defaultAddress) {
        const addressError = await updateAddress(customerData.defaultAddress.id, addressChanges); // Renamed to addressError
        if (!addressError) { // Check if it's null (success)
            successMessages.push('Cập nhật địa chỉ thành công!');
        } else { // It's a string (error message)
            overallSuccess = false;
            errorMessages.push(addressError); // Use the returned error message directly
        }
    } else if (Object.keys(newAddress).length > 0) { // Address Create
        const addressError = await createAddress(newAddress); // Renamed to addressError
        if (!addressError) { // Check if it's null (success)
            successMessages.push('Thêm địa chỉ thành công!');
        } else { // It's a string (error message)
            overallSuccess = false;
            errorMessages.push(addressError); // Use the returned error message directly
        }
    }

    if (overallSuccess && successMessages.length > 0) {
        setMessage(successMessages.join(' '));
        setMessageType('success');
    } else if (errorMessages.length > 0) {
        setMessage(errorMessages.join(' \n')); // Use newline for multiple errors
        setMessageType('error');
    } else { // If no specific success or error messages, clear previous messages
        setMessage(null);
        setMessageType(null);
    }
    // Remove the final 'if (error)' block as it's no longer needed


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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại (ví dụ: +84123456789)</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <h2 className="text-xl font-bold mt-6">Địa chỉ mặc định</h2>
          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              type="text"
              id="address1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Thành phố</label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Quốc gia</label>
            <select
              id="country"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={isUpdating}
            >
              <option value="">Chọn quốc gia</option>
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Mã bưu điện</label>
            <input
              type="text"
              id="zip"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <h2 className="text-xl font-bold mt-6">Thay đổi mật khẩu</h2>
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
