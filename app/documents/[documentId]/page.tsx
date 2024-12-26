"use client";

import { useParams, useSearchParams } from "next/navigation";
import DocumentEditor from "./editor";
import Toolbar from "./Toolbar";
export default function Document() {
  // const { documentId } = useParams();
  const searchParams = useSearchParams();
  const temp = searchParams.get("html");

  return (
    <div className="min-h-screen bg-{#fafbfd]">
      <Toolbar />
      <DocumentEditor temp={temp} />
    </div>
  );
}
