import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, Textarea } from '@muhayu/ck-ui';
import './CitationUpload.css';

const PencilIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="size-5" style={{ color: '#d1d5db' }}>
    <g clipPath="url(#pencil-clip)">
      <path d="M4 20.5001H8L18.5 10.0001C19.0304 9.46963 19.3284 8.7502 19.3284 8.00006C19.3284 7.24991 19.0304 6.53049 18.5 6.00006C17.9696 5.46963 17.2501 5.17163 16.5 5.17163C15.7499 5.17163 15.0304 5.46963 14.5 6.00006L4 16.5001V20.5001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 7L17.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="pencil-clip">
        <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="fill-gray-600 size-5">
    <path d="M18.3 5.71C17.91 5.32 17.28 5.32 16.89 5.71L12 10.59L7.11 5.7C6.72 5.31 6.09 5.31 5.7 5.7C5.31 6.09 5.31 6.72 5.7 7.11L10.59 12L5.7 16.89C5.31 17.28 5.31 17.91 5.7 18.3C6.09 18.69 6.72 18.69 7.11 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.11C18.68 6.73 18.68 6.09 18.3 5.71Z" />
  </svg>
);

export default function CitationUpload() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('file'); // 'file' | 'text'
  const [selectedFile, setSelectedFile] = useState(null);
  const [directTitle, setDirectTitle] = useState('');
  const [directText, setDirectText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleTextConfirm = () => {
    if (!directText.trim()) return;
    navigate('/citation/result/1799');
  };

  const switchToText = () => {
    setMode('text');
    setSelectedFile(null);
  };

  const switchToFile = () => {
    setMode('file');
    setDirectTitle('');
    setDirectText('');
  };

  const canSubmitFile = !!selectedFile;
  const canConfirmText = directText.trim().length > 0;
  const textLength = directText.length;

  if (mode === 'text') {
    return (
      <div className="cu-page">
        <div className="cu-text-page-body">
          <section className="cu-text-title-section">
            <div className="cu-text-title-row">
              <InputGroup
                startElement={<PencilIcon />}
                className="flex-1"
              >
                <Input
                  placeholder="제목을 입력해주세요."
                  maxLength={50}
                  value={directTitle}
                  onChange={e => setDirectTitle(e.target.value)}
                  name="title"
                />
              </InputGroup>
              <Button
                variant="text"
                theme="secondary"
                size="md"
                onClick={switchToFile}
              >
                <XIcon />
              </Button>
            </div>
          </section>

          <section className="cu-text-content-section">
            <Textarea
              className="cu-direct-textarea"
              placeholder="내용을 입력하세요..."
              maxLength={10001}
              value={directText}
              onChange={e => setDirectText(e.target.value)}
              name="content"
            />
            <span className="cu-char-count">{textLength.toLocaleString()} / 10,000</span>
          </section>
        </div>

        <footer className="cu-footer cu-footer--right">
          <Button
            variant="outline"
            theme="black"
            size="md"
            onClick={switchToFile}
          >
            취소
          </Button>
          <Button
            variant="filled"
            theme="primary"
            size="md"
            disabled={!canConfirmText}
            onClick={handleTextConfirm}
          >
            확인
          </Button>
        </footer>
      </div>
    );
  }

  return (
    <div className="cu-page">
      <div className="cu-body">
        <div className="cu-heading">
          <h1 className="cu-title">참고문헌 유효성 검증</h1>
          <p className="cu-desc">카피킬러 100억건 DB와 비교하여 참고문헌이 실재 있는지 여부를 검증합니다.</p>
        </div>

        <div
          className={`cu-dropzone${dragOver ? ' drag-over' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="cu-dropzone-inner">
            <p className="cu-drop-text">파일을 여기에 드래그 &amp; 드롭 하거나</p>
            <div className="cu-btn-row">
              <Button
                variant="outline"
                theme="primary"
                size="sm"
                type="button"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z" />
                </svg>
                파일 업로드
              </Button>
              <span className="cu-btn-sep">또는</span>
              <Button
                variant="outline"
                theme="primary"
                size="sm"
                type="button"
                className="gap-2"
                onClick={switchToText}
              >
                <svg width="16" height="16" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20.5H8L18.5 10C19.03 9.47 19.33 8.75 19.33 8C19.33 7.25 19.03 6.53 18.5 6C17.97 5.47 17.25 5.17 16.5 5.17C15.75 5.17 15.03 5.47 14.5 6L4 16.5V20.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M13.5 7L17.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                직접 입력
              </Button>
            </div>

            {selectedFile ? (
              <div className="cu-selected-file">
                <span className="cu-file-name">{selectedFile.name}</span>
                <button className="cu-file-remove" onClick={() => setSelectedFile(null)}>✕</button>
              </div>
            ) : (
              <div className="cu-file-info">
                <p>업로드 가능 용량 : 100 MB</p>
                <p>업로드 가능 확장자 : *.hwp;*.hwpx;*.doc;*.docx;*.pdf;*.txt;</p>
              </div>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          className="cu-hidden-input"
          type="file"
          accept=".hwp,.hwpx,.doc,.docx,.pdf,.txt"
          onChange={e => handleFile(e.target.files[0])}
        />
      </div>

      <footer className="cu-footer">
        <Button
          variant="outline"
          theme="black"
          size="md"
          className="gap-1"
          onClick={() => navigate('/citation')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 15.87L11.12 12 15 8.11a1 1 0 00-1.41-1.41L9 11.29a1 1 0 000 1.41l4.59 4.59A1 1 0 0015 15.87z" />
          </svg>
          뒤로가기
        </Button>
        <Button
          variant="filled"
          theme="primary"
          size="md"
          className="gap-2"
          disabled={!canSubmitFile}
          onClick={() => navigate('/citation/result/1799')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M20 0H13.0124L8.20592 4.89044L4.70801 8.44941L8.20592 12L20 0Z" fill="currentColor" />
            <path d="M6.98758 3.12354H0L5.22628 8.44943L8.72419 4.89046L6.98758 3.12354Z" fill={!canSubmitFile ? 'currentColor' : '#3E4448'} />
          </svg>
          검사하기
        </Button>
      </footer>
    </div>
  );
}
