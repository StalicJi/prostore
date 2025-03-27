# Prisma 筆記

## 1. 在 json 檔裡面 script 加入啟動指令

> postinstall": "prisma generate

## 2. prisma generate 會根據你的 schema.prisma：產生 Prisma Client（也就是自動產生 TypeScript 代碼）

    - 確保別人 git clone 下來跑 npm install 時，自動產生 Prisma Client
    - 避免漏執行 npx prisma generate 導致 @prisma/client 報錯

> npx prisma generate

## 3. prisma 的「資料庫遷移（migration）」指令，用來：

    ✅ 建立資料表結構
    ✅ 同步 Prisma schema 到你的資料庫
    ✅ 自動產生 migration 檔和 Prisma Client

> "npx prisma migrate dev --name init"

    輸入完指令後會產生migrations資料夾

## 4. 開啟 Prisma Studio，Prisma 提供的「圖形化資料庫管理介面」

- http://localhost:5555/

> "npx prisma studio"

## 5 .創建 seed.ts

```
import { PrismaClient } from "@prisma/client";

import sampleData from "./sample-data";

async function main() {
const prisma = new PrismaClient();
await prisma.product.deleteMany();

await prisma.product.createMany({ data: sampleData.products });

console.log("Database seeded successfully!");
}

main();
```

> 輸入指令 'npx tsx ./db/seed'

    本地的虛擬資料就會上傳到prisma的localhost:5555

### 將 Prisma 物件轉換為常規 JS 對象函式，寫在 utils.ts

```
export function convertToPlainObject<T>(value: T): T {
return JSON.parse(JSON.stringify(value));
}
```

## 安裝 Neon Database ，是雲端 postgreSQL(三個要一起裝)

https://neon.tech/docs/guides/nextjs

> npm install @neondatabase/serverless

- Neon 是 Serverless 架構的 PostgreSQL，所以它不支援傳統的 持久 TCP 連線（例如 pg、Prisma 預設連線），需要用「HTTP-based 連線方式」才能穩定運作。

> @prisma/adapter-neon

- 🧠 WebSocket 是什麼？
  WebSocket 是一種網路通訊協定，它提供一個 持久的、全雙工（雙向）連線通道，允許瀏覽器與伺服器之間持續通訊，不需要不斷發送 HTTP 請求。

> ws

> npm i -D @types/ws

裝完後在 schema.prisma 檔案加入

```
generator client {
provider = "prisma-client-js"
previewFeatures = ["driverAdapters"]
}
```

下一步

> npx prisma denerate
