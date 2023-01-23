import styled, { css } from 'styled-components';
import { selectActiveCity } from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';
import moment from 'moment';
import {
  getCoverByCity,
  getFormattedTemperature,
  mapWeatherToBackground,
} from '../utils/helpers';
import { STATUS } from '../utils/constants';

const Wrapper = styled.div<{ img?: string; isLoading?: boolean }>`
  position: relative;
  width: 100%;
  height: 440px;
  opacity: 1;
  transition: opacity 0.2s ease;

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.5;
    `}
`;

const SideWidget = styled.div<{ bgGradient?: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: -16px;
  height: 280px;
  width: 140px;
  border-radius: 0 25px 25px 0;
  background: ${({ bgGradient }) => bgGradient};
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: #fff;

  @media (min-width: 768px) {
    left: -50px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Temperature = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

const CardWrapper = styled.div<{ img?: string }>`
  height: 440px;
  border-radius: 25px;
  overflow: hidden;
  background-color: lightblue;
  display: flex;
  align-items: center;
  padding-left: 140px;
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17);
  background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.35),
      rgba(255, 255, 255, 0)
    ),
    url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const CardContent = styled.div`
  height: 280px;
  padding: 10px;
`;

const CardTitle = styled.h1`
  color: #01175f;
  font-family: Poppins;
  font-size: 32px;
  line-height: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Date = styled.p`
  color: #01175f;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  margin-bottom: 10px;
`;

const WeatherText = styled.p`
  height: 18px;
  color: #01175f;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
`;

export const CityWeatherCover = () => {
  const activeCity = useAppSelector(selectActiveCity);
  const isLoading = activeCity.status === STATUS.LOADING;
  const hasError = activeCity.status === STATUS.FAILED;
  const day = moment()
    .tz(activeCity.data?.timezone ?? 'Europe/Rome')
    .format('dddd D, MMMM');
  const bgImg = getCoverByCity(activeCity.preview.name);
  const bgGradient = mapWeatherToBackground(
    activeCity?.data?.current?.weather[0]?.id
  );

  return (
    <Wrapper isLoading={isLoading}>
      <SideWidget bgGradient={bgGradient}>
        {!isLoading && !hasError && (
          <>
            <Temperature>
              {getFormattedTemperature(activeCity.data?.current?.temp)}
            </Temperature>
            <IconWrapper>
              {!!activeCity.data && (
                <img
                  src={`https://openweathermap.org/img/wn/${activeCity.data?.current?.weather[0]?.icon}@4x.png`}
                  alt={activeCity.data?.current?.weather[0]?.description}
                />
              )}
            </IconWrapper>
          </>
        )}
      </SideWidget>
      {!hasError ? (
        <CardWrapper img={bgImg}>
          <CardContent>
            <CardTitle>{activeCity.preview?.name}</CardTitle>
            <Date>{day}</Date>
            <WeatherText>
              {activeCity.data?.current?.weather[0]?.main}
            </WeatherText>
          </CardContent>
        </CardWrapper>
      ) : (
        <CardWrapper>
          <CardContent>
            <p>Error</p>
          </CardContent>
        </CardWrapper>
      )}
    </Wrapper>
  );
};
