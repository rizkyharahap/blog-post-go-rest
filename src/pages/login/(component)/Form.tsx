import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import type { AxiosError } from "axios";

import { login, type LoginPayload } from "@/services/auth";

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm<LoginPayload>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess() {
      router.push("/");
    },
    onError(error: AxiosError) {
      if (error.status === 401) {
        form.setFields([
          {
            name: "token",
            errors: ["Token is invalid"],
          },
        ]);
      } else if (error.status === 422) {
        form.setFields([
          {
            name: "name",
            errors: ["Name has already been taken"],
          },
        ]);
      }
    },
  });

  return (
    <Form
      name="login"
      form={form}
      layout="vertical"
      onFinish={loginMutation.mutate}
    >
      <Form.Item
        name="name"
        label={<span className="text-base font-medium">Name</span>}
        rules={[{ required: true }, { type: "string", whitespace: true }]}
        data-testid="login-input_name"
      >
        <Input size="large" placeholder="Enter Name" />
      </Form.Item>

      <Form.Item
        name="token"
        label={<span className="text-base font-medium">Go Rest Token</span>}
        rules={[{ required: true }]}
      >
        <Input.TextArea
          rows={3}
          size="large"
          placeholder="Enter Go Rest Token"
        />
      </Form.Item>

      <Form.Item>
        <Button
          variant="solid"
          htmlType="submit"
          color="primary"
          className="w-full"
          size="large"
          loading={loginMutation.isPending}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
