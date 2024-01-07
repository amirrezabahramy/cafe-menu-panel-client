import LayoutContainer from "@/components/generic/LayoutContainer";
import ReviewsList from "@/components/lists/ReviewsList";

function reviews() {
  return (
    <LayoutContainer
      title="نظرات"
      description="در این صفحه نظرات کاربران در مورد محصولات را مشاهده می کنید."
    >
      <ReviewsList />
    </LayoutContainer>
  );
}

export default reviews;
