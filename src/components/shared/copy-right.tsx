"use client";
export function CopyRight() {
  let year = null;
  // if (typeof window !== "undefined") {
  //   year = new Date().getFullYear();
  // }
  return (
    <footer className="container mx-auto mt-auto w-full px-4 py-4">
      <div className="flex w-full items-center justify-between gap-2 text-sm text-gray-500">
        <span>© {year ?? "2025"} StudyFlow</span>
        <div className="flex flex-col items-center gap-1 md:flex-row">
          <span>Developed by</span>
          <a
            href="https://youssef-el-sayed.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm font-medium hover:underline"
          >
            Youssef El Sayed
          </a>
        </div>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
