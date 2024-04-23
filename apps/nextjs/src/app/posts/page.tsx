"use client";

import { logger } from "@tyfons-lab/logger";
import { useEffect } from "react";

interface PostsPageProps {}

function PostsPage(props: PostsPageProps) {
  const {} = props;
  logger.info("test client");
  // useEffect(() => {
  //   console.log("test");
  // }, []);
  return <div>test page</div>;
}

export default PostsPage;
