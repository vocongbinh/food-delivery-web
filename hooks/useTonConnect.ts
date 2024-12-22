

import { Sender, SenderArguments } from "ton-core";
// import { connector } from "@/utils/tonConnectInstance";
import { useTonConnectUI } from "@tonconnect/ui-react";
// import dynamic from "next/dynamic";
export function useTonConnect(): { sender: Sender; connected: boolean } {
  // console.log("useTonConnect", connector.connected);
  const [tonConnectUI] = useTonConnectUI()
  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
