import React, { useMemo } from "react";
import { useTheme, Row } from "@zeit-ui/react";
import Link from "next/link";
import BLOG from "../../blog.config";
import metadata from "../data/metadata.json";
import PostItem from "./post-item";
const latestLimit = BLOG.latestLimit || 5;

const getLatest = (data: any) => {
  const postNode = data.find((item: any) => item.name === "posts");
  const posts = (postNode || {}).children || [];
  return posts.slice(0, latestLimit);
};

const makeMoreLink = (len: number) => {
  if (len < latestLimit) return null;
  return (
    <Link href="/blog">
      <a className="text">...</a>
    </Link>
  );
};

const Latest = () => {
  const posts = useMemo(() => getLatest(metadata), []);
  const theme = useTheme();
  return (
    <section>
      <h2>{BLOG.labels.latest || ""}</h2>
      <div className="content">
        {posts.map((post: any, index: any) => (
          <PostItem post={post} key={`${post.url}-${index}`} />
        ))}
        <span className="more">{makeMoreLink(posts.length)}</span>
      </div>

      <style jsx>{`
        section {
          margin-top: calc(${theme.layout.gap} * 2);
        }

        section h2 {
          font-size: 0.8rem;
          color: ${theme.palette.accents_6};
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 2px solid ${theme.palette.accents_6};
          padding: 2px ${theme.layout.gapQuarter} 0 0;
          display: inline-block;
          margin: 0;
        }

        .content {
          margin: ${theme.layout.gap} 0;
        }

        .more {
          display: block;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          section {
            margin-top: ${theme.layout.gapQuarter};
          }

          section h2 {
            margin-top: calc(1.5 * ${theme.layout.gap});
          }
        }
      `}</style>
    </section>
  );
};

export default Latest;
