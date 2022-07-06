export default function useFormatCurrency(
  options = { currency: "TZS", locale: "sw-TZ" }
) {
  const formatter = new Intl.NumberFormat(options.locale, {
    style: "currency",
    currency: options.currency,
  });

  const formatCurrency = (value) => formatter.format(value);

  return formatCurrency;
}
