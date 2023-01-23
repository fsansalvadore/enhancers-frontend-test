import styled from 'styled-components';
import tw from 'twin.macro';
import {
  CitiesNav,
  CityWeatherCover,
  WidgetLocalization,
  WidgetSearch,
  WidgetWeatherTabs,
  WidgetWeatherToday,
} from '../components';

// NOTA:
// L'uso di TailwindCSS permette di ridurre parecchio
// le linee di codice necessarie per lo styling
// e si integra perfettamente con styled-components
const MainWrapper = styled.div`
  ${tw`w-screen p-4 flex flex-col md:p-12 md:grid md:grid-cols-12 gap-10 md:gap-12`}

  > div:first-of-type {
    ${tw`w-full md:col-span-8`}
  }

  > div:last-of-type {
    ${tw`w-full md:col-span-4`}
  }
`;
const ActiveCityWrapper = tw.div`flex flex-col gap-4 md:gap-12`;
const Sidebar = tw.div`order-first md:order-last flex flex-col gap-4 md:gap-12`;
const SidebarWidgets = tw.div`flex flex-col lg:[height:465px] gap-4 md:gap-12`;
const CityWeatherWidgets = styled.div`
  ${tw`relative w-full md:[height:465px] flex flex-col xl:grid xl:grid-cols-8 gap-12`}

  > div:first-of-type {
    ${tw`w-full xl:col-span-3`}
  }

  > div:last-of-type {
    ${tw`w-full xl:col-span-5`}
  }
`;

function WeatherPage() {
  return (
    <MainWrapper>
      <ActiveCityWrapper>
        <CityWeatherCover />
        <CityWeatherWidgets>
          <WidgetWeatherToday />
          <WidgetWeatherTabs />
        </CityWeatherWidgets>
      </ActiveCityWrapper>
      <Sidebar>
        <CitiesNav />
        <SidebarWidgets>
          <WidgetSearch />
          <WidgetLocalization />
        </SidebarWidgets>
      </Sidebar>
    </MainWrapper>
  );
}

export default WeatherPage;
