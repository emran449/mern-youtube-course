import { useEffect, useState } from 'react';
import CommonForm from '../common/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewAddress,
  deleteAddress,
  editAnAddress,
  fetchAllAddresses,
} from '@/store/shop/address-slice';
import AddressCard from './address-card';
import { toast } from '../ui/toast';

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pinCode: '',
  notes: '',
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      toast.add({
        title: 'You can add max 3 addresses.',
        type: "error",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAnAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.add({
              title: 'Address updated successfully.',
              type: "success",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast.add({
              title: 'Address added successfully.',
              type: "success",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    console.log(getCurrentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.add({
          title: 'Address deleted successfully.',
          type: "warning",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pinCode: getCurrentAddress?.pinCode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== '')
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  console.log(addressList, 'addressList');

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem, index) => (
              <AddressCard
                key={index}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? 'Edit Address' : 'Add New Address'}
        </CardTitle>
      </CardHeader>
      <CardContent className={'space-y-3'}>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
