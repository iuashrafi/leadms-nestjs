import { LoaderCircle } from "lucide-react";

const PreLoader = () => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <LoaderCircle className="animate-spin mt-64" size={30} />
    </div>
  );
};

export default PreLoader;
