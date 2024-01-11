import LayoutContainer from "@/components/generic/LayoutContainer";
import HotDrinksList from "@/components/lists/HotDrinksList";

function HotDrinks() {
  return (
    <LayoutContainer
      title="نوشیدنی های گرم"
      description="در این صفحه لیست نوشیدنی های گرم را مشاهده می کنید."
    >
      <HotDrinksList />
    </LayoutContainer>
  );
}

export default HotDrinks;
