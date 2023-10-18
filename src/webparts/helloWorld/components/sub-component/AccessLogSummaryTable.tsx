import React, { Component } from "react";

interface props {
  accessLogGroupByTitle: any[];
}

export default class AccessLogSummaryTable extends Component<props> {
  render() {
    return (
      <table id="htmlTable">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}> No. of Access</th>
          </tr>
        </thead>
        <tbody>
          {this.props.accessLogGroupByTitle.length > 0 &&
            this.props.accessLogGroupByTitle.map((data: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{data.Title}</td>
                  <td>{data.Freq}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}
