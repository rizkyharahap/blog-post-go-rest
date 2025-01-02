import { type PropsWithChildren, useEffect } from "react";

import { checkSession, logout } from "@/services/auth";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!checkSession()) {
      logout();
    }
  }, []);

  return children;
}
