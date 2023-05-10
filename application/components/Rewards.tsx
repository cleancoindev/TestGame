import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Import the ThirdwebNftMedia component from @thirdweb-dev/react
import { ThirdwebNftMedia } from "@thirdweb-dev/react";

const useRouterParams = () => {
  const router = useRouter();
  const { query } = router;
  const [params, setParams] = useState({});

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setParams(query);
    }
  }, [query]);

  return params;
};

const Rewards = () => {
  const params = useRouterParams();
  const [nftMetadata, setNftMetadata] = useState(null);

  useEffect(() => {
    if (params.nft) {
      // Fetch the NFT metadata from the API
      fetch(`https://api.thirdweb.com/nfts/${params.nft}`)
        .then((response) => response.json())
        .then((data) => {
          setNftMetadata(data.metadata);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params]);

  return (
    <div className="container">
      <h1>Rewards</h1>
      {nftMetadata ? (
        // Render the NFT using the ThirdwebNftMedia component
        <ThirdwebNftMedia metadata={nftMetadata} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
