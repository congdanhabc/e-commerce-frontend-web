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

  const updateProfile = useCallback(async (updatedCustomer: ShopifyCustomerUpdateInput, newPassword?: string): Promise<boolean> => {
    if (!token) {
      setError('Bạn chưa đăng nhập.');
      return false;
    }

    setIsUpdating(true);
    setError(null);
    try {
      const result: ShopifyCustomerUpdateResult = await updateCustomerDetails(token, updatedCustomer, newPassword);
      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        setError(result.customerUserErrors[0].message);
        return false;
      }
      if (result.customer) {
        setCustomerData((prev) => ({
          ...(prev || {} as ShopifyCustomer),
          ...result.customer,
        }));
        return true;
      }
      return false;
    } catch (e: unknown) {
      setError((e instanceof Error) ? e.message : 'Không thể cập nhật thông tin cá nhân.');
      return false;
    }
    finally {
      setIsUpdating(false);
    }
  }, [token]);

  const updateAddress = useCallback(async (addressId: string, updatedAddress: ShopifyAddressUpdateInput): Promise<boolean> => {
    if (!token) {
        setError('Bạn chưa đăng nhập.');
        return false;
    }

    setIsUpdating(true);
    setError(null);
    try {
        const result: ShopifyAddressUpdateResult = await updateCustomerAddress(token, addressId, updatedAddress);
        if (result.customerUserErrors && result.customerUserErrors.length > 0) {
            setError(result.customerUserErrors[0].message);
            return false;
        }
        if (result.customerAddress) {
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
            return true;
        }
        return false;
    } catch (e: unknown) {
        setError((e instanceof Error) ? e.message : 'Không thể cập nhật địa chỉ.');
        return false;
    } finally {
        setIsUpdating(false);
    }
}, [token]);

const createAddress = useCallback(async (newAddress: ShopifyAddressUpdateInput): Promise<boolean> => {
    if (!token) {
        setError('Bạn chưa đăng nhập.');
        return false;
    }

    setIsUpdating(true);
    setError(null);
    try {
        const result: ShopifyAddressCreateResult = await createCustomerAddress(token, newAddress);
        if (result.customerUserErrors && result.customerUserErrors.length > 0) {
            setError(result.customerUserErrors[0].message);
            return false;
        }
        if (result.customerAddress) {
            await setDefaultCustomerAddress(token, result.customerAddress.id);
            setCustomerData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    defaultAddress: result.customerAddress as ShopifyCustomerAddress
                };
            });
            return true;
        }
        return false;
    } catch (e: unknown) {
        setError((e instanceof Error) ? e.message : 'Không thể tạo địa chỉ.');
        return false;
    } finally {
        setIsUpdating(false);
    }
}, [token]);

  useEffect(() => {
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
