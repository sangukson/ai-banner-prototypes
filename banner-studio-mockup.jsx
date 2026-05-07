import { useState } from "react";

const STEPS = ["목적 선택", "레퍼런스 선택", "결과 확인"];

const purposeCards = [
  {
    id: "product",
    icon: "🛍️",
    title: "제품/카테고리 홍보",
    desc: "특정 제품이나 카테고리를\n매력적으로 소개해요",
    tag: "가장 많이 사용",
    tagColor: "bg-violet-100 text-violet-600",
  },
  {
    id: "promotion",
    icon: "🔥",
    title: "기획전/프로모션 홍보",
    desc: "할인·묶음·시즌 이벤트를\n임팩트 있게 알려요",
    tag: null,
    tagColor: "",
  },
  {
    id: "benefit",
    icon: "🎁",
    title: "일반 혜택 홍보",
    desc: "무료배송, 적립금 등\n상시 혜택을 안내해요",
    tag: null,
    tagColor: "",
  },
];

const styleRefs = [
  { id: "clean", label: "클린 플로팅", emoji: "⬜", desc: "깔끔한 단색 배경 + 제품 플로팅" },
  { id: "stillife", label: "프리미엄 스틸라이프", emoji: "🌿", desc: "소품 스타일링으로 감성 연출" },
  { id: "lineup", label: "라인업 쇼케이스", emoji: "🗂️", desc: "여러 제품을 한 화면에 진열" },
];

const categoryTabs = ["전체", "의류", "식품", "뷰티", "리빙"];

// Placeholder reference banner cards
const refCards = [
  { id: 1, style: "클린 플로팅", bg: "from-slate-100 to-slate-200", accent: "bg-slate-800", category: "뷰티" },
  { id: 2, style: "프리미엄 스틸라이프", bg: "from-amber-50 to-orange-100", accent: "bg-amber-700", category: "식품" },
  { id: 3, style: "클린 플로팅", bg: "from-rose-50 to-pink-100", accent: "bg-rose-500", category: "의류" },
  { id: 4, style: "라인업 쇼케이스", bg: "from-blue-50 to-indigo-100", accent: "bg-indigo-600", category: "리빙" },
  { id: 5, style: "프리미엄 스틸라이프", bg: "from-green-50 to-emerald-100", accent: "bg-emerald-600", category: "식품" },
  { id: 6, style: "클린 플로팅", bg: "from-purple-50 to-violet-100", accent: "bg-violet-600", category: "뷰티" },
];

const resultCards = [
  { id: 1, bg: "from-slate-100 to-slate-300", tag: "옵션 1" },
  { id: 2, bg: "from-slate-200 to-slate-400", tag: "옵션 2" },
  { id: 3, bg: "from-slate-300 to-slate-500", tag: "옵션 3" },
];

export default function BannerStudio() {
  const [step, setStep] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedRef, setSelectedRef] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setStep(2);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LNB */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
        <div className="flex items-center gap-2 mb-8 px-1">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">α</div>
          <span className="font-semibold text-gray-800 text-sm">알파캔버스</span>
        </div>
        <nav className="flex flex-col gap-1">
          {["대시보드", "스킨 에디터", "콘텐츠 스튜디오", "배너 관리", "설정"].map((m, i) => (
            <button
              key={m}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                i === 2
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {m}
            </button>
          ))}
        </nav>
        {/* Credits badge */}
        <div className="mt-auto">
          <div className="bg-violet-50 rounded-xl p-3">
            <p className="text-xs text-violet-500 font-medium mb-1">남은 크레딧</p>
            <p className="text-2xl font-bold text-violet-700">42</p>
            <p className="text-xs text-violet-400 mt-1">스킨 구매 업체 기준 50cr 제공</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">콘텐츠 스튜디오</h1>
            <p className="text-xs text-gray-400 mt-0.5">AI로 쇼핑몰 배너를 5분 안에 만들어요</p>
          </div>
          <button className="text-sm text-gray-400 hover:text-gray-600">생성 기록 보기</button>
        </header>

        <div className="flex-1 px-8 py-8 max-w-4xl mx-auto w-full">
          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => i < step && setStep(i)}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step
                        ? "bg-violet-600 text-white"
                        : i === step
                        ? "bg-violet-600 text-white ring-4 ring-violet-100"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      i === step ? "text-violet-700" : i < step ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {s}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 h-px mx-3 ${i < step ? "bg-violet-300" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* ── STEP 0: 목적 선택 ── */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">어떤 배너를 만들까요?</h2>
              <p className="text-sm text-gray-500 mb-6">목적에 맞는 배너를 AI가 최적화해서 만들어드려요</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {purposeCards.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedPurpose(c.id)}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                      selectedPurpose === c.id
                        ? "border-violet-500 bg-violet-50 shadow-sm"
                        : "border-gray-100 bg-white hover:border-violet-200"
                    }`}
                  >
                    {c.tag && (
                      <span className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium ${c.tagColor}`}>
                        {c.tag}
                      </span>
                    )}
                    <div className="text-3xl mb-3">{c.icon}</div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{c.title}</p>
                    <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">{c.desc}</p>
                  </button>
                ))}
              </div>

              {/* 일반 혜택 선택 시 안내 */}
              {selectedPurpose === "benefit" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="text-sm font-medium text-amber-800">미리 준비된 혜택 이미지를 제공해요</p>
                    <p className="text-xs text-amber-600 mt-0.5">무료배송, 적립금, 카톡채널 추가 혜택 등 다양한 이미지를 바로 다운로드할 수 있어요</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  disabled={!selectedPurpose}
                  onClick={() => selectedPurpose === "benefit" ? null : setStep(1)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    selectedPurpose && selectedPurpose !== "benefit"
                      ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm"
                      : selectedPurpose === "benefit"
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {selectedPurpose === "benefit" ? "🎁 이미지 다운로드하기" : "다음으로 →"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 1: 레퍼런스 선택 ── */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">마음에 드는 스타일을 골라주세요</h2>
              <p className="text-sm text-gray-500 mb-6">선택한 스타일을 기준으로 AI가 배너를 만들어요. 디자인 감각이 없어도 괜찮아요.</p>

              {/* Style filter chips */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {styleRefs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(selectedStyle === s.id ? null : s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedStyle === s.id
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                    }`}
                  >
                    <span>{s.emoji}</span> {s.label}
                  </button>
                ))}
              </div>

              {/* Category tabs */}
              <div className="flex gap-1 mb-5 border-b border-gray-100">
                {categoryTabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveCategory(t)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-all ${
                      activeCategory === t
                        ? "border-violet-600 text-violet-700"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Reference grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {refCards
                  .filter((r) => activeCategory === "전체" || r.category === activeCategory)
                  .map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRef(r.id)}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all group ${
                      selectedRef === r.id
                        ? "border-violet-500 shadow-md scale-[1.02]"
                        : "border-transparent hover:border-violet-200"
                    }`}
                  >
                    {/* Placeholder banner visual */}
                    <div className={`h-36 bg-gradient-to-br ${r.bg} flex items-end p-4`}>
                      <div className="w-full">
                        <div className={`h-2.5 rounded-full w-3/4 mb-1.5 ${r.accent} opacity-70`} />
                        <div className={`h-1.5 rounded-full w-1/2 ${r.accent} opacity-40`} />
                      </div>
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${r.accent} opacity-20`} />
                    </div>
                    <div className="bg-white px-3 py-2 text-left">
                      <p className="text-xs font-medium text-gray-700">{r.style}</p>
                      <p className="text-xs text-gray-400">{r.category}</p>
                    </div>
                    {selectedRef === r.id && (
                      <div className="absolute top-2 left-2 bg-violet-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>

              {/* Additional prompt */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">추가 요청사항 <span className="text-gray-400 font-normal">(선택)</span></p>
                <textarea
                  className="w-full text-sm text-gray-600 resize-none outline-none placeholder-gray-300"
                  rows={2}
                  placeholder="예) 따뜻하고 포근한 느낌으로, 오른쪽에 제품을 배치해주세요"
                  maxLength={200}
                />
                <p className="text-xs text-gray-300 text-right">최대 200자</p>
              </div>

              <div className="flex justify-between items-center">
                <button onClick={() => setStep(0)} className="text-sm text-gray-400 hover:text-gray-600">
                  ← 이전
                </button>
                <button
                  disabled={!selectedRef}
                  onClick={handleGenerate}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    selectedRef
                      ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {generating ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      AI가 배너를 만드는 중...
                    </span>
                  ) : (
                    "✨ AI 배너 생성하기 (1 Credit × 3장)"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: 결과 확인 ── */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-bold text-gray-900">배너가 완성됐어요!</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">3 Credit 사용 · 잔여 42cr</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">마음에 드는 배너를 선택하고 바로 스킨에 적용하거나 다운로드하세요</p>

              {/* Result cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {resultCards.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedResult(r.id)}
                    className={`rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedResult === r.id
                        ? "border-violet-500 shadow-md scale-[1.02]"
                        : "border-gray-100 hover:border-violet-200"
                    }`}
                  >
                    <div className={`h-44 bg-gradient-to-br ${r.bg} relative flex items-center justify-center`}>
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-2xl bg-white/40 mx-auto mb-3 flex items-center justify-center text-3xl">🛍️</div>
                        <div className="w-24 h-2 bg-white/60 rounded-full mx-auto mb-1.5" />
                        <div className="w-16 h-1.5 bg-white/40 rounded-full mx-auto" />
                      </div>
                      {selectedResult === r.id && (
                        <div className="absolute top-2 left-2 bg-violet-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</div>
                      )}
                    </div>
                    <div className="bg-white px-3 py-2 text-left">
                      <p className="text-xs font-medium text-gray-700">{r.tag}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Action buttons */}
              {selectedResult && (
                <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex items-center gap-3">
                  <button className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all">
                    🚀 스킨에 바로 적용
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all">
                    ⬇️ PNG로 다운로드
                  </button>
                </div>
              )}

              {/* Regenerate options */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-3">마음에 안 드세요? 다시 만들어요</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => { setSelectedRef(null); setStep(1); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 hover:border-violet-300 transition-all"
                  >
                    🔄 레퍼런스부터 다시
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 hover:border-violet-300 transition-all">
                    ✨ 같은 스타일로 재생성
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 hover:border-violet-300 transition-all">
                    ✏️ 이 이미지 수정하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
