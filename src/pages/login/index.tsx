import { useEffect } from "react";

import LoginFeature from "@/features/login";
import { checkSession } from "@/services/auth";

export default function LoginPage() {
  useEffect(() => {
    if (checkSession()) {
      window.location.replace("/");
    }
  }, []);

  return <LoginFeature />;
}
