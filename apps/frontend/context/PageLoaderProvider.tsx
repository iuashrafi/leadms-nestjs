import { createContext, useContext, useState } from "react";

interface ContextInterface {
  opened: boolean;
  showPageLoader: () => void;
  hidePageLoader: () => void;
}

const PageLoaderContext = createContext<ContextInterface>({
  opened: false,
  showPageLoader: () => {},
  hidePageLoader: () => {},
});

export const PageLoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, setOpened] = useState(false);

  const showPageLoader = () => {
    setOpened(true);
  };

  const hidePageLoader = () => {
    setOpened(false);
  };

  return (
    <PageLoaderContext.Provider
      value={{
        opened,
        showPageLoader,
        hidePageLoader,
      }}
    >
      {/* <PageLoader opened={opened} /> */}
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => useContext(PageLoaderContext);
