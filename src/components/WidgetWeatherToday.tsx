import 'moment-timezone';
import moment from 'moment';
import { selectActiveCity } from '../redux/features/app/appSlice';
import { useAppSelector } from '../redux/hooks';
import styled from 'styled-components';
import { WidgetTitle } from '../styles/shared';
import { getFormattedTemperature } from '../utils/helpers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  filter: drop-shadow(5px 10px 20px rgba(0, 0, 0, 0.17));
`;

const PanelWrapper = styled.div`
  position: relative;
  min-height: 300px;
  background-color: #fff;
  padding: 20px;
  color: #fff;
  flex-grow: 1;
  width: 100%;
  border-radius: 30px;
  background: linear-gradient(0deg, #77b9f5 0%, #5373e7 100%);
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17);
  overflow: hidden;

  &::after {
    content: ' ';
    position: absolute;
    pointer-events: none;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(#77b9f500, #77b9f5);
    z-index: 10;
  }
`;

const HourDiagram = styled.div`
  position: absolute;
  width: 100%;
  padding: 30px 30px 0 30px;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const DiagramWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export const WidgetWeatherToday = () => {
  const activeCity = useAppSelector(selectActiveCity);
  const hours = activeCity.data?.hourly;

  return (
    <Wrapper>
      <WidgetTitle>Today</WidgetTitle>
      <PanelWrapper>
        <HourDiagram>
          <Text>Now</Text>
          <DiagramWrapper>
            {hours?.slice(0, 23).map((hour: any, index: number) => (
              <HourSection key={hour.dt} hour={hour} isFirst={index === 0} />
            ))}
          </DiagramWrapper>
        </HourDiagram>
      </PanelWrapper>
    </Wrapper>
  );
};

const HourWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  top: -10px;
`;
const HourTemp = styled.div<{ isFirst: boolean }>`
  position: relative;
  font-size: ${({ isFirst }) => (isFirst ? '40px' : '30px')};
  font-weight: ${({ isFirst }) => (isFirst ? 'bold' : 'normal')};
  text-align: right;
  top: -10px;
`;
const HourCenter = styled.div<{ isFirst: boolean }>`
  position: relative;

  &::before {
    content: '';
    position: relative;
    display: block;
    margin: 0 auto;
    width: ${({ isFirst }) => (isFirst ? '30px' : '20px')};
    height: ${({ isFirst }) => (isFirst ? '30px' : '20px')};
    background-color: #fff;
    border-radius: 100%;
  }

  &:first-of-type::before {
    width: 30px;
    height: 30px;
  }

  &::after {
    content: '';
    position: relative;
    display: block;
    margin: 0 auto;
    margin-top: -10px;
    margin-bottom: -10px;
    width: 8px;
    height: 70px;
    background-color: #fff;
  }
`;
const HourTime = styled.div`
  font-size: 20px;
`;

const HourSection = ({ hour, isFirst }: { hour: any; isFirst: boolean }) => (
  <HourWrapper>
    <HourTemp isFirst={isFirst}>{getFormattedTemperature(hour.temp)}</HourTemp>
    <HourCenter isFirst={isFirst} />
    {!isFirst && (
      <HourTime>{moment(new Date(hour.dt * 1000)).format('h a')}</HourTime>
    )}
  </HourWrapper>
);
