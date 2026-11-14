import { Fragment } from "react";

/** Transforme `du **texte**` en texte avec des <strong>. */
export function rich(text: string) {
  return text.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}
