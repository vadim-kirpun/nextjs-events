import { memo, PropsWithChildren } from "react";
import MainHeader from "./MainHeader";

const Layout = (props: PropsWithChildren<{}>) => (
  <>
    <MainHeader />
    <main>{props.children}</main>
  </>
);

export default memo(Layout);
