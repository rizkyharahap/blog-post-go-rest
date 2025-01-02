import React from "react";

import { useRouter } from "next/navigation";

import { Button, Flex, type FlexProps } from "antd";

import IcChevronLeft from "@/assets/icons/IcChevronLeft";

import DarkModeToogle from "./DarkModeToogle";

interface NavbarProps extends Omit<FlexProps, "children"> {
  children?: React.ReactNode;
}
export default function Navbar({ className, children, ...props }: NavbarProps) {
  const router = useRouter();

  return (
    <Flex
      className={`sticky top-0 z-50 min-h-16 items-center justify-between gap-4 bg-white dark:bg-black ${className ?? ""}`}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          <Button
            shape="circle"
            icon={<IcChevronLeft />}
            onClick={router.back}
          />
        </>
      )}

      <DarkModeToogle />
    </Flex>
  );
}
