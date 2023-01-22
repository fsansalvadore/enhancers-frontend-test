import { connect } from 'react-redux'
import styled from 'styled-components';
import tw from 'twin.macro'
import {
  selectActiveCity,
  selectCities
} from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';
import { STATUS } from '../utils/constants';
import { getOtherCitiesToShow } from '../utils/helpers';
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
  const citiesToShow = getOtherCitiesToShow(loadedCities, activeCity);
  
  const handleAddCity = () => {
    alert("Aggiungi nuova città");
  }

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
          : citiesToShow?.map((city: any) => <CityPreviewCard key={city.name} city={city} />)
        }
      </CardsWrapper>
    </Wrapper>
  )
}

const mapStateToProps = (_state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesNav)