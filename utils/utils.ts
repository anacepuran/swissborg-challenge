export function getPriceColor(value: number): string {
  return value > 0 ? "#01c38d" : "#eb4f4b";
}
export function displayPercentage(value: number): string {
  return (value * 100).toFixed(2);
}
export function formatNumberWithCommas(value: number) {
  return value.toLocaleString("en-US");
}
export function formatPieChartLabel(name: string, color: string) {
  return `<div style="display:flex; align-items: center;">
            <div style="background: ${color}; width: 16px; height: 16px; margin:0; padding: 0; border-radius: 8px; line-height: 16px; box-shadow: -1px -1px 3px #2f2f2f;"></div>
            <span style="flex: 1; margin-left: 4px;">${name}</span>
          </div>`;
}

export function getCustomTooltip(
  value: number | undefined,
  timestamp: number | string
) {
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tooltipFormattedDate = formatter.format(
    new Date(Number(timestamp) - 3600000)
  );
  return (
    value &&
    `
    <div>${tooltipFormattedDate}<div>
    <div style="display: flex; align-items: center; gap: 5px;">
      <div style="background: #01c38d; width:10px; height:10px; border-radius: 5px;"></div>
      USD to BORG: <b>${value?.toFixed(3)}</b>
    </div>`
  );
}
