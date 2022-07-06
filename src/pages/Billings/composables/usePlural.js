import { unref } from "vue";

export default function usePlural(noun, locale = "en-US") {
  const pr = new Intl.PluralRules(locale, { type: "ordinal" });

  const ordinals = (n) =>
    new Map([
      ["zero", `No ${noun}s`],
      ["one", `One ${noun}`],
      ["two", `Two ${noun}s`],
      ["few", `${n} ${noun}s`],
      ["other", `${n} ${noun}s`],
    ]);

  const formatOrdinals = (val) => {
    const intVal =
      typeof unref(val) === "string" ? parseInt(unref(val)) : unref(val);
    return ordinals(intVal).get(pr.select(intVal));
  };

  return { formatOrdinals };
}
