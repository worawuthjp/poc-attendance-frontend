import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// สร้างตัวช่วยสำหรับรองรับ shareable configs แบบเก่า (FlatCompat)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ถ้าต้องการใช้ parserOptions หรือ settings เพิ่มเติม ให้ใส่ใน object ต่อท้ายได้
const eslintConfig = [
  // นำกฎพื้นฐานจาก Next.js core web vitals และ Next.js+TypeScript มาใช้
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",

    // กฎมาตรฐานของ @typescript-eslint
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    // กฎมาตรฐาน React
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",

    // กฎ SonarJS (ตรวจโค้ดตามแนวทาง SonarSource)
    "plugin:sonarjs/recommended",

    // กฎ Security (eslint-plugin-security)
    "plugin:security-node/recommended"
  ),

  // คุณสามารถเพิ่มการตั้งค่าอื่นๆ ของ FlatConfig ได้ในออบเจกต์นี้
  {
    // กำหนด parser ให้รองรับ TypeScript
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        // ชี้ไปที่ tsconfig.json เพื่อเปิดใช้กฎที่ต้องการ type-checking
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
      // กำหนด plugins ที่จะใช้
      plugins: {
        "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        react: require("eslint-plugin-react"),
        "react-hooks": require("eslint-plugin-react-hooks"),
        sonarjs: require("eslint-plugin-sonarjs"),
        security: require("eslint-plugin-security-node"),
      },
    },

    // ตั้งค่าเฉพาะสำหรับ React (เช่น ต้องกำหนดเวอร์ชัน React)
    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // ตัวอย่างการปรับแต่งกฎเพิ่มเติม (หากต้องการ)
      // ปิดกฎบางตัว หรือปรับความเข้มงวดตามทีมได้ที่นี่
      //
      // ตัวอย่าง: ไม่ใช้ any ใน TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      // ตัวอย่าง: เปิดกฎให้ตรวจความปลอดภัยเพิ่มเติม
      "security/detect-object-injection": "warn",
      // ตัวอย่าง: ปรับ severity ของ SonarJS บางกฎ
      "sonarjs/no-duplicate-string": ["warn", 5],
      // ตัวอย่าง: ปิดกฎ React ที่ไม่ต้องการใช้
      "react/prop-types": "off",
      // ตัวอย่าง: ให้แจ้งเตือนเมื่อมี unused variables ใน TS
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },

    // หากต้องการ override เฉพาะไฟล์บางประเภท (เช่น .ts/.tsx)
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  },
];

export default eslintConfig;
