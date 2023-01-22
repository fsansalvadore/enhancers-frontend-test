// import { useEffect } from 'react';
import styled from 'styled-components';
import { selectActiveCity } from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';

const Wrapper = styled.div`
  padding: 30px;
`

const InnerCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.1);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
`

const Day = styled.p`
  font-size: 22px;
  font-weight: 600;
`

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Temperature = styled.p`
  font-size: 50px;
  font-weight: bold;
`

const Text = styled.p`
  margin-bottom: 10px;
  text-transform: capitalize;

  span {
    display: block;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

// TODO: Fill with correct dynamic data

export const WidgetMonthWeather = () => {
  const activeCity = useAppSelector(selectActiveCity);
  // const activeCityMonthly = useAppSelector(selectActiveCityMonthly);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(
  //     fetchActiveCityMonthlyData(activeCity.preview)
  //   )
  // }, [dispatch, activeCity.preview])

  return (
    <Wrapper>
      <InnerCard>
        <div>
          <Day>Fri, 25 Set</Day>
          <ImageWrapper>
            {
              !!activeCity?.data?.current?.weather[0] && 
                <img
                src={`https://openweathermap.org/img/wn/${activeCity?.data?.current?.weather[0]?.icon}@4x.png`}
                alt={activeCity?.data?.current?.weather[0]?.description}
                />
            }
          </ImageWrapper>
        </div>
        <div>
          <Temperature>{activeCity?.data?.current?.temp?.toFixed(0)}°</Temperature>
          <Text>{activeCity?.data?.current?.weather[0]?.description}</Text>
          <Text>The high will be 14°C, the low will be 8°C.</Text>
          <Text>
            <span>Humidity:</span>
            <span>UV:</span>
            <span>Dew point:</span>
          </Text>
        </div>
      </InnerCard>
    </Wrapper>
  )
}
