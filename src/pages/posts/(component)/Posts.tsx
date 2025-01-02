import { Flex, Pagination } from "antd";

import { usePosts } from "../(hooks)/usePosts";
import { usePostsParams } from "../(hooks)/usePostsParams";
import PostContent from "./Content";

export default function Posts() {
  const { page, perPage, filter, search, handleChangeParams } =
    usePostsParams();

  const { isLoadingUsers, isLoadingPosts, posts, postsPagination } = usePosts({
    page,
    perPage,
    search,
    filter,
  });

  return (
    <>
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
    </>
  );
}
