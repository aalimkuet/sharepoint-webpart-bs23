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
  public sp: any;
  public siteRelativeUrl: string;
  public currentUserId: number;
  public currentUserDetails: any;

  public constructor(context: any) {
    this.siteUrl = context.pageContext.web.absoluteUrl;
    this.siteRelativeUrl = context.pageContext.web.serverRelativeUrl;
    this.sp = spfi(this.siteUrl).using(SPFx(context));
  }

  public async getData() {
    debugger;
    console.log("object loaded");
    try {
      const items: any[] = await this.sp.web.lists
        .getByTitle("TestCRUD")
        .items();
      console.log(items);
    } catch (e) {
      console.log(e);
    }
  }

  public async insertData(data: any): Promise<any> {
    try {
      const list = this.sp.web.lists.getByTitle("TestCRUD");
      const result = await list.items.add(data);
      console.log("Item added: ", result);
      return result;
    } catch (error) {
      console.log("Error occurred while inserting data: ", error);
      throw error;
    }
  }
}

export default MasterService;
