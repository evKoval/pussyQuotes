import React, { useState, useEffect } from "react";
// import "./App.css";
// import { Table } from "antd";
import { quotesAPI } from "./api/api";
import { Table, Tag, Spin, Alert } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Typography } from 'antd';

const { Title } = Typography;
const columns = [
  {
    title: "Text",
    dataIndex: "text",
    width:'600px',
    key: "text",
  },
  {
    title: "Author",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "CATegory",
    dataIndex: "type",
    key: "tags",
    render: (tag) => (
      <span>
        <Tag color="blue" key={tag}>
          {tag}
        </Tag>
      </span>
    ),
  },
  {
    title: "Likes",
    dataIndex: "upvotes",
    key: "upvotes",
    render: (upvotes) => (
      <span>
        <HeartTwoTone /> {upvotes}
      </span>
    ),
    sorter:(a,b)=> a.upvotes-b.upvotes
  },
];

function App() {
  const [quotes, setQuotes] = useState([]);
  let table = [];

  useEffect(() => {
    async function fetchData() {
      let fetchedQuotes = await quotesAPI.getQuotes();
      let nameQuotes = fetchedQuotes.length
        ? fetchedQuotes.map((quote) => ({ ...quote, name: quote.user ? `${quote.user.name.first} ${quote.user.name.last}` : 'noname'}))
        : [];
      setQuotes(nameQuotes);
    }
    fetchData();
  }, []);

  const generateTable = (arr) => {
    if (arr.length) {
      for (let obj of arr) {
        let tr = Object.values(obj).map((value) => <td>{typeof value !== "object" ? value : "object value"}</td>);
        table.push(<tr key={obj._id}>{tr}</tr>);
      }
    }
  };

  generateTable(quotes);

  return (
    <div>
      <header>
        <Title>pussyQuotes</Title>
      </header>
      {!quotes.length ? (
        <Spin tip="Loading...">
          <Alert message="Please, wait! Getting universe's best thoughts about cats" type="info" />
        </Spin>
      ) : (
        <Table dataSource={quotes} columns={columns} />
      )}
      <table>{/* <tbody>{table}</tbody> */}</table>
    </div>
  );
}

export default App;
