import ISideNavProvider from "./ISideNavProvider";
import ISideNavItem from "../model/ISideNavItem";
import ISPSideNavItem from "../model/ISPSideNavItem";
import { sp } from "@pnp/sp";

export default class SideNavProvider implements ISideNavProvider {
  public getSideNav(): Promise<ISideNavItem[]> {
    return sp.web.lists
      .getByTitle("Side Nav List")
      .items.select(
        "Title",
        "SideNavUrl",
        "SideNavIconSvg",
        "SideNavOpenInNewWindow",
        "SideNavParent/Title"
      )
      .expand("SideNavParent")
      .orderBy("SideNavOrder")
      .usingCaching()
      .get()
      .then(
        (items: ISPSideNavItem[]): ISideNavItem[] => {
          const siteNavItems: ISideNavItem[] = [];
          items.forEach(
            (item: ISPSideNavItem): void => {
              if (!item.SideNavParent) {
                siteNavItems.push({
                  title: item.Title,
                  svg: item.SideNavIconSvg,
                  url: item.SideNavUrl,
                  openInNewWindow: item.SideNavOpenInNewWindow,
                  subNavItems: this.getSubNavItems(items, item.Title)
                });
              }
            }
          );
          return siteNavItems;
        }
      );
  }

  public getQuickLinks(): Promise<ISideNavItem[]> {
    return sp.web.lists
      .getByTitle("Quick Links")
      .items.select(
        "Title",
        "SideNavUrl",
        "SideNavIconSvg",
        "SideNavOpenInNewWindow",
        "SideNavParent/Title"
      )
      .expand("SideNavParent")
      .orderBy("SideNavOrder")
      .usingCaching()
      .get()
      .then(
        (items: ISPSideNavItem[]): ISideNavItem[] => {
          const siteQuickLinkItems: ISideNavItem[] = [];
          items.forEach(
            (item: ISPSideNavItem): void => {
              if (!item.SideNavParent) {
                siteQuickLinkItems.push({
                  title: item.Title,
                  svg: item.SideNavIconSvg,
                  url: item.SideNavUrl,
                  openInNewWindow: item.SideNavOpenInNewWindow,
                  subNavItems: this.getSubNavItems(items, item.Title)
                });
              }
            }
          );
          return siteQuickLinkItems;
        }
      );
  }

  private getSubNavItems(
    spNavItems: ISPSideNavItem[],
    filter: string
  ): ISideNavItem[] {
    const subNavItems: ISideNavItem[] = [];
    spNavItems.forEach(
      (item: ISPSideNavItem): void => {
        if (item.SideNavParent && item.SideNavParent.Title === filter) {
          subNavItems.push({
            title: item.Title,
            url: item.SideNavUrl,
            openInNewWindow: item.SideNavOpenInNewWindow
          });
        }
      }
    );
    return subNavItems.length > 0 ? subNavItems : undefined;
  }
}
