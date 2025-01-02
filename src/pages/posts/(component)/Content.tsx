import Link from "next/link";

import { Avatar, Flex, Skeleton, Typography } from "antd";

import ImgEmptyPost from "@/assets/images/ImgEmptyPost";
import { type Post } from "@/services/post";
import { type User } from "@/services/user";
import { readingTime } from "@/utils/readingTime";

import PostActionButtons from "./ActionButtons";

interface PostContentProps {
  posts?: (Post & { user?: User })[];
  isLoadingPosts?: boolean;
  isLoadingUsers?: boolean;
  isShowActions?: boolean;
}
export default function PostContent({
  posts,
  isLoadingPosts,
  isLoadingUsers,
  isShowActions,
}: PostContentProps) {
  if (isLoadingPosts)
    return [1, 2, 3, 4, 5].map((numb) => (
      <div className="pt-5" key={numb}>
        <Skeleton avatar={{ shape: "circle" }} paragraph={{ rows: 4 }} />
      </div>
    ));

  if (!posts || posts.length < 1)
    return (
      <Flex className="flex-col items-center py-12">
        <ImgEmptyPost width={200} height={200} />

        <Typography.Text className="mt-6 text-lg font-semibold">
          Post Not Found
        </Typography.Text>
        <Typography.Paragraph className="text-slate-500">
          Please change your filter or create new post.
        </Typography.Paragraph>
      </Flex>
    );

  return posts.map((post) => {
    return (
      <div className="pt-5" key={post.id}>
        <Link href={`/posts/${post.id}`}>
          <div className="mb-4 flex items-center gap-2">
            {isLoadingUsers ? (
              <Skeleton avatar={{ shape: "circle" }} paragraph={false} />
            ) : (
              <>
                <Avatar
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                  shape="circle"
                  className="min-w-8 border border-yellow-500"
                />

                <Typography.Text
                  id="author-name"
                  className="mb-0 w-full text-sm font-medium"
                >
                  {post.user?.name ?? "Unknown"}
                </Typography.Text>
              </>
            )}

            {isShowActions && <PostActionButtons id={post.id} />}
          </div>

          <Typography.Title
            id="title-article"
            level={2}
            className="line-clamp-2 text-2xl"
          >
            {post.title}
          </Typography.Title>

          <Typography.Paragraph className="line-clamp-2">
            {post.body}
          </Typography.Paragraph>

          <Typography.Text className="text-xs text-green-500">
            Read Time: {readingTime(post.body)} min
          </Typography.Text>
        </Link>
      </div>
    );
  });
}
