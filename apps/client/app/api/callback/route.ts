import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const STRAPI_URL =
    process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

export async function POST(request: Request) {
    let body: { phone?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const phone = body.phone?.trim();
    if (!phone) {
        return NextResponse.json({ error: "Телефон обязателен" }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
        return NextResponse.json(
            { error: "Некорректный номер телефона" },
            { status: 400 }
        );
    }

    const labels = ["strapi", "telegram", "email"] as const;
    const results = await Promise.allSettled([
        saveToStrapi(phone),
        sendTelegramNotification(phone),
        sendEmailNotification(phone),
    ]);

    results.forEach((r, i) => {
        if (r.status === "rejected") {
            console.error(`[callback] ${labels[i]} failed:`, r.reason);
        } else {
            console.log(`[callback] ${labels[i]} ok`);
        }
    });

    return NextResponse.json({ ok: true });
}

/* ─── Strapi ─── */
async function saveToStrapi(phone: string) {
    const token = process.env.STRAPI_API_TOKEN;
    if (!token || token === "change_me_after_strapi_setup") return;

    const res = await fetch(`${STRAPI_URL}/api/callback-requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { phone } }),
    });

    if (!res.ok) {
        console.error("[callback] Strapi save failed:", res.status);
    }
}

/* ─── Telegram ─── */
async function sendTelegramNotification(phone: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;

    const text = [
        "📞 <b>Новая заявка на обратный звонок</b>",
        "",
        `Телефон: <code>${phone}</code>`,
        `Дата: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`,
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
        }),
    });

    if (!res.ok) {
        const err = await res.text().catch(() => "unknown");
        console.error("[callback] Telegram send failed:", res.status, err);
    }
}

/* ─── Email ─── */
async function sendEmailNotification(phone: string) {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.NOTIFICATION_EMAIL;

    if (!host || !user || !pass || !to) return;

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    const date = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    await transporter.sendMail({
        from: `"Сайт — заявка" <${from}>`,
        to,
        subject: `Заявка на обратный звонок: ${phone}`,
        text: `Новая заявка на обратный звонок\n\nТелефон: ${phone}\nДата: ${date}`,
        html: `
            <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px">
                <h2 style="margin:0 0 16px;color:#333">📞 Новая заявка</h2>
                <table style="width:100%;border-collapse:collapse">
                    <tr>
                        <td style="padding:8px 0;color:#888;width:100px">Телефон</td>
                        <td style="padding:8px 0;font-weight:600;color:#111">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 0;color:#888">Дата</td>
                        <td style="padding:8px 0;color:#111">${date}</td>
                    </tr>
                </table>
            </div>
        `,
    });
}
