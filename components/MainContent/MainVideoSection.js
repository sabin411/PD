import { Tabs, Input, Pagination } from "antd";
import Contact from "./components/Contact";
import LiveVid from "./components/LiveVid";
import OldVid from "./components/OldVid";

const { TabPane } = Tabs;
const { Search } = Input;
const operations = (
  <Search
    placeholder="input search text"
    allowClear
    enterButton="Search"
    size="large"
    onSearch={onSearch}
  />
);
// on search function
function onSearch(value) {
  console.log("searched", value);
}

export default function MainVideoSection({ isBlock }) {
  return (
    <>
      <Tabs size="large" tabBarExtraContent={operations}>
        <TabPane tab="Live Videos" key="1">
          <LiveVid isBlock={isBlock} />
        </TabPane>
        <TabPane tab="Old Videos" key="2">
          <OldVid />
        </TabPane>
        <TabPane tab="Contact">
          <Contact />
        </TabPane>
      </Tabs>
      <style jsx>
        {`
          .tabs-extra-demo-button {
            margin-right: 16px;
          }
          .ant-row-rtl .tabs-extra-demo-button {
            margin-right: 0;
            margin-left: 16px;
          }
        `}
      </style>
    </>
  );
}
