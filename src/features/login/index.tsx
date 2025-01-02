import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Typography } from "antd";
import type { AxiosError } from "axios";

import IcLogo from "@/assets/icons/IcLogo";
import DarkModeToogle from "@/components/DarkModeToogle";
import { login, type LoginPayload } from "@/services/auth";

export default function LoginFeature() {
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
    <>
      <div className="relative flex min-h-screen w-full flex-col justify-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="absolute right-0 top-6">
          <DarkModeToogle />
        </div>

        <div className="border-b py-10 lg:col-span-7 lg:border-b-0 lg:border-r">
          <IcLogo />

          <Typography.Title className="mb-0 mt-5 text-3xl sm:text-5xl lg:text-6xl">
            Get in Touch with Blog Post
          </Typography.Title>
        </div>

        <div className="py-10 lg:col-span-5">
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={loginMutation.mutate}
          >
            <Form.Item
              name="name"
              label={<span className="text-base font-medium">Name</span>}
              rules={[{ required: true }, { type: "string", whitespace: true }]}
            >
              <Input size="large" placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              name="token"
              label={
                <span className="text-base font-medium">Go Rest Token</span>
              }
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
        </div>
      </div>
    </>
  );
}
