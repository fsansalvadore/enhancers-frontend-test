import 'moment-timezone';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { activeCitySelected } from '../redux/features/app/appSlice';
import { useAppDispatch } from '../redux/hooks';
import {
  getFormattedTemperature,
  mapWeatherToBackground,
} from '../utils/helpers';

const CityCard = styled.button<{ bgGradient: string }>`
  height: 140px;
  width: 100%;
  border-radius: 25px;
  background: ${({ bgGradient }) => bgGradient};
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  width: 40%;
`;

const CardTitle = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
`;

const LocalTime = styled.p`
  font-size: 12px;
  font-weight: 300;
`;

const LocalDate = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 17px;
`;

const ImageWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TempWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Temperature = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

export const CityPreviewCard = ({ city }: { city: any }) => {
  const dispatch = useAppDispatch();
  const localDate = moment().tz(city.timezone).format('dddd D,');
  const localMonth = moment().tz(city.timezone).format('MMMM');
  const localTime = moment().tz(city.timezone).format('h:mm a');
  const bgGradient = mapWeatherToBackground(city.current?.weather[0]?.id);

  const handleCitySelection = () => {
    dispatch(activeCitySelected(city));
  };

  return (
    <CityCard onClick={handleCitySelection} bgGradient={bgGradient}>
      <InfoWrapper>
        <CardTitle>{city.name}</CardTitle>
        <LocalDate>
          <div>{localDate}</div>
          <div>{localMonth}</div>
        </LocalDate>
        <LocalTime>{localTime}</LocalTime>
      </InfoWrapper>
      <ImageWrapper>
        <img
          src={`https://openweathermap.org/img/wn/${city.current?.weather[0]?.icon}@4x.png`}
          alt={city.current?.weather[0]?.description}
        />
      </ImageWrapper>
      <TempWrapper>
        <Temperature>{getFormattedTemperature(city.current?.temp)}</Temperature>
      </TempWrapper>
    </CityCard>
  );
};

const mapStateToProps = (_state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CityPreviewCard);
