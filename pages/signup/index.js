// axios thirdparty
import axios from "axios";
import React, { useState, useEffect } from "react";
// antd
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Space,
  message,
  Button,
  Card,
} from "antd";
import cuid from "cuid";
import { useRouter } from "next/router";

const { Option } = Select;

export default function Signup() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState({});
  const [userCount, setUserCount] = useState(0);
  const router = useRouter();
  // all country in array
  var country_list = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleFinish = (value) => {
    let updatedUsers = { id: cuid(), ...value };
    axios
      .post("http://localhost:8000/users", { ...updatedUsers })
      .then((res) => {
        setUsers({});
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data, type: "norm-user" })
        );
        router.push({
          pathname: "/",
          query: { ...res.data, type: "norm-user" },
        });
      });

    message.success("User has been Registered");
  };
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="Login" bordered={false} style={{ width: 450 }}>
          <Form onFinish={handleFinish} layout="vertical">
            <Form.Item
              name="username"
              label="UserName"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter user Email" }]}
            >
              <Input style={{ width: "100%" }} placeholder="Please Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter user Password" },
              ]}
            >
              <Input.Password placeholder="" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please enter user Country" }]}
            >
              <Select placeholder="Please select a country">
                {country_list.map((list, index) => (
                  <Option key={list + index} value={list}>
                    {list}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Space>
              <Button
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Form>
        </Card>
      </div>
      <style jsx>
        {`
          .site-card-border-less-wrapper {
            background-color: #ececec;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}
