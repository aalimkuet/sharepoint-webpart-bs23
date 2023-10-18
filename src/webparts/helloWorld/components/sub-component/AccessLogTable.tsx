import React, { Component } from "react";
import moment from "moment";

interface props {
  filteredAccessLogData: any[];
}

export default class AccessLogTable extends Component<props> {
  render() {
    return (
      <table id="htmlTable">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Access Date</th>
            <th style={{ textAlign: "center" }}>First Access Date</th>
            <th style={{ textAlign: "center" }}>Last Access Date</th>
          </tr>
        </thead>
        <tbody>
          {this.props.filteredAccessLogData.map((data: any, index: number) => {
            return (
              <tr key={index}>
                <td>{data.Title}</td>
                <td>{moment(data.AccessDate).format("DD/MM/yyyy")}</td>
                <td>{moment(data.FirstAccessTime).format("DD/MM/yyyy")}</td>
                <td>{moment(data.LastAccessTime).format("DD/MM/yyyy")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
