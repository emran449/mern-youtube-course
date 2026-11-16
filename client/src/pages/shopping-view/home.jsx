import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Code2,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/toast';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'women', icon: CloudLightning },
  { id: 'kids', label: 'kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: 'nike', label: 'Nike', icon: Code2 },
  { id: 'adidas', label: 'Adidas', icon: ShirtIcon },
  { id: 'puma', label: 'Puma', icon: ShirtIcon },
  { id: 'levi', label: "Levi's", icon: ShirtIcon },
  { id: 'zara', label: 'Zara', icon: ShirtIcon },
  { id: 'h&m', label: 'H&M', icon: ShirtIcon },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateTolistingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }


  function handleGetProductDetails(getCurrentProductId) {
      dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast.add({
  title: "Product is added to Cart",
})
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      }),
    );
  }, [dispatch]);

  console.log(productList, 'productList');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
            )
          }
          className={
            'absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className={
            'absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateTolistingPage(categoryItem, 'category')
                }
                className={'cursor-pointer hover:shadow-lg transition-shadow'}
              >
                <CardContent
                  className={'flex flex-col items-center justify-center p-6'}
                >
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
              onClick={() =>
                  handleNavigateTolistingPage(brandItem, 'brand')
                }
                className={'cursor-pointer hover:shadow-lg transition-shadow'}
              >
                <CardContent
                  className={'flex flex-col items-center justify-center p-6'}
                >
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                  handleGetProductDetails ={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                   product={productItem} />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
