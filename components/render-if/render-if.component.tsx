import { RenderIfType } from "./render-if.type";

export function RenderIf({ condition, children }: RenderIfType) {
  return condition ? children : null;
}