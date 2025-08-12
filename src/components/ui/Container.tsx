import React, { ReactNode } from "react";
import { spacing } from "@/theme/designSystem";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={`mx-auto px-${spacing.md} lg:px-${spacing.lg} max-w-7xl`}
    >
      {children}
    </div>
  );
};

export default Container;