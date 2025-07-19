"use server";

import { Locale } from "next-intl";
import { cookies } from "next/headers";
import { defaultLocale } from "../config/locale.config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookieStore = cookies();
  const locale = (await cookieStore).get(COOKIE_NAME);

  // ถ้าไม่มี locale ใน cookies ให้ใช้ defaultLocale
  return locale ? (locale.value as Locale) : defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = cookies();

  // ตั้งค่าคุกกี้ locale
  (
    await // ตั้งค่าคุกกี้ locale
    cookieStore
  ).set(COOKIE_NAME, locale, { httpOnly: true, path: "/" });
}
