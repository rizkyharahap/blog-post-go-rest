import React from "react";

import { Switch } from "antd";

import { useAntd } from "@/providers/AntdProvider";

export default function DarkModeToogle() {
  const { isDarkMode, changeDarkMode } = useAntd();
  return (
    <Switch
      checkedChildren="🌑"
      unCheckedChildren="🌕"
      value={isDarkMode}
      onChange={changeDarkMode}
    />
  );
}
