import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { selectActiveCity } from "../redux/features/app/appSlice";
import { useAppSelector } from "../redux/hooks";
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17); */
  filter: drop-shadow(5px 10px 20px rgba(0,0,0,0.17));
`

const StyledTabList = styled(TabList)`
  height: 80px;
  display: inline-flex;
  width: auto;
  border-radius: 30px 30px 0 0;
  background: #fff;
  /* box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17); */
`
const StyledTab = styled(Tab)`
  display: flex;
  color: #01175F;
  padding: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 42px;
  border-radius: 30px 30px 0 0;
  border: none;
  cursor: pointer;
  outline: none;
  
  &.react-tabs__tab--selected {
    border-radius: 30px 30px 0 0;
    background-color: #5374E7;
    color: #fff;
  }
`
const StyledTabPanel = styled(TabPanel)`
  display: none;
  width: 100%;
  height: 100%;
  padding: 30px;
  border-radius: 30px;
  color: #fff;
  
  &.react-tabs__tab-panel--selected {
    display: block;
    background: linear-gradient(0deg, #77B9F5 0%, #5374E7 100%);
  }
  &.react-tabs__tab-panel--selected:first-of-type {
    background: linear-gradient(0deg, #77B9F5 0%, #5374E7 100%);
    border-radius: 0 30px 30px 30px;
  }
`
const PanelWrapper = styled.div`
  border-radius: 0 30px 30px 30px;
  background-color: #fff;
  color: #fff;
  flex-grow: 1;
  width: 100%;
`

export const WidgetWeatherTabs = () => {
  const activeCity = useAppSelector(selectActiveCity);

  return (
    <StyledTabs>
      <StyledTabList>
        <StyledTab>This week</StyledTab>
        <StyledTab>This month</StyledTab>
      </StyledTabList>

      <PanelWrapper>
        <StyledTabPanel>
          <h2>Any content 1</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Any content 2</h2>
        </StyledTabPanel>
      </PanelWrapper>
    </StyledTabs>
  )
};