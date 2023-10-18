import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/security/web";
import "@pnp/sp/security/list";
import "@pnp/sp/security";
import "@pnp/sp/sputilities";
import "@pnp/sp/navigation";
import "@pnp/sp/folders";
import "@pnp/sp/files";

class MasterService {
  public siteUrl: string;
  public kmsSiteUrl: string;
  public sp: any;
  public kmsSP: any;
  public siteRelativeUrl: string;
  public currentUserId: number;
  public currentUserDetails: any;

  public constructor(context: any) {
    this.siteUrl = context.pageContext.web.absoluteUrl;
    this.siteRelativeUrl = context.pageContext.web.serverRelativeUrl;
    this.sp = spfi(this.siteUrl).using(SPFx(context));

    this.kmsSiteUrl = "https://brainstationo365.sharepoint.com/sites/kms";
    this.kmsSP = spfi(this.kmsSiteUrl).using(SPFx(context));
  }

  public async getData() {
    try {
      const items: any[] = await this.sp.web.lists
        .getByTitle("TestCRUD")
        .items();
      return items;
    } catch (e) {
      console.log(e);
    }
  }

  public async getAccessLogData() {
    try {
      const items: any[] = await this.kmsSP.web.lists
        .getByTitle("AccessLog")
        .items();
      return items;
    } catch (e) {
      console.log(e);
    }
  }

  public async insertData(data: any) {
    try {
      debugger;
      console.log(data);
      let response = await this.sp.web.lists
        .getByTitle("TestCRUD")
        .items.add(data);
      console.log(response);
      //const result = await list.items.add(data);
      // console.log("Item added: ", list);
      //return list;
    } catch (error) {
      console.log("Error occurred while inserting data: ", error);
      throw error;
    }
  }
}

export default MasterService;
