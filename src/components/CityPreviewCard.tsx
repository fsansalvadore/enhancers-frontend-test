import { connect } from 'react-redux'
import styled from 'styled-components';
import { activeCitySelected } from '../redux/features/app/appSlice';
import { useAppDispatch } from '../redux/hooks';

const CityCard = styled.button`
  height: 140px;
  width: 100%;
  border-radius: 25px;
  background: linear-gradient(120deg, #011354 0%, #5B9FE3 100%);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  width: 35%;
`

const CardTitle = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
`

const LocalTime = styled.p`
  font-size: 12px;
  font-weight: 300;
`

const LocalDate = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 17px;
`

const ImageWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TempWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const Temperature = styled.p`
  font-size: 50px;
  font-weight: bold;
`

export const CityPreviewCard = ({city}: {city: any}) => {
  const dispatch = useAppDispatch();

  const handleCitySelection = () => {
    dispatch(
      activeCitySelected(city)
    )
  }

  return (
    <CityCard onClick={handleCitySelection}>
      <InfoWrapper>
        <CardTitle>
          {city.name}
        </CardTitle>
        <LocalDate>
          <div>
            {city.localDate},
          </div>
          <div>
            {city.localMonth}
          </div>
        </LocalDate>
        <LocalTime>
          {city.localTime}
        </LocalTime>
      </InfoWrapper>
      <ImageWrapper>
        <img src={`https://openweathermap.org/img/wn/${city.current?.weather[0]?.icon}@4x.png`} alt={city.current?.weather[0]?.description} />
      </ImageWrapper>
      <TempWrapper>
        <Temperature>{city.current?.temp?.toFixed(0)}°</Temperature>
      </TempWrapper>
    </CityCard>
  )
}

const mapStateToProps = (_state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CityPreviewCard)