export default interface ISideNavItem {
    title: string;
    url?: string;
    image?: string;
    svg?: string;
    openInNewWindow?: boolean;
    subNavItems?: ISideNavItem[];
    imgserverUrl:string;
    imageUrl:string;
}
export default interface IQuickLinkItem {
    title: string;
    url?: string;
    image?: string;
    svg?: string;
    openInNewWindow?: boolean;
    subNavItems?: ISideNavItem[];
}