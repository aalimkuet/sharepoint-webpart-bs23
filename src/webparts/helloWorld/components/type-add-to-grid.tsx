import * as React from "react";
import {
  DefaultButton,
  IButtonStyles,
  IconButton,
  PrimaryButton,
} from "@fluentui/react/lib/Button";
import {
  Dropdown,
  FontIcon,
  IDropdownOption,
  IDropdownStyles,
  Stack,
  StackItem,
  initializeIcons,
  FontWeights,
  IIconProps,
  Modal,
  TextField,
  getTheme,
  mergeStyleSets,
} from "@fluentui/react";
import "./table.css";
import Editor from "./TextEditor";
import MasterService from "../../../service/master-service";
import { Wiki } from "./Models";

initializeIcons();
const cancelIcon: IIconProps = { iconName: "Cancel" };
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    theme.fonts.large,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  heading: {
    color: theme.palette.neutralPrimary,
    fontWeight: FontWeights.semibold,
    fontSize: "inherit",
    margin: "0",
  },
  body: {
    width: "51rem",
    marginTop: "2rem",
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const options: IDropdownOption[] = [
  { key: "1", text: "Office Location" },
  { key: "2", text: "Role" },
];

const childOptionsByParentId: { [key: string]: any[] } = {
  "1": [{ id: 1, text: "Mohakhali" }],
  "2": [
    { id: 1, text: "Senior Software Engineer" },
    { id: 2, text: "Software Engineer" },
  ],
};

interface TypeAddToGridProps {
  context: any; // You should use a more specific type instead of 'any' if possible
}

export class Data {
  Title?: string;
  Description?: string;
  Name?: string;
}

class TypeAddToGrid extends React.Component<TypeAddToGridProps, any> {
  public masterService: any;
  public siteUrl: string;
  public editorValue: string;

  constructor(props: TypeAddToGridProps) {
    super(props);

    this.state = {
      selectedParent: undefined,
      isShowLabel: false,
      isModalOpen: false,
      textFieldValue: "",
      tableData: [{ id: 1, text: "row" }],
    };

    this.siteUrl = this.props.context.pageContext.web.absoluteUrl;
    this.masterService = new MasterService(this.props.context);
    this.showData = this.showData.bind(this); // Bind the showData function
  }

  public showData = (): void => {
    console.log("showData");
    let wikiList = this.masterService.getData();
    console.log(wikiList);
  };

  handleParentChange = (
    _event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    this.setState({ selectedParent: item, isShowLabel: true });
  };

  tableDataLoad = (): void => {
    const item = this.state.selectedParent;
    let childListForParent: any;

    if (item) {
      let selectedParentId = item.key as string;
      switch (selectedParentId) {
        case "1": {
          childListForParent = childOptionsByParentId[1] || [];
          break;
        }
        case "2": {
          childListForParent = childOptionsByParentId[2] || [];
          break;
        }
        default: {
          selectedParentId = "1";
        }
      }
      const childData = childListForParent.map((child: any) => ({
        id: Number(child.id),
        text: child.text,
      }));
      this.setState({ tableData: childData });
    }
  };

  handleTextFieldChange = (
    _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    this.setState({ textFieldValue: newValue });
  };

  removeRow = (id: number): void => {
    const updatedData = this.state.tableData.filter(
      (row: any) => row.id !== id
    );
    this.setState({ tableData: updatedData });
  };

  handleSubmit = (): void => {
    console.log(this.editorValue);
    this.setState((prevState: any) => ({
      isModalOpen: false,
      tableData: [
        ...prevState.tableData,
        { id: Math.random(), text: prevState.textFieldValue },
      ],
      textFieldValue: "",
    }));

    const data: Wiki = {
      Title: this.state.textFieldValue,
      Keywords: this.editorValue,
      Description: this.editorValue,
      IsActive: true,
      Status: "pending",
    };
    this.masterService.insertData(data);
  };

  handleEditorChange = (content: any): void => {
    this.editorValue = content;
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "50rem",
          height: "30rem",
          paddingLeft: "3rem",
        }}
      >
        <Stack horizontal style={{ paddingTop: "3rem", paddingLeft: "5px" }}>
          <Dropdown
            placeholder="Select a type"
            options={options}
            styles={dropdownStyles}
            onChange={this.handleParentChange}
          />

          <PrimaryButton
            style={{ marginLeft: "5px" }}
            onClick={this.tableDataLoad}
            text="Load"
          />
        </Stack>

        <div style={{ marginTop: "50px", marginLeft: "5px" }}>
          <Stack horizontal>
            <StackItem
              style={{
                minWidth: "33rem",
                textAlign: "left",
                paddingLeft: "10px",
              }}
            >
              <h4>
                {this.state.selectedParent?.text}{" "}
                <span> {this.state.isShowLabel ? "Information" : ""} </span>
              </h4>
            </StackItem>
            <StackItem>
              <FontIcon
                onClick={() => this.setState({ isModalOpen: true })}
                aria-label="delete"
                iconName="add"
                style={{
                  color: "green",
                  cursor: "pointer",
                  fontWeight: "900",
                  fontSize: "1.2rem",
                  marginLeft: "5px",
                  paddingTop: "15px",
                }}
              />
            </StackItem>
          </Stack>

          <table id="htmlTable">
            <thead>
              <tr>
                <th style={{ width: "70%" }}>Type Value</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map((row: any) => (
                <tr key={row.id}>
                  <td>{row.text}</td>
                  <td>
                    <FontIcon
                      onClick={() => this.removeRow(row.id)}
                      aria-label="delete"
                      iconName="delete"
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Modal
            isOpen={this.state.isModalOpen}
            onDismiss={() => this.setState({ isModalOpen: false })}
            isBlocking={false}
            containerClassName={contentStyles.container}
          >
            <div className={contentStyles.header}>
              <h2 className={contentStyles.heading}>Type Information</h2>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => this.setState({ isModalOpen: false })}
              />
            </div>
            <div className={contentStyles.body}>
              <TextField
                name="dropdown value"
                placeholder="Give a type value"
                value={this.state.textFieldValue}
                onChange={this.handleTextFieldChange}
              />
              <div style={{ marginTop: "2.5rem" }}>
                <Editor onEditorChange={this.handleEditorChange} />
              </div>
            </div>
            <Stack horizontal style={{ float: "right", margin: "1rem" }}>
              <PrimaryButton onClick={this.handleSubmit} text="Submit" />
              <DefaultButton
                onClick={() => this.setState({ isModalOpen: false })}
                text="Cancel"
                style={{ marginLeft: "5px" }}
              />
            </Stack>
          </Modal>
        </div>
      </div>
    );
  }
}

export default TypeAddToGrid;
