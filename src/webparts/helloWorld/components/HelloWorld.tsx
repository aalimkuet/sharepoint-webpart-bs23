import * as React from "react";
import styles from "./HelloWorld.module.scss";
import type { IHelloWorldProps } from "./IHelloWorldProps";
import MasterService from "../../../service/master-service"; 
import KmsAccessTable from "./KmsAccessTable";

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public masterService: any;
  public siteUrl: string;

  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {};

    this.siteUrl = this.props.context.pageContext.web.absoluteUrl;
    this.masterService = new MasterService(this.props.context);
    this.ReplaceWikiDescription = this.ReplaceWikiDescription.bind(this);
  }

  public Test(param: any): void {
    alert(param);
  }

  public ReplaceWikiDescription = () => {
    let description = "";

    this.masterService.getData().then((wikiList: any) => {
      //const wikiList: any = [];
      wikiList.map((item: any) => {
        const { Title, Description } = item;
        const filteredList = wikiList.filter(
          (otherItem: any) => otherItem.Title !== Title
        );
        let replacedDescription = Description;
        filteredList.forEach((otherItem: any) => {
          replacedDescription = replacedDescription?.replace(
            new RegExp(otherItem.Title, "gi"),
            `<a href="#" onClick="event.preventDefault(); this.handleClick('${otherItem.Title}');">${otherItem.Title}</a>`
          );
        });
        description = replacedDescription;
        console.log(replacedDescription);
        return <div dangerouslySetInnerHTML={{ __html: description }} />;
      });
    });

    // console.log(description);
    // return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  handleClick = (param: any) => {
    alert(param);
  };
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <section>
        <div className={styles.welcome}>
          {/* <h2>Welcome, Brain Station-23!</h2>
          <button type="button" onClick={this.ReplaceWikiDescription}>
            Click
          </button> */}

          {/* <div
            dangerouslySetInnerHTML={{
              __html: `<div class="ExternalClass58A1693DC7D24FD18BE6F8FBAACBA474">
                    <div style="font-weight&#58;normal;font-size&#58;8pt;">
                    Raisul Kabir started Brain Station 23
                    <a href="#" onclick="HelloWorld.handleClick('hello');">Hello BS23</a>
                    The new company initially focused on the international market
                    </div>
                    </div>`,
            }}
          /> */}
          <KmsAccessTable context={this.props.context}></KmsAccessTable>
          {/* <TypeAddToGrid context={this.props.context}></TypeAddToGrid> */}
        </div>
      </section>
    );
  }
}
