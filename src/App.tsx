import React from 'react';
import { Admin, Layout, Resource, CustomRoutes, ListGuesser, EditGuesser } from 'react-admin';
import { Route } from 'react-router-dom';
import { ChartPage1 } from './ChartPage1';
import { ChartPage2 } from './ChartPage2';
import CustomMenu from './CustomMenu';
import { CustomerDataProvider } from './CustomerDataProvider';
const CustomLayout = (props: any) => (   
      <div className="content-container">
          <Layout {...props} menu={CustomMenu} />
      </div>
);
export const App = () => (
  <Admin layout={CustomLayout} dataProvider={CustomerDataProvider}>

    <Resource name="Customer" list={ListGuesser} edit={EditGuesser} />
    <CustomRoutes>
      <Route path="/ChartPage1" element={<ChartPage1 />} />
      <Route path="/ChartPage2" element={<ChartPage2 />} />
    </CustomRoutes>
  </Admin>
);

export default App;
