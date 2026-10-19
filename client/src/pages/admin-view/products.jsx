import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { addProductFormElements } from "@/config";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import "react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductSheet, setOpenCreateProductSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    // Handle form submission logic here
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: { ...formData, image: uploadedImageUrl || formData.image },
          }),
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductSheet(false);
            setImageFile(null);
            setUploadedImageUrl("");
            setFormData(initialFormData);
            setCurrentEditedId(null);
            toast.add({ title: "Product updated successfully" });
          }
        })
      :
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      }),
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductSheet(false);
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData(initialFormData);
        toast.add({
          title: "Product add successfully",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(" productList:", currentEditedId);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductSheet(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductSheet={setOpenCreateProductSheet}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
              ></AdminProductTile>
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductSheet}
        onOpenChange={() => {
          setOpenCreateProductSheet(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto p-2">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
