import { useDialog } from "@/ui/common/dialog";
import { LineChart } from ".";

export const useLineChartDialog = (prices: any[]) => {
  const { popup, openPopup } = useDialog({
    title: "Price Chart",
    className: " min-w-[800px] w-[60%]",
    body: <LineChart prices={prices} />,
    hasCloseIcon: true,
  });

  return {
    popup,
    openPopup,
  } as const;
};
