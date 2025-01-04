import { ReactNode } from "react";

const CustomErrorMessage = ({
  title,
  subtitle,
  actionButton,
}: {
  title: string;
  subtitle: string;
  actionButton?: ReactNode;
}) => {
  return (
    <section className="min-h-[40vh] flex items-center justify-center">
      <div className="bg-white py-4 px-5 rounded-lg w-fit min-w-[300px] flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm">{subtitle}</p>
        </div>
        {actionButton}
      </div>
    </section>
  );
};

export default CustomErrorMessage;
