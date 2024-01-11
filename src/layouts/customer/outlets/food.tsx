import LayoutContainer from "@/components/generic/LayoutContainer";
import FoodList from "@/components/lists/FoodList";

function Food() {
  return (
    <LayoutContainer
      title="غذا"
      description="در این صفحه لیست غذا ها را مشاهده می کنید."
    >
      <FoodList />
    </LayoutContainer>
  );
}

export default Food;
