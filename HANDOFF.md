# PFCApp — HANDOFF

## 現在地

子ども向けPFCApp MVPは、企画・主要UX・正式食品マスタ投入・GitHub Pages公開・PWA化まで完了した。

2026-09-04時点で、GitHub Pagesの公開URLをiOS Safariで開けること、およびホーム画面へPWAとして追加できることをユーザーが実機確認済み。

**次のフェーズは、娘本人のiPhoneへ入れて実生活で使ってもらい、実機フィードバックを集めること。**

正式仕様は以下を参照する。

- `canon/product-overview.md`
- `canon/kids-app.md`
- `canon/adult-app.md`

このHANDOFFは再開用の現在地メモであり、企画仕様はCANON、技術HOWと実装状態はコードを正本とする。

## 現在のMVP

### 実装済み主要体験

- Today画面にP/F/Cキャラと物差し、今日の食品ログを表示。
- 食品追加画面でカテゴリ→食品→`ちょっと / ふつう / いっぱい`を選択。
- 食品のPFC特徴を星で表示し、Todayへの増分を未来プレビューとして表示。
- `ふつう`のみ子ども向け具体量を表示し、`ちょっと / いっぱい`の厳密量は見せない。
- 食品追加後はTodayへ反映。
- 記録取り消し（Undo）あり。
- ログは端末localStorageへ保存。バックエンド・認証・クラウド同期なし。
- 参考ゾーンは状態表示のみで、良い／悪い等の評価には使わない。

中心原則は引き続き以下。

**PFCAppは数値の状態を見せる。状態を採点しない。**

### UIで確定している重要事項

- 星0は `☆0`。1〜5は5スロット、6以上は圧縮表示。
- 現在のP/F/Cキャラの控えめな目・表情感を維持。
- 現在の参考ゾーンのレイヤリング／見た目はユーザー確認済みで完成扱い。
- 未来プレビューの黄色系発光も現在の見た目を維持。
- 食品ボタンは2列グリッド。
- Today下部の `＋ 食べものを選ぶ` は固定。

## 正式食品マスタ

正式な初期食品マスタ61食品を投入済み。

現在の実装データは `src/data/foodMaster.ts`。

### 正本運用

**食品マスタの実装上のSingle Source of Truthは `src/data/foodMaster.ts` とする。**

- xlsx / CSVは初期整備・一括編集・レビュー用の補助データ。
- xlsx / CSVとの常時同期は要求しない。
- 食品を1〜数件追加・修正する程度なら `foodMaster.ts` を直接更新してよい。
- 大量追加・一括見直し時のみ、必要に応じて表計算データを利用する。
- CSVからの再生成等を行う場合、TS側の新しい変更を誤って上書きしないこと。

リポジトリには初期投入時の `data/food-master/PFCApp_foodmaster.csv` と生成スクリプトも存在するが、今後の通常運用でCSV経由を必須としない。

### 既知の食品データ要点

- 食パンは10枚切り。ふつう2枚、ちょっと1枚、いっぱい3枚。
- 食パンふつう概算: 200 kcal / P 7.2g / F 3.5g / C 36.8g（現在の実装値を正本とする）。
- 赤パスタ／白パスタは0.8 / 1 / 1.2食。
- 卵焼きは卵1 / 2 / 3個相当。
- ゆで卵は娘が黄身を残し白身のみ食べる前提。
- 枝豆200gはさやごと。
- スープ類は家庭レシピ全量基準。

### 後で追加したい候補

ユーザーから、食品として以下を追加したい意向あり。ただしMVP実機利用を優先し、今は後回し。

- カレー
- 鶏肉

今後も利用中に不足食品が見つかる前提なので、ある程度まとめて追加してよい。

## GitHub Pages / PWA

GitHub Pages対応を実装済み。

主要コミット:
- `5dbc88e` — `Deploy PFCApp to GitHub Pages`

公開URL:
- `https://pui31.github.io/pfcapp/`

実装内容:

- Vite base `/pfcapp/`
- manifest / Service WorkerのBASE_URL・サブパス対応
- manifestのstart_url / scope対応
- Service Workerキャッシュ先を配置スコープ基準へ修正
- `.github/workflows/deploy-pages.yml` にGitHub Pages Actions workflow追加
- main push時に型検査→build→Pages artifact deploy

初回workflowはGitHub PagesのSourceが未設定だったため `Configure GitHub Pages` で失敗した。
Settings → Pages → Build and deployment / Source を `GitHub Actions` に変更し、workflowをRe-runしたことで解決。

ユーザー確認済み:

- 公開URLをiOS Safariで表示できる。
- iOSのホーム画面へPWAとして追加できる。

専用アプリアイコン等の仕上げは現時点では必須としていない。

## 次にやること

最優先は**娘本人による実生活での利用観察**。

新機能を先に増やすより、まず現在のMVPを本人のiPhoneへ入れ、実際の食事で使ってもらう。

観察したいこと:

- 説明なしでも食品追加フローを理解できるか。
- `ちょっと / ふつう / いっぱい` と星・物差しの関係が自然に伝わるか。
- 食品2列グリッドやカテゴリ移動で押しづらさ／探しづらさがないか。
- Todayの物差しを見て本人が次の食事を考える材料にできるか。
- 20目盛り超過時の可変スケールが実機で違和感ないか。
- 実生活で不足する食品が何か。
- PWA起動・更新・localStorage保持に実機固有の問題がないか。

最初は大人が操作方法を説明しすぎず、本人が自然に触って止まる場所や誤操作をUX上の発見として扱う。

## 次チャットの推奨開始地点

1. 最新 `PROJECT_BRIEF.md` とこの `HANDOFF.md` を取得。
2. 娘本人の実機利用フィードバックがあれば、それを整理する。
3. フィードバックを「不具合 / UI調整 / 食品不足 / 新機能候補」に分ける。
4. 直す価値が高いものから小さくImplementation Snapshot + Acceptance Criteriaへ落とし、Codexへ実装依頼する。
5. カレー・鶏肉等の食品追加は必要になったタイミングで `src/data/foodMaster.ts` を正本として行う。

実装中に子どもへ何を見せるか、どう評価して見えるか等の新しいUX判断が発生した場合は、Codexだけで埋めずChatGPT Projectへ戻る。

## 補足

ChatGPT Projectの長い会話を毎回Codexへ共有する必要はない。リポジトリ内のPROJECT_BRIEF / CANON / AGENTS / コードが育っているため、小さな実装は必要な指示だけCodexへ渡す運用でよい。
