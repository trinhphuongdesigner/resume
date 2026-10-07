import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { personal } from "@/data/resume";

export const alt = `${personal.name} - ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card (Facebook, Zalo, LinkedIn, X, Slack...) shown when the
// site URL is shared. Rendered once at build time from the avatar in /public.
export default async function OpengraphImage() {
  const avatar = await readFile(join(process.cwd(), "public", personal.avatarSrc));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 88px",
          background: "linear-gradient(135deg, #050b18 0%, #0a192f 55%, #0f2745 100%)",
          color: "#e6f1ff",
        }}
      >
        <img
          src={avatarSrc}
          width={360}
          height={360}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "8px solid #64ffda",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, color: "#64ffda", letterSpacing: 2 }}>
            Hi, I&apos;m
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginTop: 8 }}>
            {personal.name}
          </div>
          <div style={{ fontSize: 36, color: "#8892b0", marginTop: 20 }}>
            {personal.title}
          </div>
          <div
            style={{
              marginTop: 36,
              width: 120,
              height: 6,
              borderRadius: 3,
              background: "linear-gradient(90deg, #64ffda, #5e9eff, #b78cff)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
