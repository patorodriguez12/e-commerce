"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "onError"> & {
  fallbackClassName?: string;
};

export default function ProductImage({
  src,
  alt,
  fallbackClassName = "w-full h-full flex items-center justify-center text-sm text-text-muted",
  className,
  ...rest
}: Props) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <div className={fallbackClassName}>No image</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
