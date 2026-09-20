// src/utils/markdown.ts

/**
 * 마크다운 이미지 문법(![alt](url))을 테크니컬 피규어(figure) 태그로 변환합니다.
 * @param text 본문 마크다운
 * @param accentClass 카테고리별 강조 텍스트 색상 (예: 'text-topic-etc', 'text-topic-ai', 'text-topic-study')
 */
export function formatImageMarkdown(text: string, accentClass = "text-[#58a6ff]"): string {
    if (!text) return "";

    return text.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        (_, rawAlt: string, rawUrl: string) => {
            const alt = rawAlt.trim();
            // "url 'title'" 형태에서 순수 URL만 추출
            const cleanUrl = rawUrl.trim().split(/\s+/)[0].replace(/^["']|["']$/g, "");

            // Alt 설명이 있을 때만 하단 캡션 라인 생성
            const captionHtml = alt
                ? `<figcaption class="mt-2.5 text-[11px] font-mono text-[#8b949e] uppercase flex items-center justify-center gap-1.5 select-none">
            <span class="${accentClass} font-bold">// FIG.</span>
            <span class="truncate max-w-[85%]">${alt}</span>
          </figcaption>`
                : "";

            return `<figure class="my-6 border border-[#1f242c] bg-[#0c0e12] p-2.5 rounded text-center group">
        <a 
          href="${cleanUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="overflow-hidden rounded bg-[#050608] flex items-center justify-center cursor-zoom-in block"
          title="클릭하여 원본 크기로 보기"
        >
          <img 
            src="${cleanUrl}" 
            alt="${alt}" 
            class="max-h-[560px] w-auto max-w-full object-contain block transition-transform duration-200 group-hover:scale-[1.01]" 
            loading="lazy" 
          />
        </a>
        ${captionHtml}
      </figure>`;
        }
    );
}