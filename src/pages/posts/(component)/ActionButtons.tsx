import { useState } from "react";

import { useRouter } from "next/router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, message, Modal, Typography } from "antd";
import { isAxiosError } from "axios";
import { createPortal } from "react-dom";

import IcEdit from "@/assets/icons/IcEdit";
import IcTrash from "@/assets/icons/IcTrash";
import { deletePost } from "@/services/post";

interface PostActionButtonsProps {
  id: number;
  onDeleteSucces?(): void;
}
export default function PostActionButtons({
  id,
  onDeleteSucces,
}: PostActionButtonsProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [deletedId, setDeletedId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getPosts"],
      });

      messageApi.success("Success delete post!");
      setDeletedId(null);

      onDeleteSucces?.();
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

      <Button
        variant="filled"
        color="default"
        shape="circle"
        icon={<IcEdit width={16} height={16} />}
        className="min-w-8"
        onClick={(e) => {
          e.preventDefault();
          router.push(`/posts/update/${id}`);
        }}
      />
      <Button
        variant="filled"
        color="danger"
        shape="circle"
        icon={<IcTrash width={16} height={16} />}
        className="min-w-8"
        onClick={(e) => {
          e.preventDefault();
          setDeletedId(id);
        }}
      />

      {createPortal(
        <Modal
          title="Confirm Deletion"
          centered
          open={!!deletedId}
          onOk={() => {
            if (deletedId) {
              deletePostMutation.mutate(deletedId);
            }
          }}
          confirmLoading={deletePostMutation.isPending}
          onCancel={(e) => {
            e.stopPropagation();
            setDeletedId(null);
          }}
          okButtonProps={{
            color: "danger",
            variant: "solid",
          }}
        >
          <Typography.Paragraph>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography.Paragraph>
        </Modal>,
        document.body,
      )}
    </>
  );
}
