import { useParams } from "next/navigation";
import { useRouter } from "next/router";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Typography } from "antd";
import { isAxiosError } from "axios";

import Navbar from "@/components/Navbar";
import { getPostById, type PostPayload, updatePost } from "@/services/post";

import PostForm from "./PostForm";

export default function PostUpdateFeature() {
  const router = useRouter();
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["getPostById", params?.id],
    queryFn: async () => await getPostById(Number(params.id)),
    enabled: !!params?.id,
  });

  const postMutation = useMutation({
    mutationFn: (values: PostPayload) => updatePost(Number(params.id), values),
    onSuccess(data) {
      messageApi.success("Success update post!");

      queryClient.invalidateQueries({
        queryKey: ["getPostById", params.id],
      });
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

      <Typography.Title className="mt-6 text-3xl">Update Post</Typography.Title>

      <PostForm
        initialValue={{
          title: postQuery.data?.data?.title ?? "",
          body: postQuery.data?.data?.body ?? "",
        }}
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
