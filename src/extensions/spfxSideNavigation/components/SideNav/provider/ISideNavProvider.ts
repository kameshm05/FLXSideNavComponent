import ISideNavItem from "../model/ISideNavItem";

export default interface ISideNavProvider {
    getSideNav(): Promise<ISideNavItem[]>;
    getQuickLinks(): Promise<ISideNavItem[]>;
}
