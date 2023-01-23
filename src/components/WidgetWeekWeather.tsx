import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { useAppSelector } from '../redux/hooks';
import { selectActiveCity } from '../redux/features/app/appSlice';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .swiper {
    height: 100%;
    width: 100;
    padding: 30px 30px 50px 30px !important;
  }

  .swiper-slide {
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 20px;
    overflow: hidden;
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
  font-size: 42px;
  font-weight: bold;
`;

export const WidgetWeekWeather = () => {
  const activeCity = useAppSelector(selectActiveCity);

  if (!activeCity.data) return null;

  const {
    data: { daily: days },
  } = activeCity;

  return (
    <Wrapper>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={2}
        slidesPerGroup={2}
        grabCursor
        breakpoints={{
          620: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        pagination={{
          clickable: true,
        }}
      >
        {days?.slice(1, 8)?.map((day: any) => {
          const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {
            weekday: 'long',
          });
          const temperature = day.temp?.day?.toFixed(0);
          const icon = day.weather[0]?.icon;
          const iconDesc = day.weather[0]?.description;

          return (
            <SwiperSlide key={day.dt}>
              <Day>{weekDay}</Day>
              <Temperature>{temperature}°</Temperature>
              <ImageWrapper>
                {!!activeCity?.data?.current?.weather[0] && (
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={iconDesc}
                  />
                )}
              </ImageWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrapper>
  );
};
