import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { ClientList } from "./client/components/clientList";
import { ClientShow } from "./client/components/clientShow";
import { InvestmentList } from "./investment/components/investmentList";
import { InvestmentShow } from "./investment/components/investmentShow";
import { ResourceNames } from "./constants/insure.web.x.constants";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name={ResourceNames.clients}
      list={ClientList}
      show={ClientShow} />
    <Resource name={ResourceNames.investments}
      list={InvestmentList}
      show={InvestmentShow} />
  </Admin>
);

