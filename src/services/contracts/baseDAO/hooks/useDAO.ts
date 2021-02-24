import { TezosToolkit } from "@taquito/taquito";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import { getDAO } from "services/contracts/baseDAO";
import { useTezos } from "services/beacon/hooks/useTezos";
import { DAOItem } from "services/contracts/baseDAO/types";

export const useDAO = (address: string | undefined) => {
  const { tezos, connect, network } = useTezos();
  const queryClient = useQueryClient();

  const result = useQuery<DAOItem, Error>(
    ["dao", address],
    () => getDAO(address as string, tezos as TezosToolkit, network),
    {
      enabled: !!tezos && !!address && !!queryClient,
      initialData: () => {
        return queryClient
          ?.getQueryData<DAOItem[]>("daos")
          ?.find((d) => d.address === address);
      },
    }
  );

  useEffect(() => {
    if (!tezos) {
      connect();
    }
  }, [connect, tezos]);

  return result;
};
