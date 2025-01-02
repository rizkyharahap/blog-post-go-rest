import { useMemo } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { logout } from "@/services/auth";
import { getPosts, getPostsByUserId, type Post } from "@/services/post";
import { getUsersByIds, type User } from "@/services/user";

interface UsePostsProps {
  page?: number;
  perPage?: number;
  filter?: string;
  search?: string;
}
export function usePosts({ page, perPage, filter, search }: UsePostsProps) {
  const postsQuery = useQuery({
    queryKey: ["getPosts", page, perPage, filter],
    queryFn: async () => {
      if (filter === "all") return await getPosts(page, perPage);

      const profileStr = localStorage.getItem("profile");

      const profile = JSON.parse(profileStr ?? "");
      if (!profile?.id) logout();

      return getPostsByUserId(profile.id, page, perPage);
    },
    placeholderData: keepPreviousData,
  });

  const userIds = useMemo(
    () => (postsQuery.data?.data ?? []).map((post) => post.user_id),
    [postsQuery.data?.data],
  );

  const usersQuery = useQuery({
    queryKey: ["getUsersByIds", userIds],
    queryFn: async () => await getUsersByIds(userIds),
    enabled: userIds.length > 0,
  });

  const filteredPost = useMemo(() => {
    // returning empty data
    if (!postsQuery.data?.data || postsQuery.data.data.length < 1) return [];

    return postsQuery.data?.data.reduce<(Post & { user?: User })[]>(
      (prev, curr, i) => {
        // filtering posts data by search
        if (
          search &&
          !curr.title.toLowerCase().includes(search) &&
          !curr.body.toLowerCase().includes(search)
        )
          return prev;

        // combining post and user
        prev.push({
          ...curr,
          user: usersQuery.data?.[i],
        });

        return prev;
      },
      [],
    );
  }, [postsQuery.data?.data, search, usersQuery.data]);

  return {
    isLoadingPosts: postsQuery.isLoading || postsQuery.isFetching,
    isLoadingUsers: usersQuery.isLoading || usersQuery.isFetching,
    posts: filteredPost,
    postsPagination: postsQuery.data?.meta?.pagination,
  };
}
