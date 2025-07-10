import { FlyUIProvider, AppShell, NavigationProvider } from "@wayflyer/flyui";
import { useCustomerAppNavProps } from "./useNavigationItems";
import { BrowserRouter } from "react-router";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <FlyUIProvider theme="wayflyer">{children}</FlyUIProvider>
    </BrowserRouter>
  );
}

function BaseApp() {
  const { navItems, getIsClientRouteSelected, profileSection, infoItems } =
    useCustomerAppNavProps();
  return (
    <NavigationProvider
      profileSection={profileSection}
      infoItems={infoItems}
      sections={{ navItems, initialExpandedSection: "financing" }}
      getIsRouteSelected={getIsClientRouteSelected}
      notificationBubble={{
        navItemId: "tasks",
        count: 8,
        title: "8 tasks require attention",
      }}
    >
      <AppShell>
        <h1>Hello World</h1>
      </AppShell>
    </NavigationProvider>
  );
}

function App() {
  return (
    <Providers>
      <BaseApp />
    </Providers>
  );
}

export default App;
