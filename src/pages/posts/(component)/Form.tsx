import { type PropsWithChildren, useEffect } from "react";

import { Form, Input } from "antd";

import type { PostPayload } from "@/services/post";

interface PostFormProps {
  onSubmit(values: PostPayload): void;
  isLoading?: boolean;
  initialValue?: PostPayload;
}
export default function PostForm({
  onSubmit,
  initialValue,
  isLoading,
  children,
}: PropsWithChildren<PostFormProps>) {
  const [form] = Form.useForm<PostPayload>();

  useEffect(() => {
    if (initialValue) form.setFieldsValue(initialValue);
  }, [form, initialValue]);

  return (
    <Form<PostPayload>
      form={form}
      name="post"
      layout="vertical"
      autoComplete="off"
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label={<span className="text-base font-medium">Title</span>}
        rules={[{ required: true }, { type: "string", whitespace: true }]}
      >
        <Input size="large" placeholder="Enter title" disabled={isLoading} />
      </Form.Item>

      <Form.Item
        name="body"
        label={<span className="text-base font-medium">Article</span>}
        rules={[
          { required: true, message: "Please enter article" },
          { type: "string", whitespace: true, max: 500 },
        ]}
      >
        <Input.TextArea
          rows={10}
          size="large"
          placeholder="Enter your article"
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item>{children}</Form.Item>
    </Form>
  );
}
