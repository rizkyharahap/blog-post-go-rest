import { useRouter } from "next/router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, message, Typography } from "antd";
import { isAxiosError } from "axios";

import Navbar from "@/components/Navbar";
import { createPost } from "@/services/post";

import PostForm from "./PostForm";

export default function PostNewFeature() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: createPost,
    onSuccess(data) {
      messageApi.success("Success create new post!");
      queryClient.invalidateQueries({
        queryKey: ["getPosts"],
        refetchType: "active",
      });

      setTimeout(() => {
        router.replace(`/posts/${data.data.id}`);
      }, 1000);
    },
    onError(error) {
      if (isAxiosError(error)) {
        messageApi.error(
          error.response?.data?.data?.message ?? "Oops something went wrong!",
        );
      }
    },
  });

  return (
    <>
      {contextHolder}
      <Navbar />

      <Typography.Title className="mt-6 text-3xl">New Post</Typography.Title>

      <PostForm
        onSubmit={postMutation.mutate}
        isLoading={postMutation.isPending}
      >
        <Button
          variant="solid"
          htmlType="submit"
          color="primary"
          className="w-full"
          size="large"
          loading={postMutation.isPending}
        >
          Update
        </Button>
      </PostForm>
    </>
  );
}
