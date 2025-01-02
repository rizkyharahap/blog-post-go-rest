import { useRouter } from "next/router";

import { Button, Flex, FloatButton, Input, Pagination, Typography } from "antd";

import IcLogo from "@/assets/icons/IcLogo";
import IcPlus from "@/assets/icons/IcPlus";
import Navbar from "@/components/Navbar";
import { debounce } from "@/utils/debounce";

import { usePosts } from "./hooks/usePosts";
import { usePostsParams } from "./hooks/usePostsParams";
import PostContent from "./PostContent";

export default function PostFeature() {
  const router = useRouter();

  const { page, perPage, search, filter, handleChangeParams } =
    usePostsParams();
  const { isLoadingUsers, isLoadingPosts, posts, postsPagination } = usePosts({
    page,
    perPage,
    search,
    filter,
  });

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

      <Flex className="flex-col gap-5 divide-y">
        <PostContent
          isLoadingPosts={isLoadingPosts}
          isLoadingUsers={isLoadingUsers}
          posts={posts}
          isShowActions={filter === "me"}
        />
      </Flex>

      {postsPagination && (
        <Pagination
          className="mt-6 justify-center"
          current={postsPagination.page}
          total={postsPagination.total}
          pageSize={postsPagination.limit}
          onChange={(page, perPage) =>
            handleChangeParams({
              filter,
              page: page.toString(),
              "per-page": perPage.toString(),
            })
          }
        />
      )}

      <FloatButton
        tooltip={<span>New Post</span>}
        icon={<IcPlus width={16} height={16} />}
        onClick={() => router.push("/posts/new")}
        type="primary"
      />
    </>
  );
}
