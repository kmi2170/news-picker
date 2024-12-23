"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Something went wrong! Please try again later.
      </h2>
      <button
        onClick={() => reset()}
        style={{ padding: "0.5rem", fontSize: "large", fontWeight: "bold" }}
      >
        Try again
      </button>
    </div>
  );
}
