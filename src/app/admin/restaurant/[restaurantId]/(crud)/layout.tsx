
import React, { FC, ReactNode } from "react";

const LayoutPage = ({
  children,
}: {
  children: ReactNode;
  params: { restaurantId: number };
}) => {
  return (
    <div className={`nc-LayoutPage relative`}>
      <div
        className={`absolute h-full top-0 left-0 right-0 lg:w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      />
      <div className="relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28 lg:w-4/5 w-full mx-auto">
        <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
