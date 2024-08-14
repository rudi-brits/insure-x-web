import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { ClientList } from "./Client/ClientList";
import { ClientShow } from "./Client/ClientShow";
import { InvestmentList } from "./Investment/InvestmentList";
import { InvestmentShow } from "./Investment/InvestmentShow";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="Client"
      list={ClientList}
      show={ClientShow} />
    <Resource name="Investment"
      list={InvestmentList}
      show={InvestmentShow} />
  </Admin>
);

