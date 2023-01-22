import { selectActiveCity } from "../redux/features/app/appSlice";
import { useAppSelector } from "../redux/hooks";
import styled from 'styled-components';
import { WidgetTitle } from "../styles/components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  filter: drop-shadow(5px 10px 20px rgba(0,0,0,0.17));
`

const PanelWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  color: #fff;
  flex-grow: 1;
  width: 100%;
  border-radius: 30px;
  background: linear-gradient(0deg, #77B9F5 0%, #5374E7 100%);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
`

export const WidgetWeatherToday = () => {
  const activeCity = useAppSelector(selectActiveCity);

  return (
    <Wrapper>
      <WidgetTitle>Today</WidgetTitle>
      <PanelWrapper>
        this
      </PanelWrapper>
    </Wrapper>
  )
};