import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { ClientList } from "./Client/ClientList";
import { ClientShow } from "./Client/ClientShow";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="Client"
      list={ClientList}
      show={ClientShow} />
  </Admin>
);

