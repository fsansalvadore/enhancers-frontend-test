import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import moment from 'moment';
import styled from 'styled-components';
import { selectActiveCity } from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .swiper {
    height: 100%;
    width: 100%;
    padding: 30px 30px 50px 30px !important;
  }

  .swiper-slide {
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17);
    padding: 20px;
  }

  .swiper-pagination {
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-pagination-bullet {
    background: #fff;
  }

  .swiper-pagination-bullet-active {
    width: 12px;
    height: 12px;
  }
`;

const InnerCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  overflow: hidden;
`;

const Day = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Temperature = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

const Text = styled.p`
  margin-bottom: 10px;
  text-transform: capitalize;

  span  {
    display: block;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const WidgetMonthWeather = () => {
  return (
    <Wrapper>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        grabCursor
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const Card = () => {
  const activeCity = useAppSelector(selectActiveCity);
  const day = moment()
    .tz(activeCity.data?.timezone ?? 'Europe/Rome')
    .format('ddd, D MMM');

  return (
    <InnerCard>
      <div>
        <Day>{day}</Day>
        <ImageWrapper>
          {!!activeCity?.data?.current?.weather[0] && (
            <img
              src={`https://openweathermap.org/img/wn/${activeCity?.data?.current?.weather[0]?.icon}@4x.png`}
              alt={activeCity?.data?.current?.weather[0]?.description}
            />
          )}
        </ImageWrapper>
      </div>
      <div>
        <Temperature>
          {activeCity?.data?.current?.temp?.toFixed(0)}°
        </Temperature>
        <Text>{activeCity?.data?.current?.weather[0]?.description}</Text>
        <Text>The high will be 14°C, the low will be 8°C.</Text>
        <Text>
          <span>Humidity: {activeCity?.data?.current.humidity}%</span>
          <span>UV: {activeCity?.data?.current.uvi}</span>
          <span>
            Dew point:{' '}
            {activeCity.data?.current?.dew_point < 1 &&
            activeCity.data?.current?.dew_point > -1
              ? '0'
              : activeCity.data?.current?.dew_point?.toFixed(0)}
            °
          </span>
        </Text>
      </div>
    </InnerCard>
  );
};
