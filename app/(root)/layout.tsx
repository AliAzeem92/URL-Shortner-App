import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Background from "@/public/assets/BackgroundImage.svg";

interface ProtectedRootLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedRootLayout({
  children,
}: ProtectedRootLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  return (
    <main>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Image
          alt="Background"
          src={Background}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div style={{ position: "absolute" }}>{children}</div>
      </div>
    </main>
  );
}
