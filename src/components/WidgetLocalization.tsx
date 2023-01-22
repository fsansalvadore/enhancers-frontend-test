import styled from 'styled-components';
import { WidgetTitle } from "../styles/shared";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  filter: drop-shadow(5px 10px 20px rgba(0,0,0,0.17));
`

const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  color: #fff;
  flex-grow: 1;
  width: 100%;
  border-radius: 30px;
  background: radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  font-size: 28px;
  font-weight: 600;
  gap: 10px;
`


export const WidgetLocalization = () => {
  const handleClick = () => {
    alert("Add localization")
  };
  
  return (
    <Wrapper>
      <WidgetTitle>Localization</WidgetTitle>
      <ButtonWrapper onClick={handleClick}>
        <img src="./images/Location.png" alt="Location icon" />
        <p>Add localization</p>
      </ButtonWrapper>
    </Wrapper>
  )
};