import { useState } from "react";
import { ZodError } from "zod";
import { usePageLoader } from "@/context/PageLoaderProvider";
import { useToast, Toast } from "@/hooks/use-toast";
// import { logout } from "@/utils/common";
export interface ErrorStatusInterface {
  message: string;
}
export interface MakeApiCallFunctionProps<T> {
  fetcherFn: () => Promise<T>;
  onSuccessFn?: (response: T) => void;
  onFailureFn?: (error: unknown) => void;
  successMsgProps?: Toast;
  failureMsgProps?: Toast;
  showLoader?: boolean;
  showFailureMsg?: boolean;
  finallyFn?: () => void;
}

export function useApi() {
  const { showPageLoader, hidePageLoader } = usePageLoader();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetcherMakeAxiosApiCall = async function ({
    fetcherFn,
    finallyFn,
  }: {
    fetcherFn: () => Promise<void>;
    finallyFn: () => void;
  }) {
    try {
      await fetcherFn();
    } catch (error) {
      const errorResponse = error as ErrorStatusInterface;
      toast({
        variant: "destructive",
        title: "Error",
        description: errorResponse.message,
        duration: 5000,
      });
    } finally {
      finallyFn();
    }
  };

  const makeApiCall = async function <
    T extends { status: number; body?: any },
  >({
    fetcherFn,
    onSuccessFn,
    onFailureFn,
    successMsgProps,
    failureMsgProps,
    showLoader = true,
    showFailureMsg = true,
    finallyFn,
  }: MakeApiCallFunctionProps<T>) {
    if (showLoader) {
      showPageLoader();
      setIsLoading(true);
    }
    try {
      const response = await fetcherFn();
      if (response.status >= 200 && response.status <= 299) {
        hidePageLoader();
        setIsLoading(false);
        if (successMsgProps) {
          toast({ duration: 3000, variant: "default", ...successMsgProps });
        }
        if (onSuccessFn) {
          onSuccessFn(response);
        }
      } else if (response.status === 401) {
        // logout(true);
      } else {
        if (
          response &&
          response.body &&
          response.body.message &&
          showFailureMsg
        ) {
          toast({
            duration: 5000,
            variant: "destructive",
            title: "Error",
            description: response.body.message,
            ...failureMsgProps,
          });
        } else {
          if (!showFailureMsg) {
            return;
          }
          const myError = new ZodError(response.body.issues);
          const obj = myError.flatten().fieldErrors;

          let outputString = "";
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              outputString += `${key} is ${(obj?.[key] ?? []).join(
                ", "
              )}. <br/>`;
            }
          }
          outputString = outputString.trim();

          toast({
            variant: "destructive",
            title: "Error",
            description: (
              <span dangerouslySetInnerHTML={{ __html: outputString }} />
            ),
            duration: 5000,
            ...failureMsgProps,
          });
        }
        hidePageLoader();
        setIsLoading(false);
      }
    } catch (error) {
      hidePageLoader();
      setIsLoading(false);
      const errorResponse = error as ErrorStatusInterface;
      if (onFailureFn) {
        onFailureFn(error);
      }
      if (!showFailureMsg) {
        return;
      }
      toast({
        duration: 5000,
        variant: "destructive",
        title: "Error",
        description: errorResponse.message,
        ...failureMsgProps,
      });
    } finally {
      finallyFn && finallyFn();
    }
  };

  return { makeApiCall, fetcherMakeAxiosApiCall, isApiLoading: isLoading };
}
