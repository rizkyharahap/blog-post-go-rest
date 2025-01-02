import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { Avatar, Flex, Skeleton, Typography } from "antd";

import Navbar from "@/components/Navbar";
import { getPostById } from "@/services/post";
import { getUserById, type User } from "@/services/user";
import { readingTime } from "@/utils/readingTime";

import PostActionButtons from "./(component)/ActionButtons";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const postQuery = useQuery({
    queryKey: ["getPostById", params?.id],
    queryFn: async () => await getPostById(Number(id)),
    enabled: !!id,
  });

  const userQuery = useQuery({
    queryKey: ["getUserById", postQuery.data?.data.user_id],
    queryFn: async () => await getUserById(postQuery.data!.data.user_id),
    enabled: !!postQuery.data?.data.user_id,
  });

  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    const profileStorage = JSON.parse(localStorage.getItem("profile") ?? "");

    if (profileStorage)
      setProfile(JSON.parse(localStorage.getItem("profile") ?? ""));
  }, []);

  return (
    <>
      <Navbar />

      <div className="mb-4 mt-6 flex items-center gap-4">
        {userQuery.isLoading || userQuery.isPending ? (
          <Skeleton
            avatar={{ shape: "circle", className: "h-12 w-12" }}
            title={false}
          />
        ) : (
          <>
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
              shape="circle"
              className="min-h-12 min-w-12 border border-yellow-500"
            />

            <Flex className="w-full flex-col">
              <Typography.Text className="mb-0 text-base font-bold">
                {userQuery.data?.data.name ?? "Unknown"}
              </Typography.Text>

              <Typography.Text className="text-xs text-green-500">
                Read Time: {readingTime(postQuery.data?.data.body ?? "")} min
              </Typography.Text>
            </Flex>

            {profile?.id === postQuery.data?.data.user_id && (
              <PostActionButtons
                id={Number(id)}
                onDeleteSucces={() => router.push("/")}
              />
            )}
          </>
        )}
      </div>

      {postQuery.isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Typography.Title className="text-2xl">
            {postQuery.data?.data.title}
          </Typography.Title>

          <Typography.Paragraph>
            {postQuery.data?.data.body}
          </Typography.Paragraph>
        </>
      )}
    </>
  );
}
