import React from "react";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useContract,
  useNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { CHARACTER } from "../const/contractAddress";
import styles from "../styles/Home.module.css";
export const MintCharacter = () => {
  const address = useAddress();
  const { contract: editionDrop } = useContract(CHARACTER, "edition-drop");

  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(editionDrop, { start: 0, count: 100 });
  return (
    <div className={styles.container}>
      <h1>All Characters</h1>
      <p>Claim character to play mining game</p>
      {nfts?.map((value, index) => (
        <div className={`${styles.nftBox} ${styles.spacerBottom}`} key={index}>
          {/* <div key={index}></div> */}
          <ThirdwebNftMedia metadata={value.metadata} height="200px" />
          <p style={{ textAlign: "center" }}>Name: {value.metadata.name}</p>
          <div className={styles.smallMargin}>
            <Web3Button
              style={{ accentColor: "#f5f", width: "100%" }}
              theme="dark"
              contractAddress={CHARACTER}
              action={
                (contract) => console.log(value.metadata.id)
                // contract.erc1155.claim(value.metadata.id, 1)
              }
            >
              Claim
            </Web3Button>
          </div>
        </div>
      ))}
    </div>
  );
};
