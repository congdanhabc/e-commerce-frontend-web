import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../providers/auth/useContextAuth';
import { fetchCustomerDetails, updateCustomerDetails, updateCustomerAddress, createCustomerAddress, setDefaultCustomerAddress } from '../../api/customer-api';
import type { ShopifyCustomer, ShopifyCustomerUpdateInput, ShopifyCustomerUpdateResult, ShopifyAddressUpdateInput, ShopifyAddressUpdateResult, ShopifyAddressCreateResult, ShopifyCustomerAddress } from '../../api/customer-api';
import { useNavigate } from 'react-router-dom';

export function useCustomerProfile() {
  const { token, isLoggedIn, onLogout } = useAuth();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState<ShopifyCustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchCustomerDetails(token);
      if (data) {
        setCustomerData(data);
      } else {
        // If token is invalid or expired, log out
        onLogout();
        navigate('/login');
      }
    } catch (e: unknown) { 
      setError((e instanceof Error) ? e.message : 'Không thể tải thông tin cá nhân.');
      onLogout(); // Log out on error fetching profile
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [token, onLogout, navigate]);

  const updateProfile = useCallback(async (updatedCustomer: ShopifyCustomerUpdateInput, newPassword?: string): Promise<string | null> => {
    if (!token) {
      setError('Bạn chưa đăng nhập.');
      return null;
    }

    setIsUpdating(true);
    setError(null);
    let resultMessage: string | null = null; // To store the message to be returned

    try {
      const result: ShopifyCustomerUpdateResult = await updateCustomerDetails(token, updatedCustomer, newPassword);
      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        const error = result.customerUserErrors[0];
        const field = error.field && error.field.length > 0 ? `Trường: ${error.field.join(', ')}. ` : '';
        resultMessage = `${field}${error.message}`;
        setError(resultMessage);
      } else if (result.customer) {
        setCustomerData((prev) => ({
          ...(prev || {} as ShopifyCustomer),
          ...result.customer,
        }));
        resultMessage = null; // Success
      } else {
        resultMessage = 'Không thể cập nhật thông tin cá nhân.'; // Fallback if no specific error or customer
        setError(resultMessage);
      }
    } catch (e: unknown) {
      resultMessage = (e instanceof Error) ? e.message : 'Không thể cập nhật thông tin cá nhân.';
      setError(resultMessage);
    } finally {
      setIsUpdating(false);
    }
    return resultMessage; // Return the stored message
  }, [token]);

  const updateAddress = useCallback(async (addressId: string, updatedAddress: ShopifyAddressUpdateInput): Promise<string | null> => {
    if (!token) {
        setError('Bạn chưa đăng nhập.');
        return 'Bạn chưa đăng nhập.'; // Return string error
    }

    setIsUpdating(true);
    setError(null);
    let resultMessage: string | null = null; // To store the message to be returned

    try {
        const result: ShopifyAddressUpdateResult = await updateCustomerAddress(token, addressId, updatedAddress); // result declared here
        if (result.customerUserErrors && result.customerUserErrors.length > 0) {
            const error = result.customerUserErrors[0];
            const field = error.field && error.field.length > 0 ? `Trường: ${error.field.join(', ')}. ` : '';
            resultMessage = `${field}${error.message}`;
            setError(resultMessage);
        } else if (result.customerAddress) {
            setCustomerData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    defaultAddress: {
                        ...(prev.defaultAddress || { id: addressId }),
                        ...result.customerAddress
                    } as ShopifyCustomerAddress
                };
            });
            resultMessage = null; // Success
        } else {
            resultMessage = 'Không thể cập nhật địa chỉ.'; // Fallback if no specific error or customerAddress
            setError(resultMessage);
        }
    } catch (e: unknown) {
        resultMessage = (e instanceof Error) ? e.message : 'Không thể cập nhật địa chỉ.';
        setError(resultMessage);
    } finally {
        setIsUpdating(false);
    }
    return resultMessage; // Return the stored message
  }, [token]);

const createAddress = useCallback(async (newAddress: ShopifyAddressUpdateInput): Promise<string | null> => {
    if (!token) {
        setError('Bạn chưa đăng nhập.');
        return 'Bạn chưa đăng nhập.'; // Return string error
    }

    setIsUpdating(true);
    setError(null);
    let resultMessage: string | null = null; // To store the message to be returned

    try {
        const result: ShopifyAddressCreateResult = await createCustomerAddress(token, newAddress);
        if (result.customerUserErrors && result.customerUserErrors.length > 0) {
            const error = result.customerUserErrors[0];
            const field = error.field && error.field.length > 0 ? `Trường: ${error.field.join(', ')}. ` : '';
            resultMessage = `${field}${error.message}`;
            setError(resultMessage);
        } else if (result.customerAddress) {
            await setDefaultCustomerAddress(token, result.customerAddress.id);
            setCustomerData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    defaultAddress: result.customerAddress as ShopifyCustomerAddress
                };
            });
            resultMessage = null; // Success
        } else {
            resultMessage = 'Không thể tạo địa chỉ.'; // Fallback if no specific error or customerAddress
            setError(resultMessage);
        }
    } catch (e: unknown) {
        resultMessage = (e instanceof Error) ? e.message : 'Không thể tạo địa chỉ.';
        setError(resultMessage);
    } finally {
        setIsUpdating(false);
    }
    return resultMessage; // Return the stored message
  }, [token]); // <--- This is the end of createAddress useCallback

  useEffect(() => { // <--- Correctly placed useEffect
    if (isLoggedIn) {
      fetchProfile();
    } else {
      // If not logged in, redirect to login page
      navigate('/login');
    }
  }, [isLoggedIn, fetchProfile, navigate]);

  return {
    customerData,
    loading,
    error,
    isUpdating,
    fetchProfile,
    updateProfile,
    updateAddress,
    createAddress,
  };
}
