import Link from 'next/link';
import React from 'react';

interface PostCardContentProps {
  postData: string;
}

export default function PostCardContent({ postData }: PostCardContentProps): JSX.Element {
  return (
    <div>
      { postData && postData.split(/(#[^\s#]+)/g).map((v) => (
        /^#/.test(v)
          ? <Link key={v} href={`/hashtag/${v.slice(1)}`}>{v}</Link>
          : v
      ))}
    </div>
  );
}
