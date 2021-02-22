import { TransactionWalletOperation } from "@taquito/taquito";
import { useMutation, useQueryClient } from "react-query";

import { doDAOPropose } from "services/contracts/baseDAO";
import { useTezos } from "services/beacon/hooks/useTezos";
import { ProposeParams } from "services/contracts/baseDAO/types";
import { connectIfNotConnected } from "services/contracts/utils";

type UseProposeParams = Omit<ProposeParams, "tezos">;

export const usePropose = async () => {
  const queryClient = useQueryClient();
  const { tezos, connect } = useTezos();

  await connectIfNotConnected(tezos, connect);

  return useMutation<TransactionWalletOperation, Error, UseProposeParams>(
    async (params) => {
      return await doDAOPropose({
        ...params,
        tezos: tezos || (await connect()),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("proposals");
      },
    }
  );
};
