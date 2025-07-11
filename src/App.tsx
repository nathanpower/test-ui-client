import { FlyUIProvider, AppShell, NavigationProvider } from "@wayflyer/flyui";
import { useCustomerAppNavProps } from "./useNavigationItems";
import { BrowserRouter } from "react-router";
import { WindowMessenger, connect, type Connection } from "penpal";
import { useEffect } from "react";

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

  useEffect(() => {
    let connection: Connection;
    const init = async () => {
      const iframe = document.getElementById("iframe")! as HTMLIFrameElement;
      const hostContainer = document.querySelector("main")! as HTMLDivElement;

      const messenger = new WindowMessenger({
        remoteWindow: iframe.contentWindow!,
      });

      connection = connect({
        messenger,
        methods: {
          updateContainerDims: ({ height }: { height: number }) => {
            hostContainer.style.height = `${height}px`;
          },
        },
      });

      await connection.promise;
    };
    init();

    return () => {
      connection?.destroy();
    };
  }, []);

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
        <iframe
          id="iframe"
          src="/iframe.html"
          width="100%"
          height="100%"
        ></iframe>
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
