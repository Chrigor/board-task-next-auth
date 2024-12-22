"use client";
import { PropsWithChildren } from "react";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export default function SessionProvider(props: PropsWithChildren | any) {
  return (
    <NextSessionProvider session={props.session}>
      {props.children}
    </NextSessionProvider>
  );
}
