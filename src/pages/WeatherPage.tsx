import styled from 'styled-components';
import tw from 'twin.macro';
import {
  CitiesNav,
  CityWeatherCover,
  WidgetLocalization,
  WidgetSearch,
  WidgetWeatherTabs,
  WidgetWeatherToday
} from '../components';

// NOTA:
// L'uso di TailwindCSS permette di ridurre parecchio
// le linee di codice necessarie per lo styling
// e si integra perfettamente con styled-components
const MainWrapper = styled.div`
  ${tw`w-screen p-4 md:p-12 grid md:grid-cols-12 gap-4 md:gap-12`}

  > div:first-of-type {
    ${tw`w-full md:col-span-8`}
  }

  > div:last-of-type {
    ${tw`w-full md:col-span-4`}
  }
`
const SelectedCityContainer = tw.div`flex flex-col gap-4 md:gap-12`
const WidgetsContainer = tw.div`order-first md:order-last flex flex-col gap-4 md:gap-12`
const SidebarSecondaryWidgets = tw.div`flex flex-col md:[height:680px] gap-4 md:gap-12`
const CityWeatherWidgetsWrapper = styled.div`
  ${tw`w-full md:[height:680px] grid md:grid-cols-8 gap-4 md:gap-12`}

  > div:first-of-type {
    ${tw`w-full md:col-span-3`}
  }

  > div:last-of-type {
    ${tw`w-full md:col-span-5`}
  }
`

function WeatherPage() {
  return (
    <MainWrapper>
      <SelectedCityContainer>
        <CityWeatherCover/>
        <CityWeatherWidgetsWrapper>
          <WidgetWeatherToday />
          <WidgetWeatherTabs />
        </CityWeatherWidgetsWrapper>
      </SelectedCityContainer>
      <WidgetsContainer>
        <CitiesNav/>
        <SidebarSecondaryWidgets>
          <WidgetSearch />
          <WidgetLocalization />
        </SidebarSecondaryWidgets>
      </WidgetsContainer>
    </MainWrapper>
  )
}

export default WeatherPage;