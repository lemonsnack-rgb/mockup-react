/* ── 정적 목업 PDF 다운로드 ── */
export async function generateValidityPdf(checkInfo) {
  const safeName = checkInfo.docName.replace(/[\\/:*?"<>|]/g, '_');
  const fileName = `출처_유효성_검사_결과_${safeName}_${checkInfo.completedAt}.pdf`;

  const res = await fetch('/validity-report-mockup.pdf');
  const blob = await res.blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
