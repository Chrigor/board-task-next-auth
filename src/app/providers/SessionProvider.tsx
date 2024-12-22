"use client";
import {
  SessionProvider as NextSessionProvider,
  useSession,
} from "next-auth/react";
import { PropsWithChildren } from "react";

export default function SessionProvider(props: PropsWithChildren | any) {
  return (
    <NextSessionProvider session={props.session}>
      {props.children}
    </NextSessionProvider>
  );
}
