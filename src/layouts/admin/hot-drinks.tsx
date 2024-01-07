import LayoutContainer from "@/components/generic/LayoutContainer";
import ColdDrinksList from "@/components/lists/ColdDrinksList";

function HotDrinks() {
  return (
    <LayoutContainer
      title="نوشیدنی های گرم"
      description="در این صفحه لیست نوشیدنی های گرم را مشاهده می کنید."
    >
      <ColdDrinksList />
    </LayoutContainer>
  );
}

export default HotDrinks;
