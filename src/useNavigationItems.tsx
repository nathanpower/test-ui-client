import {
  IconBanknotes16Line,
  IconBuildingOffice16Line,
  IconInfoCircle16Line,
  IconChartBars16Line,
  IconShareNetwork16Line,
  IconPeople316Line,
  IconPersonCircle16Line,
  IconConnections16Line,
  IconBell16Line,
  IconHome16Line,
  IconPeople216Line,
  IconGear16Line,
  IconArrowLeftTrayRight16Line,
  IconArrowsRightLeft16Line,
  IconDocument16Line,
  IconGift16Line,
  IconCoinDollar16Line,
  IconBookOpen16Line,
  IconArrowTrendingUp16Line,
} from "@wayflyer/flyui-icons/16/line";
import { useClientNavigation } from "@wayflyer/flyui";

import type {
  NavItemButton,
  NavItemLink,
  NavNextItems as NavItems,
  NonNavigableSection,
} from "@wayflyer/flyui";

export const useCustomerAppNavProps = () => {
  const { clientNavigateFn, basename, getIsClientRouteSelected } =
    useClientNavigation();
  const infoItems: Array<NavItemLink | NavItemButton> = [
    {
      icon: <IconInfoCircle16Line />,
      label: "Help center",
      id: "help center",
      external: true,
      href: `${basename}https://help-center.wayflyer.com/en`,
    },
    {
      icon: <IconShareNetwork16Line />,
      label: "Referrals",
      id: "referrals",
      href: `${basename}referrals`,
      navigateFn: clientNavigateFn,
    },
  ];
  const profileSection: NonNavigableSection = {
    label: "Wild Deodorant Ltd. In a really long name",
    id: "my-account",
    icon: null,
    items: [
      {
        id: "company-settings",
        label: "Company settings",
        href: `${basename}company-settings`,
        icon: <IconBuildingOffice16Line />,
        navigateFn: clientNavigateFn,
      },
      {
        id: "invite",
        label: "Invite a team member",
        onClick: () => {},
        icon: <IconPeople216Line />,
      },
      {
        id: "privacy-settings",
        label: "Privacy settings",
        href: `${basename}privacy-settings`,
        navigateFn: clientNavigateFn,
        icon: <IconGear16Line />,
      },
      {
        id: "log-out",
        label: "Sign out",
        onClick: () => {},
        error: true,
        icon: <IconArrowLeftTrayRight16Line />,
      },
    ],
  };
  const navItems: NavItems = [
    {
      label: "Home",
      id: "home",
      icon: <IconHome16Line />,
      href: `${basename}`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Tasks",
      id: "tasks",
      icon: <IconBell16Line />,
      href: `${basename}tasks`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Financing",
      id: "financing",
      icon: <IconBanknotes16Line />,
      items: [
        {
          label: "Advances",
          id: "advances",
          href: `${basename}financing/advances`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Statements",
          id: "statements",
          href: `${basename}financing/statements`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
    {
      label: "Performance",
      id: "performance",
      icon: <IconChartBars16Line />,
      items: [
        {
          label: "Overview",
          id: "overview",
          href: `${basename}performance/overview`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "LTV",
          id: "ltv",
          href: `${basename}performance/ltv`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Products",
          id: "products",
          href: `${basename}performance/products`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Google Ads",
          id: "google-ads",
          href: `${basename}performance/google-ads`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Meta Ads",
          id: "meta-ads",
          href: `${basename}performance/meta-ads`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Paid Channels",
          id: "paid-channels",
          href: `${basename}performance/paid-channels`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
    {
      label: "Connections",
      id: "connections",
      icon: <IconConnections16Line />,
      href: "#",
    },
  ];

  return { navItems, profileSection, infoItems, getIsClientRouteSelected };
};

export const useStaffAppNavProps = () => {
  const { clientNavigateFn, basename, getIsClientRouteSelected } =
    useClientNavigation();
  const profileSection: NonNavigableSection = {
    label: "My account",
    id: "my-account",
    icon: <IconPersonCircle16Line />,
    items: [
      {
        id: "invite",
        label: "Invite",
        onClick: () => {},
      },
      {
        id: "privacy-policy",
        label: "Privacy policy",
        onClick: () => {},
      },
      {
        id: "log-out",
        label: "Sign out",
        onClick: () => {},
        error: true,
      },
    ],
  };
  const navItems: NavItems = [
    {
      icon: <IconBuildingOffice16Line />,
      label: "Companies",
      id: "companies",
      href: `${basename}wayflyer/companies`,
      navigateFn: clientNavigateFn,
    },
    {
      icon: <IconPeople316Line />,
      label: "Users",
      id: "users",
      href: `${basename}platform/users`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Funding",
      id: "funding",
      icon: <IconBanknotes16Line />,
      items: [
        {
          label: "Deals",
          id: "deals",
          href: `${basename}deals`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Funds Requests",
          id: "funds requests",
          href: `${basename}funds-requests`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "KYC",
          id: "kyc",
          href: `${basename}kyc-queue`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Forecasting",
          id: "forecasting",
          href: `${basename}forecasting-queue`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "MCAs",
          id: "mcas",
          href: `${basename}cash-advances`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Deployments",
          id: "deployments",
          href: `${basename}tranched-advance-deployments`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Payments",
          id: "payments",
          href: `${basename}payments`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Contracts",
          id: "contracts",
          href: `${basename}contracts`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Documents",
          id: "document-management",
          href: `${basename}document-management`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
    {
      label: "Growth",
      id: "growth",
      icon: <IconChartBars16Line />,
      items: [
        {
          label: "Partners",
          id: "partners",
          href: `${basename}partners/affiliates`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Customer Referrals",
          id: "customer-referrals",
          href: `${basename}customer-referrals/referrals`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Customer Referrals Payouts",
          id: "customer-referrals-payouts",
          href: `${basename}customer-referrals/payout-requests`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
    {
      label: "Admin",
      id: "admin",
      icon: <IconGear16Line />,
      items: [
        {
          label: "Tasks",
          id: "tasks",
          href: `${basename}platform/tasks`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Commands",
          id: "commands",
          href: `${basename}commands`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Banks",
          id: "banks",
          href: `${basename}banks`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
  ];

  return { navItems, getIsClientRouteSelected, profileSection };
};

export const useBankingAppNavProps = () => {
  const { clientNavigateFn, basename, getIsClientRouteSelected } =
    useClientNavigation();
  const infoItems: Array<NavItemLink | NavItemButton> = [
    {
      icon: <IconInfoCircle16Line />,
      label: "Referrals",
      id: "referrals",
      href: `${basename}referrals`,
      navigateFn: clientNavigateFn,
    },
    {
      icon: <IconShareNetwork16Line />,
      label: "Support",
      id: "support",
      href: `${basename}support`,
      navigateFn: clientNavigateFn,
    },
  ];
  const profileSection: NonNavigableSection = {
    label: "Bastian Schweinsteiger",
    id: "my-account",
    icon: null,
    items: [
      {
        id: "company-settings",
        label: "Company settings",
        href: `${basename}company-settings`,
        navigateFn: clientNavigateFn,
      },
      {
        id: "invite",
        label: "Invite a team member",
        href: `${basename}invite`,
        navigateFn: clientNavigateFn,
      },
      {
        id: "privacy-settings",
        label: "Privacy settings",
        href: `${basename}privacy-settings`,
        navigateFn: clientNavigateFn,
      },
      {
        id: "log-out",
        label: "Sign out",
        onClick: () => {},
        error: true,
      },
    ],
  };
  const navItems: NavItems = [
    {
      label: "Financing",
      id: "financing-page-title",
      icon: <IconBanknotes16Line />,
      href: "/",
      navigateFn: clientNavigateFn,
    },
    {
      label: "Accounts",
      id: "banking-accounts-page-title",
      icon: <IconPersonCircle16Line />,
      href: `${basename}/accounts`,
      navigateFn: clientNavigateFn,
      items: [
        {
          label: "Big bag of money",
          id: "big-bag-of-money",
          href: `${basename}/accounts/ca19d992-52f9-400e-b696-f0ea6f56cf8f`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Checking Account",
          id: "checking-account",
          href: `${basename}/accounts/c848f915-77e2-4b9a-9944-a81389b476bb`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
    {
      label: "Payments",
      id: "banking-payments-page-title",
      icon: <IconBookOpen16Line />,
      href: `${basename}/payments`,
      navigateFn: clientNavigateFn,
      items: [
        {
          label: "Recipients",
          id: "banking-recipients-page-title",
          href: `${basename}/payments/recipients`,
          navigateFn: clientNavigateFn,
        },
        {
          label: "Check Deposits",
          id: "banking-check-deposits-page-title",
          href: `${basename}/payments/deposits`,
          navigateFn: clientNavigateFn,
        },
      ],
    },
    {
      label: "Cards",
      id: "banking-cards-page-title",
      icon: <IconCoinDollar16Line />,
      href: `${basename}/cards`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Transactions",
      id: "banking-transactions-page-title",
      icon: <IconArrowTrendingUp16Line />,
      href: `${basename}/transactions`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Connections",
      id: "connections-page-title",
      icon: <IconArrowsRightLeft16Line />,
      href: `${basename}/settings/connections`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Documents",
      id: "documents-page-title",
      icon: <IconDocument16Line />,
      href: `${basename}/documents`,
      navigateFn: clientNavigateFn,
    },
    {
      label: "Customer Referrals",
      id: "customer-referrals-page-title",
      icon: <IconGift16Line />,
      href: `${basename}/customer-referrals`,
      navigateFn: clientNavigateFn,
    },
  ];

  return { navItems, getIsClientRouteSelected, profileSection, infoItems };
};
