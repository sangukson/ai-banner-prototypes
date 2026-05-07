import { useState, useRef } from "react";

// ──────────────────────────────────────────────
// Step 1: PC 배너 생성 결과
// ──────────────────────────────────────────────
function PCResult({ onCropMobile }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-gray-800">생성된 PC 배너</p>
        <p className="text-xs text-gray-400 mt-0.5">16:9 · 컴퓨터 화면용</p>
      </div>

      {/* PC 배너 이미지 영역 */}
      <div className="w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
        {/* 배너 내용 placeholder */}
        <div className="text-center">
          <div className="w-24 h-24 rounded-2xl bg-white/50 mx-auto mb-3 flex items-center justify-center text-4xl">🛍️</div>
          <div className="w-40 h-3 bg-white/60 rounded-full mx-auto mb-2" />
          <div className="w-24 h-2 bg-white/40 rounded-full mx-auto" />
        </div>
        {/* 16:9 비율 라벨 */}
        <span className="absolute bottom-3 right-3 text-xs bg-black/20 text-white px-2 py-0.5 rounded-full">16:9</span>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={onCropMobile}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all"
        >
          📱 모바일 배너 편집
        </button>
        <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-all">
          ⬇️ PC 다운로드
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Step 2: 모바일 크롭 에디터
// ──────────────────────────────────────────────
function MobileCropEditor({ onBack, onConfirm }) {
  // 크롭 박스 x 위치 (0 ~ 100, %)
  const [cropX, setCropX] = useState(30);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startCropX = useRef(0);

  // PC 이미지 컨테이너 기준 드래그
  const containerRef = useRef(null);

  const onMouseDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startCropX.current = cropX;
  };

  const onMouseMove = (e) => {
    if (!dragging.current || !containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const dx = ((e.clientX - startX.current) / containerW) * 100;
    const next = Math.min(Math.max(startCropX.current + dx, 0), 72); // 크롭박스 28% 너비 기준
    setCropX(next);
  };

  const onMouseUp = () => { dragging.current = false; };

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm">← 뒤로</button>
        <div>
          <p className="text-sm font-semibold text-gray-800">모바일 배너 편집</p>
          <p className="text-xs text-gray-400">원하는 영역을 선택해주세요</p>
        </div>
      </div>

      {/* 크롭 에디터 */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden border border-gray-100 select-none cursor-col-resize"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* PC 배너 내용 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-2xl bg-white/50 mx-auto mb-3 flex items-center justify-center text-4xl">🛍️</div>
            <div className="w-40 h-3 bg-white/60 rounded-full mx-auto mb-2" />
            <div className="w-24 h-2 bg-white/40 rounded-full mx-auto" />
          </div>
        </div>

        {/* 어두운 오버레이 (크롭 밖) */}
        <div className="absolute inset-0 bg-black/40" style={{ clipPath: `polygon(0 0, ${cropX}% 0, ${cropX}% 100%, 0 100%)` }} />
        <div className="absolute inset-0 bg-black/40" style={{ clipPath: `polygon(${cropX + 28}% 0, 100% 0, 100% 100%, ${cropX + 28}% 100%)` }} />

        {/* 크롭 박스 (9:16 → PC 이미지 안에서 세로 긴 영역) */}
        <div
          className="absolute top-0 bottom-0 border-2 border-white rounded-lg cursor-grab active:cursor-grabbing"
          style={{ left: `${cropX}%`, width: "28%" }}
          onMouseDown={onMouseDown}
        >
          {/* 핸들 가이드라인 */}
          <div className="absolute inset-x-0 top-1/3 h-px bg-white/40" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-white/40" />
          {/* 드래그 힌트 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs bg-black/30 px-2 py-0.5 rounded-full">← 드래그 →</span>
          </div>
          {/* 비율 라벨 */}
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/40 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">9:16</span>
        </div>
      </div>

      {/* 하단: 모바일 미리보기 + 버튼 */}
      <div className="flex items-end gap-4">
        {/* 모바일 미리보기 */}
        <div className="shrink-0">
          <p className="text-xs text-gray-400 mb-1.5 text-center">미리보기</p>
          <div
            className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center"
            style={{ width: 52, height: 92 }}
          >
            <span className="text-xl">🛍️</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex-1 flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all"
          >
            ✅ 이 영역으로 확정
          </button>
          <button className="w-full py-2 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-all">
            ⬇️ PC + MO 모두 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 메인
// ──────────────────────────────────────────────
export default function BannerResult() {
  const [view, setView] = useState("pc"); // "pc" | "crop" | "done"

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-2xl shadow-sm">
        {view === "pc" && (
          <PCResult onCropMobile={() => setView("crop")} />
        )}
        {view === "crop" && (
          <MobileCropEditor
            onBack={() => setView("pc")}
            onConfirm={() => setView("done")}
          />
        )}
        {view === "done" && (
          <div className="text-center py-8 space-y-3">
            <div className="text-4xl">🎉</div>
            <p className="font-semibold text-gray-800">PC + 모바일 배너 완성!</p>
            <p className="text-sm text-gray-400">스킨에 바로 적용하거나 다운로드하세요</p>
            <div className="flex gap-2 justify-center mt-4">
              <button className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold">🚀 스킨에 적용</button>
              <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">⬇️ 다운로드</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
