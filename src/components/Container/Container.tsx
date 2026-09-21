import type { ReactNode } from "react";
import * as SC from "./Container.styled";

export default function Container({ children }: { children: ReactNode }) {
  return <SC.Container>{children}</SC.Container>;
}
