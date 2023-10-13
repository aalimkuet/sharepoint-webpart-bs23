import * as React from "react";
import {
  DefaultButton,
  IButtonStyles,
  IconButton,
  PrimaryButton,
} from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  Dropdown,
  FontIcon,
  FontWeights,
  IDropdownOption,
  IDropdownStyles,
  IIconProps,
  Modal,
  Stack,
  StackItem,
  TextField,
  getTheme,
  initializeIcons,
  mergeStyleSets,
} from "@fluentui/react";
import "./table.css";
import Editor from "./TextEditor";

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
    width: "50rem",
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
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: "1", text: "Office Location" },
  { key: "2", text: "Role" },
];

const childOptionsByParentId = {
  "1": [{ id: 1, text: "Mohakhali" }],
  "2": [
    { id: 1, text: "Senior Software Engineer" },
    { id: 2, text: "Software Engineer" },
  ],
};

export const TypeAddToGrid: React.FunctionComponent = () => {
  const [selectedParent, setSelectedParent] = React.useState<
    IDropdownOption | undefined
  >(undefined);
  const [isShowLabel, SetIsShowLabel] = React.useState<boolean>(false);

  const handleParentChange = (
    _event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ) => {
    setSelectedParent(item);
    SetIsShowLabel(true);
  };

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const titleId = useId("title");

  const tableDataLoad = () => {
    const item = selectedParent;
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
        id: Number(child.key),
        text: child.text,
      }));
      setTableData(childData);
    } else {
      //empty
    }
  };

  const [textFieldValue, setTextFieldValue] = React.useState("");
  const handleTextFieldChange = (_event: any, newValue: any) => {
    setTextFieldValue(newValue);
  };

  const [tableData, setTableData] = React.useState([{ id: 1, text: "row" }]);

  const removeRow = (id: number) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
  };

  const handleSubmit = () => {
    hideModal();
    const newRow = {
      id: Math.random(),
      text: textFieldValue,
    };
    setTableData([...tableData, newRow]);

    setTextFieldValue("");
  };

  const handleEditorChange = (content: any) => {
    console.log("Content from Editor component: ", content);
  };

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
          onChange={handleParentChange}
        />

        <PrimaryButton
          style={{ marginLeft: "5px" }}
          onClick={tableDataLoad}
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
              {selectedParent?.text}{" "}
              <span> {isShowLabel ? "Information" : ""} </span>
            </h4>
          </StackItem>
          <StackItem>
            <FontIcon
              onClick={showModal}
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
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.text}</td>
                <td>
                  <FontIcon
                    onClick={() => removeRow(row.id)}
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
          titleAriaId={titleId}
          isOpen={isModalOpen}
          onDismiss={hideModal}
          isBlocking={false}
          containerClassName={contentStyles.container}
        >
          <div className={contentStyles.header}>
            <h2 className={contentStyles.heading} id={titleId}>
              Type Information
            </h2>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <TextField
              name="dropdown value"
              placeholder="Give a type value"
              value={textFieldValue}
              onChange={handleTextFieldChange}
            />
            <div style={{ marginTop: "2.5rem" }}>
              <Editor onEditorChange={handleEditorChange} />
            </div>
          </div>
          <Stack horizontal style={{ float: "right", margin: "1rem" }}>
            <PrimaryButton onClick={handleSubmit} text="Submit" />
            <DefaultButton
              onClick={hideModal}
              text="Cancel"
              style={{ marginLeft: "5px" }}
            />
          </Stack>
        </Modal>
      </div>
    </div>
  );
};
