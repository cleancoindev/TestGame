import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThirdwebNftMedia from "@thirdweb/nft-media";

const Rewards = () => {
  const { publicKey } = useRouter();
  const { connection } = useWeb3();
  const [tokenMetadata, setTokenMetadata] = useState();

  useEffect(() => {
    // Get the token metadata
    const { id } = useRouter().query;
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
