import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { WidgetTitle } from "../styles/shared";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  filter: drop-shadow(5px 10px 20px rgba(0,0,0,0.17));
`

const InputWrapper = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  flex-grow: 1;
`

const Input = styled.input`
  background-color: #fff;
  padding: 20px;
  color: #01175F;
  flex-grow: 1;
  width: 100%;
  border-radius: 30px;
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
`

const Button = styled.button`
  position: absolute;
  right: 0;
  height: 100%;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%);
`

export const WidgetSearch = () => {
  const [value, setValue] = useState<string>('');

  const handleUpdate = (event: any) => {
    setValue(event?.target?.value);
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Search for: ${value}`);
    setValue('');
  }

  return (
    <Wrapper>
      <WidgetTitle>Search</WidgetTitle>
      <InputWrapper onSubmit={handleSubmit}>
        <Input type="text" placeholder='ex: Miami' onChange={handleUpdate} />
        <Button>
          <img src="./images/Search-1.png" alt="Search icon" />
        </Button>
      </InputWrapper>
    </Wrapper>
  )
};