import { Tabs, Input, Pagination } from "antd";
import LiveVid from "../MainContent/components/AdminComponents/LiveVidRecord";
import OldVid from "../MainContent/components/AdminComponents/OldVidRecord";

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
        <TabPane tab="Contact"></TabPane>
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
