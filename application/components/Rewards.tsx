import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThirdwebNftMedia, { ThirdwebNftMediaProps } from "@thirdweb/nft-media";


const useRouterParams = () => {
  const router = useRouter();
  const { publicKey, id } = router.query;
  return { publicKey, id };
};

const Rewards = () => {
  const { publicKey, id } = useRouterParams();
  const [tokenMetadata, setTokenMetadata] = useState();

  useEffect(() => {
    // Get the token metadata
    connection.request({
      method: "get",
      path: `/metadata/${id}`,
    }).then((response) => {
      setTokenMetadata(response.json());
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Your Rewards
      </div>
      <div className={styles.content}>
        <p>
          You have <b>{tokenMetadata?.totalSupply}</b> Gold Gems
        </p>
        <button onClick={() => {
          // Stake
        }}>
          Stake
        </button>
        {tokenMetadata && <ThirdwebNftMedia metadata={tokenMetadata} height={"48"} />}
      </div>
    </div>
  );
};

export default Rewards;
