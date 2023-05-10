import React from 'react';
import { useState } from 'react';
import { useWeb3 } from '@solana/web3.js';
import { useRouter } from 'next/router';

import ThirdwebNftMedia from '@thirdweb/nft-media';

import styles from './Rewards.module.css';

const Rewards = () => {
  const { publicKey } = useRouter();
  const { connection } = useWeb3();
  const [tokenMetadata, setTokenMetadata] = useState();

const useHandleClick = () => {
  const handleClick = () => {
    // Get the token metadata
    const { id } = useRouter().query;
    connection.request({
      method: 'get',
      path: `/metadata/${id}`,
    }).then((response) => {
      setTokenMetadata(response.json());
    });
  };

  return handleClick;
};

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Your Rewards
      </div>
      <div className={styles.content}>
        <p>
          You have <b>{tokenMetadata?.totalSupply}</b> Gold Gems
        </p>
        <button onClick={handleClick}>
          Stake
        </button>
        {tokenMetadata && (
          <ThirdwebNftMedia
            metadata={tokenMetadata}
            height={"48"}
          />
        )}
        &rbrace;
      </div>
    </div>
  );
};

export default Rewards;
