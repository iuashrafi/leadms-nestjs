import { contract } from "contract";
import { initQueryClient } from "@ts-rest/react-query";
import Cookies from "js-cookie";
import { tsRestFetchApi } from "@ts-rest/core";

const queryClient = (authToken: string | undefined) =>
  initQueryClient(contract, {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000",
    baseHeaders: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    api: async (args) => {
      const response = await tsRestFetchApi(args);
      if (response.status === 401) {
        Cookies.remove("userToken");
      }
      return response;
    },
  });
export const getQueryClient = () => {
  const authToken = Cookies.get("userToken");
  return queryClient(authToken);
};
