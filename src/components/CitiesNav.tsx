import { connect } from 'react-redux'
import styled from 'styled-components';
import tw from 'twin.macro'
import {
  selectActiveCity,
  selectCities,
  STATUS
} from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';
import { CityPreviewCard } from './CityPreviewCard';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 440px;
`;

const ButtonWrapper = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const Button = tw.button`flex items-center gap-3 [color: #01175F] [font-size: 20px] [font-weight: 600]`;
const CardsWrapper = tw.div`relative flex flex-col items-center h-auto w-full gap-3 md:gap-7`

export const CitiesNav = () => {
  const loadedCities = useAppSelector(selectCities);
  const activeCity = useAppSelector(selectActiveCity);
  const areCitiesLoading = loadedCities.status === STATUS.LOADING;
  
  const handleAddCity = () => {
    alert("Aggiungi nuova città");
  }

  // const cities = [
  //   {
  //     name: SAVED_CITIES.TURIN,
  //     localTime: "2:38 p.m.",
  //     localDate: "Friday 18",
  //     localMonth: "september",
  //     temperature: "22",
  //   },
  //   {
  //     name: SAVED_CITIES.LONDON,
  //     localTime: "2:38 p.m.",
  //     localDate: "Friday 18",
  //     localMonth: "september",
  //     temperature: "18",
  //   },
  //   {
  //     name: SAVED_CITIES.ROME,
  //     localTime: "2:38 p.m.",
  //     localDate: "Friday 18",
  //     localMonth: "september",
  //     temperature: "20",
  //   },
  // ]

  const citiesToShow = loadedCities.data?.filter((city) => {
    const isLonEqual = city?.lon === activeCity.data?.lon;
    const isLatEqual = city?.lat === activeCity.data?.lat;

    return !isLonEqual && !isLatEqual;
  }).slice(0,2)

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={handleAddCity}>
          <img src="./images/Plus.png" alt="plus" /> Aggiungi città
        </Button>
      </ButtonWrapper>
      <CardsWrapper>
        {
          areCitiesLoading
          ? <div>empty state</div>
          : citiesToShow?.map(city => <CityPreviewCard key={city.name} city={city} />)
        }
      </CardsWrapper>
    </Wrapper>
  )
}

const mapStateToProps = (_state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesNav)