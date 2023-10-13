import * as React from "react";
import styles from "./HelloWorld.module.scss";
import type { IHelloWorldProps } from "./IHelloWorldProps";
import { TypeAddToGrid } from "./type-add-to-grid";
import MasterService from "../../../service/master-service";

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public masterService: any;
  public siteUrl: string;

  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {};

    this.siteUrl = this.props.context.pageContext.web.absoluteUrl;
    this.masterService = new MasterService(this.props.context);
    this.showData = this.showData.bind(this); // Bind the showData function
  }

  public showData = (): void => {
    this.masterService.getData();
  };

  public render(): React.ReactElement<IHelloWorldProps> {
    const { environmentMessage, hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.helloWorld} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
        <div className={styles.welcome}>
          <h2>Welcome, Brain Station-23!</h2>
          <button type="button" onClick={this.showData}>
            Click
          </button>
          <div>{environmentMessage}</div>
          <div style={{ marginLeft: "8rem" }}>
            {/* <TailWindCss /> */}
            <TypeAddToGrid></TypeAddToGrid>
          </div>
        </div>
      </section>
    );
  }
}
