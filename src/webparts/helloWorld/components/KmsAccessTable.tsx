import * as React from "react";
import MasterService from "../../../service/master-service";
import "./table.css";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Pivot, PivotItem } from "@fluentui/react";
import AccessLogTable from "./sub-component/AccessLogTable";
import AccessLogSummaryTable from "./sub-component/AccessLogSummaryTable";

interface KmsAccessTableProps {
  context: any; // You should use a more specific type instead of 'any' if possible
}

class KmsAccessTable extends React.Component<KmsAccessTableProps, any> {
  public masterService: any;

  constructor(props: any) {
    super(props);

    this.state = {
      accessLogData: [],
      filteredAccessLogData: [],
      fromDate: Date,
      toDate: Date,
      accessLogGroupByTitle: [],
    };

    this.masterService = new MasterService(this.props.context);
  }

  public filterAccessLogDataByDate = async () => {
    const { fromDate, toDate, accessLogData } = this.state;

    const filteredData = accessLogData.filter(
      (i: any) =>
        new Date(i.AccessDate) >= new Date(fromDate) &&
        new Date(i.AccessDate) <= new Date(toDate)
    );
    this.setState({ filteredAccessLogData: filteredData });

    const groupByTitleList = [];
    const groupByTitle = filteredData.reduce((acc: any, obj: any) => {
      const key = obj.Title;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});

    for (const property in groupByTitle) {
      groupByTitleList.push({ Title: property, Freq: groupByTitle[property] });
    }
    this.setState({ accessLogGroupByTitle: groupByTitleList });
  };

  async componentDidMount() {
    const accessLogFormDB = await this.masterService.getAccessLogData();
    if (accessLogFormDB.length > 0) {
      this.setState({ accessLogData: accessLogFormDB });
    }
  }

  render() {
    return (
      <>
        <div style={{ marginTop: "5rem", marginBottom: "2rem" }}>
          <table>
            <thead>
              <tr>
                <td style={{ width: "10rem" }}>
                  <label style={{ fontWeight: "600" }}>From Date::</label>
                  <DatePicker
                    id="fromDate"
                    placeholder="Select a date..."
                    ariaLabel="Select a date"
                    strings={defaultDatePickerStrings}
                    onSelectDate={(e) => this.setState({ fromDate: e })}
                  />
                </td>
                <td style={{ width: "10rem" }}>
                  <label style={{ fontWeight: "600" }}>To Date::</label>
                  <DatePicker
                    id="toDate"
                    placeholder="Select a date..."
                    ariaLabel="Select a date"
                    strings={defaultDatePickerStrings}
                    onSelectDate={(e) => this.setState({ toDate: e })}
                  />
                </td>
                <td style={{ width: "10rem" }}>
                  <PrimaryButton
                    onClick={() => this.filterAccessLogDataByDate()}
                    text="Show AccessLog"
                    style={{ bottom: "-7px" }}
                  />
                </td>
              </tr>
            </thead>
          </table>
        </div>

        <Pivot aria-label="Basic Pivot Example">
          <PivotItem
            headerText="Access Log"
            headerButtonProps={{
              "data-order": 1,
              "data-title": "Access Log Title",
            }}
          >
            <div style={{ marginTop: "5rem", marginBottom: "2rem" }}>
              <AccessLogTable
                filteredAccessLogData={this.state.filteredAccessLogData}
              />
            </div>
          </PivotItem>

          <PivotItem headerText="Access Log Summary">
            <div style={{ marginTop: "5rem", marginBottom: "2rem" }}>
              <AccessLogSummaryTable
                accessLogGroupByTitle={this.state.accessLogGroupByTitle}
              />
            </div>
          </PivotItem>
        </Pivot>
      </>
    );
  }
}

export default KmsAccessTable;
