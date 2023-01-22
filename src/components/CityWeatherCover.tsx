import styled from 'styled-components';
import { selectActiveCity, STATUS } from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 440px;
`;

const SideWidget = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: -50px;
  height: 280px;
  width: 140px;
  border-radius: 0 25px 25px 0;
  background: linear-gradient(180deg, #5374E7 0%, #77B9F5 100%);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  gap: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: #fff;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Temperature = styled.p`
  font-size: 50px;
  font-weight: bold;
`

const CardWrapper = styled.div`
  height: 440px;
  border-radius: 25px;
  overflow: hidden;
  background-color: lightblue;
  display: flex;
  align-items: center;
  padding-left: 140px;
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
`;

const CardContent = styled.div`
  height: 280px;
  padding: 10px;
`;

const CardTitle = styled.h1`
  color: #01175F;
  font-family: Poppins;
  font-size: 32px;
  line-height: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Date = styled.p`
  color: #01175F;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  margin-bottom: 10px;
`;

const WeatherText = styled.p`
  height: 18px;
  color: #01175F;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
`;

export const CityWeatherCover = () => {
  const activeCity = useAppSelector(selectActiveCity);
  const isDataLoading = activeCity.status === STATUS.LOADING;

  return (
    <Wrapper>
      <SideWidget>
        <Temperature>
          {activeCity.data?.current?.temp?.toFixed(0)}°
        </Temperature>
          <IconWrapper>
            <img src={`https://openweathermap.org/img/wn/${activeCity.data?.current?.weather[0]?.icon}@4x.png`} alt={activeCity.data?.current?.weather[0]?.description} />
          </IconWrapper>
      </SideWidget>
      <CardWrapper>
        <CardContent>
          <CardTitle>
            {activeCity.preview?.name}
          </CardTitle>
          <Date>
            Friday 18, september
          </Date>
          <WeatherText>
            {activeCity.data?.current?.weather[0]?.main}
          </WeatherText>
        </CardContent>
      </CardWrapper>
    </Wrapper>
  )
}

export default CityWeatherCover;