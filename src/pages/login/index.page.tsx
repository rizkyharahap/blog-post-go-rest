import { useEffect } from "react";

import { Typography } from "antd";

import IcLogo from "@/assets/icons/IcLogo";
import DarkModeToogle from "@/components/DarkModeToogle";
import LoginForm from "@/pages/login/(component)/Form";
import { checkSession } from "@/services/auth";

export default function LoginPage() {
  useEffect(() => {
    if (checkSession()) {
      window.location.replace("/");
    }
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="absolute right-0 top-6">
        <DarkModeToogle />
      </div>

      <div className="border-b py-10 lg:col-span-7 lg:border-b-0 lg:border-r">
        <IcLogo />

        <Typography.Title className="mb-0 mt-5 text-3xl sm:text-5xl lg:text-6xl">
          Get in Touch with Blog Post
        </Typography.Title>
      </div>

      <div className="py-10 lg:col-span-5">
        <LoginForm />
      </div>
    </div>
  );
}
