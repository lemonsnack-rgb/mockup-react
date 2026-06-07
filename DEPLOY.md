# Vercel 배포 가이드

Git-Vercel 이메일 불일치로 자동배포가 안 되므로, 로컬 빌드 후 Vercel CLI로 수동 배포한다.

## 사전 조건

- Node.js 설치 (현재 v24.11.0)
- Vercel CLI 설치 (`npm i -g vercel`)
- Vercel 로그인 완료 (`vercel login`)

## 배포 순서

### 1. 빌드

```bash
cd c:/project/03_출처검사/mockup-react
rm -rf dist
npx vite build
```

### 2. dist 폴더에 배포 설정 파일 생성

```bash
echo '{"buildCommand":"exit 0","installCommand":"exit 0","outputDirectory":".","rewrites":[{"source":"/(.*)","destination":"/index.html"}]}' > dist/vercel.json
```

### 3. ck-validity-mockup 배포

```bash
mkdir -p dist/.vercel
echo '{"projectId":"prj_CW3yfpXLvQRers3a2hhcVq1BKS2I","orgId":"team_KbITF4TSVJVlhlMkk9tby2VJ","projectName":"ck-validity-mockup"}' > dist/.vercel/project.json
cd dist && npx vercel deploy --prod --yes
```

배포 결과: https://ck-validity-mockup.vercel.app

### 4. mockup-react-nine 배포 (필요 시)

```bash
cd c:/project/03_출처검사/mockup-react
cp .vercel/project.json dist/.vercel/project.json
cd dist && npx vercel deploy --prod --yes
```

배포 결과: https://mockup-react-nine.vercel.app

### 5. 정리

```bash
rm -f c:/project/03_출처검사/mockup-react/dist/vercel.json
rm -rf c:/project/03_출처검사/mockup-react/dist/.vercel
```

## 왜 이 방식을 쓰는가

- Vercel 원격 빌드에서 `vite build`가 exit code 127로 실패함
- `buildCommand: "exit 0"`으로 원격 빌드를 건너뛰고, 로컬 빌드 결과물(dist)을 직접 업로드
- Git 커밋/푸시는 배포와 별도로 진행 (`git add` → `git commit` → `git push`)
