import LayoutContainer from "@/components/generic/LayoutContainer";
import ColdDrinksList from "@/components/lists/ColdDrinksList";

function ColdDrinks() {
  return (
    <LayoutContainer
      title="نوشیدنی های سرد"
      description="در این صفحه لیست نوشیدنی های سرد را مشاهده می کنید."
    >
      <ColdDrinksList />
    </LayoutContainer>
  );
}

export default ColdDrinks;
