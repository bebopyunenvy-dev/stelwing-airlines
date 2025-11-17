// app/travel-community/[postId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { mockPosts } from "../components/Masonry";
import Breadcrumb from "@/app/components/Breadcrumb";
import { Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { useState } from "react";

// 🔹 簡單留言的型別（demo 用）
interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export default function TravelDetailPage() {
  const { postId } = useParams();
  const router = useRouter();

  // 取得對應文章
  const post = mockPosts.find((p) => String(p.id) === String(postId));

  // Demo 用假留言
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "旅人 A",
      content: "好喜歡你拍的動物園視角！",
      createdAt: "2025-11-01",
    },
    {
      id: 2,
      author: "旅人 B",
      content: "下次也想帶家人一起去～",
      createdAt: "2025-11-03",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <main className="space-y-6">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅遊分享", href: "/travel-community" },
            { label: "文章不存在" },
          ]}
        />
        <div className="p-10 text-center text-gray-500">找不到這篇文章</div>
      </main>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "你",
        content: newComment.trim(),
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ]);
    setNewComment("");
  };

  return (
    <main className="space-y-6">
      {/* 麵包屑 */}
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "旅遊分享", href: "/travel-community" },
          { label: post.title },
        ]}
      />

      {/* 返回按鈕 */}
      <button
        onClick={() => router.push("/travel-community")}
        className="flex items-center gap-2 text-sm text-[#1F2E3C]/70 hover:text-[#DCBB87]"
      >
        <ArrowLeft size={16} />
        返回分享列表
      </button>

      {/* 主體：左右兩欄 */}
      <section className="grid grid-cols-12 gap-8">
        {/* 左側大圖 */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-xl overflow-hidden border border-[rgba(31,46,60,0.08)] bg-white shadow-sm">
            <div className="relative w-full pb-[66%] bg-[#1F2E3C]">
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* 右側文字內容 */}
        <div className="col-span-12 lg:col-span-5 space-y-5">
          {/* 標題 + 作者 */}
          <div className="bg-white border border-[rgba(31,46,60,0.08)] rounded-xl p-6 shadow-sm">
            <div className="text-xs text-gray-500 mb-2">
              {post.location ? `${post.location}｜` : ""}
              {post.type}
            </div>
            <h1 className="text-2xl font-bold text-[#1F2E3C] mb-3">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-3">
                {/* 簡單圓形頭像佔位 */}
                <div className="w-10 h-10 rounded-full bg-[#DCBB87]/40 flex items-center justify-center text-xs font-bold text-[#1F2E3C]">
                  {post.author.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-xs text-gray-400">發佈於 2025-11-01</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                💳 {post.miles.toLocaleString()} 哩程可打賞
              </div>
            </div>

            {/* 按鈕列：收藏 / 分享 / 假打賞 */}
            <div className="flex gap-3 mt-5">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#DCBB87] text-white py-2 text-sm hover:bg-[#BA9A60] transition">
                <Heart size={16} />
                收藏
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#DCBB87] text-[#1F2E3C] py-2 text-sm hover:bg-[#DCBB87]/10 transition">
                <Share2 size={16} />
                分享
              </button>
            </div>
          </div>

          {/* 文章內容區（簡化示意，之後可換成後端資料） */}
          <div className="bg-white border border-[rgba(31,46,60,0.08)] rounded-xl p-6 shadow-sm space-y-4 text-[15px] leading-7 text-[#1F2E3C]/80">
            <p>
              這裡是示範用的文章內容。你可以在之後串接後端 API，將實際撰寫頁面送出的
              文章內容與圖片帶入這個區塊。
            </p>
            <p>
              目前先以假文字撐版，讓整體流程（主頁 → 詳細頁
              → 撰寫頁）可以完整 Demo 給老師與組員看。
            </p>
          </div>
        </div>
      </section>

      {/* 留言區 */}
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white border border-[rgba(31,46,60,0.08)] rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle size={18} className="text-[#DCBB87]" />
              <h2 className="text-base font-semibold text-[#1F2E3C]">
                留言區
              </h2>
            </div>

            {/* 留言輸入框 */}
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="想對作者說些什麼？"
                className="w-full border border-[#DCBB87] rounded-md p-3 text-sm resize-none focus:ring-1 focus:ring-[#DCBB87] outline-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 rounded-md bg-[#DCBB87] text-white text-sm hover:bg-[#BA9A60]"
                >
                  送出留言
                </button>
              </div>
            </div>

            {/* 留言列表 */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="border-t border-gray-100 pt-3 text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-[#1F2E3C]">
                      {c.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {c.createdAt}
                    </span>
                  </div>
                  <p className="text-[#1F2E3C]/80">{c.content}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-xs text-gray-400 text-center">
                  還沒有人留言，成為第一個留言的人吧！
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
