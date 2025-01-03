import Link from "next/link";

import { Button, Flex, FloatButton, Input, Typography } from "antd";

import IcLogo from "@/assets/icons/IcLogo";
import IcPlus from "@/assets/icons/IcPlus";
import Navbar from "@/components/Navbar";
import Posts from "@/pages/posts/(component)/Posts";
import { debounce } from "@/utils/debounce";

import { usePostsParams } from "./posts/(hooks)/usePostsParams";

export default function HomePage() {
  const { page, perPage, filter, handleChangeParams } = usePostsParams();

  return (
    <>
      <Navbar>
        <IcLogo width={56} height={56} />

        <Input.Search
          size="large"
          className="mr-auto w-full lg:w-96"
          onChange={debounce((e) => {
            handleChangeParams({
              search: e.target.value,
              filter,
              page: page.toString(),
              "per-page": perPage.toString(),
            });
          })}
        />
      </Navbar>

      <Typography.Title className="mt-2 text-3xl">Explore</Typography.Title>

      <Flex className="mb-6 items-center gap-4">
        <Button
          type={filter === "all" ? "primary" : "default"}
          shape="round"
          size="small"
          className="font-semibold"
          onClick={() => handleChangeParams({ filter: "all", page: "1" })}
        >
          All Post
        </Button>
        <Button
          type={filter === "me" ? "primary" : "default"}
          shape="round"
          size="small"
          className="font-semibold"
          onClick={() => handleChangeParams({ filter: "me", page: "1" })}
        >
          Your Post
        </Button>
      </Flex>

      <Posts />

      <Link href="/posts/new" passHref>
        <FloatButton
          aria-label="new-btn"
          tooltip={<span>New Post</span>}
          icon={<IcPlus width={16} height={16} />}
          type="primary"
        />
      </Link>
    </>
  );
}
